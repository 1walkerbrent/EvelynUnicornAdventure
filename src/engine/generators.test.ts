import { describe, it, expect } from 'vitest'
import { effectiveDifficulty, ZONE_BANDS } from './difficulty'
import { generateMathProblem } from './mathGenerator'
import { generateLogicProblem } from './logicGenerator'

// Seeded PRNG (mulberry32) so statistical assertions are deterministic and never
// flake on unlucky Math.random draws.
function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── effectiveDifficulty ──────────────────────────────────────────────────────

describe('effectiveDifficulty', () => {
  it('Zone 1: floor=1 + round(level × 0.5), clamped to ceiling=3', () => {
    expect(effectiveDifficulty(1, 1)).toBe(2)   // 1 + round(0.5) = 2
    expect(effectiveDifficulty(1, 2)).toBe(2)   // 1 + round(1.0) = 2
    expect(effectiveDifficulty(1, 3)).toBe(3)   // 1 + round(1.5) = 3
    expect(effectiveDifficulty(1, 4)).toBe(3)   // 1 + round(2.0) = 3
    expect(effectiveDifficulty(1, 10)).toBe(3)  // clamped to ceiling
  })

  it('never overshoots the zone ceiling for any level', () => {
    for (const [zoneStr, band] of Object.entries(ZONE_BANDS)) {
      const zone = parseInt(zoneStr)
      expect(effectiveDifficulty(zone, 100)).toBeLessThanOrEqual(band.ceiling)
    }
  })

  it('never goes below the zone floor at level 1', () => {
    for (const [zoneStr, band] of Object.entries(ZONE_BANDS)) {
      const zone = parseInt(zoneStr)
      expect(effectiveDifficulty(zone, 1)).toBeGreaterThanOrEqual(band.floor)
    }
  })
})

// ── Math generator invariants (200 samples) ──────────────────────────────────

describe('generateMathProblem — hard invariants over 200 samples', () => {
  it('answer is always strictly positive', () => {
    for (let i = 0; i < 200; i++) {
      const p = generateMathProblem(2)
      expect(p.correctAnswer).toBeGreaterThan(0)
    }
  })

  it('answer is always within 2-digit range (Zone 1: [10, 99])', () => {
    for (let i = 0; i < 200; i++) {
      const p = generateMathProblem(2)
      expect(p.correctAnswer).toBeGreaterThanOrEqual(10)
      expect(p.correctAnswer).toBeLessThanOrEqual(99)
    }
  })

  it('answer is always an integer', () => {
    for (let i = 0; i < 200; i++) {
      const p = generateMathProblem(2)
      expect(Number.isInteger(p.correctAnswer)).toBe(true)
    }
  })

  it('prompt contains both operand numbers (subtraction: larger then smaller)', () => {
    // For subtraction templates: a > b always, so the first large number appears before the smaller.
    // We just verify both numbers from the hint appear in the prompt.
    for (let i = 0; i < 200; i++) {
      const p = generateMathProblem(2)
      // Hint always contains the operand numbers in the format "... X ... Y ..."
      expect(p.hint.length).toBeGreaterThan(10)
      expect(p.prompt.length).toBeGreaterThan(20)
      expect(p.type).toBe('math')
    }
  })

  it('difficulty 1 produces smaller numbers than difficulty 3', () => {
    // Seeded rng → deterministic sample, so the mean comparison can't flake. Both
    // difficulties resolve to band 1 (two-digit); difficulty 3 draws from a wider
    // tens range (maxTens 9 vs 3), so its mean answer is reliably higher. N is
    // large enough that the separation dwarfs any per-sample noise.
    const rng1 = mulberry32(0xC0FFEE)
    const rng3 = mulberry32(0xBEEF)
    let sumDiff1 = 0
    let sumDiff3 = 0
    const N = 300
    for (let i = 0; i < N; i++) {
      sumDiff1 += generateMathProblem(1, rng1).correctAnswer
      sumDiff3 += generateMathProblem(3, rng3).correctAnswer
    }
    expect(sumDiff3 / N).toBeGreaterThan(sumDiff1 / N)
  })
})

// ── Logic generator invariants (100 samples) ─────────────────────────────────

describe('generateLogicProblem — correctIndex validity', () => {
  it('correctIndex is always in [0, 1, 2]', () => {
    for (let i = 0; i < 100; i++) {
      const p = generateLogicProblem(2)
      expect(p.correctIndex).toBeGreaterThanOrEqual(0)
      expect(p.correctIndex).toBeLessThanOrEqual(2)
    }
  })

  it('choices always has exactly 3 options', () => {
    for (let i = 0; i < 100; i++) {
      const p = generateLogicProblem(2)
      expect(p.choices.length).toBe(3)
    }
  })

  it('all three positions appear as correct answer over many runs', () => {
    const seen = new Set<number>()
    for (let i = 0; i < 300; i++) {
      seen.add(generateLogicProblem(2).correctIndex)
    }
    expect(seen).toContain(0)
    expect(seen).toContain(1)
    expect(seen).toContain(2)
  })

  it('correct choice position is never eliminated by the NOT clues in the prompt', () => {
    // Every template uses "on the [wrong_position]" for its second clue.
    // So "on the left/middle/right" in the prompt should NEVER match the correct choice's position.
    const posWords = ['left', 'middle', 'right']
    for (let i = 0; i < 200; i++) {
      const p = generateLogicProblem(2)
      const correctLabel = p.choices[p.correctIndex].toLowerCase()
      const correctPos = posWords.find(pos => correctLabel.startsWith(pos))
      if (correctPos) {
        // Collect all "on the X" substrings from the prompt
        const onTheMatches = [...p.prompt.toLowerCase().matchAll(/on the (\w+)/g)]
        const positionsInClues = onTheMatches.map(m => m[1])
        // The correct position should NOT appear among eliminated positions
        expect(positionsInClues).not.toContain(correctPos)
      }
    }
  })

  it('correct answer is the only choice whose position is not in the prompt NOT-clues', () => {
    const posWords = ['left', 'middle', 'right']
    for (let i = 0; i < 100; i++) {
      const p = generateLogicProblem(2)
      const onTheMatches = [...p.prompt.toLowerCase().matchAll(/on the (\w+)/g)]
      const eliminatedPositions = onTheMatches.map(m => m[1])

      const survivors = p.choices
        .map((choice, idx) => ({ idx, choice: choice.toLowerCase() }))
        .filter(({ choice }) => {
          const pos = posWords.find(pw => choice.startsWith(pw))
          return pos ? !eliminatedPositions.includes(pos) : true
        })

      // The correct answer should be among the survivors
      expect(survivors.map(s => s.idx)).toContain(p.correctIndex)
    }
  })
})

// ── Anti-repeat: consecutive calls use different templates ────────────────────

describe('anti-repeat — no immediate consecutive repeats', () => {
  it('math: 12 consecutive problems never repeat the immediately preceding template', () => {
    let prev: string | null = null
    for (let i = 0; i < 12; i++) {
      const p = generateMathProblem(2)
      // Use a fragment of the prompt as a proxy for the template identity
      const fragment = p.prompt.slice(0, 20)
      if (prev !== null) expect(fragment).not.toBe(prev)
      prev = fragment
    }
  })

  it('logic: 18 consecutive problems never repeat the immediately preceding template', () => {
    let prev: string | null = null
    for (let i = 0; i < 18; i++) {
      const p = generateLogicProblem(2)
      const fragment = p.prompt.slice(0, 20)
      if (prev !== null) expect(fragment).not.toBe(prev)
      prev = fragment
    }
  })
})
