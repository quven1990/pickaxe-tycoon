import pickaxesData from '@/data/pickaxes.json';
import codesData from '@/data/codes.json';
import updatesData from '@/data/updates.json';
import oresData from '@/data/ores.json';
import configData from '@/data/game.config.json';

export interface Pickaxe {
  id: string;
  name: string;
  slug: string;
  tier: number;
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  powerIndex: number;
  price: number | null;
  mergeOnly: boolean;
  mergeFrom?: string;
  mergeCount?: number;
  description: string;
  notes: string;
}

export interface CodeEntry {
  code: string;
  reward: string;
  expiryDate?: string;
  conditions?: string;
}

export interface GameUpdate {
  id: string;
  title: string;
  date: string;
  version: string;
  summary: string;
  highlights: string[];
}

export interface Area {
  id: string;
  name: string;
  status: string;
  description: string;
  updated?: string;
  ores?: string[];
  enemies?: string[];
  pickaxeUnlock?: string;
}

export interface Ore {
  id: string;
  name: string;
  tierRange: string;
  rarity: string;
  description: string;
}

export interface GameConfig {
  game: {
    name: string;
    robloxId: string;
    developer: string;
    genre: string;
    currentVersion: string;
    lastUpdated: string;
    platforms: string[];
  };
  stats: {
    visits: string;
    favorites: string;
    likes?: string;
    onlineNow?: string;
    serverSize: number;
    active: boolean;
    rating?: string;
    pickaxeCount?: number;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    baseUrl: string;
    primaryKeywords: string[];
    secondaryKeywords: string[];
    defaultOgImage: string;
  };
  assets?: {
    icon: string;
    thumbnail: string;
    hero: string;
    screenshots: { src: string; alt: string }[];
  };
  routes: { path: string; title: string; priority: string }[];
  socials?: {
    roblox?: string;
    discord?: string;
  };
}

const pickaxes: Pickaxe[] = (pickaxesData as { pickaxes: Pickaxe[] }).pickaxes;
const config: GameConfig = configData as GameConfig;

export function getPickaxes(): Pickaxe[] {
  return pickaxes;
}

export function getPickaxeById(id: string): Pickaxe | undefined {
  return pickaxes.find((p) => p.id === id);
}

export function getPickaxeBySlug(slug: string): Pickaxe | undefined {
  return pickaxes.find((p) => p.slug === slug);
}

export function getGameConfig(): GameConfig {
  return config;
}

export function getCodesData() {
  return codesData as {
    lastUpdated: string;
    activeCodes: CodeEntry[];
    expiredCodes: CodeEntry[];
    notes: string;
  };
}

export function getUpdates(): GameUpdate[] {
  return (updatesData as { updates: GameUpdate[] }).updates;
}

export function getAreas(): Area[] {
  return (oresData as { areas: Area[] }).areas;
}

export function getOres(): Ore[] {
  return (oresData as { ores: Ore[] }).ores;
}

export function formatMoney(amount: number): string {
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(1)}K`;
  return `$${amount.toLocaleString()}`;
}

export function formatPowerIndex(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString();
}

export const GRADE_COLORS: Record<string, string> = {
  S: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  A: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  B: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  C: 'text-green-400 bg-green-400/10 border-green-400/30',
  D: 'text-zinc-400 bg-zinc-400/10 border-zinc-400/30',
};
