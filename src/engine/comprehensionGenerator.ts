import type { ComprehensionProblem } from './problems'
import { COMPREHENSION_BANK } from '../content/comprehensionBank'
import { RecentlySeenTracker } from './antiRepeat'
import { bandForDifficulty } from './difficulty'

// One anti-repeat tracker per zone so the same passage doesn't recur until the
// zone's pool of 15 has cycled.
const trackers = new Map<number, RecentlySeenTracker>()
function trackerFor(zone: number): RecentlySeenTracker {
  let t = trackers.get(zone)
  if (!t) {
    t = new RecentlySeenTracker(15)
    trackers.set(zone, t)
  }
  return t
}

export function generateComprehensionProblem(
  difficulty: number,
  rng: () => number = Math.random,
): ComprehensionProblem {
  const band = bandForDifficulty(difficulty) as 1 | 2 | 3 | 4 | 5 | 6
  const zoneEntries = COMPREHENSION_BANK.filter(e => e.zone === band)

  const ids = zoneEntries.map((_, i) => i)
  const idx = trackerFor(band).pickFresh(ids, rng)
  const entry = zoneEntries[idx]

  return {
    type: 'comprehension',
    passage:      entry.passage,
    question:     entry.question,
    choices:      entry.choices,
    correctIndex: entry.correctIndex,
    hint:         entry.hint,
  }
}
