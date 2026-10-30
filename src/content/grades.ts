// The one place problems come from (DESIGN.md §23): every screen asks for a
// problem for (grade, zone, category) and this picks the grade's content.
import type { ComprehensionProblem, LogicProblem, MathProblem } from '../engine/problems'
import { pick } from '../engine/mathKit'
import { RecentlySeenTracker } from '../engine/antiRepeat'
import type { Grade, Zone, ZoneLogic, ZoneReading, ZoneSkills } from './gradeTypes'
import { GRADE3_MATH } from './grade3/math'
import { GRADE4_MATH } from './grade4/math'
import { GRADE5_MATH } from './grade5/math'
import { GRADE3_LOGIC } from './grade3/logic'
import { GRADE4_LOGIC } from './grade4/logic'
import { GRADE5_LOGIC } from './grade5/logic'
import { GRADE3_READING } from './grade3/reading'
import { GRADE4_READING } from './grade4/reading'
import { GRADE5_READING } from './grade5/reading'

export const MATH: Record<Grade, ZoneSkills> = { 3: GRADE3_MATH, 4: GRADE4_MATH, 5: GRADE5_MATH }
export const LOGIC: Record<Grade, ZoneLogic> = { 3: GRADE3_LOGIC, 4: GRADE4_LOGIC, 5: GRADE5_LOGIC }
export const READING: Record<Grade, ZoneReading> = { 3: GRADE3_READING, 4: GRADE4_READING, 5: GRADE5_READING }

export type GradeCategory = 'math' | 'times' | 'logic'
/** Hunts are the quick warm-up: their math comes from one zone lower (§9's "simpler Hunt bands"). */
export type ProblemMode = 'quest' | 'practice' | 'hunt'

export function toZone(n: number): Zone {
  return Math.max(1, Math.min(6, Math.round(n))) as Zone
}

// One tracker per grade and zone, so the same logic format doesn't come up twice in a row.
const trackers = new Map<string, RecentlySeenTracker>()
function freshIndex(key: string, size: number, rng: () => number): number {
  let t = trackers.get(key)
  if (!t) trackers.set(key, (t = new RecentlySeenTracker(size)))
  return t.pickFresh(Array.from({ length: size }, (_, i) => i), rng)
}

export function mathFor(grade: Grade, zone: number, mode: ProblemMode, rng: () => number = Math.random, timesOnly = false): MathProblem {
  const z = toZone(mode === 'hunt' ? zone - 1 : zone)
  const skills = MATH[grade][z].filter((s) => !timesOnly || s.times)
  return pick(rng, skills).make(rng)
}

export function logicFor(grade: Grade, zone: number, rng: () => number = Math.random): LogicProblem {
  const formats = LOGIC[grade][toZone(zone)]
  return formats[freshIndex(`${grade}:${toZone(zone)}`, formats.length, rng)].make(rng)
}

/** One question about one of the zone's passages; the same passage doesn't recur until the zone's 15 have cycled. */
export function readingFor(grade: Grade, zone: number, rng: () => number = Math.random): ComprehensionProblem {
  const z = toZone(zone)
  const passages = READING[grade][z]
  const p = passages[freshIndex(`reading:${grade}:${z}`, passages.length, rng)]
  const q = pick(rng, p.questions)
  return { type: 'comprehension', passage: p.passage, question: q.question, choices: q.choices, correctIndex: q.correctIndex, hint: q.hint }
}

export function problemFor(grade: Grade, zone: number, category: GradeCategory, mode: ProblemMode, rng: () => number = Math.random): MathProblem | LogicProblem {
  if (category === 'logic') return logicFor(grade, zone, rng)
  return mathFor(grade, zone, mode, rng, category === 'times')
}
