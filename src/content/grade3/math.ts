// Grade 3 math by zone (DESIGN.md §23). Kept from the pre-grade game: the
// 3-digit add/subtract chains (old Zones 3–6) and the times-table bands. New:
// 3-digit add/subtract for Zones 1–2 (the old 2-digit sums were 1st–2nd grade),
// division facts, rounding, and comparing fractions.
import type { MathProblem } from '../../engine/problems'
import type { Rng } from '../../engine/mathKit'
import { randInt, pick, whole, compare } from '../../engine/mathKit'
import type { MathSkill, ZoneSkills } from '../gradeTypes'
import {
  generateMultiplicationProblem, generateDivisionFact, generateMissingFactor, generateMissingDivision,
} from './multiplication'

// ── addition and subtraction within 1,000 (3.NBT.2) ──────────────────────────

/** 3-digit ± 3-digit where no column carries or borrows. */
function addSubNoRegroup(rng: Rng): MathProblem {
  const digits = () => [randInt(rng, 1, 4), randInt(rng, 0, 4), randInt(rng, 0, 4)]
  const [h1, t1, o1] = digits()
  const [h2, t2, o2] = digits()
  const a = h1 * 100 + t1 * 10 + o1
  const b = h2 * 100 + t2 * 10 + o2
  if (rng() < 0.5) return whole('add-sub-3', `${a} + ${b} = __`, a + b, `Add the ones, then the tens, then the hundreds: ${a} + ${b} = ${a + b}`)
  // Subtract the smaller digit in every column: build the big number from the larger digits.
  const big = Math.max(h1, h2) * 100 + Math.max(t1, t2) * 10 + Math.max(o1, o2)
  const small = Math.min(h1, h2) * 100 + Math.min(t1, t2) * 10 + Math.min(o1, o2)
  if (big === small) return addSubNoRegroup(rng)
  return whole('add-sub-3', `${big} − ${small} = __`, big - small, `Take away the ones, then the tens, then the hundreds: ${big} − ${small} = ${big - small}`)
}

/** 3-digit ± 3-digit that needs at least one carry or borrow. */
function addSubRegroup(rng: Rng): MathProblem {
  for (;;) {
    if (rng() < 0.5) {
      const a = randInt(rng, 105, 689)
      const b = randInt(rng, 105, 999 - a)
      if ((a % 10) + (b % 10) < 10 && (a % 100) + (b % 100) < 100) continue
      return whole('add-sub-3-regroup', `${a} + ${b} = __`, a + b, `Line up the places. When a column makes 10 or more, carry 1 to the next place. ${a} + ${b} = ${a + b}`)
    }
    const a = randInt(rng, 300, 999)
    const b = randInt(rng, 105, a - 100)
    if (a % 10 >= b % 10 && a % 100 >= b % 100) continue
    return whole('add-sub-3-regroup', `${a} − ${b} = __`, a - b, `When the top digit is smaller, borrow 1 from the next place. ${a} − ${b} = ${a - b}`)
  }
}

interface ChainParams { operandMin: number; runningMin: number; max: number; minOps: number; maxOps: number }

// The pre-grade bands 3–5, unchanged apart from dropping band 6's "extra
// number", which only ever appeared in the hint.
const CHAINS: Record<'mixed' | 'three' | 'multi', ChainParams> = {
  mixed: { operandMin: 10,  runningMin: 10,  max: 999, minOps: 2, maxOps: 2 },
  three: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 2 },
  multi: { operandMin: 100, runningMin: 100, max: 999, minOps: 2, maxOps: 3 },
}

/** "456 + 213 − 178 = __": left to right, every running total inside [runningMin, max]. */
export function addSubChain(rng: Rng, kind: keyof typeof CHAINS): MathProblem {
  const p = CHAINS[kind]
  const ops = randInt(rng, p.minOps, p.maxOps)
  let running = randInt(rng, p.runningMin, p.max)
  let lhs = String(running)
  for (let i = 0; i < ops; i++) {
    const canAdd = running + p.operandMin <= p.max
    const canSub = running - p.operandMin >= p.runningMin
    const add = canAdd && (!canSub || rng() < 0.5)
    const n = add ? randInt(rng, p.operandMin, p.max - running) : randInt(rng, p.operandMin, running - p.runningMin)
    running += add ? n : -n
    lhs += ` ${add ? '+' : '−'} ${n}`
  }
  return whole(`add-sub-chain-${kind}`, `${lhs} = __`, running, `Work left to right: ${lhs} = ${running}`)
}

// ── rounding (3.NBT.1) ───────────────────────────────────────────────────────

function round10(rng: Rng): MathProblem {
  let n: number
  do n = randInt(rng, 11, 989); while (n % 10 === 0)
  const r = Math.round(n / 10) * 10
  const ones = n % 10
  return whole('round-10', `Round ${n} to the nearest 10 = __`, r,
    `Look at the ones digit, ${ones}. ${ones >= 5 ? '5 or more rounds up' : 'Less than 5 rounds down'}, so ${n} rounds to ${r}.`)
}

function round100(rng: Rng): MathProblem {
  let n: number
  do n = randInt(rng, 101, 989); while (n % 100 === 0)
  const r = Math.round(n / 100) * 100
  const tens = Math.floor(n / 10) % 10
  return whole('round-100', `Round ${n} to the nearest 100 = __`, r,
    `Look at the tens digit, ${tens}. ${tens >= 5 ? '5 or more rounds up' : 'Less than 5 rounds down'}, so ${n} rounds to ${r}.`)
}

// ── comparing fractions (3.NF.3d) ────────────────────────────────────────────

const DENOMS = [2, 3, 4, 6, 8]

function compareSameDenominator(rng: Rng): MathProblem {
  const d = pick(rng, DENOMS)
  const a = randInt(rng, 1, d)
  const b = rng() < 0.15 ? a : randInt(rng, 1, d)
  return compare('compare-fractions-den', `${a}/${d}`, `${b}/${d}`, a, b,
    `Same bottom number, so the pieces are the same size. More pieces is more: compare ${a} and ${b}.`)
}

function compareSameNumerator(rng: Rng): MathProblem {
  const n = randInt(rng, 1, 3)
  const options = DENOMS.filter((d) => d >= n)
  const a = pick(rng, options)
  const b = rng() < 0.15 ? a : pick(rng, options)
  return compare('compare-fractions-num', `${n}/${a}`, `${n}/${b}`, n / a, n / b,
    `Same top number. A bigger bottom number cuts the whole into more pieces, so each piece is smaller.`)
}

// ── the zones ────────────────────────────────────────────────────────────────

const skill = (label: string, make: (rng: Rng) => MathProblem, times = false): MathSkill => ({ label, make, times })

export const GRADE3_MATH: ZoneSkills = {
  1: [
    skill('3-digit + and − without regrouping', addSubNoRegroup),
    skill('× facts: ×1, ×2, ×5, ×10', (r) => generateMultiplicationProblem(2, r), true),
  ],
  2: [
    skill('3-digit + and − with regrouping', addSubRegroup),
    skill('× facts: adds ×3, ×4', (r) => generateMultiplicationProblem(3, r), true),
    skill('round to the nearest 10', round10),
  ],
  3: [
    skill('+ and − within 1,000, 2 steps', (r) => addSubChain(r, 'mixed')),
    skill('× facts: adds ×0, ×6', (r) => generateMultiplicationProblem(4, r), true),
    skill('÷ facts by 2, 5, 10', (r) => generateDivisionFact([2, 5, 10], r), true),
    skill('round to the nearest 10 or 100', (r) => (r() < 0.5 ? round10(r) : round100(r))),
  ],
  4: [
    skill('3-digit + and −, 2 steps', (r) => addSubChain(r, 'three')),
    skill('all × facts to 10 × 10', (r) => generateMultiplicationProblem(5, r), true),
    skill('÷ facts by 2–6', (r) => generateDivisionFact([2, 3, 4, 5, 6], r), true),
    skill('compare fractions, same denominator', compareSameDenominator),
  ],
  5: [
    skill('+ and − within 1,000, 2–3 steps', (r) => addSubChain(r, 'multi')),
    skill('all ÷ facts', (r) => generateDivisionFact([2, 3, 4, 5, 6, 7, 8, 9, 10], r), true),
    skill('missing factor (6 × __ = 42)', generateMissingFactor, true),
    skill('compare fractions, same numerator', compareSameNumerator),
  ],
  6: [
    skill('+ and − within 1,000, 2–3 steps', (r) => addSubChain(r, 'multi')),
    skill('missing factor or divisor', (r) => (r() < 0.5 ? generateMissingFactor(r) : generateMissingDivision(r)), true),
    skill('× facts, some with a missing factor', (r) => generateMultiplicationProblem(6, r), true),
    skill('compare fractions, same top or bottom', (r) => (r() < 0.5 ? compareSameDenominator(r) : compareSameNumerator(r))),
  ],
}
