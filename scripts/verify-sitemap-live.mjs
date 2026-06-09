#!/usr/bin/env node
/** Post-deploy: confirm sitemap.xml is reachable as Googlebot. */

const SITEMAP_URL = 'https://pickaxe-tycoon.xyz/sitemap.xml';
const UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

const res = await fetch(SITEMAP_URL, { headers: { 'User-Agent': UA } });
const body = await res.text();

if (res.status !== 200) {
  console.error(`::error::sitemap returned HTTP ${res.status}`);
  process.exit(1);
}

if (!body.includes('<?xml') || !body.includes('<urlset')) {
  console.error('::error::sitemap body is not valid XML urlset');
  process.exit(1);
}

const count = (body.match(/<loc>/g) || []).length;
if (count < 1) {
  console.error('::error::sitemap has no <loc> entries');
  process.exit(1);
}

console.log(`Sitemap OK: HTTP ${res.status}, ${count} URL(s), content-type: ${res.headers.get('content-type')}`);
