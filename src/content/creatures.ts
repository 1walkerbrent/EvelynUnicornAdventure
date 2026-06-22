import type { CreatureSpecies } from '../engine/types'

export const STARTER_SPECIES: CreatureSpecies[] = [
  { id: 'aquamane',    name: 'Aquamane',    element: 'water',  tier: 1, spritePlaceholderColor: '#3b82f6' },
  { id: 'emberhoof',   name: 'Emberhoof',   element: 'fire',   tier: 1, spritePlaceholderColor: '#f97316' },
  { id: 'galeswift',   name: 'Galeswift',   element: 'air',    tier: 1, spritePlaceholderColor: '#38bdf8' },
  { id: 'shimmerhorn', name: 'Shimmerhorn', element: 'spirit', tier: 1, spritePlaceholderColor: '#a855f7' },
  { id: 'stonegait',   name: 'Stonegait',   element: 'earth',  tier: 1, spritePlaceholderColor: '#d97706' },
]

export const ALL_SPECIES: CreatureSpecies[] = [...STARTER_SPECIES]

export const SPECIES_BY_ID: Record<string, CreatureSpecies> = Object.fromEntries(
  ALL_SPECIES.map((s) => [s.id, s]),
)
