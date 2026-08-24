/**
 * Image hygiene gate.
 *
 * Three things go wrong on their own if nothing checks them, and all three have happened here:
 *
 *  1. a reference points at an image that does not exist, so the page renders a broken icon;
 *  2. an image is referenced by nothing, so it is carried forever and nobody knows it is dead
 *     (13 of these had accumulated before this check existed);
 *  3. an image drifts out of the directory that mirrors its page, which is the convention that
 *     makes `ls` answer "which images does this page own".
 *
 * Run with `pnpm run check:images`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import process from 'node:process';

const ROOT = resolve(import.meta.dirname, '..');
const IMAGES_DIR = join(ROOT, 'public', 'images');

/** Buckets that are deliberately not owned by a single page. */
const SHARED_DIRS = new Set(['_shared', '_external']);

/**
 * Directories never worth walking for either images or references. `scripts` is in here because
 * this file documents the reference syntax it looks for, and would otherwise match itself.
 */
const SKIP_DIRS = new Set(['node_modules', '.git', '.vitepress', 'dist', 'cache', 'scripts']);

/** Files that can carry an image reference. */
const TEXT_EXTENSIONS = new Set(['.md', '.vue', '.ts', '.mts', '.js', '.mjs', '.json']);

async function walk(dir, predicate) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name))
        continue;
      found.push(...await walk(join(dir, entry.name), predicate));
    }
    else if (predicate(entry.name)) {
      found.push(join(dir, entry.name));
    }
  }
  return found;
}

function extensionOf(name) {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot);
}

/**
 * Any `/images/...` path, wherever it appears: markdown image syntax, a plain link, an html
 * `src`, or a string in config. Matching the path itself rather than the syntax around it keeps
 * this from silently missing a reference style nobody thought of.
 */
const IMAGE_REFERENCE = /\/images\/[\w./-]+/g;

async function collectReferences() {
  const files = await walk(ROOT, name => TEXT_EXTENSIONS.has(extensionOf(name)));
  const references = new Map();

  for (const file of files) {
    if (file.startsWith(IMAGES_DIR))
      continue;

    const content = await readFile(file, 'utf8');
    for (const match of content.matchAll(IMAGE_REFERENCE)) {
      const existing = references.get(match[0]);
      if (existing)
        existing.add(file);
      else
        references.set(match[0], new Set([file]));
    }
  }

  return references;
}

/**
 * The convention: `public/images/<docs page path>/<subject>.webp`, so `usage-guides/history/events`
 * owns `usage-guides/history/events/*`. An `index.md` page keeps `index` in the image path, so
 * `usage-guides/index.md` owns `usage-guides/index/*` rather than `usage-guides/*` — otherwise its
 * images would sit in the same directory as every sibling page's own directory.
 */
function checkOwningPage(imagePath, docPages) {
  const parts = imagePath.split('/');
  const dir = parts.slice(0, -1).join('/');

  if (dir === '' || SHARED_DIRS.has(parts[0]))
    return undefined;

  return docPages.has(dir) ? undefined : dir;
}

function brokenReferences(references, imageFiles) {
  const errors = [];
  for (const [reference, sources] of references) {
    if (imageFiles.includes(reference.replace(/^\/images\//, '')))
      continue;

    for (const source of sources)
      errors.push(`broken reference: ${reference}\n    referenced from ${relative(ROOT, source)}`);
  }
  return errors;
}

function unreferencedImages(imageFiles, referenced) {
  return imageFiles
    .filter(image => !referenced.has(`/images/${image}`))
    .map(image => `unreferenced image: public/images/${image}\n    nothing links to it — delete it, or reference it from the page it belongs to`);
}

function misplacedImages(imageFiles, docPages) {
  return imageFiles
    .map(image => [image, checkOwningPage(image, docPages)])
    .filter(([, orphanDir]) => orphanDir !== undefined)
    .map(([image, orphanDir]) => `image is not under a docs page: public/images/${image}\n    "${orphanDir}" is not a docs page — move it under its page's directory, or into _shared/ if several pages use it`);
}

async function main() {
  const imageFiles = (await walk(IMAGES_DIR, () => true))
    .map(file => relative(IMAGES_DIR, file).split('\\').join('/'));

  const docFiles = await walk(ROOT, name => extensionOf(name) === '.md');
  const docPages = new Set(docFiles.map(file =>
    relative(ROOT, file).split('\\').join('/').replace(/\.md$/, ''),
  ));

  const references = await collectReferences();
  const referenced = new Set(references.keys());

  const errors = [
    ...brokenReferences(references, imageFiles),
    ...unreferencedImages(imageFiles, referenced),
    ...misplacedImages(imageFiles, docPages),
  ];

  if (errors.length > 0) {
    console.error(`\n${errors.length} image problem${errors.length === 1 ? '' : 's'} found:\n`);
    for (const error of errors)
      console.error(`  ✖ ${error}\n`);
    process.exit(1);
  }

  console.log(`✔ ${imageFiles.length} images, ${referenced.size} references, all resolved and all owned by a page`);
}

await main();
