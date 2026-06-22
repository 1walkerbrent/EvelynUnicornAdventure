import type { Element } from '../engine/types'

export type ZoneElement = Element | 'neutral'

export interface ZoneArea {
  id: string
  name: string
}

export interface Zone {
  id: string
  name: string
  element: ZoneElement
  /** Matches the creature tier spawned here; 0 for the neutral starter zone */
  tier: 0 | 1 | 2 | 3 | 4 | 5
  areas: ZoneArea[]
}

export const ZONES: Zone[] = [
  {
    id: 'z1',
    name: 'Zone 1 — Starter',
    element: 'neutral',
    tier: 0,
    areas: [
      { id: 'brindlewood', name: 'Brindlewood Home' },
      { id: 'sunflower',   name: 'Sunflower Hollow' },
      { id: 'proving',     name: 'Proving Glade' },
    ],
  },
  {
    id: 'z2',
    name: 'Zone 2 — Earth',
    element: 'earth',
    tier: 1,
    areas: [
      { id: 'pebblebrook', name: 'Pebblebrook' },
      { id: 'mossgrove',   name: 'Mossgrove' },
      { id: 'granite',     name: 'Granite Hall' },
    ],
  },
  {
    id: 'z3',
    name: 'Zone 3 — Water',
    element: 'water',
    tier: 2,
    areas: [
      { id: 'saltspray', name: 'Saltspray Cove' },
      { id: 'mistreef',  name: 'Mistreef' },
      { id: 'coral',     name: 'Coral Sanctum' },
    ],
  },
  {
    id: 'z4',
    name: 'Zone 4 — Fire',
    element: 'fire',
    tier: 3,
    areas: [
      { id: 'cinderpath', name: 'Cinderpath' },
      { id: 'ashfall',    name: 'Ashfall Camp' },
      { id: 'magma',      name: 'Magma Forge' },
    ],
  },
  {
    id: 'z5',
    name: 'Zone 5 — Air',
    element: 'air',
    tier: 4,
    areas: [
      { id: 'windwhistle', name: 'Windwhistle Pass' },
      { id: 'cloudperch',  name: 'Cloudperch' },
      { id: 'galecrest',   name: 'Galecrest Spire' },
    ],
  },
  {
    id: 'z6',
    name: 'Zone 6 — Spirit',
    element: 'spirit',
    tier: 5,
    areas: [
      { id: 'whisperwood', name: 'Whisperwood' },
      { id: 'moonveil',    name: 'Moonveil' },
      { id: 'starfall',    name: 'Starfall Temple' },
    ],
  },
]
