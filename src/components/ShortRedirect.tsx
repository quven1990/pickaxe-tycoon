'use client';

import { useEffect, useRef } from 'react';
import { analyticsPath, trackEvent } from '@/lib/analytics';
import { buildTrackedUrl } from '@/lib/utm';

export default function ShortRedirect({ path }: { path: string }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    trackEvent('campaign_redirect', {
      channel: 'youtube',
      destination: analyticsPath(path),
    });

    const target = buildTrackedUrl(path, {
      source: 'youtube',
      medium: 'comment',
    });
    window.location.replace(target);
  }, [path]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-zinc-400">Redirecting…</p>
    </div>
  );
}
