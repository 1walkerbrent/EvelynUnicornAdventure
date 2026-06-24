import type { CreatureSpecies } from '../engine/types'

// The five starters (one per element, tier 1). She picks one; the rest become rare Explore finds later.
export const STARTER_SPECIES: CreatureSpecies[] = [
  { id: 'marina-mist',  name: 'Marina Mist',  element: 'water',  tier: 1, spritePlaceholderColor: '#0ea5e9' },
  { id: 'ember-spark',  name: 'Ember Spark',  element: 'fire',   tier: 1, spritePlaceholderColor: '#f97316' },
  { id: 'sky-dancer',   name: 'Sky Dancer',   element: 'air',    tier: 1, spritePlaceholderColor: '#7dd3fc' },
  { id: 'stella-dream', name: 'Stella Dream', element: 'spirit', tier: 1, spritePlaceholderColor: '#c084fc' },
  { id: 'meadow-bloom', name: 'Meadow Bloom', element: 'earth',  tier: 1, spritePlaceholderColor: '#86efac' },
]

// Vibe text shown on the pick card — element hidden until after the player picks
export const STARTER_VIBES: Record<string, string> = {
  'marina-mist':  'Calm, gentle — loves the sound of rain',
  'ember-spark':  'Brave, bouncy — always ready for adventure',
  'sky-dancer':   'Quick, playful — happiest in the breeze',
  'stella-dream': 'Dreamy, wise — seems to know your thoughts',
  'meadow-bloom': 'Steady, kind — never leaves a friend behind',
}

// Zone 1 quest rewards (tamed by solving the problems in Areas 1 and 2)
export const ZONE1_QUEST_SPECIES: CreatureSpecies[] = [
  { id: 'clover-dewdrop',  name: 'Clover Dewdrop',  element: 'earth', tier: 1, spritePlaceholderColor: '#4ade80' },
  { id: 'tangerine-twirl', name: 'Tangerine Twirl', element: 'fire',  tier: 1, spritePlaceholderColor: '#fb923c' },
]

export const ALL_SPECIES: CreatureSpecies[] = [...STARTER_SPECIES, ...ZONE1_QUEST_SPECIES]

export const SPECIES_BY_ID: Record<string, CreatureSpecies> = Object.fromEntries(
  ALL_SPECIES.map((s) => [s.id, s]),
)
