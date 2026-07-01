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
  pickRandomTarget,
} from './battle'
import { getTypeMultiplier } from './combat'
import type { Element } from './types'

// ── Asymmetric type matrix tests ─────────────────────────────────────────────

describe('getTypeMultiplier — asymmetric 5×5 matrix (§3)', () => {
  const ELEMENTS: Element[] = ['water', 'fire', 'air', 'spirit', 'earth']

  it('Water→Fire is ×2 (offensive advantage)', () => {
    expect(getTypeMultiplier('water', 'fire')).toBe(2)
  })

  it('Fire→Water is ×1, NOT ×0.5 — key asymmetry vs the old symmetric system', () => {
    expect(getTypeMultiplier('fire', 'water')).toBe(1)
  })

  it('Spirit→Water is ×0.5 (Water resists Spirit attacks)', () => {
    expect(getTypeMultiplier('spirit', 'water')).toBe(0.5)
  })

  it('every element vs itself is ×1.0', () => {
    for (const e of ELEMENTS) {
      expect(getTypeMultiplier(e, e)).toBe(1)
    }
  })

  it('every row (attacker) has exactly one ×2 and one ×0.5', () => {
    for (const attacker of ELEMENTS) {
      const values = ELEMENTS.map((d) => getTypeMultiplier(attacker, d))
      expect(values.filter((v) => v === 2)).toHaveLength(1)
      expect(values.filter((v) => v === 0.5)).toHaveLength(1)
    }
  })

  it('every column (defender) has exactly one ×2 and one ×0.5', () => {
    for (const defender of ELEMENTS) {
      const values = ELEMENTS.map((a) => getTypeMultiplier(a, defender))
      expect(values.filter((v) => v === 2)).toHaveLength(1)
      expect(values.filter((v) => v === 0.5)).toHaveLength(1)
    }
  })

  it('full attack wheel: each element deals ×2 to the next (Water→Fire→Air→Spirit→Earth→Water)', () => {
    expect(getTypeMultiplier('water',  'fire'  )).toBe(2)
    expect(getTypeMultiplier('fire',   'air'   )).toBe(2)
    expect(getTypeMultiplier('air',    'spirit')).toBe(2)
    expect(getTypeMultiplier('spirit', 'earth' )).toBe(2)
    expect(getTypeMultiplier('earth',  'water' )).toBe(2)
  })

  it('full defense wheel: each element resists the element 2 steps behind on the attack wheel', () => {
    expect(getTypeMultiplier('spirit', 'water' )).toBe(0.5) // Water resists Spirit
    expect(getTypeMultiplier('earth',  'fire'  )).toBe(0.5) // Fire  resists Earth
    expect(getTypeMultiplier('water',  'air'   )).toBe(0.5) // Air   resists Water
    expect(getTypeMultiplier('fire',   'spirit')).toBe(0.5) // Spirit resists Fire
    expect(getTypeMultiplier('air',    'earth' )).toBe(0.5) // Earth  resists Air
  })
})

// ── §5 worked example (updated for asymmetric matrix) ────────────────────────
// earth L8: power=9, speed=10, hp=26
// water L8: power=10, speed=11, hp=28
// Water is faster (11 > 10), so the ENEMY phase leads each round.
// earth→water: 9×2=18 (super)   water→earth: 10×1.0=10 (neutral — asymmetric!)

describe('calcDamage', () => {
  it('§5 earth→water at L8: round(9×2)=18', () => {
    expect(calcDamage(9, 'earth', 'water')).toBe(18)
  })
  it('water→earth is neutral (×1.0) in the asymmetric matrix: round(10×1.0)=10', () => {
    expect(calcDamage(10, 'water', 'earth')).toBe(10)
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

describe('player phase — slot order (player-chosen attack sequence)', () => {
  // Player team is faster so the player phase leads. Three ponies of differing Speed,
  // deliberately arranged so slot order ≠ speed order:
  // slot 1 = p1 (Fast/speed 10), slot 2 = p2 (Mid/speed 7), slot 3 = p3 (Slow/speed 4)
  // (For this test set, slot order == speed order, which lets existing assertions hold.
  //  See the dedicated slot-order tests below for the asymmetric case.)
  const p1 = buildBattlePony('p1', 'Fast',   'fire',  1, 8)  // speed 10
  const p2 = buildBattlePony('p2', 'Mid',    'fire',  1, 5)  // speed 7
  const p3 = buildBattlePony('p3', 'Slow',   'fire',  1, 2)  // speed 4
  // High-HP, low-Speed dummy: slower than every player pony, survives all 3 hits.
  const enemy = { ...buildBattlePony('en', 'Dummy', 'earth', 1, 1), maxHp: 999, currentHp: 999 } // speed 3

  it('all three player ponies are available at the start of the phase', () => {
    const state = createBattleState([p1, p2, p3], [enemy])
    expect(state.activePhase).toBe('player')
    expect(availableActors(state).map(p => p.id)).toEqual(['p1', 'p2', 'p3']) // slot order
  })

  it('lets her act with the SLOWEST pony first; only that pony is then used up', () => {
    let state = createBattleState([p1, p2, p3], [enemy])
    // Pick p3 (slowest, slot 3) first — not what a Speed queue would force.
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

// ── Player slot order: slow-first scenario ───────────────────────────────────
describe('player team slot order — slowest pony in slot 1 acts before fastest in slot 2', () => {
  // Arrange so array order (slot order) != speed order
  const slowSlot1 = buildBattlePony('slow', 'Slow', 'fire', 1, 2)  // tier1 L2 → speed 4
  const fastSlot2 = buildBattlePony('fast', 'Fast', 'fire', 1, 8)  // tier1 L8 → speed 10
  // Enemy is very slow so the player phase leads; very high HP so it survives
  const enemy = { ...buildBattlePony('e', 'E', 'earth', 1, 1), maxHp: 9999, currentHp: 9999 }

  it('availableActors returns [slow, fast] (slot order), not [fast, slow] (speed order)', () => {
    const state = createBattleState([slowSlot1, fastSlot2], [enemy])
    expect(state.activePhase).toBe('player')
    const order = availableActors(state).map(p => p.id)
    expect(order).toEqual(['slow', 'fast'])   // slot 1 first
  })

  it('nextActor picks the slot-1 pony (slow) first, then slot-2 (fast)', () => {
    let state = createBattleState([slowSlot1, fastSlot2], [enemy])
    expect(nextActor(state)?.pony.id).toBe('slow')          // slot 1 acts first
    ;({ state } = applyAttack(state, 'slow', 'e'))
    expect(nextActor(state)?.pony.id).toBe('fast')          // slot 2 acts second
  })

  it('reordering across battles: the stored array order persists as slot order', () => {
    // Simulate saving fast-first, slow-second in the team array
    const state = createBattleState([fastSlot2, slowSlot1], [enemy])
    expect(availableActors(state).map(p => p.id)).toEqual(['fast', 'slow'])
  })
})

// ── Round cycle ───────────────────────────────────────────────────────────────
describe('round cycle — both phases then reset', () => {
  it('§5 1v1: enemy leads, round resets, earth wins in two rounds (asymmetric matrix)', () => {
    const earth = buildBattlePony('e1', 'Earth', 'earth', 1, 8)  // speed 10, power 9, hp 26
    const water = buildBattlePony('w1', 'Water', 'water', 2, 8)  // speed 11, power 10, hp 28
    let state = createBattleState([earth], [water])

    // ── Round 1 ──────────────────────────────────────────────────────────
    expect(state.activePhase).toBe('enemy')         // water faster
    let actor = nextActor(state)
    expect(actor?.pony.id).toBe('w1')

    // water→earth: ×1.0 neutral (asymmetric matrix) → damage 10
    let r = applyAttack(state, 'w1', 'e1')
    expect(r.event.damage).toBe(10)
    expect(r.event.multiplier).toBe('neutral')
    expect(r.state.playerPonies[0].currentHp).toBe(16)  // 26 - 10
    expect(r.state.activePhase).toBe('player')       // hand off to player
    state = r.state

    // earth→water: ×2 super → damage 18
    r = applyAttack(state, 'e1', 'w1')
    expect(r.event.damage).toBe(18)
    expect(r.event.multiplier).toBe('super')
    expect(r.state.enemyPonies[0].currentHp).toBe(10)  // 28 - 18
    expect(r.state.activePhase).toBe('enemy')        // round reset → water leads again
    expect(r.state.actedIds).toEqual([])
    state = r.state
    expect(isBattleOver(state)).toBe(null)

    // ── Round 2 ──────────────────────────────────────────────────────────
    r = applyAttack(state, 'w1', 'e1')               // earth 16 → 6
    expect(r.state.playerPonies[0].currentHp).toBe(6)
    state = r.state

    r = applyAttack(state, 'e1', 'w1')               // water 10 → 0
    expect(r.event.targetFainted).toBe(true)
    expect(r.state.enemyPonies[0].currentHp).toBe(0)
    state = r.state

    expect(isBattleOver(state)).toBe('player')
  })
})

// ── pickRandomTarget — uniform random enemy targeting ─────────────────────────
describe('pickRandomTarget', () => {
  it('over 200 calls on a 3-pony team, all three ponies are targeted', () => {
    const ponies = [
      buildBattlePony('p0', 'P0', 'fire',  1, 3),
      buildBattlePony('p1', 'P1', 'water', 1, 3),
      buildBattlePony('p2', 'P2', 'earth', 1, 3),
    ]
    const counts: Record<string, number> = {}
    for (let i = 0; i < 200; i++) {
      const t = pickRandomTarget(ponies)
      if (t) counts[t.id] = (counts[t.id] ?? 0) + 1
    }
    expect(counts['p0']).toBeGreaterThan(0)
    expect(counts['p1']).toBeGreaterThan(0)
    expect(counts['p2']).toBeGreaterThan(0)
  })

  it('never targets a fainted pony — only the living one is ever picked', () => {
    const alive = buildBattlePony('alive', 'Alive', 'fire',  1, 3)
    const dead  = { ...buildBattlePony('dead',  'Dead',  'water', 1, 3), currentHp: 0 }
    for (let i = 0; i < 50; i++) {
      expect(pickRandomTarget([alive, dead])?.id).toBe('alive')
      expect(pickRandomTarget([dead, alive])?.id).toBe('alive')
    }
  })

  it('returns null when all ponies have fainted', () => {
    const dead = { ...buildBattlePony('d', 'D', 'fire', 1, 3), currentHp: 0 }
    expect(pickRandomTarget([dead])).toBeNull()
    expect(pickRandomTarget([])).toBeNull()
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
