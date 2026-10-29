/**
 * How a math answer is entered and checked (DESIGN.md §23). Anything she
 * computes is typed; only questions that ask her to pick (compare, "which is a
 * factor", "which fraction is equal") are multiple choice, so she can't guess
 * her way through the arithmetic.
 */
export type MathAnswer =
  | { kind: 'number'; value: number }
  /** Checked by value, so 0.5 and 0.50 both count. */
  | { kind: 'decimal'; value: number }
  /** Any equal fraction counts (2/4 for 1/2), improper or as a mixed number. */
  | { kind: 'fraction'; num: number; den: number }
  | { kind: 'remainder'; quotient: number; remainder: number }
  | { kind: 'choice'; choices: string[]; correctIndex: number }

export interface MathProblem {
  type: 'math'
  prompt: string
  answer: MathAnswer
  hint: string
  /** Which grade skill made it, for tests and the samples file. */
  skill?: string
  /** Set on multiplication facts, so achievements can count them (§19). */
  multiplication?: true
}

export interface LogicProblem {
  type: 'logic'
  prompt: string
  choices: string[]
  correctIndex: number
  hint: string
}

export interface ComprehensionProblem {
  type: 'comprehension'
  passage: string
  question: string
  choices: string[]
  correctIndex: number
  hint: string
}

export interface SpellingProblem {
  type: 'spelling'
  /** The target word, lowercase a-z. */
  word: string
  /** The word's letters in scrambled order. The INDEX is a tile's identity, so
   *  words with repeated letters ("pebble") still have distinguishable tiles. */
  scrambled: string[]
  /** Read aloud on demand for context — never shown as text (that would spoil it). */
  sentence: string
  hint: string
}

export type Problem = MathProblem | LogicProblem | ComprehensionProblem | SpellingProblem
