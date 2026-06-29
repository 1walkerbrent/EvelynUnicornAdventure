export interface ZoneBand {
  floor: number
  ceiling: number
}

// Per-zone difficulty bands (§9). floor/ceiling are single numbers the generators read.
export const ZONE_BANDS: Record<number, ZoneBand> = {
  1: { floor: 1,  ceiling: 3  },
  2: { floor: 4,  ceiling: 7  },
  3: { floor: 8,  ceiling: 11 },
  4: { floor: 12, ceiling: 15 },
  5: { floor: 16, ceiling: 19 },
  6: { floor: 20, ceiling: 24 },
}

const SMALL_FACTOR = 0.5

// §9 formula: zoneFloor + round(playerLevel × smallFactor), clamped to zone ceiling.
export function effectiveDifficulty(zoneNumber: number, playerLevel: number): number {
  const band = ZONE_BANDS[zoneNumber]
  if (!band) return 1
  const raw = band.floor + Math.round(playerLevel * SMALL_FACTOR)
  return Math.min(raw, band.ceiling)
}
