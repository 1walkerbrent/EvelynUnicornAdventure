import { useState } from 'react'
import type { Creature, Element } from '../engine/types'
import { SPECIES_BY_ID } from '../content/creatures'
import { getStats } from '../engine/stats'
import { matchupVsElement, MAX_ACTIVE_TEAM } from '../engine/team'
import CreatureSprite from './CreatureSprite'

// Team picker (M2e + ordering): choose exactly 3 ponies and arrange their
// attack order. Slot 1 attacks first each round, slot 2 second, slot 3 third.
// The player can tap a pony to add/remove it from the team, then use ▲▼ buttons
// in the "Attack Order" section to reorder the three chosen ponies.
interface Props {
  party: Creature[]
  initialSelection: string[]
  opponentElement?: Element
  onConfirm: (speciesIds: string[]) => void
  onCancel: () => void
}

export default function TeamPicker({ party, initialSelection, opponentElement, onConfirm, onCancel }: Props) {
  const [selected, setSelected] = useState<string[]>(
    initialSelection.filter((id) => party.some((c) => c.speciesId === id)).slice(0, MAX_ACTIVE_TEAM),
  )

  function toggle(speciesId: string) {
    setSelected((prev) => {
      if (prev.includes(speciesId)) return prev.filter((id) => id !== speciesId)
      if (prev.length >= MAX_ACTIVE_TEAM) return prev
      return [...prev, speciesId]
    })
  }

  function moveUp(index: number) {
    if (index <= 0) return
    setSelected((prev) => {
      const next = [...prev]
      ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
      return next
    })
  }

  function moveDown(index: number) {
    setSelected((prev) => {
      if (index >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
      return next
    })
  }

  const isComplete = selected.length === MAX_ACTIVE_TEAM

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-purple-950 rounded-3xl w-full max-w-md max-h-[90vh] flex flex-col shadow-2xl border border-purple-700/40">
        <div className="p-4 pb-2">
          <h2 className="text-xl font-bold text-yellow-300">Choose your team</h2>
          <p className="text-purple-300 text-sm">
            Pick {MAX_ACTIVE_TEAM} ponies.{' '}
            <span className="text-purple-400">Attack order matters — slot 1 attacks first!</span>
          </p>
        </div>

        {/* Attack order — shown when at least one pony is selected */}
        {selected.length > 0 && (
          <div className="mx-4 mb-2 bg-purple-900/60 rounded-2xl p-3">
            <p className="text-xs font-semibold text-yellow-300 mb-2 uppercase tracking-wide">
              ⚔️ Attack Order
            </p>
            <div className="space-y-1.5">
              {selected.map((id, i) => {
                const c = party.find((p) => p.speciesId === id)
                const sp = c ? SPECIES_BY_ID[c.speciesId] : null
                if (!c || !sp) return null
                return (
                  <div key={id} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-yellow-400 text-purple-950 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <CreatureSprite
                      element={sp.element}
                      color={c.accentColor ?? sp.spritePlaceholderColor}
                      size={28}
                    />
                    <span className="flex-1 text-sm font-semibold text-white truncate">
                      {c.nickname || sp.name}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveUp(i)}
                        disabled={i === 0}
                        aria-label="Move up"
                        className={
                          'w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ' +
                          (i === 0
                            ? 'text-purple-700 bg-purple-900/30'
                            : 'text-white bg-purple-700 hover:bg-purple-600')
                        }
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveDown(i)}
                        disabled={i === selected.length - 1}
                        aria-label="Move down"
                        className={
                          'w-7 h-7 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ' +
                          (i === selected.length - 1
                            ? 'text-purple-700 bg-purple-900/30'
                            : 'text-white bg-purple-700 hover:bg-purple-600')
                        }
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                )
              })}
              {selected.length < MAX_ACTIVE_TEAM && (
                <p className="text-purple-500 text-xs italic pl-7">
                  Pick {MAX_ACTIVE_TEAM - selected.length} more below…
                </p>
              )}
            </div>
          </div>
        )}

        {/* Full party list — tap to add / remove */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {party.map((c) => {
            const sp = SPECIES_BY_ID[c.speciesId]
            if (!sp) return null
            const stats = getStats(sp.tier, c.level, c.ivs)
            const isSel = selected.includes(c.speciesId)
            const slotNum = selected.indexOf(c.speciesId) + 1
            const matchup = opponentElement ? matchupVsElement(sp.element, opponentElement) : null

            return (
              <button
                key={c.speciesId}
                onClick={() => toggle(c.speciesId)}
                className={
                  'w-full flex items-center gap-3 rounded-2xl p-2.5 text-left transition-colors border-2 ' +
                  (isSel
                    ? 'bg-purple-800/80 border-yellow-400'
                    : 'bg-purple-900/50 border-transparent hover:bg-purple-800/50')
                }
              >
                <CreatureSprite
                  element={sp.element}
                  color={c.accentColor ?? sp.spritePlaceholderColor}
                  size={44}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{c.nickname || sp.name}</span>
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-purple-700 text-purple-100">
                      {sp.element}
                    </span>
                    {matchup === 'strong' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-green-500 text-green-950">Strong</span>
                    )}
                    {matchup === 'weak' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-red-950">Weak</span>
                    )}
                  </div>
                  <div className="text-purple-300 text-xs">
                    Lv.{c.level} · HP {stats.heart} · Pwr {stats.power} · Spd {stats.speed}
                  </div>
                </div>
                <div
                  className={
                    'shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ' +
                    (isSel ? 'bg-yellow-400 border-yellow-400 text-purple-950' : 'border-purple-500 text-transparent')
                  }
                >
                  {isSel ? slotNum : '✓'}
                </div>
              </button>
            )
          })}
        </div>

        <div className="p-4 pt-3 space-y-2">
          <p className="text-center text-sm text-purple-300">{selected.length} / {MAX_ACTIVE_TEAM} chosen</p>
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex-1 bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(selected)}
              disabled={!isComplete}
              className={
                'flex-1 font-bold py-3 rounded-2xl transition-colors ' +
                (isComplete
                  ? 'bg-yellow-400 hover:bg-yellow-300 text-purple-950'
                  : 'bg-purple-800 text-purple-500 cursor-not-allowed')
              }
            >
              Save team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
