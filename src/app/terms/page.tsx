import ContactEmail from '@/components/ContactEmail';
import { getGameConfig } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

const seo = PAGE_SEO.terms;

export const metadata = generateSEOMetadata({
  title: 'Terms of Service',
  absoluteTitle: seo.title,
  description: seo.description,
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

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Agreement to Terms</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Acceptance of These Terms</h3>
        <p>
          By using {config.seo.baseUrl}, you agree to these Terms of Service. If you do not agree,
          please do not use this website.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Non-Affiliation</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Unofficial Fan-Made Website</h3>
        <p>
          {config.game.name} Guide & Tools is an <strong>unofficial, fan-made</strong> companion website.
          We are not affiliated with, endorsed by, or connected to Roblox Corporation, Popular Marketplace,
          or the {config.game.name} development team. This is not the official game website.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Disclaimer</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Game Data Accuracy</h3>
        <p>
          Game data, tier lists, and calculator results are provided as-is based on community research
          and public sources. Values may not reflect the latest in-game updates.
        </p>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Limitation of Liability</h3>
        <p>
          We are not responsible for any actions taken based on information on this site, including
          in-game progress, purchases, or account decisions on Roblox.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Intellectual Property</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Trademarks and Fair Use</h3>
        <p>
          All Roblox and {config.game.name} trademarks belong to their respective owners. This site
          uses game information under fair use for educational and community guide purposes.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Questions About Terms</h3>
        <p>
          Questions about these terms? Email <ContactEmail email={contactEmail} />
        </p>
      </div>
    </>
  );
}
