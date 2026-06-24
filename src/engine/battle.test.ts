import { describe, it, expect } from 'vitest'
import {
  buildBattlePony,
  createBattleState,
  nextActor,
  applyAttack,
  isBattleOver,
  calcDamage,
} from './battle'

// ── §5 worked example: Earth (tier-1, L8) vs Water (tier-2, L8) ─────────────
// earth L8: power=9, speed=10, hp=26
// water L8: power=10, speed=11, hp=28
// Water is faster (11 > 10), so it acts first each round.
// earth→water: 9×2=18  (super)   water→earth: 10×0.5=5  (weak)
// Round 1: water hits earth (5), earth hits water (18) → water at 10
// Round 2: water hits earth (5), earth hits water (18) → water fainted (earth at 16)

describe('calcDamage', () => {
  it('§5 earth→water at L8: round(9×2)=18', () => {
    expect(calcDamage(9, 'earth', 'water')).toBe(18)
  })
  it('§5 water→earth at L8: round(10×0.5)=5', () => {
    expect(calcDamage(10, 'water', 'earth')).toBe(5)
  })
  it('neutral: returns power unchanged', () => {
    expect(calcDamage(7, 'fire', 'earth')).toBe(7)
  })
  it('minimum 1 even when rounded below 1', () => {
    expect(calcDamage(1, 'water', 'earth')).toBe(1)
  })
})

describe('step-wise battle — §5 1v1 scripted', () => {
  const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)
  const water = buildBattlePony('w1', 'Water', 'water', 2, 8)

  it('initial state has correct HP and queue (water faster)', () => {
    const state = createBattleState([earth], [water])
    expect(earth.maxHp).toBe(26)
    expect(water.maxHp).toBe(28)
    // water (speed 11) should be first in queue
    expect(state.turnQueue[0]).toBe('w1')
  })

  it('plays through exactly 4 steps, correct events, earth wins', () => {
    let state = createBattleState([earth], [water])

    // ── Round 1, step 1: water acts first ───────────────────────────────
    let actor = nextActor(state)
    expect(actor?.pony.id).toBe('w1')
    expect(actor?.isPlayer).toBe(false)

    let r = applyAttack(state, 'w1', 'e1')
    expect(r.event.damage).toBe(5)
    expect(r.event.multiplier).toBe('weak')
    expect(r.event.targetFainted).toBe(false)
    expect(r.state.playerPonies[0].currentHp).toBe(21)  // 26-5
    state = r.state

    // ── Round 1, step 2: earth acts ─────────────────────────────────────
    actor = nextActor(state)
    expect(actor?.pony.id).toBe('e1')
    expect(actor?.isPlayer).toBe(true)

    r = applyAttack(state, 'e1', 'w1')
    expect(r.event.damage).toBe(18)
    expect(r.event.multiplier).toBe('super')
    expect(r.event.targetFainted).toBe(false)
    expect(r.state.enemyPonies[0].currentHp).toBe(10)   // 28-18
    state = r.state
    expect(isBattleOver(state)).toBe(null)

    // ── Round 2, step 1: water again ────────────────────────────────────
    actor = nextActor(state)
    expect(actor?.pony.id).toBe('w1')

    r = applyAttack(state, 'w1', 'e1')
    expect(r.event.damage).toBe(5)
    expect(r.state.playerPonies[0].currentHp).toBe(16)  // 21-5
    state = r.state

    // ── Round 2, step 2: earth finishes water ───────────────────────────
    actor = nextActor(state)
    expect(actor?.pony.id).toBe('e1')

    r = applyAttack(state, 'e1', 'w1')
    expect(r.event.damage).toBe(18)
    expect(r.event.targetFainted).toBe(true)
    expect(r.state.enemyPonies[0].currentHp).toBe(0)
    state = r.state

    expect(isBattleOver(state)).toBe('player')
  })
})

describe('step-wise battle — 3v3 auto-play terminates correctly', () => {
  it('always terminates with a valid winner', () => {
    // Pip's team: earth, air, spirit at L3
    const playerTeam = [
      buildBattlePony('p0', 'Ember',  'fire',   1, 3),
      buildBattlePony('p1', 'Clover', 'earth',  1, 3),
      buildBattlePony('p2', 'Marina', 'water',  1, 3),
    ]
    const enemyTeam = [
      buildBattlePony('e0', 'Pebble', 'earth',  1, 3),
      buildBattlePony('e1', 'Wisp',   'air',    1, 3),
      buildBattlePony('e2', 'Glow',   'spirit', 1, 3),
    ]

    let state = createBattleState(playerTeam, enemyTeam)
    let steps = 0

    while (isBattleOver(state) === null && steps < 500) {
      const actor = nextActor(state)
      if (!actor) break
      // Each side always attacks the first alive opponent
      const targets = actor.isPlayer ? state.enemyPonies : state.playerPonies
      const target = targets.find(p => p.currentHp > 0)
      if (!target) break
      ;({ state } = applyAttack(state, actor.pony.id, target.id))
      steps++
    }

    const result = isBattleOver(state)
    expect(result === 'player' || result === 'enemy').toBe(true)
    expect(steps).toBeLessThan(500)
  })
})

describe('isBattleOver', () => {
  it('returns null when both sides have alive ponies', () => {
    const state = createBattleState(
      [buildBattlePony('p', 'P', 'fire', 1, 1)],
      [buildBattlePony('e', 'E', 'water', 1, 1)],
    )
    expect(isBattleOver(state)).toBe(null)
  })

  it('returns player when all enemies fainted', () => {
    const state = createBattleState(
      [buildBattlePony('p', 'P', 'fire', 1, 1)],
      [{ ...buildBattlePony('e', 'E', 'water', 1, 1), currentHp: 0 }],
    )
    expect(isBattleOver(state)).toBe('player')
  })

  it('returns enemy when all player ponies fainted', () => {
    const state = createBattleState(
      [{ ...buildBattlePony('p', 'P', 'fire', 1, 1), currentHp: 0 }],
      [buildBattlePony('e', 'E', 'water', 1, 1)],
    )
    expect(isBattleOver(state)).toBe('enemy')
  })
})
