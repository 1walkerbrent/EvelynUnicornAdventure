import { useGameStore } from '../state/store'
import { ZONES } from '../content/zones'
import { CHAMPION } from '../content/guardians'
import { isZoneUnlocked, isZoneComplete, isChampionUnlocked } from '../engine/progression'

const ELEMENT_ICON: Record<string, string> = {
  neutral: '🏡', earth: '🪨', water: '💧', fire: '🔥', air: '💨', spirit: '✨',
}

export default function WorldMap() {
  const areasDone        = useGameStore((s) => s.areasDone)
  const badges           = useGameStore((s) => s.badges)
  const championDefeated = useGameStore((s) => s.championDefeated)
  const openZone         = useGameStore((s) => s.openZone)
  const openExplore      = useGameStore((s) => s.openExplore)
  const setScreen        = useGameStore((s) => s.setScreen)

  const championOpen = isChampionUnlocked(areasDone)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-yellow-300">World Map</h2>
          <p className="text-purple-400 text-sm">Travel the regions and prove yourself.</p>
        </div>
        <div className="text-right">
          <div className="text-yellow-300 font-bold text-lg">🏅 {badges}/5</div>
          <div className="text-purple-400 text-xs">badges</div>
        </div>
      </div>

      <div className="space-y-2">
        {ZONES.map((zone, idx) => {
          const unlocked = isZoneUnlocked(areasDone, zone.id)
          const complete = isZoneComplete(areasDone, zone.id)
          const prevName = idx > 0 ? ZONES[idx - 1].name.split('—').pop()?.trim() : ''

          return (
            <div key={zone.id}>
              <div className={`rounded-2xl overflow-hidden ${
                unlocked
                  ? complete ? 'bg-green-900/30 border border-green-700/40' : 'bg-purple-900/70'
                  : 'bg-purple-950/50 opacity-50'
              }`}>
                <button
                  disabled={!unlocked}
                  onClick={() => unlocked ? openZone(zone.id) : undefined}
                  className={`w-full p-4 flex items-center gap-4 transition-colors text-left ${
                    unlocked
                      ? complete ? 'hover:bg-green-900/40 cursor-pointer' : 'hover:bg-purple-800 active:bg-purple-700 cursor-pointer'
                      : 'cursor-not-allowed'
                  }`}
                >
                  <div className="text-3xl">{ELEMENT_ICON[zone.element] ?? '🌍'}</div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold ${complete ? 'text-green-300' : 'text-white'}`}>{zone.name}</div>
                    <div className="text-purple-400 text-sm">
                      {unlocked
                        ? complete ? 'Cleared — revisit any time' : 'Ready to explore'
                        : `Win the ${prevName} Trial to unlock`}
                    </div>
                  </div>
                  <div className="text-xl ml-auto">{complete ? '✅' : unlocked ? '›' : '🔒'}</div>
                </button>
                {unlocked && (
                  <button
                    onClick={() => openExplore(zone.id)}
                    className="w-full px-4 py-2 border-t border-white/10 text-sky-300 hover:bg-sky-900/30 active:bg-sky-800/30 text-sm font-medium transition-colors text-left"
                  >
                    🔍 Explore — Practice or Hunt
                  </button>
                )}
              </div>
              {idx < ZONES.length - 1 && (
                <div className="flex justify-center text-purple-700 text-lg my-1">↓</div>
              )}
            </div>
          )
        })}

        {/* Champion node (post-Zone 6) */}
        <div className="flex justify-center text-purple-700 text-lg my-1">↓</div>
        <button
          disabled={!championOpen}
          onClick={() => championOpen ? setScreen('champion') : undefined}
          className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-colors text-left border ${
            championDefeated
              ? 'bg-amber-900/40 border-amber-500/50 cursor-pointer'
              : championOpen
                ? 'bg-amber-900/30 border-amber-700/50 hover:bg-amber-900/50 cursor-pointer animate-pulse'
                : 'bg-purple-950/40 border-purple-800/30 opacity-50 cursor-not-allowed'
          }`}
        >
          <div className="text-3xl">👑</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-amber-200">{CHAMPION.name}</div>
            <div className="text-purple-300 text-sm">
              {championDefeated
                ? 'Champion defeated — you did it! 🎉'
                : championOpen ? 'The final challenge awaits!' : 'Clear Zone 6 to challenge the Champion'}
            </div>
          </div>
          <div className="text-xl ml-auto">{championDefeated ? '🏆' : championOpen ? '›' : '🔒'}</div>
        </button>
      </div>
    </div>
  )
}
