#!/usr/bin/env node
/**
 * Submit sitemap URLs to Bing IndexNow after deploy.
 * Key file must be live at https://<host>/<key>.txt before calling the API.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const INDEXNOW_KEY = '83d2fecd2b67485c9292249d3d936875';
const SITEMAP_PATH = resolve(ROOT, 'out/sitemap.xml');
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

function loadConfig() {
  const raw = readFileSync(resolve(ROOT, 'src/data/game.config.json'), 'utf8');
  const config = JSON.parse(raw);
  const baseUrl = config.seo?.baseUrl ?? 'https://pickaxe-tycoon.xyz';
  const host = new URL(baseUrl).host;
  return { baseUrl, host };
}

function loadUrlsFromSitemap() {
  const xml = readFileSync(SITEMAP_PATH, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    throw new Error(`No <loc> entries found in ${SITEMAP_PATH}. Run npm run build first.`);
  }
  return urls;
}

async function submitIndexNow() {
  const { host } = loadConfig();
  const urlList = loadUrlsFromSitemap();
  const keyLocation = `https://${host}/${INDEXNOW_KEY}.txt`;

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation,
    urlList,
  };

  console.log(`IndexNow: submitting ${urlList.length} URL(s) for ${host}...`);

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // 200 OK, 202 Accepted — both mean success per IndexNow spec
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: success (HTTP ${res.status}).`);
    return;
  }

  const text = await res.text();
  throw new Error(`IndexNow failed (HTTP ${res.status}): ${text || res.statusText}`);
}

submitIndexNow().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
