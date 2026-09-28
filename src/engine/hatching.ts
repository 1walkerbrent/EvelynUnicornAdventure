// Hatching + the Meadow (§20). Pure: who can hatch, what it costs, what the foal
// could be (the preview), the foal roll itself, and what releasing a pony pays.
//
// The design goal is that choosing a pair takes thought. The LEAD parent fixes
// the foal's species and element; the PARTNER is a free choice that shapes its
// stats and its chance of a rare color.

import type { Creature, Element, Ivs, VariantId } from './types'
import { SPECIES_BY_ID, CHAMPION_SPECIES } from '../content/creatures'
import { getStats } from './stats'
import { getTypeMultiplier } from './combat'
import { newCreatureId } from './creature'
import { IV_MAX } from './ivs'

type Rng = () => number

// ── Tunables ─────────────────────────────────────────────────────────────────

export const HATCH_BASE_COST = 15
/** Extra per Guardian-signature parent: their 3/3/3 IVs make them the best parents. */
export const GUARDIAN_PARENT_SURCHARGE = 20
export const MIN_PARENT_LEVEL = 5
/** Battle wins both parents rest for after hatching. */
export const REST_WINS = 3
export const SPARKLE_CHANCE = 0.15
/** Pure pairs sparkle more — the trade-off against mixing in a partner's strengths. */
export const SPARKLE_CHANCE_SAME_ELEMENT = 0.25
/** A hatched pony counts as a "foal" (smaller sprite, tag) until this level. */
export const FOAL_UNTIL_LEVEL = 5

// ── Rare colors ──────────────────────────────────────────────────────────────

export interface Variant {
  id: VariantId
  name: string
  emoji: string
  /** Shown in the Recipe Book once found. */
  recipe: string
  /** Riddle shown in the Recipe Book until found. */
  clue: string
  /**
   * CSS filter drawn over the pony's normal sprite. Colors are flattened first
   * (grayscale → sepia) and then tinted, so every species comes out the same
   * color — a plain hue-rotate would turn each pony a different shade.
   */
  filter: string
  chance: number
  eligible: (lead: Creature, partner: Creature) => boolean
}

const STATS: Array<keyof Ivs> = ['heart', 'power', 'speed']

function elementOf(c: Creature): Element | undefined {
  return SPECIES_BY_ID[c.speciesId]?.element
}

function isPair(lead: Creature, partner: Creature, a: Element, b: Element): boolean {
  const x = elementOf(lead)
  const y = elementOf(partner)
  return (x === a && y === b) || (x === b && y === a)
}

/** Checked in this order; the first one that rolls wins. */
export const VARIANTS: Variant[] = [
  {
    id: 'starlight', name: 'Starlight', emoji: '✨',
    recipe: 'Both parents have a perfect 3 in the same stat',
    clue: 'Two ponies who both shine brightest at the very same thing…',
    filter: 'grayscale(0.6) brightness(1.25) drop-shadow(0 0 6px #fff7c2) drop-shadow(0 0 2px #fde68a)',
    chance: 0.3,
    eligible: (l, p) => STATS.some((k) => l.ivs?.[k] === IV_MAX && p.ivs?.[k] === IV_MAX),
  },
  {
    id: 'shadow', name: 'Shadow', emoji: '🌑',
    recipe: 'The parents are rivals — one hits the other ×2',
    clue: 'Two ponies who never, ever get along…',
    filter: 'grayscale(1) sepia(1) hue-rotate(230deg) saturate(2.5) brightness(0.78) drop-shadow(0 0 6px #c084fc)',
    chance: 0.2,
    eligible: (l, p) => {
      const a = elementOf(l)
      const b = elementOf(p)
      return !!a && !!b && (getTypeMultiplier(a, b) === 2 || getTypeMultiplier(b, a) === 2)
    },
  },
  {
    id: 'moonlit', name: 'Moonlit', emoji: '🌙',
    recipe: 'A Water pony and a Spirit pony',
    clue: 'Where calm water meets something mysterious…',
    filter: 'grayscale(1) sepia(0.8) hue-rotate(175deg) saturate(1.8) brightness(1.1) drop-shadow(0 0 5px #93c5fd)',
    chance: 0.15,
    eligible: (l, p) => isPair(l, p, 'water', 'spirit'),
  },
  {
    id: 'sunburst', name: 'Sunburst', emoji: '🌅',
    recipe: 'A Fire pony and an Earth pony',
    clue: 'Fire and stone, warming together…',
    filter: 'grayscale(1) sepia(1) saturate(3) brightness(1.1) drop-shadow(0 0 5px #fbbf24)',
    chance: 0.15,
    eligible: (l, p) => isPair(l, p, 'fire', 'earth'),
  },
  {
    id: 'aurora', name: 'Aurora', emoji: '🌌',
    recipe: 'An Air pony and a Water pony',
    clue: 'When the wind dances over the waves…',
    filter: 'grayscale(1) sepia(1) hue-rotate(115deg) saturate(2) brightness(1.05) drop-shadow(0 0 5px #6ee7b7)',
    chance: 0.15,
    eligible: (l, p) => isPair(l, p, 'air', 'water'),
  },
]

export const VARIANT_BY_ID = Object.fromEntries(VARIANTS.map((v) => [v.id, v])) as Record<VariantId, Variant>

// ── Who can hatch ────────────────────────────────────────────────────────────

/** A Guardian signature that joined as a trophy (not a hatched pony of that species). */
export function isGuardianPony(c: Creature): boolean {
  return c.trophy === true && c.speciesId !== CHAMPION_SPECIES.id
}

export function isFoal(c: Creature): boolean {
  return c.parents !== undefined && c.level < FOAL_UNTIL_LEVEL
}

/** Wins left before a resting pony can hatch again (0 = ready). */
export function restWinsLeft(c: Creature, battlesWon: number): number {
  return Math.max(0, (c.restUntil ?? 0) - battlesWon)
}

/** Why this pony can't hatch right now, or null if it can. */
export function hatchBlockReason(c: Creature, battlesWon: number): string | null {
  if (c.speciesId === CHAMPION_SPECIES.id) return 'Aurelune is too busy being Champion'
  if (c.level < MIN_PARENT_LEVEL) return `Needs level ${MIN_PARENT_LEVEL}`
  const left = restWinsLeft(c, battlesWon)
  if (left > 0) return `Resting — win ${left} more ${left === 1 ? 'battle' : 'battles'}`
  return null
}

export function hatchCost(lead: Creature, partner: Creature): number {
  const guardians = [lead, partner].filter(isGuardianPony).length
  return HATCH_BASE_COST + guardians * GUARDIAN_PARENT_SURCHARGE
}

function sparkleChance(lead: Creature, partner: Creature): number {
  return elementOf(lead) === elementOf(partner) ? SPARKLE_CHANCE_SAME_ELEMENT : SPARKLE_CHANCE
}

// ── The preview ──────────────────────────────────────────────────────────────

export interface HatchPreview {
  cost: number
  /** Possible IV range per stat, sparkle included. */
  stats: Record<keyof Ivs, { min: number; max: number }>
  sparkleChance: number
  sameElement: boolean
  /** Every rare color this exact pair could produce, with its real chance. */
  variants: Array<{ variant: Variant; chance: number }>
}

export function previewHatch(lead: Creature, partner: Creature): HatchPreview {
  const stats = {} as HatchPreview['stats']
  for (const k of STATS) {
    const a = lead.ivs?.[k] ?? 0
    const b = partner.ivs?.[k] ?? 0
    stats[k] = { min: Math.min(a, b), max: Math.min(IV_MAX, Math.max(a, b) + 1) }
  }
  // Chance each variant actually lands, given the ones before it are rolled first.
  let notYet = 1
  const variants: HatchPreview['variants'] = []
  for (const v of VARIANTS) {
    if (!v.eligible(lead, partner)) continue
    variants.push({ variant: v, chance: notYet * v.chance })
    notYet *= 1 - v.chance
  }
  return {
    cost: hatchCost(lead, partner),
    stats,
    sparkleChance: sparkleChance(lead, partner),
    sameElement: elementOf(lead) === elementOf(partner),
    variants,
  }
}

// ── The roll ─────────────────────────────────────────────────────────────────

export function rollFoalIvs(lead: Creature, partner: Creature, rng: Rng): Ivs {
  const chance = sparkleChance(lead, partner)
  const ivs = {} as Ivs
  for (const k of STATS) {
    const inherited = (rng() < 0.5 ? lead : partner).ivs?.[k] ?? 0
    ivs[k] = rng() < chance ? Math.min(IV_MAX, inherited + 1) : inherited
  }
  return ivs
}

export function rollVariant(lead: Creature, partner: Creature, rng: Rng): VariantId | undefined {
  for (const v of VARIANTS) {
    if (v.eligible(lead, partner) && rng() < v.chance) return v.id
  }
  return undefined
}

/** The foal: the lead's species at level 1, stats blended from both parents. */
export function hatchFoal(lead: Creature, partner: Creature, rng: Rng = Math.random): Creature {
  const species = SPECIES_BY_ID[lead.speciesId]
  const ivs = rollFoalIvs(lead, partner, rng)
  const variant = rollVariant(lead, partner, rng)
  return {
    id:        newCreatureId(),
    speciesId: species.id,
    nickname:  variant ? `${VARIANT_BY_ID[variant].name} ${species.name}` : species.name,
    level:     1,
    currentHp: getStats(species.tier, 1, ivs).heart,
    xp:        0,
    ivs,
    parents:   [lead.id ?? '', partner.id ?? ''],
    ...(variant ? { variant } : {}),
  }
}

// ── The Meadow ───────────────────────────────────────────────────────────────

export function releaseValue(c: Creature): number {
  return 5 + Math.floor(c.level / 2)
}

/** Why this pony can't go to the Meadow, or null if it can. */
export function releaseBlockReason(c: Creature, party: Creature[], activeIds: Set<string | undefined>): string | null {
  if (c.trophy) return 'Trophy ponies stay with you'
  if (activeIds.has(c.id)) return 'On your battle team'
  if (party.length <= 1) return 'Your only pony'
  return null
}
