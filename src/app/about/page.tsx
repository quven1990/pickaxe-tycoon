import { getGameConfig } from '@/lib/data';
import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'About',
  description: 'About Pickaxe Tycoon Guide — a fan-made companion site for the Roblox mining tycoon game.',
  path: '/about/',
});

export default function AboutPage() {
  const config = getGameConfig();
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
      <h1 className="text-3xl font-bold text-white mb-4">About</h1>
      <p>
        This is a fan-made companion site for <strong>{config.game.name}</strong>, the Roblox mining
        tycoon game by {config.game.developer}. We provide merge calculators, tier lists, codes tracking,
        and guides to help players progress faster.
      </p>
      <p>
        This site is not affiliated with Roblox Corporation or Popular Marketplace. All game data is
        sourced from public gameplay, YouTube research, and community resources.
      </p>
    </div>
  );
}
