import type { Creature, Element } from './types'
import { getTypeMultiplier, getCounterElement } from './combat'
import { SPECIES_BY_ID } from '../content/creatures'

// ── Hybrid active-team model (M2e + ordering) ────────────────────────────────
//
// The party keeps a persistent "active team" of up to 3 ponies that fight every
// battle (Trials and Hunts). Benched ponies still share XP — benching is never a
// punishment. Team-picking is only surfaced when she has MORE than 3 ponies; with
// 3 or fewer everyone fights.
//
// The active team IS AN ORDERED LIST — the player sets a preferred attack order
// in TeamPicker (slot 1, 2, 3) that determines which of her ponies acts first,
// second, and third within each player phase. Enemy turn order remains Speed-based.

export const MAX_ACTIVE_TEAM = 3
/** Losses to one Guardian before the recommended-team safety net appears (Trials). */
export const RECOMMEND_AFTER_LOSSES = 3

export type Matchup = 'strong' | 'weak' | 'neutral'

function elementOf(c: Creature): Element | undefined {
  return SPECIES_BY_ID[c.speciesId]?.element
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Default active team = her 3 highest-level ponies (so it's never empty). */
export function defaultActiveTeam(party: Creature[]): string[] {
  return [...party]
    .sort((a, b) => b.level - a.level)
    .slice(0, MAX_ACTIVE_TEAM)
    .map((c) => c.speciesId)
}

/** Only show the picker once she has more ponies than fit on a team. */
export function shouldShowPicker(party: Creature[]): boolean {
  return party.length > MAX_ACTIVE_TEAM
}

/**
 * The Creatures that actually fight. With ≤3 ponies everyone fights and the
 * stored selection is ignored; otherwise the active set is used (valid members
 * only), falling back to the default top-3 if the stored set is unusable.
 */
export function resolveBattleTeam(party: Creature[], activeTeam: string[]): Creature[] {
  if (party.length <= MAX_ACTIVE_TEAM) return party
  const valid = activeTeam
    .map((id) => party.find((c) => c.speciesId === id))
    .filter((c): c is Creature => !!c)
    .slice(0, MAX_ACTIVE_TEAM)
  if (valid.length === MAX_ACTIVE_TEAM) return valid
  return defaultActiveTeam(party)
    .map((id) => party.find((c) => c.speciesId === id))
    .filter((c): c is Creature => !!c)
}

// ── Type matchup helpers (reuse the existing multiplier — no new combat math) ──

export function matchupVsElement(ponyEl: Element, oppEl: Element): Matchup {
  const m = getTypeMultiplier(ponyEl, oppEl)
  return m === 2 ? 'strong' : m === 0.5 ? 'weak' : 'neutral'
}

export function matchupForCreature(c: Creature, oppEl: Element): Matchup | null {
  const el = elementOf(c)
  return el ? matchupVsElement(el, oppEl) : null
}

// ── Recommended team (3-loss safety net, Trials only) ────────────────────────

export interface RecommendCounter {
  kind: 'recommend'
  /** speciesIds of the suggested team (up to 3). */
  team: string[]
  /** Kid-friendly reason, e.g. "Earth beats Water!". */
  reason: string
  counterElement: Element
}

export interface RecommendHunt {
  kind: 'hunt'
  team: null
  counterElement: Element
  message: string
}

export type Recommendation = RecommendCounter | RecommendHunt

/**
 * Recommend a team against a Guardian's element.
 *  - COUNTER EXISTS: pick the best 3 (Strong matchups first, then highest level).
 *  - NO COUNTER: recommend NO team; point her to Hunt the counter element first.
 */
export function recommendTeamVsElement(party: Creature[], oppEl: Element): Recommendation {
  const counter = getCounterElement(oppEl)
  const hasStrong = party.some((c) => matchupForCreature(c, oppEl) === 'strong')

  if (!hasStrong) {
    return {
      kind: 'hunt',
      team: null,
      counterElement: counter,
      message: `None of your ponies are strong against ${cap(oppEl)}. Try hunting a ${cap(counter)} pony first!`,
    }
  }

  const ranked = [...party].sort((a, b) => {
    const sa = matchupForCreature(a, oppEl) === 'strong' ? 1 : 0
    const sb = matchupForCreature(b, oppEl) === 'strong' ? 1 : 0
    if (sa !== sb) return sb - sa
    return b.level - a.level
  })

  return {
    kind: 'recommend',
    team: ranked.slice(0, MAX_ACTIVE_TEAM).map((c) => c.speciesId),
    reason: `${cap(counter)} beats ${cap(oppEl)}!`,
    counterElement: counter,
  }
}

// ── Per-Guardian loss streak (persisted; reset only on a win) ─────────────────

export function bumpStreak(
  streaks: Record<string, number>,
  guardianId: string,
): Record<string, number> {
  return { ...streaks, [guardianId]: (streaks[guardianId] ?? 0) + 1 }
}

export function clearStreak(
  streaks: Record<string, number>,
  guardianId: string,
): Record<string, number> {
  return { ...streaks, [guardianId]: 0 }
}

export function shouldRecommend(streaks: Record<string, number>, guardianId: string): boolean {
  return (streaks[guardianId] ?? 0) >= RECOMMEND_AFTER_LOSSES
}
