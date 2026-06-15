import ContactEmail from '@/components/ContactEmail';
import { parseEmailAddress } from '@/lib/contact-email';
import { getGameConfig, getRelatedSites } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

const seo = PAGE_SEO.about;

export const metadata = generateSEOMetadata({
  title: 'About',
  absoluteTitle: seo.title,
  description: seo.description,
  path: '/about/',
});

export default function AboutPage() {
  const config = getGameConfig();
  const relatedSites = getRelatedSites();
  const contact = parseEmailAddress(
    config.contact?.general ?? 'contract@pickaxe-tycoon.xyz',
  );

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
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Tools and Guides We Provide</h3>
        <p>
          This is a fan-made companion site for <strong>{config.game.name}</strong>, the Roblox mining
          tycoon game by {config.game.developer}. We provide merge calculators, tier lists, codes tracking,
          and guides to help players progress faster.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Non-Affiliation</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Not Official Roblox or Developer</h3>
        <p>
          This site is not affiliated with Roblox Corporation or Popular Marketplace. All game data is
          sourced from public gameplay, YouTube research, and community resources.
        </p>

        {relatedSites.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-white mt-8 mb-3">Related Fan Wikis</h2>
            <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Other Roblox Game Guides</h3>
            <ul className="space-y-3">
              {relatedSites.map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-amber-400 hover:text-amber-300"
                  >
                    {site.label}
                  </a>
                  <span className="text-zinc-500"> — </span>
                  <span className="text-zinc-400">{site.description}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        <h2 id="contact" className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Get in Touch</h3>
        <p>
          Reach us at <ContactEmail local={contact.local} domain={contact.domain} />
        </p>
      </div>
    </>
  );
}
