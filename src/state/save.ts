import type { Creature } from '../engine/types'
import { rollIvs } from '../engine/ivs'

export interface SaveData {
  version: 5
  playerName: string
  party: Creature[]
  /** Completed area ids — the single source of truth for progression. */
  areasDone: string[]
  championDefeated: boolean
  /** Active team (M2e): speciesIds of the ≤3 ponies that fight. Empty = default top-3. */
  activeTeam: string[]
  /** Per-Guardian loss streaks (M2e): guardianId → consecutive losses, reset on a win. */
  trialLossStreaks: Record<string, number>
  /** Last zone she was viewing (restored on load for convenience). */
  lastZoneId?: string
}

const SAVE_KEY = 'evelyn_unicorn_adventure'
const VERSION = 5 as const

/** Save schema versions this build can read (current + migratable predecessors). */
const READABLE_VERSIONS = [5, 4, 3, 2]

export type PersistedState = Omit<SaveData, 'version'>

// M2e fields default to "unset" so older saves resolve to the default top-3 team
// and a clean loss-streak slate.
const M2E_DEFAULTS = { activeTeam: [] as string[], trialLossStreaks: {} as Record<string, number> }

// IV backfill (§5, save v5): any pony lacking IVs — from a pre-IV save — gets a
// random 0–3 roll per stat (NOT defaulted to 0 or 3) so existing saves get
// variety, matching how a freshly-acquired pony would have rolled.
function withIvs(c: Creature): Creature {
  return c.ivs ? c : { ...c, ivs: rollIvs() }
}

// ── v4 shape (pre-IV) — same fields as v5 but party ponies may lack `ivs` ─────
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
  }
}

// ── v3 shape (pre-M2e) — kept for one-way migration ──────────────────────────
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
  }
}

// ── v2 shape (Zone-1-only flags) — kept for one-way migration ────────────────
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
  if (d.zone1Complete)   areasDone.push('proving') // clearing Proving Glade unlocks Zone 2
  return {
    playerName:       d.playerName ?? '',
    party:            d.party ?? [],
    areasDone,
    championDefeated: false,
    ...M2E_DEFAULTS,
  }
}

export function saveGame(data: PersistedState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ version: VERSION, ...data }))
}

/**
 * Pure migration: turn a parsed save object of any readable version into the
 * current PersistedState, or null if unreadable. Always guarantees every pony
 * has IVs (backfilled with a random 0–3 roll for pre-v5 saves). Kept pure (no
 * localStorage) so it's directly testable.
 */
export function migrateSave(parsed: unknown): PersistedState | null {
  if (typeof parsed !== 'object' || parsed === null) return null
  const version = (parsed as { version?: number }).version

  let state: PersistedState | null = null
  if (version === VERSION || version === 4) state = migrateV4(parsed as SaveDataV4)
  else if (version === 3) state = migrateV3(parsed as SaveDataV3)
  else if (version === 2) state = migrateV2(parsed as SaveDataV2)
  if (!state) return null

  return { ...state, party: state.party.map(withIvs) }
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
