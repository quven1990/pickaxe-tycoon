import Link from 'next/link';
import Image from 'next/image';
import { getGameConfig, getPickaxes } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateVideoGameSchema, generateWebSiteSchema } from '@/lib/seo';

const config = getGameConfig();
const pickaxes = getPickaxes();
const gameIcon = config.assets?.icon ?? '/images/game-icon.png';
const screenshots = config.assets?.screenshots ?? [];

const tools = [
  {
    href: '/calculator/',
    title: 'Merge Calculator',
    description: 'Plan your pickaxe merge path from Wood to Legendary. See merge steps and pickaxes needed.',
    keyword: 'Pickaxe Tycoon merge',
  },
  {
    href: '/tier-list/',
    title: 'Tier List',
    description: 'All 24 pickaxe tiers ranked — from Wood (Tier 1) to Legendary (Tier 24).',
    keyword: 'Pickaxe Tycoon tier list',
  },
  {
    href: '/codes/',
    title: 'Codes',
    description: 'Active and expired codes monitored daily. Get free rewards when codes drop.',
    keyword: 'Pickaxe Tycoon codes',
  },
  {
    href: '/beginner-guide/',
    title: 'Beginner Guide',
    description: 'Complete starter walkthrough — mining, merging, and building your tower.',
    keyword: 'Pickaxe Tycoon guide',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[generateWebSiteSchema(), generateVideoGameSchema()]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-4">
                Updated {config.game.lastUpdated} — {config.game.currentVersion}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={gameIcon}
                  alt={`${config.game.name} icon`}
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-500/10"
                  priority
                />
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {config.game.name} Guide & Tools
                </h1>
              </div>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Merge calculator, tier list, codes, and guides for Roblox&apos;s hottest mining tycoon.
                {config.stats.visits} visits, {config.stats.rating} rating — build your mining empire.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator/"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg transition-colors"
                >
                  Merge Calculator
                </Link>
                <Link
                  href={config.socials?.roblox || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg border border-zinc-700 transition-colors"
                >
                  Play on Roblox
                </Link>
              </div>
            </div>
            {screenshots[0] && (
              <div className="hidden md:block w-80 lg:w-96 shrink-0">
                <Image
                  src={screenshots[0].src}
                  alt={screenshots[0].alt}
                  width={768}
                  height={432}
                  className="rounded-xl border border-zinc-700/80 shadow-2xl shadow-black/40"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-10" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Pickaxe Tycoon Game Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Visits', value: config.stats.visits },
            { label: 'Rating', value: config.stats.rating || '98%+' },
            { label: 'Favorites', value: config.stats.favorites },
            { label: 'Pickaxe Index', value: '24' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <h3 className="text-2xl font-bold text-amber-400">{stat.value}</h3>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">Tools & Guides</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="card-hover p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 block"
            >
              <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-zinc-400 mb-3">{tool.description}</p>
              <span className="text-xs text-amber-500/80">{tool.keyword}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Pickaxe Preview */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Pickaxe Progression</h2>
          <Link href="/wiki/" className="text-sm text-amber-400 hover:text-amber-300">
            View all pickaxes →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {pickaxes.filter((p) => p.tier <= 12).map((p) => (
            <div key={p.id} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-xs text-zinc-500 mb-1">Tier {p.tier}</p>
              <h3 className="text-sm font-medium text-zinc-200 truncate">{p.name.replace(' Pickaxe', '')}</h3>
            </div>
          ))}
        </div>
        <p className="text-sm text-zinc-500 mt-3">Showing Tiers 1–12 of 24. <Link href="/wiki/" className="text-amber-400 hover:text-amber-300">View full index →</Link></p>
      </section>

      {/* Game Gallery */}
      {screenshots.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-10 border-t border-zinc-800/60">
          <h2 className="text-2xl font-bold text-white mb-2">In-Game Screenshots</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Official gameplay from Roblox — mining, merging pickaxes, and building your tower.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((shot) => (
              <div
                key={shot.src}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 hover:border-amber-500/30 transition-colors"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={768}
                  height={432}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
