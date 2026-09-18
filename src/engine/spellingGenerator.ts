import type { SpellingProblem } from './problems'
import { SPELLING_BANK } from '../content/spellingBank'
import { RecentlySeenTracker } from './antiRepeat'
import { bandForDifficulty } from './difficulty'

/**
 * Fisher-Yates shuffle of a word's letters, guaranteed not to come back in the
 * original order (which would hand her the answer for free).
 *
 * A word whose letters are all identical can't be rearranged into anything else,
 * so the retry loop is bounded and falls through to the original order rather
 * than spinning forever. No word in the bank hits that case.
 */
export function scrambleWord(word: string, rng: () => number = Math.random): string[] {
  const letters = word.split('')
  if (new Set(letters).size < 2) return letters

  for (let attempt = 0; attempt < 20; attempt++) {
    const out = [...letters]
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1))
      ;[out[i], out[j]] = [out[j], out[i]]
    }
    if (out.join('') !== word) return out
  }
  // Fallback: a deterministic derangement-ish rotation, still never the original.
  return [...letters.slice(1), letters[0]]
}

// One anti-repeat tracker per band, sized from that band's actual word count so
// the whole pool cycles before anything repeats. Derived, not hardcoded —
// growing the bank must not silently shrink the window.
const trackers = new Map<number, RecentlySeenTracker>()
function trackerFor(band: number, poolSize: number): RecentlySeenTracker {
  let t = trackers.get(band)
  if (!t) {
    t = new RecentlySeenTracker(poolSize)
    trackers.set(band, t)
  }
  return t
}

export function generateSpellingProblem(
  difficulty: number,
  rng: () => number = Math.random,
): SpellingProblem {
  const band = bandForDifficulty(difficulty) as 1 | 2 | 3 | 4 | 5 | 6
  const bandEntries = SPELLING_BANK.filter(e => e.zone === band)

  const ids = bandEntries.map((_, i) => i)
  const idx = trackerFor(band, bandEntries.length).pickFresh(ids, rng)
  const entry = bandEntries[idx]

  return {
    type: 'spelling',
    word:      entry.word,
    scrambled: scrambleWord(entry.word, rng),
    sentence:  entry.sentence,
    hint:      entry.hint,
  }
}
