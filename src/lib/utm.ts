import { getGameConfig } from './data';
import type { YtLandingSlug } from './youtube-promo';
import { YT_SLUG_TO_PATH } from './youtube-promo';

export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

/** Build an absolute URL with UTM tags for campaign tracking (GA4 / Plausible). */
export function buildTrackedUrl(path: string, params: UtmParams = {}): string {
  const baseUrl = getGameConfig().seo.baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  url.searchParams.set('utm_source', params.source ?? 'youtube');
  url.searchParams.set('utm_medium', params.medium ?? 'comment');

  if (params.campaign) {
    url.searchParams.set('utm_campaign', params.campaign);
  }
  if (params.content) {
    url.searchParams.set('utm_content', params.content);
  }

  return url.toString();
}

/** Bare-domain short paths for YouTube comments (e.g. pickaxe-tycoon.xyz/c). */
const YT_SHORT_PATH: Partial<Record<YtLandingSlug, string>> = {
  calculator: 'c',
  'beginner-guide': 'b',
  'tier-list': 't',
  wiki: 'w',
  codes: 'c',
  'max-level': 'm',
};

/** Comment link text — use bare domain without https for YouTube. */
export function buildYoutubeCommentLink(slug?: YtLandingSlug): string {
  const domain = new URL(getGameConfig().seo.baseUrl).host;
  const short = slug ? YT_SHORT_PATH[slug] : undefined;
  return short ? `${domain}/${short}` : domain;
}

/** Landing URL with youtube/comment UTM only (no per-video campaign). */
export function buildDirectYoutubeLink(path: string = '/'): string {
  return buildTrackedUrl(path, {
    source: 'youtube',
    medium: 'comment',
  });
}
