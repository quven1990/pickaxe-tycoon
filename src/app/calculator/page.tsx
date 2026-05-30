import MergeCalculator from '@/components/MergeCalculator';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Merge Calculator',
  description:
    'Plan your Pickaxe Tycoon merge path from Wood to Legendary. Calculate pickaxes needed and merge steps for any of the 24 tiers.',
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
        <MergeCalculator />
      </div>
    </>
  );
}
