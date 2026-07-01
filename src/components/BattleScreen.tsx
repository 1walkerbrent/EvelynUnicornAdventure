import { useState, useEffect, useRef, useCallback } from 'react'
import {
  createBattleState, nextActor, availableActors, applyAttack, isBattleOver, calcDamage,
  pickRandomTarget,
} from '../engine/battle'
import type { BattlePony, BattleState } from '../engine/battle'
import { getTypeMultiplier } from '../engine/combat'
import CreatureSprite from './CreatureSprite'

// Arena/hunt backdrops, keyed by filename without extension (same build-time
// discovery pattern as CreatureSprite). Drop a correctly-named PNG in
// src/assets/backgrounds/ and it's picked up — no code change here.
const backgroundModules = import.meta.glob<string>('/src/assets/backgrounds/*.{png,jpg,jpeg}', {
  eager: true,
  import: 'default',
})
const BACKGROUND_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(backgroundModules).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.(png|jpe?g)$/, ''),
    url,
  ]),
)

// Resolve a backgroundId to an image URL. Trial callers pass the zone area id
// (e.g. "granite"); match the themed file whose name starts with it
// ("granite-hall"). Hunt/Proving callers pass the exact filename stem
// ("hunt-z1", "proving-glade"). Returns undefined → caller keeps the gradient.
function resolveBackground(id: string | undefined): string | undefined {
  if (!id) return undefined
  if (BACKGROUND_BY_ID[id]) return BACKGROUND_BY_ID[id]
  const key = Object.keys(BACKGROUND_BY_ID).find(k => k.startsWith(`${id}-`))
  return key ? BACKGROUND_BY_ID[key] : undefined
}

// ── Layout constants ──────────────────────────────────────────────────────────
// Staggered arena positions matching the design mockup (% of viewport).
// Index 0 = back/top, 2 = front/bottom.
const PLAYER_POS = [
  { top: '11%', left: '7%'  },
  { top: '41%', left: '4%'  },
  { top: '67%', left: '10%' },
] as const

const ENEMY_POS = [
  { top: '9%',  right: '7%'  },
  { top: '39%', right: '4%'  },
  { top: '65%', right: '10%' },
] as const

const SPRITE_SIZE = 134

// ── Types ─────────────────────────────────────────────────────────────────────
// 'playerPhase' = her whole team's turn — every un-acted pony is selectable and
// she picks the order. 'animating' plays a single attack; enemy phase auto-plays.
type Phase = 'idle' | 'playerPhase' | 'animating' | 'victory' | 'defeat'

interface DmgFloat {
  id: number
  x: number
  y: number
  label: string
  isSuper: boolean
  isWeak: boolean
}

interface Props {
  playerPonies: BattlePony[]
  enemyPonies: BattlePony[]
  enemyLabel?: string
  // Arena/hunt backdrop. Trials pass the zone area id ("granite"), hunts pass
  // "hunt-z1"…, Proving Glade passes "proving-glade". Unmatched → green gradient.
  backgroundId?: string
  onVictory: () => void
  onDefeat: () => void
  // Optional overlay flavor (defaults are generic so any battle reads correctly).
  victoryTitle?: string
  victoryMessage?: string
  victoryButtonLabel?: string
  defeatTip?: string
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BattleScreen({
  playerPonies: initPlayers,
  enemyPonies:  initEnemies,
  enemyLabel = 'Opponent',
  backgroundId,
  onVictory,
  onDefeat,
  victoryTitle = 'You won! 🏆',
  victoryMessage = 'Great battling — you used the type wheel well!',
  victoryButtonLabel = 'Continue →',
  defeatTip = 'Think about which element beats which, and focus your team on one enemy at a time.',
}: Props) {
  const [battleState, setBattleState] = useState<BattleState>(() =>
    createBattleState(initPlayers, initEnemies),
  )
  const [phase,         setPhase]         = useState<Phase>('idle')
  // The player pony she has tapped/grabbed to act with next (her chosen order).
  const [selectedId,    setSelectedId]    = useState<string | null>(null)
  const [attackingId,   setAttackingId]   = useState<string | null>(null)
  const [flashingId,    setFlashingId]    = useState<string | null>(null)
  const [dragOrigin,    setDragOrigin]    = useState<{ x: number; y: number } | null>(null)
  const [dragPos,       setDragPos]       = useState<{ x: number; y: number } | null>(null)
  const [hovEnemyId,    setHovEnemyId]    = useState<string | null>(null)
  const [floats,        setFloats]        = useState<DmgFloat[]>([])

  // Player ponies that still have their action this round (only during her phase).
  const readyIds =
    phase === 'playerPhase' && battleState.activePhase === 'player'
      ? availableActors(battleState).map(p => p.id)
      : []

  // Name of the enemy currently mid-attack (for the "… attacks!" banner).
  const enemyActingName =
    attackingId
      ? battleState.enemyPonies.find(p => p.id === attackingId)?.name ?? null
      : null

  const ponyRefs    = useRef<Record<string, HTMLDivElement | null>>({})
  const pointerDown = useRef<{ x: number; y: number } | null>(null)
  // Which pony a drag started from (kept in a ref so the tap-click that follows
  // pointerup doesn't clobber the selection).
  const dragFrom    = useRef<string | null>(null)
  // Keep a ref in sync with battleState so callbacks always see current state
  const stateRef    = useRef(battleState)
  stateRef.current  = battleState

  // ── executeAttack — runs lunge → flash → HP drain → idle ─────────────────
  const executeAttack = useCallback((
    snap: BattleState,
    attackerId: string,
    targetId: string,
  ) => {
    const { state: newState, event } = applyAttack(snap, attackerId, targetId)
    setAttackingId(attackerId)

    // After lunge peak (~380 ms), show impact
    setTimeout(() => {
      setAttackingId(null)
      setFlashingId(targetId)
      setBattleState(newState)

      // Floating damage number
      const el = ponyRefs.current[targetId]
      if (el) {
        const rect = el.getBoundingClientRect()
        const fid  = Date.now() + Math.random()
        setFloats(prev => [...prev, {
          id:      fid,
          x:       rect.left + rect.width  / 2,
          y:       rect.top  + rect.height / 4,
          label:   String(event.damage),
          isSuper: event.multiplier === 'super',
          isWeak:  event.multiplier === 'weak',
        }])
        setTimeout(() => setFloats(prev => prev.filter(f => f.id !== fid)), 950)
      }

      // Clear flash, advance to next turn
      setTimeout(() => {
        setFlashingId(null)
        setSelectedId(null)
        setDragOrigin(null)
        setDragPos(null)
        setHovEnemyId(null)
        setPhase('idle')
      }, 480)
    }, 380)
  }, [])

  // ── Turn machine ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'idle') return

    const over = isBattleOver(battleState)
    if (over === 'player') { setPhase('victory'); return }
    if (over === 'enemy')  { setPhase('defeat');  return }

    if (battleState.activePhase === 'player') {
      // Hand control to her — every ready pony is selectable, in any order.
      setPhase('playerPhase')
      return
    }

    // Enemy phase: auto-play the next enemy. setPhase must NOT be called here —
    // changing any dep triggers cleanup → clearTimeout.
    const actor = nextActor(battleState)
    if (!actor) return
    const snap = battleState
    const t = setTimeout(() => {
      setPhase('animating')
      const targetId = pickRandomTarget(snap.playerPonies)?.id
      if (targetId) executeAttack(snap, actor.pony.id, targetId)
    }, 700)
    return () => clearTimeout(t)
  }, [battleState, phase, executeAttack])

  // ── Player pony tap (step 1: choose which pony acts) ─────────────────────
  function handlePonyClick(ponyId: string) {
    if (phase !== 'playerPhase' || !readyIds.includes(ponyId)) return
    // Toggle this pony as the selected attacker (tap again to deselect).
    setSelectedId(prev => (prev === ponyId ? null : ponyId))
  }

  // ── Fire the chosen pony at an enemy (shared by tap and drag) ─────────────
  function fireFrom(attackerId: string | null, enemyId: string) {
    if (phase !== 'playerPhase' || !attackerId || !readyIds.includes(attackerId)) return
    const enemy = battleState.enemyPonies.find(p => p.id === enemyId)
    if (!enemy || enemy.currentHp <= 0) return
    setPhase('animating')
    executeAttack(stateRef.current, attackerId, enemyId)
  }

  function handleEnemyClick(enemyId: string) {
    if (!selectedId) return
    fireFrom(selectedId, enemyId)
  }

  // ── Drag ──────────────────────────────────────────────────────────────────
  function handlePointerDown(e: React.PointerEvent, ponyId: string) {
    if (phase !== 'playerPhase' || !readyIds.includes(ponyId)) return
    dragFrom.current = ponyId
    e.currentTarget.setPointerCapture(e.pointerId)
    const el = ponyRefs.current[ponyId]
    if (!el) return
    const r = el.getBoundingClientRect()
    pointerDown.current = { x: e.clientX, y: e.clientY }
    setDragOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
    setDragPos({ x: e.clientX, y: e.clientY })
  }

  function handleStagePointerMove(e: React.PointerEvent) {
    if (!dragOrigin) return
    setDragPos({ x: e.clientX, y: e.clientY })
    // Hit-test enemy pony bounding rects
    let found: string | null = null
    for (const [id, el] of Object.entries(ponyRefs.current)) {
      if (!el) continue
      if (!battleState.enemyPonies.some(p => p.id === id && p.currentHp > 0)) continue
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right &&
          e.clientY >= r.top  && e.clientY <= r.bottom) {
        found = id
        break
      }
    }
    setHovEnemyId(found)
  }

  function handleStagePointerUp(e: React.PointerEvent) {
    const start = pointerDown.current
    pointerDown.current = null

    if (!dragOrigin) return

    // Tiny movement = a tap, not a drag → let the pony's onClick handle selection.
    const dist = start
      ? Math.hypot(e.clientX - start.x, e.clientY - start.y)
      : 99

    if (dist < 10) {
      dragFrom.current = null
      setDragOrigin(null)
      setDragPos(null)
      return
    }

    const target = hovEnemyId
    const from = dragFrom.current
    dragFrom.current = null
    setDragOrigin(null)
    setDragPos(null)
    setHovEnemyId(null)

    if (target) fireFrom(from, target)
  }

  // ── Retry: restore both teams to full HP ─────────────────────────────────
  function handleRetry() {
    setBattleState(createBattleState(
      initPlayers.map(p => ({ ...p, currentHp: p.maxHp })),
      initEnemies.map(p => ({ ...p, currentHp: p.maxHp })),
    ))
    setPhase('idle')
    setSelectedId(null)
    setAttackingId(null)
    setFlashingId(null)
    dragFrom.current = null
    setDragOrigin(null)
    setDragPos(null)
    setHovEnemyId(null)
    setFloats([])
  }

  // ── Damage preview label (uses the pony she's about to attack with) ───────
  function previewLabel(enemyId: string): string | null {
    const attackerId = dragFrom.current ?? selectedId
    if (!attackerId) return null
    const attacker = battleState.playerPonies.find(p => p.id === attackerId)
    if (!attacker) return null
    const enemy = battleState.enemyPonies.find(p => p.id === enemyId)
    if (!enemy || enemy.currentHp <= 0) return null
    const dmg  = calcDamage(attacker.power, attacker.element, enemy.element)
    const mult = getTypeMultiplier(attacker.element, enemy.element)
    return mult === 2 ? `Super! ~${dmg}` : mult === 0.5 ? `Weak ~${dmg}` : `~${dmg}`
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function spriteClass(pony: BattlePony, isEnemy: boolean): string {
    if (pony.currentHp <= 0) return 'opacity-25'
    if (attackingId === pony.id)
      return isEnemy ? 'battle-lunge-left' : 'battle-lunge-right'
    if (flashingId === pony.id) return 'battle-flash'
    return 'battle-bob'
  }

  function bobDelay(i: number, isEnemy: boolean): string {
    return `${i * 0.35 + (isEnemy ? 0.18 : 0)}s`
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const backgroundUrl = resolveBackground(backgroundId)
  return (
    <div
      className="relative h-screen w-screen overflow-hidden select-none"
      style={{
        // A matched backdrop covers the stage full-bleed; otherwise fall back to
        // the original green gradient so battles without art still read cleanly.
        ...(backgroundUrl
          ? {
              backgroundImage:    `url(${backgroundUrl})`,
              backgroundSize:     'cover',
              backgroundPosition: 'center',
            }
          : { background: 'linear-gradient(160deg, #d8edda 0%, #c4dfc6 45%, #b0d0b3 100%)' }),
        touchAction: 'none',
      }}
      onPointerMove={handleStagePointerMove}
      onPointerUp={handleStagePointerUp}
      // Tapping the empty stage deselects the chosen pony
      onClick={() => setSelectedId(null)}
    >
      {/* ── Team labels ──────────────────────────────────────────────────── */}
      <div className="absolute top-3 left-5 text-sm font-semibold text-green-900/50 pointer-events-none">
        Your team
      </div>
      <div className="absolute top-3 right-5 text-sm font-semibold text-green-900/50 pointer-events-none">
        {enemyLabel}'s team
      </div>

      {/* ── Turn hint (bottom center) ─────────────────────────────────── */}
      {phase === 'playerPhase' && !selectedId && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-yellow-400/90 text-yellow-900
                        font-bold text-sm px-5 py-2 rounded-full shadow pointer-events-none battle-pop-in">
          Pick any glowing pony, then tap an enemy! ({readyIds.length} ready)
        </div>
      )}
      {phase === 'playerPhase' && selectedId && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-orange-500/90 text-white
                        font-bold text-sm px-5 py-2 rounded-full shadow pointer-events-none battle-pop-in">
          Now tap an enemy to attack!
        </div>
      )}
      {enemyActingName && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-purple-800/80 text-white
                        text-sm px-5 py-2 rounded-full shadow pointer-events-none">
          {enemyActingName} attacks!
        </div>
      )}

      {/* ── Player ponies (left side) ────────────────────────────────────── */}
      {battleState.playerPonies.map((pony, i) => {
        const isReady    = readyIds.includes(pony.id)
        const isSelected = selectedId === pony.id
        const fainted   = pony.currentHp <= 0
        const hpPct     = pony.maxHp > 0 ? pony.currentHp / pony.maxHp : 0
        const hpColor   = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444'

        return (
          <div
            key={pony.id}
            className="absolute flex flex-col items-center gap-1"
            style={PLAYER_POS[i]}
          >
            {/* Badge: ready ponies invite a tap; the selected one is locked in */}
            {isReady && (
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 z-20 text-xs font-bold
                            px-3 py-0.5 rounded-full whitespace-nowrap shadow battle-pop-in
                            ${isSelected ? 'bg-orange-500 text-white' : 'bg-yellow-400 text-yellow-900'}`}
                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)' }}
              >
                {isSelected ? 'Pick a target →' : 'Ready!'}
              </div>
            )}

            {/* Sprite wrapper — handles glow ring, lunge, flash, bob */}
            <div
              ref={el => { ponyRefs.current[pony.id] = el }}
              className={`relative ${isReady ? 'cursor-pointer' : ''} ${spriteClass(pony, false)}`}
              style={{ animationDelay: bobDelay(i, false) }}
              onPointerDown={e => { e.stopPropagation(); handlePointerDown(e, pony.id) }}
              onClick={e => { e.stopPropagation(); handlePonyClick(pony.id) }}
            >
              {/* Glow ring — every ready pony glows; the selected one glows orange */}
              {isReady && (
                <div
                  className={`absolute inset-0 rounded-full ring-4 ring-offset-4 ring-offset-transparent
                              animate-pulse z-10 pointer-events-none
                              ${isSelected ? 'ring-orange-500' : 'ring-yellow-400'}`}
                  style={{ borderRadius: '50%' }}
                />
              )}
              <CreatureSprite element={pony.element} size={SPRITE_SIZE} speciesId={pony.speciesId} />
            </div>

            <span
              className="text-xs font-bold text-white mt-0.5"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)' }}
            >
              {pony.name}
            </span>
            <HpBar current={pony.currentHp} max={pony.maxHp} color={hpColor} fainted={fainted} />
          </div>
        )
      })}

      {/* ── Enemy ponies (right side) ────────────────────────────────────── */}
      {battleState.enemyPonies.map((pony, i) => {
        const fainted     = pony.currentHp <= 0
        const isTargetable = phase === 'playerPhase' && !fainted
        // Highlight on drag-hover, or when a pony is selected and waiting for a target.
        const isHovered   = (hovEnemyId === pony.id && !!dragPos) ||
                            (!!selectedId && isTargetable)
        const preview     = (hovEnemyId === pony.id && !!dragPos) ||
                            (!!selectedId && isTargetable)
          ? previewLabel(pony.id)
          : null
        const hpPct   = pony.maxHp > 0 ? pony.currentHp / pony.maxHp : 0
        const hpColor = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#eab308' : '#ef4444'

        return (
          <div
            key={pony.id}
            className="absolute flex flex-col items-center gap-1"
            style={ENEMY_POS[i]}
          >
            {/* Damage preview label */}
            {preview && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20
                              bg-orange-700/95 text-white text-xs font-bold
                              px-3 py-0.5 rounded-full whitespace-nowrap shadow battle-pop-in">
                {preview}
              </div>
            )}

            {/* Sprite */}
            <div
              ref={el => { ponyRefs.current[pony.id] = el }}
              className={`relative ${isTargetable ? 'cursor-pointer' : ''} ${spriteClass(pony, true)}`}
              style={{ animationDelay: bobDelay(i, true) }}
              onClick={e => { e.stopPropagation(); handleEnemyClick(pony.id) }}
            >
              {/* Hover/target highlight ring */}
              {isHovered && (
                <div
                  className="absolute inset-0 rounded-full ring-4 ring-orange-400
                              ring-offset-4 ring-offset-transparent animate-pulse z-10 pointer-events-none"
                  style={{ borderRadius: '50%' }}
                />
              )}
              <div style={{ transform: 'scaleX(-1)' }}>
                <CreatureSprite element={pony.element} size={SPRITE_SIZE} speciesId={pony.speciesId} />
              </div>
            </div>

            <span
              className="text-xs font-bold text-white mt-0.5"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8), 0 0 6px rgba(0,0,0,0.5)' }}
            >
              {pony.name}
            </span>
            <HpBar current={pony.currentHp} max={pony.maxHp} color={hpColor} fainted={fainted} />
          </div>
        )
      })}

      {/* ── Drag arrow (SVG fixed overlay) ───────────────────────────────── */}
      {dragPos && dragOrigin && (
        <svg
          style={{
            position: 'fixed', inset: 0,
            width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: 40,
          }}
        >
          <defs>
            <marker id="bs-arrow" markerWidth="10" markerHeight="7"
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#c2410c" />
            </marker>
          </defs>
          <line
            x1={dragOrigin.x} y1={dragOrigin.y}
            x2={dragPos.x}    y2={dragPos.y}
            stroke="#c2410c" strokeWidth="3.5" strokeDasharray="11 5"
            markerEnd="url(#bs-arrow)"
          />
        </svg>
      )}

      {/* ── Floating damage numbers (fixed so they appear at screen coords) ─ */}
      {floats.map(f => (
        <div
          key={f.id}
          className="fixed pointer-events-none z-50 font-black text-2xl drop-shadow battle-float-dmg"
          style={{
            left:  f.x - 18,
            top:   f.y,
            color: f.isSuper ? '#ea580c' : f.isWeak ? '#7c3aed' : '#111827',
          }}
        >
          {f.label}
          {f.isSuper && <span className="text-base ml-0.5">✨</span>}
          {f.isWeak  && <span className="text-base ml-0.5 opacity-60">↓</span>}
        </div>
      ))}

      {/* ── Victory overlay ───────────────────────────────────────────────── */}
      {phase === 'victory' && (
        <Overlay>
          <div className="text-6xl mb-1">🏆</div>
          <h2 className="text-3xl font-bold text-yellow-300">{victoryTitle}</h2>
          <p className="text-purple-300 italic text-sm px-2">{victoryMessage}</p>
          <button
            onClick={onVictory}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-950
                       font-bold py-4 rounded-2xl text-lg transition-colors"
          >
            {victoryButtonLabel}
          </button>
        </Overlay>
      )}

      {/* ── Defeat overlay ────────────────────────────────────────────────── */}
      {phase === 'defeat' && (
        <Overlay>
          <div className="text-5xl mb-1">💫</div>
          <h2 className="text-2xl font-bold text-white">Your ponies need to rest!</h2>
          <p className="text-purple-300 text-sm italic">
            Good effort — give it another try!
          </p>
          <div className="bg-purple-900/60 rounded-xl p-3 text-left text-sm space-y-1 w-full">
            <p className="text-yellow-300 font-semibold">💡 Type tip:</p>
            <p className="text-purple-200">{defeatTip}</p>
          </div>
          <div className="flex gap-3 w-full">
            <button
              onClick={onDefeat}
              className="flex-1 bg-purple-700 hover:bg-purple-600 text-white
                         font-semibold py-3 rounded-2xl transition-colors"
            >
              Back to Map
            </button>
            <button
              onClick={handleRetry}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-purple-950
                         font-bold py-3 rounded-2xl transition-colors"
            >
              Try Again! 💪
            </button>
          </div>
        </Overlay>
      )}
    </div>
  )
}

// ── Small reusable sub-components ─────────────────────────────────────────────

function HpBar({ current, max, color, fainted }: {
  current: number; max: number; color: string; fainted: boolean
}) {
  const pct = max > 0 ? Math.max(0, current / max) * 100 : 0
  return (
    <div className="w-20 text-center">
      <div
        className="text-xs font-medium mb-0.5 text-white"
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
      >
        {fainted ? 'Fainted' : `${current}/${max}`}
      </div>
      <div
        className="h-2.5 bg-black/30 rounded-full overflow-hidden"
        style={{ border: '1px solid rgba(0,0,0,0.5)', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-black/55 flex items-center justify-center z-50">
      <div className="bg-purple-950 rounded-3xl p-8 max-w-sm w-full mx-6
                      text-center space-y-4 shadow-2xl border border-purple-700/40">
        {children}
      </div>
    </div>
  )
}
