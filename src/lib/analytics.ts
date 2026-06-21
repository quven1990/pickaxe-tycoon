/** Low-cardinality tier bucket for calculator analytics. */
export function tierBucket(tier: number): 'early' | 'mid' | 'late' {
  if (tier <= 6) return 'early';
  if (tier <= 14) return 'mid';
  return 'late';
}

export type AnalyticsLocation =
  | 'homepage_hero'
  | 'homepage_stats'
  | 'homepage_tools'
  | 'homepage_wiki'
  | 'homepage_related'
  | 'header_nav'
  | 'mobile_nav'
  | 'wiki_hub'
  | 'codes_active'
  | 'codes_wait'
  | 'codes_related'
  | 'calculator';

export type AnalyticsEvent =
  | 'outbound_roblox'
  | 'calculator_copy'
  | 'calculator_reset'
  | 'code_copy'
  | 'cta_click'
  | 'nav_click'
  | 'related_site_click'
  | 'campaign_redirect';

type EventProps = {
  outbound_roblox: { location: AnalyticsLocation };
  calculator_copy: { location: 'calculator'; ready: 'yes' | 'no'; target_tier_bucket: string };
  calculator_reset: { location: 'calculator' };
  code_copy: { location: 'codes_active' };
  cta_click: { location: AnalyticsLocation; destination: string };
  nav_click: { location: 'header_nav' | 'mobile_nav'; destination: string };
  related_site_click: { location: 'homepage_related'; destination: string };
  campaign_redirect: { channel: string; destination: string };
};

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function toPropStrings(props: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined && value !== ''),
  );
}

/** Fire Plausible custom event (+ mirror to GA4 when loaded). */
export function trackEvent<E extends AnalyticsEvent>(
  name: E,
  props: EventProps[E],
): void {
  if (typeof window === 'undefined') return;

  const stringProps = toPropStrings(props as Record<string, string>);

  window.plausible?.(name, Object.keys(stringProps).length ? { props: stringProps } : undefined);
  window.gtag?.('event', name, stringProps);
}

/** Normalize internal paths for consistent Plausible property values. */
export function analyticsPath(href: string): string {
  if (href.startsWith('http')) {
    try {
      const url = new URL(href);
      return url.hostname.replace(/^www\./, '');
    } catch {
      return href;
    }
  }
  const path = href.split('?')[0].split('#')[0];
  return path.endsWith('/') ? path : `${path}/`;
}
