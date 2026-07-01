import type { Element, Ivs } from './types'
import { getStats } from './stats'
import { ZERO_IVS } from './ivs'
import { getTypeMultiplier } from './combat'

// ── Step-wise battle API ─────────────────────────────────────────────────────
//
// Turn model (§4): a round is split into two team PHASES. Speed decides which
// team's phase goes first — the team with the fastest pony leads, player wins
// ties (home advantage). Within a phase, every alive pony on that team acts
// exactly once; the player freely chooses the order of her ponies, while enemy
// ponies are auto-played. When both phases are done the round resets.

export type Phase = 'player' | 'enemy'

export interface BattleState {
  playerPonies: BattlePony[]
  enemyPonies: BattlePony[]
  /** Which team is acting right now. */
  activePhase: Phase
  /** IDs of ponies that have already acted in the current round. */
  actedIds: string[]
}

export interface AttackEvent {
  attackerId: string
  targetId: string
  rawPower: number
  multiplier: 'super' | 'weak' | 'neutral'
  damage: number
  targetFainted: boolean
}

function fastestSpeed(ponies: BattlePony[]): number {
  return ponies
    .filter(p => p.currentHp > 0)
    .reduce((m, p) => Math.max(m, p.speed), -Infinity)
}

/** Which team's phase leads this round: faster team first, player wins ties (§4). */
export function startingPhase(players: BattlePony[], enemies: BattlePony[]): Phase {
  return fastestSpeed(players) >= fastestSpeed(enemies) ? 'player' : 'enemy'
}

export function createBattleState(
  playerPonies: BattlePony[],
  enemyPonies: BattlePony[],
): BattleState {
  return {
    playerPonies,
    enemyPonies,
    activePhase: startingPhase(playerPonies, enemyPonies),
    actedIds: [],
  }
}

function findPony(
  state: BattleState,
  id: string,
): { pony: BattlePony; isPlayer: boolean } | null {
  const p = state.playerPonies.find(x => x.id === id)
  if (p) return { pony: p, isPlayer: true }
  const e = state.enemyPonies.find(x => x.id === id)
  if (e) return { pony: e, isPlayer: false }
  return null
}

/** Alive ponies on the active team that still have their action this round (Speed order). */
export function availableActors(state: BattleState): BattlePony[] {
  const team = state.activePhase === 'player' ? state.playerPonies : state.enemyPonies
  return team
    .filter(p => p.currentHp > 0 && !state.actedIds.includes(p.id))
    .sort((a, b) => b.speed - a.speed)
}

/**
 * The next pony to act. In the player phase this is just the fastest un-acted
 * pony as a default suggestion — the UI may let her pick any available pony.
 * In the enemy phase it is the pony the auto-player should move next.
 */
export function nextActor(
  state: BattleState,
): { pony: BattlePony; isPlayer: boolean } | null {
  const actor = availableActors(state)[0]
  if (!actor) return null
  return { pony: actor, isPlayer: state.activePhase === 'player' }
}

/** Pure: applies one attack, advances the phase/round, returns new state + event. */
export function applyAttack(
  state: BattleState,
  attackerId: string,
  targetId: string,
): { state: BattleState; event: AttackEvent } {
  const attacker = findPony(state, attackerId)?.pony
  const target = findPony(state, targetId)?.pony
  if (!attacker || !target) throw new Error('applyAttack: invalid ids')

  const mult = getTypeMultiplier(attacker.element, target.element)
  const damage = calcDamage(attacker.power, attacker.element, target.element)
  const newHp = Math.max(0, target.currentHp - damage)

  const update = (ponies: BattlePony[]) =>
    ponies.map(p => (p.id === targetId ? { ...p, currentHp: newHp } : p))

  const newPlayers = update(state.playerPonies)
  const newEnemies = update(state.enemyPonies)

  const next: BattleState = {
    playerPonies: newPlayers,
    enemyPonies: newEnemies,
    activePhase: state.activePhase,
    actedIds: [...state.actedIds, attackerId],
  }

  // If the active team has no one left to act, hand off to the other phase —
  // or, if both teams are done, start a fresh round (re-checking Speed).
  if (availableActors(next).length === 0) {
    const other: Phase = next.activePhase === 'player' ? 'enemy' : 'player'
    const otherTeam = other === 'player' ? newPlayers : newEnemies
    const otherHasActors = otherTeam.some(
      p => p.currentHp > 0 && !next.actedIds.includes(p.id),
    )
    if (otherHasActors) {
      next.activePhase = other
    } else {
      next.actedIds = []
      next.activePhase = startingPhase(newPlayers, newEnemies)
    }
  }

  return {
    state: next,
    event: {
      attackerId,
      targetId,
      rawPower: attacker.power,
      multiplier: mult === 2 ? 'super' : mult === 0.5 ? 'weak' : 'neutral',
      damage,
      targetFainted: newHp === 0 && target.currentHp > 0,
    },
  }
}

/** Returns winner side, or null if still in progress. */
export function isBattleOver(state: BattleState): 'player' | 'enemy' | null {
  if (!state.enemyPonies.some(p => p.currentHp > 0)) return 'player'
  if (!state.playerPonies.some(p => p.currentHp > 0)) return 'enemy'
  return null
}

export interface BattlePony {
  id: string
  // Source species (when known) so the UI can show real art; undefined for
  // generic/placeholder ponies, which fall back to the element emoji-circle.
  speciesId?: string
  name: string
  element: Element
  maxHp: number
  currentHp: number
  power: number
  speed: number
}

export function buildBattlePony(
  id: string,
  name: string,
  element: Element,
  tier: 1 | 2 | 3 | 4 | 5,
  level: number,
  ivs: Ivs = ZERO_IVS,
): BattlePony {
  const stats = getStats(tier, level, ivs)
  return { id, name, element, maxHp: stats.heart, currentHp: stats.heart, power: stats.power, speed: stats.speed }
}

/** Damage formula from §4: round(Power × multiplier), minimum 1. */
export function calcDamage(power: number, attackerEl: Element, defenderEl: Element): number {
  return Math.max(1, Math.round(power * getTypeMultiplier(attackerEl, defenderEl)))
}
