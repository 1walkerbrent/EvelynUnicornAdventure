import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useGameStore } from '../state/store'
import PartyCard from '../components/PartyCard'
import TeamPicker from '../components/TeamPicker'
import { resolveBattleTeam, shouldShowPicker } from '../engine/team'
import { exportSave, importSave } from '../state/save'

export default function Party() {
  const playerName  = useGameStore((s) => s.playerName)
  const party       = useGameStore((s) => s.party)
  const activeTeam  = useGameStore((s) => s.activeTeam)
  const setActiveTeam = useGameStore((s) => s.setActiveTeam)
  const badges      = useGameStore((s) => s.badges)
  const levelCap    = useGameStore((s) => s.levelCap)
  const load        = useGameStore((s) => s.load)
  const resetGame   = useGameStore((s) => s.resetGame)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [confirmReset, setConfirmReset] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)

  const activeIds = new Set(resolveBattleTeam(party, activeTeam).map((c) => c.speciesId))
  const canPick = shouldShowPicker(party)

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = await importSave(file)
    if (ok) load()
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Party</h2>
        <p className="text-purple-300 text-sm mt-1">
          Trainer: <span className="text-white font-semibold">{playerName || '—'}</span>
          {' · '}Badges: {badges}
          {' · '}Level cap: {levelCap}
        </p>
      </div>

      {party.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-3">🌟</div>
          <p className="text-purple-400">No creatures yet.</p>
          <p className="text-purple-500 text-sm">Start your adventure to build your party!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {canPick && (
            <div className="flex items-center justify-between bg-purple-900/40 rounded-2xl px-3 py-2">
              <p className="text-sm text-purple-200">
                Battle team: <span className="text-white font-semibold">{activeIds.size} of 3 ponies</span>
              </p>
              <button
                onClick={() => setPickerOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold text-sm px-4 py-2 rounded-xl transition-colors"
              >
                Choose team
              </button>
            </div>
          )}
          {party.map((creature, i) => (
            <PartyCard
              key={i}
              creature={creature}
              levelCap={levelCap}
              active={canPick && activeIds.has(creature.speciesId)}
            />
          ))}
        </div>
      )}

      {pickerOpen && (
        <TeamPicker
          party={party}
          initialSelection={[...activeIds]}
          onConfirm={(ids) => { setActiveTeam(ids); setPickerOpen(false) }}
          onCancel={() => setPickerOpen(false)}
        />
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={exportSave}
          className="flex-1 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 text-white py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Export Save
        </button>
        <label className="flex-1 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 text-white py-2 rounded-xl text-sm font-medium transition-colors text-center cursor-pointer">
          Import Save
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      </div>

      {confirmReset ? (
        <div className="bg-red-950/60 border border-red-700/50 rounded-2xl p-4 space-y-3">
          <p className="text-red-300 text-sm font-medium text-center">
            This will erase your save and restart from the beginning.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl text-sm font-bold transition-colors"
            >
              Yes, reset
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          className="w-full text-red-400 hover:text-red-300 text-sm py-2 transition-colors"
        >
          New Game (erase save)
        </button>
      )}
    </div>
  )
}
