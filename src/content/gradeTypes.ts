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
