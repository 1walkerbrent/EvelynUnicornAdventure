import { describe, it, expect } from 'vitest'
import { migrateSave } from './save'
import type { Creature } from '../engine/types'

// A pre-IV (v4) party pony — note: no `ivs` field.
function ponyNoIvs(speciesId: string, level = 3): Omit<Creature, 'ivs'> {
  return { speciesId, nickname: speciesId, level, currentHp: 10, xp: 0 }
}

function v4Save(party: unknown[]) {
  return {
    version: 4,
    playerName: 'Evelyn',
    party,
    areasDone: ['brindlewood'],
    championDefeated: false,
    activeTeam: [],
    trialLossStreaks: {},
  }
}

function isInRange(v: number) {
  return Number.isInteger(v) && v >= 0 && v <= 3
}

describe('migrateSave — IV backfill (save v5)', () => {
  it('backfills IVs (0–3 per stat) for a v4 save whose ponies lack them', () => {
    const state = migrateSave(v4Save([ponyNoIvs('marina-mist'), ponyNoIvs('ember-spark')]))
    expect(state).not.toBeNull()
    expect(state!.party).toHaveLength(2)
    for (const c of state!.party) {
      expect(c.ivs).toBeDefined()
      expect(isInRange(c.ivs!.heart)).toBe(true)
      expect(isInRange(c.ivs!.power)).toBe(true)
      expect(isInRange(c.ivs!.speed)).toBe(true)
    }
  })

  it('backfilled IVs are rolled (not all forced to 0 or 3) — they vary across migrations', () => {
    // Migrate the same IV-less save many times; collect the first pony's heart IV.
    const seen = new Set<number>()
    for (let i = 0; i < 40; i++) {
      const state = migrateSave(v4Save([ponyNoIvs('marina-mist')]))
      seen.add(state!.party[0].ivs!.heart)
    }
    // Random rolls → more than one distinct value, and never stuck at only 0 or 3.
    expect(seen.size).toBeGreaterThan(1)
    expect([...seen].every(isInRange)).toBe(true)
  })

  it('preserves existing IVs (does not re-roll a pony that already has them)', () => {
    const withIvs = { ...ponyNoIvs('sky-dancer'), ivs: { heart: 1, power: 2, speed: 0 } }
    const save = { ...v4Save([withIvs]), version: 5 }
    const state = migrateSave(save)
    expect(state!.party[0].ivs).toEqual({ heart: 1, power: 2, speed: 0 })
  })

  it('migrates a v3 save (adds M2e defaults + backfills IVs)', () => {
    const v3 = {
      version: 3,
      playerName: 'Evelyn',
      party: [ponyNoIvs('meadow-bloom')],
      areasDone: ['proving'],
      championDefeated: false,
    }
    const state = migrateSave(v3)
    expect(state).not.toBeNull()
    expect(state!.activeTeam).toEqual([])
    expect(state!.trialLossStreaks).toEqual({})
    expect(state!.party[0].ivs).toBeDefined()
    expect(isInRange(state!.party[0].ivs!.heart)).toBe(true)
  })

  it('returns null for an unreadable version', () => {
    expect(migrateSave({ version: 1 })).toBeNull()
    expect(migrateSave(null)).toBeNull()
    expect(migrateSave('nope')).toBeNull()
  })

  it('v4 save gets recentPuzzleAttempts: [] (M3a puzzle defaults)', () => {
    const state = migrateSave(v4Save([ponyNoIvs('marina-mist')]))
    expect(state).not.toBeNull()
    expect(state!.recentPuzzleAttempts).toEqual([])
  })

  it('v5 save gets recentPuzzleAttempts: [] (upgrade to v6)', () => {
    const v5 = {
      version: 5,
      playerName: 'Evelyn',
      party: [{ ...ponyNoIvs('ember-spark'), ivs: { heart: 2, power: 1, speed: 3 } }],
      areasDone: ['brindlewood'],
      championDefeated: false,
      activeTeam: [],
      trialLossStreaks: {},
    }
    const state = migrateSave(v5)
    expect(state).not.toBeNull()
    expect(state!.recentPuzzleAttempts).toEqual([])
    expect(state!.party[0].ivs).toEqual({ heart: 2, power: 1, speed: 3 })
  })
})
