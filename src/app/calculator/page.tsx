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
      <div className="page-container max-w-4xl">
        <h1 className="page-title mb-2">Pickaxe Tycoon Merge Calculator</h1>
        <p className="text-zinc-400 mb-6 sm:mb-8">
          Enter the pickaxes you have and instantly see what you still need to reach your target tier.
        </p>

        <MergeCalculator />

        <details className="group mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <summary className="min-h-8 cursor-pointer list-none text-lg font-bold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
            How to use this calculator <span className="float-right text-zinc-500 group-open:rotate-180">⌄</span>
          </summary>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold text-zinc-200">1. Enter what you have</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">Select your current pickaxe tier and quantity. Use zero if you are starting from scratch.</p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-200">2. Choose your target</h3>
              <p className="mt-1 text-sm leading-6 text-zinc-400">Pick the tier and quantity you want. Your result and exact 3:1 merge path update instantly.</p>
            </div>
          </div>
        </details>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faq.map((f) => (
              <details key={f.question} className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <summary className="min-h-8 cursor-pointer list-none font-semibold text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                  {f.question} <span className="float-right ml-3 text-zinc-500 group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
