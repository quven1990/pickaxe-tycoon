#!/usr/bin/env node
/**
 * Sync verified stats from Roblox Games API into game.config.json and codes.json.
 * Mirrors public data shown on the Roblox game page (visits, playing, favorites, rating, etc.).
 * Only updates API-backed fields — never modifies pickaxes, ores, or code lists.
 */

import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  formatCount,
  formatGenre,
  formatOnline,
  formatRating,
  formatVisits,
  readJson,
  toDateOnly,
  writeJson,
} from './lib/format-stats.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONFIG_PATH = join(ROOT, 'src/data/game.config.json');
const CODES_PATH = join(ROOT, 'src/data/codes.json');

const PLACE_ID = '73814003954154';
const USER_AGENT = 'PickaxeTycoonGuide/1.0 (daily sync; +https://pickaxe-tycoon.xyz)';

/** @param {string} url */
async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': USER_AGENT },
  });
  if (!res.ok) {
    throw new Error(`Roblox API ${res.status}: ${url}`);
  }
  return res.json();
}

async function resolveUniverseId() {
  const config = readJson(CONFIG_PATH);
  if (config.sync?.robloxUniverseId) {
    return String(config.sync.robloxUniverseId);
  }

  const data = await fetchJson(
    `https://apis.roblox.com/universes/v1/places/${PLACE_ID}/universe`,
  );
  if (!data.universeId) {
    throw new Error(`Could not resolve universe ID for place ${PLACE_ID}`);
  }
  return String(data.universeId);
}

/** @param {string} universeId */
async function fetchGameStats(universeId) {
  const data = await fetchJson(
    `https://games.roblox.com/v1/games?universeIds=${universeId}`,
  );
  const game = data.data?.[0];
  if (!game) {
    throw new Error(`No game data returned for universe ${universeId}`);
  }
  return game;
}

/** @param {string} universeId */
async function fetchGameVotes(universeId) {
  const data = await fetchJson(
    `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`,
  );
  return data.data?.[0] ?? { upVotes: 0, downVotes: 0 };
}

/**
 * @param {Record<string, unknown>} config
 * @param {Record<string, unknown>} game
 * @param {{ upVotes: number; downVotes: number }} votes
 * @param {string} today
 */
function applyStats(config, game, votes, today) {
  const visits = Number(game.visits ?? 0);
  const favorites = Number(game.favoritedCount ?? 0);
  const playing = Number(game.playing ?? 0);
  const upVotes = Number(votes.upVotes ?? 0);
  const downVotes = Number(votes.downVotes ?? 0);
  const robloxUpdated = String(game.updated ?? '');
  const robloxCreated = String(game.created ?? '');
  const description = String(game.description ?? '');

  const previousVisits = Number(config.sync?.raw?.visits ?? 0);
  if (previousVisits > 0 && visits < previousVisits) {
    throw new Error(
      `Visit count decreased (${previousVisits} → ${visits}). Aborting sync for safety.`,
    );
  }

  const descriptionHash = createHash('sha256').update(description).digest('hex').slice(0, 16);
  const descriptionChanged =
    config.sync?.raw?.descriptionHash &&
    config.sync.raw.descriptionHash !== descriptionHash;

  // Stats shown on Roblox game page
  config.stats.visits = formatVisits(visits);
  config.stats.favorites = formatCount(favorites);
  config.stats.onlineNow = formatOnline(playing);
  config.stats.likes = formatCount(upVotes);
  config.stats.rating = formatRating(upVotes, downVotes);
  config.stats.serverSize = Number(game.maxPlayers ?? config.stats.serverSize ?? 6);
  config.stats.active = playing > 0;

  // Game metadata from Roblox
  config.game.robloxName = String(game.name ?? config.game.name);
  config.game.description = description.trim();
  config.game.developer = String(game.creator?.name ?? config.game.developer);
  config.game.genre = formatGenre(
    String(game.genre_l1 ?? game.untranslated_genre_l1 ?? ''),
    String(game.genre_l2 ?? ''),
  );
  if (robloxCreated) {
    config.game.created = toDateOnly(robloxCreated);
  }
  if (robloxUpdated) {
    config.game.lastUpdated = toDateOnly(robloxUpdated);
  }

  config.sync = {
    robloxUniverseId: String(game.id ?? config.sync?.robloxUniverseId ?? ''),
    robloxPlaceId: PLACE_ID,
    lastSyncAt: new Date().toISOString(),
    lastSyncSource: 'roblox-games-api',
    descriptionChanged: Boolean(descriptionChanged),
    raw: {
      visits,
      favoritedCount: favorites,
      playing,
      upVotes,
      downVotes,
      robloxUpdated,
      robloxCreated,
      descriptionHash,
      genreL1: String(game.genre_l1 ?? ''),
      genreL2: String(game.genre_l2 ?? ''),
    },
  };

  for (const route of config.routes) {
    if (route.path === '/' || route.path === '/codes/') {
      route.lastUpdated = today;
    }
  }

  return { descriptionChanged, visits, favorites, playing, upVotes, downVotes };
}

function touchCodesCheck(today) {
  const codes = readJson(CODES_PATH);
  codes.lastChecked = today;
  writeJson(CODES_PATH, codes);
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const config = readJson(CONFIG_PATH);

  console.log('Resolving Roblox universe ID...');
  const universeId = await resolveUniverseId();
  console.log(`Universe ID: ${universeId}`);

  console.log('Fetching game stats from Roblox API...');
  const [game, votes] = await Promise.all([
    fetchGameStats(universeId),
    fetchGameVotes(universeId),
  ]);

  const result = applyStats(config, game, votes, today);
  writeJson(CONFIG_PATH, config);
  touchCodesCheck(today);

  console.log('Updated from Roblox game page (via API):');
  console.log(`  name:      ${config.game.robloxName}`);
  console.log(`  visits:    ${config.stats.visits} (raw ${result.visits})`);
  console.log(`  playing:   ${config.stats.onlineNow} (raw ${result.playing})`);
  console.log(`  favorites: ${config.stats.favorites} (raw ${result.favorites})`);
  console.log(`  likes:     ${config.stats.likes} (raw ${result.upVotes})`);
  console.log(`  rating:    ${config.stats.rating} (${result.upVotes}↑ ${result.downVotes}↓)`);
  console.log(`  genre:     ${config.game.genre}`);
  console.log(`  created:   ${config.game.created ?? '—'}`);
  console.log(`  updated:   ${config.game.lastUpdated}`);
  console.log(`  codes.lastChecked: ${today}`);

  if (result.descriptionChanged) {
    console.log('::warning::Roblox game description changed — review for manual wiki/codes updates.');
  }
}

main().catch((err) => {
  console.error(`Sync failed: ${err.message}`);
  process.exit(1);
});
