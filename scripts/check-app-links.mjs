/**
 * The app deep-links into these docs. Renaming a heading or moving a page silently breaks a link
 * inside rotki itself, and nothing in this repo would notice: `check-anchors.mjs` only validates
 * links written in the docs, and VitePress never sees the app at all.
 *
 * The list mirrors `externalLinks` in `frontend/app/shared/external-links.ts`. It has to be
 * maintained by hand, because the app is a different repository. When a link here fails, fix the
 * docs rather than this list: the app is already released and cannot be changed retroactively.
 *
 * Only links into this site are listed. Third-party URLs and the old readthedocs changelog are the
 * app's problem, not ours.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import process from 'node:process';

const ROOT = resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.vitepress', 'dist', 'cache', 'scripts', 'public', 'screenshots']);
const SKIP_FILES = new Set(['README.md', 'LICENSE.md']);

/** `page path` -> anchors the app links to. An empty array means the app only links to the page. */
const APP_LINKS = {
  'contribution-guides/contribute-as-developer': [
    'get-coingecko-asset-identifier',
    'get-cryptocompare-asset-identifier',
    'add-a-new-language-or-translation',
  ],
  'faq': [],
  'premium/devices': [],
  'requirement-and-installation/docker': ['session-authentication'],
  'usage-guides/data-management/address-book': ['importing-address-book-names-csv'],
  'usage-guides/integrations/exchange-keys': ['exchanges-api-keys'],
  'usage-guides/integrations/external-services': ['the-graph', 'gnosis-pay'],
  'usage-guides/portfolio/accounts': ['import-and-export-blockchain-accounts-csv'],
  'usage-guides/tax-accounting/accounting-rules': [
    'count-cost-basis-pnl',
    'accounting-treatment-swap',
    'accounting-treatment-basis-transfer',
  ],
  'usage-guides/tax-accounting/event-types': [],
};

const HEADING = /^#{1,6} +(.+?)\s*$/gm;

/** Matches VitePress: lowercase, collapse every run of non-alphanumerics into one hyphen. */
function slug(heading) {
  return heading
    .replace(/`/g, '')
    .toLowerCase()
    .replace(/[^\da-z]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name))
        found.push(...await walk(join(dir, entry.name)));
    }
    else if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
      found.push(join(dir, entry.name));
    }
  }
  return found;
}

async function main() {
  const files = await walk(ROOT);
  const pages = new Map();
  for (const file of files) {
    const path = relative(ROOT, file).split('\\').join('/').replace(/\.md$/, '');
    pages.set(path, await readFile(file, 'utf8'));
  }

  const errors = [];
  for (const [path, anchors] of Object.entries(APP_LINKS)) {
    const text = pages.get(path) ?? pages.get(`${path}/index`);
    if (text === undefined) {
      errors.push(`the app links to a page that does not exist: /${path}\n    restore it, or add a redirect — the released app cannot be changed`);
      continue;
    }

    const headings = new Set([...text.matchAll(HEADING)].map(match => slug(match[1])));
    for (const anchor of anchors) {
      if (!headings.has(anchor))
        errors.push(`the app links to a heading that does not exist: /${path}#${anchor}\n    a heading on that page must slug to "${anchor}"`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} broken app link${errors.length === 1 ? '' : 's'} found:\n`);
    for (const error of errors)
      console.error(`  ✖ ${error}\n`);
    process.exit(1);
  }

  const total = Object.values(APP_LINKS).reduce((sum, anchors) => sum + Math.max(anchors.length, 1), 0);
  console.log(`✔ all ${total} links the app makes into these docs resolve`);
}

await main();
