import Link from 'next/link';
import { getGameConfig } from '@/lib/data';

const config = getGameConfig();

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-800 mt-16 py-8 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-zinc-500">
        <div className="flex justify-center gap-4 mb-3">
          <Link href="/terms/" className="hover:text-amber-400 transition-colors">Terms</Link>
          <Link href="/privacy-policy/" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link href="/about/" className="hover:text-amber-400 transition-colors">About</Link>
          <Link href="/sitemap/" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          <Link href="/about/#contact" className="hover:text-amber-400 transition-colors">
            Contact
          </Link>
        </div>
        <p className="mb-2">
          {config.game.name} Guide & Tools — Fan-made companion site. Not affiliated with Roblox Corporation or Popular Marketplace.
        </p>
        <p>&copy; {year} All rights reserved.</p>
      </div>
    </footer>
  );
}
