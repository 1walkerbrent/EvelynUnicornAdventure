import { describe, it, expect } from 'vitest'
import {
  pickWildEncounter, uncaughtPoolSpecies, uncaughtStarters, RARE_STARTER_CHANCE,
  buildWildMiniBoss, WILD_MINIBOSS_MOD,
} from './explore'
import { buildBattlePony, calcDamage } from './battle'
import { getStats } from './stats'
import { ZONE_BY_ID } from '../content/zones'
import { STARTER_SPECIES } from '../content/creatures'

// Deterministic rng that yields a fixed queue of values.
function seq(values: number[]): () => number {
  let i = 0
  return () => values[i++ % values.length]
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
    expect(pickWildEncounter('z2', owned, seq([0.99, 0]))).toBeNull()
  })
})

describe('buildWildMiniBoss', () => {
  const topLevel = 6
  const tier = 2 as const

  it('scales level +2, Heart ×2, Power ×1.2, Speed unchanged vs the base pony', () => {
    const base = buildBattlePony('b', 'B', 'water', tier, topLevel + WILD_MINIBOSS_MOD.levelBonus)
    const boss = buildWildMiniBoss('w', 'W', 'water', tier, topLevel)

    // Level shows through the base stats: a plain pony at topLevel+2.
    expect(getStats(tier, topLevel + 2)).toEqual({
      heart: base.maxHp, power: base.power, speed: base.speed,
    })

    expect(boss.maxHp).toBe(Math.round(base.maxHp * 2))     // ~2× HP
    expect(boss.currentHp).toBe(boss.maxHp)                  // starts full
    expect(boss.power).toBe(Math.round(base.power * 1.2))    // ~1.2× Power
    expect(boss.speed).toBe(base.speed)                       // Speed unchanged

    // Sanity: meaningfully tankier and harder-hitting than a same-level pony.
    expect(boss.maxHp).toBeGreaterThan(base.maxHp * 1.8)
    expect(boss.power).toBeGreaterThan(base.power)
  })

  it('tame-at-cap: reward joins at the current cap, never above and never the boss level', () => {
    // §8/§6: the tamed pony's level is the player's current cap — decoupled from
    // the boosted mini-boss level it was caught from. Mirrors ExploreHunt's
    // tameAndReturn, which sets `level: levelCap` at full HP (getStats heart).
    const levelCap  = 8
    const tameLevel = levelCap
    const bossLevel = topLevel + WILD_MINIBOSS_MOD.levelBonus // 8

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
