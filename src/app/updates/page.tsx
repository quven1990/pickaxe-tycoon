import { getUpdates } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

const seo = PAGE_SEO.updates;

export const metadata = generateSEOMetadata({
  title: 'Updates & Patch Notes',
  absoluteTitle: seo.title,
  description: seo.description,
  keywords: ['Pickaxe Tycoon update', 'Pickaxe Tycoon Magmatic Cavern', 'Pickaxe Tycoon news'],
  path: '/updates/',
  type: 'article',
  publishedTime: '2026-04-24',
  modifiedTime: '2026-06-07',
});

export default function UpdatesPage() {
  const updates = getUpdates();

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Updates', url: '/updates/' },
          ]),
          generateArticleSchema({
            title: seo.title,
            description: seo.description,
            path: '/updates/',
            publishedTime: '2026-04-24',
            modifiedTime: '2026-06-07',
          }),
        ]}
      />
      <div className="page-container max-w-3xl">
        <h1 className="page-title mb-2">Pickaxe Tycoon Updates</h1>
        <p className="text-zinc-400 mb-8">
          In-game patch notes and pickaxe-tycoon.xyz site changelog.
        </p>

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
              <h3 className="text-lg font-semibold text-zinc-300 mb-2">Update Highlights</h3>
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
