// Puzzle focus (§9): what she's chosen to practice in Explore. "Mix it up" is
// the adaptive default (reinforcement-weighted, §9); any other focus serves
// only that kind of puzzle, in both Practice and the Hunt warm-up.

import type { Problem } from './problems'
import type { PuzzleAttempt } from './puzzleSelector'
import { selectProblemCategory, availableCategories } from './puzzleSelector'
import { generateComprehensionProblem } from './comprehensionGenerator'
import { generateSpellingProblem } from './spellingGenerator'
import { problemFor } from '../content/grades'
import type { Grade } from '../content/gradeTypes'

export type PuzzleFocus = 'mix' | 'math' | 'times' | 'spelling' | 'reading' | 'logic'

export interface FocusOption {
  id: PuzzleFocus
  label: string
  emoji: string
  /** Short line under the label on the big picker. */
  blurb: string
  /** Selected-state gradient (Tailwind classes), in the app's jewel tones. */
  selected: string
  /** Needs text-to-speech (hidden on devices without it). */
  needsSpeech?: boolean
}

export const FOCUS_OPTIONS: FocusOption[] = [
  { id: 'mix',      label: 'Mix it up',     emoji: '🎲', blurb: 'A bit of everything',
    selected: 'from-yellow-300 to-amber-400 text-purple-950 shadow-amber-400/40' },
  { id: 'math',     label: 'Math',          emoji: '🔢', blurb: '+ − and ×',
    selected: 'from-sky-400 to-blue-600 text-white shadow-sky-400/40' },
  { id: 'times',    label: 'Times Tables',  emoji: '✖️', blurb: '× and ÷',
    selected: 'from-fuchsia-400 to-purple-600 text-white shadow-fuchsia-400/40' },
  { id: 'spelling', label: 'Spelling',      emoji: '🔤', blurb: 'Hear it, spell it',
    selected: 'from-emerald-400 to-teal-600 text-white shadow-emerald-400/40', needsSpeech: true },
  { id: 'reading',  label: 'Reading',       emoji: '📖', blurb: 'Read and answer',
    selected: 'from-orange-300 to-rose-500 text-white shadow-orange-400/40' },
  { id: 'logic',    label: 'Story Puzzles', emoji: '🔍', blurb: 'Follow the clues',
    selected: 'from-indigo-400 to-violet-600 text-white shadow-indigo-400/40' },
]

export const FOCUS_BY_ID = Object.fromEntries(FOCUS_OPTIONS.map((f) => [f.id, f])) as Record<PuzzleFocus, FocusOption>

export function isPuzzleFocus(x: unknown): x is PuzzleFocus {
  return typeof x === 'string' && x in FOCUS_BY_ID
}

/** The options this device can serve — Spelling drops out without speech. */
export function focusOptions(speechAvailable: boolean): FocusOption[] {
  return FOCUS_OPTIONS.filter((f) => !f.needsSpeech || speechAvailable)
}

export interface ExplorePuzzleArgs {
  focus: PuzzleFocus
  /** §23 — math and logic come from this grade's content. */
  grade: Grade
  /** Hunt math comes from one zone lower (§9, §23); Practice uses the zone's own. */
  mode: 'practice' | 'hunt'
  zoneNumber: number
  /** Spelling and reading still read the §9 difficulty number. */
  difficulty: number
  recentAttempts: PuzzleAttempt[]
  speechAvailable: boolean
  rng?: () => number
}

/** One Explore puzzle for her chosen focus. */
export function makeExplorePuzzle(a: ExplorePuzzleArgs): Problem {
  const rng = a.rng ?? Math.random
  // Spelling on a device that can't speak would be unanswerable — fall back to the mix.
  const focus = a.focus === 'spelling' && !a.speechAvailable ? 'mix' : a.focus
  const category = focus === 'mix'
    ? selectProblemCategory(a.recentAttempts, rng, availableCategories(a.speechAvailable))
    : focus

  switch (category) {
    case 'math':
    case 'times':
    case 'logic':
      return problemFor(a.grade, a.zoneNumber, category, a.mode, rng)
    case 'spelling':
      return generateSpellingProblem(a.difficulty, rng)
    case 'reading':
    case 'comprehension':
      return generateComprehensionProblem(a.difficulty, rng)
  }
}
