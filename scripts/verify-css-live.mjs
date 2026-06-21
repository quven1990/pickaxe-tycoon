#!/usr/bin/env node
/**
 * Post-deploy smoke test: HTML pages must return 200 for their linked CSS bundles.
 * Catches deploy races where HTML updates but /_next/static/css/*.css 404s.
 */

const SITE = process.env.VERIFY_SITE_URL ?? 'https://pickaxe-tycoon.xyz';
const PATHS = ['/', '/calculator/', '/codes/', '/tier-list/'];

async function checkPage(path) {
  const url = `${SITE.replace(/\/$/, '')}${path}`;
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`${url} returned HTTP ${res.status}`);
  }
  const html = await res.text();
  const cssPaths = [...html.matchAll(/href="(\/_next\/static\/css\/[^"]+\.css)"/g)].map((m) => m[1]);
  if (cssPaths.length === 0) {
    throw new Error(`${url} has no linked CSS`);
  }
  for (const cssPath of cssPaths) {
    const cssUrl = `${SITE.replace(/\/$/, '')}${cssPath}`;
    const cssRes = await fetch(cssUrl);
    if (!cssRes.ok) {
      throw new Error(`${cssUrl} returned HTTP ${cssRes.status} (linked from ${url})`);
    }
    const type = cssRes.headers.get('content-type') ?? '';
    if (!type.includes('text/css')) {
      throw new Error(`${cssUrl} has wrong Content-Type: ${type}`);
    }
  }
  return { url, css: cssPaths };
}

async function main() {
  const results = [];
  for (const path of PATHS) {
    results.push(await checkPage(path));
  }
  for (const r of results) {
    console.log(`OK ${r.url} → ${r.css.join(', ')}`);
  }
}

main().catch((err) => {
  console.error(`::error::${err.message}`);
  process.exit(1);
});
