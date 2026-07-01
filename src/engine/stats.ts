import type { Stats, Ivs } from './types'
import { ZERO_IVS } from './ivs'

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

/**
 * Full stats for a creature of the given tier + level, including its IVs (§5).
 * Formula: `stat = (base + IV) + growth × (level − 1)`. IVs default to 0, so
 * `getStats(tier, level)` still yields the pure base+growth curve.
 */
export function getStats(tier: 1 | 2 | 3 | 4 | 5, level: number, ivs: Ivs = ZERO_IVS): Stats {
  const base = TIER_BASE[tier]
  return {
    heart: (base.heart + ivs.heart) + GROWTH.heart * (level - 1),
    power: (base.power + ivs.power) + GROWTH.power * (level - 1),
    speed: (base.speed + ivs.speed) + GROWTH.speed * (level - 1),
  }
}
