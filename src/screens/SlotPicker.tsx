import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SLOTS, listSlots, getActiveSlot, deleteSlot } from '../state/save'
import type { SlotNumber, SlotSummary } from '../state/save'
import { SPECIES_BY_ID } from '../content/creatures'
import CreatureSprite from '../components/CreatureSprite'
import charCreationBg from '../assets/backgrounds/character-creation.jpg'

// Launch screen: three adventures per device. A filled card continues that
// adventure; an empty one starts a new one through character creation. The slot
// played last is highlighted, so carrying on is one tap. Deleting takes two taps.

function lastPlayed(savedAt: string | null): string | null {
  if (!savedAt) return null
  const days = Math.floor((Date.now() - new Date(savedAt).getTime()) / 86_400_000)
  if (days <= 0) return 'Played today'
  if (days === 1) return 'Played yesterday'
  return `Played ${days} days ago`
}

export default function SlotPicker() {
  const openSlot = useGameStore((s) => s.openSlot)
  const [slots, setSlots]       = useState(listSlots)
  const [deleting, setDeleting] = useState<SlotNumber | null>(null)
  const last = getActiveSlot()

  function confirmDelete(slot: SlotNumber) {
    deleteSlot(slot)
    setDeleting(null)
    setSlots(listSlots())
  }

  return (
    <div className="h-full relative flex flex-col">
      <img src={charCreationBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 max-w-md w-full mx-auto">
        <div className="text-center pt-4">
          <div className="text-5xl mb-2">🦄</div>
          <h1 className="text-3xl font-bold text-yellow-300">Unicorn Adventure</h1>
          <p className="text-purple-300 text-sm mt-1">Pick an adventure to play.</p>
        </div>

        {SLOTS.map((slot, i) => {
          const summary = slots[i]
          if (deleting === slot && summary) {
            return (
              <DeleteConfirm
                key={slot}
                summary={summary}
                onYes={() => confirmDelete(slot)}
                onNo={() => setDeleting(null)}
              />
            )
          }
          return summary ? (
            <FilledCard
              key={slot}
              summary={summary}
              highlighted={slot === last}
              onOpen={() => openSlot(slot)}
              onDelete={() => setDeleting(slot)}
            />
          ) : (
            <button
              key={slot}
              onClick={() => openSlot(slot)}
              className="w-full min-h-[96px] rounded-3xl border-2 border-dashed border-purple-400/60 bg-purple-950/60
                         hover:bg-purple-900/70 text-purple-200 font-bold text-lg"
            >
              ✨ New Adventure
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FilledCard({ summary, highlighted, onOpen, onDelete }: {
  summary: SlotSummary
  highlighted: boolean
  onOpen: () => void
  onDelete: () => void
}) {
  const sp = summary.leadSpeciesId ? SPECIES_BY_ID[summary.leadSpeciesId] : undefined
  const played = lastPlayed(summary.savedAt)
  return (
    <div
      className={[
        'rounded-3xl bg-purple-950/80 border-2 overflow-hidden',
        highlighted ? 'border-yellow-300 shadow-lg shadow-yellow-300/20' : 'border-purple-600/60',
      ].join(' ')}
    >
      <button onClick={onOpen} className="w-full flex items-center gap-3 p-3 text-left hover:bg-purple-900/60">
        {sp ? (
          <CreatureSprite element={sp.element} speciesId={sp.id} variant={summary.leadVariant} size={72} />
        ) : (
          <div className="w-[72px] h-[72px] flex items-center justify-center text-4xl">🦄</div>
        )}
        <span className="flex-1 min-w-0">
          <span className="block text-xl font-bold text-white truncate">{summary.playerName || 'New trainer'}</span>
          <span className="block text-purple-200 text-sm">
            🏅 {summary.badges}/5 · 🦄 {summary.ponies} · ✨ {summary.stardust}
            {summary.prestigeCount > 0 && ` · 🌟 Journey ${summary.prestigeCount + 1}`}
          </span>
          {played && <span className="block text-purple-400 text-xs">{played}</span>}
        </span>
        <span className="text-yellow-300 font-bold text-sm">{highlighted ? 'Continue ▶' : 'Play ▶'}</span>
      </button>
      <button
        onClick={onDelete}
        className="w-full min-h-[44px] border-t border-purple-800/60 text-red-400 hover:text-red-300 text-xs"
      >
        Delete this adventure
      </button>
    </div>
  )
}

function DeleteConfirm({ summary, onYes, onNo }: { summary: SlotSummary; onYes: () => void; onNo: () => void }) {
  const name = summary.playerName || 'this trainer'
  return (
    <div className="rounded-3xl bg-red-950/80 border-2 border-red-700/60 p-4 space-y-3 text-center">
      <p className="text-red-200 font-semibold">Delete {name}'s adventure?</p>
      <p className="text-red-300 text-xs">
        All {summary.ponies} {summary.ponies === 1 ? 'pony' : 'ponies'}, badges and Stardust in this adventure will be gone for good.
      </p>
      <div className="flex gap-2">
        <button onClick={onNo} className="flex-1 min-h-[44px] bg-purple-700 hover:bg-purple-600 text-white rounded-xl font-semibold">
          Keep it
        </button>
        <button onClick={onYes} className="flex-1 min-h-[44px] bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold">
          Yes, delete
        </button>
      </div>
    </div>
  )
}
