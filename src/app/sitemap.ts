import { MetadataRoute } from 'next';
import { getGameConfig } from '@/lib/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getGameConfig();
  const baseUrl = config.seo.baseUrl;

  return config.routes.map((route) => ({
    url: `${baseUrl}${route.path === '/' ? '' : route.path.replace(/\/$/, '')}`,
    lastModified: new Date(config.game.lastUpdated),
    changeFrequency: route.path === '/codes/' ? 'daily' : 'weekly',
    priority: parseFloat(route.priority),
  }));
}
