import { generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy for Pickaxe Tycoon Guide website.',
  path: '/privacy-policy/',
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
      <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
      <p>We respect your privacy. This site:</p>
      <ul>
        <li>Does not collect personal information directly.</li>
        <li>May use analytics services to understand site usage (if configured).</li>
        <li>Does not sell or share user data with third parties.</li>
        <li>Uses cookies only for essential site functionality and analytics.</li>
      </ul>
    </div>
  );
}
