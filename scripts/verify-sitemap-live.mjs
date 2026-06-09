#!/usr/bin/env node
/** Post-deploy: confirm sitemap_index.xml and sitemap.xml are reachable as Googlebot. */

const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const CHECKS = [
  {
    url: 'https://pickaxe-tycoon.xyz/sitemap_index.xml',
    mustInclude: ['<urlset', '<loc>'],
    label: 'sitemap_index',
  },
  {
    url: 'https://pickaxe-tycoon.xyz/sitemap.xml',
    mustInclude: ['<urlset', '<loc>'],
    label: 'sitemap',
  },
];

for (const check of CHECKS) {
  const res = await fetch(check.url, { headers: { 'User-Agent': UA } });
  const body = await res.text();

  if (res.status !== 200) {
    console.error(`::error::${check.label} returned HTTP ${res.status}`);
    process.exit(1);
  }

  if (!body.includes('<?xml') || !check.mustInclude.every((token) => body.includes(token))) {
    console.error(`::error::${check.label} body is not valid XML`);
    process.exit(1);
  }

  const count = (body.match(/<loc>/g) || []).length;
  console.log(
    `${check.label} OK: HTTP ${res.status}, ${count} <loc>, content-type: ${res.headers.get('content-type')}`,
  );
}
