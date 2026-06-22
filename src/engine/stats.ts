import type { Stats } from './types'

// Base stats at level 1 by tier (§5 table)
const TIER_BASE: Record<1 | 2 | 3 | 4 | 5, Stats> = {
  1: { heart: 5,  power: 2, speed: 3 },
  2: { heart: 7,  power: 3, speed: 4 },
  3: { heart: 9,  power: 4, speed: 5 },
  4: { heart: 11, power: 5, speed: 6 },
  5: { heart: 13, power: 6, speed: 7 },
}

// Shared growth per level — identical for every creature (§5)
const GROWTH: Stats = { heart: 3, power: 1, speed: 1 }

/** Returns full stats for a creature of the given tier at the given level. Formula: stat = base + growth × (level − 1) */
export function getStats(tier: 1 | 2 | 3 | 4 | 5, level: number): Stats {
  const base = TIER_BASE[tier]
  return {
    heart: base.heart + GROWTH.heart * (level - 1),
    power: base.power + GROWTH.power * (level - 1),
    speed: base.speed + GROWTH.speed * (level - 1),
  }
}
