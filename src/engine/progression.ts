import { ZONES, ZONE_BY_ID } from '../content/zones'
import type { Zone } from '../content/zones'

// Progression is derived from a single source of truth: the set of completed
// area ids (`areasDone`). Zones unlock in order — a zone opens once the previous
// zone's final area (its Trial, or Zone 1's Proving Glade) is cleared — and areas
// within a zone unlock sequentially.

export function zoneNumber(zoneId: string): number {
  return Number(zoneId.replace('z', ''))
}

/** The gating area of a zone — its last node (Trial for Zones 2–6, Proving Glade for Zone 1). */
export function finalAreaId(zone: Zone): string {
  return zone.areas[zone.areas.length - 1].id
}

export function isAreaDone(areasDone: string[], areaId: string): boolean {
  return areasDone.includes(areaId)
}

export function isZoneComplete(areasDone: string[], zoneId: string): boolean {
  const zone = ZONE_BY_ID[zoneId]
  if (!zone) return false
  return areasDone.includes(finalAreaId(zone))
}

export function isZoneUnlocked(areasDone: string[], zoneId: string): boolean {
  const idx = ZONES.findIndex(z => z.id === zoneId)
  if (idx <= 0) return true // Zone 1 is always open
  return isZoneComplete(areasDone, ZONES[idx - 1].id)
}

/** An area is enterable once its zone is unlocked and all earlier areas in it are done. */
export function isAreaAvailable(areasDone: string[], zoneId: string, areaId: string): boolean {
  const zone = ZONE_BY_ID[zoneId]
  if (!zone || !isZoneUnlocked(areasDone, zoneId)) return false
  const i = zone.areas.findIndex(a => a.id === areaId)
  if (i < 0) return false
  return zone.areas.slice(0, i).every(a => areasDone.includes(a.id))
}

/** The post-game Champion opens once Zone 6's Trial is cleared. */
export function isChampionUnlocked(areasDone: string[]): boolean {
  return isZoneComplete(areasDone, 'z6')
}

/** Badges = number of Trial zones (2–6) whose Trial has been won (§6); max 5. */
export function badgeCount(areasDone: string[]): number {
  return ZONES.filter(
    z => z.badgeGranted !== undefined && isZoneComplete(areasDone, z.id),
  ).length
}
