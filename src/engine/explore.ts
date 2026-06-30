import { ZONE_BY_ID, ZONES } from '../content/zones'
import { STARTER_SPECIES, SPECIES_BY_ID } from '../content/creatures'
import { buildBattlePony, type BattlePony } from './battle'
import type { Element } from './types'

// Explore "Hunt" encounter selection (§8). The wild pony is drawn from three
// tiers so Hunt stays diverse for the whole game:
//   1. the current zone's own themed Explore pool   (common)
//   2. an unowned species from an already-unlocked   (cross-zone diversity)
//      earlier/peer Hunt zone — kept on-level by
//      building it at the CURRENT zone's tier
//   3. one of the four unpicked starters             (rare bonus, §11)
// Signature (Guardian ace) species never appear wild — they stay an exclusive
// Trial-win reward.

export const RARE_STARTER_CHANCE = 0.12
export const CROSS_ZONE_CHANCE   = 0.18
// The remaining ~0.70 goes to the current zone's own Explore pool.

type Rng = () => number

/** Zone Explore-pool species the player hasn't tamed yet. */
export function uncaughtPoolSpecies(zoneId: string, ownedIds: Set<string>): string[] {
  const zone = ZONE_BY_ID[zoneId]
  return (zone?.explorePoolSpeciesIds ?? []).filter(id => !ownedIds.has(id))
}

/**
 * Unowned species the player can pull cross-zone for diversity: drawn from every
 * already-unlocked Hunt zone (tier ≥ 1, tier ≤ the current zone's tier) other
 * than the current zone. Each zone contributes its quest rewards + Explore pool,
 * but never its signatureSpeciesId — Guardian aces stay Trial-exclusive. The
 * neutral starter zone (tier 0) has no Hunt pool and is excluded.
 */
export function uncaughtCrossZoneSpecies(zoneId: string, ownedIds: Set<string>): string[] {
  const current = ZONE_BY_ID[zoneId]
  if (!current) return []
  const ids: string[] = []
  for (const z of ZONES) {
    if (z.id === zoneId) continue
    if (z.tier < 1 || z.tier > current.tier) continue
    const roster = [...(z.questRewardSpeciesIds ?? []), ...(z.explorePoolSpeciesIds ?? [])]
    for (const id of roster) {
      if (id === z.signatureSpeciesId) continue // Guardian ace — Trial reward only
      if (ownedIds.has(id)) continue
      ids.push(id)
    }
  }
  return [...new Set(ids)]
}

/** Starter species the player has never owned — i.e. the ones she didn't pick. */
export function uncaughtStarters(ownedIds: Set<string>): string[] {
  return STARTER_SPECIES.map(s => s.id).filter(id => !ownedIds.has(id))
}

export interface WildEncounter {
  speciesId: string
  rare: boolean
  /**
   * Tier to build the wild mini-boss at. For own-pool/cross-zone pulls this is
   * the CURRENT zone's tier so the catch is on-level (a cross-zone pony is never
   * a permanently weaker pushover); for a rare starter it's the starter's own
   * tier, preserving the original rare-find behavior.
   */
  tier: 1 | 2 | 3 | 4 | 5
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
 * nothing left to catch anywhere. A weighted roll picks a preferred source —
 * ~70% the zone's own pool, ~18% a cross-zone diversity pull, 12% a rare
 * unpicked starter — then falls through the remaining sources so a Hunt still
 * yields a catch as long as anything remains uncaught.
 */
export function pickWildEncounter(
  zoneId: string,
  ownedIds: Set<string>,
  rng: Rng = Math.random,
): WildEncounter | null {
  const zone = ZONE_BY_ID[zoneId]
  if (!zone) return null

  const pool     = uncaughtPoolSpecies(zoneId, ownedIds)
  const cross    = uncaughtCrossZoneSpecies(zoneId, ownedIds)
  const starters = uncaughtStarters(ownedIds)

  // Own-pool and cross-zone catches scale to the current zone's tier (on-level);
  // a rare starter keeps its own native tier.
  const zoneTier = zone.tier as 1 | 2 | 3 | 4 | 5
  const draw = (list: string[]): string => list[Math.floor(rng() * list.length)]
  const fromPool      = (): WildEncounter => ({ speciesId: draw(pool),  rare: false, tier: zoneTier })
  const fromCrossZone = (): WildEncounter => ({ speciesId: draw(cross), rare: false, tier: zoneTier })
  const fromStarter   = (): WildEncounter => {
    const id = draw(starters)
    return { speciesId: id, rare: true, tier: SPECIES_BY_ID[id].tier }
  }

  // Preference order set by the weighted roll; remaining sources are fallbacks.
  const roll = rng()
  const order =
    roll < RARE_STARTER_CHANCE
      ? [{ list: starters, make: fromStarter },   { list: cross, make: fromCrossZone }, { list: pool,  make: fromPool }]
      : roll < RARE_STARTER_CHANCE + CROSS_ZONE_CHANCE
        ? [{ list: cross, make: fromCrossZone }, { list: pool,  make: fromPool },      { list: starters, make: fromStarter }]
        : [{ list: pool,  make: fromPool },      { list: cross, make: fromCrossZone }, { list: starters, make: fromStarter }]

  for (const { list, make } of order) {
    if (list.length > 0) return make()
  }
  return null
}
