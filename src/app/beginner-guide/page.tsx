import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Beginner Guide',
  description:
    'Complete Pickaxe Tycoon beginner guide — mining ores, 1.5x multiplier timing, merging pickaxes, and building your mining tower.',
  keywords: ['Pickaxe Tycoon guide', 'Pickaxe Tycoon beginner', 'how to play Pickaxe Tycoon'],
  path: '/beginner-guide/',
});

const faq = [
  {
    question: 'How do I start playing Pickaxe Tycoon?',
    answer:
      'You spawn with a free Wood Pickaxe that mines ores automatically. Collect ores from the basin, deposit them at the Deposit Ore platform, then collect money from the Collect Money platform.',
  },
  {
    question: 'How does merging pickaxes work?',
    answer:
      'Step on the Merge platform when you have 3 identical pickaxes. Three of the same tier merge into one of the next tier. There are 24 tiers total.',
  },
  {
    question: 'What is the Ore Multiplier?',
    answer:
      'A global multiplier that changes every 30 seconds, peaking at 1.5x. Deposit ores when the multiplier is at peak for maximum profit.',
  },
  {
    question: 'What are the best gamepasses?',
    answer:
      'Auto Money (29 Robux) and 2x All Money (12 Robux) are the best early investments. Auto Loot and Double Ore help with AFK farming.',
  },
];

export default function BeginnerGuidePage() {
  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Beginner Guide', url: '/beginner-guide/' },
          ]),
          generateFAQSchema(faq),
        ]}
      />
      <article className="max-w-3xl mx-auto px-4 py-10 prose-content">
        <h1 className="text-3xl font-bold text-white mb-2">Pickaxe Tycoon Beginner Guide</h1>
        <p className="text-zinc-400 mb-8 text-base">
          Everything you need to know to start your mining empire — from your first ore to the Legendary Pickaxe.
        </p>

        <h2>Getting Started</h2>
        <p>
          At spawn, you receive a free <strong>Wood Pickaxe</strong> that automatically mines ores.
          Ores accumulate in the wide basin behind the spawn area. Walk over them to collect,
          then head to the <strong>Deposit Ore</strong> platform to process them into money.
        </p>

        <h2>The Core Loop</h2>
        <ol>
          <li><strong>Mine</strong> — Your pickaxe mines ores automatically into the basin</li>
          <li><strong>Collect</strong> — Walk over ores to pick them up</li>
          <li><strong>Deposit</strong> — Step on the &quot;Deposit Ore&quot; platform to process ores</li>
          <li><strong>Collect Money</strong> — Jump on the &quot;Collect Money&quot; platform after processing</li>
          <li><strong>Buy Pickaxes</strong> — Use platforms Buy 1 / 5 / 25 / 100 to purchase more</li>
          <li><strong>Merge</strong> — Step on the Merge platform to combine 3 duplicates into a higher tier</li>
          <li><strong>Repeat</strong> — Build your mining tower and collect all 24 pickaxes</li>
        </ol>

        <h2>Ore Multiplier Strategy</h2>
        <p>
          Watch the <strong>Ore Multiplier</strong> display behind your base anvil. It changes every 30 seconds
          and peaks at <strong>1.5x</strong>. Hold ores in inventory when below peak, and deposit large batches
          only at 1.5x for maximum profit. In early game, focus on buying pickaxes first — multiplier timing
          matters more once you process large ore volumes.
        </p>

        <h2>Pickaxe Progression</h2>
        <p>
          The game has <strong>24 pickaxes</strong> in the index. Standard merge rule: combine 3 pickaxes
          of the same tier to get 1 of the next tier. Key milestones:
        </p>
        <ul>
          <li><strong>Tier 1 Wood</strong> — Free starter pickaxe</li>
          <li><strong>Tier 7 Gold</strong> — First major mid-game milestone</li>
          <li><strong>Tier 14 Crystal</strong> — Late mid-game</li>
          <li><strong>Tier 18 Magma</strong> — Requires Magmatic Cavern access</li>
          <li><strong>Tier 24 Legendary</strong> — MAX tier, final index entry</li>
        </ul>
        <p>
          Use our <Link href="/calculator/" className="text-amber-400 hover:text-amber-300">Merge Calculator</Link> to
          plan your upgrade path.
        </p>

        <h2>Magmatic Cavern (May 2026)</h2>
        <p>
          The May 2026 update expanded the <strong>Magmatic Cavern</strong> underground area with new ores
          (Amber, Kunzite) and tougher enemies. Tier 18 Magma Pickaxe is tied to this area.
          A locked gate hints at future content — watch the <Link href="/updates/" className="text-amber-400 hover:text-amber-300">Updates</Link> page.
        </p>

        <h2>Recommended Gamepasses</h2>
        <ul>
          <li><strong>Auto Money (29 Robux)</strong> — Automatically collects processed money</li>
          <li><strong>2x All Money (12 Robux)</strong> — Doubles all income, best value</li>
          <li><strong>Auto Loot (79 Robux)</strong> — Auto-collects ores from the basin</li>
          <li><strong>Double Ore (499 Robux)</strong> — Doubles ore drops for faster progression</li>
        </ul>

        <h2>Pro Tips</h2>
        <ul>
          <li>Buy in bulk (Buy 25 / Buy 100) for faster merging once income is steady</li>
          <li>Always merge before buying more of the same tier to avoid inventory clutter</li>
          <li>Focus on pickaxe upgrades over furnace speed in early and mid game</li>
          <li>Explore Magmatic Cavern once you reach higher tiers for new ore types</li>
        </ul>
      </article>
    </>
  );
}
