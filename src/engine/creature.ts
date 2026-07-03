// Per-creature instance identity (§ instance IDs).
//
// Every Creature carries a stable `id` that distinguishes individuals, even two
// of the SAME species (breeding / New Game+ can produce duplicates). speciesId
// still drives art, stats, element, and display name — `id` only tells two
// individuals apart. The id is generated once at creation and never changes.
export function newCreatureId(): string {
  return 'c_' + Math.random().toString(36).slice(2, 10)
}
