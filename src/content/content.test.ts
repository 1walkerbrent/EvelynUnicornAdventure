import { describe, it, expect } from 'vitest'
import {
  ALL_SPECIES, SPECIES_BY_ID, CHAMPION_SPECIES,
} from './creatures'
import { ZONES, ZONE_BY_ID, TRIAL_ZONES } from './zones'
import { GUARDIANS, GUARDIAN_BY_ID, CHAMPION } from './guardians'

const exists = (id: string) => expect(SPECIES_BY_ID[id], `species "${id}" should exist`).toBeDefined()

describe('species table', () => {
  it('has unique ids', () => {
    const ids = ALL_SPECIES.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every species has tier 1–5 and a placeholder color', () => {
    for (const s of ALL_SPECIES) {
      expect(s.tier, s.id).toBeGreaterThanOrEqual(1)
      expect(s.tier, s.id).toBeLessThanOrEqual(5)
      expect(s.spritePlaceholderColor, s.id).toMatch(/^#[0-9a-fA-F]{6}$/)
    }
  })

  it('Aurelune is the lone legendary Champion creature (Spirit, tier 5)', () => {
    expect(CHAMPION_SPECIES.id).toBe('aurelune')
    expect(CHAMPION_SPECIES.legendary).toBe(true)
    expect(CHAMPION_SPECIES.element).toBe('spirit')
    expect(CHAMPION_SPECIES.tier).toBe(5)
    expect(ALL_SPECIES.filter(s => s.legendary)).toHaveLength(1)
  })
})

describe('zones — referenced species all exist, tiers & elements match', () => {
  it('every referenced species id resolves to a real species', () => {
    for (const zone of TRIAL_ZONES) {
      ;(zone.questRewardSpeciesIds ?? []).forEach(exists)
      ;(zone.explorePoolSpeciesIds ?? []).forEach(exists)
      exists(zone.signatureSpeciesId!)
    }
  })

  it('every quest/signature/explore species has the zone\'s tier and element', () => {
    for (const zone of TRIAL_ZONES) {
      const ids = [
        ...(zone.questRewardSpeciesIds ?? []),
        zone.signatureSpeciesId!,
        ...(zone.explorePoolSpeciesIds ?? []),
      ]
      for (const id of ids) {
        const s = SPECIES_BY_ID[id]
        expect(s.tier, `${id} tier`).toBe(zone.tier)
        expect(s.element, `${id} element`).toBe(zone.element)
      }
    }
  })

  it('tier equals zone number − 1 for the five Trial zones', () => {
    const zoneNumber = (id: string) => Number(id.replace('z', ''))
    for (const zone of TRIAL_ZONES) {
      expect(zone.tier).toBe(zoneNumber(zone.id) - 1)
    }
  })

  it('each Trial zone has exactly 2 quest areas + 1 Trial area', () => {
    for (const zone of TRIAL_ZONES) {
      expect(zone.areas.filter(a => a.kind === 'quest')).toHaveLength(2)
      expect(zone.areas.filter(a => a.kind === 'trial')).toHaveLength(1)
    }
  })

  it('each quest area\'s rewardSpeciesId matches the zone\'s quest rewards', () => {
    for (const zone of TRIAL_ZONES) {
      const questAreaRewards = zone.areas.filter(a => a.kind === 'quest').map(a => a.rewardSpeciesId)
      expect(questAreaRewards).toEqual(zone.questRewardSpeciesIds)
    }
  })
})

describe('badges & unlocks (§6)', () => {
  it('the five Trial zones grant badges 1–5, one each, in order', () => {
    const badges = TRIAL_ZONES.map(z => z.badgeGranted)
    expect(badges).toEqual([1, 2, 3, 4, 5])
  })

  it('Zones 2–5 unlock the next zone; Zone 6 unlocks the Champion', () => {
    expect(ZONE_BY_ID['z2'].unlocksZoneId).toBe('z3')
    expect(ZONE_BY_ID['z3'].unlocksZoneId).toBe('z4')
    expect(ZONE_BY_ID['z4'].unlocksZoneId).toBe('z5')
    expect(ZONE_BY_ID['z5'].unlocksZoneId).toBe('z6')
    expect(ZONE_BY_ID['z6'].unlocksZoneId).toBeUndefined()
    expect(ZONE_BY_ID['z6'].unlocksChampion).toBe(true)
  })

  it('every unlock target is a real zone', () => {
    for (const zone of TRIAL_ZONES) {
      if (zone.unlocksZoneId) expect(ZONE_BY_ID[zone.unlocksZoneId]).toBeDefined()
    }
  })
})

describe('guardians & Trial teams', () => {
  it('each Trial zone points at a real Guardian whose signature = the zone signature', () => {
    for (const zone of TRIAL_ZONES) {
      const g = GUARDIAN_BY_ID[zone.guardianId!]
      expect(g, `guardian ${zone.guardianId}`).toBeDefined()
      expect(g.zoneId).toBe(zone.id)
      expect(g.aceSpeciesId).toBe(zone.signatureSpeciesId)
    }
  })

  it('every Trial team is 3 ponies of real species, ace included', () => {
    for (const g of GUARDIANS) {
      expect(g.team).toHaveLength(3)
      g.team.forEach(p => exists(p.speciesId))
      expect(g.team.map(p => p.speciesId)).toContain(g.aceSpeciesId)
      exists(g.aceSpeciesId)
    }
  })

  it('Trial support ponies share the Guardian\'s zone element; ace is the highest level', () => {
    for (const zone of TRIAL_ZONES) {
      const g = GUARDIAN_BY_ID[zone.guardianId!]
      for (const p of g.team) {
        expect(SPECIES_BY_ID[p.speciesId].element).toBe(zone.element)
      }
      const aceLevel = g.team.find(p => p.speciesId === g.aceSpeciesId)!.level
      expect(Math.max(...g.team.map(p => p.level))).toBe(aceLevel)
    }
  })

  it('the Champion is Vesper with ace Aurelune at level 15 and no zone', () => {
    expect(CHAMPION.id).toBe('vesper')
    expect(CHAMPION.zoneId).toBeUndefined()
    expect(CHAMPION.aceSpeciesId).toBe('aurelune')
    const ace = CHAMPION.team.find(p => p.speciesId === 'aurelune')!
    expect(ace.level).toBe(15)
    CHAMPION.team.forEach(p => exists(p.speciesId))
  })

  it('only the five zone Guardians carry a zoneId, each unique', () => {
    const zoned = GUARDIANS.filter(g => g.zoneId)
    expect(zoned).toHaveLength(5)
    const zoneIds = zoned.map(g => g.zoneId)
    expect(new Set(zoneIds).size).toBe(5)
  })
})

describe('zone set', () => {
  it('has 6 zones; only Zone 1 is the neutral non-Trial zone', () => {
    expect(ZONES).toHaveLength(6)
    expect(TRIAL_ZONES).toHaveLength(5)
    expect(ZONE_BY_ID['z1'].guardianId).toBeUndefined()
    expect(ZONE_BY_ID['z1'].element).toBe('neutral')
  })
})
