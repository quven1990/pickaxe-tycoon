import ContactEmail from '@/components/ContactEmail';
import { getGameConfig } from '@/lib/data';
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

        <h2 id="contact" className="text-xl font-bold text-white mt-8 mb-3">Contact</h2>
        <h3 className="text-lg font-semibold text-zinc-200 mt-4 mb-2">Get in Touch</h3>
        <p>
          Reach us at <ContactEmail email={contactEmail} />
        </p>
      </div>
    </>
  );
}
