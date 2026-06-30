import type { Creature } from '../engine/types'

export interface SaveData {
  version: 4
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
const VERSION = 4 as const

export type PersistedState = Omit<SaveData, 'version'>

// M2e fields default to "unset" so older saves resolve to the default top-3 team
// and a clean loss-streak slate.
const M2E_DEFAULTS = { activeTeam: [] as string[], trialLossStreaks: {} as Record<string, number> }

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

export function loadGame(): PersistedState | null {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    const version = (parsed as { version?: number }).version

    if (version === VERSION) {
      const d = parsed as SaveData
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
    if (version === 3) return migrateV3(parsed as SaveDataV3)
    if (version === 2) return migrateV2(parsed as SaveDataV2)
    return null
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
        if (version !== VERSION && version !== 3 && version !== 2) {
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
