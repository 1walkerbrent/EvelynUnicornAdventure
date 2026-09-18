import { useState } from 'react'
import { useGameStore } from '../state/store'
import { CHAMPION_SPECIES } from '../content/creatures'
import { levelCapForBadges } from '../engine/leveling'
import { prestigeParty } from '../engine/prestige'
import CreatureSprite from './CreatureSprite'

// §15 New Game+ entry point, shown on the world map once the Champion is beaten.
//
// Starting over erases five badges of progress and every pony but the trophies,
// and there is no undo — so it is deliberately a TWO-step confirm: screen one
// spells out exactly what is kept and what is lost, screen two makes her say
// yes a second time. Nothing happens until the final button.
export default function PrestigeDialog({ onClose }: { onClose: () => void }) {
  const party         = useGameStore((s) => s.party)
  const prestigeCount = useGameStore((s) => s.prestigeCount)
  const prestige      = useGameStore((s) => s.prestige)

  const [step, setStep] = useState<'explain' | 'confirm'>('explain')

  const freshCap = levelCapForBadges(0)
  const kept     = prestigeParty(party, freshCap)
  const lost     = party.length - kept.length
  const journey  = prestigeCount + 2   // the run she is about to start

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm max-h-full overflow-y-auto bg-purple-950 border-2 border-amber-400/60
                      rounded-3xl p-5 space-y-4 shadow-2xl">
        {step === 'explain' ? (
          <>
            <div className="text-center space-y-1">
              <div className="text-5xl">✨</div>
              <h2 className="text-2xl font-bold text-amber-300">Start a New Journey?</h2>
              <p className="text-purple-300 text-sm">
                You'd begin <span className="text-white font-semibold">Journey {journey}</span> from
                the very beginning.
              </p>
            </div>

            <div className="bg-green-900/30 border border-green-500/40 rounded-2xl p-3 space-y-2">
              <p className="text-green-300 font-bold text-sm">✅ You KEEP</p>
              <div className="flex items-center gap-3">
                {kept.length > 0 && (
                  <CreatureSprite
                    element={CHAMPION_SPECIES.element}
                    color={CHAMPION_SPECIES.spritePlaceholderColor}
                    size={44}
                    speciesId={CHAMPION_SPECIES.id}
                  />
                )}
                <ul className="text-purple-100 text-sm space-y-0.5">
                  <li>
                    <span className="font-semibold">
                      {kept.length > 1 ? `${kept.length} Aurelunes` : 'Aurelune'}
                    </span>
                    , your champion {kept.length > 1 ? 'trophies' : 'trophy'}
                  </li>
                  <li>Your name and your journey count</li>
                </ul>
              </div>
              <p className="text-purple-400 text-xs">
                She comes with you at level {freshCap}, so the adventure stays a fair challenge —
                but she's still legendary.
              </p>
            </div>

            <div className="bg-red-900/30 border border-red-500/40 rounded-2xl p-3 space-y-1">
              <p className="text-red-300 font-bold text-sm">⚠️ You START OVER</p>
              <ul className="text-purple-100 text-sm space-y-0.5 list-disc list-inside">
                <li>All <span className="font-semibold">5 badges</span></li>
                <li>
                  Your other <span className="font-semibold">{lost} {lost === 1 ? 'pony' : 'ponies'}</span> stay behind
                </li>
                <li>Every zone locks again</li>
                <li>Your level cap goes back to {freshCap}</li>
              </ul>
              <p className="text-purple-400 text-xs pt-1">
                You'll choose a brand-new starter pony to travel with!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setStep('confirm')}
                className="w-full bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold py-4
                           rounded-2xl text-lg transition-colors"
              >
                Yes, tell me more →
              </button>
              <button
                onClick={onClose}
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-xl
                           font-medium transition-colors"
              >
                Never mind, keep playing
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="text-5xl">🤔</div>
              <h2 className="text-2xl font-bold text-red-300">Are you really sure?</h2>
              <p className="text-purple-200 text-sm px-1">
                This <span className="text-red-300 font-bold">cannot be undone</span>. Your{' '}
                {lost} {lost === 1 ? 'pony' : 'ponies'} and all 5 badges will be gone for good.
              </p>
              <p className="text-purple-300 text-sm px-1">
                Only <span className="text-amber-300 font-semibold">Aurelune</span> comes with you.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => { prestige(); onClose() }}
                className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-4
                           rounded-2xl text-lg transition-colors"
              >
                Start Journey {journey} ✨
              </button>
              <button
                onClick={() => setStep('explain')}
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-xl
                           font-medium transition-colors"
              >
                ← Go back
              </button>
              <button
                onClick={onClose}
                className="w-full text-purple-400 hover:text-purple-300 text-sm py-2"
              >
                Cancel and keep playing
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
