/**
 * Per-page absolute titles (40–60 chars) and meta descriptions (140–160 chars).
 *
 * Title/description patterns informed by SERP competitors:
 * - Codes: officialcodezone.com, buildaring.online/codes, lawod.com
 * - Calculator: pickaxe-tycoon-bd3.pages.dev
 * - Beginner: gamelandinsider.com/pickaxe-tycoon-guide
 * - Wiki: pickaxetycoon.wiki
 */

export const PAGE_SEO = {
  calculator: {
    // bd3: "Pickaxe Tycoon Calculator - Merge, Income & Upgrade ROI Tools"
    title: 'Pickaxe Tycoon Merge Calculator — Wood to Legendary',
    description:
      'Free Pickaxe Tycoon merge calculator for Roblox. Plan your 3:1 merge path, see pickaxes needed, step-by-step tiers, and buy costs from Wood to Legendary Tier 24.',
  },
  codes: {
    // officialcodezone: "Pickaxe Tycoon Codes June 2026! | Latest Roblox Codes"
    // buildaring: "Codes (2026) — Free Seeds, Cash & Rewards List" + daily updated
    title: 'Pickaxe Tycoon Codes — Working & Expired List',
    description:
      'All Pickaxe Tycoon codes for Roblox — active and expired list checked daily. Copy codes, learn how to redeem, and bookmark for new drops. Not Pickaxe Simulator.',
  },
  tierList: {
    title: 'Pickaxe Tycoon Tier List — All 24 Pickaxes Ranked',
    description:
      'Complete Pickaxe Tycoon tier list for Roblox. All 24 pickaxes ranked from Wood to Legendary with merge info, grades, and Magmatic Cavern requirements.',
  },
  beginnerGuide: {
    // gamelandinsider: "Pickaxe Tycoon Roblox Guide: Merging, Ore Tiers & Tips"
    title: 'Pickaxe Tycoon Beginner Guide — Mining, Merge & Tower',
    description:
      'Roblox Pickaxe Tycoon beginner guide: mine ores, merge pickaxes, upgrade your furnace, and build a mining tower. Core loop and tips for new players in 2026.',
  },
  maxLevelGuide: {
    title: 'Pickaxe Tycoon Max Level Guide — Tier 24 Legendary Route',
    description:
      'How to reach max level Legendary (Tier 24) in Pickaxe Tycoon on Roblox. Merge milestones, gamepass tips, and late-game route from Melon & Sunny gameplay.',
  },
  wiki: {
    // pickaxetycoon.wiki: "Wiki - Guide, Codes, Pickaxes and Updates" (thin data, source labels)
    // Differentiate: full 24-pickaxe DB + calculator hook, not empty "in progress" tables
    title: 'Pickaxe Tycoon Wiki — 24 Pickaxes, Tools & Updates',
    description:
      'Pickaxe Tycoon wiki with all 24 pickaxes, ores, Magmatic Cavern areas, and merge rules. Free calculator and daily-checked codes status — unofficial Roblox fan database.',
  },
  updates: {
    title: 'Pickaxe Tycoon Updates — Patch Notes & News (2026)',
    description:
      'Latest Pickaxe Tycoon updates and patch notes for Roblox. Magmatic Cavern expansion, developer logs, bug fixes, and new content from Popular Marketplace.',
  },
  about: {
    title: 'About Pickaxe Tycoon Guide — Unofficial Fan Site',
    description:
      'About Pickaxe Tycoon Guide — unofficial fan-made Roblox companion with merge calculator, tier list, codes tracker, and guides. Not affiliated with Roblox.',
  },
  terms: {
    title: 'Terms of Service — Pickaxe Tycoon Guide (Fan Site)',
    description:
      'Terms of Service for Pickaxe Tycoon Guide. Unofficial fan site disclaimer, non-affiliation with Roblox and Popular Marketplace, and rules for using our tools.',
  },
  privacy: {
    title: 'Privacy Policy — Pickaxe Tycoon Guide Fan Site',
    description:
      'Privacy Policy for Pickaxe Tycoon Guide. How we use Google Analytics, Plausible, Microsoft Clarity, cookies, and your data on this unofficial Roblox fan site.',
  },
  sitemap: {
    title: 'Sitemap — Pickaxe Tycoon Guide Tools & Wiki Pages',
    description:
      'Full sitemap of Pickaxe Tycoon Guide. Browse all calculator, codes, tier list, wiki, beginner guide, updates, and legal pages on pickaxe-tycoon.xyz.',
  },
} as const;

/** officialcodezone-style: "Pickaxe Tycoon Codes June 2026! | Latest Roblox Codes" */
export function codesAbsoluteTitle(monthYear: string): string {
  return `Pickaxe Tycoon Codes — ${monthYear} | Daily Updated List`;
}
