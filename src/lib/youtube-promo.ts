/** Landing page slugs used in /yt/VIDEO_ID/SLUG/ short links (no query string — YouTube-friendly). */
export const YT_LANDING_SLUGS = [
  'calculator',
  'wiki',
  'tier-list',
  'beginner-guide',
  'codes',
  'max-level',
] as const;

export type YtLandingSlug = (typeof YT_LANDING_SLUGS)[number];

export const YT_SLUG_TO_PATH: Record<YtLandingSlug, string> = {
  calculator: '/calculator/',
  wiki: '/wiki/',
  'tier-list': '/tier-list/',
  'beginner-guide': '/beginner-guide/',
  codes: '/codes/',
  'max-level': '/guides/max-level/',
};

/** All pre-built /yt/ routes for static export + comment links. */
export const YOUTUBE_PROMO_LINKS: Array<{
  videoId: string;
  slug?: YtLandingSlug;
}> = [
  { videoId: 'qLk29P_Itz4', slug: 'calculator' },
  { videoId: 'OOw3yi0C3J0', slug: 'beginner-guide' },
  { videoId: 'h_byDzchcFY', slug: 'beginner-guide' },
  { videoId: 'uZzhQBvVH5Y', slug: 'calculator' },
  { videoId: 'YEcEekyjVVE', slug: 'beginner-guide' },
  { videoId: 'dgMUGdxTt3E', slug: 'beginner-guide' },
  { videoId: 'FZDkXHjvbOM', slug: 'beginner-guide' },
  { videoId: 'TRQx52aLZOM', slug: 'max-level' },
  { videoId: 'tr81UVBjveo', slug: 'calculator' },
  { videoId: '3v1cjdEOU7k', slug: 'calculator' },
  { videoId: '8dlDhGLEuUQ', slug: 'calculator' },
  { videoId: 'KjMpOvhBgdk', slug: 'tier-list' },
  { videoId: 'u8n7PtBBo30', slug: 'tier-list' },
  { videoId: 'Y7vmmbAcweU', slug: 'wiki' },
  { videoId: 'uZNLyLcVxGE', slug: 'tier-list' },
  { videoId: 'M3A09zZl-ik', slug: 'wiki' },
  { videoId: '8ZHfR3bP6dg' },
  { videoId: 'tu9wYotF_nk', slug: 'calculator' },
  { videoId: '-IdM_NynyBs', slug: 'wiki' },
  { videoId: 'MPjxOlbyfWI' },
];

export function resolveYtLandingPath(slug?: string): string {
  if (!slug) return '/';
  if (slug in YT_SLUG_TO_PATH) {
    return YT_SLUG_TO_PATH[slug as YtLandingSlug];
  }
  return '/';
}

export function getYoutubePromoStaticParams() {
  return YOUTUBE_PROMO_LINKS.map(({ videoId, slug }) => ({
    videoId,
    slug: slug ? [slug] : [],
  }));
}
