#!/usr/bin/env node
/**
 * Sanity checks for static game data. Fails CI if structure looks broken.
 */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJson } from './lib/format-stats.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const errors = [];

/** @param {boolean} ok @param {string} message */
function assert(ok, message) {
  if (!ok) errors.push(message);
}

function validatePickaxes() {
  const { pickaxes, mergeRule } = readJson(join(ROOT, 'src/data/pickaxes.json'));
  assert(Array.isArray(pickaxes), 'pickaxes.json: pickaxes must be an array');
  assert(pickaxes.length === 24, `pickaxes.json: expected 24 pickaxes, got ${pickaxes.length}`);

  const tiers = pickaxes.map((p) => p.tier).sort((a, b) => a - b);
  for (let i = 0; i < 24; i++) {
    assert(tiers[i] === i + 1, `pickaxes.json: missing or duplicate tier ${i + 1}`);
  }

  for (let i = 1; i < pickaxes.length; i++) {
    assert(
      pickaxes[i].powerIndex > pickaxes[i - 1].powerIndex,
      `pickaxes.json: powerIndex must increase (${pickaxes[i - 1].name} → ${pickaxes[i].name})`,
    );
  }

  assert(
    mergeRule?.standardMergeCount === 3,
    'pickaxes.json: standardMergeCount should be 3',
  );
}

function validateCodes() {
  const codes = readJson(join(ROOT, 'src/data/codes.json'));
  assert(typeof codes.lastChecked === 'string', 'codes.json: lastChecked is required');
  assert(Array.isArray(codes.activeCodes), 'codes.json: activeCodes must be an array');
  assert(Array.isArray(codes.expiredCodes), 'codes.json: expiredCodes must be an array');

  const seen = new Set();
  for (const list of [codes.activeCodes, codes.expiredCodes]) {
    for (const entry of list) {
      assert(typeof entry.code === 'string' && entry.code.length > 0, 'codes.json: invalid code entry');
      assert(!seen.has(entry.code), `codes.json: duplicate code ${entry.code}`);
      seen.add(entry.code);
    }
  }
}

function validateConfig() {
  const config = readJson(join(ROOT, 'src/data/game.config.json'));
  assert(config.seo?.baseUrl?.startsWith('https://'), 'game.config.json: baseUrl must be https');
  assert(config.game?.robloxId === '73814003954154', 'game.config.json: robloxId mismatch');
  assert(config.stats?.pickaxeCount === 24, 'game.config.json: pickaxeCount should be 24');

  if (config.sync?.raw?.visits) {
    assert(config.sync.raw.visits > 0, 'game.config.json: sync.raw.visits must be positive');
  }
}

function main() {
  validatePickaxes();
  validateCodes();
  validateConfig();

  if (errors.length > 0) {
    console.error('Validation failed:');
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log('Game data validation passed.');
}

main();
