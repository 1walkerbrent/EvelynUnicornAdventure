// Grade 5 math by zone (DESIGN.md §23): multi-digit × and ÷, fractions with
// unlike denominators and fraction ×, decimals with all four operations, order
// of operations with parentheses, and powers of 10.
import type { MathProblem } from '../../engine/problems'
import type { Frac, Rng } from '../../engine/mathKit'
import { randInt, pick, fmt, fmtDec, whole, decimal, fraction, remainder, lcm, simplify, fracStr } from '../../engine/mathKit'
import type { MathSkill, ZoneSkills } from '../gradeTypes'

// ── powers of 10 (5.NBT.2) ───────────────────────────────────────────────────

const POWERS = [10, 100, 1000] as const
const zerosIn = (p: number) => String(p).length - 1

function powersOfTenWhole(rng: Rng): MathProblem {
  const p = pick(rng, POWERS)
  const n = randInt(rng, 2, 999)
  if (rng() < 0.5) {
    return { ...whole('× ÷ by 10, 100, 1,000', `${fmt(n)} × ${fmt(p, true)} = __`, n * p,
      `× ${fmt(p, true)} moves every digit ${zerosIn(p)} place${zerosIn(p) > 1 ? 's' : ''} to the left: ${fmt(n * p)}.`), multiplication: true }
  }
  return { ...whole('× ÷ by 10, 100, 1,000', `${fmt(n * p)} ÷ ${fmt(p, true)} = __`, n,
    `÷ ${fmt(p, true)} moves every digit ${zerosIn(p)} place${zerosIn(p) > 1 ? 's' : ''} to the right: ${fmt(n)}.`), multiplication: true }
}

function powersOfTenDecimal(rng: Rng, exponents: boolean): MathProblem {
  const p = pick(rng, POWERS)
  const k = zerosIn(p)
  const shown = exponents && rng() < 0.6 ? `10${['', '¹', '²', '³'][k]}` : fmt(p, true)
  // × takes hundredths (3.47 × 100); ÷ takes tenths, so ÷ 1,000 stops at 4 decimal places.
  const divide = rng() < 0.5
  const n = divide ? randInt(rng, 11, 9999) / 10 : randInt(rng, 11, 9999) / 100
  const label = exponents ? 'powers of 10 with exponents' : 'powers of 10 with decimals'
  const expl = exponents ? `10${['', '¹', '²', '³'][k]} = ${fmt(p, true)}, which has ${k} zero${k > 1 ? 's' : ''}. ` : ''
  if (!divide) {
    return { ...decimal(label, `${fmtDec(n)} × ${shown} = __`, n * p,
      `${expl}Multiplying moves the decimal point ${k} place${k > 1 ? 's' : ''} right: ${fmtDec(n * p)}.`), multiplication: true }
  }
  return { ...decimal(label, `${fmtDec(n)} ÷ ${shown} = __`, n / p,
    `${expl}Dividing moves the decimal point ${k} place${k > 1 ? 's' : ''} left: ${fmtDec(n / p)}.`), multiplication: true }
}

// ── order of operations (5.OA.1) ─────────────────────────────────────────────

function parentheses(rng: Rng): MathProblem {
  const a = randInt(rng, 2, 12), b = randInt(rng, 2, 12), c = randInt(rng, 2, 9)
  const forms: Array<[string, number, string]> = [
    [`(${a} + ${b}) × ${c}`, (a + b) * c, `Parentheses first: ${a} + ${b} = ${a + b}. Then × ${c}.`],
    [`${c} × (${a + b} − ${b})`, c * a, `Parentheses first: ${a + b} − ${b} = ${a}. Then ${c} × ${a}.`],
    [`${a} + ${b} × ${c}`, a + b * c, `No parentheses, so × comes before +: ${b} × ${c} = ${b * c}, then add ${a}.`],
    [`(${a * c} ÷ ${c}) + ${b}`, a + b, `Parentheses first: ${a * c} ÷ ${c} = ${a}. Then + ${b}.`],
  ]
  const [expr, value, hint] = pick(rng, forms)
  return whole('order of operations, ( )', `${expr} = __`, value, hint)
}

function nestedParentheses(rng: Rng): MathProblem {
  const a = randInt(rng, 2, 9), b = randInt(rng, 1, 8), c = randInt(rng, 2, 6), d = randInt(rng, 1, 9)
  const forms: Array<[string, number, string]> = [
    [`[(${a} + ${b}) × ${c}] − ${d}`, (a + b) * c - d, `Inside out: (${a} + ${b}) = ${a + b}, then × ${c} = ${(a + b) * c}, then − ${d}.`],
    [`${c} × [${d} + (${a} × ${b})]`, c * (d + a * b), `Inside out: (${a} × ${b}) = ${a * b}, then + ${d} = ${d + a * b}, then × ${c}.`],
    [`[${a * c + c * b} − (${b} × ${c})] ÷ ${c}`, a, `Inside out: (${b} × ${c}) = ${b * c}, then ${a * c + c * b} − ${b * c} = ${a * c}, then ÷ ${c}.`],
  ]
  const [expr, value, hint] = pick(rng, forms)
  return whole('nested parentheses', `${expr} = __`, value, hint)
}

// ── multiplying and dividing whole numbers (5.NBT.5, 5.NBT.6) ────────────────

function multiDigit(rng: Rng, aDigits: number, label: string): MathProblem {
  const a = randInt(rng, 10 ** (aDigits - 1), 10 ** aDigits - 1)
  const b = randInt(rng, 12, 99)
  const tens = Math.floor(b / 10) * 10, ones = b % 10
  return { ...whole(label, `${fmt(a)} × ${b} = __`, a * b,
    `Split ${b} into ${tens} + ${ones}: ${fmt(a)} × ${tens} = ${fmt(a * tens)}, ${fmt(a)} × ${ones} = ${fmt(a * ones)}. Add them: ${fmt(a * b)}.`), multiplication: true }
}

function fourByTwoDivide(rng: Rng, withRemainder: boolean): MathProblem {
  const d = randInt(rng, 12, 59)
  const q = randInt(rng, Math.ceil(1000 / d), Math.floor(9999 / d))
  const r = withRemainder ? randInt(rng, 1, d - 1) : 0
  const n = d * q + r
  if (n > 9999) return fourByTwoDivide(rng, withRemainder)
  const label = withRemainder ? '4-digit ÷ 2-digit with remainder' : '4-digit ÷ 2-digit'
  const hint = `Estimate with ${d} ≈ ${Math.round(d / 10) * 10}. ${d} × ${q} = ${fmt(d * q)}${r ? `, and ${r} is left over` : ''}.`
  return withRemainder
    ? { ...remainder(label, `${fmt(n)} ÷ ${d} = __`, q, r, hint), multiplication: true }
    : { ...whole(label, `${fmt(n)} ÷ ${d} = __`, q, hint), multiplication: true }
}

// ── fractions (5.NF.1, 5.NF.4) ───────────────────────────────────────────────

function addUnlike(rng: Rng, related: boolean, mixed: boolean): MathProblem {
  let d1: number, d2: number
  if (related) {
    d1 = pick(rng, [2, 3, 4, 5])
    d2 = d1 * pick(rng, [2, 3])
  } else {
    do { d1 = pick(rng, [2, 3, 4, 5, 6]); d2 = pick(rng, [3, 4, 5, 6, 8]) } while (d1 === d2 || d2 % d1 === 0 || d1 % d2 === 0)
  }
  if (rng() < 0.5) [d1, d2] = [d2, d1]
  const n1 = randInt(rng, 1, d1 - 1), n2 = randInt(rng, 1, d2 - 1)
  const w1 = mixed ? randInt(rng, 1, 4) : 0, w2 = mixed ? randInt(rng, 1, 3) : 0
  const L = lcm(d1, d2)
  const A: Frac = { num: (w1 * d1 + n1) * (L / d1), den: L }
  const B: Frac = { num: (w2 * d2 + n2) * (L / d2), den: L }
  const show = (w: number, n: number, d: number) => (w ? `${w} ${n}/${d}` : `${n}/${d}`)
  const label = mixed ? 'mixed numbers, unlike denominators' : related ? 'unlike denominators (one a multiple)' : 'unlike denominators'
  const common = `Make the bottoms match: ${L} works for both. ${n1}/${d1} = ${n1 * (L / d1)}/${L}, ${n2}/${d2} = ${n2 * (L / d2)}/${L}.`
  if (rng() < 0.5 || A.num <= B.num) {
    return fraction(label, `${show(w1, n1, d1)} + ${show(w2, n2, d2)} = __`, { num: A.num + B.num, den: L },
      `${common} Then add the tops.`)
  }
  return fraction(label, `${show(w1, n1, d1)} − ${show(w2, n2, d2)} = __`, { num: A.num - B.num, den: L },
    `${common} Then subtract the tops.`)
}

function fractionTimesWhole(rng: Rng): MathProblem {
  const d = pick(rng, [2, 3, 4, 5, 6, 8, 10])
  const n = randInt(rng, 1, d - 1)
  const w = rng() < 0.6 ? d * randInt(rng, 1, 4) : randInt(rng, 2, 9)
  const ans = simplify({ num: n * w, den: d })
  return { ...fraction('fraction × whole number', `${n}/${d} × ${w} = __`, { num: n * w, den: d },
    `Multiply the top by ${w}: ${n} × ${w} = ${n * w}, keep the bottom: ${n * w}/${d} = ${fracStr(ans, true)}.`), multiplication: true }
}

function fractionTimesFraction(rng: Rng): MathProblem {
  const d1 = pick(rng, [2, 3, 4, 5, 6]), d2 = pick(rng, [2, 3, 4, 5, 6, 8])
  const n1 = randInt(rng, 1, d1 - 1), n2 = randInt(rng, 1, d2 - 1)
  return { ...fraction('fraction × fraction', `${n1}/${d1} × ${n2}/${d2} = __`, { num: n1 * n2, den: d1 * d2 },
    `Top × top and bottom × bottom: ${n1} × ${n2} = ${n1 * n2}, ${d1} × ${d2} = ${d1 * d2}. So ${n1 * n2}/${d1 * d2}.`), multiplication: true }
}

// ── decimals (5.NBT.7) ───────────────────────────────────────────────────────

function decimalAddSub(rng: Rng): MathProblem {
  const a = randInt(rng, 100, 9999) / 100
  let b: number
  // Keep the hundredths different, so the answer isn't a whole number.
  do b = randInt(rng, 10, Math.round(a * 100) - 1) / 100
  while (Math.round(a * 100) % 100 === Math.round(b * 100) % 100)
  if (rng() < 0.5) return decimal('decimal + − to hundredths', `${fmtDec(a)} + ${fmtDec(b)} = __`, a + b,
    `Line up the decimal points (add a 0 if you need to), then add like whole numbers: ${fmtDec(a + b)}.`)
  return decimal('decimal + − to hundredths', `${fmtDec(a)} − ${fmtDec(b)} = __`, a - b,
    `Line up the decimal points (add a 0 if you need to), then subtract like whole numbers: ${fmtDec(a - b)}.`)
}

function decimalTimesWhole(rng: Rng): MathProblem {
  const a = randInt(rng, 11, 999) / 100
  const w = randInt(rng, 2, 9)
  return { ...decimal('decimal × whole number', `${fmtDec(a)} × ${w} = __`, a * w,
    `Multiply as if there were no point: ${Math.round(a * 100)} × ${w} = ${Math.round(a * 100) * w}. Put back 2 decimal places: ${fmtDec(a * w)}.`), multiplication: true }
}

function decimalTimesDecimal(rng: Rng): MathProblem {
  const a = randInt(rng, 2, 49) / 10, b = randInt(rng, 2, 9) / 10
  const A = Math.round(a * 10), B = Math.round(b * 10)
  return { ...decimal('decimal × decimal', `${fmtDec(a)} × ${fmtDec(b)} = __`, a * b,
    `${A} × ${B} = ${A * B}. Each number has 1 decimal place, so the answer has 2: ${fmtDec(a * b)}.`), multiplication: true }
}

function decimalDivideWhole(rng: Rng): MathProblem {
  const w = randInt(rng, 2, 9)
  const q = randInt(rng, 11, 199) / 10
  const n = Math.round(q * w * 10) / 10
  return { ...decimal('decimal ÷ whole number', `${fmtDec(n)} ÷ ${w} = __`, q,
    `Divide like whole numbers, and keep the decimal point in the same place: ${fmtDec(n)} ÷ ${w} = ${fmtDec(q)}.`), multiplication: true }
}

function decimalDivideDecimal(rng: Rng): MathProblem {
  const dv = randInt(rng, 2, 9) / 10
  const q = randInt(rng, 2, 30)
  const n = Math.round(dv * q * 10) / 10
  return { ...decimal('decimal ÷ decimal', `${fmtDec(n)} ÷ ${fmtDec(dv)} = __`, q,
    `Multiply both by 10 so the divisor is whole: ${fmtDec(n * 10)} ÷ ${Math.round(dv * 10)} = ${q}.`), multiplication: true }
}

// ── the zones ────────────────────────────────────────────────────────────────

const skill = (label: string, make: (rng: Rng) => MathProblem, times = false): MathSkill => ({ label, make, times })

export const GRADE5_MATH: ZoneSkills = {
  1: [
    skill('× ÷ by 10, 100, 1,000', powersOfTenWhole, true),
    skill('order of operations, ( )', parentheses),
  ],
  2: [
    skill('3-digit × 2-digit', (r) => multiDigit(r, 3, '3-digit × 2-digit'), true),
    skill('decimal + − to hundredths', decimalAddSub),
    skill('powers of 10 with decimals', (r) => powersOfTenDecimal(r, false), true),
  ],
  3: [
    skill('4-digit ÷ 2-digit', (r) => fourByTwoDivide(r, false), true),
    skill('fraction × whole number', fractionTimesWhole, true),
    skill('decimal × whole number', decimalTimesWhole, true),
  ],
  4: [
    skill('4-digit ÷ 2-digit with remainder', (r) => fourByTwoDivide(r, true), true),
    skill('unlike denominators (one a multiple)', (r) => addUnlike(r, true, false)),
    skill('decimal × decimal', decimalTimesDecimal, true),
  ],
  5: [
    skill('unlike denominators', (r) => addUnlike(r, false, false)),
    skill('fraction × fraction', fractionTimesFraction, true),
    skill('decimal ÷ whole number', decimalDivideWhole, true),
    skill('4-digit × 2-digit', (r) => multiDigit(r, 4, '4-digit × 2-digit'), true),
  ],
  6: [
    skill('mixed numbers, unlike denominators', (r) => addUnlike(r, r() < 0.5, true)),
    skill('nested parentheses', nestedParentheses),
    skill('decimal ÷ decimal', decimalDivideDecimal, true),
    skill('powers of 10 with exponents', (r) => powersOfTenDecimal(r, true), true),
  ],
}
