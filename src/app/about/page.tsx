import { getGameConfig } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'About',
  description: 'About Pickaxe Tycoon Guide — a fan-made companion site for the Roblox mining tycoon game.',
  path: '/about/',
});

export default function AboutPage() {
  const config = getGameConfig();
  const contactEmail = config.contact?.general ?? 'contract@pickaxe-tycoon.xyz';

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'About', url: '/about/' },
        ])}
      />
      <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
        <h1 className="text-3xl font-bold text-white mb-4">About</h1>

        <h2 className="text-xl font-bold text-white mt-6 mb-3">What This Site Is</h2>
        <p>
          This is a fan-made companion site for <strong>{config.game.name}</strong>, the Roblox mining
          tycoon game by {config.game.developer}. We provide merge calculators, tier lists, codes tracking,
          and guides to help players progress faster.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Non-Affiliation</h2>
        <p>
          This site is not affiliated with Roblox Corporation or Popular Marketplace. All game data is
          sourced from public gameplay, YouTube research, and community resources.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>
          Reach us at{' '}
          <a href={`mailto:${contactEmail}`} className="text-amber-400 hover:text-amber-300">
            {contactEmail}
          </a>
        </p>
      </div>
    </>
  );
}
