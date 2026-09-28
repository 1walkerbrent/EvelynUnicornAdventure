import { useEffect } from 'react'
import { useGameStore } from './state/store'
import CharacterCreation from './screens/CharacterCreation'
import WorldMap from './screens/WorldMap'
import ZoneView from './screens/ZoneView'
import Quest from './screens/Quest'
import ProvingGlade from './screens/ProvingGlade'
import Trial from './screens/Trial'
import Champion from './screens/Champion'
import GameComplete from './screens/GameComplete'
import ExploreHub from './screens/ExploreHub'
import ExplorePractice from './screens/ExplorePractice'
import ExploreHunt from './screens/ExploreHunt'
import Party from './screens/Party'
import Trophies from './screens/Trophies'
import Moonwell from './screens/Moonwell'
import Nav from './components/Nav'
import AchievementToast from './components/AchievementToast'

// Immersive full-screen experiences (no header/nav chrome).
const FULLSCREEN_SCREENS = new Set(['provingGlade', 'trial', 'champion', 'gameComplete', 'exploreHunt'])

export default function App() {
  const playerName    = useGameStore((s) => s.playerName)
  const currentScreen = useGameStore((s) => s.currentScreen)
  const awaitingStarter = useGameStore((s) => s.awaitingStarter)
  const load          = useGameStore((s) => s.load)
  const stardust      = useGameStore((s) => s.stardust)
  const setScreen     = useGameStore((s) => s.setScreen)

  useEffect(() => {
    load()
  }, [load])

  // Either a brand-new player, or a prestige run waiting on this journey's starter.
  const isCreating   = playerName === '' || awaitingStarter
  const isFullscreen = isCreating || FULLSCREEN_SCREENS.has(currentScreen)

  if (isFullscreen) {
    return (
      <div className="app-height w-full safe-top safe-bottom safe-x bg-purple-950 text-white overflow-hidden">
        {isCreating                          ? <CharacterCreation /> :
         currentScreen === 'provingGlade'    ? <ProvingGlade /> :
         currentScreen === 'trial'           ? <Trial /> :
         currentScreen === 'champion'        ? <Champion /> :
         currentScreen === 'exploreHunt'     ? <ExploreHunt /> :
         currentScreen === 'gameComplete'    ? <GameComplete /> : null}
        <AchievementToast />
      </div>
    )
  }

  return (
    <div className="app-height w-full safe-x flex flex-col bg-purple-950 text-white overflow-hidden">
      <header className="flex-shrink-0 safe-top bg-purple-900/80 border-b border-purple-800">
        <div className="px-6 py-2 flex items-center justify-between gap-3">
          <p className="text-base font-bold text-yellow-300 tracking-wide truncate">
            🦄 Evelyn's Unicorn Adventure
          </p>
          <button
            onClick={() => setScreen('trophies')}
            className="flex-shrink-0 text-sm font-bold text-amber-200 bg-black/30 rounded-full px-3 py-0.5"
            aria-label={`${stardust} Stardust — open Trophies`}
          >
            ✨ {stardust}
          </button>
        </div>
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto">
        {currentScreen === 'worldMap'        && <WorldMap />}
        {currentScreen === 'zone'            && <ZoneView />}
        {currentScreen === 'quest'           && <Quest />}
        {currentScreen === 'exploreHub'      && <ExploreHub />}
        {currentScreen === 'explorePractice' && <ExplorePractice />}
        {currentScreen === 'party'           && <Party />}
        {currentScreen === 'trophies'        && <Trophies />}
        {currentScreen === 'moonwell'        && <Moonwell />}
      </main>
      <Nav />
      <AchievementToast />
    </div>
  )
}
