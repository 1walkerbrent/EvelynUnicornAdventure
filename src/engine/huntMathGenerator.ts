/**
 * Hunt math generator — simpler bands than zone-progression quest math.
 * Produces bare equations like "23 + 14 = __" or "__ − 28 = 45".
 * The blank (__ ) marks the missing number; correctAnswer is always what the
 * player types. Supports blank at end (default) or blank at start (Z3).
 *
 * Hunt bands (deliberately easier than the zone-progression quest bands):
 *   Z1 — 2-digit, no regrouping, one operation, blank at end
 *   Z2 — 2-digit, with possible regrouping, one operation, blank at end
 *   Z3 — 2-digit, with regrouping, one operation, blank at start (subtraction)
 *        or blank at end (addition) — teaches the "__ = ?" form
 *   Z4 — two operations, 2-digit, blank at end
 *   Z5 — 3-digit, one operation, blank at end
 *   Z6 — two operations, 3-digit, blank at end
 */
import type { MathProblem } from './problems'

type Rng = () => number

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

// ── helpers ──────────────────────────────────────────────────────────────────

/** "56 + 43 = __" — final blank, answer = a op b (op c). */
function blankEnd(parts: number[], ops: ('+' | '−')[], answer: number): MathProblem {
  const lhs = parts.map((n, i) => (i === 0 ? String(n) : ` ${ops[i - 1]} ${n}`)).join('')
  const prompt = `${lhs} = __`
  const eq     = `${lhs} = ${answer}`
  return { type: 'math', prompt, correctAnswer: answer, hint: `${eq}` }
}

/** "__ − b = c" — leading blank, answer = the missing minuend (b + c). */
function blankStart(b: number, c: number, op: '+' | '−'): MathProblem {
  const answer = op === '−' ? b + c : c - b   // __ − b = c → __ = b+c; __ + b = c → __ = c-b
  const prompt = `__ ${op} ${b} = ${c}`
  const hint   = `__ ${op} ${b} = ${c}  →  __ = ${answer}`
  return { type: 'math', prompt, correctAnswer: answer, hint }
}

// ── per-zone builders ─────────────────────────────────────────────────────────

// Z1: 2-digit, no regrouping (ones column never borrows or carries), result in [10, 49]
function makeZ1(rng: Rng): MathProblem {
  if (rng() < 0.5) {
    // Addition: tens1, tens2 in [1,2], ones sum < 10
    const tens1 = randInt(rng, 1, 2)
    const tens2 = randInt(rng, 1, Math.min(2, 4 - tens1))
    const ones1 = randInt(rng, 0, 8)
    const ones2 = randInt(rng, 0, Math.min(9 - ones1, 9))
    const a = tens1 * 10 + ones1
    const b = tens2 * 10 + ones2
    return blankEnd([a, b], ['+'], a + b)
  } else {
    // Subtraction: result in [10, 39], no borrow (ones1 >= ones2, tens1 > tens2)
    const tens1 = randInt(rng, 2, 4)
    const tens2 = randInt(rng, 1, tens1 - 1)
    const ones1 = randInt(rng, 0, 9)
    const ones2 = randInt(rng, 0, ones1)
    const a = tens1 * 10 + ones1
    const b = tens2 * 10 + ones2
    return blankEnd([a, b], ['−'], a - b)
  }
}

// Z2: 2-digit, with possible regrouping, result in [10, 99]
function makeZ2(rng: Rng): MathProblem {
  if (rng() < 0.5) {
    // Addition (may carry)
    const a = randInt(rng, 11, 59)
    const b = randInt(rng, 11, Math.min(99 - a, 50))
    return blankEnd([a, b], ['+'], a + b)
  } else {
    // Subtraction (may borrow), result >= 10
    const answer = randInt(rng, 10, 50)
    const b      = randInt(rng, 11, 49)
    const a      = answer + b
    if (a > 99) return makeZ2(rng)   // retry
    return blankEnd([a, b], ['−'], answer)
  }
}

// Z3: 2-digit, blank position varies — teaches "__ − b = c" form
function makeZ3(rng: Rng): MathProblem {
  if (rng() < 0.5) {
    // "__ − b = c": player finds the missing minuend (b + c)
    const c = randInt(rng, 10, 49)
    const b = randInt(rng, 10, Math.min(49, 99 - c))
    return blankStart(b, c, '−')
  } else {
    // "a + b = __": blank at end, same difficulty as Z2 addition
    const a = randInt(rng, 11, 59)
    const b = randInt(rng, 11, Math.min(99 - a, 50))
    return blankEnd([a, b], ['+'], a + b)
  }
}

// Z4: two 2-digit operations, blank at end, result in [10, 99]
function makeZ4(rng: Rng): MathProblem {
  // Build first step
  const a = randInt(rng, 11, 60)
  const b = randInt(rng, 11, Math.min(60, 99 - a))
  const mid = a + b          // always add first so mid is safely in range
  // Second op: subtract to keep result >= 10
  const c = randInt(rng, 10, mid - 10)
  return blankEnd([a, b, c], ['+', '−'], mid - c)
}

// Z5: 3-digit, one operation, blank at end, result in [100, 999]
function makeZ5(rng: Rng): MathProblem {
  if (rng() < 0.5) {
    // Addition
    const a = randInt(rng, 100, 699)
    const b = randInt(rng, 100, Math.min(999 - a, 400))
    return blankEnd([a, b], ['+'], a + b)
  } else {
    // Subtraction, result >= 100
    const answer = randInt(rng, 100, 599)
    const b      = randInt(rng, 100, Math.min(400, 999 - answer))
    return blankEnd([answer + b, b], ['−'], answer)
  }
}

// Z6: two 3-digit operations, blank at end, result in [100, 999]
function makeZ6(rng: Rng): MathProblem {
  const a   = randInt(rng, 100, 600)
  const b   = randInt(rng, 100, Math.min(500, 999 - a))
  const mid = a + b
  const c   = randInt(rng, 100, mid - 100)
  return blankEnd([a, b, c], ['+', '−'], mid - c)
}

// ── public entry ──────────────────────────────────────────────────────────────

const MAKERS: Record<1 | 2 | 3 | 4 | 5 | 6, (rng: Rng) => MathProblem> = {
  1: makeZ1,
  2: makeZ2,
  3: makeZ3,
  4: makeZ4,
  5: makeZ5,
  6: makeZ6,
}

/**
 * Generate a Hunt-difficulty bare-equation math problem for the given zone (1-6).
 * Guaranteed: positive answer, subtraction is always larger − smaller, no negatives.
 */
export function generateHuntMathProblem(
  zoneNumber: number,
  rng: Rng = Math.random,
): MathProblem {
  const zone = Math.max(1, Math.min(6, zoneNumber)) as 1 | 2 | 3 | 4 | 5 | 6
  return MAKERS[zone](rng)
}
