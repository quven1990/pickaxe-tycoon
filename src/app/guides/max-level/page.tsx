import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

const seo = PAGE_SEO.maxLevelGuide;
const VIDEO_URL = 'https://www.youtube.com/watch?v=TRQx52aLZOM';

export const metadata = generateSEOMetadata({
  title: 'Max Level Guide',
  absoluteTitle: seo.title,
  description: seo.description,
  keywords: [
    'Pickaxe Tycoon max level',
    'Pickaxe Tycoon legendary pickaxe',
    'Melon and Sunny Pickaxe Tycoon',
  ],
  path: '/guides/max-level/',
  type: 'article',
  publishedTime: '2026-06-10',
  modifiedTime: '2026-06-10',
});

function Figure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-6 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <Image src={src} alt={alt} width={1200} height={675} className="h-auto w-full" />
      <figcaption className="px-4 py-2 text-xs text-zinc-500">{caption}</figcaption>
    </figure>
  );
}

export default function MaxLevelGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Max Level Guide', url: '/guides/max-level/' },
          ]),
          generateArticleSchema({
            title: seo.title,
            description: seo.description,
            path: '/guides/max-level/',
            publishedTime: '2026-06-10',
            modifiedTime: '2026-06-10',
          }),
        ]}
      />
      <article className="page-container prose-content max-w-3xl">
        <h1 className="page-title mb-2">Pickaxe Tycoon Max Level Guide</h1>
        <p className="mb-2 text-sm text-zinc-500">
          Based on{' '}
          <a
            href={VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300"
          >
            Melon &amp; Sunny&apos;s max-level run
          </a>
          . Fan summary — not official.
        </p>

        <Figure
          src="/images/game-thumbnail.png"
          alt="Pickaxe Tycoon mining tower with multiple pickaxe tiers"
          caption="Late-game towers stack dozens of pickaxes — the goal is Tier 24 Legendary."
        />

        <h2>What &quot;Max Level&quot; Means</h2>
        <p>
          Max level = <strong>Tier 24 Legendary Pickaxe</strong>, the final index entry. Merge{' '}
          <strong>3 Void Pickaxes</strong> (Tier 23) on the merge platform. There is no tier above
          Legendary in the current build.
        </p>

        <h2>The Core Loop (Every Run Starts Here)</h2>
        <p>From the video&apos;s opening minutes — same loop every player uses:</p>
        <ol>
          <li>
            <strong>Buy a Wood Pickaxe</strong> ($5; you spawn with ~$10). It mines ores
            automatically.
          </li>
          <li>
            <strong>Wait for ores</strong> — early game is mostly coal from your plot.
          </li>
          <li>
            <strong>Deposit ores</strong> at the furnace platform (ores smelt, not just stored).
          </li>
          <li>
            <strong>Collect money</strong> at the cash platform.
          </li>
          <li>
            <strong>Buy 3 pickaxes of the same tier</strong>, then <strong>merge</strong> into the
            next tier.
          </li>
        </ol>

        <Figure
          src="/images/screenshot-2.png"
          alt="Pickaxe Tycoon automatic mining gameplay"
          caption="Pickaxes mine on their own — income is passive once placed."
        />

        <h2>Why Early Game Feels Brutal</h2>
        <p>
          Melon calls it one of the hardest tycoons they&apos;ve played. Coal sells for almost
          nothing (a few dollars per deposit early on). You need <strong>three merges per tier</strong>{' '}
          across 23 upgrades — exponential pickaxe count. Without boosts, Legendary takes a very
          long grind.
        </p>

        <h3>What Speeds It Up</h3>
        <ul>
          <li>
            <strong>Auto Money</strong> (29R$) — collects cash without walking back.
          </li>
          <li>
            <strong>2x All Money</strong> (12R$) — doubles every payout; best Robux-per-dollar ratio.
          </li>
          <li>
            <strong>Auto Loot</strong> (79R$) — AFK ore pickup.
          </li>
          <li>
            <strong>Double Ore</strong> (499R$) — doubles ore volume for faster merges.
          </li>
        </ul>
        <p>
          Their run leans on gamepasses + bulk buying. F2P is doable but expect a much slower climb.
        </p>

        <Figure
          src="/images/screenshot-3.png"
          alt="Pickaxe Tycoon merge platform with three pickaxes combining"
          caption="Always merge 3 identical tiers before bulk-buying the next wave."
        />

        <h2>Merge Milestones Worth Planning</h2>
        <p>Don&apos;t guess costs — use the{' '}
          <Link href="/calculator/" className="text-amber-400 hover:text-amber-300">
            merge calculator
          </Link>{' '}
          before big buys.
        </p>
        <ul>
          <li>
            <strong>Tier 7 Gold</strong> — first real income jump; stop sitting on Wood/Stone.
          </li>
          <li>
            <strong>Tier 12 Sapphire</strong> — mid-game; ore types diversify on higher floors.
          </li>
          <li>
            <strong>Tier 18 Magma</strong> — needs Magmatic Cavern access; gate for S-tier picks.
          </li>
          <li>
            <strong>Tiers 19–23</strong> (Inferno → Void) — pure endgame; only buy when you can
            merge immediately.
          </li>
          <li>
            <strong>Tier 24 Legendary</strong> — 3× Void → done. Index complete.
          </li>
        </ul>

        <Figure
          src="/images/screenshot-4.png"
          alt="Pickaxe Tycoon Magmatic Cavern area with lava theme"
          caption="Magmatic Cavern unlocks Magma-tier merges (Tier 18+) and higher-value ores."
        />

        <h2>Practical Tips From the Run</h2>
        <h3>Merge Before You Buy More</h3>
        <p>
          Three Wood → one Stone beats hoarding six Wood. Same rule at every tier until Legendary.
        </p>
        <h3>Watch the Ore Multiplier</h3>
        <p>
          Global multiplier peaks at <strong>1.5× every ~30 seconds</strong>. Deposit when the bar is
          high, not right after it resets.
        </p>
        <h3>Build the Tower Vertically</h3>
        <p>
          More floors = more pickaxe slots = more parallel mining. Expand the tower as soon as you
          can afford the next platform.
        </p>
        <h3>Don&apos;t Skip Index Tiers</h3>
        <p>
          You must own each tier in order to merge up. See the full{' '}
          <Link href="/tier-list/" className="text-amber-400 hover:text-amber-300">
            24-tier list
          </Link>{' '}
          for grades and power index per pickaxe.
        </p>

        <Figure
          src="/images/screenshot-1.png"
          alt="Pickaxe Tycoon pickaxe collection index screen"
          caption="Complete the pickaxe index — Legendary is the final slot."
        />

        <h2>Bottom Line</h2>
        <p>
          Max level is a merge marathon: furnace loop → cash → buy 3 → merge → repeat, 23 times.
          Melon &amp; Sunny brute-forced it with Robux boosts; you can follow the same route F2P
          with patience and a merge plan.
        </p>
        <p className="text-sm text-zinc-500">
          Tools:{' '}
          <Link href="/calculator/" className="text-amber-400 hover:text-amber-300">
            Merge Calculator
          </Link>
          {' · '}
          <Link href="/tier-list/" className="text-amber-400 hover:text-amber-300">
            Tier List
          </Link>
          {' · '}
          <Link href="/wiki/" className="text-amber-400 hover:text-amber-300">
            Wiki
          </Link>
        </p>
      </article>
    </>
  );
}
