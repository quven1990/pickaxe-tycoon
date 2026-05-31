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

/**
 * Best for YouTube comments — clean path, no `?` query string.
 * Example: https://pickaxe-tycoon.xyz/yt/qLk29P_Itz4/calculator/
 */
export function buildYoutubeCommentLink(
  videoId: string,
  slug?: YtLandingSlug
): string {
  const baseUrl = getGameConfig().seo.baseUrl;
  if (slug) {
    return `${baseUrl}/yt/${videoId}/${slug}/`;
  }
  return `${baseUrl}/yt/${videoId}/`;
}

/** Direct landing URL with UTM (also clickable on YouTube; use if /yt/ ever fails). */
export function buildDirectYoutubeLink(
  videoId: string,
  path: string = '/'
): string {
  return buildTrackedUrl(path, {
    source: 'youtube',
    medium: 'comment',
    campaign: videoId,
  });
}

/** @deprecated YouTube often won't auto-link query-string /go/ URLs — use buildYoutubeCommentLink */
export function buildShortTrackingLink(options: {
  videoId: string;
  path?: string;
  content?: string;
}): string {
  const slug = pathToYtSlug(options.path);
  return buildYoutubeCommentLink(options.videoId, slug);
}

function pathToYtSlug(path?: string): YtLandingSlug | undefined {
  if (!path || path === '/') return undefined;
  const normalized = path.replace(/^\/|\/$/g, '');
  if (normalized in YT_SLUG_TO_PATH) {
    return normalized as YtLandingSlug;
  }
  return undefined;
}
