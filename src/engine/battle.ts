import type { Element } from './types'
import { getStats } from './stats'
import { getTypeMultiplier } from './combat'

// ── Step-wise battle API ─────────────────────────────────────────────────────

export interface BattleState {
  playerPonies: BattlePony[]
  enemyPonies: BattlePony[]
  /** IDs of ponies yet to act in the current round, in Speed order. */
  turnQueue: string[]
}

export interface AttackEvent {
  attackerId: string
  targetId: string
  rawPower: number
  multiplier: 'super' | 'weak' | 'neutral'
  damage: number
  targetFainted: boolean
}

function buildQueue(players: BattlePony[], enemies: BattlePony[]): string[] {
  const all = [
    ...players.filter(p => p.currentHp > 0).map(p => ({ id: p.id, speed: p.speed, isPlayer: true })),
    ...enemies.filter(p => p.currentHp > 0).map(p => ({ id: p.id, speed: p.speed, isPlayer: false })),
  ]
  // Speed descending; player wins ties (§4)
  all.sort((a, b) => b.speed - a.speed || (a.isPlayer ? -1 : 1))
  return all.map(x => x.id)
}

export function createBattleState(
  playerPonies: BattlePony[],
  enemyPonies: BattlePony[],
): BattleState {
  return { playerPonies, enemyPonies, turnQueue: buildQueue(playerPonies, enemyPonies) }
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

/** Returns the next pony to act, skipping any that have fainted since the queue was built. */
export function nextActor(
  state: BattleState,
): { pony: BattlePony; isPlayer: boolean } | null {
  for (const id of state.turnQueue) {
    const found = findPony(state, id)
    if (found && found.pony.currentHp > 0) return found
  }
  return null
}

/** Pure: applies one attack, advances the queue, returns new state + event. */
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

  // Remove attacker; rebuild queue when no alive ponies remain in it
  let newQueue = state.turnQueue.filter(id => id !== attackerId)
  const aliveInQueue = newQueue.some(id => {
    const f = findPony({ playerPonies: newPlayers, enemyPonies: newEnemies, turnQueue: [] }, id)
    return f && f.pony.currentHp > 0
  })
  if (!aliveInQueue) newQueue = buildQueue(newPlayers, newEnemies)

  return {
    state: { playerPonies: newPlayers, enemyPonies: newEnemies, turnQueue: newQueue },
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
): BattlePony {
  const stats = getStats(tier, level)
  return { id, name, element, maxHp: stats.heart, currentHp: stats.heart, power: stats.power, speed: stats.speed }
}

/** Damage formula from §4: round(Power × multiplier), minimum 1. */
export function calcDamage(power: number, attackerEl: Element, defenderEl: Element): number {
  return Math.max(1, Math.round(power * getTypeMultiplier(attackerEl, defenderEl)))
}

export interface RoundResult {
  playerPonies: BattlePony[]
  oppPonies: BattlePony[]
  log: string[]
}

/**
 * Resolves one full round of combat.
 * All alive ponies act in Speed order (desc); player wins ties.
 * Player ponies all target playerTargetIdx (falls back to first alive opponent if fainted).
 * Opponent ponies always target the first alive player pony.
 */
export function resolveRound(
  playerPonies: BattlePony[],
  oppPonies: BattlePony[],
  playerTargetIdx: number,
): RoundResult {
  const players = playerPonies.map((p) => ({ ...p }))
  const opps = oppPonies.map((p) => ({ ...p }))
  const log: string[] = []

  type Turn = { isPlayer: boolean; idx: number; speed: number }
  const turns: Turn[] = [
    ...players.map((p, i): Turn => ({ isPlayer: true, idx: i, speed: p.speed })),
    ...opps.map((p, i): Turn => ({ isPlayer: false, idx: i, speed: p.speed })),
  ]
  // Sort by speed desc; player wins ties (home advantage)
  turns.sort((a, b) => b.speed - a.speed || (a.isPlayer ? -1 : 1))

  for (const turn of turns) {
    if (turn.isPlayer) {
      const attacker = players[turn.idx]
      if (attacker.currentHp <= 0) continue
      let tIdx = playerTargetIdx
      if (tIdx >= opps.length || opps[tIdx].currentHp <= 0)
        tIdx = opps.findIndex((o) => o.currentHp > 0)
      if (tIdx < 0) break
      const target = opps[tIdx]
      const dmg = calcDamage(attacker.power, attacker.element, target.element)
      const mult = getTypeMultiplier(attacker.element, target.element)
      target.currentHp = Math.max(0, target.currentHp - dmg)
      const tag = mult === 2 ? ' ✨ Super effective!' : mult === 0.5 ? ' (not very effective)' : ''
      log.push(`${attacker.name} → ${target.name}: ${dmg}${tag}${target.currentHp <= 0 ? ' 💫 Fainted!' : ''}`)
    } else {
      const attacker = opps[turn.idx]
      if (attacker.currentHp <= 0) continue
      const tIdx = players.findIndex((p) => p.currentHp > 0)
      if (tIdx < 0) break
      const target = players[tIdx]
      const dmg = calcDamage(attacker.power, attacker.element, target.element)
      const mult = getTypeMultiplier(attacker.element, target.element)
      target.currentHp = Math.max(0, target.currentHp - dmg)
      const tag = mult === 2 ? ' ✨ Super effective!' : mult === 0.5 ? ' (not very effective)' : ''
      log.push(`${attacker.name} → ${target.name}: ${dmg}${tag}${target.currentHp <= 0 ? ' 💫 Fainted!' : ''}`)
    }
  }

  return { playerPonies: players, oppPonies: opps, log }
}
