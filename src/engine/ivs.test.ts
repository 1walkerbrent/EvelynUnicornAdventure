import { describe, it, expect } from 'vitest'
import { rollIv, rollIvs, MAX_IVS, ZERO_IVS, IV_MIN, IV_MAX } from './ivs'

describe('IV generation (§5)', () => {
  it('rollIv yields integers within [0, 3]', () => {
    for (let i = 0; i < 500; i++) {
      const v = rollIv()
      expect(Number.isInteger(v)).toBe(true)
      expect(v).toBeGreaterThanOrEqual(IV_MIN)
      expect(v).toBeLessThanOrEqual(IV_MAX)
    }
  })

  it('rollIvs produces an integer 0–3 for each of the three stats', () => {
    for (let i = 0; i < 200; i++) {
      const ivs = rollIvs()
      for (const stat of ['heart', 'power', 'speed'] as const) {
        expect(Number.isInteger(ivs[stat])).toBe(true)
        expect(ivs[stat]).toBeGreaterThanOrEqual(0)
        expect(ivs[stat]).toBeLessThanOrEqual(3)
      }
    }
  })

  it('the three stats are rolled independently (not all forced equal)', () => {
    // Across many rolls at least one should have differing values between stats.
    let sawUnequal = false
    for (let i = 0; i < 200 && !sawUnequal; i++) {
      const { heart, power, speed } = rollIvs()
      if (!(heart === power && power === speed)) sawUnequal = true
    }
    expect(sawUnequal).toBe(true)
  })

  it('over many rolls, every value 0..3 appears for each stat (uniform coverage)', () => {
    const seen: Record<'heart' | 'power' | 'speed', Set<number>> = {
      heart: new Set(), power: new Set(), speed: new Set(),
    }
    for (let i = 0; i < 1000; i++) {
      const ivs = rollIvs()
      seen.heart.add(ivs.heart)
      seen.power.add(ivs.power)
      seen.speed.add(ivs.speed)
    }
    for (const stat of ['heart', 'power', 'speed'] as const) {
      expect([...seen[stat]].sort()).toEqual([0, 1, 2, 3])
    }
  })

  it('accepts an injected rng for determinism', () => {
    // rng always returns ~0 → floor(0 * 4) = 0 for every stat.
    const zero = rollIvs(() => 0)
    expect(zero).toEqual({ heart: 0, power: 0, speed: 0 })
    // rng returns ~0.999 → floor(0.999 * 4) = 3 for every stat.
    const max = rollIvs(() => 0.999)
    expect(max).toEqual({ heart: 3, power: 3, speed: 3 })
  })

  it('MAX_IVS and ZERO_IVS are the expected constants', () => {
    expect(MAX_IVS).toEqual({ heart: 3, power: 3, speed: 3 })
    expect(ZERO_IVS).toEqual({ heart: 0, power: 0, speed: 0 })
  })
})
