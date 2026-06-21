'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { analyticsPath, trackEvent, type AnalyticsLocation } from '@/lib/analytics';

type AnalyticsLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  location: AnalyticsLocation;
  children: ReactNode;
  external?: boolean;
};

/** Internal navigation with `cta_click` tracking. */
export default function AnalyticsLink({
  href,
  location,
  children,
  external,
  className,
  onClick,
  ...rest
}: AnalyticsLinkProps) {
  const destination = analyticsPath(href);

  const handleClick: ComponentProps<'a'>['onClick'] = (event) => {
    trackEvent('cta_click', { location, destination });
    onClick?.(event as Parameters<NonNullable<ComponentProps<typeof Link>['onClick']>>[0]);
  };

  if (external ?? href.startsWith('http')) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

type OutboundLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  location: AnalyticsLocation;
  event: 'outbound_roblox' | 'related_site_click';
  children: ReactNode;
};

/** External links — Roblox game or related fan sites. */
export function OutboundLink({
  href,
  location,
  event,
  children,
  className,
  onClick,
  ...rest
}: OutboundLinkProps) {
  const destination = analyticsPath(href);

  const handleClick: ComponentProps<'a'>['onClick'] = (clickEvent) => {
    if (event === 'outbound_roblox') {
      trackEvent('outbound_roblox', { location });
    } else {
      trackEvent('related_site_click', { location: 'homepage_related', destination });
    }
    onClick?.(clickEvent);
  };

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
