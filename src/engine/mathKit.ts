// Shared helpers for the grade math skills (DESIGN.md §23): random numbers,
// formatting, fraction arithmetic, problem builders, and the answer checkers
// ProblemCard uses. Pure functions, no content.
import type { MathAnswer, MathProblem } from './problems'

export type Rng = () => number

export function randInt(rng: Rng, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1))
}

export function pick<T>(rng: Rng, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)]
}

export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** 4527 → "4,527". Numbers under 1,000 stay plain. `always` is kept for callers that want it explicit. */
export function fmt(n: number, always = false): string {
  if (!always && Math.abs(n) < 1_000) return String(n)
  return n.toLocaleString('en-US')
}

/** A decimal with no float noise: 0.1 + 0.2 → "0.3". */
export function fmtDec(n: number): string {
  return String(Math.round(n * 1e6) / 1e6)
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

export function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b
}

export interface Frac { num: number; den: number }

export function simplify(f: Frac): Frac {
  const g = gcd(f.num, f.den)
  return { num: f.num / g, den: f.den / g }
}

/** "3/4", or "1 1/4" for an improper fraction when `mixed`. */
export function fracStr(f: Frac, mixed = false): string {
  if (mixed && f.num >= f.den) {
    const whole = Math.floor(f.num / f.den)
    const rest = f.num % f.den
    return rest === 0 ? String(whole) : `${whole} ${rest}/${f.den}`
  }
  return `${f.num}/${f.den}`
}

// ── problem builders ─────────────────────────────────────────────────────────

export function whole(skill: string, prompt: string, value: number, hint: string): MathProblem {
  return { type: 'math', skill, prompt, answer: { kind: 'number', value }, hint }
}

export function decimal(skill: string, prompt: string, value: number, hint: string): MathProblem {
  return { type: 'math', skill, prompt, answer: { kind: 'decimal', value: Math.round(value * 1e6) / 1e6 }, hint }
}

export function fraction(skill: string, prompt: string, f: Frac, hint: string): MathProblem {
  return { type: 'math', skill, prompt, answer: { kind: 'fraction', num: f.num, den: f.den }, hint }
}

export function remainder(skill: string, prompt: string, quotient: number, rem: number, hint: string): MathProblem {
  return { type: 'math', skill, prompt, answer: { kind: 'remainder', quotient, remainder: rem }, hint }
}

/** A pick-one question. `wrong` are built from common mistakes; duplicates of the answer are dropped. */
export function choice(skill: string, prompt: string, correct: string, wrong: string[], rng: Rng, hint: string): MathProblem {
  const distinct = [...new Set(wrong.filter((w) => w !== correct))]
  const choices = shuffle([correct, ...distinct], rng)
  return { type: 'math', skill, prompt, answer: { kind: 'choice', choices, correctIndex: choices.indexOf(correct) }, hint }
}

/** The three-button compare question: "3/8 __ 5/8". */
export function compare(skill: string, left: string, right: string, l: number, r: number, hint: string): MathProblem {
  const choices = ['<', '=', '>']
  const correctIndex = l < r ? 0 : l === r ? 1 : 2
  return { type: 'math', skill, prompt: `${left}  __  ${right}`, answer: { kind: 'choice', choices, correctIndex }, hint }
}

// ── answer checking ──────────────────────────────────────────────────────────

/** Read a typed number: commas, spaces and a leading + are ignored. NaN if it isn't one. */
export function parseTyped(text: string, allowDecimal: boolean): number {
  const t = text.replace(/[,\s]/g, '').replace(/^\+/, '')
  const ok = allowDecimal ? /^-?(\d+\.?\d*|\.\d+)$/.test(t) : /^-?\d+$/.test(t)
  return ok ? Number(t) : NaN
}

export type AnswerEntry =
  | { kind: 'text'; text: string }
  | { kind: 'remainder'; quotient: string; remainder: string }
  | { kind: 'fraction'; whole: string; num: string; den: string }
  | { kind: 'choice'; index: number }

export function checkAnswer(answer: MathAnswer, entry: AnswerEntry): boolean {
  switch (answer.kind) {
    case 'number':
      return entry.kind === 'text' && parseTyped(entry.text, false) === answer.value
    case 'decimal': {
      if (entry.kind !== 'text') return false
      const v = parseTyped(entry.text, true)
      return Number.isFinite(v) && Math.abs(v - answer.value) < 1e-9
    }
    case 'remainder':
      return entry.kind === 'remainder' &&
        parseTyped(entry.quotient, false) === answer.quotient &&
        parseTyped(entry.remainder || '0', false) === answer.remainder
    case 'fraction': {
      if (entry.kind !== 'fraction') return false
      const w = entry.whole.trim() === '' ? 0 : parseTyped(entry.whole, false)
      const n = entry.num.trim() === '' ? 0 : parseTyped(entry.num, false)
      const d = entry.den.trim() === '' ? 1 : parseTyped(entry.den, false)
      if (!Number.isInteger(w) || !Number.isInteger(n) || !Number.isInteger(d) || d <= 0 || w < 0 || n < 0) return false
      // Typed value (w·d + n)/d equals num/den when the cross products match.
      return (w * d + n) * answer.den === answer.num * d
    }
    case 'choice':
      return entry.kind === 'choice' && entry.index === answer.correctIndex
  }
}

/** The answer as it would be written, for hints and the samples file. */
export function answerText(answer: MathAnswer): string {
  switch (answer.kind) {
    case 'number':    return fmt(answer.value)
    case 'decimal':   return answer.value.toLocaleString('en-US', { maximumFractionDigits: 6 })
    case 'fraction':  return fracStr(simplify(answer), true)
    case 'remainder': return `${fmt(answer.quotient)} R ${answer.remainder}`
    case 'choice':    return answer.choices[answer.correctIndex]
  }
}
