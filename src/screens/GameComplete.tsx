import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import CreatureSprite from '../components/CreatureSprite'
import gameCompleteBg from '../assets/backgrounds/game-complete.jpg'

export default function GameComplete() {
  const playerName = useGameStore((s) => s.playerName)
  const party      = useGameStore((s) => s.party)
  const setScreen  = useGameStore((s) => s.setScreen)

  return (
    <div className="h-full w-full overflow-y-auto relative">
      <img src={gameCompleteBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 min-h-full flex flex-col items-center justify-center p-6 space-y-5 text-center">
        <div className="text-6xl">🏆👑🎉</div>
        <h1 className="text-3xl font-bold text-amber-300">You're the Champion, {playerName || 'Trainer'}!</h1>
        <p className="text-purple-200 max-w-sm">
          You bonded with your ponies, mastered the type wheel, and bested Grand Champion Vesper.
          The legendary <span className="text-amber-300 font-semibold">Aurelune</span> now travels at your side.
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          {party.map((c, i) => {
            const sp = SPECIES_BY_ID[c.speciesId]
            if (!sp) return null
            return (
              <div key={`${c.speciesId}-${i}`} className="flex flex-col items-center gap-1">
                <CreatureSprite element={sp.element} color={c.accentColor ?? sp.spritePlaceholderColor} size={56} />
                <span className="text-purple-200 text-xs font-medium">{c.nickname}</span>
                <span className="text-purple-400 text-[10px]">Lv.{c.level}</span>
              </div>
            )
          })}
        </div>

        <p className="text-purple-400 text-sm italic">More adventures (and New Game+) are coming soon!</p>

        <button onClick={() => setScreen('worldMap')}
          className="bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold px-8 py-4 rounded-2xl text-lg transition-colors">
          Back to the World 🗺️
        </button>
      </div>
    </div>
  )
}
