import { useEffect } from 'react'
import { useGameStore } from './state/store'
import WorldMap from './screens/WorldMap'
import Party from './screens/Party'
import Nav from './components/Nav'

export default function App() {
  const currentScreen = useGameStore((s) => s.currentScreen)
  const load = useGameStore((s) => s.load)

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="h-screen flex flex-col bg-purple-950 text-white max-w-md mx-auto overflow-hidden shadow-2xl">
      <header className="flex-shrink-0 px-4 py-3 bg-purple-900/80 border-b border-purple-800">
        <p className="text-lg font-bold text-yellow-300 tracking-wide">
          🦄 Evelyn's Unicorn Adventure
        </p>
      </header>
      <main className="flex-1 overflow-y-auto">
        {currentScreen === 'worldMap' && <WorldMap />}
        {currentScreen === 'party'    && <Party />}
      </main>
      <Nav />
    </div>
  )
}
