// The reading rules for each grade (DESIGN.md §23) and the checks every
// grade/zone's passages must pass. `npm run check:reading` runs them.
import type { Grade, ReadingPassage, ReadingQuestionType, Zone } from './gradeTypes'

export const PASSAGES_PER_ZONE = 15

interface ZoneRule {
  /** Question types this zone may use. */
  allowed: ReadingQuestionType[]
  /** The ramp: at least `min` passages must ask one of `types`. */
  needs: { types: ReadingQuestionType[]; min: number }[]
}

interface GradeRule {
  words: [number, number]
  /** Average words per sentence, per passage. */
  maxWordsPerSentence: number
  zones: Record<Zone, ZoneRule>
}

const pair = (r: ZoneRule): [ZoneRule, ZoneRule] => [r, r]

function zones(early: ZoneRule, middle: ZoneRule, late: ZoneRule): Record<Zone, ZoneRule> {
  const [z1, z2] = pair(early), [z3, z4] = pair(middle), [z5, z6] = pair(late)
  return { 1: z1, 2: z2, 3: z3, 4: z4, 5: z5, 6: z6 }
}

// Every grade's main question moves recall → two similar facts → inference;
// grades 4 and 5 add their own types on top.
export const READING_RULES: Record<Grade, GradeRule> = {
  3: {
    words: [80, 120],
    maxWordsPerSentence: 11,
    zones: zones(
      { allowed: ['recall'], needs: [{ types: ['recall'], min: 15 }] },
      { allowed: ['recall', 'twoFact'], needs: [{ types: ['twoFact'], min: 8 }] },
      { allowed: ['recall', 'twoFact', 'inference'], needs: [{ types: ['inference'], min: 8 }] },
    ),
  },
  4: {
    words: [120, 180],
    maxWordsPerSentence: 14,
    zones: zones(
      { allowed: ['recall', 'wordMeaning'], needs: [{ types: ['recall'], min: 8 }, { types: ['wordMeaning'], min: 3 }] },
      { allowed: ['recall', 'twoFact', 'wordMeaning', 'mainIdea'], needs: [{ types: ['twoFact'], min: 8 }, { types: ['mainIdea'], min: 3 }] },
      { allowed: ['recall', 'twoFact', 'wordMeaning', 'mainIdea', 'inference'], needs: [{ types: ['inference'], min: 8 }, { types: ['mainIdea'], min: 3 }, { types: ['wordMeaning'], min: 3 }] },
    ),
  },
  5: {
    words: [180, 250],
    maxWordsPerSentence: 18,
    zones: zones(
      { allowed: ['recall', 'twoFact', 'wordMeaning'], needs: [{ types: ['recall', 'twoFact'], min: 8 }, { types: ['wordMeaning'], min: 3 }] },
      { allowed: ['recall', 'twoFact', 'wordMeaning', 'mainIdea', 'compare', 'purpose'], needs: [{ types: ['twoFact', 'compare'], min: 8 }, { types: ['purpose'], min: 3 }] },
      { allowed: ['recall', 'twoFact', 'wordMeaning', 'mainIdea', 'compare', 'purpose', 'inference', 'theme'], needs: [{ types: ['inference', 'theme'], min: 8 }, { types: ['purpose'], min: 2 }, { types: ['compare'], min: 2 }] },
    ),
  },
}

export const wordCount = (text: string) => text.split(/\s+/).filter(Boolean).length

export function sentenceCount(text: string): number {
  return text.split(/[.!?]+["”’]?(?:\s|$)/).filter((s) => s.trim()).length
}

export const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean)

const norm = (s: string) => s.trim().toLowerCase()

/** Everything wrong with one grade/zone's passages; empty means it passes. */
export function checkZone(grade: Grade, zone: Zone, passages: ReadingPassage[]): string[] {
  const rule = READING_RULES[grade]
  const zr = rule.zones[zone]
  const at = (p: ReadingPassage) => `G${grade} Z${zone} "${p.title}"`
  const errors: string[] = []

  if (passages.length !== PASSAGES_PER_ZONE) errors.push(`G${grade} Z${zone}: ${passages.length} passages, needs ${PASSAGES_PER_ZONE}`)

  const titles = new Set<string>()
  for (const p of passages) {
    if (titles.has(norm(p.title))) errors.push(`${at(p)}: title used twice`)
    titles.add(norm(p.title))

    const words = wordCount(p.passage)
    const [lo, hi] = rule.words
    if (words < lo || words > hi) errors.push(`${at(p)}: ${words} words, needs ${lo}–${hi}`)
    const wps = words / sentenceCount(p.passage)
    if (wps > rule.maxWordsPerSentence) errors.push(`${at(p)}: ${wps.toFixed(1)} words per sentence, max ${rule.maxWordsPerSentence}`)

    if (p.questions.length < 1 || p.questions.length > 2) errors.push(`${at(p)}: ${p.questions.length} questions, needs 1–2`)
    for (const q of p.questions) {
      const qa = `${at(p)} "${q.question}"`
      if (!zr.allowed.includes(q.type)) errors.push(`${qa}: type ${q.type} not allowed in this zone`)
      if (q.choices.length < 3 || q.choices.length > 4) errors.push(`${qa}: ${q.choices.length} choices, needs 3–4`)
      if (!Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex >= q.choices.length) errors.push(`${qa}: correctIndex out of range`)
      if (new Set(q.choices.map(norm)).size !== q.choices.length) errors.push(`${qa}: choices repeat`)
      if (q.choices.some((c) => !c.trim())) errors.push(`${qa}: empty choice`)
      if (!q.hint.trim()) errors.push(`${qa}: no hint`)
      if (q.type === 'wordMeaning') {
        const word = q.question.match(/"([^"]+)"/)?.[1]
        if (!word) errors.push(`${qa}: word-meaning question doesn't quote its word`)
        else if (!norm(p.passage).includes(norm(word))) errors.push(`${qa}: "${word}" isn't in the passage`)
      }
    }
  }

  for (const need of zr.needs) {
    const n = passages.filter((p) => p.questions.some((q) => need.types.includes(q.type))).length
    if (n < need.min) errors.push(`G${grade} Z${zone}: ${n} passages ask ${need.types.join('/')}, needs ${need.min}`)
  }

  // No guessing by shape: the right answer mustn't usually be the longest one,
  // nor usually sit in the same spot.
  const qs = passages.flatMap((p) => p.questions)
  const longest = qs.filter((q) => {
    const len = q.choices.map((c) => c.length)
    const mine = len[q.correctIndex]
    return len.every((l, i) => i === q.correctIndex || l < mine)
  }).length
  if (longest > qs.length / 3) errors.push(`G${grade} Z${zone}: the right answer is the longest choice in ${longest} of ${qs.length} questions, max a third`)
  const spots = [0, 0, 0, 0]
  for (const q of qs) spots[q.correctIndex]++
  const most = Math.max(...spots)
  if (most > qs.length * 0.4) errors.push(`G${grade} Z${zone}: ${most} of ${qs.length} right answers are choice ${'ABCD'[spots.indexOf(most)]}, max 40%`)

  return errors
}

export interface ZoneStatus {
  grade: Grade
  zone: Zone
  passages: number
  words: string
  wordsPerSentence: string
  questions: number
  errors: number
}

export function zoneStatus(grade: Grade, zone: Zone, passages: ReadingPassage[]): ZoneStatus {
  const w = passages.map((p) => wordCount(p.passage))
  const s = passages.map((p) => sentenceCount(p.passage))
  const total = w.reduce((a, b) => a + b, 0)
  return {
    grade, zone,
    passages: passages.length,
    words: w.length ? `${Math.min(...w)}–${Math.max(...w)} (avg ${Math.round(total / w.length)})` : '—',
    wordsPerSentence: w.length ? (total / s.reduce((a, b) => a + b, 0)).toFixed(1) : '—',
    questions: passages.reduce((n, p) => n + p.questions.length, 0),
    errors: checkZone(grade, zone, passages).length,
  }
}
