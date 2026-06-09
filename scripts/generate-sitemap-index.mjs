#!/usr/bin/env node
/**
 * Copy full urlset from out/sitemap.xml → sitemap_index.xml (all page URLs).
 * Same content as sitemap.xml; gives GSC a second submission path.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITEMAP_PATH = resolve(ROOT, 'out/sitemap.xml');
const OUTPUT_PATHS = [
  resolve(ROOT, 'out/sitemap_index.xml'),
  resolve(ROOT, 'public/sitemap_index.xml'),
];

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf8');
if (!sitemapXml.includes('<urlset')) {
  console.error(`::error::Missing urlset in ${SITEMAP_PATH}. Run next build first.`);
  process.exit(1);
}

const urlCount = (sitemapXml.match(/<loc>/g) || []).length;

for (const path of OUTPUT_PATHS) {
  writeFileSync(path, sitemapXml, 'utf8');
}

console.log(`Wrote sitemap_index.xml → ${OUTPUT_PATHS.length} file(s), ${urlCount} URL(s)`);
