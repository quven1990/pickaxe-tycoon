import { MetadataRoute } from 'next';
import { getGameConfig } from '@/lib/data';
import { getAllSitemapPages } from '@/lib/sitemap-pages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getGameConfig();
  const baseUrl = config.seo.baseUrl;
  const lastModified = new Date(config.game.lastUpdated);

  return getAllSitemapPages().map((page) => ({
    url: page.path === '/' ? `${baseUrl}/` : `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: parseFloat(page.priority),
  }));
}
