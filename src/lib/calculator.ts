import { Pickaxe, getPickaxes } from './data';

export interface MergeStep {
  action: string;
  detail: string;
}

export interface MergePlan {
  targetPickaxe: Pickaxe;
  totalPickaxesNeeded: number;
  steps: MergeStep[];
}

const STANDARD_MERGE = 3;

export function calculateLeafPickaxes(targetTier: number): number {
  return Math.pow(STANDARD_MERGE, targetTier - 1);
}

export function calculateMergePlan(targetTier: number): MergePlan | null {
  const pickaxes = getPickaxes();
  const target = pickaxes.find((p) => p.tier === targetTier);
  if (!target) return null;

  const steps: MergeStep[] = [];
  const totalPickaxesNeeded = calculateLeafPickaxes(targetTier);

  for (let tier = targetTier; tier > 1; tier--) {
    const current = pickaxes.find((p) => p.tier === tier);
    const prev = pickaxes.find((p) => p.tier === tier - 1);
    if (!current || !prev) continue;

    const neededAtTier = calculateLeafPickaxes(tier);
    steps.unshift({
      action: `Merge ${STANDARD_MERGE}x ${prev.name}`,
      detail: `→ ${neededAtTier.toLocaleString()}x ${current.name}`,
    });
  }

  steps.unshift({
    action: `Start with ${totalPickaxesNeeded.toLocaleString()} Wood Pickaxes`,
    detail: 'Free at spawn — merge up through each tier (3:1 ratio)',
  });

  return {
    targetPickaxe: target,
    totalPickaxesNeeded,
    steps,
  };
}
