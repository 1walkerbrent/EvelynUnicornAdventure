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
import Nav from './components/Nav'

// Immersive full-screen experiences (no header/nav chrome).
const FULLSCREEN_SCREENS = new Set(['provingGlade', 'trial', 'champion', 'gameComplete', 'exploreHunt'])

export default function App() {
  const playerName    = useGameStore((s) => s.playerName)
  const currentScreen = useGameStore((s) => s.currentScreen)
  const load          = useGameStore((s) => s.load)

  useEffect(() => {
    load()
  }, [load])

  const isCreating   = playerName === ''
  const isFullscreen = isCreating || FULLSCREEN_SCREENS.has(currentScreen)

  if (isFullscreen) {
    return (
      <div className="h-screen w-screen bg-purple-950 text-white overflow-hidden">
        {isCreating                          ? <CharacterCreation /> :
         currentScreen === 'provingGlade'    ? <ProvingGlade /> :
         currentScreen === 'trial'           ? <Trial /> :
         currentScreen === 'champion'        ? <Champion /> :
         currentScreen === 'exploreHunt'     ? <ExploreHunt /> :
         currentScreen === 'gameComplete'    ? <GameComplete /> : null}
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-purple-950 text-white overflow-hidden">
      <header className="flex-shrink-0 px-6 py-2 bg-purple-900/80 border-b border-purple-800">
        <p className="text-base font-bold text-yellow-300 tracking-wide">
          🦄 Evelyn's Unicorn Adventure
        </p>
      </header>
      <main className="flex-1 overflow-y-auto">
        {currentScreen === 'worldMap'        && <WorldMap />}
        {currentScreen === 'zone'            && <ZoneView />}
        {currentScreen === 'quest'           && <Quest />}
        {currentScreen === 'exploreHub'      && <ExploreHub />}
        {currentScreen === 'explorePractice' && <ExplorePractice />}
        {currentScreen === 'party'           && <Party />}
      </main>
      <Nav />
    </div>
  )
}
