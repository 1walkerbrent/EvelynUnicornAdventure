import { describe, it, expect } from 'vitest'
import {
  addXp,
  xpForNextLevel,
  xpProgress,
  levelCapForBadges,
  XP_PER_CORRECT_ANSWER,
  XP_PER_BATTLE_WIN,
} from './leveling'
import { getStats } from './stats'
import type { Creature } from './types'

function mkCreature(level: number, xp = 0): Creature {
  return { speciesId: 'test', nickname: 'Test', level, currentHp: 1, xp }
}

describe('levelCapForBadges — §6 caps', () => {
  it('maps each badge count to its cap', () => {
    expect(levelCapForBadges(0)).toBe(4)
    expect(levelCapForBadges(1)).toBe(6)
    expect(levelCapForBadges(2)).toBe(8)
    expect(levelCapForBadges(3)).toBe(10)
    expect(levelCapForBadges(4)).toBe(12)
    expect(levelCapForBadges(5)).toBe(15)
  })
  it('clamps out-of-range badge counts', () => {
    expect(levelCapForBadges(-1)).toBe(4)
    expect(levelCapForBadges(99)).toBe(15)
  })
})

describe('xpForNextLevel', () => {
  it('is a positive increasing curve', () => {
    expect(xpForNextLevel(1)).toBe(100)
    expect(xpForNextLevel(2)).toBe(200)
    expect(xpForNextLevel(3)).toBeGreaterThan(xpForNextLevel(2))
  })
})

describe('addXp — leveling math', () => {
  it('partial XP does not level up', () => {
    const r = addXp(mkCreature(1, 0), 1, 50, 4)
    expect(r.leveledUp).toBe(false)
    expect(r.creature.level).toBe(1)
    expect(r.creature.xp).toBe(50)
  })

  it('exactly enough XP levels up once and carries no remainder', () => {
    const r = addXp(mkCreature(1, 0), 1, 100, 4)   // L1→2 needs 100
    expect(r.leveledUp).toBe(true)
    expect(r.levelsGained).toBe(1)
    expect(r.creature.level).toBe(2)
    expect(r.creature.xp).toBe(0)
  })

  it('rolls over multiple levels in one award', () => {
    // L1→2 = 100, L2→3 = 200; 300 total reaches level 3 exactly.
    const r = addXp(mkCreature(1, 0), 1, 300, 8)
    expect(r.creature.level).toBe(3)
    expect(r.creature.xp).toBe(0)
    expect(r.levelsGained).toBe(2)
  })

  it('keeps leftover XP after leveling', () => {
    const r = addXp(mkCreature(1, 0), 1, 150, 8)   // level 2, 50 left over
    expect(r.creature.level).toBe(2)
    expect(r.creature.xp).toBe(50)
  })
})

describe('addXp — §6 cap enforcement', () => {
  it('cannot level past the cap, but XP still accumulates', () => {
    // Cap 4 (0 badges). Dump a huge amount of XP.
    const r = addXp(mkCreature(1, 0), 1, 100_000, 4)
    expect(r.creature.level).toBe(4)
    // XP consumed for L1→2 (100), L2→3 (200), L3→4 (300) = 600; rest accumulates.
    expect(r.creature.xp).toBe(100_000 - 600)
  })

  it('a creature already at cap gains XP but not levels', () => {
    const r = addXp(mkCreature(4, 5), 1, 50, 4)
    expect(r.leveledUp).toBe(false)
    expect(r.creature.level).toBe(4)
    expect(r.creature.xp).toBe(55)
  })

  it('never exceeds the cap for any badge count', () => {
    for (let badges = 0; badges <= 5; badges++) {
      const cap = levelCapForBadges(badges)
      const r = addXp(mkCreature(1, 0), 3, 1_000_000, cap)
      expect(r.creature.level).toBe(cap)
      expect(r.creature.level).toBeLessThanOrEqual(cap)
    }
  })
})

describe('addXp — recomputes §5 stats on level-up', () => {
  it('sets currentHp to the new max Heart matching the §5 table (tier 1 → L4)', () => {
    const r = addXp(mkCreature(1, 0), 1, 100_000, 4)
    const stats = getStats(1, 4)
    expect(stats).toEqual({ heart: 14, power: 5, speed: 6 })   // 5/2/3 + growth×3
    expect(r.creature.currentHp).toBe(stats.heart)             // healed to new max
  })

  it('tier-2 leveled to cap 6 matches §5 formula', () => {
    const r = addXp(mkCreature(1, 0), 2, 1_000_000, 6)
    const stats = getStats(2, 6)
    // tier-2 base 7/3/4 + growth (3/1/1)×5
    expect(stats).toEqual({ heart: 22, power: 8, speed: 9 })
    expect(r.creature.currentHp).toBe(22)
  })
})

describe('xpProgress — M2f display derive', () => {
  it('a mid-level pony reports into/needed and a fractional fill', () => {
    // Level 3 with 50 XP banked toward the next level (needs 300 at L3).
    const p = xpProgress(mkCreature(3, 50), 8)
    expect(p.level).toBe(3)
    expect(p.xpIntoLevel).toBe(50)
    expect(p.xpForNextLevel).toBe(xpForNextLevel(3)) // 300, from the existing curve
    expect(p.atCap).toBe(false)
    // Fractional fill: strictly between empty and full.
    const fill = p.xpIntoLevel / p.xpForNextLevel
    expect(fill).toBeCloseTo(50 / 300)
    expect(fill).toBeGreaterThan(0)
    expect(fill).toBeLessThan(1)
  })

  it('xpForNextLevel matches the existing curve at a couple of levels', () => {
    expect(xpProgress(mkCreature(1, 0), 8).xpForNextLevel).toBe(xpForNextLevel(1)) // 100
    expect(xpProgress(mkCreature(5, 0), 8).xpForNextLevel).toBe(xpForNextLevel(5)) // 500
  })

  it('a pony at the badge cap reports atCap (drives the MAX state, not a normal bar)', () => {
    // 2 badges → cap 8. A level-8 pony with banked overflow XP is maxed.
    const cap = levelCapForBadges(2)
    const p = xpProgress(mkCreature(8, 120), cap)
    expect(p.atCap).toBe(true)
    // The MAX bar ignores into/needed for its fill; banked XP still surfaces but
    // must never read as "almost there" — the card renders a full gold bar.
    expect(p.level).toBe(cap)
  })

  it('defaults missing xp to 0 (back-compat with pre-XP saves)', () => {
    const noXp = { speciesId: 'test', nickname: 'Test', level: 2, currentHp: 1 }
    expect(xpProgress(noXp, 8).xpIntoLevel).toBe(0)
  })
})

describe('XP reward constants', () => {
  it('are positive, with battle wins worth more than a single answer', () => {
    expect(XP_PER_CORRECT_ANSWER).toBeGreaterThan(0)
    expect(XP_PER_BATTLE_WIN).toBeGreaterThan(XP_PER_CORRECT_ANSWER)
  })
})
