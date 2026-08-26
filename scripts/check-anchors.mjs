/**
 * Internal anchor gate.
 *
 * VitePress validates that a linked *page* exists, but not that the `#anchor` on the end of it
 * does. So renaming a heading silently breaks every link pointing at it, and nothing reports it.
 * That has already happened twice in this repo: "API Keys" became "API Credentials" while two
 * links in premium/index.md kept pointing at the old slug, and the app's own importAddressBook
 * deep link pointed at a heading that had never rendered that way.
 *
 * Run with `pnpm run check:anchors`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import process from 'node:process';

const ROOT = resolve(import.meta.dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.vitepress', 'dist', 'cache', 'scripts', 'public']);

/**
 * Never published, so they are neither a link source nor an anchor target.
 * Mirrors `srcExclude` in `.vitepress/config.mts` — keep the two in step.
 */
const SKIP_FILES = new Set(['README.md', 'LICENSE.md']);

/** A markdown link to an internal page with an anchor: `](/some/page#the-anchor)`. */
const ANCHORED_LINK = /]\(\/([\w/-]+)#([\w-]+)\)/g;

/** ATX headings. Setext headings are not used in this corpus. */
const HEADING = /^#{1,6} +(.+?)\s*$/gm;

/**
 * VitePress slugs a heading by lowercasing it and collapsing every run of non-alphanumeric
 * characters into a single hyphen. So "Add / edit events" is `add-edit-events` and
 * "Set the backend's arguments" is `set-the-backend-s-arguments`.
 */
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
      if (SKIP_DIRS.has(entry.name))
        continue;
      found.push(...await walk(join(dir, entry.name)));
    }
    else if (!SKIP_FILES.has(entry.name) && entry.name.endsWith('.md')) {
      found.push(join(dir, entry.name));
    }
  }
  return found;
}

/** A link target resolves to `<path>.md` or `<path>/index.md`. */
function pageFor(path, pages) {
  return pages.get(path) ?? pages.get(`${path.replace(/\/$/, '')}/index`);
}

async function main() {
  const files = await walk(ROOT);
  const pages = new Map(files.map(file => [
    relative(ROOT, file).split('\\').join('/').replace(/\.md$/, ''),
    file,
  ]));

  const anchorsByPage = new Map();
  for (const [path, file] of pages) {
    const content = await readFile(file, 'utf8');
    anchorsByPage.set(path, new Set([...content.matchAll(HEADING)].map(match => slug(match[1]))));
  }

  const errors = [];
  for (const file of files) {
    const content = await readFile(file, 'utf8');
    const source = relative(ROOT, file);

    for (const [, path, anchor] of content.matchAll(ANCHORED_LINK)) {
      const page = pageFor(path, pages);
      if (!page) {
        errors.push(`${source}\n    links to /${path}#${anchor}, but no such page exists`);
        continue;
      }

      const resolved = relative(ROOT, page).split('\\').join('/').replace(/\.md$/, '');
      if (!anchorsByPage.get(resolved)?.has(anchor))
        errors.push(`${source}\n    links to /${path}#${anchor}, but that page has no such heading`);
    }
  }

  if (errors.length > 0) {
    console.error(`\n${errors.length} broken anchor${errors.length === 1 ? '' : 's'} found:\n`);
    for (const error of errors)
      console.error(`  ✖ ${error}\n`);
    process.exit(1);
  }

  console.log(`✔ every internal #anchor across ${files.length} pages resolves to a heading`);
}

await main();
