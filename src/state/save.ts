import type { Creature } from '../engine/types'
import { rollIvs } from '../engine/ivs'
import { newCreatureId } from '../engine/creature'
import type { PuzzleAttempt, PuzzleCategory } from '../engine/puzzleSelector'
import { ALL_CATEGORIES } from '../engine/puzzleSelector'
import type { LifetimeStats } from '../engine/achievements'
import { sanitizeLifetime, applySpeciesSeen, TROPHY_SPECIES } from '../engine/achievements'
import { VARIANT_BY_ID } from '../engine/hatching'
import type { PuzzleFocus } from '../engine/puzzleFocus'
import { isPuzzleFocus } from '../engine/puzzleFocus'
import { resolveBattleTeam } from '../engine/team'
import { badgeCount } from '../engine/progression'
import { TOUR_IDS, isTourId } from '../onboarding/tours'
import type { TourId } from '../onboarding/tours'

export interface SaveData {
  version: 11
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
  /** Stardust balance (§19) — earned by learning, spent on hatching. Survives prestige. */
  stardust: number
  /** Lifetime counters the achievements read (§19). Survives prestige. */
  lifetime: LifetimeStats
  /** Unlocked achievement id → ISO date earned (§19). Survives prestige. */
  achievements: Record<string, string>
  /** What she chose to practice in Explore (§9). Absent → 'mix'. No version bump: optional, defaulted. */
  practiceFocus?: PuzzleFocus
  /** Last zone she was viewing (restored on load for convenience). */
  lastZoneId?: string
  /** Onboarding tours she has finished or skipped (§22). Survives prestige. */
  toursDone: TourId[]
}

const SAVE_KEY = 'evelyn_unicorn_adventure'
const VERSION = 11 as const

/** Save schema versions this build can read (current + migratable predecessors). */
const READABLE_VERSIONS = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

export type PersistedState = Omit<SaveData, 'version'>
// What the per-version migrations build; migrateSave adds the rest.
type Migrated = Omit<PersistedState, 'toursDone'>

const M2E_DEFAULTS = { activeTeam: [] as string[], trialLossStreaks: {} as Record<string, number> }
const PUZZLE_DEFAULTS = { recentPuzzleAttempts: [] as PuzzleAttempt[] }
const PRESTIGE_DEFAULTS = { prestigeCount: 0, awaitingStarter: false }

function sanitizeAchievements(raw: unknown): Record<string, string> {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return {}
  return Object.fromEntries(
    Object.entries(raw as Record<string, unknown>).filter(([, v]) => typeof v === 'string'),
  ) as Record<string, string>
}

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

/**
 * v10 (§20): keep only well-formed hatching fields, and flag trophies. Before
 * hatching existed, a Guardian-signature or Aurelune pony could only have joined
 * as a trophy, so a pre-v10 save flags them by species. A v10+ save already
 * carries the flag — and a hatched foal of those species must NOT gain it.
 */
function withHatchingFields(c: Creature, preV10: boolean): Creature {
  const out: Creature = { ...c }
  delete out.trophy
  delete out.variant
  delete out.restUntil
  delete out.parents
  if (c.trophy === true || (preV10 && TROPHY_SPECIES.has(c.speciesId))) out.trophy = true
  if (typeof c.variant === 'string' && c.variant in VARIANT_BY_ID) out.variant = c.variant
  if (Number.isFinite(c.restUntil) && (c.restUntil as number) > 0) out.restUntil = Math.floor(c.restUntil as number)
  if (Array.isArray(c.parents) && c.parents.length === 2 && c.parents.every((x) => typeof x === 'string')) {
    out.parents = [c.parents[0], c.parents[1]]
  }
  return out
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
  /** Present from v9 onward. */
  stardust?: number
  lifetime?: unknown
  achievements?: unknown
  practiceFocus?: unknown
  lastZoneId?: string
  /** Present from v11 onward. */
  toursDone?: unknown
}

function migrateV5(d: SaveDataV5): Migrated {
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
    // v9 (§19 achievements). Absent before v9 → zero balance, empty stats.
    stardust:             Math.max(0, Math.floor(Number(d.stardust) || 0)),
    lifetime:             sanitizeLifetime(d.lifetime),
    achievements:         sanitizeAchievements(d.achievements),
    practiceFocus:        isPuzzleFocus(d.practiceFocus) ? d.practiceFocus : 'mix',
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

function migrateV4(d: SaveDataV4): Migrated {
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
    ...achievementDefaults(),
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

function migrateV3(d: SaveDataV3): Migrated {
  return {
    playerName:       d.playerName ?? '',
    party:            d.party ?? [],
    areasDone:        d.areasDone ?? [],
    championDefeated: d.championDefeated ?? false,
    lastZoneId:       d.lastZoneId,
    ...M2E_DEFAULTS,
    ...PUZZLE_DEFAULTS,
    ...PRESTIGE_DEFAULTS,
    ...achievementDefaults(),
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

function migrateV2(d: SaveDataV2): Migrated {
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
    ...achievementDefaults(),
  }
}

function achievementDefaults() {
  return { stardust: 0, lifetime: sanitizeLifetime(undefined), achievements: {} as Record<string, string> }
}

/**
 * Seed the lifetime stats that can be recovered from the save itself (idempotent),
 * so a pre-v9 player isn't told she has met zero ponies or never won: the Pony
 * Book gets every pony she owns, and a finished game counts as Champion wins.
 * Counters with no history (puzzles solved, battles won) start at 0.
 */
function backfillLifetime(state: Migrated, party: Creature[]): LifetimeStats {
  const seen = applySpeciesSeen(state.lifetime, party.map((c) => c.speciesId))
  const knownWins = state.prestigeCount + (state.championDefeated ? 1 : 0)
  return { ...seen, championWins: Math.max(seen.championWins, knownWins) }
}


/**
 * Pure migration: turn a parsed save object of any readable version into the
 * current PersistedState, or null if unreadable.
 */
export function migrateSave(parsed: unknown): PersistedState | null {
  if (typeof parsed !== 'object' || parsed === null) return null
  const version = (parsed as { version?: number }).version

  let state: Migrated | null = null
  // v8/v7/v6/v5 share the same superset shape (v7 adds Creature.id + id-based
  // activeTeam, both handled by the universal backfill below; v8 adds the
  // prestige fields, defaulted in migrateV5).
  if (version === 11 || version === 10 || version === 9 || version === 8 || version === 7 || version === 6 || version === 5) state = migrateV5(parsed as SaveDataV5)
  else if (version === 4)   state = migrateV4(parsed as SaveDataV4)
  else if (version === 3)   state = migrateV3(parsed as SaveDataV3)
  else if (version === 2)   state = migrateV2(parsed as SaveDataV2)
  if (!state) return null

  // Universal backfill (runs for every readable version, idempotent): give each
  // creature an IV set and an instance id, then remap the active team to ids.
  const preV10 = typeof version === 'number' && version < 10
  const party = state.party.map(withIvs).map(withId).map((c) => withHatchingFields(c, preV10))
  return {
    ...state,
    party,
    activeTeam: remapActiveTeam(party, state.activeTeam),
    lifetime: backfillLifetime(state, party),
    // v11 (§22). Every older save belongs to someone already playing, so they
    // skip the tours; Replay Tours on the Party screen brings them back.
    toursDone: version === 11 ? sanitizeTours((parsed as { toursDone?: unknown }).toursDone) : [...TOUR_IDS],
  }
}

function sanitizeTours(raw: unknown): TourId[] {
  if (!Array.isArray(raw)) return []
  return [...new Set(raw.filter(isTourId))]
}

// ── Save slots ──────────────────────────────────────────────────────────────
// Three independent adventures per device, one localStorage key each. The game
// data inside a slot is the same SaveData as before, plus a `savedAt` stamp that
// cloud sync will compare. The pre-slot save under SAVE_KEY is copied into slot 1
// once (migrateLegacySave) and then left alone as a fallback copy.

export type SlotNumber = 1 | 2 | 3
export const SLOTS: readonly SlotNumber[] = [1, 2, 3]

const ACTIVE_KEY   = `${SAVE_KEY}:active`
const MIGRATED_KEY = `${SAVE_KEY}:migrated`

export function slotKey(slot: SlotNumber): string {
  return `${SAVE_KEY}:slot${slot}`
}

function isSlotNumber(n: unknown): n is SlotNumber {
  return n === 1 || n === 2 || n === 3
}

/** What the slot picker shows on a card, read without opening the adventure. */
export interface SlotSummary {
  slot: SlotNumber
  playerName: string
  /** The pony leading her battle team, for the card's art. */
  leadSpeciesId: string | undefined
  leadVariant: Creature['variant']
  badges: number
  ponies: number
  stardust: number
  prestigeCount: number
  /** ISO time of the last save; null for saves written before slots existed. */
  savedAt: string | null
}

function readSlot(slot: SlotNumber): { state: PersistedState; savedAt: string | null } | null {
  const raw = localStorage.getItem(slotKey(slot))
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    const state = migrateSave(parsed)
    if (!state) return null
    const savedAt = (parsed as { savedAt?: unknown }).savedAt
    return { state, savedAt: typeof savedAt === 'string' ? savedAt : null }
  } catch {
    return null
  }
}

export function saveSlot(slot: SlotNumber, data: PersistedState, savedAt = new Date().toISOString()): void {
  localStorage.setItem(slotKey(slot), JSON.stringify({ version: VERSION, savedAt, ...data }))
}

export function loadSlot(slot: SlotNumber): PersistedState | null {
  return readSlot(slot)?.state ?? null
}

export function deleteSlot(slot: SlotNumber): void {
  localStorage.removeItem(slotKey(slot))
}

/** One entry per slot, in order; null where the slot is empty or unreadable. */
export function listSlots(): (SlotSummary | null)[] {
  return SLOTS.map((slot) => {
    const read = readSlot(slot)
    if (!read) return null
    const { state, savedAt } = read
    const lead = resolveBattleTeam(state.party, state.activeTeam)[0]
    return {
      slot,
      playerName:    state.playerName,
      leadSpeciesId: lead?.speciesId,
      leadVariant:   lead?.variant,
      badges:        badgeCount(state.areasDone),
      ponies:        state.party.length,
      stardust:      state.stardust,
      prestigeCount: state.prestigeCount,
      savedAt,
    }
  })
}

/** The slot played last on this device, or null if none yet. */
export function getActiveSlot(): SlotNumber | null {
  const n = Number(localStorage.getItem(ACTIVE_KEY))
  return isSlotNumber(n) ? n : null
}

export function setActiveSlot(slot: SlotNumber): void {
  localStorage.setItem(ACTIVE_KEY, String(slot))
}

/**
 * One-time move of the pre-slot save into slot 1. Idempotent: a marker key
 * stops it re-copying after slot 1 is later deleted, and it never overwrites a
 * slot 1 that already holds a game. The legacy key is kept, never read again.
 */
export function migrateLegacySave(): void {
  if (localStorage.getItem(MIGRATED_KEY)) return
  const raw = localStorage.getItem(SAVE_KEY)
  if (raw && !localStorage.getItem(slotKey(1))) {
    try {
      const state = migrateSave(JSON.parse(raw))
      if (state) {
        saveSlot(1, state)
        setActiveSlot(1)
      }
    } catch {
      // Unreadable legacy save: leave it where it is.
    }
  }
  localStorage.setItem(MIGRATED_KEY, '1')
}

export function exportSave(slot: SlotNumber): void {
  const raw = localStorage.getItem(slotKey(slot))
  if (!raw) return
  const blob = new Blob([raw], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `unicorn-adventure-slot${slot}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Replace a slot with an exported save file. The import counts as the newest copy. */
export function importSave(file: File, slot: SlotNumber): Promise<boolean> {
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
        const state = migrateSave(parsed)
        if (!state) {
          resolve(false)
          return
        }
        saveSlot(slot, state)
        resolve(true)
      } catch {
        resolve(false)
      }
    }
    reader.readAsText(file)
  })
}
