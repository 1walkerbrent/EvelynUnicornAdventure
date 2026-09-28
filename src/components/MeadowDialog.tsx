import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { resolveBattleTeam } from '../engine/team'
import { releaseBlockReason, releaseValue } from '../engine/hatching'
import type { Creature } from '../engine/types'
import CreatureSprite from './CreatureSprite'

// The Pony Meadow (§20): send a pony off to live happily in the meadow, and it
// leaves Stardust behind as thanks. Two taps: choose, then confirm. Trophies,
// the battle team and her last pony can't go.

export default function MeadowDialog({ onClose }: { onClose: () => void }) {
  const party      = useGameStore((s) => s.party)
  const activeTeam = useGameStore((s) => s.activeTeam)
  const release    = useGameStore((s) => s.release)

  const [chosen, setChosen]   = useState<Creature | null>(null)
  const [farewell, setFarewell] = useState<{ name: string; paid: number } | null>(null)

  const activeIds = new Set(resolveBattleTeam(party, activeTeam).map((c) => c.id))
  const canGo  = party.filter((c) => !releaseBlockReason(c, party, activeIds))
  const staying = party.length - canGo.length

  function confirm() {
    if (!chosen?.id) return
    const name = chosen.nickname || SPECIES_BY_ID[chosen.speciesId]?.name
    const paid = release(chosen.id)
    if (paid > 0) setFarewell({ name, paid })
    setChosen(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm max-h-full overflow-y-auto bg-purple-950 border-2 border-green-400/50
                      rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="text-center">
          <div className="text-4xl">🌼</div>
          <h3 className="text-xl font-bold text-green-200">The Pony Meadow</h3>
          <p className="text-purple-300 text-sm">
            A sunny meadow where ponies play all day. A pony who moves here leaves you Stardust as a thank-you!
          </p>
        </div>

        {farewell && (
          <p className="bg-green-900/40 border border-green-500/40 rounded-2xl p-3 text-center text-sm text-green-100">
            🌈 {farewell.name} is off to play in the meadow! <b className="text-amber-200">+{farewell.paid} ✨</b>
          </p>
        )}

        {chosen ? (
          <Confirm pony={chosen} onYes={confirm} onNo={() => setChosen(null)} />
        ) : canGo.length === 0 ? (
          <p className="text-center text-purple-300 text-sm py-4">
            No ponies can move to the meadow right now. Your battle team and trophy ponies always stay with you.
          </p>
        ) : (
          <div className="space-y-2">
            {canGo.map((c) => {
              const sp = SPECIES_BY_ID[c.speciesId]
              return (
                <button
                  key={c.id}
                  onClick={() => { setChosen(c); setFarewell(null) }}
                  className="w-full flex items-center gap-3 bg-purple-900/60 hover:bg-purple-800/70 rounded-2xl p-2.5 text-left"
                >
                  <CreatureSprite element={sp.element} speciesId={sp.id} variant={c.variant} size={40} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-white font-semibold truncate">{c.nickname || sp.name}</span>
                    <span className="block text-purple-300 text-xs capitalize">{sp.element} · Lv.{c.level}</span>
                  </span>
                  <span className="text-amber-200 text-sm font-bold">+{releaseValue(c)} ✨</span>
                </button>
              )
            })}
          </div>
        )}

        {staying > 0 && !chosen && (
          <p className="text-center text-purple-400 text-xs">
            {staying} {staying === 1 ? 'pony stays' : 'ponies stay'} with you (battle team and trophies).
          </p>
        )}

        <button onClick={onClose} className="w-full bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-2xl font-semibold">
          Done
        </button>
      </div>
    </div>
  )
}

function Confirm({ pony, onYes, onNo }: { pony: Creature; onYes: () => void; onNo: () => void }) {
  const sp = SPECIES_BY_ID[pony.speciesId]
  const name = pony.nickname || sp.name
  return (
    <div className="bg-purple-900/60 rounded-2xl p-4 space-y-3 text-center">
      <div className="flex justify-center">
        <CreatureSprite element={sp.element} speciesId={sp.id} variant={pony.variant} size={72} />
      </div>
      <p className="text-white font-semibold">Send {name} to the meadow?</p>
      <p className="text-purple-300 text-xs">
        {name} will be happy there, but won't come back to your party. You'll get <b className="text-amber-200">+{releaseValue(pony)} ✨</b>.
      </p>
      <div className="flex gap-2">
        <button onClick={onNo} className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-2.5 rounded-xl font-semibold">
          Keep {name}
        </button>
        <button onClick={onYes} className="flex-1 bg-green-500 hover:bg-green-400 text-green-950 py-2.5 rounded-xl font-bold">
          Say goodbye 👋
        </button>
      </div>
    </div>
  )
}
