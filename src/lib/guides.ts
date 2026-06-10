/**
 * Guide registry — change `path` here only; update short links & redirects together.
 */
export const GUIDES = {
  maxLevel: {
    id: 'max-level',
    path: '/guides/max-level/',
    shortPath: '/m/',
    title: 'Max Level Guide',
    videoId: 'TRQx52aLZOM',
  },
} as const;

export type GuideKey = keyof typeof GUIDES;
