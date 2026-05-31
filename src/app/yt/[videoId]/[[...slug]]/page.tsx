import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generateSEOMetadata } from '@/lib/seo';
import { getYoutubePromoStaticParams } from '@/lib/youtube-promo';
import YtRedirect from './YtRedirect';

const seo = generateSEOMetadata({
  title: 'Redirect',
  description: 'Redirecting to Pickaxe Tycoon Guide.',
  path: '/yt/',
});

export const metadata: Metadata = {
  ...seo,
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getYoutubePromoStaticParams();
}

export default function YtRedirectPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-24 text-center text-zinc-400">
          Loading…
        </div>
      }
    >
      <YtRedirect />
    </Suspense>
  );
}
