import { useEffect, useRef, useState } from 'react'
import type { Creature } from '../engine/types'
import { SPECIES_BY_ID } from '../content/creatures'
import { getStats } from '../engine/stats'
import { xpProgress } from '../engine/leveling'
import CreatureSprite from './CreatureSprite'

// One party-interface card (M2f). Dumb presentation: all XP display values come
// from the pure `xpProgress` derive — this card never touches the XP economy.
export default function PartyCard({ creature, levelCap, active }: { creature: Creature; levelCap: number; active?: boolean }) {
  const species = SPECIES_BY_ID[creature.speciesId]

  // One-shot level-up pulse: flash the bar briefly whenever the level ticks up.
  const [pulsing, setPulsing] = useState(false)
  const prevLevel = useRef(creature.level)
  useEffect(() => {
    if (creature.level > prevLevel.current) {
      setPulsing(true)
      const t = setTimeout(() => setPulsing(false), 600)
      prevLevel.current = creature.level
      return () => clearTimeout(t)
    }
    prevLevel.current = creature.level
  }, [creature.level])

  if (!species) return null

  const stats = getStats(species.tier, creature.level)
  const { level, xpIntoLevel, xpForNextLevel, atCap } = xpProgress(creature, levelCap)
  const fillPct = atCap ? 100 : Math.min(100, (xpIntoLevel / xpForNextLevel) * 100)
  const pulseClass = pulsing ? ' level-pulse' : ''

  return (
    <div className="bg-purple-900/60 rounded-2xl p-3 flex items-center gap-3">
      <CreatureSprite
        element={species.element}
        color={creature.accentColor ?? species.spritePlaceholderColor}
        size={56}
        speciesId={species.id}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-bold text-white truncate">
            {creature.nickname || species.name}
          </span>
          <span className="flex items-center gap-1.5 shrink-0">
            {active && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-purple-950">
                On team
              </span>
            )}
            <span className="text-yellow-300 text-sm font-bold">Lv.{level}</span>
          </span>
        </div>
        <div className="text-purple-300 text-xs capitalize">{species.element}</div>
        <div className="text-purple-400 text-xs mt-0.5">
          HP {creature.currentHp}/{stats.heart} · Pwr {stats.power} · Spd {stats.speed}
        </div>

        {/* XP progress bar */}
        <div className="mt-1.5">
          <div
            className={
              'h-2.5 w-full rounded-full overflow-hidden ' +
              (atCap ? 'bg-amber-950/70' : 'bg-purple-950/70')
            }
          >
            <div
              className={
                'h-full rounded-full transition-[width] duration-500 ' +
                (atCap
                  ? 'bg-gradient-to-r from-amber-300 to-yellow-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                  : 'bg-gradient-to-r from-fuchsia-400 to-purple-300') +
                pulseClass
              }
              style={{ width: `${fillPct}%` }}
            />
          </div>
          {atCap ? (
            <div className="mt-0.5 flex items-center justify-between gap-2">
              <span className="text-amber-300 text-[11px] font-extrabold tracking-wide">★ MAX</span>
              <span className="text-amber-200/80 text-[11px]">Earn a badge to raise the cap</span>
            </div>
          ) : (
            <div className="mt-0.5 text-purple-300 text-[11px]">
              {xpIntoLevel} / {xpForNextLevel} XP to Lv {level + 1}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
