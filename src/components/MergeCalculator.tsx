'use client';

import { useEffect, useMemo, useState } from 'react';
import { getPickaxes, GRADE_COLORS, type Pickaxe } from '@/lib/data';
import { calculateMergePlan } from '@/lib/calculator';
import { tierBucket, trackEvent } from '@/lib/analytics';

const MAX_QUANTITY = 9_999;

function normalizeQuantity(value: string, minimum: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return minimum;
  return Math.min(MAX_QUANTITY, Math.max(minimum, Math.floor(parsed)));
}

function compactNumber(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 1_000_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value);
}

function quantityName(name: string, quantity: number) {
  return quantity === 1 ? name : name.replace(/Pickaxe$/, 'Pickaxes');
}

interface TierPickerProps {
  id: string;
  label: string;
  options: Pickaxe[];
  value: number;
  onChange: (tier: number) => void;
}

function TierPicker({ id, label, options, value, onChange }: TierPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const selected = options.find((pickaxe) => pickaxe.tier === value) ?? options[0];
  const selectedIndex = options.findIndex((pickaxe) => pickaxe.tier === value);
  const filteredOptions = options.filter((pickaxe) => {
    const search = query.trim().toLowerCase();
    if (!search) return true;
    return pickaxe.name.toLowerCase().includes(search)
      || String(pickaxe.tier).includes(search)
      || `grade ${pickaxe.grade.toLowerCase()}`.includes(search);
  });
  const grades = ['D', 'C', 'B', 'A', 'S'] as const;

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const choose = (tier: number) => {
    onChange(tier);
    setOpen(false);
    setQuery('');
  };

  return (
    <div>
      <label id={`${id}-label`} className="mb-2 block text-sm font-medium text-zinc-300">{label}</label>
      <div className="grid grid-cols-[3rem_minmax(0,1fr)_3rem] gap-2">
        <button type="button" aria-label={`Previous ${label.toLowerCase()}`} disabled={selectedIndex <= 0} onClick={() => choose(options[selectedIndex - 1].tier)} className="min-h-12 rounded-lg border border-zinc-700 bg-zinc-950 text-xl text-zinc-300 hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-amber-500">−</button>
        <button id={id} type="button" aria-labelledby={`${id}-label ${id}`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)} className="min-h-12 min-w-0 rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-left hover:border-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
          <span className="flex items-center justify-between gap-2">
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">Tier {selected.tier} · {selected.name}</span>
              <span className="block text-xs text-zinc-500">Grade {selected.grade}</span>
            </span>
            <span aria-hidden="true" className="text-zinc-500">⌄</span>
          </span>
        </button>
        <button type="button" aria-label={`Next ${label.toLowerCase()}`} disabled={selectedIndex < 0 || selectedIndex >= options.length - 1} onClick={() => choose(options[selectedIndex + 1].tier)} className="min-h-12 rounded-lg border border-zinc-700 bg-zinc-950 text-xl text-zinc-300 hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none focus:ring-2 focus:ring-amber-500">+</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="presentation">
          <button type="button" aria-label="Close tier picker" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <div role="dialog" aria-modal="true" aria-labelledby={`${id}-dialog-title`} className="relative z-10 flex max-h-[85dvh] w-full flex-col rounded-t-2xl border border-zinc-700 bg-zinc-900 shadow-2xl sm:max-w-xl sm:rounded-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-4 sm:p-5">
              <div>
                <h2 id={`${id}-dialog-title`} className="text-lg font-bold text-white">Choose {label.toLowerCase()}</h2>
                <p className="mt-1 text-sm text-zinc-400">Search by tier number, name, or grade.</p>
              </div>
              <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="flex h-11 w-11 flex-none items-center justify-center rounded-lg text-xl text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500">×</button>
            </div>
            <div className="border-b border-zinc-800 p-4 sm:px-5">
              <label htmlFor={`${id}-search`} className="sr-only">Search tiers</label>
              <input id={`${id}-search`} autoFocus type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search “Gold” or “7”…" className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 text-base text-white placeholder:text-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <div className="overflow-y-auto p-3 sm:p-4">
              {filteredOptions.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">No matching tiers found.</p>}
              {grades.map((grade) => {
                const gradeOptions = filteredOptions.filter((pickaxe) => pickaxe.grade === grade);
                if (gradeOptions.length === 0) return null;
                return (
                  <section key={grade} className="mb-4 last:mb-0" aria-labelledby={`${id}-grade-${grade}`}>
                    <h3 id={`${id}-grade-${grade}`} className="mb-2 px-2 text-xs font-bold uppercase tracking-widest text-zinc-500">Grade {grade}</h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {gradeOptions.map((pickaxe) => {
                        const active = pickaxe.tier === value;
                        return (
                          <button key={pickaxe.id} type="button" onClick={() => choose(pickaxe.tier)} className={`min-h-14 rounded-xl border p-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-500 ${active ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700 hover:bg-zinc-800'}`}>
                            <span className="flex items-center justify-between gap-3">
                              <span><span className="block font-semibold text-white">{pickaxe.name}</span><span className="mt-0.5 block text-xs text-zinc-500">Tier {pickaxe.tier}</span></span>
                              {active ? <span className="text-sm font-bold text-amber-400">Selected</span> : <span className={`rounded border px-1.5 py-0.5 text-xs font-bold ${GRADE_COLORS[pickaxe.grade]}`}>{pickaxe.grade}</span>}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MergeCalculator() {
  const pickaxes = getPickaxes();
  const [currentTier, setCurrentTier] = useState(1);
  const [currentQuantityInput, setCurrentQuantityInput] = useState('0');
  const [targetTier, setTargetTier] = useState(24);
  const [targetQuantityInput, setTargetQuantityInput] = useState('1');
  const [showAllSteps, setShowAllSteps] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('pickaxe-merge-calculator');
    if (!saved) return;
    try {
      const values = JSON.parse(saved) as Record<string, number>;
      const nextCurrentTier = Math.min(24, Math.max(1, values.currentTier || 1));
      setCurrentTier(nextCurrentTier);
      setCurrentQuantityInput(String(Math.min(MAX_QUANTITY, Math.max(0, values.currentQuantity || 0))));
      setTargetTier(Math.min(24, Math.max(nextCurrentTier, values.targetTier || 24)));
      setTargetQuantityInput(String(Math.min(MAX_QUANTITY, Math.max(1, values.targetQuantity || 1))));
    } catch {
      window.localStorage.removeItem('pickaxe-merge-calculator');
    }
  }, []);

  const currentQuantity = normalizeQuantity(currentQuantityInput, 0);
  const targetQuantity = normalizeQuantity(targetQuantityInput, 1);

  useEffect(() => {
    window.localStorage.setItem(
      'pickaxe-merge-calculator',
      JSON.stringify({ currentTier, currentQuantity, targetTier, targetQuantity }),
    );
    setShowAllSteps(false);
    setCopied(false);
  }, [currentTier, currentQuantity, targetTier, targetQuantity]);

  const plan = useMemo(
    () => calculateMergePlan(targetTier, currentTier, currentQuantity, targetQuantity),
    [targetTier, currentTier, currentQuantity, targetQuantity],
  );

  const visibleSteps = useMemo(() => {
    if (!plan || showAllSteps || plan.steps.length <= 5) return plan?.steps ?? [];
    return [...plan.steps.slice(0, 3), ...plan.steps.slice(-2)];
  }, [plan, showAllSteps]);

  const handleCurrentTier = (tier: number) => {
    setCurrentTier(tier);
    if (tier > targetTier) setTargetTier(tier);
  };

  const reset = () => {
    trackEvent('calculator_reset', { location: 'calculator' });
    setCurrentTier(1);
    setCurrentQuantityInput('0');
    setTargetTier(24);
    setTargetQuantityInput('1');
  };

  const copyResult = async () => {
    if (!plan) return;
    const result = plan.additionalPickaxesNeeded === 0
      ? `Ready to craft ${plan.targetQuantity.toLocaleString()} ${quantityName(plan.targetPickaxe.name, plan.targetQuantity)}.`
      : `Need ${plan.additionalPickaxesNeeded.toLocaleString()} more ${quantityName(plan.currentPickaxe.name, plan.additionalPickaxesNeeded)} to craft ${plan.targetQuantity.toLocaleString()} ${quantityName(plan.targetPickaxe.name, plan.targetQuantity)}.`;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    trackEvent('calculator_copy', {
      location: 'calculator',
      ready: plan.additionalPickaxesNeeded === 0 ? 'yes' : 'no',
      target_tier_bucket: tierBucket(plan.targetPickaxe.tier),
    });
  };

  if (!plan) return null;

  const isReady = plan.additionalPickaxesNeeded === 0;
  const hiddenStepCount = plan.steps.length - visibleSteps.length;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6" aria-labelledby="calculator-inputs">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 id="calculator-inputs" className="text-lg font-bold text-white">Your pickaxes</h2>
              <p className="mt-1 text-sm text-zinc-400">Enter what you have and what you want to craft.</p>
            </div>
            <button type="button" onClick={reset} className="min-h-11 rounded-lg px-3 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500">
              Reset
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <TierPicker id="current-tier" label="Current tier" options={pickaxes} value={currentTier} onChange={handleCurrentTier} />
            </div>
            <div>
              <label htmlFor="current-quantity" className="mb-2 block text-sm font-medium text-zinc-300">Quantity you have</label>
              <input id="current-quantity" type="number" inputMode="numeric" min="0" max={MAX_QUANTITY} value={currentQuantityInput} onFocus={(e) => e.currentTarget.select()} onChange={(e) => setCurrentQuantityInput(e.target.value)} onBlur={() => setCurrentQuantityInput(String(currentQuantity))} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-base text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
            <div>
              <TierPicker id="target-tier" label="Target tier" options={pickaxes.filter((pickaxe) => pickaxe.tier >= currentTier)} value={targetTier} onChange={setTargetTier} />
            </div>
            <div>
              <label htmlFor="target-quantity" className="mb-2 block text-sm font-medium text-zinc-300">Quantity you want</label>
              <input id="target-quantity" type="number" inputMode="numeric" min="1" max={MAX_QUANTITY} value={targetQuantityInput} onFocus={(e) => e.currentTarget.select()} onChange={(e) => setTargetQuantityInput(e.target.value)} onBlur={() => setTargetQuantityInput(String(targetQuantity))} className="min-h-12 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 text-base text-white focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-zinc-900 p-5 sm:p-6 lg:sticky lg:top-20" aria-labelledby="calculation-result" aria-live="polite">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">{isReady ? 'You have enough' : 'You still need'}</div>
          <h2 id="calculation-result" className="mt-2 break-words text-3xl font-black text-white sm:text-4xl">
            {isReady ? 'Ready' : compactNumber(plan.additionalPickaxesNeeded)}
            {!isReady && <span className="ml-2 text-lg font-semibold text-zinc-300 sm:text-xl">{quantityName(plan.currentPickaxe.name, plan.additionalPickaxesNeeded)}</span>}
          </h2>
          {!isReady && plan.additionalPickaxesNeeded >= 1_000_000 && <p className="mt-1 break-all text-sm text-zinc-400">Exact: {plan.additionalPickaxesNeeded.toLocaleString()}</p>}
          <p className="mt-4 text-sm leading-6 text-zinc-300">
            To craft <strong className="text-white">{plan.targetQuantity.toLocaleString()} {quantityName(plan.targetPickaxe.name, plan.targetQuantity)}</strong>
            {currentQuantity > 0 && <> from the <strong className="text-white">{currentQuantity.toLocaleString()}</strong> you already have</>}.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
            <div><div className="text-zinc-500">Merge levels</div><div className="mt-1 font-bold text-white">{plan.mergeLevels}</div></div>
            <div><div className="text-zinc-500">Merge actions</div><div className="mt-1 font-bold text-white">{plan.mergeActions.toLocaleString()}</div></div>
          </div>
          <button type="button" onClick={copyResult} className="mt-5 min-h-12 w-full rounded-lg bg-amber-500 px-4 font-bold text-zinc-950 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-zinc-900">
            {copied ? 'Result copied!' : 'Copy result'}
          </button>
        </section>
      </div>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-6" aria-labelledby="merge-path">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="merge-path" className="text-lg font-bold text-white">Merge path</h2>
            <p className="mt-1 text-sm text-zinc-400">Each merge turns 3 pickaxes into 1 of the next tier.</p>
          </div>
          <span className={`rounded border px-2 py-1 text-xs font-bold ${GRADE_COLORS[plan.targetPickaxe.grade]}`}>Grade {plan.targetPickaxe.grade} · Tier {plan.targetPickaxe.tier}</span>
        </div>

        {plan.steps.length === 0 ? (
          <p className="mt-5 rounded-lg bg-zinc-950/70 p-4 text-sm text-zinc-300">Your current and target tiers match—no merging is required.</p>
        ) : (
          <ol className="mt-5 space-y-3">
            {visibleSteps.map((step, index) => {
              const actualIndex = plan.steps.indexOf(step);
              const showGap = !showAllSteps && hiddenStepCount > 0 && index === 3;
              return (
                <li key={step.from.id}>
                  {showGap && <div className="mb-3 border-y border-dashed border-zinc-700 py-3 text-center text-sm text-zinc-500">{hiddenStepCount} intermediate tiers hidden</div>}
                  <div className="grid grid-cols-[2rem_1fr_auto_1fr] items-center gap-2 rounded-xl bg-zinc-950/60 p-3 sm:grid-cols-[2rem_1fr_2rem_1fr] sm:gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 text-sm font-bold text-amber-400">{actualIndex + 1}</span>
                    <div><div className="font-semibold text-zinc-200">{step.action}</div><div className="text-xs text-zinc-500">Tier {step.from.tier}</div></div>
                    <span aria-hidden="true" className="text-center text-amber-400">→</span>
                    <div><div className="font-semibold text-zinc-200">{step.detail}</div><div className="text-xs text-zinc-500">Tier {step.to.tier}</div></div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        {plan.steps.length > 5 && <button type="button" onClick={() => setShowAllSteps((value) => !value)} className="mt-4 min-h-11 w-full rounded-lg border border-zinc-700 px-4 text-sm font-semibold text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500">{showAllSteps ? 'Show fewer steps' : `Show all ${plan.steps.length} steps`}</button>}
      </section>

      <details className="group rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <summary className="min-h-8 cursor-pointer list-none font-bold text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500">Merge rules <span className="float-right text-zinc-500 group-open:rotate-180">⌄</span></summary>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400">
          <li>• Standard merge: 3 pickaxes of the same tier → 1 of the next tier</li>
          <li>• 24 pickaxes total: Wood (Tier 1) → Golden (Tier 24)</li>
          <li>• Every tier follows the same 3:1 progression shown above</li>
          <li>• Step on the &quot;Merge&quot; platform in-game when eligible combinations exist</li>
        </ul>
      </details>
    </div>
  );
}
