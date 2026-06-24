import { useEffect } from 'react'
import { useGameStore } from './state/store'
import CharacterCreation from './screens/CharacterCreation'
import WorldMap from './screens/WorldMap'
import AreaBrindlewood from './screens/AreaBrindlewood'
import AreaSunflower from './screens/AreaSunflower'
import ProvingGlade from './screens/ProvingGlade'
import Party from './screens/Party'
import Nav from './components/Nav'

export default function App() {
  const playerName    = useGameStore((s) => s.playerName)
  const currentScreen = useGameStore((s) => s.currentScreen)
  const load          = useGameStore((s) => s.load)

  useEffect(() => {
    load()
  }, [load])

  const isCreating = playerName === ''
  // Proving Glade is its own immersive full-screen experience (no chrome)
  const isFullscreen = isCreating || currentScreen === 'provingGlade'

  if (isFullscreen) {
    return (
      <div className="h-screen w-screen bg-purple-950 text-white overflow-hidden">
        {isCreating ? <CharacterCreation /> : <ProvingGlade />}
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
        {currentScreen === 'areaBrindlewood' && <AreaBrindlewood />}
        {currentScreen === 'areaSunflower'   && <AreaSunflower />}
        {currentScreen === 'party'           && <Party />}
      </main>
      <Nav />
    </div>
  )
}
