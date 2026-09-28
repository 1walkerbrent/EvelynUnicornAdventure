import { describe, it, expect } from 'vitest'
import {
  hatchBlockReason, hatchCost, previewHatch, hatchFoal, rollFoalIvs, rollVariant,
  releaseValue, releaseBlockReason, restWinsLeft, isFoal, isGuardianPony,
  VARIANTS, HATCH_BASE_COST, GUARDIAN_PARENT_SURCHARGE, MIN_PARENT_LEVEL,
} from './hatching'
import type { Creature, Element, Ivs } from './types'
import { ALL_SPECIES, SPECIES_BY_ID } from '../content/creatures'

/** A non-trophy species of the given element. */
function speciesOf(el: Element): string {
  return ALL_SPECIES.find((s) => s.element === el && !s.legendary && s.id !== 'boulderhoof')!.id
}

let n = 0
function pony(el: Element, ivs: Ivs = { heart: 1, power: 1, speed: 1 }, extra: Partial<Creature> = {}): Creature {
  n += 1
  return { id: `c${n}`, speciesId: speciesOf(el), nickname: 'p', level: 6, currentHp: 10, xp: 0, ivs, ...extra }
}

/** Replays a fixed list of rolls. */
function rolls(...values: number[]): () => number {
  let i = 0
  return () => values[i++ % values.length]
}

describe('who can hatch', () => {
  it('needs level 5', () => {
    expect(hatchBlockReason(pony('water', undefined, { level: MIN_PARENT_LEVEL - 1 }), 0)).toMatch(/level/)
    expect(hatchBlockReason(pony('water', undefined, { level: MIN_PARENT_LEVEL }), 0)).toBeNull()
  })

  it('Aurelune never hatches', () => {
    const a: Creature = { id: 'a', speciesId: 'aurelune', nickname: 'A', level: 15, currentHp: 1, xp: 0, trophy: true }
    expect(hatchBlockReason(a, 0)).toMatch(/Champion/)
  })

  it('Guardian trophies CAN hatch', () => {
    const g: Creature = { id: 'g', speciesId: 'boulderhoof', nickname: 'B', level: 8, currentHp: 1, xp: 0, trophy: true }
    expect(hatchBlockReason(g, 0)).toBeNull()
    expect(isGuardianPony(g)).toBe(true)
  })

  it('a resting pony counts down on battle wins', () => {
    const p = pony('fire', undefined, { restUntil: 10 })
    expect(restWinsLeft(p, 8)).toBe(2)
    expect(hatchBlockReason(p, 8)).toMatch(/win 2 more battles/)
    expect(hatchBlockReason(p, 10)).toBeNull()
  })
})

describe('cost', () => {
  const guardian: Creature = { id: 'g', speciesId: 'boulderhoof', nickname: 'B', level: 8, currentHp: 1, xp: 0, trophy: true }
  it('base, +surcharge per Guardian parent', () => {
    expect(hatchCost(pony('water'), pony('fire'))).toBe(HATCH_BASE_COST)
    expect(hatchCost(guardian, pony('fire'))).toBe(HATCH_BASE_COST + GUARDIAN_PARENT_SURCHARGE)
    expect(hatchCost(guardian, { ...guardian, id: 'g2' })).toBe(HATCH_BASE_COST + 2 * GUARDIAN_PARENT_SURCHARGE)
  })

  it('a hatched pony of a Guardian species is not charged as a Guardian', () => {
    const foalOfGuardian: Creature = { ...guardian, id: 'f', trophy: undefined, parents: ['g', 'x'] }
    expect(hatchCost(foalOfGuardian, pony('fire'))).toBe(HATCH_BASE_COST)
  })
})

describe('the foal', () => {
  it('takes the lead parent\'s species, starts at level 1, and remembers its parents', () => {
    const lead = pony('water')
    const partner = pony('fire')
    const foal = hatchFoal(lead, partner, rolls(0.9))
    expect(foal.speciesId).toBe(lead.speciesId)
    expect(foal.level).toBe(1)
    expect(foal.parents).toEqual([lead.id, partner.id])
    expect(foal.trophy).toBeUndefined()
    expect(isFoal(foal)).toBe(true)
  })

  it('each stat copies one parent (no sparkle)', () => {
    const lead = pony('water', { heart: 3, power: 0, speed: 2 })
    const partner = pony('fire', { heart: 0, power: 2, speed: 1 })
    // parent pick < 0.5 → lead, else partner; sparkle roll 0.99 → none
    expect(rollFoalIvs(lead, partner, rolls(0.1, 0.99, 0.9, 0.99, 0.1, 0.99)))
      .toEqual({ heart: 3, power: 2, speed: 2 })
  })

  it('sparkle adds +1 but never above 3', () => {
    const lead = pony('water', { heart: 3, power: 1, speed: 1 })
    const partner = pony('water', { heart: 3, power: 1, speed: 1 })
    expect(rollFoalIvs(lead, partner, rolls(0.1, 0.0))).toEqual({ heart: 3, power: 2, speed: 2 })
  })

  it('stays inside the preview ranges over many rolls', () => {
    const lead = pony('air', { heart: 0, power: 3, speed: 1 })
    const partner = pony('spirit', { heart: 2, power: 1, speed: 1 })
    const pv = previewHatch(lead, partner)
    for (let i = 0; i < 500; i++) {
      const ivs = rollFoalIvs(lead, partner, Math.random)
      for (const k of ['heart', 'power', 'speed'] as const) {
        expect(ivs[k]).toBeGreaterThanOrEqual(pv.stats[k].min)
        expect(ivs[k]).toBeLessThanOrEqual(pv.stats[k].max)
      }
    }
  })

  it('names a rare foal after its color', () => {
    const lead = pony('water')
    const partner = pony('spirit')
    // IV rolls (6) then the Moonlit roll lands
    const foal = hatchFoal(lead, partner, rolls(0.5, 0.99, 0.5, 0.99, 0.5, 0.99, 0.01))
    expect(foal.variant).toBe('moonlit')
    expect(foal.nickname).toBe(`Moonlit ${SPECIES_BY_ID[lead.speciesId].name}`)
  })
})

describe('rare color recipes', () => {
  it('Starlight: both parents have a 3 in the same stat', () => {
    const a = pony('water', { heart: 3, power: 0, speed: 0 })
    const b = pony('water', { heart: 3, power: 0, speed: 0 })
    expect(rollVariant(a, b, rolls(0.01))).toBe('starlight')
    expect(rollVariant(a, pony('water', { heart: 2, power: 3, speed: 3 }), rolls(0.01))).toBeUndefined()
  })

  it('Shadow: rivals on the attack wheel, in either order', () => {
    expect(rollVariant(pony('water'), pony('fire'), rolls(0.01))).toBe('shadow')
    expect(rollVariant(pony('fire'), pony('water'), rolls(0.01))).toBe('shadow')
  })

  it('element recipes never overlap Shadow', () => {
    for (const [x, y] of [['water', 'spirit'], ['fire', 'earth'], ['air', 'water']] as const) {
      const pv = previewHatch(pony(x), pony(y))
      expect(pv.variants.map((v) => v.variant.id)).not.toContain('shadow')
      expect(pv.variants.length).toBe(1)
    }
  })

  it('a same-element pair with no shared 3 has no rare color, but sparkles more', () => {
    const pv = previewHatch(pony('earth'), pony('earth'))
    expect(pv.variants).toEqual([])
    expect(pv.sameElement).toBe(true)
    expect(pv.sparkleChance).toBeGreaterThan(previewHatch(pony('earth'), pony('water')).sparkleChance)
  })

  it('preview chances account for earlier colors being rolled first', () => {
    // Water + Fire with a shared 3 → Starlight (30%) then Shadow (20% of the remaining 70%)
    const pv = previewHatch(pony('water', { heart: 3, power: 0, speed: 0 }), pony('fire', { heart: 3, power: 0, speed: 0 }))
    expect(pv.variants.map((v) => v.variant.id)).toEqual(['starlight', 'shadow'])
    expect(pv.variants[1].chance).toBeCloseTo(0.7 * 0.2)
  })

  it('every variant has a clue, a recipe and a filter', () => {
    for (const v of VARIANTS) {
      expect(v.clue && v.recipe && v.filter).toBeTruthy()
    }
  })
})

describe('the Meadow', () => {
  it('pays 5 + 1 per 2 levels', () => {
    expect(releaseValue(pony('water', undefined, { level: 1 }))).toBe(5)
    expect(releaseValue(pony('water', undefined, { level: 9 }))).toBe(9)
  })

  it('refuses trophies, the battle team, and her last pony', () => {
    const benched = pony('water')
    const onTeam = pony('fire')
    const trophy = pony('air', undefined, { trophy: true })
    const party = [benched, onTeam, trophy]
    const active = new Set([onTeam.id])
    expect(releaseBlockReason(benched, party, active)).toBeNull()
    expect(releaseBlockReason(onTeam, party, active)).toMatch(/team/)
    expect(releaseBlockReason(trophy, party, active)).toMatch(/Trophy/)
    expect(releaseBlockReason(benched, [benched], new Set())).toMatch(/only/)
  })
})
