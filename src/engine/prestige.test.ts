import { describe, it, expect } from 'vitest'
import { prestigeParty, resetToCap, isCarriedThroughPrestige } from './prestige'
import { levelCapForBadges } from './leveling'
import { getStats } from './stats'
import { SPECIES_BY_ID, CHAMPION_SPECIES } from '../content/creatures'
import { MAX_IVS } from './ivs'
import type { Creature } from './types'

const FRESH_CAP = levelCapForBadges(0)   // 0 badges → level 4

function pony(speciesId: string, level: number, id = `c_${speciesId}`): Creature {
  const sp = SPECIES_BY_ID[speciesId]
  return {
    id,
    speciesId,
    nickname: sp.name,
    level,
    currentHp: getStats(sp.tier, level, MAX_IVS).heart,
    xp: 120,
    ivs: MAX_IVS,
  }
}

const aurelune = (id = 'c_aurelune') => pony(CHAMPION_SPECIES.id, 15, id)

describe('isCarriedThroughPrestige', () => {
  it('keeps the Champion trophy', () => {
    expect(isCarriedThroughPrestige(aurelune())).toBe(true)
  })

  it('leaves every other pony behind', () => {
    for (const id of ['clover-dewdrop', 'ember-spark', 'boulderhoof']) {
      expect(isCarriedThroughPrestige(pony(id, 12))).toBe(false)
    }
  })
})

describe('resetToCap', () => {
  it('drops the carried pony to the fresh run level cap', () => {
    expect(resetToCap(aurelune(), FRESH_CAP).level).toBe(FRESH_CAP)
  })

  it('clears XP so she levels again on the new run', () => {
    expect(resetToCap(aurelune(), FRESH_CAP).xp).toBe(0)
  })

  it('refills HP to the level-capped maximum', () => {
    const out = resetToCap(aurelune(), FRESH_CAP)
    const expected = getStats(CHAMPION_SPECIES.tier, FRESH_CAP, MAX_IVS).heart
    expect(out.currentHp).toBe(expected)
  })

  it('keeps her identity — same instance id and same permanent IVs', () => {
    const before = aurelune()
    const after = resetToCap(before, FRESH_CAP)
    expect(after.id).toBe(before.id)
    expect(after.ivs).toEqual(before.ivs)
    expect(after.speciesId).toBe(CHAMPION_SPECIES.id)
  })

  it('is still stronger than a level-3 starter, despite the reset', () => {
    // The whole point of carrying her: tier 5 + max IVs beats a fresh starter
    // even at the same low level, without trivialising the run.
    const champ   = getStats(CHAMPION_SPECIES.tier, FRESH_CAP, MAX_IVS)
    const starter = getStats(SPECIES_BY_ID['clover-dewdrop'].tier, 3, MAX_IVS)
    expect(champ.power).toBeGreaterThan(starter.power)
    expect(champ.heart).toBeGreaterThan(starter.heart)
  })
})

describe('prestigeParty', () => {
  it('keeps only the trophy out of a full endgame roster', () => {
    const party = [
      pony('clover-dewdrop', 15),
      pony('ember-spark', 14),
      aurelune(),
      pony('boulderhoof', 15),
    ]
    const out = prestigeParty(party, FRESH_CAP)
    expect(out).toHaveLength(1)
    expect(out[0].speciesId).toBe(CHAMPION_SPECIES.id)
    expect(out[0].level).toBe(FRESH_CAP)
  })

  it('carries every trophy when she has won more than once', () => {
    // Instance ids (save v7) are what let two Aurelunes coexist.
    const party = [aurelune('c_first'), pony('ember-spark', 12), aurelune('c_second')]
    const out = prestigeParty(party, FRESH_CAP)
    expect(out).toHaveLength(2)
    expect(out.map(c => c.id)).toEqual(['c_first', 'c_second'])
    expect(new Set(out.map(c => c.id)).size).toBe(2)
  })

  it('returns an empty party if she somehow has no trophy', () => {
    expect(prestigeParty([pony('clover-dewdrop', 9)], FRESH_CAP)).toEqual([])
  })

  it('does not mutate the party it is given', () => {
    const party = [aurelune()]
    const snapshot = JSON.parse(JSON.stringify(party))
    prestigeParty(party, FRESH_CAP)
    expect(party).toEqual(snapshot)
  })
})
