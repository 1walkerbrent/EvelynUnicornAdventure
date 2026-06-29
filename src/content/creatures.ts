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

// ── Zones 2–6 species (§7/§11). Tier = zone number − 1. ──────────────────────
// Each zone: [0,1] = quest rewards (Areas 1 & 2), [2] = Guardian signature,
// [3,4,5] = Explore pool. Placeholder colors are element-family shades.

// Zone 2 — Earth (tier 1)
export const ZONE2_SPECIES: CreatureSpecies[] = [
  { id: 'acorn-sprout',  name: 'Acorn Sprout',  element: 'earth', tier: 1, spritePlaceholderColor: '#b45309' },
  { id: 'fern-whisper',  name: 'Fern Whisper',  element: 'earth', tier: 1, spritePlaceholderColor: '#4d7c0f' },
  { id: 'boulderhoof',   name: 'Boulderhoof',   element: 'earth', tier: 1, spritePlaceholderColor: '#78716c' },
  { id: 'daisy-dapple',  name: 'Daisy Dapple',  element: 'earth', tier: 1, spritePlaceholderColor: '#a3e635' },
  { id: 'clay-canter',   name: 'Clay Canter',   element: 'earth', tier: 1, spritePlaceholderColor: '#c2410c' },
  { id: 'mossy-tussock', name: 'Mossy Tussock', element: 'earth', tier: 1, spritePlaceholderColor: '#65a30d' },
]

// Zone 3 — Water (tier 2)
export const ZONE3_SPECIES: CreatureSpecies[] = [
  { id: 'bubble-brook',  name: 'Bubble Brook',  element: 'water', tier: 2, spritePlaceholderColor: '#38bdf8' },
  { id: 'pearl-ripple',  name: 'Pearl Ripple',  element: 'water', tier: 2, spritePlaceholderColor: '#a5f3fc' },
  { id: 'tidalhoof',     name: 'Tidalhoof',     element: 'water', tier: 2, spritePlaceholderColor: '#0891b2' },
  { id: 'splash-pebble', name: 'Splash Pebble', element: 'water', tier: 2, spritePlaceholderColor: '#22d3ee' },
  { id: 'coral-shimmer', name: 'Coral Shimmer', element: 'water', tier: 2, spritePlaceholderColor: '#2dd4bf' },
  { id: 'misty-wave',    name: 'Misty Wave',    element: 'water', tier: 2, spritePlaceholderColor: '#7dd3fc' },
]

// Zone 4 — Fire (tier 3)
export const ZONE4_SPECIES: CreatureSpecies[] = [
  { id: 'spark-flicker', name: 'Spark Flicker', element: 'fire', tier: 3, spritePlaceholderColor: '#fb923c' },
  { id: 'cinder-cocoa',  name: 'Cinder Cocoa',  element: 'fire', tier: 3, spritePlaceholderColor: '#9a3412' },
  { id: 'blazehoof',     name: 'Blazehoof',     element: 'fire', tier: 3, spritePlaceholderColor: '#ea580c' },
  { id: 'flame-twirl',   name: 'Flame Twirl',   element: 'fire', tier: 3, spritePlaceholderColor: '#f97316' },
  { id: 'ember-glow',    name: 'Ember Glow',    element: 'fire', tier: 3, spritePlaceholderColor: '#f59e0b' },
  { id: 'sunny-scorch',  name: 'Sunny Scorch',  element: 'fire', tier: 3, spritePlaceholderColor: '#fbbf24' },
]

// Zone 5 — Air (tier 4)
export const ZONE5_SPECIES: CreatureSpecies[] = [
  { id: 'breezy-lark',   name: 'Breezy Lark',   element: 'air', tier: 4, spritePlaceholderColor: '#bae6fd' },
  { id: 'cloud-skip',    name: 'Cloud Skip',    element: 'air', tier: 4, spritePlaceholderColor: '#e0f2fe' },
  { id: 'galehoof',      name: 'Galehoof',      element: 'air', tier: 4, spritePlaceholderColor: '#0ea5e9' },
  { id: 'wind-whistle',  name: 'Wind Whistle',  element: 'air', tier: 4, spritePlaceholderColor: '#7dd3fc' },
  { id: 'feather-float', name: 'Feather Float', element: 'air', tier: 4, spritePlaceholderColor: '#a5f3fc' },
  { id: 'gust-dancer',   name: 'Gust Dancer',   element: 'air', tier: 4, spritePlaceholderColor: '#93c5fd' },
]

// Zone 6 — Spirit (tier 5)
export const ZONE6_SPECIES: CreatureSpecies[] = [
  { id: 'star-sparkle',  name: 'Star Sparkle',  element: 'spirit', tier: 5, spritePlaceholderColor: '#c084fc' },
  { id: 'moon-glimmer',  name: 'Moon Glimmer',  element: 'spirit', tier: 5, spritePlaceholderColor: '#d8b4fe' },
  { id: 'astralhoof',    name: 'Astralhoof',    element: 'spirit', tier: 5, spritePlaceholderColor: '#9333ea' },
  { id: 'wishing-star',  name: 'Wishing Star',  element: 'spirit', tier: 5, spritePlaceholderColor: '#e9d5ff' },
  { id: 'dusk-twinkle',  name: 'Dusk Twinkle',  element: 'spirit', tier: 5, spritePlaceholderColor: '#a855f7' },
  { id: 'nova-drift',    name: 'Nova Drift',    element: 'spirit', tier: 5, spritePlaceholderColor: '#7c3aed' },
]

// Champion / legendary finale creature (§11) — Grand Champion Vesper's ace.
export const CHAMPION_SPECIES: CreatureSpecies = {
  id: 'aurelune', name: 'Aurelune', element: 'spirit', tier: 5, spritePlaceholderColor: '#e879f9', legendary: true,
}

export const ALL_SPECIES: CreatureSpecies[] = [
  ...STARTER_SPECIES,
  ...ZONE1_QUEST_SPECIES,
  ...ZONE2_SPECIES,
  ...ZONE3_SPECIES,
  ...ZONE4_SPECIES,
  ...ZONE5_SPECIES,
  ...ZONE6_SPECIES,
  CHAMPION_SPECIES,
]

export const SPECIES_BY_ID: Record<string, CreatureSpecies> = Object.fromEntries(
  ALL_SPECIES.map((s) => [s.id, s]),
)
