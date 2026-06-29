import { describe, it, expect } from 'vitest'
import {
  isZoneUnlocked, isAreaAvailable, isZoneComplete,
  isChampionUnlocked, badgeCount, finalAreaId,
} from './progression'
import { ZONE_BY_ID } from '../content/zones'

// Helper: clear a whole zone (all 3 areas) so the next one unlocks.
const clearZone = (zoneId: string) => ZONE_BY_ID[zoneId].areas.map(a => a.id)

describe('zone unlocking', () => {
  it('only Zone 1 is open at the start', () => {
    expect(isZoneUnlocked([], 'z1')).toBe(true)
    expect(isZoneUnlocked([], 'z2')).toBe(false)
    expect(isZoneUnlocked([], 'z6')).toBe(false)
  })

  it('clearing Zone 1 (Proving Glade) unlocks Zone 2', () => {
    const done = ['brindlewood', 'sunflower', 'proving']
    expect(isZoneComplete(done, 'z1')).toBe(true)
    expect(isZoneUnlocked(done, 'z2')).toBe(true)
    expect(isZoneUnlocked(done, 'z3')).toBe(false)
  })

  it('each zone unlocks the next, in order, through the Champion', () => {
    let done: string[] = []
    const order = ['z1', 'z2', 'z3', 'z4', 'z5', 'z6']
    for (let i = 0; i < order.length; i++) {
      expect(isZoneUnlocked(done, order[i])).toBe(true)
      if (i + 1 < order.length) expect(isZoneUnlocked(done, order[i + 1])).toBe(false)
      done = [...done, ...clearZone(order[i])]
    }
    expect(isChampionUnlocked(done)).toBe(true)
  })
})

describe('area availability within a zone (sequential)', () => {
  it('only the first area is available when a zone is freshly unlocked', () => {
    const done = clearZone('z1') // unlock z2
    const [a1, a2, a3] = ZONE_BY_ID['z2'].areas.map(a => a.id)
    expect(isAreaAvailable(done, 'z2', a1)).toBe(true)
    expect(isAreaAvailable(done, 'z2', a2)).toBe(false)
    expect(isAreaAvailable(done, 'z2', a3)).toBe(false)
  })

  it('finishing area 1 opens area 2; finishing 1+2 opens the Trial', () => {
    const [a1, a2, a3] = ZONE_BY_ID['z2'].areas.map(a => a.id)
    const base = clearZone('z1')
    expect(isAreaAvailable([...base, a1], 'z2', a2)).toBe(true)
    expect(isAreaAvailable([...base, a1], 'z2', a3)).toBe(false)
    expect(isAreaAvailable([...base, a1, a2], 'z2', a3)).toBe(true)
  })

  it('a locked zone exposes no available areas', () => {
    const a1 = ZONE_BY_ID['z3'].areas[0].id
    expect(isAreaAvailable([], 'z3', a1)).toBe(false)
  })

  it('finalAreaId is the Trial for Trial zones and Proving Glade for Zone 1', () => {
    expect(finalAreaId(ZONE_BY_ID['z1'])).toBe('proving')
    expect(finalAreaId(ZONE_BY_ID['z2'])).toBe('granite')
    expect(finalAreaId(ZONE_BY_ID['z6'])).toBe('starfall')
  })
})

describe('badge count (§6)', () => {
  it('is 0 until a Trial zone is cleared, then increments per Trial', () => {
    expect(badgeCount([])).toBe(0)
    expect(badgeCount(clearZone('z1'))).toBe(0) // Proving Glade grants no badge
    expect(badgeCount([...clearZone('z1'), ...clearZone('z2')])).toBe(1)
  })

  it('caps at 5 after all five Trial zones', () => {
    const all = ['z1', 'z2', 'z3', 'z4', 'z5', 'z6'].flatMap(clearZone)
    expect(badgeCount(all)).toBe(5)
  })
})
