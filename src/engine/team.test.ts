import { describe, it, expect } from 'vitest'
import {
  defaultActiveTeam,
  shouldShowPicker,
  resolveBattleTeam,
  matchupVsElement,
  matchupForCreature,
  recommendTeamVsElement,
  bumpStreak,
  clearStreak,
  shouldRecommend,
  MAX_ACTIVE_TEAM,
} from './team'
import { addXp } from './leveling'
import { getTypeMultiplier } from './combat'
import { SPECIES_BY_ID } from '../content/creatures'
import type { Creature } from './types'

function mk(speciesId: string, level: number): Creature {
  return { speciesId, nickname: speciesId, level, currentHp: 1, xp: 0 }
}

// Known elements from content: meadow-bloom=earth, marina-mist=water,
// ember-spark=fire, stella-dream=spirit, sky-dancer=air. Earth beats Water (§3).

describe('active team — default + picker visibility', () => {
  it('defaults to the 3 highest-level ponies (never empty)', () => {
    const party = [
      mk('meadow-bloom', 2),
      mk('marina-mist', 9),
      mk('ember-spark', 5),
      mk('sky-dancer', 7),
    ]
    expect(defaultActiveTeam(party)).toEqual(['marina-mist', 'sky-dancer', 'ember-spark'])
    expect(defaultActiveTeam(party)).toHaveLength(MAX_ACTIVE_TEAM)
  })

  it('hides the picker at 3 or fewer ponies, shows it above 3', () => {
    expect(shouldShowPicker([mk('meadow-bloom', 1)])).toBe(false)
    expect(shouldShowPicker([mk('a', 1), mk('b', 1), mk('c', 1)])).toBe(false)
    expect(shouldShowPicker([mk('a', 1), mk('b', 1), mk('c', 1), mk('d', 1)])).toBe(true)
  })

  it('with ≤3 ponies everyone fights; above 3 the active set is used', () => {
    const three = [mk('meadow-bloom', 1), mk('marina-mist', 1), mk('ember-spark', 1)]
    expect(resolveBattleTeam(three, [])).toHaveLength(3)

    const four = [...three, mk('sky-dancer', 1)]
    const chosen = resolveBattleTeam(four, ['marina-mist', 'ember-spark', 'sky-dancer'])
    expect(chosen.map((c) => c.speciesId)).toEqual(['marina-mist', 'ember-spark', 'sky-dancer'])
  })

  it('falls back to default top-3 when the stored set is unusable', () => {
    const four = [mk('meadow-bloom', 2), mk('marina-mist', 9), mk('ember-spark', 5), mk('sky-dancer', 7)]
    // Stored ids no longer in the party → fall back to default.
    expect(resolveBattleTeam(four, ['ghost-pony']).map((c) => c.speciesId))
      .toEqual(['marina-mist', 'sky-dancer', 'ember-spark'])
  })
})

describe('benched ponies still gain XP (benching is never a punishment)', () => {
  it('XP applied to the whole party levels a benched pony too', () => {
    const party = [mk('meadow-bloom', 2), mk('marina-mist', 9), mk('ember-spark', 5), mk('sky-dancer', 3)]
    const active = resolveBattleTeam(party, defaultActiveTeam(party))
    const benched = party.find((c) => !active.includes(c))!
    expect(benched.speciesId).toBe('meadow-bloom') // lowest level → benched

    // Award XP to the FULL party (mirrors store.awardXpToParty over party).
    const after = party.map((c) => {
      const tier = SPECIES_BY_ID[c.speciesId].tier
      return addXp(c, tier, 1000, 12).creature
    })
    const benchedAfter = after.find((c) => c.speciesId === 'meadow-bloom')!
    expect(benchedAfter.level).toBeGreaterThan(2) // benched pony still leveled
  })
})

describe('matchup badges mirror the existing type multiplier', () => {
  it('Strong on ×2, Weak on ×0.5, neutral otherwise', () => {
    expect(matchupVsElement('earth', 'water')).toBe('strong') // ×2
    expect(matchupVsElement('water', 'earth')).toBe('weak')   // ×0.5
    expect(matchupVsElement('earth', 'fire')).toBe('neutral') // ×1

    // Cross-check every pairing against getTypeMultiplier directly.
    const els = ['water', 'fire', 'air', 'spirit', 'earth'] as const
    for (const a of els) for (const d of els) {
      const m = getTypeMultiplier(a, d)
      const expected = m === 2 ? 'strong' : m === 0.5 ? 'weak' : 'neutral'
      expect(matchupVsElement(a, d)).toBe(expected)
    }
  })

  it('matchupForCreature reads the creature element', () => {
    expect(matchupForCreature(mk('meadow-bloom', 1), 'water')).toBe('strong')
    expect(matchupForCreature(mk('marina-mist', 1), 'earth')).toBe('weak')
  })
})

describe('per-Guardian loss streak', () => {
  it('increments per Guardian and resets only on that win', () => {
    let s: Record<string, number> = {}
    s = bumpStreak(s, 'nerida')
    s = bumpStreak(s, 'nerida')
    s = bumpStreak(s, 'cinda')
    expect(s).toEqual({ nerida: 2, cinda: 1 })

    expect(shouldRecommend(s, 'nerida')).toBe(false) // < 3
    s = bumpStreak(s, 'nerida')
    expect(shouldRecommend(s, 'nerida')).toBe(true)  // 3

    s = clearStreak(s, 'nerida') // win vs Nerida
    expect(s.nerida).toBe(0)
    expect(s.cinda).toBe(1)      // other Guardian untouched
    expect(shouldRecommend(s, 'nerida')).toBe(false)
  })
})

describe('recommended team (3-loss safety net)', () => {
  it('COUNTER EXISTS → recommends a ×2 team, Strong first, with a kid reason', () => {
    // vs Water Guardian: earth ponies are Strong.
    const party = [
      mk('marina-mist', 10), // water — neutral vs water, high level
      mk('meadow-bloom', 4), // earth — STRONG vs water
      mk('boulderhoof', 3),  // earth — STRONG vs water
      mk('ember-spark', 8),  // fire — weak vs water
    ]
    const rec = recommendTeamVsElement(party, 'water')
    expect(rec.kind).toBe('recommend')
    if (rec.kind !== 'recommend') return
    // Both earth ponies come first (Strong), regardless of the high-level water one.
    expect(rec.team.slice(0, 2).sort()).toEqual(['boulderhoof', 'meadow-bloom'])
    expect(rec.team).toHaveLength(3)
    expect(rec.reason).toBe('Earth beats Water!')
    expect(rec.counterElement).toBe('earth')
  })

  it('NO COUNTER → recommends NO team and points to Hunt the counter element', () => {
    // vs Water Guardian with only non-strong ponies (water + fire).
    const party = [mk('marina-mist', 9), mk('ember-spark', 9)]
    const rec = recommendTeamVsElement(party, 'water')
    expect(rec.kind).toBe('hunt')
    if (rec.kind !== 'hunt') return
    expect(rec.team).toBeNull()
    expect(rec.counterElement).toBe('earth')
    expect(rec.message).toBe('None of your ponies are strong against Water. Try hunting a Earth pony first!')
  })
})
