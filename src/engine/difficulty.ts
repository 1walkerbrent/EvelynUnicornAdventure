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

// Maps a single effective-difficulty number onto its generator band (1–6).
// Thresholds line up with each zone band's ceiling, so a zone's difficulty
// range always resolves to that zone's band.
export function bandForDifficulty(difficulty: number): 1 | 2 | 3 | 4 | 5 | 6 {
  if (difficulty <= ZONE_BANDS[1].ceiling) return 1
  if (difficulty <= ZONE_BANDS[2].ceiling) return 2
  if (difficulty <= ZONE_BANDS[3].ceiling) return 3
  if (difficulty <= ZONE_BANDS[4].ceiling) return 4
  if (difficulty <= ZONE_BANDS[5].ceiling) return 5
  return 6
}
