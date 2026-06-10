import type { Metadata } from 'next';
import ShortRedirect from '@/components/ShortRedirect';
import { GUIDES } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Redirect',
  robots: { index: false, follow: false },
};

/** Stable short link: pickaxe-tycoon.xyz/m → max level guide */
export default function MaxLevelShortLinkPage() {
  return <ShortRedirect path={GUIDES.maxLevel.path} />;
}
