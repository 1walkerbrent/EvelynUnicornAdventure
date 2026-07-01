export type Element = 'water' | 'fire' | 'air' | 'spirit' | 'earth'

export interface Stats {
  heart: number
  power: number
  speed: number
}

/**
 * Individual Values (§5): a per-pony innate bonus of 0–3 per stat, rolled once on
 * acquisition and never changed. Same shape as Stats. Bosses always use max IVs.
 */
export type Ivs = Stats

export interface CreatureSpecies {
  id: string
  name: string
  element: Element
  /** 1 = starter zone, 5 = spirit zone — determines base stats (§5) */
  tier: 1 | 2 | 3 | 4 | 5
  spritePlaceholderColor: string
  /** Champion / one-of-a-kind finale creature (§11). */
  legendary?: boolean
}

export interface Creature {
  speciesId: string
  nickname: string
  level: number
  currentHp: number
  /** Accumulated experience toward the next level (§5/§9). Defaults to 0 when absent. */
  xp?: number
  accentColor?: string
  /**
   * Individual Values (§5), rolled once on acquisition and permanent. Optional for
   * back-compat with pre-IV saves; migration backfills these (treated as 0 if ever
   * absent at compute time). Guardian-signature trophies get max IVs (3/3/3).
   */
  ivs?: Ivs
}
