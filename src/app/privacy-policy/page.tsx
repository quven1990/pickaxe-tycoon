import { getGameConfig } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Pickaxe Tycoon Guide — how we use analytics, cookies, and your data. Contact privacy@pickaxe-tycoon.xyz.',
  path: '/privacy-policy/',
});

export default function PrivacyPage() {
  const config = getGameConfig();
  const privacyEmail = config.contact?.privacy ?? 'privacy@pickaxe-tycoon.xyz';
  const contactEmail = config.contact?.general ?? 'contract@pickaxe-tycoon.xyz';

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Privacy Policy', url: '/privacy-policy/' },
        ])}
      />
      <div className="max-w-3xl mx-auto px-4 py-10 prose-content">
        <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-zinc-400 text-sm mb-6">Last updated: May 31, 2026</p>

        <p>
          This Privacy Policy explains how <strong>{config.seo.siteTitle}</strong> ({config.seo.baseUrl})
          collects and uses information when you visit our fan-made companion site for {config.game.name}.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Information We Collect</h2>
        <p>We do not ask you to create an account or submit personal information directly. However, we use third-party analytics services that may automatically collect:</p>
        <ul>
          <li>Pages visited and time spent on the site</li>
          <li>Referring website or search query</li>
          <li>Browser type, device type, and approximate location (country/region)</li>
          <li>IP address (typically anonymized by analytics providers)</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Analytics Services</h2>
        <p>We use the following services to understand site usage and improve content:</p>
        <ul>
          <li><strong>Google Analytics (GA4)</strong> — traffic and page performance measurement</li>
          <li><strong>Plausible Analytics</strong> — privacy-friendly, cookieless pageview statistics</li>
          <li><strong>Microsoft Clarity</strong> — session recordings and heatmaps to improve usability</li>
        </ul>
        <p>
          These providers may set cookies or use similar technologies. Each operates under its own privacy policy.
          We do not sell your personal data to third parties.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Cookies</h2>
        <p>
          Analytics tools may use cookies or local storage. You can disable cookies in your browser settings.
          Plausible is designed to work without cookies in most cases.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Third-Party Links</h2>
        <p>
          Our site links to Roblox and other external services. We are not responsible for the privacy practices
          of those third-party websites.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or delete personal data held by
          analytics providers. Contact us and we will help direct your request.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <p>For privacy-related inquiries:</p>
        <p>
          <a href={`mailto:${privacyEmail}`} className="text-amber-400 hover:text-amber-300">
            {privacyEmail}
          </a>
        </p>
        <p>For general site inquiries:</p>
        <p>
          <a href={`mailto:${contactEmail}`} className="text-amber-400 hover:text-amber-300">
            {contactEmail}
          </a>
        </p>
      </div>
    </>
  );
}
