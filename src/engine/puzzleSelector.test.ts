import { describe, it, expect } from 'vitest'
import { selectProblemCategory, updatePuzzleAttempts } from './puzzleSelector'
import type { PuzzleAttempt } from './puzzleSelector'

// Simple LCG seeded RNG so assertions are deterministic.
function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) / 0x100000000)
  }
}

describe('selectProblemCategory — reinforcement weighting', () => {
  it('math at 30% accuracy (≥3 attempts) gets weight 2 → appears ~50% of the time', () => {
    // 3 math correct, 7 wrong = 30% accuracy → weight 2
    // logic and comprehension all correct → weight 1 each
    const attempts: PuzzleAttempt[] = [
      { category: 'math', correct: true  },
      { category: 'math', correct: false },
      { category: 'math', correct: false },
      { category: 'math', correct: false },
      { category: 'logic', correct: true },
      { category: 'logic', correct: true },
      { category: 'logic', correct: true },
      { category: 'comprehension', correct: true },
      { category: 'comprehension', correct: true },
      { category: 'comprehension', correct: true },
    ]
    const rng = seededRng(42)
    let mathCount = 0
    const N = 1200
    for (let i = 0; i < N; i++) {
      if (selectProblemCategory(attempts, rng) === 'math') mathCount++
    }
    // Expected: math weight=2, others=1 → math fraction ≈ 2/4 = 50%
    const frac = mathCount / N
    expect(frac).toBeGreaterThan(0.38)
    expect(frac).toBeLessThan(0.62)
  })

  it('all categories at 100% accuracy → equal weights (roughly 1/3 each)', () => {
    const attempts: PuzzleAttempt[] = [
      ...Array(4).fill({ category: 'math',          correct: true }),
      ...Array(4).fill({ category: 'logic',         correct: true }),
      ...Array(2).fill({ category: 'comprehension', correct: true }),
    ] as PuzzleAttempt[]
    const counts = { math: 0, logic: 0, comprehension: 0 }
    const rng = seededRng(99)
    const N = 900
    for (let i = 0; i < N; i++) {
      counts[selectProblemCategory(attempts, rng)]++
    }
    for (const cat of ['math', 'logic', 'comprehension'] as const) {
      expect(counts[cat]).toBeGreaterThan(200)   // well above zero
      expect(counts[cat]).toBeLessThan(440)      // not dominating
    }
  })

  it('fewer than 3 attempts in a category → neutral weight (no doubling)', () => {
    // 2 math attempts (all wrong) — not enough to trigger doubling
    const attempts: PuzzleAttempt[] = [
      { category: 'math', correct: false },
      { category: 'math', correct: false },
    ]
    const rng = seededRng(7)
    let mathCount = 0
    const N = 900
    for (let i = 0; i < N; i++) {
      if (selectProblemCategory(attempts, rng) === 'math') mathCount++
    }
    // Neutral weights → math ≈ 1/3. Would be ≈1/2 if doubled.
    expect(mathCount / N).toBeLessThan(0.44)
  })

  it('empty attempts → neutral weights for all categories', () => {
    const rng = seededRng(13)
    const counts = { math: 0, logic: 0, comprehension: 0 }
    const N = 900
    for (let i = 0; i < N; i++) {
      counts[selectProblemCategory([], rng)]++
    }
    for (const cat of ['math', 'logic', 'comprehension'] as const) {
      expect(counts[cat]).toBeGreaterThan(200)
      expect(counts[cat]).toBeLessThan(440)
    }
  })
})

describe('updatePuzzleAttempts', () => {
  it('appends a new attempt to an empty list', () => {
    const result = updatePuzzleAttempts([], 'math', true)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({ category: 'math', correct: true })
  })

  it('keeps the most recent 10 attempts (trims oldest)', () => {
    let attempts: PuzzleAttempt[] = []
    for (let i = 0; i < 12; i++) {
      attempts = updatePuzzleAttempts(attempts, 'logic', i % 2 === 0)
    }
    expect(attempts).toHaveLength(10)
    // The oldest 2 should be gone; last entry was i=11 (odd → false)
    expect(attempts[attempts.length - 1]).toEqual({ category: 'logic', correct: false })
  })

  it('records both correct and incorrect attempts', () => {
    const a1 = updatePuzzleAttempts([], 'comprehension', true)
    const a2 = updatePuzzleAttempts(a1, 'comprehension', false)
    expect(a2[0].correct).toBe(true)
    expect(a2[1].correct).toBe(false)
  })
})
