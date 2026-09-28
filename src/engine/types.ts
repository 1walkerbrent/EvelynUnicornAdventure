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
  /**
   * Stable per-creature instance id (§ instance IDs). Distinguishes individuals —
   * two creatures of the same species have the same speciesId but different ids.
   * Generated once at creation via newCreatureId(); permanent. Optional only for
   * back-compat with pre-id saves; migration backfills it on load.
   */
  id?: string
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
  /**
   * Set on ponies that JOINED as trophies — Guardian signatures and the Champion's
   * Aurelune (§5/§20). Species alone can't say this once foals exist: a hatched
   * Boulderhoof is an ordinary pony. Migration backfills it from species (v10).
   */
  trophy?: true
  /** Rare hatched color (§20) — drawn as a filter over the normal sprite. */
  variant?: VariantId
  /** Instance ids of the two parents, for a hatched foal (§20). */
  parents?: [string, string]
  /** Rests from hatching until lifetime battlesWon reaches this (§20). */
  restUntil?: number
}

export type VariantId = 'starlight' | 'shadow' | 'moonlit' | 'sunburst' | 'aurora'
