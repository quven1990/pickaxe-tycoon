'use client';

import { useEffect } from 'react';
import { buildTrackedUrl } from '@/lib/utm';

export default function ShortRedirect({ path }: { path: string }) {
  useEffect(() => {
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
