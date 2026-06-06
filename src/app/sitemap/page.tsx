import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import { getGameConfig } from '@/lib/data';
import { formatSitemapUrl, getAllSitemapPages, getSitemapSections } from '@/lib/sitemap-pages';

const seo = PAGE_SEO.sitemap;

export const metadata = generateSEOMetadata({
  title: 'Sitemap',
  absoluteTitle: seo.title,
  description: seo.description,
  path: '/sitemap/',
});

export default function SitemapPage() {
  const config = getGameConfig();
  const sections = getSitemapSections();
  const allPages = getAllSitemapPages();

  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Sitemap', url: '/sitemap/' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${config.game.name} Sitemap`,
            numberOfItems: allPages.length,
            itemListElement: allPages.map((page, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: page.title,
              url: formatSitemapUrl(page.path),
            })),
          },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Sitemap</h1>
        <p className="text-zinc-400 mb-2">
          All {allPages.length} pages on {config.game.name} Guide & Tools.
        </p>
        <p className="text-sm text-zinc-500 mb-8">
          For search engines:{' '}
          <a href="/sitemap.xml" className="text-amber-400 hover:text-amber-300">
            sitemap.xml
          </a>
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-white mb-2 border-b border-zinc-800 pb-2">
                {section.title}
              </h2>
              <h3 className="text-lg font-semibold text-zinc-300 mb-4">
                {section.title === 'Tools & Guides'
                  ? 'Calculator, Codes, Wiki, and Guides'
                  : 'About, Terms, and Privacy'}
              </h3>
              <ul className="space-y-3">
                {section.pages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path}
                      className="group block p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-colors"
                    >
                      <div className="font-medium text-zinc-200 group-hover:text-amber-300 transition-colors">
                        {page.title}
                      </div>
                      {page.description && (
                        <p className="text-sm text-zinc-500 mt-1">{page.description}</p>
                      )}
                      <p className="text-xs text-zinc-600 mt-2 font-mono">{formatSitemapUrl(page.path)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
