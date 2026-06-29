// Trial Guardians and the post-game Champion (§7). Each Trial team is the zone's
// signature ace + 2 of that zone's element species, at levels near the zone cap
// (§6). Teams reference species by id (validated in content.test.ts).

export interface TrialPony {
  speciesId: string
  level: number
}

export interface Guardian {
  id: string
  name: string
  title: string
  /** Zone whose Trial this Guardian gates; omitted for the post-game Champion. */
  zoneId?: string
  /** The Guardian's signature ace — awarded to the player on a Trial win (Zones 2–6). */
  aceSpeciesId: string
  /** 3-on-3 Trial team, ace included. */
  team: TrialPony[]
}

export const GUARDIANS: Guardian[] = [
  {
    id: 'bramblewood',
    name: 'Warden Bramblewood',
    title: 'Earth Guardian',
    zoneId: 'z2',
    aceSpeciesId: 'boulderhoof',
    team: [
      { speciesId: 'daisy-dapple', level: 3 },
      { speciesId: 'clay-canter',  level: 3 },
      { speciesId: 'boulderhoof',  level: 4 },
    ],
  },
  {
    id: 'nerida',
    name: 'Tidecaller Nerida',
    title: 'Water Guardian',
    zoneId: 'z3',
    aceSpeciesId: 'tidalhoof',
    team: [
      { speciesId: 'splash-pebble', level: 5 },
      { speciesId: 'coral-shimmer', level: 5 },
      { speciesId: 'tidalhoof',     level: 6 },
    ],
  },
  {
    id: 'cinda',
    name: 'Emberwarden Cinda',
    title: 'Fire Guardian',
    zoneId: 'z4',
    aceSpeciesId: 'blazehoof',
    team: [
      { speciesId: 'flame-twirl',  level: 7 },
      { speciesId: 'ember-glow',   level: 7 },
      { speciesId: 'blazehoof',    level: 8 },
    ],
  },
  {
    id: 'zephyra',
    name: 'Skywarden Zephyra',
    title: 'Air Guardian',
    zoneId: 'z5',
    aceSpeciesId: 'galehoof',
    team: [
      { speciesId: 'wind-whistle',  level: 9 },
      { speciesId: 'feather-float', level: 9 },
      { speciesId: 'galehoof',      level: 10 },
    ],
  },
  {
    id: 'lumina',
    name: 'Starwarden Lumina',
    title: 'Spirit Guardian',
    zoneId: 'z6',
    aceSpeciesId: 'astralhoof',
    team: [
      { speciesId: 'dusk-twinkle', level: 11 },
      { speciesId: 'nova-drift',   level: 11 },
      { speciesId: 'astralhoof',   level: 12 },
    ],
  },
  {
    id: 'vesper',
    name: 'Grand Champion Vesper',
    title: 'Champion',
    // No zoneId — the Champion fight is the post-Zone 6 capstone (§7).
    aceSpeciesId: 'aurelune',
    team: [
      { speciesId: 'star-sparkle', level: 14 },
      { speciesId: 'moon-glimmer', level: 14 },
      { speciesId: 'aurelune',     level: 15 },
    ],
  },
]

export const GUARDIAN_BY_ID: Record<string, Guardian> = Object.fromEntries(
  GUARDIANS.map((g) => [g.id, g]),
)

/** The post-game Champion (Grand Champion Vesper). */
export const CHAMPION: Guardian = GUARDIAN_BY_ID['vesper']
