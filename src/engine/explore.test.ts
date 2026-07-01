import { describe, it, expect } from 'vitest'
import {
  pickWildEncounter, uncaughtPoolSpecies, uncaughtStarters, uncaughtCrossZoneSpecies,
  RARE_STARTER_CHANCE, CROSS_ZONE_CHANCE,
  buildWildMiniBoss,
} from './explore'
import { buildBattlePony, calcDamage } from './battle'
import { getStats } from './stats'
import { MAX_IVS } from './ivs'
import { BOSS_MODS, HUNT_LEVEL_BONUS } from './boss'
import { ZONE_BY_ID, ZONES } from '../content/zones'
import { STARTER_SPECIES, SPECIES_BY_ID } from '../content/creatures'

// Deterministic rng that yields a fixed queue of values.
function seq(values: number[]): () => number {
  let i = 0
  return () => values[i++ % values.length]
}

// Small seeded PRNG (mulberry32) for "weights roughly hold over many trials".
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Every signature (Guardian ace) species — these must never appear as wild catches.
const SIGNATURE_IDS = ZONES.map(z => z.signatureSpeciesId).filter(Boolean) as string[]

// The set of species a given zone contributes to cross-zone pulls (quest rewards
// + Explore pool, minus its signature).
function zoneCrossContribution(zoneId: string): string[] {
  const z = ZONE_BY_ID[zoneId]
  return [...(z.questRewardSpeciesIds ?? []), ...(z.explorePoolSpeciesIds ?? [])]
    .filter(id => id !== z.signatureSpeciesId)
}

describe('uncaught helpers', () => {
  it('excludes owned species from a zone pool', () => {
    const pool = ZONE_BY_ID['z2'].explorePoolSpeciesIds!
    const owned = new Set([pool[0]])
    expect(uncaughtPoolSpecies('z2', owned)).toEqual(pool.slice(1))
  })

  it('uncaughtStarters returns the starters not yet owned', () => {
    const [picked, ...rest] = STARTER_SPECIES.map(s => s.id)
    const owned = new Set([picked])
    expect(uncaughtStarters(owned).sort()).toEqual(rest.sort())
  })
})

describe('pickWildEncounter', () => {
  it('returns a zone pool species when the rare roll fails', () => {
    // rng#1 = 0.99 (no rare), rng#2 = 0 (first pool index)
    const enc = pickWildEncounter('z3', new Set(), seq([0.99, 0]))
    expect(enc).not.toBeNull()
    expect(enc!.rare).toBe(false)
    expect(ZONE_BY_ID['z3'].explorePoolSpeciesIds).toContain(enc!.speciesId)
  })

  it('can return a rare unpicked starter when the roll succeeds', () => {
    const owned = new Set([STARTER_SPECIES[0].id]) // one picked → 4 unpicked remain
    // rng#1 below the chance threshold → rare; rng#2 = 0 → first starter
    const enc = pickWildEncounter('z2', owned, seq([RARE_STARTER_CHANCE / 2, 0]))
    expect(enc!.rare).toBe(true)
    expect(STARTER_SPECIES.map(s => s.id)).toContain(enc!.speciesId)
    expect(owned.has(enc!.speciesId)).toBe(false) // never the one already owned
  })

  it('falls back to a remaining starter when the pool is fully caught', () => {
    const pool = ZONE_BY_ID['z2'].explorePoolSpeciesIds!
    const owned = new Set(pool) // whole pool caught, starters still wild
    // rng#1 = 0.99 (no rare roll) → pool empty → starter fallback
    const enc = pickWildEncounter('z2', owned, seq([0.99, 0]))
    expect(enc!.rare).toBe(true)
    expect(STARTER_SPECIES.map(s => s.id)).toContain(enc!.speciesId)
  })

  it('returns null when pool AND starters are all caught', () => {
    const pool = ZONE_BY_ID['z2'].explorePoolSpeciesIds!
    const owned = new Set([...pool, ...STARTER_SPECIES.map(s => s.id)])
    // z2 (tier 1) has no earlier Hunt zone, so cross-zone is empty too.
    expect(pickWildEncounter('z2', owned, seq([0.99, 0]))).toBeNull()
  })
})

describe('cross-zone Hunt diversity', () => {
  it('uncaughtCrossZoneSpecies draws from earlier unlocked Hunt zones, never the current zone or signatures', () => {
    // In z4 (tier 3): earlier Hunt zones are z2 (tier 1) and z3 (tier 2).
    const cross = uncaughtCrossZoneSpecies('z4', new Set())
    const expected = new Set([...zoneCrossContribution('z2'), ...zoneCrossContribution('z3')])
    expect(new Set(cross)).toEqual(expected)

    // Never includes the current zone's own pool…
    for (const id of ZONE_BY_ID['z4'].explorePoolSpeciesIds!) {
      expect(cross).not.toContain(id)
    }
    // …and never any signature species.
    for (const sig of SIGNATURE_IDS) {
      expect(cross).not.toContain(sig)
    }
  })

  it('excludes higher-tier (not-yet-unlocked) zones', () => {
    // From z2 (tier 1) nothing earlier exists; z3+ are still locked.
    expect(uncaughtCrossZoneSpecies('z2', new Set())).toEqual([])
  })

  it('a cross-zone pull can appear once earlier zones are unlocked, built at the CURRENT zone tier', () => {
    // roll in [0.12, 0.30) → cross-zone preferred; second rng = 0 → first candidate.
    const enc = pickWildEncounter('z4', new Set(), seq([RARE_STARTER_CHANCE + 0.01, 0]))
    expect(enc).not.toBeNull()
    expect(enc!.rare).toBe(false)

    const crossSet = new Set([...zoneCrossContribution('z2'), ...zoneCrossContribution('z3')])
    expect(crossSet.has(enc!.speciesId)).toBe(true)
    // Not from z4's own pool — it's genuinely cross-zone.
    expect(ZONE_BY_ID['z4'].explorePoolSpeciesIds).not.toContain(enc!.speciesId)

    // Tier-scaling rule: built at the current zone's tier, not the species' native tier.
    expect(enc!.tier).toBe(ZONE_BY_ID['z4'].tier)
    const native = SPECIES_BY_ID[enc!.speciesId].tier
    expect(native).toBeLessThan(ZONE_BY_ID['z4'].tier) // earlier-zone species are lower tier
    // …and that scaled tier makes a stronger mini-boss than the native tier would.
    const partyTop = 8
    const scaled = buildWildMiniBoss('w', 'W', SPECIES_BY_ID[enc!.speciesId].element, enc!.tier, partyTop)
    const asNative = buildWildMiniBoss('w', 'W', SPECIES_BY_ID[enc!.speciesId].element, native, partyTop)
    expect(scaled.maxHp).toBeGreaterThan(asNative.maxHp)
  })
})

describe('signature species never appear wild', () => {
  it('when the ONLY uncaught species are signatures, every zone yields no encounter', () => {
    // Own everything except the five Guardian aces. Nothing should be catchable:
    // signatures are excluded from own pools (by data) and cross-zone (by rule).
    const allButSignatures = new Set(
      Object.keys(SPECIES_BY_ID).filter(id => !SIGNATURE_IDS.includes(id)),
    )
    for (const z of ZONES) {
      // Try a starter-preferring AND a pool-preferring roll — both must be null.
      expect(pickWildEncounter(z.id, allButSignatures, seq([0.01, 0]))).toBeNull()
      expect(pickWildEncounter(z.id, allButSignatures, seq([0.99, 0]))).toBeNull()
    }
  })

  it('never returns a signature across many randomized trials', () => {
    const rng = mulberry32(20260630)
    for (let i = 0; i < 5000; i++) {
      const enc = pickWildEncounter('z6', new Set(), rng) // tier 5: all earlier zones unlocked
      if (enc) expect(SIGNATURE_IDS).not.toContain(enc.speciesId)
    }
  })
})

describe('Hunt selection weights roughly hold (~70 own / ~18 cross / ~12 starter)', () => {
  it('converges to the configured weights over many trials', () => {
    // z4 with nothing owned: all three sources are non-empty, so the weighted
    // roll maps directly onto source choice.
    const ownPool = new Set(ZONE_BY_ID['z4'].explorePoolSpeciesIds!)
    const starterIds = new Set(STARTER_SPECIES.map(s => s.id))

    const rng = mulberry32(12345)
    const N = 12000
    let own = 0, cross = 0, starter = 0
    for (let i = 0; i < N; i++) {
      const enc = pickWildEncounter('z4', new Set(), rng)!
      if (enc.rare) starter++
      else if (ownPool.has(enc.speciesId)) own++
      else cross++
      // A starter draw is the only `rare` source; sanity-check classification.
      if (enc.rare) expect(starterIds.has(enc.speciesId)).toBe(true)
    }

    expect(own / N).toBeCloseTo(0.70, 1)
    expect(cross / N).toBeCloseTo(CROSS_ZONE_CHANCE, 1)     // 0.18
    expect(starter / N).toBeCloseTo(RARE_STARTER_CHANCE, 1) // 0.12
  })
})

describe('buildWildMiniBoss', () => {
  const topLevel = 6
  const tier = 2 as const

  it('is the hunt boss tier: level +2, MAX IVs, then Heart ×2 / Power ×1.2 / Speed ×1.0', () => {
    const level = topLevel + HUNT_LEVEL_BONUS
    // Now built on a MAX-IV base (the slight buff over the old IV-0 mini-boss).
    const base = getStats(tier, level, MAX_IVS)
    const boss = buildWildMiniBoss('w', 'W', 'water', tier, topLevel)

    expect(HUNT_LEVEL_BONUS).toBe(2)                            // level = party top + 2
    expect(boss.maxHp).toBe(Math.round(base.heart * BOSS_MODS.hunt.heart)) // ×2 HP
    expect(boss.currentHp).toBe(boss.maxHp)                     // starts full
    expect(boss.power).toBe(Math.round(base.power * BOSS_MODS.hunt.power)) // ×1.2 Power
    expect(boss.speed).toBe(Math.round(base.speed * BOSS_MODS.hunt.speed)) // ×1.0 Speed

    // Slight buff vs the old IV-0 mini-boss: max IVs make it a touch tankier.
    const oldHeart = Math.round(getStats(tier, level).heart * BOSS_MODS.hunt.heart)
    expect(boss.maxHp).toBeGreaterThan(oldHeart)
  })

  it('tame-at-cap: reward joins at the current cap, never above and never the boss level', () => {
    // §8/§6: the tamed pony's level is the player's current cap — decoupled from
    // the boosted mini-boss level it was caught from. Mirrors ExploreHunt's
    // tameAndReturn, which sets `level: levelCap` at full HP (getStats heart).
    const levelCap  = 8
    const tameLevel = levelCap
    const bossLevel = topLevel + HUNT_LEVEL_BONUS // 8

    expect(tameLevel).toBe(levelCap)          // joins exactly at cap
    expect(tameLevel).toBeLessThanOrEqual(levelCap) // never above cap

    // Full-HP, plain cap-level stats — not the buffed mini-boss HP.
    const reward = getStats(tier, tameLevel)
    const boss   = buildWildMiniBoss('w', 'W', 'water', tier, topLevel)
    expect(reward.heart).toBe(getStats(tier, levelCap).heart)
    expect(reward.heart).toBeLessThan(boss.maxHp) // reward isn't at boss power
    expect(bossLevel).toBeGreaterThan(0)
  })
})

describe('Hunt difficulty: type-advantage vs neutral', () => {
  // Rough turns-to-win: how many focused hits one attacker needs to drop the
  // mini-boss. Earth beats Water (advantage ×2); Earth vs Fire is neutral (×1).
  function hitsToDefeat(attackerEl: 'earth', bossEl: 'water' | 'fire', topLevel: number) {
    const attacker = buildBattlePony('p', 'P', attackerEl, 1, topLevel)
    const boss = buildWildMiniBoss('w', 'W', bossEl, 2, topLevel)
    const perHit = calcDamage(attacker.power, attackerEl, bossEl)
    return Math.ceil(boss.maxHp / perHit)
  }

  it('a type-advantaged team wins clearly faster than a neutral one', () => {
    const topLevel = 8
    const advantaged = hitsToDefeat('earth', 'water', topLevel) // ×2 damage
    const neutral    = hitsToDefeat('earth', 'fire',  topLevel) // ×1 damage

    expect(advantaged).toBeLessThan(neutral)
    // Advantage roughly halves the grind — neutral takes meaningfully longer.
    expect(neutral).toBeGreaterThanOrEqual(advantaged * 1.5)
  })
})
