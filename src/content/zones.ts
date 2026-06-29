import type { Element } from '../engine/types'

export type ZoneElement = Element | 'neutral'

export type AreaKind = 'creation' | 'quest' | 'trial' | 'battle'

export interface ZoneArea {
  id: string
  name: string
  kind: AreaKind
  /** For quest areas: the species tamed by completing it. */
  rewardSpeciesId?: string
}

export interface Zone {
  id: string
  name: string
  element: ZoneElement
  /** Matches the creature tier spawned here; 0 for the neutral starter zone. */
  tier: 0 | 1 | 2 | 3 | 4 | 5
  areas: ZoneArea[]
  /** Zones 2–6: the two quest reward species (Areas 1 & 2). */
  questRewardSpeciesIds?: string[]
  /** Zones 2–6: the Trial Guardian (see content/guardians.ts). */
  guardianId?: string
  /** Zones 2–6: signature creature awarded on a Trial win (= the Guardian's ace). */
  signatureSpeciesId?: string
  /** Zones 2–6: the badge number (1–5) granted by winning the Trial (§6). */
  badgeGranted?: number
  /** Zones 2–5: zone unlocked by winning the Trial. */
  unlocksZoneId?: string
  /** Zone 6: winning the Trial unlocks the post-game Champion fight. */
  unlocksChampion?: boolean
  /** Zones 2–6: the themed Explore pool species. */
  explorePoolSpeciesIds?: string[]
}

export const ZONES: Zone[] = [
  {
    id: 'z1',
    name: 'Zone 1 — Starter',
    element: 'neutral',
    tier: 0,
    areas: [
      { id: 'brindlewood', name: 'Brindlewood Home', kind: 'quest',  rewardSpeciesId: 'clover-dewdrop' },
      { id: 'sunflower',   name: 'Sunflower Hollow',  kind: 'quest',  rewardSpeciesId: 'tangerine-twirl' },
      { id: 'proving',     name: 'Proving Glade',      kind: 'battle' },
    ],
    questRewardSpeciesIds: ['clover-dewdrop', 'tangerine-twirl'],
  },
  {
    id: 'z2',
    name: 'Zone 2 — Earth',
    element: 'earth',
    tier: 1,
    areas: [
      { id: 'pebblebrook', name: 'Pebblebrook',  kind: 'quest', rewardSpeciesId: 'acorn-sprout' },
      { id: 'mossgrove',   name: 'Mossgrove',    kind: 'quest', rewardSpeciesId: 'fern-whisper' },
      { id: 'granite',     name: 'Granite Hall', kind: 'trial' },
    ],
    questRewardSpeciesIds: ['acorn-sprout', 'fern-whisper'],
    guardianId: 'bramblewood',
    signatureSpeciesId: 'boulderhoof',
    badgeGranted: 1,
    unlocksZoneId: 'z3',
    explorePoolSpeciesIds: ['daisy-dapple', 'clay-canter', 'mossy-tussock'],
  },
  {
    id: 'z3',
    name: 'Zone 3 — Water',
    element: 'water',
    tier: 2,
    areas: [
      { id: 'saltspray', name: 'Saltspray Cove', kind: 'quest', rewardSpeciesId: 'bubble-brook' },
      { id: 'mistreef',  name: 'Mistreef',       kind: 'quest', rewardSpeciesId: 'pearl-ripple' },
      { id: 'coral',     name: 'Coral Sanctum',  kind: 'trial' },
    ],
    questRewardSpeciesIds: ['bubble-brook', 'pearl-ripple'],
    guardianId: 'nerida',
    signatureSpeciesId: 'tidalhoof',
    badgeGranted: 2,
    unlocksZoneId: 'z4',
    explorePoolSpeciesIds: ['splash-pebble', 'coral-shimmer', 'misty-wave'],
  },
  {
    id: 'z4',
    name: 'Zone 4 — Fire',
    element: 'fire',
    tier: 3,
    areas: [
      { id: 'cinderpath', name: 'Cinderpath',   kind: 'quest', rewardSpeciesId: 'spark-flicker' },
      { id: 'ashfall',    name: 'Ashfall Camp', kind: 'quest', rewardSpeciesId: 'cinder-cocoa' },
      { id: 'magma',      name: 'Magma Forge',  kind: 'trial' },
    ],
    questRewardSpeciesIds: ['spark-flicker', 'cinder-cocoa'],
    guardianId: 'cinda',
    signatureSpeciesId: 'blazehoof',
    badgeGranted: 3,
    unlocksZoneId: 'z5',
    explorePoolSpeciesIds: ['flame-twirl', 'ember-glow', 'sunny-scorch'],
  },
  {
    id: 'z5',
    name: 'Zone 5 — Air',
    element: 'air',
    tier: 4,
    areas: [
      { id: 'windwhistle', name: 'Windwhistle Pass', kind: 'quest', rewardSpeciesId: 'breezy-lark' },
      { id: 'cloudperch',  name: 'Cloudperch',       kind: 'quest', rewardSpeciesId: 'cloud-skip' },
      { id: 'galecrest',   name: 'Galecrest Spire',  kind: 'trial' },
    ],
    questRewardSpeciesIds: ['breezy-lark', 'cloud-skip'],
    guardianId: 'zephyra',
    signatureSpeciesId: 'galehoof',
    badgeGranted: 4,
    unlocksZoneId: 'z6',
    explorePoolSpeciesIds: ['wind-whistle', 'feather-float', 'gust-dancer'],
  },
  {
    id: 'z6',
    name: 'Zone 6 — Spirit',
    element: 'spirit',
    tier: 5,
    areas: [
      { id: 'whisperwood', name: 'Whisperwood',     kind: 'quest', rewardSpeciesId: 'star-sparkle' },
      { id: 'moonveil',    name: 'Moonveil',        kind: 'quest', rewardSpeciesId: 'moon-glimmer' },
      { id: 'starfall',    name: 'Starfall Temple', kind: 'trial' },
    ],
    questRewardSpeciesIds: ['star-sparkle', 'moon-glimmer'],
    guardianId: 'lumina',
    signatureSpeciesId: 'astralhoof',
    badgeGranted: 5,
    unlocksChampion: true,
    explorePoolSpeciesIds: ['wishing-star', 'dusk-twinkle', 'nova-drift'],
  },
]

export const ZONE_BY_ID: Record<string, Zone> = Object.fromEntries(
  ZONES.map((z) => [z.id, z]),
)

/** The five element Trial zones (excludes the neutral starter zone). */
export const TRIAL_ZONES: Zone[] = ZONES.filter((z) => z.guardianId !== undefined)
