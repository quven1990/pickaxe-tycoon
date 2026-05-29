import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service for Pickaxe Tycoon Guide website.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
      <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
      <p>By using this website, you agree to the following terms:</p>
      <ul>
        <li>This is a fan-made site and is not affiliated with Roblox or the game developer.</li>
        <li>Game data is provided as-is and may not reflect the latest in-game values.</li>
        <li>We are not responsible for any actions taken based on information on this site.</li>
        <li>All Roblox trademarks belong to Roblox Corporation.</li>
      </ul>
    </div>
  );
}
