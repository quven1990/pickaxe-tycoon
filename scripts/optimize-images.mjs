#!/usr/bin/env node
/**
 * Lossless-enough image optimization for static export.
 * Produces WebP siblings + smaller PNG/JPEG fallbacks (same dimensions / paths).
 */

import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { statSync, renameSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

function kb(path) {
  return `${(statSync(path).size / 1024).toFixed(1)} KB`;
}

async function writePair(baseName, pipeline, { webpQuality = 82 } = {}) {
  const pngOrJpg = resolve(PUBLIC, baseName);
  const webpName = baseName.replace(/\.(png|jpe?g)$/i, '.webp');
  const webpPath = resolve(PUBLIC, webpName);
  const tmpPath = `${pngOrJpg}.opt-tmp`;

  await pipeline
    .clone()
    .webp({ quality: webpQuality, effort: 6 })
    .toFile(webpPath);

  if (/\.jpe?g$/i.test(baseName)) {
    await pipeline
      .clone()
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(tmpPath);
  } else {
    await pipeline
      .clone()
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmpPath);
  }

  renameSync(tmpPath, pngOrJpg);

  console.log(`  ${baseName}: ${kb(pngOrJpg)} | ${webpName}: ${kb(webpPath)}`);
}

async function main() {
  console.log('Optimizing images...\n');

  // Icon: displayed up to 80px — 192px master is enough for retina
  await writePair('images/game-icon.png', sharp(resolve(PUBLIC, 'images/game-icon.png')).resize(192, 192, {
    fit: 'cover',
    withoutEnlargement: true,
  }));

  const raster768 = [
    'images/game-thumbnail.png',
    'images/screenshot-1.png',
    'images/screenshot-2.png',
    'images/screenshot-3.png',
    'images/screenshot-4.png',
  ];

  for (const name of raster768) {
    await writePair(name, sharp(resolve(PUBLIC, name)));
  }

  await writePair('hero-bg.jpg', sharp(resolve(PUBLIC, 'hero-bg.jpg')));

  // OG / touch icons derived from game icon
  await writePair(
    'favicon-192.png',
    sharp(resolve(PUBLIC, 'images/game-icon.png')).resize(192, 192, { fit: 'cover' }),
  );
  await writePair(
    'apple-touch-icon.png',
    sharp(resolve(PUBLIC, 'images/game-icon.png')).resize(180, 180, { fit: 'cover' }),
  );
  await writePair(
    'favicon-32.png',
    sharp(resolve(PUBLIC, 'images/game-icon.png')).resize(32, 32, { fit: 'cover' }),
    { webpQuality: 90 },
  );

  await writePair('og-default.jpg', sharp(resolve(PUBLIC, 'og-default.jpg')).resize(1200, 630, {
    fit: 'cover',
    withoutEnlargement: true,
  }));

  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
