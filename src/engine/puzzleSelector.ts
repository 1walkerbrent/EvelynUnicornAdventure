export type PuzzleCategory = 'math' | 'logic' | 'comprehension' | 'spelling'

export interface PuzzleAttempt {
  category: PuzzleCategory
  correct: boolean
}

export const ALL_CATEGORIES = ['math', 'logic', 'comprehension', 'spelling'] as const

/**
 * Which categories this device can actually serve. Spelling is audio-first — the
 * word is only ever heard, never shown — so a device with no speech synthesis
 * drops it from the rotation instead of serving an unanswerable puzzle.
 */
export function availableCategories(speechAvailable: boolean): PuzzleCategory[] {
  return ALL_CATEGORIES.filter(c => c !== 'spelling' || speechAvailable)
}

function categoryAccuracy(attempts: PuzzleAttempt[], cat: PuzzleCategory): number | null {
  const catAttempts = attempts.filter(a => a.category === cat)
  if (catAttempts.length < 3) return null
  return catAttempts.filter(a => a.correct).length / catAttempts.length
}

function categoryWeight(attempts: PuzzleAttempt[], cat: PuzzleCategory): number {
  const acc = categoryAccuracy(attempts, cat)
  if (acc === null) return 1   // fewer than 3 attempts — neutral
  return acc < 0.6 ? 2 : 1    // struggling (< 60% correct) → doubled weight
}

/**
 * Picks a puzzle category using reinforcement weighting.
 * Any category with accuracy < 60% over its last attempts gets weight 2 (doubled);
 * categories with fewer than 3 attempts are neutral (weight 1).
 *
 * `categories` narrows the pool (see `availableCategories`).
 */
export function selectProblemCategory(
  recentAttempts: PuzzleAttempt[],
  rng: () => number = Math.random,
  categories: readonly PuzzleCategory[] = ALL_CATEGORIES,
): PuzzleCategory {
  if (categories.length === 0) return 'math'
  const weights = categories.map(cat => categoryWeight(recentAttempts, cat))
  const total   = weights.reduce((s, w) => s + w, 0)
  let rand = rng() * total
  for (let i = 0; i < categories.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return categories[i]
  }
  return categories[categories.length - 1]
}

/** Push a new attempt and trim to the last 10. */
export function updatePuzzleAttempts(
  attempts: PuzzleAttempt[],
  category: PuzzleCategory,
  correct: boolean,
): PuzzleAttempt[] {
  return [...attempts, { category, correct }].slice(-10)
}
