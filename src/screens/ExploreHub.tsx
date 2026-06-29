import { useGameStore } from '../state/store'
import { ZONE_BY_ID } from '../content/zones'

// Explore entry point (§8): the player explicitly chooses PRACTICE (learn/level,
// no pony) or HUNT (battle to tame). Two clear pillars, not a random roll.
export default function ExploreHub() {
  const selectedZoneId = useGameStore((s) => s.selectedZoneId)
  const setScreen      = useGameStore((s) => s.setScreen)

  const zone = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const regionName = zone ? zone.name.split('—').pop()?.trim() : 'this region'

  return (
    <div className="p-4 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Explore {regionName}</h2>
        <p className="text-purple-400 text-sm mt-1">Choose how you'd like to explore.</p>
      </div>

      <button
        onClick={() => setScreen('explorePractice')}
        className="w-full bg-sky-900/60 hover:bg-sky-800/70 active:bg-sky-700/70 border border-sky-600/40 rounded-2xl p-5 flex items-center gap-4 transition-colors text-left"
      >
        <div className="text-4xl">🧮</div>
        <div className="flex-1">
          <div className="text-white font-bold text-lg">Practice</div>
          <div className="text-purple-300 text-sm">
            Solve problems to train your team — earn XP and level up. No limit!
          </div>
        </div>
        <span className="text-purple-300 text-2xl">›</span>
      </button>

      <button
        onClick={() => setScreen('exploreHunt')}
        className="w-full bg-rose-900/50 hover:bg-rose-800/60 active:bg-rose-700/60 border border-rose-600/40 rounded-2xl p-5 flex items-center gap-4 transition-colors text-left"
      >
        <div className="text-4xl">🦄</div>
        <div className="flex-1">
          <div className="text-white font-bold text-lg">Hunt</div>
          <div className="text-purple-300 text-sm">
            Battle a wild pony — win to add it to your party!
          </div>
        </div>
        <span className="text-purple-300 text-2xl">›</span>
      </button>

      <button
        onClick={() => setScreen('worldMap')}
        className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors"
      >
        ← Back to World Map
      </button>
    </div>
  )
}
