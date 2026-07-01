import { useGameStore } from '../state/store'
import { ZONE_BY_ID, type ZoneArea } from '../content/zones'
import { GUARDIAN_BY_ID } from '../content/guardians'
import { isAreaAvailable } from '../engine/progression'

const huntBgModules = import.meta.glob<string>('/src/assets/backgrounds/hunt-*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})
const HUNT_BG: Record<string, string> = Object.fromEntries(
  Object.entries(huntBgModules).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.(png|jpe?g)$/, ''),
    url,
  ])
)

const ELEMENT_ICON: Record<string, string> = {
  neutral: '🏡', earth: '🪨', water: '💧', fire: '🔥', air: '💨', spirit: '✨',
}

const AREA_ICON: Record<ZoneArea['kind'], string> = {
  creation: '🌟', quest: '❓', battle: '⚔️', trial: '🛡️',
}

export default function ZoneView() {
  const areasDone      = useGameStore((s) => s.areasDone)
  const selectedZoneId = useGameStore((s) => s.selectedZoneId)
  const openArea       = useGameStore((s) => s.openArea)
  const setScreen      = useGameStore((s) => s.setScreen)

  const zone = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  if (!zone) {
    return (
      <div className="p-4">
        <button onClick={() => setScreen('worldMap')}
          className="w-full bg-purple-700 text-white py-3 rounded-xl">← Back to Map</button>
      </div>
    )
  }

  function enter(area: ZoneArea) {
    if (area.kind === 'quest') openArea(area.id, 'quest')
    else if (area.kind === 'battle') openArea(area.id, 'provingGlade')
    else if (area.kind === 'trial') openArea(area.id, 'trial')
  }

  function subtitle(area: ZoneArea, idx: number): string {
    if (area.kind === 'trial') {
      const g = zone!.guardianId ? GUARDIAN_BY_ID[zone!.guardianId] : undefined
      return g ? `Trial — battle ${g.name}` : 'Trial battle'
    }
    if (area.kind === 'battle') return 'Battle rival trainer Pip!'
    return idx === 0 ? 'A math quest — a pony is hiding here' : 'A story puzzle — follow the clues'
  }

  const questAreas = zone.areas.filter((a) => a.kind === 'quest')
  const huntBgUrl  = HUNT_BG[`hunt-${selectedZoneId}`]

  return (
    <div className="min-h-screen relative">
      {huntBgUrl && (
        <>
          <img src={huntBgUrl} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      <div className="relative z-10 p-4 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-3xl">{ELEMENT_ICON[zone.element] ?? '🌍'}</span>
        <div>
          <h2 className="text-2xl font-bold text-yellow-300">{zone.name}</h2>
          <p className="text-purple-400 text-sm capitalize">{zone.element} region</p>
        </div>
      </div>

      <div className="space-y-2">
        {zone.areas.map((area, idx) => {
          const done    = areasDone.includes(area.id)
          const avail   = isAreaAvailable(areasDone, zone.id, area.id)
          const isOpen  = avail && !done
          const qIdx    = questAreas.findIndex((a) => a.id === area.id)

          return (
            <div key={area.id}>
              <button
                disabled={!avail}
                onClick={() => isOpen ? enter(area) : undefined}
                className={`w-full rounded-2xl p-4 flex items-center gap-4 transition-colors text-left ${
                  done
                    ? 'bg-green-900/30 border border-green-700/40 cursor-default'
                    : isOpen
                      ? 'bg-purple-900/70 hover:bg-purple-800 active:bg-purple-700 cursor-pointer'
                      : 'bg-purple-950/50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-3xl">{AREA_ICON[area.kind]}</div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold ${done ? 'text-green-300' : 'text-white'}`}>{area.name}</div>
                  <div className="text-purple-400 text-sm">{subtitle(area, qIdx)}</div>
                </div>
                <div className="text-xl ml-auto">{done ? '✅' : isOpen ? '›' : '🔒'}</div>
              </button>
              {idx < zone.areas.length - 1 && (
                <div className="flex justify-center text-purple-700 text-lg my-1">↓</div>
              )}
            </div>
          )
        })}
      </div>

      <button onClick={() => setScreen('worldMap')}
        className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors">
        ← Back to World Map
      </button>
    </div>
    </div>
  )
}
