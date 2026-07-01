import { describe, it, expect } from 'vitest'
import {
  BOSS_MODS, applyBossMod, bossStats, buildBossBattlePony, type BossTier,
} from './boss'
import { getStats } from './stats'
import { MAX_IVS } from './ivs'
import type { Stats } from './types'

describe('BOSS_MODS — §8 tiered multipliers (the tuning dials)', () => {
  it('matches the documented table', () => {
    expect(BOSS_MODS.hunt).toEqual({ heart: 1.0, power: 1.0, speed: 1.0 })
    expect(BOSS_MODS.trialTeam).toEqual({ heart: 1.0, power: 1.0, speed: 1.0 })
    expect(BOSS_MODS.guardian).toEqual({ heart: 1.0, power: 1.0, speed: 1.0 })
    expect(BOSS_MODS.champion).toEqual({ heart: 1.0, power: 1.0, speed: 1.0 })
  })
})

describe('applyBossMod — round(raw × multiplier) per tier', () => {
  const raw: Stats = { heart: 100, power: 100, speed: 100 }

  it('scales a clean 100/100/100 block by each tier', () => {
    // All tiers currently use ×1.0, so a clean block passes through unchanged.
    expect(applyBossMod(raw, 'hunt')).toEqual({ heart: 100, power: 100, speed: 100 })
    expect(applyBossMod(raw, 'trialTeam')).toEqual({ heart: 100, power: 100, speed: 100 })
    expect(applyBossMod(raw, 'guardian')).toEqual({ heart: 100, power: 100, speed: 100 })
    expect(applyBossMod(raw, 'champion')).toEqual({ heart: 100, power: 100, speed: 100 })
  })

  it('leaves an odd block unchanged at ×1.0', () => {
    // With every multiplier at 1.0, round(raw × 1) is the raw value.
    expect(applyBossMod({ heart: 5, power: 5, speed: 5 }, 'trialTeam')).toEqual({ heart: 5, power: 5, speed: 5 })
  })

  it('is exactly round(raw × mult) for every tier and stat', () => {
    const tiers: BossTier[] = ['hunt', 'trialTeam', 'guardian', 'champion']
    const block: Stats = { heart: 23, power: 14, speed: 9 }
    for (const t of tiers) {
      const m = BOSS_MODS[t]
      expect(applyBossMod(block, t)).toEqual({
        heart: Math.round(block.heart * m.heart),
        power: Math.round(block.power * m.power),
        speed: Math.round(block.speed * m.speed),
      })
    }
  })
})

describe('bossStats — max IVs before multipliers', () => {
  it('computes base with IV=3 for all stats, then applies the tier mult', () => {
    const tier = 1 as const
    const level = 4
    const raw = getStats(tier, level, MAX_IVS) // (base+3)+growth×(level−1)
    expect(bossStats(tier, level, 'guardian')).toEqual(applyBossMod(raw, 'guardian'))
  })

  it('uses max IVs, not zero IVs (the boss base is +3 per stat over a plain pony)', () => {
    const tier = 2 as const
    const level = 6
    const withMax  = getStats(tier, level, MAX_IVS)
    const withZero = getStats(tier, level)
    expect(withMax.heart).toBe(withZero.heart + 3)
    // The boss pipeline reflects the max-IV base, so hunt HP exceeds the IV-0 build.
    expect(bossStats(tier, level, 'hunt').heart).toBeGreaterThan(applyBossMod(withZero, 'hunt').heart)
  })
})

describe('buildBossBattlePony', () => {
  it('produces a full-HP BattlePony from the boss stat pipeline', () => {
    const s = bossStats(3, 8, 'champion')
    const pony = buildBossBattlePony('foe-0', 'Vesper', 'spirit', 3, 8, 'champion')
    expect(pony).toMatchObject({
      id: 'foe-0', name: 'Vesper', element: 'spirit',
      maxHp: s.heart, currentHp: s.heart, power: s.power, speed: s.speed,
    })
    expect(pony.currentHp).toBe(pony.maxHp) // starts full
  })
})
