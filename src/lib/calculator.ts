import { Pickaxe, getPickaxes } from './data';

export interface MergeStep {
  from: Pickaxe;
  to: Pickaxe;
  inputCount: number;
  outputCount: number;
  action: string;
  detail: string;
}

export interface MergePlan {
  currentPickaxe: Pickaxe;
  targetPickaxe: Pickaxe;
  currentQuantity: number;
  targetQuantity: number;
  totalPickaxesNeeded: number;
  additionalPickaxesNeeded: number;
  mergeLevels: number;
  mergeActions: number;
  steps: MergeStep[];
}

const STANDARD_MERGE = 3;

function quantityName(pickaxe: Pickaxe, quantity: number) {
  return quantity === 1 ? pickaxe.name : pickaxe.name.replace(/Pickaxe$/, 'Pickaxes');
}

export function calculateLeafPickaxes(targetTier: number, currentTier = 1, targetQuantity = 1): number {
  return targetQuantity * Math.pow(STANDARD_MERGE, Math.max(0, targetTier - currentTier));
}

export function calculateMergePlan(
  targetTier: number,
  currentTier = 1,
  currentQuantity = 0,
  targetQuantity = 1,
): MergePlan | null {
  const pickaxes = getPickaxes();
  const current = pickaxes.find((p) => p.tier === currentTier);
  const target = pickaxes.find((p) => p.tier === targetTier);
  if (!current || !target || currentTier > targetTier) return null;

  const safeCurrentQuantity = Math.max(0, Math.floor(currentQuantity));
  const safeTargetQuantity = Math.max(1, Math.floor(targetQuantity));
  const totalPickaxesNeeded = calculateLeafPickaxes(targetTier, currentTier, safeTargetQuantity);
  const steps: MergeStep[] = [];
  let mergeActions = 0;

  for (let tier = currentTier; tier < targetTier; tier++) {
    const from = pickaxes.find((p) => p.tier === tier);
    const to = pickaxes.find((p) => p.tier === tier + 1);
    if (!from || !to) continue;

    const outputCount = safeTargetQuantity * Math.pow(STANDARD_MERGE, targetTier - tier - 1);
    const inputCount = outputCount * STANDARD_MERGE;
    mergeActions += outputCount;
    steps.push({
      from,
      to,
      inputCount,
      outputCount,
      action: `${inputCount.toLocaleString()} ${quantityName(from, inputCount)}`,
      detail: `${outputCount.toLocaleString()} ${quantityName(to, outputCount)}`,
    });
  }

  return {
    currentPickaxe: current,
    targetPickaxe: target,
    currentQuantity: safeCurrentQuantity,
    targetQuantity: safeTargetQuantity,
    totalPickaxesNeeded,
    additionalPickaxesNeeded: Math.max(0, totalPickaxesNeeded - safeCurrentQuantity),
    mergeLevels: targetTier - currentTier,
    mergeActions,
    steps,
  };
}
