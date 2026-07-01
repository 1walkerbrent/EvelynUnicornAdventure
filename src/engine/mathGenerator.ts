/**
 * Quest/Practice math generator — zone-progression difficulty bands (§9).
 * Produces bare equations ("47 + 36 = __") with no story wrappers.
 * The player sees the equation and types the missing number.
 *
 * Difficulty bands match §9 and are harder than the Hunt math bands:
 *   Band 1 (Z1) — 2-digit, no regrouping, one step
 *   Band 2 (Z2) — 2-digit, with regrouping, 1–2 steps
 *   Band 3 (Z3) — mixed 2–3 digit, 2 steps
 *   Band 4 (Z4) — 3-digit, 2 steps
 *   Band 5 (Z5) — 3-digit, 2–3 steps
 *   Band 6 (Z6) — 3-digit, 2–3 steps, extraneous number in hint only
 */
import type { MathProblem } from './problems'
import { bandForDifficulty } from './difficulty'

type Rng = () => number
type Op = '+' | '−'

function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

// ════════════════════════════════════════════════════════════════════════════
// BAND 1 — two-digit, NO regrouping, one-step (Zone 1)
// ════════════════════════════════════════════════════════════════════════════

function sub2NoRegroup(rng: Rng, maxTens: number): { a: number; b: number } {
  const tens1 = randInt(rng, 2, maxTens)
  const tens2 = randInt(rng, 1, tens1 - 1)
  const ones1 = randInt(rng, 0, 9)
  const ones2 = randInt(rng, 0, ones1)
  return { a: tens1 * 10 + ones1, b: tens2 * 10 + ones2 }
}

function add2NoRegroup(rng: Rng, maxTens: number): { a: number; b: number } {
  const tens1 = randInt(rng, 1, Math.max(1, maxTens - 1))
  const tens2 = randInt(rng, 1, Math.max(1, maxTens - tens1))
  const ones1 = randInt(rng, 0, 8)
  const ones2 = randInt(rng, 0, 9 - ones1)
  return { a: tens1 * 10 + ones1, b: tens2 * 10 + ones2 }
}

function maxTensForDiff(diff: number): number {
  if (diff <= 1) return 3
  if (diff <= 2) return 6
  return 9
}

function generateBand1(difficulty: number, rng: Rng): MathProblem {
  const maxTens = maxTensForDiff(difficulty)
  if (rng() < 0.5) {
    const { a, b } = sub2NoRegroup(rng, maxTens)
    const answer = a - b
    return {
      type: 'math',
      prompt: `${a} − ${b} = __`,
      correctAnswer: answer,
      hint: `${a} − ${b} = ${answer}`,
    }
  } else {
    const { a, b } = add2NoRegroup(rng, maxTens)
    const answer = a + b
    return {
      type: 'math',
      prompt: `${a} + ${b} = __`,
      correctAnswer: answer,
      hint: `${a} + ${b} = ${answer}`,
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// BAND SPEC (re-exported for tests)
// ════════════════════════════════════════════════════════════════════════════

export interface MathSpec {
  numbers: number[]
  ops: Op[]
  runningTotals: number[]
  answer: number
  extraneous?: number
}

interface BandParams {
  operandMin: number
  runningMin: number
  max: number
  minOps: number
  maxOps: number
  extraneous: boolean
}

const BAND_PARAMS: Record<2 | 3 | 4 | 5 | 6, BandParams> = {
  2: { operandMin: 10,  runningMin: 10,  max: 99,  minOps: 1, maxOps: 2, extraneous: false },
  3: { operandMin: 10,  runningMin: 10,  max: 999, minOps: 2, maxOps: 2, extraneous: false },
  4: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 2, extraneous: false },
  5: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 3, extraneous: false },
  6: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 3, extraneous: true },
}

export function buildMathSpec(rng: Rng, band: 2 | 3 | 4 | 5 | 6): MathSpec {
  const p = BAND_PARAMS[band]
  const opCount = randInt(rng, p.minOps, p.maxOps)

  let running = randInt(rng, p.runningMin, p.max)
  const numbers = [running]
  const ops: Op[] = []
  const runningTotals = [running]

  for (let i = 0; i < opCount; i++) {
    const canAdd = running + p.operandMin <= p.max
    const canSub = running - p.operandMin >= p.runningMin
    let op: Op
    if (canAdd && canSub) op = rng() < 0.5 ? '+' : '−'
    else if (canSub) op = '−'
    else op = '+'

    let operand: number
    if (op === '+') {
      operand = randInt(rng, p.operandMin, p.max - running)
      running += operand
    } else {
      operand = randInt(rng, p.operandMin, running - p.runningMin)
      running -= operand
    }
    numbers.push(operand)
    ops.push(op)
    runningTotals.push(running)
  }

  const spec: MathSpec = { numbers, ops, runningTotals, answer: running }

  if (p.extraneous) {
    let extra = 0
    do {
      extra = randInt(rng, p.operandMin, p.max)
    } while (numbers.includes(extra) || extra === spec.answer)
    spec.extraneous = extra
  }

  return spec
}

// ── bare-equation renderer ────────────────────────────────────────────────────

function renderBareEquation(spec: MathSpec): MathProblem {
  const lhs = spec.numbers
    .map((n, i) => (i === 0 ? String(n) : ` ${spec.ops[i - 1]} ${n}`))
    .join('')
  const prompt = `${lhs} = __`

  // Hint: show the full solved equation; for band-6 note the extraneous number
  const hint =
    spec.extraneous !== undefined
      ? `Ignore the extra number (${spec.extraneous}). Work left to right: ${lhs} = ${spec.answer}`
      : `Work left to right: ${lhs} = ${spec.answer}`

  return { type: 'math', prompt, correctAnswer: spec.answer, hint }
}

function generateBanded(band: 2 | 3 | 4 | 5 | 6, rng: Rng): MathProblem {
  return renderBareEquation(buildMathSpec(rng, band))
}

// ════════════════════════════════════════════════════════════════════════════
// PUBLIC ENTRY — routes by effective difficulty
// ════════════════════════════════════════════════════════════════════════════

export function generateMathProblem(difficulty: number, rng: Rng = Math.random): MathProblem {
  const band = bandForDifficulty(difficulty)
  if (band === 1) return generateBand1(difficulty, rng)
  return generateBanded(band, rng)
}
