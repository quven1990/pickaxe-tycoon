import MergeCalculator from '@/components/MergeCalculator';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';

const seo = PAGE_SEO.calculator;

export const metadata = generateSEOMetadata({
  title: 'Merge Calculator',
  absoluteTitle: seo.title,
  description: seo.description,
  keywords: ['Pickaxe Tycoon calculator', 'Pickaxe Tycoon merge', 'Pickaxe Tycoon legendary pickaxe'],
  path: '/calculator/',
});

const faq = [
  {
    question: 'How does merging work in Pickaxe Tycoon?',
    answer:
      'Merge 3 pickaxes of the same tier to get 1 of the next tier. All 24 pickaxes follow this 3:1 rule.',
  },
  {
    question: 'How many pickaxes do I need to reach Tier 24 (Legendary)?',
    answer:
      'To reach the Legendary Pickaxe (Tier 24), you need 3^23 = 94,143,178,827 Wood Pickaxes if merging from scratch with the standard 3:1 merge rule.',
  },
  {
    question: 'Can I buy pickaxes instead of merging?',
    answer:
      'Yes. Each tier has a shop price except Crystal II and Void II which are merge-only. Buying is faster but costs more money.',
  },
];

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Merge Calculator', url: '/calculator/' },
          ]),
          generateFAQSchema(faq),
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Pickaxe Tycoon Merge Calculator</h1>
        <p className="text-zinc-400 mb-8">
          Select your target tier to see the merge path, pickaxes needed, and estimated buy cost.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-white mb-3">How to Use This Calculator</h2>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">Select Your Target Tier</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Choose any pickaxe from Wood (Tier 1) to Legendary (Tier 24). The tool calculates how many
            starting pickaxes you need using the standard 3:1 merge rule.
          </p>
          <h3 className="text-lg font-semibold text-zinc-200 mb-2">Read the Merge Path</h3>
          <p className="text-sm text-zinc-400">
            The step-by-step merge path shows each tier transition so you can plan bulk buys and avoid
            wasting money on the wrong upgrade level.
          </p>
        </section>

        <MergeCalculator />

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-semibold text-zinc-200 mb-1">{f.question}</h3>
                <p className="text-sm text-zinc-400">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
