export interface MathProblem {
  type: 'math'
  prompt: string
  correctAnswer: number
  hint: string
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
