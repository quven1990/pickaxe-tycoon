import type { Metadata } from 'next';
import ShortRedirect from '@/components/ShortRedirect';

export const metadata: Metadata = {
  title: 'Redirect',
  robots: { index: false, follow: false },
};

export default function WikiShortLinkPage() {
  return <ShortRedirect path="/wiki/" />;
}
