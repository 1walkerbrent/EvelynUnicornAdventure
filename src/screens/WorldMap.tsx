import { useEffect, useMemo, useRef } from 'react'
import { useGameStore } from '../state/store'
import { ZONES } from '../content/zones'
import { CHAMPION } from '../content/guardians'
import { isZoneUnlocked, isZoneComplete, isChampionUnlocked } from '../engine/progression'
import worldMapImg from '../assets/backgrounds/world-map.jpg'

// Visual scrolling path map (replaces the old list). Zone nodes are absolutely
// positioned on top of the baked-in golden path in world-map.jpg — the % below
// are hand-tuned to sit each node on the dirt road. The image keeps its natural
// ~9:16 portrait ratio (width:100%, height:auto) and the container scrolls it.

const ELEMENT_EMOJI: Record<string, string> = {
  neutral: '🏡', earth: '🪨', water: '💧', fire: '🔥', air: '💨', spirit: '✨',
}

// Element-keyed fill for the "current" (unlocked, not-yet-cleared) node.
const ELEMENT_COLOR: Record<string, string> = {
  neutral: '#a16207', earth: '#65a30d', water: '#2563eb',
  fire: '#ea580c', air: '#0ea5e9', spirit: '#9333ea',
}

type NodeState = 'cleared' | 'current' | 'locked'
type Side = 'left' | 'right'

// Node positions as % of the image (width/height). Labels alternate sides so
// they don't sit on the path. Tune these by eye against the actual artwork.
const NODE_LAYOUT: Array<{ id: string; top: string; left: string; side: Side }> = [
  { id: 'z1',       top: '5%',  left: '50%', side: 'right' },
  { id: 'z2',       top: '18%', left: '45%', side: 'left'  },
  { id: 'z3',       top: '33%', left: '50%', side: 'right' },
  { id: 'z4',       top: '48%', left: '50%', side: 'left'  },
  { id: 'z5',       top: '65%', left: '50%', side: 'right' },
  { id: 'z6',       top: '80%', left: '45%', side: 'left'  },
  { id: 'champion', top: '92%', left: '50%', side: 'right' },
]

export default function WorldMap() {
  const areasDone        = useGameStore((s) => s.areasDone)
  const badges           = useGameStore((s) => s.badges)
  const championDefeated = useGameStore((s) => s.championDefeated)
  const openZone         = useGameStore((s) => s.openZone)
  const openExplore      = useGameStore((s) => s.openExplore)
  const setScreen        = useGameStore((s) => s.setScreen)

  const scrollerRef = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLImageElement>(null)
  const nodeRefs    = useRef<Record<string, HTMLDivElement | null>>({})

  const championOpen = isChampionUnlocked(areasDone)

  // Furthest unlocked, not-yet-cleared zone (the frontier) — the auto-scroll
  // target. If everything is cleared, fall to the Champion (if open) or Zone 6.
  const focusId = useMemo(() => {
    let frontier: string | null = null
    for (const zone of ZONES) {
      if (isZoneUnlocked(areasDone, zone.id) && !isZoneComplete(areasDone, zone.id)) {
        frontier = zone.id
      }
    }
    if (frontier) return frontier
    if (championOpen && !championDefeated) return 'champion'
    return 'z6'
  }, [areasDone, championOpen, championDefeated])

  // Center the focus node once the image has laid out (its height drives the
  // %-based node positions and the scrollable height).
  function centerFocus() {
    const scroller = scrollerRef.current
    const node = nodeRefs.current[focusId]
    if (!scroller || !node) return
    const sRect = scroller.getBoundingClientRect()
    const nRect = node.getBoundingClientRect()
    scroller.scrollTop += (nRect.top - sRect.top) - scroller.clientHeight / 2 + nRect.height / 2
  }

  // Handle the cached-image case where onLoad may not fire after mount.
  useEffect(() => {
    if (imgRef.current?.complete) centerFocus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-full w-full bg-purple-950">
      {/* Badge counter — pinned so it stays visible while the map scrolls. */}
      <div className="absolute top-3 right-3 z-30 bg-black/60 text-yellow-300 font-bold
                      text-sm px-3 py-1.5 rounded-full shadow-lg pointer-events-none backdrop-blur-sm">
        🏅 {badges}/5
      </div>

      <div ref={scrollerRef} className="h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="relative w-full">
          <img
            ref={imgRef}
            src={worldMapImg}
            alt="World map"
            className="block w-full h-auto select-none pointer-events-none"
            draggable={false}
            onLoad={centerFocus}
          />

          {NODE_LAYOUT.map(({ id, top, left, side }) => {
            const zone = ZONES.find((z) => z.id === id)
            const isChampion = id === 'champion'

            // Resolve display + state for either a zone or the Champion node.
            const unlocked = isChampion ? championOpen : isZoneUnlocked(areasDone, id)
            const cleared  = isChampion ? championDefeated : isZoneComplete(areasDone, id)
            const state: NodeState = cleared ? 'cleared' : unlocked ? 'current' : 'locked'

            const emoji = isChampion ? '👑' : (ELEMENT_EMOJI[zone!.element] ?? '🌍')
            const name  = isChampion ? CHAMPION.name : zone!.name
            const color = isChampion ? '#f59e0b' : (ELEMENT_COLOR[zone!.element] ?? '#6b7280')

            const status = cleared
              ? isChampion ? 'Champion defeated! 🎉' : 'Cleared'
              : unlocked
                ? isChampion ? 'The final challenge!' : 'Ready to explore'
                : 'Locked'

            const onNode = () => {
              if (!unlocked) return
              if (isChampion) setScreen('champion')
              else openZone(id)
            }

            return (
              <div
                key={id}
                ref={(el) => { nodeRefs.current[id] = el }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ top, left }}
              >
                {/* Node circle */}
                <button
                  onClick={onNode}
                  disabled={!unlocked}
                  aria-label={`${name} — ${status}`}
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center
                              justify-center text-2xl sm:text-3xl shadow-lg transition-transform
                              ${unlocked ? 'cursor-pointer active:scale-95' : 'cursor-not-allowed'}
                              ${state === 'cleared' ? 'border-2' : ''}
                              ${state === 'current' ? 'border-2 border-white world-node-pulse' : ''}
                              ${state === 'locked'  ? 'opacity-50' : ''}`}
                  style={{
                    borderColor:     state === 'cleared' ? '#ffd700' : undefined,
                    backgroundColor: state === 'current'
                      ? color
                      : state === 'cleared' ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.5)',
                  }}
                >
                  {emoji}
                </button>

                {/* Cleared checkmark badge */}
                {state === 'cleared' && (
                  <div className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-[#ffd700]
                                  text-purple-950 text-xs font-black flex items-center justify-center shadow">
                    ✓
                  </div>
                )}

                {/* Locked icon overlay */}
                {state === 'locked' && (
                  <div className="absolute -bottom-1 -right-1 z-10 text-sm pointer-events-none">
                    🔒
                  </div>
                )}

                {/* Floating name + status label (alternating side) */}
                <div className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-0.5 pointer-events-none
                                 ${side === 'left' ? 'right-full mr-2 items-end' : 'left-full ml-2 items-start'}`}>
                  <span className="whitespace-nowrap bg-black/65 text-white text-xs font-bold
                                   px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {name}
                  </span>
                  <span className={`whitespace-nowrap bg-black/55 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm
                                    ${cleared ? 'text-yellow-300' : unlocked ? 'text-sky-200' : 'text-purple-300'}`}>
                    {status}
                  </span>
                </div>

                {/* Explore pill (unlocked zones only) */}
                {!isChampion && unlocked && (
                  <button
                    onClick={(e) => { e.stopPropagation(); openExplore(id) }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 h-7 whitespace-nowrap
                               bg-sky-500/90 hover:bg-sky-400 active:bg-sky-600 text-white text-[11px]
                               font-bold px-3 rounded-full shadow-lg flex items-center gap-1 transition-colors"
                  >
                    🔍 Explore
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
