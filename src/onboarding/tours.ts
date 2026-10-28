// Onboarding tours (DESIGN.md §22). Every caption lives here, not in the
// components; a component only marks the element a step points at with
// data-tour="<target>". Keep captions to one short sentence in simple words:
// the players are young kids reading on a tablet.

export const TOUR_IDS = ['intro', 'battle'] as const
export type TourId = typeof TOUR_IDS[number]

export function isTourId(x: unknown): x is TourId {
  return typeof x === 'string' && (TOUR_IDS as readonly string[]).includes(x)
}

export interface TourStep {
  /** The data-tour value to light up. Absent → a centered card with nothing lit. */
  target?: string
  caption: string
}

export const TOURS: Record<TourId, TourStep[]> = {
  // The World Map, the first time a new game reaches it.
  intro: [
    { caption: "Welcome, Trainer! Let's look around." },
    { target: 'map-first-land',    caption: 'Tap a land to find puzzle quests.' },
    { target: 'map-first-explore', caption: 'Tap Explore to hunt wild ponies.' },
    { target: 'map-badges',        caption: 'Win badges to open new lands.' },
    { target: 'nav-party',         caption: 'Your ponies live here. Pick your team!' },
    { target: 'nav-trophies',      caption: 'See your trophies and Stardust here.' },
    { target: 'help-button',       caption: 'Stuck? Tap ? for help on any screen.' },
  ],
  // The first time it is her turn in any battle.
  battle: [
    { target: 'battle-team',    caption: 'These are your ponies. Glowing ones are ready.' },
    { target: 'battle-enemies', caption: 'Tap a glowing pony, then tap an enemy.' },
    { target: 'battle-enemies', caption: 'Some elements beat others. "Super!" means a big hit.' },
    { target: 'battle-hp',      caption: "This is HP. Make every enemy's HP zero to win!" },
  ],
}
