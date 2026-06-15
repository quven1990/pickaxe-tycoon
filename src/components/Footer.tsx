import Link from 'next/link';
import { getGameConfig } from '@/lib/data';

const config = getGameConfig();

const footerLinks = [
  { href: '/terms/', label: 'Terms' },
  { href: '/privacy-policy/', label: 'Privacy' },
  { href: '/about/', label: 'About' },
  { href: '/sitemap/', label: 'Sitemap' },
  { href: '/about/#contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-12 border-t border-zinc-800 bg-zinc-950 sm:mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-zinc-500">
        <nav
          className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-1 hover:text-amber-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mx-auto mb-2 max-w-xl text-xs leading-relaxed sm:text-sm">
          {config.game.name} Guide & Tools — Fan-made companion site. Not affiliated with Roblox Corporation or Popular Marketplace.
        </p>
        <p className="text-xs">&copy; {year} All rights reserved.</p>
      </div>
    </footer>
  );
}
