import { useEffect } from 'react'
import { useGameStore } from '../state/store'
import { ACHIEVEMENT_BY_ID } from '../engine/achievements'
import Medal from './Medal'

// Pop-up for a newly earned trophy (§19). Shows the oldest queued unlock, then
// the next, so a handful earned at once play one after another. Tap to skip.

const SHOW_MS = 3800

export default function AchievementToast() {
  const id      = useGameStore((s) => s.toastQueue[0])
  const dismiss = useGameStore((s) => s.dismissToast)
  const a = id ? ACHIEVEMENT_BY_ID[id] : undefined

  useEffect(() => {
    if (!id) return
    const t = setTimeout(dismiss, SHOW_MS)
    return () => clearTimeout(t)
  }, [id, dismiss])

  if (!a) return null

  return (
    // Outer div positions; the inner button animates (the pop-in's transform
    // would otherwise wipe out the centering translate).
    <div
      className="fixed inset-x-0 z-[60] flex justify-center px-3 pointer-events-none"
      style={{ top: 'calc(env(safe-area-inset-top) + 12px)' }}
      aria-live="polite"
    >
      <button
        key={id}
        onClick={dismiss}
        className="pointer-events-auto w-full max-w-[380px]
                   flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-left
                   bg-purple-900/95 border-2 border-amber-300/80 battle-pop-in"
      >
        <Medal tier={a.tier} icon={a.icon} size={44} />
        <div className="min-w-0">
          <p className="text-amber-300 text-xs font-bold uppercase tracking-wide">Trophy earned!</p>
          <p className="text-white font-bold truncate">{a.name}</p>
          <p className="text-purple-200 text-xs">{a.description}</p>
          <p className="text-amber-200 text-xs font-bold mt-0.5">+{a.reward} ✨ Stardust</p>
        </div>
      </button>
    </div>
  )
}
