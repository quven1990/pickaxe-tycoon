'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { buildTrackedUrl } from '@/lib/utm';

export default function GoRedirect() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const path = searchParams.get('to') || '/';
    const content = searchParams.get('c') || undefined;

    const target = buildTrackedUrl(path, {
      source: 'youtube',
      medium: 'comment',
      content,
    });

    window.location.replace(target);
  }, [searchParams]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="text-zinc-400">Redirecting to Pickaxe Tycoon Guide…</p>
    </div>
  );
}
