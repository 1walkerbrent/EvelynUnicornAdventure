export type Element = 'water' | 'fire' | 'air' | 'spirit' | 'earth'

export interface Stats {
  heart: number
  power: number
  speed: number
}

export interface CreatureSpecies {
  id: string
  name: string
  element: Element
  /** 1 = starter zone, 5 = spirit zone — determines base stats (§5) */
  tier: 1 | 2 | 3 | 4 | 5
  spritePlaceholderColor: string
}

export interface Creature {
  speciesId: string
  nickname: string
  level: number
  currentHp: number
  /** Accumulated experience toward the next level (§5/§9). Defaults to 0 when absent. */
  xp?: number
  accentColor?: string
}
