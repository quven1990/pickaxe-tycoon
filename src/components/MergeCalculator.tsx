'use client';

import { useState, useMemo } from 'react';
import { getPickaxes, formatPowerIndex, GRADE_COLORS } from '@/lib/data';
import { calculateMergePlan } from '@/lib/calculator';

export default function MergeCalculator() {
  const pickaxes = getPickaxes();
  const [targetTier, setTargetTier] = useState(24);

  const plan = useMemo(() => calculateMergePlan(targetTier), [targetTier]);
  const target = pickaxes.find((p) => p.tier === targetTier);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="target-tier" className="block text-sm font-medium text-zinc-400 mb-2">
          Target Pickaxe Tier
        </label>
        <select
          id="target-tier"
          value={targetTier}
          onChange={(e) => setTargetTier(Number(e.target.value))}
          className="w-full max-w-md px-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-amber-500"
        >
          {pickaxes.map((p) => (
            <option key={p.id} value={p.tier}>
              Tier {p.tier} — {p.name}
            </option>
          ))}
        </select>
      </div>

      {target && plan && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Target</div>
            <div className="text-xl font-bold text-white">{target.name}</div>
            <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-bold border ${GRADE_COLORS[target.grade]}`}>
              Grade {target.grade} · Tier {target.tier}
            </span>
          </div>
          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Wood Pickaxes Needed</div>
            <div className="text-2xl font-bold text-amber-400">{plan.totalPickaxesNeeded.toLocaleString()}</div>
            <div className="text-xs text-zinc-500 mt-1">Starting from free Wood Pickaxes (3:1 merge)</div>
          </div>
        </div>
      )}

      {plan && (
        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Merge Path</h3>
          <ol className="space-y-3 max-h-96 overflow-y-auto">
            {plan.steps.map((step, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <div className="font-medium text-zinc-200">{step.action}</div>
                  <div className="text-sm text-zinc-500">{step.detail}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-5">
        <h3 className="font-bold text-amber-300 mb-2">Merge Rules</h3>
        <ul className="text-sm text-zinc-400 space-y-1">
          <li>• Standard merge: 3 pickaxes of the same tier → 1 of the next tier</li>
          <li>• 24 pickaxes total: Wood (Tier 1) → Legendary (Tier 24)</li>
          <li>• Tier 18 Magma Pickaxe requires Magmatic Cavern access</li>
          <li>• Step on the &quot;Merge&quot; platform in-game when eligible combinations exist</li>
        </ul>
      </div>
    </div>
  );
}
