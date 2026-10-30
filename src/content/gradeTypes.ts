// The shape every grade's content folder fills in (DESIGN.md §23).
import type { MathProblem, LogicProblem } from '../engine/problems'

export const GRADES = [3, 4, 5] as const
export type Grade = typeof GRADES[number]
export type Zone = 1 | 2 | 3 | 4 | 5 | 6

export function isGrade(x: unknown): x is Grade {
  return x === 3 || x === 4 || x === 5
}

export interface MathSkill {
  /** What it practices, in plain words (shown in DESIGN.md and the samples file). */
  label: string
  make: (rng: () => number) => MathProblem
  /** Served by the Times Tables focus: the grade's multiplication and division work. */
  times: boolean
}

/** Each zone's skills, easiest zone first. A math problem picks one at random. */
export type ZoneSkills = Record<Zone, MathSkill[]>

export interface LogicFormat {
  label: string
  make: (rng: () => number) => LogicProblem
}

/** Each zone's logic formats, at that grade's settings. */
export type ZoneLogic = Record<Zone, LogicFormat[]>

/** What a reading question asks for (§23's ramp decides which a grade and zone may use). */
export type ReadingQuestionType =
  | 'recall'      // one fact the passage states
  | 'twoFact'     // tell apart two similar facts the passage states
  | 'inference'   // something the passage shows but doesn't say
  | 'mainIdea'
  | 'wordMeaning' // a word's meaning from context; the word is quoted in the question
  | 'compare'     // how two details are alike or different
  | 'purpose'     // why the author wrote it, or wrote a part of it
  | 'theme'

export interface ReadingQuestion {
  type: ReadingQuestionType
  question: string
  choices: string[]
  correctIndex: number
  hint: string
}

export interface ReadingPassage {
  title: string
  /** Paragraphs are separated by a blank line. */
  passage: string
  /** 1–2; each time the passage is served, one is picked at random. */
  questions: ReadingQuestion[]
}

/** Each zone's 15 passages. */
export type ZoneReading = Record<Zone, ReadingPassage[]>
