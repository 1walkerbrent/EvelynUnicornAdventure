// Grade 4 math by zone (DESIGN.md §23): place value to 1,000,000, multi-digit
// × and ÷ (with remainders), factors and multiples, equivalent fractions,
// like-denominator fraction sums, and comparing decimals.
import type { MathProblem } from '../../engine/problems'
import type { Rng } from '../../engine/mathKit'
import { randInt, pick, fmt, whole, fraction, remainder, choice, compare, fmtDec } from '../../engine/mathKit'
import type { MathSkill, ZoneSkills } from '../gradeTypes'

// ── + and − with big numbers (4.NBT.4) ───────────────────────────────────────

/** Both numbers have `digits` digits; subtraction always leaves a positive answer. */
export function bigAddSub(rng: Rng, digits: number, label: string): MathProblem {
  const lo = 10 ** (digits - 1)
  const hi = 10 ** digits - 1
  if (rng() < 0.5) {
    const a = randInt(rng, lo, hi - lo)
    const b = randInt(rng, lo, Math.min(hi - a, hi))
    return whole(label, `${fmt(a)} + ${fmt(b)} = __`, a + b, `Line up the places and add from the ones, carrying when a column makes 10 or more. ${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}`)
  }
  const a = randInt(rng, lo * 2, hi)
  const b = randInt(rng, lo, a - lo)
  return whole(label, `${fmt(a)} − ${fmt(b)} = __`, a - b, `Line up the places and subtract from the ones, borrowing when the top digit is smaller. ${fmt(a)} − ${fmt(b)} = ${fmt(a - b)}`)
}

// ── multiplying (4.NBT.5) ────────────────────────────────────────────────────

function multiDigitByOne(rng: Rng, minDigits: number, maxDigits: number, label: string): MathProblem {
  const digits = randInt(rng, minDigits, maxDigits)
  const a = randInt(rng, 10 ** (digits - 1), 10 ** digits - 1)
  const b = randInt(rng, 2, 9)
  const parts = String(a).split('').reverse().map((d, i) => Number(d) * 10 ** i).filter((p) => p > 0).reverse()
  return { ...whole(label, `${fmt(a)} × ${b} = __`, a * b,
    `Break ${fmt(a)} into places: ${parts.map((p) => `${fmt(p)} × ${b} = ${fmt(p * b)}`).join(', ')}. Add them: ${fmt(a * b)}`), multiplication: true }
}

function twoByTwo(rng: Rng): MathProblem {
  const a = randInt(rng, 12, 99)
  const b = randInt(rng, 12, 99)
  const tens = Math.floor(b / 10) * 10
  const ones = b % 10
  return { ...whole('2-digit × 2-digit', `${a} × ${b} = __`, a * b,
    `Split ${b} into ${tens} + ${ones}: ${a} × ${tens} = ${a * tens}, ${a} × ${ones} = ${a * ones}. Add them: ${a * b}`), multiplication: true }
}

// ── dividing with remainders (4.NBT.6) ───────────────────────────────────────

function divideWithRemainder(rng: Rng, digits: number, label: string): MathProblem {
  const d = randInt(rng, 2, 9)
  const n = randInt(rng, 10 ** (digits - 1), 10 ** digits - 1)
  const q = Math.floor(n / d)
  const r = n % d
  return { ...remainder(label, `${fmt(n)} ÷ ${d} = __`, q, r,
    `How many ${d}s fit in ${fmt(n)}? ${d} × ${fmt(q)} = ${fmt(d * q)}, and ${fmt(n)} − ${fmt(d * q)} = ${r} left over. So it's ${fmt(q)} R ${r}.`), multiplication: true }
}

// ── factors and multiples (4.OA.4) ───────────────────────────────────────────

const FACTOR_TARGETS = [12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 54, 56, 60, 63, 64, 72, 80, 81, 84, 90, 96]

function factorsOf(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1).filter((k) => n % k === 0)
}

function whichIsFactor(rng: Rng): MathProblem {
  const n = pick(rng, FACTOR_TARGETS)
  const factors = factorsOf(n).filter((f) => f > 1 && f < n)
  const right = pick(rng, factors)
  // Near misses: one more or less than a real factor, and numbers that share digits with n.
  const wrong = new Set<number>()
  for (let tries = 0; wrong.size < 3 && tries < 50; tries++) {
    const w = pick(rng, [right + 1, right - 1, pick(rng, factors) + 1, randInt(rng, 2, 12), n % 10 + 2])
    if (w > 1 && w < n && n % w !== 0) wrong.add(w)
  }
  return { ...choice('which is a factor', `Which number is a factor of ${n}?`, String(right), [...wrong].map(String), rng,
    `A factor divides ${n} with nothing left over. Try ${n} ÷ each one.`), multiplication: true }
}

function whichIsMultiple(rng: Rng): MathProblem {
  const n = randInt(rng, 3, 12)
  const k = randInt(rng, 3, 12)
  const right = n * k
  // Wrong answers are close to the right one or to other multiples, but not multiples.
  const wrong = new Set<number>()
  for (let tries = 0; wrong.size < 3 && tries < 50; tries++) {
    const w = right + pick(rng, [-2, -1, 1, 2, n + 1, n - 1])
    if (w > 0 && w % n !== 0) wrong.add(w)
  }
  return { ...choice('which is a multiple', `Which number is a multiple of ${n}?`, String(right), [...wrong].map(String), rng,
    `A multiple of ${n} is in the ${n} times table: count by ${n}s, or check which one ÷ ${n} has no remainder.`), multiplication: true }
}

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

function primeOrComposite(rng: Rng): MathProblem {
  const prime = rng() < 0.5
  const n = prime ? pick(rng, PRIMES.filter((p) => p > 5)) : pick(rng, [21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93])
  const factor = prime ? 0 : factorsOf(n).find((f) => f > 1)!
  // Always Prime then Composite, so the buttons don't move between questions.
  return {
    type: 'math', skill: 'prime or composite', prompt: `Is ${n} prime or composite?`,
    answer: { kind: 'choice', choices: ['Prime', 'Composite'], correctIndex: prime ? 0 : 1 },
    hint: prime ? `${n} has only two factors, 1 and ${n}, so it's prime.` : `${n} = ${factor} × ${n / factor}, so it has more than two factors: composite.`,
    multiplication: true,
  }
}

function factorsAndMultiples(rng: Rng): MathProblem {
  const r = rng()
  return r < 0.4 ? whichIsFactor(rng) : r < 0.8 ? whichIsMultiple(rng) : primeOrComposite(rng)
}

// ── fractions (4.NF.1, 4.NF.3) ───────────────────────────────────────────────

const DENOMS = [2, 3, 4, 5, 6, 8, 10, 12]

function equivalentMissing(rng: Rng): MathProblem {
  const d = pick(rng, [2, 3, 4, 5, 6])
  const n = randInt(rng, 1, d - 1)
  const k = randInt(rng, 2, 5)
  if (rng() < 0.5) {
    return whole('equivalent fractions', `${n}/${d} = __/${d * k}`, n * k,
      `${d} × ${k} = ${d * k}, so multiply the top by ${k} too: ${n} × ${k} = ${n * k}.`)
  }
  // Wrong answers: same top number, or the same amount added to top and bottom.
  const right = `${n * k}/${d * k}`
  const wrong = [`${n}/${d * k}`, `${n + k}/${d + k}`, `${n * k}/${d + k}`, `${n * k + 1}/${d * k}`]
  return choice('equivalent fractions', `Which fraction is equal to ${n}/${d}?`, right, wrong.slice(0, 3), rng,
    `Multiply the top AND the bottom by the same number. ${n}/${d} = ${n} × ${k} over ${d} × ${k}.`)
}

function likeDenominators(rng: Rng): MathProblem {
  const d = pick(rng, DENOMS)
  const a = randInt(rng, 1, d - 1)
  if (rng() < 0.5) {
    const b = randInt(rng, 1, d - 1)
    return fraction('+ − like denominators', `${a}/${d} + ${b}/${d} = __`, { num: a + b, den: d },
      `Same bottom number, so add the tops: ${a} + ${b} = ${a + b}. Keep the bottom: ${a + b}/${d}.`)
  }
  const top = randInt(rng, 2, d)
  const b = randInt(rng, 1, top - 1)
  return fraction('+ − like denominators', `${top}/${d} − ${b}/${d} = __`, { num: top - b, den: d },
    `Same bottom number, so subtract the tops: ${top} − ${b} = ${top - b}. Keep the bottom: ${top - b}/${d}.`)
}

function mixedLike(rng: Rng): MathProblem {
  const d = pick(rng, [3, 4, 5, 6, 8, 10])
  const w1 = randInt(rng, 1, 5), n1 = randInt(rng, 1, d - 1)
  const w2 = randInt(rng, 1, 4), n2 = randInt(rng, 1, d - 1)
  const A = w1 * d + n1, B = w2 * d + n2
  if (rng() < 0.5 || A <= B) {
    return fraction('mixed numbers, like denominators', `${w1} ${n1}/${d} + ${w2} ${n2}/${d} = __`, { num: A + B, den: d },
      `Add the wholes (${w1} + ${w2}) and the fractions (${n1}/${d} + ${n2}/${d}). If the fraction makes a whole, carry it.`)
  }
  return fraction('mixed numbers, like denominators', `${w1} ${n1}/${d} − ${w2} ${n2}/${d} = __`, { num: A - B, den: d },
    n1 >= n2
      ? `Subtract the wholes (${w1} − ${w2}) and the fractions (${n1}/${d} − ${n2}/${d}).`
      : `${n1}/${d} is less than ${n2}/${d}, so trade one whole for ${d}/${d} first: ${w1} ${n1}/${d} = ${w1 - 1} ${n1 + d}/${d}.`)
}

// ── comparing decimals (4.NF.7) ──────────────────────────────────────────────

function compareTenths(rng: Rng): MathProblem {
  const a = randInt(rng, 1, 19) / 10
  const b = rng() < 0.2 ? a : randInt(rng, 1, 19) / 10
  // Sometimes write one side in hundredths (0.5 vs 0.50) so "=" comes up.
  const right = a === b && rng() < 0.6 ? b.toFixed(2) : fmtDec(b)
  return compare('compare decimals to tenths', fmtDec(a), right, a, b,
    `Compare the ones, then the tenths. A zero on the end doesn't change a decimal: 0.5 = 0.50.`)
}

function compareHundredths(rng: Rng): MathProblem {
  // The classic mistake is "longer is bigger" (0.45 > 0.5), so pair a tenths and a hundredths number often.
  const a = randInt(rng, 1, 99) / 100
  const b = rng() < 0.5 ? randInt(rng, 1, 9) / 10 : randInt(rng, 1, 99) / 100
  return compare('compare decimals to hundredths', fmtDec(a), fmtDec(b), a, b,
    `Write both with two places (0.5 = 0.50), then compare like whole numbers: tenths first, then hundredths.`)
}

// ── the zones ────────────────────────────────────────────────────────────────

const skill = (label: string, make: (rng: Rng) => MathProblem, times = false): MathSkill => ({ label, make, times })

export const GRADE4_MATH: ZoneSkills = {
  1: [
    skill('+ and − to 10,000', (r) => bigAddSub(r, 4, '+ and − to 10,000')),
    skill('which is a factor', whichIsFactor, true),
  ],
  2: [
    skill('+ and − to 100,000', (r) => bigAddSub(r, 5, '+ and − to 100,000')),
    skill('2–3 digit × 1-digit', (r) => multiDigitByOne(r, 2, 3, '2–3 digit × 1-digit'), true),
    skill('which is a multiple', whichIsMultiple, true),
  ],
  3: [
    skill('+ and − to 1,000,000', (r) => bigAddSub(r, 6, '+ and − to 1,000,000')),
    skill('4-digit × 1-digit', (r) => multiDigitByOne(r, 4, 4, '4-digit × 1-digit'), true),
    skill('3-digit ÷ 1-digit with remainder', (r) => divideWithRemainder(r, 3, '3-digit ÷ 1-digit with remainder'), true),
    skill('equivalent fractions', equivalentMissing),
  ],
  4: [
    skill('2-digit × 2-digit', twoByTwo, true),
    skill('4-digit ÷ 1-digit with remainder', (r) => divideWithRemainder(r, 4, '4-digit ÷ 1-digit with remainder'), true),
    skill('+ − fractions, like denominators', likeDenominators),
  ],
  5: [
    skill('compare decimals to tenths', compareTenths),
    skill('mixed numbers, like denominators', mixedLike),
    skill('factors, multiples, primes', factorsAndMultiples, true),
  ],
  6: [
    skill('compare decimals to hundredths', compareHundredths),
    skill('+ and − to 1,000,000', (r) => bigAddSub(r, 6, '+ and − to 1,000,000')),
    skill('2-digit × 2-digit', twoByTwo, true),
    skill('4-digit ÷ 1-digit with remainder', (r) => divideWithRemainder(r, 4, '4-digit ÷ 1-digit with remainder'), true),
    skill('mixed numbers, like denominators', mixedLike),
  ],
}
