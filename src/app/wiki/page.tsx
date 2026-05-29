import { getPickaxes, getAreas, getOres, GRADE_COLORS } from '@/lib/data';
import { JsonLd } from '@/components/JsonLd';
import { generateSEOMetadata, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Pickaxe Tycoon Wiki',
  description:
    'Pickaxe Tycoon wiki — complete pickaxe database (24 tiers), ores guide, Magmatic Cavern area info, and merge rules.',
  keywords: ['Pickaxe Tycoon wiki', 'Pickaxe Tycoon all pickaxes', 'Magmatic Cavern Pickaxe Tycoon'],
  path: '/wiki/',
});

export default function WikiPage() {
  const pickaxes = getPickaxes();
  const areas = getAreas();
  const ores = getOres();

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Wiki', url: '/wiki/' },
        ])}
      />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">Pickaxe Tycoon Wiki</h1>
        <p className="text-zinc-400 mb-8">
          Complete database of all 24 pickaxes, ores, areas, and merge mechanics.
        </p>

        <section className="mb-10 p-6 rounded-xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-3">Merge Rules</h2>
          <p className="text-sm text-zinc-400">
            3 pickaxes of the same tier = 1 pickaxe of the next tier. Example: 3 Wood → 1 Stone.
            Complete all 24 tiers to fill the pickaxe index.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Areas</h2>
          <div className="space-y-3">
            {areas.map((area) => (
              <div key={area.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white">{area.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    area.status === 'locked' ? 'bg-zinc-700 text-zinc-400' :
                    area.status === 'expanded' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {area.status}
                  </span>
                </div>
                <p className="text-sm text-zinc-400">{area.description}</p>
                {area.ores && (
                  <p className="text-xs text-zinc-500 mt-2">Ores: {area.ores.join(', ')}</p>
                )}
                {area.pickaxeUnlock && (
                  <p className="text-xs text-amber-500/80 mt-1">{area.pickaxeUnlock}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Ores</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {ores.map((ore) => (
              <div key={ore.id} className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="font-medium text-zinc-200">{ore.name}</div>
                <div className="text-xs text-zinc-500">{ore.tierRange} · {ore.rarity}</div>
                <p className="text-xs text-zinc-600 mt-1">{ore.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Pickaxe Index (24 Total)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {pickaxes.map((p) => (
                  <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50">
                    <td className="py-3 px-4 font-mono text-amber-400">{p.tier}</td>
                    <td className="py-3 px-4 font-medium text-zinc-200">{p.name}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${GRADE_COLORS[p.grade]}`}>
                        {p.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-500 text-xs">{p.notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
