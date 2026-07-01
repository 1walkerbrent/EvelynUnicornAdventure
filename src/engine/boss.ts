import type { Stats, Element } from './types'
import type { BattlePony } from './battle'
import { getStats } from './stats'
import { MAX_IVS } from './ivs'

// Boss / special-pony stat modifiers (§8). Tiered multipliers applied AFTER the
// stat formula (including max IVs) to enemy ponies in combat. These are
// combat-only — they never touch a tamed copy's stats (a Guardian signature is
// awarded as a normal roster pony that merely keeps its max IVs).
//
// Pipeline for every boss pony:
//   1. Look up base stats for the pony's tier (zone)
//   2. Use max IVs (3/3/3)
//   3. Compute raw stat: (base + 3) + growth × (level − 1)      → getStats(tier, level, MAX_IVS)
//   4. Apply the boss multiplier: round(raw × mult)              → applyBossMod

export type BossTier = 'hunt' | 'trialTeam' | 'guardian' | 'champion'

export interface BossMod {
  heart: number
  power: number
  speed: number
}

// The tuning dials — easy to find and adjust. Level rules per tier (applied by
// callers, which own the relevant context) are:
//   hunt      → party top level + HUNT_LEVEL_BONUS
//   trialTeam → zone level cap
//   guardian  → zone level cap + 1
//   champion  → 15
export const BOSS_MODS: Record<BossTier, BossMod> = {
  hunt:      { heart: 1.0, power: 1.0, speed: 1.0 },
  trialTeam: { heart: 1.0, power: 1.0, speed: 1.0 },
  guardian:  { heart: 1.0, power: 1.0, speed: 1.0 },
  champion:  { heart: 1.0, power: 1.0, speed: 1.0 },
}

/** Hunt mini-boss level bonus over the party's top level (§8). */
export const HUNT_LEVEL_BONUS = 2

/** Fixed level for the post-game Champion fight (§8). */
export const CHAMPION_LEVEL = 15

/** Apply a boss tier's multipliers to a raw stat block: round(raw × mult). */
export function applyBossMod(stats: Stats, tier: BossTier): Stats {
  const m = BOSS_MODS[tier]
  return {
    heart: Math.round(stats.heart * m.heart),
    power: Math.round(stats.power * m.power),
    speed: Math.round(stats.speed * m.speed),
  }
}

/**
 * Full boss stat pipeline: base stats at the pony's tier + level with MAX IVs,
 * then the boss tier's multipliers. Combat-only.
 */
export function bossStats(tier: 1 | 2 | 3 | 4 | 5, level: number, bossTier: BossTier): Stats {
  return applyBossMod(getStats(tier, level, MAX_IVS), bossTier)
}

/** Build a combat BattlePony for a boss pony (max IVs + tier multipliers). */
export function buildBossBattlePony(
  id: string,
  name: string,
  element: Element,
  tier: 1 | 2 | 3 | 4 | 5,
  level: number,
  bossTier: BossTier,
): BattlePony {
  const s = bossStats(tier, level, bossTier)
  return { id, name, element, maxHp: s.heart, currentHp: s.heart, power: s.power, speed: s.speed }
}
