// Achievements + Stardust (§19). Pure: every trophy is a predicate over a
// snapshot of lifetime stats and current progress, so unlocking is just "which
// predicates are newly true" — no event bus, and trivially testable.
//
// Lifetime stats, unlocked trophies and Stardust all SURVIVE a new journey
// (§15 prestige): they describe how she learns, not how far this run has got.

import type { Creature, Element } from './types'
import type { PuzzleCategory } from './puzzleSelector'
import { ALL_SPECIES, CHAMPION_SPECIES } from '../content/creatures'
import { ZONES } from '../content/zones'

// ── Stardust economy (tunable) ───────────────────────────────────────────────

/** Every correct puzzle, in any mode. */
export const STARDUST_PER_SOLVE = 1
/** Extra for getting it right with no wrong tries first. */
export const STARDUST_FIRST_TRY_BONUS = 1
/** Every battle won (hunt, trial, glade, champion). */
export const STARDUST_PER_BATTLE_WIN = 2

// ── Lifetime stats ───────────────────────────────────────────────────────────

export interface LifetimeStats {
  /** Correct solves per category. */
  solved: Record<PuzzleCategory, number>
  /** Solves with no wrong tries first. */
  firstTry: number
  /** Multiplication facts solved (a subset of solved.math). */
  multSolved: number
  /** Current run of multiplication facts solved first try; a miss resets it. */
  multStreak: number
  bestMultStreak: number
  /** Wild ponies tamed in Hunts. */
  tamed: number
  battlesWon: number
  /** Battles won where she landed at least one ×2 hit. */
  superWins: number
  /** Battles won with three different elements on her team. */
  rainbowWins: number
  /** Battles won with only one of her ponies still standing. */
  comebackWins: number
  /** Guardian Trials won with no loss against that Guardian since the last win. */
  perfectTrials: number
  /** Times she has beaten the Champion (championDefeated resets each journey). */
  championWins: number
  /** Every species she has ever owned — the Pony Book. */
  speciesSeen: string[]
  /** Distinct days she has played. */
  daysPlayed: number
  /** Local YYYY-MM-DD of the last counted day. */
  lastDay: string
}

export function emptyLifetime(): LifetimeStats {
  return {
    solved: { math: 0, logic: 0, comprehension: 0, spelling: 0 },
    firstTry: 0,
    multSolved: 0,
    multStreak: 0,
    bestMultStreak: 0,
    tamed: 0,
    battlesWon: 0,
    superWins: 0,
    rainbowWins: 0,
    comebackWins: 0,
    perfectTrials: 0,
    championWins: 0,
    speciesSeen: [],
    daysPlayed: 0,
    lastDay: '',
  }
}

/** Coerce anything (old save, hand-edited file) into well-formed lifetime stats. */
export function sanitizeLifetime(raw: unknown): LifetimeStats {
  const base = emptyLifetime()
  if (typeof raw !== 'object' || raw === null) return base
  const r = raw as Record<string, unknown>
  const n = (v: unknown) => Math.max(0, Math.floor(Number(v) || 0))
  const solvedRaw = (typeof r.solved === 'object' && r.solved !== null ? r.solved : {}) as Record<string, unknown>
  return {
    solved: {
      math:          n(solvedRaw.math),
      logic:         n(solvedRaw.logic),
      comprehension: n(solvedRaw.comprehension),
      spelling:      n(solvedRaw.spelling),
    },
    firstTry:       n(r.firstTry),
    multSolved:     n(r.multSolved),
    multStreak:     n(r.multStreak),
    bestMultStreak: n(r.bestMultStreak),
    tamed:          n(r.tamed),
    battlesWon:     n(r.battlesWon),
    superWins:      n(r.superWins),
    rainbowWins:    n(r.rainbowWins),
    comebackWins:   n(r.comebackWins),
    perfectTrials:  n(r.perfectTrials),
    championWins:   n(r.championWins),
    speciesSeen:    Array.isArray(r.speciesSeen)
      ? [...new Set(r.speciesSeen.filter((s): s is string => typeof s === 'string'))]
      : [],
    daysPlayed:     n(r.daysPlayed),
    lastDay:        typeof r.lastDay === 'string' ? r.lastDay : '',
  }
}

// ── Pure stat updates ────────────────────────────────────────────────────────

export interface SolveInfo {
  category: PuzzleCategory
  /** Wrong tries before the correct answer. */
  misses: number
  isMultiplication: boolean
}

export function applySolve(l: LifetimeStats, s: SolveInfo): LifetimeStats {
  const firstTry = s.misses === 0
  const multStreak = s.isMultiplication ? (firstTry ? l.multStreak + 1 : 0) : l.multStreak
  return {
    ...l,
    solved: { ...l.solved, [s.category]: l.solved[s.category] + 1 },
    firstTry: l.firstTry + (firstTry ? 1 : 0),
    multSolved: l.multSolved + (s.isMultiplication ? 1 : 0),
    multStreak,
    bestMultStreak: Math.max(l.bestMultStreak, multStreak),
  }
}

export function stardustForSolve(misses: number): number {
  return STARDUST_PER_SOLVE + (misses === 0 ? STARDUST_FIRST_TRY_BONUS : 0)
}

export interface BattleSummary {
  /** ×2 hits her ponies landed. */
  superHits: number
  /** Her ponies still standing at the end. */
  survivors: number
  /** Elements on her team. */
  elements: Element[]
}

export function applyBattleWin(l: LifetimeStats, b: BattleSummary): LifetimeStats {
  return {
    ...l,
    battlesWon:   l.battlesWon + 1,
    superWins:    l.superWins + (b.superHits > 0 ? 1 : 0),
    rainbowWins:  l.rainbowWins + (new Set(b.elements).size >= 3 ? 1 : 0),
    comebackWins: l.comebackWins + (b.elements.length > 1 && b.survivors === 1 ? 1 : 0),
  }
}

export function applySpeciesSeen(l: LifetimeStats, speciesIds: string[]): LifetimeStats {
  const fresh = speciesIds.filter((id) => !l.speciesSeen.includes(id))
  return fresh.length === 0 ? l : { ...l, speciesSeen: [...l.speciesSeen, ...new Set(fresh)] }
}

/** Local calendar day, so "a day" matches her day, not UTC's. */
export function localDay(d: Date = new Date()): string {
  const pad = (x: number) => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function applyDayPlayed(l: LifetimeStats, day: string): LifetimeStats {
  return l.lastDay === day ? l : { ...l, daysPlayed: l.daysPlayed + 1, lastDay: day }
}

// ── The trophies ─────────────────────────────────────────────────────────────

export type Tier = 'bronze' | 'silver' | 'gold' | 'special'
export type Family = 'learning' | 'collecting' | 'battle' | 'journey'

export interface Snapshot {
  lifetime: LifetimeStats
  party: Creature[]
  badges: number
  prestigeCount: number
  elementOf: (speciesId: string) => Element | undefined
}

export interface Achievement {
  id: string
  family: Family
  tier: Tier
  name: string
  description: string
  icon: string
  /** Stardust paid out on unlock. */
  reward: number
  /** Hidden (shown as "???") until earned. */
  secret?: boolean
  /** Shared by the bronze/silver/gold steps of one ladder, so the shelf can show them as one card. */
  ladder?: string
  /** Current value toward `target`, for the progress bar. */
  progress: (s: Snapshot) => number
  target: number
}

const REWARD: Record<Tier, number> = { bronze: 10, silver: 25, gold: 60, special: 20 }

/** Builds a bronze/silver/gold ladder over one counter. */
function ladder(
  base: { id: string; family: Family; name: string; icon: string },
  progress: (s: Snapshot) => number,
  steps: [number, number, number],
  describe: (n: number) => string,
): Achievement[] {
  const tiers: Tier[] = ['bronze', 'silver', 'gold']
  return steps.map((target, i) => ({
    id: `${base.id}-${tiers[i]}`,
    family: base.family,
    tier: tiers[i],
    name: base.name,
    description: describe(target),
    icon: base.icon,
    ladder: base.id,
    reward: REWARD[tiers[i]],
    progress,
    target,
  }))
}

function one(
  a: Omit<Achievement, 'reward' | 'target'> & { reward?: number; target?: number },
): Achievement {
  return { reward: REWARD[a.tier], target: 1, ...a }
}

const ELEMENTS: Element[] = ['water', 'fire', 'air', 'spirit', 'earth']

function elementsOwned(s: Snapshot): number {
  const owned = new Set(s.party.map((c) => s.elementOf(c.speciesId)).filter(Boolean))
  return ELEMENTS.filter((e) => owned.has(e)).length
}

/** Guardian signatures + the Champion's Aurelune always join with max IVs (§5). */
const TROPHY_SPECIES = new Set<string>([
  CHAMPION_SPECIES.id,
  ...ZONES.flatMap((z) => (z.signatureSpeciesId ? [z.signatureSpeciesId] : [])),
])

/** A 3/3/3 pony she got by luck (or, later, by hatching) — not a guaranteed-max trophy. */
function hasPerfectPony(s: Snapshot): boolean {
  return s.party.some((c) => !TROPHY_SPECIES.has(c.speciesId)
    && c.ivs?.heart === 3 && c.ivs.power === 3 && c.ivs.speed === 3)
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── Learning ──
  ...ladder({ id: 'numbers', family: 'learning', name: 'Number Ninja', icon: '🔢' },
    (s) => s.lifetime.solved.math, [10, 50, 200], (n) => `Solve ${n} number problems`),
  ...ladder({ id: 'times', family: 'learning', name: 'Times Table Tamer', icon: '✖️' },
    (s) => s.lifetime.bestMultStreak, [5, 10, 20],
    (n) => `Get ${n} times-table facts right in a row, first try`),
  ...ladder({ id: 'words', family: 'learning', name: 'Word Wizard', icon: '🔤' },
    (s) => s.lifetime.solved.spelling, [10, 50, 150], (n) => `Spell ${n} words`),
  ...ladder({ id: 'reading', family: 'learning', name: 'Bookworm', icon: '📖' },
    (s) => s.lifetime.solved.comprehension, [10, 50, 150], (n) => `Answer ${n} reading questions`),
  ...ladder({ id: 'clues', family: 'learning', name: 'Clue Detective', icon: '🔍' },
    (s) => s.lifetime.solved.logic, [10, 50, 150], (n) => `Crack ${n} story puzzles`),
  ...ladder({ id: 'sharp', family: 'learning', name: 'Sharp Mind', icon: '🎯' },
    (s) => s.lifetime.firstTry, [20, 100, 300], (n) => `Solve ${n} puzzles on the first try`),
  ...ladder({ id: 'days', family: 'learning', name: 'Adventurer', icon: '📅' },
    (s) => s.lifetime.daysPlayed, [3, 10, 30], (n) => `Play on ${n} different days`),

  // ── Collecting ──
  ...ladder({ id: 'tamer', family: 'collecting', name: 'Pony Whisperer', icon: '🦄' },
    (s) => s.lifetime.tamed, [1, 10, 25], (n) => n === 1 ? 'Tame a wild pony' : `Tame ${n} wild ponies`),
  ...ladder({ id: 'book', family: 'collecting', name: 'Pony Book', icon: '📘' },
    (s) => s.lifetime.speciesSeen.length, [10, 20, ALL_SPECIES.length],
    (n) => n === ALL_SPECIES.length ? 'Meet every kind of pony' : `Meet ${n} kinds of pony`),
  one({ id: 'rainbow-friends', family: 'collecting', tier: 'special', name: 'Rainbow Friends', icon: '🌈',
    description: 'Have a pony of all five elements at once',
    progress: elementsOwned, target: 5 }),
  one({ id: 'perfect-pony', family: 'collecting', tier: 'special', name: 'Perfect Pony', icon: '💎',
    description: 'Own a pony with perfect 3 / 3 / 3 stars (trophies don’t count)',
    progress: (s) => (hasPerfectPony(s) ? 1 : 0), secret: true, reward: 40 }),

  // ── Battle ──
  ...ladder({ id: 'brave', family: 'battle', name: 'Brave Heart', icon: '⚔️' },
    (s) => s.lifetime.battlesWon, [5, 25, 100], (n) => `Win ${n} battles`),
  one({ id: 'super-effective', family: 'battle', tier: 'special', name: 'Super Effective!', icon: '✨',
    description: 'Win a battle with a ×2 type hit',
    progress: (s) => s.lifetime.superWins }),
  one({ id: 'type-master', family: 'battle', tier: 'gold', name: 'Type Master', icon: '🧭',
    description: 'Win 20 battles with a ×2 type hit',
    progress: (s) => s.lifetime.superWins, target: 20 }),
  one({ id: 'rainbow-team', family: 'battle', tier: 'special', name: 'Rainbow Team', icon: '🎨',
    description: 'Win with three different elements on your team',
    progress: (s) => s.lifetime.rainbowWins }),
  one({ id: 'never-give-up', family: 'battle', tier: 'special', name: 'Never Give Up', icon: '💪',
    description: 'Win a battle with only one pony left standing',
    progress: (s) => s.lifetime.comebackWins }),
  one({ id: 'flawless', family: 'battle', tier: 'special', name: 'Flawless Trial', icon: '🛡️',
    description: 'Beat a Guardian on your first try',
    progress: (s) => s.lifetime.perfectTrials }),

  // ── Journey ──
  one({ id: 'badge-1', family: 'journey', tier: 'bronze', name: 'First Badge', icon: '🏅',
    description: 'Earn your first badge', progress: (s) => s.badges }),
  one({ id: 'badge-3', family: 'journey', tier: 'silver', name: 'Halfway Hero', icon: '🏅',
    description: 'Hold three badges', progress: (s) => s.badges, target: 3 }),
  one({ id: 'badge-5', family: 'journey', tier: 'gold', name: 'Badge Master', icon: '🏅',
    description: 'Hold all five badges', progress: (s) => s.badges, target: 5 }),
  one({ id: 'champion', family: 'journey', tier: 'gold', name: 'Champion!', icon: '👑',
    description: 'Beat Grand Champion Vesper', progress: (s) => s.lifetime.championWins }),
  one({ id: 'journey-2', family: 'journey', tier: 'special', name: 'A New Journey', icon: '🗺️',
    description: 'Start a second journey', progress: (s) => s.prestigeCount, secret: true }),
  one({ id: 'journey-3', family: 'journey', tier: 'gold', name: 'Legend', icon: '🌟',
    description: 'Start a third journey', progress: (s) => s.prestigeCount, target: 2, secret: true }),
]

export const ACHIEVEMENT_BY_ID: Record<string, Achievement> =
  Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))

export function isEarned(a: Achievement, s: Snapshot): boolean {
  return a.progress(s) >= a.target
}

/** Trophies whose condition is now met but that aren't unlocked yet, in list order. */
export function newlyEarned(s: Snapshot, unlocked: Record<string, string>): Achievement[] {
  return ACHIEVEMENTS.filter((a) => !(a.id in unlocked) && isEarned(a, s))
}
