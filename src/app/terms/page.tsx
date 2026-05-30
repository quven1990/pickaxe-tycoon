import { getGameConfig } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for Pickaxe Tycoon Guide website.',
  path: '/terms/',
});

export default function TermsPage() {
  const config = getGameConfig();
  const contactEmail = config.contact?.general ?? 'contract@pickaxe-tycoon.xyz';

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Terms of Service', url: '/terms/' },
        ])}
      />
      <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
        <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-zinc-400 text-sm mb-6">Last updated: May 31, 2026</p>
        <p>By using this website, you agree to the following terms:</p>
        <ul>
          <li>This is a fan-made site and is not affiliated with Roblox or the game developer.</li>
          <li>Game data is provided as-is and may not reflect the latest in-game values.</li>
          <li>We are not responsible for any actions taken based on information on this site.</li>
          <li>All Roblox trademarks belong to Roblox Corporation.</li>
        </ul>
        <h2 className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>
          Questions about these terms? Email{' '}
          <a href={`mailto:${contactEmail}`} className="text-amber-400 hover:text-amber-300">
            {contactEmail}
          </a>
        </p>
      </div>
    </>
  );
}
