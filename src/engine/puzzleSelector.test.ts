import { describe, it, expect } from 'vitest'
import {
  selectProblemCategory,
  updatePuzzleAttempts,
  availableCategories,
  ALL_CATEGORIES,
} from './puzzleSelector'
import type { PuzzleAttempt, PuzzleCategory } from './puzzleSelector'

// Simple LCG seeded RNG so assertions are deterministic.
function seededRng(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return ((s >>> 0) / 0x100000000)
  }
}

const EVERY_CATEGORY: PuzzleCategory[] = ['math', 'logic', 'comprehension', 'spelling']

describe('selectProblemCategory — reinforcement weighting', () => {
  it('math at 25% accuracy (≥3 attempts) gets weight 2 → appears ~40% of the time', () => {
    // math 1/4 correct = 25% → weight 2; the other three are all correct → weight 1.
    const attempts: PuzzleAttempt[] = [
      { category: 'math', correct: true  },
      { category: 'math', correct: false },
      { category: 'math', correct: false },
      { category: 'math', correct: false },
      ...Array(3).fill({ category: 'logic',         correct: true }),
      ...Array(3).fill({ category: 'comprehension', correct: true }),
      ...Array(3).fill({ category: 'spelling',      correct: true }),
    ] as PuzzleAttempt[]
    const rng = seededRng(42)
    let mathCount = 0
    const N = 1200
    for (let i = 0; i < N; i++) {
      if (selectProblemCategory(attempts, rng) === 'math') mathCount++
    }
    // Expected: math weight=2, others=1 each → math fraction ≈ 2/5 = 40%
    const frac = mathCount / N
    expect(frac).toBeGreaterThan(0.33)
    expect(frac).toBeLessThan(0.48)
  })

  it('spelling at 25% accuracy also gets doubled (it is weighted like any other category)', () => {
    const attempts: PuzzleAttempt[] = [
      { category: 'spelling', correct: true  },
      { category: 'spelling', correct: false },
      { category: 'spelling', correct: false },
      { category: 'spelling', correct: false },
      ...Array(3).fill({ category: 'math',          correct: true }),
      ...Array(3).fill({ category: 'logic',         correct: true }),
      ...Array(3).fill({ category: 'comprehension', correct: true }),
    ] as PuzzleAttempt[]
    const rng = seededRng(4242)
    let spellingCount = 0
    const N = 1200
    for (let i = 0; i < N; i++) {
      if (selectProblemCategory(attempts, rng) === 'spelling') spellingCount++
    }
    const frac = spellingCount / N
    expect(frac).toBeGreaterThan(0.33)
    expect(frac).toBeLessThan(0.48)
  })

  it('all categories at 100% accuracy → equal weights (roughly 1/4 each)', () => {
    const attempts: PuzzleAttempt[] = [
      ...Array(4).fill({ category: 'math',          correct: true }),
      ...Array(4).fill({ category: 'logic',         correct: true }),
      ...Array(3).fill({ category: 'comprehension', correct: true }),
      ...Array(3).fill({ category: 'spelling',      correct: true }),
    ] as PuzzleAttempt[]
    const counts: Record<PuzzleCategory, number> = { math: 0, logic: 0, comprehension: 0, spelling: 0 }
    const rng = seededRng(99)
    const N = 1200
    for (let i = 0; i < N; i++) {
      counts[selectProblemCategory(attempts, rng)]++
    }
    for (const cat of EVERY_CATEGORY) {
      expect(counts[cat], `${cat} was starved`).toBeGreaterThan(200)   // ≈300 expected
      expect(counts[cat], `${cat} dominated`).toBeLessThan(420)
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
    const N = 1200
    for (let i = 0; i < N; i++) {
      if (selectProblemCategory(attempts, rng) === 'math') mathCount++
    }
    // Neutral weights → math ≈ 1/4. Would be ≈2/5 if doubled.
    expect(mathCount / N).toBeLessThan(0.33)
  })

  it('empty attempts → neutral weights for all categories', () => {
    const rng = seededRng(13)
    const counts: Record<PuzzleCategory, number> = { math: 0, logic: 0, comprehension: 0, spelling: 0 }
    const N = 1200
    for (let i = 0; i < N; i++) {
      counts[selectProblemCategory([], rng)]++
    }
    for (const cat of EVERY_CATEGORY) {
      expect(counts[cat]).toBeGreaterThan(200)
      expect(counts[cat]).toBeLessThan(420)
    }
  })
})

describe('availableCategories — spelling needs speech', () => {
  it('includes spelling when the device can speak', () => {
    expect(availableCategories(true)).toEqual([...ALL_CATEGORIES])
    expect(availableCategories(true)).toContain('spelling')
  })

  it('drops spelling when the device has no speech synthesis', () => {
    const cats = availableCategories(false)
    expect(cats).not.toContain('spelling')
    expect(cats).toEqual(['math', 'logic', 'comprehension'])
  })

  it('a narrowed pool is never selected outside of', () => {
    const rng = seededRng(555)
    const cats = availableCategories(false)
    for (let i = 0; i < 500; i++) {
      expect(cats).toContain(selectProblemCategory([], rng, cats))
    }
  })

  it('falls back to math rather than returning undefined on an empty pool', () => {
    expect(selectProblemCategory([], seededRng(1), [])).toBe('math')
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

  it('records spelling attempts', () => {
    const result = updatePuzzleAttempts([], 'spelling', false)
    expect(result[0]).toEqual({ category: 'spelling', correct: false })
  })
})
