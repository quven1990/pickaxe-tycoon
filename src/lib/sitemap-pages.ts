import { getGameConfig } from './data';

export interface SitemapPage {
  path: string;
  title: string;
  description?: string;
  priority: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  lastUpdated: string;
}

export interface SitemapSection {
  title: string;
  pages: SitemapPage[];
}

const legalLastUpdated = '2026-05-31';

const legalPages: SitemapPage[] = [
  {
    path: '/about/',
    title: 'About',
    description: 'About this fan-made companion site.',
    priority: '0.4',
    changeFrequency: 'monthly',
    lastUpdated: legalLastUpdated,
  },
  {
    path: '/terms/',
    title: 'Terms of Service',
    priority: '0.3',
    changeFrequency: 'monthly',
    lastUpdated: legalLastUpdated,
  },
  {
    path: '/privacy-policy/',
    title: 'Privacy Policy',
    priority: '0.3',
    changeFrequency: 'monthly',
    lastUpdated: legalLastUpdated,
  },
  {
    path: '/sitemap/',
    title: 'Sitemap',
    description: 'Full list of pages on this site.',
    priority: '0.3',
    changeFrequency: 'monthly',
    lastUpdated: legalLastUpdated,
  },
];

const pageDescriptions: Record<string, string> = {
  '/': 'Home — tools, guides, and pickaxe progression overview.',
  '/calculator/': 'Merge calculator — plan your path from Wood to Legendary.',
  '/codes/': 'Active and expired codes, updated daily.',
  '/tier-list/': 'All 24 pickaxes ranked by grade.',
  '/beginner-guide/': 'Complete starter guide for new players.',
  '/wiki/': 'Pickaxe database, ores, and Magmatic Cavern info.',
  '/updates/': 'Patch notes and update history.',
};

export function getSitemapSections(): SitemapSection[] {
  const config = getGameConfig();

  const mainPages: SitemapPage[] = config.routes.map((route) => ({
    path: route.path,
    title: route.title.replace(/^Pickaxe Tycoon\s*/i, '') || 'Home',
    description: pageDescriptions[route.path],
    priority: route.priority,
    changeFrequency: route.path === '/codes/' ? 'daily' : 'weekly',
    lastUpdated: route.lastUpdated ?? config.game.lastUpdated,
  }));

  return [
    { title: 'Tools & Guides', pages: mainPages },
    { title: 'Legal & Info', pages: legalPages },
  ];
}

export function getAllSitemapPages(): SitemapPage[] {
  return getSitemapSections().flatMap((section) => section.pages);
}

export function formatSitemapUrl(path: string): string {
  const baseUrl = getGameConfig().seo.baseUrl;
  if (path === '/') return `${baseUrl}/`;
  return `${baseUrl}${path}`;
}
