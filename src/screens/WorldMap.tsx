import { useGameStore } from '../state/store'
import type { Screen } from '../state/store'

interface AreaNode {
  screen: Screen
  name: string
  description: string
  icon: string
  done: boolean
  available: boolean
}

export default function WorldMap() {
  const brindlewoodDone = useGameStore((s) => s.brindlewoodDone)
  const sunflowerDone   = useGameStore((s) => s.sunflowerDone)
  const zone1Complete   = useGameStore((s) => s.zone1Complete)
  const zone2Unlocked   = useGameStore((s) => s.zone2Unlocked)
  const setScreen       = useGameStore((s) => s.setScreen)

  const nodes: AreaNode[] = [
    {
      screen:      'areaBrindlewood',
      name:        'Brindlewood Home',
      description: brindlewoodDone
        ? 'Clover Dewdrop joined your party!'
        : 'Help a pony in the clover field',
      icon:      '🍀',
      done:      brindlewoodDone,
      available: true,
    },
    {
      screen:      'areaSunflower',
      name:        'Sunflower Hollow',
      description: sunflowerDone
        ? 'Tangerine Twirl joined your party!'
        : 'Follow the hoofprints to the flowers',
      icon:      '🌻',
      done:      sunflowerDone,
      available: brindlewoodDone,
    },
    {
      screen:      'provingGlade',
      name:        'Proving Glade',
      description: zone1Complete
        ? 'Zone 1 complete — you beat Pip!'
        : 'Battle rival trainer Pip!',
      icon:      '⚔️',
      done:      zone1Complete,
      available: sunflowerDone,
    },
  ]

  return (
    <div className="p-4 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Zone 1 — Brindlewood</h2>
        <p className="text-purple-400 text-sm mt-1">Your adventure begins here.</p>
      </div>

      {/* Zone 1 area nodes */}
      <div className="space-y-2">
        {nodes.map((node, idx) => {
          const isAvail = node.available && !node.done

          return (
            <div key={node.screen}>
              <button
                disabled={!node.available}
                onClick={() => isAvail ? setScreen(node.screen) : undefined}
                className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-colors text-left ${
                  node.done
                    ? 'bg-green-900/30 border border-green-700/40 cursor-default'
                    : isAvail
                      ? 'bg-purple-900/70 hover:bg-purple-800 active:bg-purple-700 cursor-pointer'
                      : 'bg-purple-950/50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl">{node.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold ${node.done ? 'text-green-300' : 'text-white'}`}>
                    {node.name}
                  </div>
                  <div className="text-purple-400 text-sm">{node.description}</div>
                </div>
                <div className="text-xl ml-auto">
                  {node.done ? '✅' : isAvail ? '›' : '🔒'}
                </div>
              </button>

              {/* Connector arrow between nodes */}
              {idx < nodes.length - 1 && (
                <div className="flex justify-center text-purple-700 text-lg my-1">↓</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Zone 2 preview */}
      <div
        className={`rounded-2xl p-4 border ${
          zone2Unlocked
            ? 'bg-amber-900/30 border-amber-700/40'
            : 'bg-purple-950/30 border-purple-800/30 opacity-40'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">🌍</div>
          <div>
            <div className="text-white font-bold text-sm">
              Zone 2 — Earth
            </div>
            <div className="text-purple-400 text-xs">
              {zone2Unlocked
                ? 'Unlocked! Coming in M2.'
                : 'Defeat Pip in the Proving Glade to unlock.'}
            </div>
          </div>
          <div className="ml-auto text-lg">{zone2Unlocked ? '🔓' : '🔒'}</div>
        </div>
      </div>
    </div>
  )
}
