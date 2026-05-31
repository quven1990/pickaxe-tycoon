'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { resolveYtLandingPath } from '@/lib/youtube-promo';
import { buildTrackedUrl } from '@/lib/utm';

export default function YtRedirect() {
  const params = useParams();
  const slugParts = params.slug as string[] | undefined;
  const slug = slugParts?.[0];

  useEffect(() => {
    const path = resolveYtLandingPath(slug);
    const target = buildTrackedUrl(path, {
      source: 'youtube',
      medium: 'comment',
    });

    window.location.replace(target);
  }, [slug]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-zinc-400">Redirecting to Pickaxe Tycoon Guide…</p>
    </div>
  );
}
