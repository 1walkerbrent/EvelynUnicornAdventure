import { ZONE_BY_ID } from '../content/zones'
import { STARTER_SPECIES } from '../content/creatures'
import { buildBattlePony, type BattlePony } from './battle'
import type { Element } from './types'

// Explore "Hunt" encounter selection (§8). The wild pony is pulled from the
// zone's themed Explore pool; rarely it's one of the four unpicked starters
// (their natural element), per §11's resolved calls.

export const RARE_STARTER_CHANCE = 0.12

type Rng = () => number

/** Zone Explore-pool species the player hasn't tamed yet. */
export function uncaughtPoolSpecies(zoneId: string, ownedIds: Set<string>): string[] {
  const zone = ZONE_BY_ID[zoneId]
  return (zone?.explorePoolSpeciesIds ?? []).filter(id => !ownedIds.has(id))
}

/** Starter species the player has never owned — i.e. the ones she didn't pick. */
export function uncaughtStarters(ownedIds: Set<string>): string[] {
  return STARTER_SPECIES.map(s => s.id).filter(id => !ownedIds.has(id))
}

export interface WildEncounter {
  speciesId: string
  rare: boolean
}

// ── Wild Hunt mini-boss scaling (§8) ─────────────────────────────────────────
//
// A Hunt is 3-on-1, but the lone wild pony is a MINI-BOSS so taming feels
// earned: it's buffed on top of its normal tier/level stats. A neutral-matchup
// team should grind; bringing the element counter + focusing fire wins cleanly
// (the ×2/×0.5 type multiplier and BattleScreen are unchanged — this only buffs
// the wild pony's raw stats). These three dials are the tuning knobs.

export const WILD_MINIBOSS_MOD = {
  /** Level = party's highest level + this. */
  levelBonus: 2,
  /** Heart (HP) multiplier. */
  hpMult: 2,
  /** Power multiplier (rounded normally). */
  powerMult: 1.2,
  // Speed is intentionally unchanged.
} as const

/**
 * Build the wild Hunt opponent as a mini-boss: take its normal stats at
 * (partyTopLevel + levelBonus), then apply the Heart and Power multipliers.
 * Speed is left as-is. Tune the three dials in WILD_MINIBOSS_MOD to rebalance.
 */
export function buildWildMiniBoss(
  id: string,
  name: string,
  element: Element,
  tier: 1 | 2 | 3 | 4 | 5,
  partyTopLevel: number,
): BattlePony {
  const level = partyTopLevel + WILD_MINIBOSS_MOD.levelBonus
  const base = buildBattlePony(id, name, element, tier, level)
  const maxHp = Math.round(base.maxHp * WILD_MINIBOSS_MOD.hpMult)
  return {
    ...base,
    maxHp,
    currentHp: maxHp,
    power: Math.round(base.power * WILD_MINIBOSS_MOD.powerMult),
  }
}

/**
 * Choose a wild creature for a Hunt in the given zone, or null if there's
 * nothing left to catch (pool exhausted and no unpicked starters remain).
 * A rare unpicked starter can appear with low probability; if the pool is
 * already empty, a remaining starter is offered as a fallback.
 */
export function pickWildEncounter(
  zoneId: string,
  ownedIds: Set<string>,
  rng: Rng = Math.random,
): WildEncounter | null {
  const pool     = uncaughtPoolSpecies(zoneId, ownedIds)
  const starters = uncaughtStarters(ownedIds)

  const rareRoll = rng() < RARE_STARTER_CHANCE && starters.length > 0
  if (rareRoll) {
    return { speciesId: starters[Math.floor(rng() * starters.length)], rare: true }
  }
  if (pool.length > 0) {
    return { speciesId: pool[Math.floor(rng() * pool.length)], rare: false }
  }
  if (starters.length > 0) {
    return { speciesId: starters[Math.floor(rng() * starters.length)], rare: true }
  }
  return null
}
