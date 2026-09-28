import { describe, it, expect } from 'vitest'
import {
  ACHIEVEMENTS, ACHIEVEMENT_BY_ID, emptyLifetime, sanitizeLifetime,
  applySolve, applyBattleWin, applySpeciesSeen, applyDayPlayed, localDay,
  stardustForSolve, newlyEarned, isEarned,
  STARDUST_PER_SOLVE, STARDUST_FIRST_TRY_BONUS,
} from './achievements'
import type { LifetimeStats, Snapshot } from './achievements'
import type { Creature } from './types'
import { SPECIES_BY_ID, ALL_SPECIES } from '../content/creatures'

function snap(over: Partial<Snapshot> & { lifetime?: LifetimeStats } = {}): Snapshot {
  return {
    lifetime: emptyLifetime(),
    party: [],
    badges: 0,
    prestigeCount: 0,
    elementOf: (id) => SPECIES_BY_ID[id]?.element,
    ...over,
  }
}

function pony(speciesId: string, ivs = { heart: 1, power: 1, speed: 1 }): Creature {
  return { id: `c_${speciesId}`, speciesId, nickname: speciesId, level: 3, currentHp: 10, xp: 0, ivs }
}

const mult = { category: 'math' as const, isMultiplication: true }

describe('achievement catalogue', () => {
  it('has unique ids', () => {
    expect(new Set(ACHIEVEMENTS.map((a) => a.id)).size).toBe(ACHIEVEMENTS.length)
  })

  it('every trophy pays Stardust and has a reachable target', () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.reward, a.id).toBeGreaterThan(0)
      expect(a.target, a.id).toBeGreaterThanOrEqual(1)
    }
  })

  it('a fresh player has earned nothing', () => {
    expect(newlyEarned(snap(), {})).toEqual([])
  })

  it('the Pony Book gold target is every species in the game', () => {
    expect(ACHIEVEMENT_BY_ID['book-gold'].target).toBe(ALL_SPECIES.length)
  })
})

describe('applySolve', () => {
  it('counts the solve under its category and first-try', () => {
    const l = applySolve(emptyLifetime(), { category: 'spelling', misses: 0, isMultiplication: false })
    expect(l.solved.spelling).toBe(1)
    expect(l.firstTry).toBe(1)
  })

  it('a miss still counts the solve, but not as first try', () => {
    const l = applySolve(emptyLifetime(), { category: 'logic', misses: 2, isMultiplication: false })
    expect(l.solved.logic).toBe(1)
    expect(l.firstTry).toBe(0)
  })

  it('multiplication streak grows on first-try solves and resets on a miss, keeping the best', () => {
    let l = emptyLifetime()
    for (let i = 0; i < 4; i++) l = applySolve(l, { ...mult, misses: 0 })
    expect(l.multStreak).toBe(4)
    l = applySolve(l, { ...mult, misses: 1 })
    expect(l.multStreak).toBe(0)
    expect(l.bestMultStreak).toBe(4)
    expect(l.multSolved).toBe(5)
  })

  it('non-multiplication problems leave the streak alone', () => {
    let l = applySolve(emptyLifetime(), { ...mult, misses: 0 })
    l = applySolve(l, { category: 'spelling', misses: 3, isMultiplication: false })
    expect(l.multStreak).toBe(1)
  })
})

describe('Stardust per solve', () => {
  it('pays a first-try bonus', () => {
    expect(stardustForSolve(0)).toBe(STARDUST_PER_SOLVE + STARDUST_FIRST_TRY_BONUS)
    expect(stardustForSolve(2)).toBe(STARDUST_PER_SOLVE)
  })
})

describe('applyBattleWin', () => {
  it('flags super, rainbow and comeback wins', () => {
    const l = applyBattleWin(emptyLifetime(), { superHits: 2, survivors: 1, elements: ['water', 'fire', 'air'] })
    expect(l).toMatchObject({ battlesWon: 1, superWins: 1, rainbowWins: 1, comebackWins: 1 })
  })

  it('a plain win only counts the win', () => {
    const l = applyBattleWin(emptyLifetime(), { superHits: 0, survivors: 3, elements: ['water', 'water', 'fire'] })
    expect(l).toMatchObject({ battlesWon: 1, superWins: 0, rainbowWins: 0, comebackWins: 0 })
  })

  it('a one-pony team finishing alone is not a comeback', () => {
    const l = applyBattleWin(emptyLifetime(), { superHits: 0, survivors: 1, elements: ['water'] })
    expect(l.comebackWins).toBe(0)
  })
})

describe('Pony Book + days played', () => {
  it('records each species once', () => {
    let l = applySpeciesSeen(emptyLifetime(), ['a', 'b', 'a'])
    l = applySpeciesSeen(l, ['b', 'c'])
    expect(l.speciesSeen).toEqual(['a', 'b', 'c'])
  })

  it('counts a day once, and a new day again', () => {
    let l = applyDayPlayed(emptyLifetime(), '2026-09-28')
    l = applyDayPlayed(l, '2026-09-28')
    l = applyDayPlayed(l, '2026-09-29')
    expect(l.daysPlayed).toBe(2)
  })

  it('localDay is YYYY-MM-DD in local time', () => {
    expect(localDay(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05')
  })
})

describe('unlock conditions', () => {
  it('Times Table Tamer bronze unlocks at a best streak of 5', () => {
    let l = emptyLifetime()
    for (let i = 0; i < 5; i++) l = applySolve(l, { ...mult, misses: 0 })
    const ids = newlyEarned(snap({ lifetime: l }), {}).map((a) => a.id)
    expect(ids).toContain('times-bronze')
    expect(ids).not.toContain('times-silver')
  })

  it('already-unlocked trophies are not earned again', () => {
    const l = { ...emptyLifetime(), tamed: 1 }
    expect(newlyEarned(snap({ lifetime: l }), { 'tamer-bronze': '2026-01-01' })).toEqual([])
  })

  it('Rainbow Friends needs all five elements in the party', () => {
    const byElement = (e: string) => ALL_SPECIES.find((s) => s.element === e && !s.legendary)!.id
    const four = ['water', 'fire', 'air', 'spirit'].map((e) => pony(byElement(e)))
    const a = ACHIEVEMENT_BY_ID['rainbow-friends']
    expect(isEarned(a, snap({ party: four }))).toBe(false)
    expect(isEarned(a, snap({ party: [...four, pony(byElement('earth'))] }))).toBe(true)
  })

  it('Perfect Pony ignores max-IV trophies but counts a lucky 3/3/3', () => {
    const a = ACHIEVEMENT_BY_ID['perfect-pony']
    const max = { heart: 3, power: 3, speed: 3 }
    expect(isEarned(a, snap({ party: [pony('aurelune', max), pony('boulderhoof', max)] }))).toBe(false)
    const common = ALL_SPECIES.find((s) => s.tier === 1)!.id
    expect(isEarned(a, snap({ party: [pony(common, max)] }))).toBe(true)
  })

  it('badge trophies follow the badge count', () => {
    const ids = newlyEarned(snap({ badges: 3 }), {}).map((a) => a.id)
    expect(ids).toEqual(expect.arrayContaining(['badge-1', 'badge-3']))
    expect(ids).not.toContain('badge-5')
  })
})

describe('sanitizeLifetime', () => {
  it('turns garbage into zeros', () => {
    expect(sanitizeLifetime('nope')).toEqual(emptyLifetime())
    const l = sanitizeLifetime({ solved: { math: -4, spelling: '7' }, tamed: 2.9, speciesSeen: ['a', 3, 'a'] })
    expect(l.solved.math).toBe(0)
    expect(l.solved.spelling).toBe(7)
    expect(l.tamed).toBe(2)
    expect(l.speciesSeen).toEqual(['a'])
  })
})
