import { getUpdates } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Pickaxe Tycoon Updates',
  description:
    'Latest Pickaxe Tycoon updates — Magmatic Cavern expansion, patch notes, and developer logs.',
  keywords: ['Pickaxe Tycoon update', 'Pickaxe Tycoon Magmatic Cavern', 'Pickaxe Tycoon news'],
  path: '/updates/',
});

export default function UpdatesPage() {
  const updates = getUpdates();

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Updates', url: '/updates/' },
        ])}
      />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Pickaxe Tycoon Updates</h1>
        <p className="text-zinc-400 mb-8">Patch notes and update history for Pickaxe Tycoon.</p>

        <div className="space-y-6">
          {updates.map((update) => (
            <article key={update.id} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <time dateTime={update.date} className="text-xs text-amber-400 font-mono">
                  {update.date}
                </time>
                <span className="text-xs text-zinc-600">{update.version}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{update.title}</h2>
              <p className="text-zinc-400 text-sm mb-4">{update.summary}</p>
              <ul className="text-sm text-zinc-500 space-y-1">
                {update.highlights.map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
