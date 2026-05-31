import { getGameConfig } from './data';

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

/** Short redirect link: /go/?v=VIDEO_ID&to=/calculator/ */
export function buildShortTrackingLink(options: {
  videoId: string;
  path?: string;
  content?: string;
}): string {
  const baseUrl = getGameConfig().seo.baseUrl;
  const url = new URL(`${baseUrl}/go/`);
  url.searchParams.set('v', options.videoId);
  if (options.path && options.path !== '/') {
    url.searchParams.set('to', options.path.startsWith('/') ? options.path : `/${options.path}`);
  }
  if (options.content) {
    url.searchParams.set('c', options.content);
  }
  return url.toString();
}
