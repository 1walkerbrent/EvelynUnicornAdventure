import { describe, it, expect } from 'vitest'
import { effectiveDifficulty, ZONE_BANDS } from './difficulty'

// ── effectiveDifficulty ──────────────────────────────────────────────────────

describe('effectiveDifficulty', () => {
  it('Zone 1: floor=1 + round(level × 0.5), clamped to ceiling=3', () => {
    expect(effectiveDifficulty(1, 1)).toBe(2)   // 1 + round(0.5) = 2
    expect(effectiveDifficulty(1, 2)).toBe(2)   // 1 + round(1.0) = 2
    expect(effectiveDifficulty(1, 3)).toBe(3)   // 1 + round(1.5) = 3
    expect(effectiveDifficulty(1, 4)).toBe(3)   // 1 + round(2.0) = 3
    expect(effectiveDifficulty(1, 10)).toBe(3)  // clamped to ceiling
  })

  it('never overshoots the zone ceiling for any level', () => {
    for (const [zoneStr, band] of Object.entries(ZONE_BANDS)) {
      const zone = parseInt(zoneStr)
      expect(effectiveDifficulty(zone, 100)).toBeLessThanOrEqual(band.ceiling)
    }
  })

  it('never goes below the zone floor at level 1', () => {
    for (const [zoneStr, band] of Object.entries(ZONE_BANDS)) {
      const zone = parseInt(zoneStr)
      expect(effectiveDifficulty(zone, 1)).toBeGreaterThanOrEqual(band.floor)
    }
  })
})
