/**
 * Beginner multiplication facts (3rd grade, CCSS 3.OA) — mixed into the math
 * category alongside the addition/subtraction bands. Bare equations like
 * "3 × 4 = __"; the hint teaches by skip-counting, not by just giving the fact.
 *
 * Fact families follow the usual classroom order — the "anchor" facts first
 * (×1, ×2, ×10, then ×5), then ×3/×4, then ×0 and ×6, then the hard 7s/8s/9s:
 *   Band 1 (Z1) — ×1, ×2, ×10 by 1–5
 *   Band 2 (Z2) — ×1, ×2, ×5, ×10 by 1–10
 *   Band 3 (Z3) — adds ×3, ×4
 *   Band 4 (Z4) — adds ×0, ×6
 *   Band 5 (Z5) — all facts through 10 × 10
 *   Band 6 (Z6) — all facts, and some are missing-factor ("4 × __ = 28"),
 *                 which is the bridge to division (3.OA.4)
 */
import type { MathProblem } from './problems'

type Rng = () => number
export type MultBand = 1 | 2 | 3 | 4 | 5 | 6

/** Share of math problems that are multiplication, once it is mixed in. */
export const MULTIPLICATION_SHARE = 0.3

interface MultParams {
  /** The fact families practised in this band — one factor always comes from here. */
  focus: number[]
  /** Range of the other factor. */
  otherMin: number
  otherMax: number
  /** Chance of the "a × __ = c" form instead of "a × b = __". */
  missingFactorChance: number
}

const ALL_FACTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const MULT_PARAMS: Record<MultBand, MultParams> = {
  1: { focus: [1, 2, 10],                otherMin: 1, otherMax: 5,  missingFactorChance: 0 },
  2: { focus: [1, 2, 5, 10],             otherMin: 1, otherMax: 10, missingFactorChance: 0 },
  3: { focus: [2, 3, 4, 5, 10],          otherMin: 1, otherMax: 10, missingFactorChance: 0 },
  4: { focus: [0, 2, 3, 4, 5, 6, 10],    otherMin: 1, otherMax: 10, missingFactorChance: 0 },
  5: { focus: ALL_FACTS,                 otherMin: 1, otherMax: 10, missingFactorChance: 0 },
  6: { focus: ALL_FACTS,                 otherMin: 1, otherMax: 10, missingFactorChance: 0.4 },
}

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]
}

/**
 * "Count by 4s, 3 times: 4, 8, 12" — skip-counting is how 3rd graders are
 * taught to find a fact they don't know yet. Counts by the bigger number so the
 * list stays short (3 × 9 counts 9, 18, 27 rather than nine 3s).
 */
export function multiplicationHint(a: number, b: number): string {
  const product = a * b
  if (a === 0 || b === 0) return `Zero groups, or groups of zero, make 0. ${a} × ${b} = 0`
  if (a === 1 || b === 1) return `Times 1 keeps the number the same. ${a} × ${b} = ${product}`
  const step  = Math.max(a, b)
  const times = Math.min(a, b)
  const counts = Array.from({ length: times }, (_, i) => step * (i + 1))
  return `Count by ${step}s, ${times} times: ${counts.join(', ')}. So ${a} × ${b} = ${product}`
}

export function generateMultiplicationProblem(band: MultBand, rng: Rng = Math.random): MathProblem {
  const p = MULT_PARAMS[band]
  const focus = pick(rng, p.focus)
  const other = randInt(rng, p.otherMin, p.otherMax)
  // Show the facts both ways round so 3 × 4 and 4 × 3 both come up.
  const [a, b] = rng() < 0.5 ? [focus, other] : [other, focus]
  const product = a * b

  // Missing-factor form needs a nonzero known factor, or the blank has no single answer.
  if (a !== 0 && rng() < p.missingFactorChance) {
    return {
      type: 'math',
      prompt: `${a} × __ = ${product}`,
      correctAnswer: b,
      hint: `How many ${a}s make ${product}? ${multiplicationHint(a, b)}`,
    }
  }

  return {
    type: 'math',
    prompt: `${a} × ${b} = __`,
    correctAnswer: product,
    hint: multiplicationHint(a, b),
  }
}
