import { describe, it, expect } from 'vitest'
import {
  buildBattlePony,
  createBattleState,
  startingPhase,
  availableActors,
  nextActor,
  applyAttack,
  isBattleOver,
  calcDamage,
} from './battle'

// ── §5 worked example: Earth (tier-1, L8) vs Water (tier-2, L8) ─────────────
// earth L8: power=9, speed=10, hp=26
// water L8: power=10, speed=11, hp=28
// Water is faster (11 > 10), so the ENEMY phase leads each round.
// earth→water: 9×2=18 (super)   water→earth: 10×0.5=5 (weak)

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

describe('startingPhase — Speed decides which team leads (player wins ties, §4)', () => {
  it('faster enemy team leads', () => {
    const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)  // speed 10
    const water = buildBattlePony('w1', 'Water', 'water', 2, 8)  // speed 11
    expect(startingPhase([earth], [water])).toBe('enemy')
  })
  it('faster player team leads', () => {
    const water = buildBattlePony('w1', 'Water', 'water', 2, 8)  // speed 11
    const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)  // speed 10
    expect(startingPhase([water], [earth])).toBe('player')
  })
  it('player wins a Speed tie', () => {
    const a = buildBattlePony('a', 'A', 'fire', 1, 5)
    const b = buildBattlePony('b', 'B', 'water', 1, 5)  // identical stats → tie
    expect(startingPhase([a], [b])).toBe('player')
  })
})

describe('createBattleState', () => {
  it('opens on the faster team\'s phase with nothing acted yet', () => {
    const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)
    const water = buildBattlePony('w1', 'Water', 'water', 2, 8)
    const state = createBattleState([earth], [water])
    expect(earth.maxHp).toBe(26)
    expect(water.maxHp).toBe(28)
    expect(state.activePhase).toBe('enemy')   // water is faster
    expect(state.actedIds).toEqual([])
  })
})

describe('player phase — free choice of pony order', () => {
  // Player team is faster so the player phase leads. Three ponies of differing Speed.
  const p1 = buildBattlePony('p1', 'Fast',   'fire',  1, 8)  // speed 10
  const p2 = buildBattlePony('p2', 'Mid',    'fire',  1, 5)  // speed 7
  const p3 = buildBattlePony('p3', 'Slow',   'fire',  1, 2)  // speed 4
  // High-HP, low-Speed dummy: slower than every player pony, survives all 3 hits.
  const enemy = { ...buildBattlePony('en', 'Dummy', 'earth', 1, 1), maxHp: 999, currentHp: 999 } // speed 3

  it('all three player ponies are available at the start of the phase', () => {
    const state = createBattleState([p1, p2, p3], [enemy])
    expect(state.activePhase).toBe('player')
    expect(availableActors(state).map(p => p.id)).toEqual(['p1', 'p2', 'p3']) // Speed order
  })

  it('lets her act with the SLOWEST pony first; only that pony is then used up', () => {
    let state = createBattleState([p1, p2, p3], [enemy])
    // Pick p3 (slowest) first — not what a Speed queue would force.
    ;({ state } = applyAttack(state, 'p3', 'en'))
    expect(state.activePhase).toBe('player')                       // still her phase
    expect(availableActors(state).map(p => p.id)).toEqual(['p1', 'p2'])
    expect(state.actedIds).toContain('p3')
  })

  it('after all three act, the phase hands off to the enemy', () => {
    let state = createBattleState([p1, p2, p3], [enemy])
    ;({ state } = applyAttack(state, 'p2', 'en'))
    ;({ state } = applyAttack(state, 'p1', 'en'))
    expect(state.activePhase).toBe('player')                       // one pony left
    ;({ state } = applyAttack(state, 'p3', 'en'))
    expect(state.activePhase).toBe('enemy')                        // her phase complete
  })
})

describe('round cycle — both phases then reset', () => {
  it('§5 1v1: enemy leads, round resets, earth wins in two rounds', () => {
    const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)
    const water = buildBattlePony('w1', 'Water', 'water', 2, 8)
    let state = createBattleState([earth], [water])

    // ── Round 1 ──────────────────────────────────────────────────────────
    expect(state.activePhase).toBe('enemy')         // water faster
    let actor = nextActor(state)
    expect(actor?.pony.id).toBe('w1')

    let r = applyAttack(state, 'w1', 'e1')           // 10×0.5 = 5
    expect(r.event.damage).toBe(5)
    expect(r.event.multiplier).toBe('weak')
    expect(r.state.playerPonies[0].currentHp).toBe(21)
    expect(r.state.activePhase).toBe('player')       // hand off to player
    state = r.state

    r = applyAttack(state, 'e1', 'w1')               // 9×2 = 18
    expect(r.event.damage).toBe(18)
    expect(r.event.multiplier).toBe('super')
    expect(r.state.enemyPonies[0].currentHp).toBe(10)
    expect(r.state.activePhase).toBe('enemy')        // round reset → water leads again
    expect(r.state.actedIds).toEqual([])
    state = r.state
    expect(isBattleOver(state)).toBe(null)

    // ── Round 2 ──────────────────────────────────────────────────────────
    r = applyAttack(state, 'w1', 'e1')               // earth 21 → 16
    expect(r.state.playerPonies[0].currentHp).toBe(16)
    state = r.state

    r = applyAttack(state, 'e1', 'w1')               // water 10 → 0
    expect(r.event.targetFainted).toBe(true)
    expect(r.state.enemyPonies[0].currentHp).toBe(0)
    state = r.state

    expect(isBattleOver(state)).toBe('player')
  })
})

describe('3v3 auto-play terminates with a valid winner', () => {
  it('drives both phases to a result', () => {
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
