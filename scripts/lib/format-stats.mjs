import { readFileSync, writeFileSync } from 'node:fs';

/** @param {number} n */
export function formatVisits(n) {
  if (n >= 1_000_000) {
    const millions = n / 1_000_000;
    if (millions >= 10) return `${Math.floor(millions)}M+`;
    const rounded = Math.floor(millions * 10) / 10;
    return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(1)}M+`;
  }
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K+`;
  return `${n}+`;
}

/** @param {number} n */
export function formatCount(n) {
  const rounded = Math.floor(n / 100) * 100;
  return `${Math.max(rounded, 0).toLocaleString('en-US')}+`;
}

/** @param {number} n */
export function formatOnline(n) {
  const rounded = Math.floor(n / 1_000) * 1_000;
  return `${Math.max(rounded, 0).toLocaleString('en-US')}+`;
}

/** @param {string} iso */
export function toDateOnly(iso) {
  return iso.slice(0, 10);
}

/** @param {string} path */
export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** @param {string} path @param {unknown} data */
export function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}
