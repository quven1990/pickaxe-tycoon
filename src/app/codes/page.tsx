import Link from 'next/link';
import { CopyButton } from '@/components/CopyButton';
import { JsonLd } from '@/components/JsonLd';
import { getCodesData, getGameConfig } from '@/lib/data';
import { PAGE_SEO, codesAbsoluteTitle } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema, getCurrentDateString } from '@/lib/seo';

const config = getGameConfig();
const codesData = getCodesData();
const currentDate = getCurrentDateString();
const seo = PAGE_SEO.codes;

export const metadata = generateSEOMetadata({
  title: `Codes (${currentDate})`,
  absoluteTitle: codesAbsoluteTitle(currentDate),
  description: seo.description,
  keywords: ['Pickaxe Tycoon codes', 'Pickaxe Tycoon codes 2026', 'roblox Pickaxe Tycoon codes'],
  path: '/codes/',
});

const faqItems = [
  {
    question: 'Are there any active Pickaxe Tycoon codes?',
    answer:
      'As of May 2026, no verified active codes exist. Pickaxe Tycoon is a new game and has not yet implemented a standard code redemption system. This page is monitored daily.',
  },
  {
    question: 'How do I redeem Pickaxe Tycoon codes when they release?',
    answer:
      'When codes become available, open Pickaxe Tycoon on Roblox, find the Settings or Menu button, look for a Codes or Redeem option, enter the code exactly (case-sensitive), and click Submit.',
  },
  {
    question: 'When will new Pickaxe Tycoon codes be released?',
    answer:
      'Codes typically drop with major updates, milestone celebrations, or seasonal events. The Magmatic Cavern update (May 2026) may bring the first codes.',
  },
  {
    question: 'Why is my Pickaxe Tycoon code not working?',
    answer:
      'Codes may be expired, case-sensitive, or already redeemed. Double-check spelling and verify the code is listed as active on this page.',
  },
];

export default function CodesPage() {
  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Codes', url: '/codes/' },
          ]),
          generateFAQSchema(faqItems),
        ]}
      />
      <div className="page-container max-w-4xl">
        <h1 className="page-title mb-2">Pickaxe Tycoon Codes ({currentDate})</h1>
        <p className="text-zinc-400 mb-2">
          All working codes for {config.game.name}. Verified daily.
        </p>
        <p className="text-sm text-zinc-500 mb-8">
          Last checked:{' '}
          <time dateTime={codesData.lastChecked ?? codesData.lastUpdated}>
            {codesData.lastChecked ?? codesData.lastUpdated}
          </time>
          {codesData.lastUpdated !== codesData.lastChecked && (
            <>
              {' '}
              · Codes last changed:{' '}
              <time dateTime={codesData.lastUpdated}>{codesData.lastUpdated}</time>
            </>
          )}
          {' '}
          · Stats synced from Roblox API
        </p>

        {/* Active Codes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            Active Codes
          </h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-4">Currently Working Codes</h3>
          {codesData.activeCodes.length === 0 ? (
            <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <p className="text-zinc-400 mb-2">No active codes right now.</p>
              <p className="text-sm text-zinc-500">{codesData.notes}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {codesData.activeCodes.map((item) => (
                <div key={item.code} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <code className="text-xl font-mono font-bold text-green-400">{item.code}</code>
                    <CopyButton code={item.code} />
                  </div>
                  <div className="text-sm text-zinc-300">Reward: {item.reward}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* How to Redeem */}
        <section className="mb-12 p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">How to Redeem Codes</h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-3">Step-by-Step Redemption</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
            <li>Launch <strong className="text-zinc-200">Pickaxe Tycoon</strong> on Roblox.</li>
            <li>Look for the <strong className="text-zinc-200">Settings</strong> or <strong className="text-zinc-200">Menu</strong> button.</li>
            <li>Find and click <strong className="text-zinc-200">&quot;Codes&quot;</strong> or <strong className="text-zinc-200">&quot;Redeem Code&quot;</strong>.</li>
            <li>Copy a code from above and paste it (case-sensitive).</li>
            <li>Click <strong className="text-zinc-200">Submit</strong> to claim rewards.</li>
          </ol>
        </section>

        {/* Related */}
        <section className="mb-12 p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <h2 className="text-lg font-bold text-amber-300 mb-3">More Guides</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/tier-list/" className="px-4 py-2 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
              Tier List →
            </Link>
            <Link href="/calculator/" className="px-4 py-2 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
              Merge Calculator →
            </Link>
            <Link href="/beginner-guide/" className="px-4 py-2 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
              Beginner Guide →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">FAQ</h2>
          <div className="space-y-4">
            {faqItems.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-semibold text-zinc-200 mb-1">{f.question}</h3>
                <p className="text-sm text-zinc-400">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
