import type { Ivs } from './types'

// Individual Values (§5). Every pony gets three IVs — one per stat — each an
// integer 0–3 inclusive, rolled uniformly at random once on acquisition and
// stored permanently. Only bosses and Guardian-signature trophies use max IVs.

export const IV_MIN = 0
export const IV_MAX = 3

/** The maximum IV block — used by bosses (combat) and signature trophies (roster). */
export const MAX_IVS: Ivs = { heart: IV_MAX, power: IV_MAX, speed: IV_MAX }

/** A zeroed IV block — the effective default when a pony has no IVs recorded. */
export const ZERO_IVS: Ivs = { heart: 0, power: 0, speed: 0 }

type Rng = () => number

/** Roll a single IV: a uniform integer in [IV_MIN, IV_MAX]. */
export function rollIv(rng: Rng = Math.random): number {
  return IV_MIN + Math.floor(rng() * (IV_MAX - IV_MIN + 1))
}

/** Roll a full IV block — each of the three stats rolled independently. */
export function rollIvs(rng: Rng = Math.random): Ivs {
  return { heart: rollIv(rng), power: rollIv(rng), speed: rollIv(rng) }
}
