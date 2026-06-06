import { getPickaxes, GRADE_COLORS } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { PAGE_SEO } from '@/lib/page-seo';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

const seo = PAGE_SEO.tierList;

export const metadata = generateSEOMetadata({
  title: 'Tier List',
  absoluteTitle: seo.title,
  description: seo.description,
  keywords: ['Pickaxe Tycoon tier list', 'best pickaxe Pickaxe Tycoon', 'Pickaxe Tycoon legendary'],
  path: '/tier-list/',
});

const gradeOrder = ['S', 'A', 'B', 'C', 'D'] as const;

export default function TierListPage() {
  const pickaxes = getPickaxes();
  const byGrade = gradeOrder.map((grade) => ({
    grade,
    pickaxes: pickaxes.filter((p) => p.grade === grade),
  }));

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Tier List', url: '/tier-list/' },
        ])}
      />
      <div className="page-container max-w-4xl">
        <h1 className="page-title mb-2">Pickaxe Tycoon Tier List</h1>
        <p className="text-zinc-400 mb-8">
          All 24 pickaxes in the index, ranked by grade. Reach Tier 24 (Legendary Pickaxe) to complete the collection.
        </p>

        {byGrade.map(({ grade, pickaxes: group }) =>
          group.length > 0 ? (
            <section key={grade} className="mb-10">
              <h2 className={`inline-block px-3 py-1 rounded-lg text-sm font-bold border mb-2 ${GRADE_COLORS[grade]}`}>
                Grade {grade}
              </h2>
              <h3 className="text-lg font-semibold text-zinc-200 mb-4">
                {grade === 'S' && 'Endgame Pickaxes — Legendary Tier Goals'}
                {grade === 'A' && 'Late-Game Pickaxes — Magmatic Cavern & Beyond'}
                {grade === 'B' && 'Mid-Game Pickaxes — Strong Merge Targets'}
                {grade === 'C' && 'Early-Mid Pickaxes — First Upgrade Milestones'}
                {grade === 'D' && 'Starter Pickaxes — Wood to Bronze'}
              </h3>
              <div className="space-y-3">
                {group.map((p) => (
                  <div
                    key={p.id}
                    className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-sm text-zinc-500">Tier {p.tier}</div>
                      <div className="mt-1 text-xs text-zinc-600">{p.description}</div>
                    </div>
                    <div className="shrink-0 sm:ml-4 sm:text-right">
                      {p.tier === 1 ? (
                        <span className="text-xs text-green-400">Free</span>
                      ) : (
                        <span className="text-xs text-amber-400/80">Merge 3x prev tier</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null
        )}
      </div>
    </>
  );
}
