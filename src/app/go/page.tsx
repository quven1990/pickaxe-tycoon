import type { Metadata } from 'next';
import { Suspense } from 'react';
import { generateSEOMetadata } from '@/lib/seo';
import GoRedirect from './GoRedirect';

const seo = generateSEOMetadata({
  title: 'Redirect',
  description: 'Redirecting to Pickaxe Tycoon Guide.',
  path: '/go/',
});

export const metadata: Metadata = {
  ...seo,
  robots: { index: false, follow: false },
};

export default function GoPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-lg mx-auto px-4 py-24 text-center text-zinc-400">
          Loading…
        </div>
      }
    >
      <GoRedirect />
    </Suspense>
  );
}
