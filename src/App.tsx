import { useGameStore } from './state/store'
import CharacterCreation from './screens/CharacterCreation'
import SlotPicker from './screens/SlotPicker'
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
import HelpButton from './onboarding/HelpButton'
import TourOverlay from './onboarding/TourOverlay'
import { useScratchLayout, SCRATCH_SIDE_WIDTH, SCRATCH_BOTTOM_SHARE } from './scratch/scratchLayout'
import type { ScratchLayout } from './scratch/scratchLayout'

// Full-screen layouts have no header, so the help button floats in the same
// top-right corner the header puts it in.
const FLOATING_HELP: React.CSSProperties = {
  position: 'fixed',
  top:   'calc(env(safe-area-inset-top) + 8px)',
  right: 'calc(env(safe-area-inset-right) + 8px)',
  zIndex: 40,
}

// Room for open scratch paper (§24): in landscape the content moves into the
// space beside the panel; in portrait it gets enough extra scroll to lift the
// answer box above the panel.
function scratchRoom(layout: ScratchLayout | null): React.CSSProperties | undefined {
  if (layout === 'side')   return { paddingRight: `calc(${SCRATCH_SIDE_WIDTH} + env(safe-area-inset-right))` }
  if (layout === 'bottom') return { paddingBottom: `calc(${SCRATCH_BOTTOM_SHARE * 100}vh + env(safe-area-inset-bottom))`, overflowY: 'auto' }
  return undefined
}

// Immersive full-screen experiences (no header/nav chrome).
const FULLSCREEN_SCREENS = new Set(['provingGlade', 'trial', 'champion', 'gameComplete', 'exploreHunt'])

export default function App() {
  const playerName    = useGameStore((s) => s.playerName)
  const currentScreen = useGameStore((s) => s.currentScreen)
  const awaitingStarter = useGameStore((s) => s.awaitingStarter)
  const activeSlot    = useGameStore((s) => s.activeSlot)
  const stardust      = useGameStore((s) => s.stardust)
  const setScreen     = useGameStore((s) => s.setScreen)
  const scratchLayout = useScratchLayout((s) => s.layout)

  // Either a brand-new player, or a prestige run waiting on this journey's starter.
  const isCreating   = playerName === '' || awaitingStarter
  const isFullscreen = isCreating || FULLSCREEN_SCREENS.has(currentScreen)

  if (activeSlot === null) {
    return (
      <div className="app-height w-full safe-top safe-bottom safe-x bg-purple-950 text-white overflow-hidden">
        <SlotPicker />
        <HelpButton style={FLOATING_HELP} />
      </div>
    )
  }

  if (isFullscreen) {
    return (
      <div className="app-height w-full safe-top safe-bottom safe-x bg-purple-950 text-white overflow-hidden" style={scratchRoom(scratchLayout)}>
        {isCreating                          ? <CharacterCreation /> :
         currentScreen === 'provingGlade'    ? <ProvingGlade /> :
         currentScreen === 'trial'           ? <Trial /> :
         currentScreen === 'champion'        ? <Champion /> :
         currentScreen === 'exploreHunt'     ? <ExploreHunt /> :
         currentScreen === 'gameComplete'    ? <GameComplete /> : null}
        {/* The floating button would sit on the scratch paper's Done button. */}
        {scratchLayout === null && <HelpButton style={FLOATING_HELP} />}
        <AchievementToast />
        <TourOverlay />
      </div>
    )
  }

  return (
    <div className="app-height w-full safe-x flex flex-col bg-purple-950 text-white overflow-hidden">
      <header className="flex-shrink-0 safe-top bg-purple-900/80 border-b border-purple-800">
        <div className="pl-6 pr-2 py-1 flex items-center gap-3">
          <p className="text-base font-bold text-yellow-300 tracking-wide truncate">
            🦄 Evelyn's Unicorn Adventure
          </p>
          <button
            onClick={() => setScreen('trophies')}
            className="ml-auto flex-shrink-0 text-sm font-bold text-amber-200 bg-black/30 rounded-full px-3 py-0.5"
            aria-label={`${stardust} Stardust — open Trophies`}
          >
            ✨ {stardust}
          </button>
          <HelpButton />
        </div>
      </header>
      <main className="flex-1 min-h-0 overflow-y-auto" style={scratchRoom(scratchLayout)}>
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
      <TourOverlay />
    </div>
  )
}
