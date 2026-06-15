import Link from 'next/link';
import { getGameConfig, getRelatedSites } from '@/lib/data';

const config = getGameConfig();
const relatedSites = getRelatedSites();

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
        {relatedSites.length > 0 && (
          <p className="mb-4 text-xs text-zinc-600 sm:text-sm">
            More Roblox guides:{' '}
            {relatedSites.map((site, i) => (
              <span key={site.url}>
                {i > 0 && ' · '}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 transition-colors hover:text-amber-400"
                >
                  {site.label}
                </a>
              </span>
            ))}
          </p>
        )}
        <p className="mx-auto mb-2 max-w-xl text-xs leading-relaxed sm:text-sm">
          {config.game.name} Guide & Tools — Fan-made companion site. Not affiliated with Roblox Corporation or Popular Marketplace.
        </p>
        <p className="text-xs">&copy; {year} All rights reserved.</p>
      </div>
    </footer>
  );
}
