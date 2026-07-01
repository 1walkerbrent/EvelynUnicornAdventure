import { describe, it, expect } from 'vitest'
import { getStats } from './stats'
import { getTypeMultiplier } from './combat'

describe('getStats', () => {
  // §5 worked example: both creatures at level 8 (2-badge cap)
  it('tier-1 at level 8 — §5 worked example (Earth starter)', () => {
    const s = getStats(1, 8)
    expect(s.heart).toBe(26)  // 5 + 3*(8-1) = 5 + 21
    expect(s.power).toBe(9)   // 2 + 1*(8-1) = 2 + 7
    expect(s.speed).toBe(10)  // 3 + 1*(8-1) = 3 + 7
  })

  it('tier-2 at level 8 — §5 worked example (Water creature)', () => {
    const s = getStats(2, 8)
    expect(s.heart).toBe(28)  // 7 + 3*(8-1) = 7 + 21
    expect(s.power).toBe(10)  // 3 + 1*(8-1) = 3 + 7
    expect(s.speed).toBe(11)  // 4 + 1*(8-1) = 4 + 7
  })

  it('level 1 returns base stats unchanged', () => {
    expect(getStats(1, 1)).toEqual({ heart: 5,  power: 2, speed: 3 })
    expect(getStats(3, 1)).toEqual({ heart: 9,  power: 4, speed: 5 })
    expect(getStats(5, 1)).toEqual({ heart: 13, power: 6, speed: 7 })
  })

  it('omitting IVs is identical to passing zero IVs (back-compat)', () => {
    expect(getStats(2, 8)).toEqual(getStats(2, 8, { heart: 0, power: 0, speed: 0 }))
  })
})

describe('getStats — §5 IV formula: (base + IV) + growth × (level − 1)', () => {
  it('applies each IV to the effective base at level 1', () => {
    // tier-1 base 5/2/3 + IVs 1/2/3 → 6/4/6 (growth term is zero at level 1)
    expect(getStats(1, 1, { heart: 1, power: 2, speed: 3 })).toEqual({ heart: 6, power: 4, speed: 6 })
  })

  it('IVs shift the base, then shared growth scales by level', () => {
    // tier-1 L8, IVs 2/1/3:
    //   heart (5+2)+3×7 = 28, power (2+1)+1×7 = 10, speed (3+3)+1×7 = 13
    expect(getStats(1, 8, { heart: 2, power: 1, speed: 3 })).toEqual({ heart: 28, power: 10, speed: 13 })
  })

  it('max IVs (3/3/3) add exactly 3 to each stat vs zero IVs, at any level', () => {
    const zero = getStats(2, 6)
    const max  = getStats(2, 6, { heart: 3, power: 3, speed: 3 })
    expect(max.heart).toBe(zero.heart + 3)
    expect(max.power).toBe(zero.power + 3)
    expect(max.speed).toBe(zero.speed + 3)
  })
})

describe('getTypeMultiplier', () => {
  // §5 worked example: Earth beats Water
  it('earth vs water → ×2 (advantage)', () => {
    expect(getTypeMultiplier('earth', 'water')).toBe(2)
  })
  it('water vs earth → ×1.0 neutral (asymmetric matrix — offense and defense wheels differ)', () => {
    expect(getTypeMultiplier('water', 'earth')).toBe(1)
  })

  // Full wheel (§3): water→fire→air→spirit→earth→water
  it('water vs fire → ×2', () => {
    expect(getTypeMultiplier('water', 'fire')).toBe(2)
  })
  it('fire vs air → ×2', () => {
    expect(getTypeMultiplier('fire', 'air')).toBe(2)
  })
  it('air vs spirit → ×2', () => {
    expect(getTypeMultiplier('air', 'spirit')).toBe(2)
  })
  it('spirit vs earth → ×2', () => {
    expect(getTypeMultiplier('spirit', 'earth')).toBe(2)
  })

  it('non-adjacent matchup → ×1 (neutral)', () => {
    expect(getTypeMultiplier('water', 'spirit')).toBe(1)
    expect(getTypeMultiplier('fire', 'earth')).toBe(1)
  })

  it('same element → ×1 (neutral)', () => {
    expect(getTypeMultiplier('fire', 'fire')).toBe(1)
  })
})
