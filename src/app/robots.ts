import { MetadataRoute } from 'next';
import { getGameConfig } from '@/lib/data';

export const dynamic = 'force-static';

const crawlDisallow = ['/go/', '/yt/', '/cdn-cgi/'];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getGameConfig().seo.baseUrl;

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: crawlDisallow,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: crawlDisallow,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: crawlDisallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl.replace(/^https?:\/\//, ''),
  };
}
