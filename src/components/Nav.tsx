import { useGameStore } from '../state/store'
import type { Screen } from '../state/store'

const TABS: Array<{ screen: Screen; label: string; icon: string }> = [
  { screen: 'worldMap', label: 'World Map', icon: '🗺️' },
  { screen: 'party',    label: 'Party',     icon: '🦄' },
]

export default function Nav() {
  const currentScreen = useGameStore((s) => s.currentScreen)
  const setScreen = useGameStore((s) => s.setScreen)

  return (
    <nav className="flex border-t border-purple-800 bg-purple-900/90 backdrop-blur-sm flex-shrink-0">
      {TABS.map(({ screen, label, icon }) => (
        <button
          key={screen}
          onClick={() => setScreen(screen)}
          className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
            currentScreen === screen
              ? 'text-yellow-300'
              : 'text-purple-400 hover:text-purple-200'
          }`}
        >
          <span className="text-xl">{icon}</span>
          <span className="text-xs font-medium">{label}</span>
        </button>
      ))}
    </nav>
  )
}
