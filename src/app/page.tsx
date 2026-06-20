import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { getGameConfig, getPickaxes, getRelatedSites } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateVideoGameSchema, generateWebSiteSchema } from '@/lib/seo';

const config = getGameConfig();
const pickaxes = getPickaxes();
const relatedSites = getRelatedSites();
const gameIcon = config.assets?.icon ?? '/images/game-icon.png';
const screenshots = config.assets?.screenshots ?? [];

const tools = [
  {
    href: '/calculator/',
    title: 'Merge Calculator',
    description: 'Plan your pickaxe merge path from Wood to Golden. See merge steps and pickaxes needed.',
    keyword: 'Pickaxe Tycoon merge',
  },
  {
    href: '/tier-list/',
    title: 'Tier List',
    description: 'All 24 pickaxe tiers ranked — from Wood (Tier 1) to Golden (Tier 24).',
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
  {
    href: '/guides/max-level/',
    title: 'Max Level Guide',
    description: 'Reach Tier 24 Golden — merge milestones, gamepass tips, and late-game route.',
    keyword: 'Pickaxe Tycoon Golden Pickaxe',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[generateWebSiteSchema(), generateVideoGameSchema()]} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-zinc-950/80 to-zinc-950" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-16 md:py-24">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] md:gap-10">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
                Updated {config.game.lastUpdated} — {config.game.currentVersion}
              </div>
              <div className="mb-4 flex items-start gap-3 sm:items-center sm:gap-4">
                <OptimizedImage
                  src={gameIcon}
                  alt={`${config.game.name} icon`}
                  width={80}
                  height={80}
                  className="h-14 w-14 shrink-0 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-500/10 sm:h-16 sm:w-16 md:h-20 md:w-20"
                  priority
                />
                <h1 className="text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  {config.game.name} Guide & Tools
                </h1>
              </div>
              <p className="mb-6 text-base leading-relaxed text-zinc-400 sm:mb-8 sm:text-lg">
                Merge calculator, tier list, codes, and guides for Roblox&apos;s hottest mining tycoon.
                {config.stats.visits} visits, {config.stats.rating} rating
                {config.stats.onlineNow ? `, ${config.stats.onlineNow} playing now` : ''} — build your mining empire.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/calculator/"
                  className="rounded-lg bg-amber-500 px-6 py-3 text-center font-bold text-zinc-950 transition-colors hover:bg-amber-400"
                >
                  Merge Calculator
                </Link>
                <Link
                  href={config.socials?.roblox || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-zinc-700"
                >
                  Play on Roblox
                </Link>
              </div>
            </div>
            {screenshots[0] && (
              <div className="mx-auto w-full max-w-sm shrink-0 md:mx-0 md:block md:w-80 lg:w-96">
                <OptimizedImage
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

      {/* Stats — synced from Roblox game page via API */}
      <section className="page-container" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="text-2xl font-bold text-white mb-2">
          Live on Roblox
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Same stats as{' '}
          <a
            href={config.socials?.roblox}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300"
          >
            the official game page
          </a>
          , synced daily from Roblox API.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Visits', value: config.stats.visits },
            { label: 'Playing Now', value: config.stats.onlineNow ?? '—' },
            { label: 'Favorites', value: config.stats.favorites },
            { label: 'Rating', value: config.stats.rating ?? '—' },
            { label: 'Likes', value: config.stats.likes ?? '—' },
            { label: 'Max Players', value: String(config.stats.serverSize) },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-amber-400">{stat.value}</h3>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        {config.sync?.lastSyncAt && (
          <p className="text-xs text-zinc-600 text-center mt-3">
            Last synced{' '}
            <time dateTime={config.sync.lastSyncAt}>
              {config.sync.lastSyncAt.replace('T', ' ').slice(0, 16)} UTC
            </time>
          </p>
        )}
      </section>

      {/* Roblox game description */}
      {config.game.description && (
        <section className="mx-auto max-w-6xl px-4 pb-8 sm:pb-10">
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-2">
              {config.game.robloxName ?? config.game.name} on Roblox
            </h2>
            <p className="text-sm text-zinc-400 whitespace-pre-line mb-4">{config.game.description}</p>
            <dl className="grid sm:grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="text-zinc-500">Developer</dt>
                <dd className="text-zinc-300">{config.game.developer}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Genre</dt>
                <dd className="text-zinc-300">{config.game.genre}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Launched</dt>
                <dd className="text-zinc-300">
                  {config.game.created ? (
                    <time dateTime={config.game.created}>{config.game.created}</time>
                  ) : (
                    '—'
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      )}

      {/* Tools */}
      <section className="page-container">
        <h2 className="mb-6 text-xl font-bold text-white sm:text-2xl">Tools & Guides</h2>
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

      {relatedSites.length > 0 && (
        <section className="page-container" aria-labelledby="more-guides-heading">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-4 sm:px-6">
            <h2 id="more-guides-heading" className="text-sm font-semibold text-zinc-300 mb-1">
              More Roblox Guides
            </h2>
            <ul className="space-y-2">
              {relatedSites.map((site) => (
                <li key={site.url} className="text-sm text-zinc-500">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-400 hover:text-amber-300"
                  >
                    {site.label}
                  </a>
                  <span className="text-zinc-600"> — </span>
                  {site.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Pickaxe Preview */}
      <section className="page-container">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-white sm:text-2xl">Pickaxe Progression</h2>
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
        <section className="page-container border-t border-zinc-800/60">
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
                <OptimizedImage
                  src={shot.src}
                  alt={shot.alt}
                  width={768}
                  height={432}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
