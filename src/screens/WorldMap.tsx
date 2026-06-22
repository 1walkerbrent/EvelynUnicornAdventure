import { ZONES } from '../content/zones'
import type { ZoneElement } from '../content/zones'

const ELEMENT_BG: Record<ZoneElement, string> = {
  neutral: 'bg-slate-600',
  water:   'bg-blue-600',
  fire:    'bg-orange-600',
  air:     'bg-sky-500',
  spirit:  'bg-purple-600',
  earth:   'bg-amber-700',
}

const ELEMENT_EMOJI: Record<ZoneElement, string> = {
  neutral: '⭐',
  water:   '💧',
  fire:    '🔥',
  air:     '💨',
  spirit:  '✨',
  earth:   '🌿',
}

export default function WorldMap() {
  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">World Map</h2>
        <p className="text-purple-400 text-sm mt-1">
          Six zones to explore — each guarded by an elemental Trial.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ZONES.map((zone) => (
          <div
            key={zone.id}
            className={`${ELEMENT_BG[zone.element]} rounded-2xl p-4 select-none`}
          >
            <div className="text-3xl mb-2">{ELEMENT_EMOJI[zone.element]}</div>
            <div className="text-white font-bold text-sm leading-tight">{zone.name}</div>
            <div className="text-white/60 text-xs mt-1 space-y-0.5">
              {zone.areas.map((a) => (
                <div key={a.id}>{a.name}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-purple-500 text-xs text-center italic pb-2">
        Zone content arrives in M1!
      </p>
    </div>
  )
}
