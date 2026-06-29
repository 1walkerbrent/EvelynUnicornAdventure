// Tracks recently-used template ids so the same one can't repeat until the pool cycles.
// Window size = poolSize - 1, guaranteeing every other template appears before a repeat.
export class RecentlySeenTracker {
  private seen: number[] = []
  private readonly maxSeen: number

  constructor(poolSize: number) {
    this.maxSeen = Math.max(1, poolSize - 1)
  }

  pickFresh(ids: number[], rng: () => number): number {
    const fresh = ids.filter(id => !this.seen.includes(id))
    const pool = fresh.length > 0 ? fresh : ids
    const chosen = pool[Math.floor(rng() * pool.length)]
    this.seen.push(chosen)
    if (this.seen.length > this.maxSeen) this.seen.shift()
    return chosen
  }
}
