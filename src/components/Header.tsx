import Link from 'next/link';
import Image from 'next/image';
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

export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight hover:text-amber-400 transition-colors">
          <Image
            src={gameIcon}
            alt={`${config.game.name} guide site logo`}
            width={28}
            height={28}
            className="w-7 h-7 rounded-md"
            priority
          />
          {config.game.name}
          <span className="text-xs text-zinc-500 font-normal hidden sm:inline">Guide & Tools</span>
        </Link>
        <nav className="flex items-center gap-0.5 text-sm font-medium overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2.5 py-2 rounded-md text-zinc-400 hover:text-amber-300 hover:bg-zinc-800/80 transition-colors whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
