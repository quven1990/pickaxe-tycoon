'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { getGameConfig } from '@/lib/data';

const config = getGameConfig();
const gameIcon = config.assets?.icon ?? '/images/game-icon.png';

const navLinks = [
  { href: '/calculator/', label: 'Calculator' },
  { href: '/tier-list/', label: 'Tier List' },
  { href: '/codes/', label: 'Codes' },
  { href: '/beginner-guide/', label: 'Guide' },
  { href: '/wiki/', label: 'Wiki' },
  { href: '/updates/', label: 'Updates' },
];

function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

function isNavActive(pathname: string, href: string): boolean {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  if (target === '/') return current === '/';
  return current === target;
}

const linkBase =
  'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors';
const linkIdle =
  'text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/80';
const linkActive =
  'text-amber-300 bg-amber-500/15 border border-amber-500/35 shadow-sm shadow-amber-500/5';

function NavLink({
  href,
  label,
  pathname,
  onNavigate,
  className = '',
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const active = isNavActive(pathname, href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={`${linkBase} ${active ? linkActive : linkIdle} ${className}`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16">
        <Link
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          className={`flex min-w-0 items-center gap-2 text-base font-bold tracking-tight transition-colors sm:text-lg ${
            pathname === '/'
              ? 'text-amber-300'
              : 'text-white hover:text-amber-400'
          }`}
        >
          <Image
            src={gameIcon}
            alt={`${config.game.name} guide site logo`}
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-md sm:h-8 sm:w-8"
            priority
          />
          <span className="truncate">{config.game.name}</span>
          <span className="hidden font-normal text-zinc-500 sm:inline lg:hidden xl:inline">
            Guide
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              pathname={pathname}
            />
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-amber-500/40 hover:text-amber-300 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-40 bg-black/60 md:hidden sm:top-16"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav"
            className="absolute left-0 right-0 top-full z-50 border-b border-zinc-800 bg-zinc-950 px-4 py-3 shadow-xl shadow-black/40 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              <NavLink
                href="/"
                label="Home"
                pathname={pathname}
                onNavigate={closeMenu}
                className="text-base py-3"
              />
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  pathname={pathname}
                  onNavigate={closeMenu}
                  className="text-base py-3"
                />
              ))}
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
