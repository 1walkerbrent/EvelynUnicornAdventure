import { describe, it, expect } from 'vitest'
import { buildGuardianTeam, buildPlayerTeam } from './teams'
import { GUARDIAN_BY_ID, CHAMPION } from '../content/guardians'
import { SPECIES_BY_ID } from '../content/creatures'
import { bossStats, CHAMPION_LEVEL } from '../engine/boss'
import { getStats } from '../engine/stats'
import { levelCapForBadges } from '../engine/leveling'
import type { Creature } from '../engine/types'

describe('buildGuardianTeam — §8 boss scaling by tier', () => {
  it('Zone 2 Guardian: ace uses guardian@cap+1, teammates use trialTeam@cap', () => {
    const guardian = GUARDIAN_BY_ID['bramblewood'] // Earth, z2
    const cap = levelCapForBadges(1 - 1) // zone tier 1 → badges 0 → cap 4
    const team = buildGuardianTeam(guardian)

    for (let i = 0; i < guardian.team.length; i++) {
      const t = guardian.team[i]
      const sp = SPECIES_BY_ID[t.speciesId]
      const isAce = t.speciesId === guardian.aceSpeciesId
      const expected = isAce
        ? bossStats(sp.tier, cap + 1, 'guardian')
        : bossStats(sp.tier, cap, 'trialTeam')
      expect(team[i]).toMatchObject({
        maxHp: expected.heart, power: expected.power, speed: expected.speed,
      })
    }
  })

  it('Champion: ace uses champion tier at level 15, teammates use trialTeam at 15', () => {
    const team = buildGuardianTeam(CHAMPION)
    for (let i = 0; i < CHAMPION.team.length; i++) {
      const t = CHAMPION.team[i]
      const sp = SPECIES_BY_ID[t.speciesId]
      const isAce = t.speciesId === CHAMPION.aceSpeciesId
      const expected = bossStats(sp.tier, CHAMPION_LEVEL, isAce ? 'champion' : 'trialTeam')
      expect(team[i]).toMatchObject({
        maxHp: expected.heart, power: expected.power, speed: expected.speed,
      })
    }
  })

  it('boss stats exceed an un-buffed same-level pony (scaling is actually applied)', () => {
    const guardian = GUARDIAN_BY_ID['bramblewood']
    const ace = buildGuardianTeam(guardian).find(p => p.speciesId === guardian.aceSpeciesId)!
    const sp = SPECIES_BY_ID[guardian.aceSpeciesId]
    const plain = getStats(sp.tier, levelCapForBadges(0) + 1) // IV-0, no multiplier
    expect(ace.maxHp).toBeGreaterThan(plain.heart)
    expect(ace.power).toBeGreaterThan(plain.power)
  })
})

describe('buildPlayerTeam — carries the pony IVs into battle stats', () => {
  it('reflects a pony IVs in its BattlePony stats', () => {
    const c: Creature = {
      speciesId: 'marina-mist', nickname: 'Marina', level: 5, currentHp: 1,
      ivs: { heart: 3, power: 2, speed: 1 },
    }
    const sp = SPECIES_BY_ID['marina-mist']
    const expected = getStats(sp.tier, 5, c.ivs)
    const [pony] = buildPlayerTeam([c])
    expect(pony).toMatchObject({ maxHp: expected.heart, power: expected.power, speed: expected.speed })
  })
})
