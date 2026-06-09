#!/usr/bin/env node
/**
 * Generate sitemap_index.xml after `next build` (reads out/sitemap.xml).
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

function loadBaseUrl() {
  const config = JSON.parse(
    readFileSync(resolve(ROOT, 'src/data/game.config.json'), 'utf8'),
  );
  return config.seo?.baseUrl ?? 'https://pickaxe-tycoon.xyz';
}

function latestLastmod(sitemapXml) {
  const dates = [...sitemapXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) =>
    m[1].trim(),
  );
  if (dates.length === 0) {
    return new Date().toISOString();
  }
  return dates.sort().at(-1);
}

function buildSitemapIndex(baseUrl, lastmod) {
  const sitemapUrl = `${baseUrl}/sitemap.xml`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${sitemapUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;
}

const sitemapXml = readFileSync(SITEMAP_PATH, 'utf8');
if (!sitemapXml.includes('<urlset')) {
  console.error(`::error::Missing urlset in ${SITEMAP_PATH}. Run next build first.`);
  process.exit(1);
}

const baseUrl = loadBaseUrl();
const lastmod = latestLastmod(sitemapXml);
const indexXml = buildSitemapIndex(baseUrl, lastmod);

for (const path of OUTPUT_PATHS) {
  writeFileSync(path, indexXml, 'utf8');
}

console.log(`Wrote sitemap_index.xml → ${OUTPUT_PATHS.length} file(s), lastmod=${lastmod}`);
