export interface PuzzleAttempt {
  category: 'math' | 'logic' | 'comprehension'
  correct: boolean
}

const CATEGORIES = ['math', 'logic', 'comprehension'] as const
type Category = typeof CATEGORIES[number]

function categoryAccuracy(attempts: PuzzleAttempt[], cat: Category): number | null {
  const catAttempts = attempts.filter(a => a.category === cat)
  if (catAttempts.length < 3) return null
  return catAttempts.filter(a => a.correct).length / catAttempts.length
}

function categoryWeight(attempts: PuzzleAttempt[], cat: Category): number {
  const acc = categoryAccuracy(attempts, cat)
  if (acc === null) return 1   // fewer than 3 attempts — neutral
  return acc < 0.6 ? 2 : 1    // struggling (< 60% correct) → doubled weight
}

/**
 * Picks a puzzle category using reinforcement weighting.
 * Any category with accuracy < 60% over its last attempts gets weight 2 (doubled);
 * categories with fewer than 3 attempts are neutral (weight 1).
 */
export function selectProblemCategory(
  recentAttempts: PuzzleAttempt[],
  rng: () => number = Math.random,
): Category {
  const weights = CATEGORIES.map(cat => categoryWeight(recentAttempts, cat))
  const total   = weights.reduce((s, w) => s + w, 0)
  let rand = rng() * total
  for (let i = 0; i < CATEGORIES.length; i++) {
    rand -= weights[i]
    if (rand <= 0) return CATEGORIES[i]
  }
  return CATEGORIES[CATEGORIES.length - 1]
}

/** Push a new attempt and trim to the last 10. */
export function updatePuzzleAttempts(
  attempts: PuzzleAttempt[],
  category: Category,
  correct: boolean,
): PuzzleAttempt[] {
  return [...attempts, { category, correct }].slice(-10)
}
