# Pickaxe Tycoon Guide & Tools

Fan-made companion site for [Pickaxe Tycoon](https://www.roblox.com/games/73814003954154/Pickaxe-Tycoon) on Roblox.

## Features

- Merge Calculator (24-tier progression)
- Tier List & Wiki (all pickaxes, ores, Magmatic Cavern)
- Codes tracker (monitored daily)
- Beginner Guide & Update logs

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
```

Static output goes to `out/` (Next.js static export).

## Deploy

### Option A: GitHub Actions (recommended)

Push to `main` triggers automatic deploy to Cloudflare Pages.

**Setup (one-time):**

1. Create a [Cloudflare API Token](https://dash.cloudflare.com/profile/api-tokens) with **Edit Cloudflare Workers** template (includes Pages).
2. Add GitHub repository secret `CLOUDFLARE_API_TOKEN` at:
   `https://github.com/quven1990/pickaxe-tycoon/settings/secrets/actions`
3. Push to `main` — workflow runs automatically.

### Option B: Manual deploy

```bash
npm run build
npm run deploy
```

Requires `wrangler login` or `CLOUDFLARE_API_TOKEN` env var.

### Custom Domain

In Cloudflare Dashboard → Workers & Pages → pickaxe-tycoon → Custom domains → add `pickaxe-tycoon.gg`.

## Tech Stack

- Next.js 15 (App Router, static export)
- TypeScript + Tailwind CSS v4
- Cloudflare Pages

## Data Sources

Pickaxe names and merge rules sourced from in-game index and community wiki research (May 2026). Magmatic Cavern update data from developer changelogs.

Not affiliated with Roblox Corporation or Popular Marketplace.
