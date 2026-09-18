import type { Creature } from '../engine/types'
import { rollIvs } from '../engine/ivs'
import { newCreatureId } from '../engine/creature'
import type { PuzzleAttempt, PuzzleCategory } from '../engine/puzzleSelector'
import { ALL_CATEGORIES } from '../engine/puzzleSelector'

export interface SaveData {
  version: 8
  playerName: string
  party: Creature[]
  /** Completed area ids — the single source of truth for progression. */
  areasDone: string[]
  championDefeated: boolean
  /** Active team (M2e): instance ids of the ≤3 ponies that fight. Empty = default top-3. */
  activeTeam: string[]
  /** Per-Guardian loss streaks (M2e): guardianId → consecutive losses, reset on a win. */
  trialLossStreaks: Record<string, number>
  /** Rolling 10-attempt history for reinforcement category weighting (M3a). */
  recentPuzzleAttempts: PuzzleAttempt[]
  /** How many times she has beaten the Champion and started over (§15). 0 = first journey. */
  prestigeCount: number
  /** True between starting a new journey and picking that run's starter pony. */
  awaitingStarter: boolean
  /** Last zone she was viewing (restored on load for convenience). */
  lastZoneId?: string
}

const SAVE_KEY = 'evelyn_unicorn_adventure'
const VERSION = 8 as const

/** Save schema versions this build can read (current + migratable predecessors). */
const READABLE_VERSIONS = [8, 7, 6, 5, 4, 3, 2]

export type PersistedState = Omit<SaveData, 'version'>

const M2E_DEFAULTS = { activeTeam: [] as string[], trialLossStreaks: {} as Record<string, number> }
const PUZZLE_DEFAULTS = { recentPuzzleAttempts: [] as PuzzleAttempt[] }
const PRESTIGE_DEFAULTS = { prestigeCount: 0, awaitingStarter: false }

/**
 * Keep only well-formed attempts, so a hand-edited or older save can't feed
 * garbage categories into the reinforcement weighting. Also caps at the last 10,
 * matching `updatePuzzleAttempts`.
 */
function sanitizeAttempts(raw: unknown): PuzzleAttempt[] {
  if (!Array.isArray(raw)) return []
  const known = new Set<string>(ALL_CATEGORIES)
  return raw
    .filter((a): a is PuzzleAttempt =>
      typeof a === 'object' && a !== null &&
      known.has((a as PuzzleAttempt).category) &&
      typeof (a as PuzzleAttempt).correct === 'boolean')
    .map(a => ({ category: a.category as PuzzleCategory, correct: a.correct }))
    .slice(-10)
}

function withIvs(c: Creature): Creature {
  return c.ivs ? c : { ...c, ivs: rollIvs() }
}

/** Backfill a stable instance id (§ instance IDs). Idempotent — keeps any existing id. */
function withId(c: Creature): Creature {
  return c.id ? c : { ...c, id: newCreatureId() }
}

/**
 * Remap the persisted active team to instance ids (§ instance IDs). Idempotent:
 *  - an entry already matching a creature's id is kept as-is (re-run safe);
 *  - a legacy speciesId entry is remapped to that species' creature id;
 *  - anything unresolvable is dropped (resolveBattleTeam falls back to top-3).
 * Assumes `party` has already been through withId (every creature has an id).
 */
function remapActiveTeam(party: Creature[], activeTeam: string[] | undefined): string[] {
  const ids = new Set(party.map((c) => c.id))
  return (activeTeam ?? [])
    .map((entry) => (ids.has(entry) ? entry : party.find((c) => c.speciesId === entry)?.id))
    .filter((id): id is string => id !== undefined)
}

// ── v5 shape (pre-puzzle-attempts) ───────────────────────────────────────────
interface SaveDataV5 {
  version: 5
  playerName: string
  party: Creature[]
  areasDone: string[]
  championDefeated: boolean
  activeTeam: string[]
  trialLossStreaks: Record<string, number>
  /** Present from v6 onward; absent on a true v5 save. */
  recentPuzzleAttempts?: PuzzleAttempt[]
  /** Present from v8 onward. */
  prestigeCount?: number
  awaitingStarter?: boolean
  lastZoneId?: string
}

function migrateV5(d: SaveDataV5): PersistedState {
  return {
    playerName:           d.playerName ?? '',
    party:                d.party ?? [],
    areasDone:            d.areasDone ?? [],
    championDefeated:     d.championDefeated ?? false,
    activeTeam:           d.activeTeam ?? [],
    trialLossStreaks:     d.trialLossStreaks ?? {},
    lastZoneId:           d.lastZoneId,
    // Carry the rolling puzzle history forward (v6/v7). A true v5 save has none,
    // and sanitizeAttempts turns that into []. Previously this spread
    // PUZZLE_DEFAULTS last, silently wiping the history on every load.
    recentPuzzleAttempts: sanitizeAttempts(d.recentPuzzleAttempts),
    // v8 (§15 prestige). A pre-v8 save is a first journey by definition.
    prestigeCount:        Math.max(0, Math.floor(Number(d.prestigeCount) || 0)),
    awaitingStarter:      d.awaitingStarter === true,
  }
}

// ── v4 shape (pre-IV) ─────────────────────────────────────────────────────────
interface SaveDataV4 {
  version: 4
  playerName: string
  party: Creature[]
  areasDone: string[]
  championDefeated: boolean
  activeTeam: string[]
  trialLossStreaks: Record<string, number>
  lastZoneId?: string
}

function migrateV4(d: SaveDataV4): PersistedState {
  return {
    playerName:       d.playerName ?? '',
    party:            d.party ?? [],
    areasDone:        d.areasDone ?? [],
    championDefeated: d.championDefeated ?? false,
    activeTeam:       d.activeTeam ?? [],
    trialLossStreaks: d.trialLossStreaks ?? {},
    lastZoneId:       d.lastZoneId,
    ...PUZZLE_DEFAULTS,
    ...PRESTIGE_DEFAULTS,
  }
}

// ── v3 shape (pre-M2e) ────────────────────────────────────────────────────────
interface SaveDataV3 {
  version: 3
  playerName: string
  party: Creature[]
  areasDone: string[]
  championDefeated: boolean
  lastZoneId?: string
}

function migrateV3(d: SaveDataV3): PersistedState {
  return {
    playerName:       d.playerName ?? '',
    party:            d.party ?? [],
    areasDone:        d.areasDone ?? [],
    championDefeated: d.championDefeated ?? false,
    lastZoneId:       d.lastZoneId,
    ...M2E_DEFAULTS,
    ...PUZZLE_DEFAULTS,
    ...PRESTIGE_DEFAULTS,
  }
}

// ── v2 shape (Zone-1-only flags) ─────────────────────────────────────────────
interface SaveDataV2 {
  version: 2
  playerName: string
  party: Creature[]
  badges: number
  brindlewoodDone: boolean
  sunflowerDone: boolean
  zone1Complete: boolean
  zone2Unlocked: boolean
}

function migrateV2(d: SaveDataV2): PersistedState {
  const areasDone: string[] = []
  if (d.brindlewoodDone) areasDone.push('brindlewood')
  if (d.sunflowerDone)   areasDone.push('sunflower')
  if (d.zone1Complete)   areasDone.push('proving')
  return {
    playerName:       d.playerName ?? '',
    party:            d.party ?? [],
    areasDone,
    championDefeated: false,
    ...M2E_DEFAULTS,
    ...PUZZLE_DEFAULTS,
    ...PRESTIGE_DEFAULTS,
  }
}

export function saveGame(data: PersistedState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ version: VERSION, ...data }))
}

/**
 * Pure migration: turn a parsed save object of any readable version into the
 * current PersistedState, or null if unreadable.
 */
export function migrateSave(parsed: unknown): PersistedState | null {
  if (typeof parsed !== 'object' || parsed === null) return null
  const version = (parsed as { version?: number }).version

  let state: PersistedState | null = null
  // v8/v7/v6/v5 share the same superset shape (v7 adds Creature.id + id-based
  // activeTeam, both handled by the universal backfill below; v8 adds the
  // prestige fields, defaulted in migrateV5).
  if (version === 8 || version === 7 || version === 6 || version === 5) state = migrateV5(parsed as SaveDataV5)
  else if (version === 4)   state = migrateV4(parsed as SaveDataV4)
  else if (version === 3)   state = migrateV3(parsed as SaveDataV3)
  else if (version === 2)   state = migrateV2(parsed as SaveDataV2)
  if (!state) return null

  // Universal backfill (runs for every readable version, idempotent): give each
  // creature an IV set and an instance id, then remap the active team to ids.
  const party = state.party.map(withIvs).map(withId)
  return { ...state, party, activeTeam: remapActiveTeam(party, state.activeTeam) }
}

export function loadGame(): PersistedState | null {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    return migrateSave(JSON.parse(raw))
  } catch {
    return null
  }
}

export function exportSave(): void {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return
  const blob = new Blob([raw], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'evelyn-adventure-save.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function importSave(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed: unknown = JSON.parse(e.target?.result as string)
        const version = (parsed as { version?: number })?.version
        if (typeof version !== 'number' || !READABLE_VERSIONS.includes(version)) {
          resolve(false)
          return
        }
        localStorage.setItem(SAVE_KEY, JSON.stringify(parsed))
        resolve(true)
      } catch {
        resolve(false)
      }
    }
    reader.readAsText(file)
  })
}
