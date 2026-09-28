import { useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import type { Creature, Element, Ivs } from '../engine/types'
import {
  hatchBlockReason, previewHatch, isGuardianPony, VARIANTS, HATCH_BASE_COST, MIN_PARENT_LEVEL, REST_WINS,
} from '../engine/hatching'
import type { HatchPreview } from '../engine/hatching'
import CreatureSprite from '../components/CreatureSprite'

// The Moonwell (§20): pick a LEAD (the foal's kind), pick a PARTNER (shapes its
// stats and rare-color chances), check the preview, then hatch. Rare colors she
// hasn't discovered yet show as a mystery until she hatches one.

type Step = 'lead' | 'partner' | 'preview' | 'hatching' | 'reveal'

const STAT_LABEL: Record<keyof Ivs, string> = { heart: '❤️ Heart', power: '⚔️ Power', speed: '💨 Speed' }
const STATS: Array<keyof Ivs> = ['heart', 'power', 'speed']

const EGG_COLOR: Record<Element, [string, string]> = {
  water:  ['#bfdbfe', '#3b82f6'],
  fire:   ['#fed7aa', '#f97316'],
  air:    ['#e0f2fe', '#38bdf8'],
  spirit: ['#e9d5ff', '#a855f7'],
  earth:  ['#fde68a', '#b45309'],
}

const HATCH_MS = 2200

export default function Moonwell() {
  const party         = useGameStore((s) => s.party)
  const stardust      = useGameStore((s) => s.stardust)
  const battlesWon    = useGameStore((s) => s.lifetime.battlesWon)
  const variantsFound = useGameStore((s) => s.lifetime.variantsFound)
  const hatch         = useGameStore((s) => s.hatch)
  const setScreen     = useGameStore((s) => s.setScreen)

  const [step, setStep]         = useState<Step>('lead')
  const [leadId, setLeadId]     = useState<string | null>(null)
  const [partnerId, setPartner] = useState<string | null>(null)
  const [foal, setFoal]         = useState<Creature | null>(null)

  const lead    = party.find((c) => c.id === leadId) ?? null
  const partner = party.find((c) => c.id === partnerId) ?? null

  function startOver() {
    setLeadId(null); setPartner(null); setFoal(null); setStep('lead')
  }

  function doHatch() {
    if (!lead?.id || !partner?.id) return
    const born = hatch(lead.id, partner.id)
    if (!born) return
    setFoal(born)
    setStep('hatching')
    setTimeout(() => setStep('reveal'), HATCH_MS)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-yellow-300">🌙 The Moonwell</h2>
          <p className="text-purple-300 text-sm">Two ponies visit the well… and an egg appears!</p>
        </div>
        <div className="bg-black/40 border border-amber-300/40 rounded-2xl px-3 py-1.5 text-right flex-shrink-0">
          <p className="text-amber-200 text-lg font-bold leading-tight">✨ {stardust}</p>
          <p className="text-purple-300 text-[10px]">Stardust</p>
        </div>
      </div>

      {step === 'lead' && (
        <>
          <Instructions>
            <b>Step 1:</b> Pick the <b>lead</b> pony. The foal will be the same kind of pony, with the same element.
          </Instructions>
          <PonyList
            ponies={party}
            battlesWon={battlesWon}
            onPick={(c) => { setLeadId(c.id ?? null); setStep('partner') }}
          />
        </>
      )}

      {step === 'partner' && lead && (
        <>
          <Chosen label="Lead" pony={lead} onChange={startOver} />
          <Instructions>
            <b>Step 2:</b> Pick a <b>partner</b>. Each of the foal's stats comes from one parent, so pick a partner
            who's strong where the lead is weak!
          </Instructions>
          <PonyList
            ponies={party.filter((c) => c.id !== lead.id)}
            battlesWon={battlesWon}
            hintFor={(c) => previewHatch(lead, c)}
            variantsFound={variantsFound}
            onPick={(c) => { setPartner(c.id ?? null); setStep('preview') }}
          />
        </>
      )}

      {step === 'preview' && lead && partner && (
        <Preview
          lead={lead}
          partner={partner}
          preview={previewHatch(lead, partner)}
          stardust={stardust}
          variantsFound={variantsFound}
          onSwap={() => { setLeadId(partner.id ?? null); setPartner(lead.id ?? null) }}
          onBack={() => setStep('partner')}
          onHatch={doHatch}
        />
      )}

      {step === 'hatching' && lead && (
        <div className="flex flex-col items-center gap-4 py-10">
          <div className="egg-wobble"><Egg element={SPECIES_BY_ID[lead.speciesId].element} size={120} /></div>
          <p className="text-purple-200 font-semibold animate-pulse">Something is wiggling…</p>
        </div>
      )}

      {step === 'reveal' && foal && (
        <Reveal
          foal={foal}
          onParty={() => setScreen('party')}
          onAgain={startOver}
        />
      )}

      {(step === 'lead' || step === 'partner') && <RecipeBook found={variantsFound} />}

      <button onClick={() => setScreen('party')} className="w-full text-purple-400 hover:text-purple-300 text-sm py-2">
        ← Back to Party
      </button>
    </div>
  )
}

// ── Pieces ──────────────────────────────────────────────────────────────────

function Instructions({ children }: { children: React.ReactNode }) {
  return <p className="bg-purple-900/50 rounded-2xl px-4 py-3 text-sm text-purple-100">{children}</p>
}

/** Three stars per stat: the IV (0–3) she's choosing with. */
function Stars({ value, of = 3 }: { value: number; of?: number }) {
  return (
    <span className="tracking-tight" aria-label={`${value} of ${of}`}>
      <span className="text-amber-300">{'★'.repeat(value)}</span>
      <span className="text-purple-700">{'★'.repeat(of - value)}</span>
    </span>
  )
}

function IvRow({ c }: { c: Creature }) {
  return (
    <div className="flex flex-wrap gap-x-3 text-[11px] text-purple-300">
      {STATS.map((k) => (
        <span key={k}>{STAT_LABEL[k].split(' ')[0]} <Stars value={c.ivs?.[k] ?? 0} /></span>
      ))}
    </div>
  )
}

function PonyList({ ponies, battlesWon, onPick, hintFor, variantsFound = [] }: {
  ponies: Creature[]
  battlesWon: number
  onPick: (c: Creature) => void
  hintFor?: (c: Creature) => HatchPreview
  variantsFound?: string[]
}) {
  const ready   = ponies.filter((c) => !hatchBlockReason(c, battlesWon))
  const waiting = ponies.filter((c) => hatchBlockReason(c, battlesWon))

  if (ponies.length === 0) {
    return <p className="text-purple-400 text-sm text-center py-6">No other ponies yet — go explore!</p>
  }

  return (
    <div className="space-y-2">
      {ready.length === 0 && (
        <p className="text-purple-300 text-sm text-center py-2">
          No pony is ready yet. Ponies need level {MIN_PARENT_LEVEL}, and rest for {REST_WINS} battle wins after hatching.
        </p>
      )}
      {ready.map((c) => {
        const sp = SPECIES_BY_ID[c.speciesId]
        const hint = hintFor?.(c)
        return (
          <button
            key={c.id}
            onClick={() => onPick(c)}
            className="w-full flex items-center gap-3 bg-purple-900/60 hover:bg-purple-800/70 active:bg-purple-700/70
                       rounded-2xl p-3 text-left transition-colors"
          >
            <CreatureSprite element={sp.element} speciesId={sp.id} variant={c.variant} size={48} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-white truncate">
                {c.nickname || sp.name} <span className="text-yellow-300 text-sm">Lv.{c.level}</span>
                {isGuardianPony(c) && <span className="ml-1 text-[10px] text-yellow-300">🏆 Guardian</span>}
              </p>
              <p className="text-purple-300 text-xs capitalize">{sp.element}</p>
              <IvRow c={c} />
              {hint && <PartnerChips hint={hint} variantsFound={variantsFound} />}
            </div>
            <span className="text-purple-400">›</span>
          </button>
        )
      })}
      {waiting.length > 0 && (
        <details className="bg-purple-950/40 rounded-2xl">
          <summary className="px-4 py-2 text-purple-400 text-sm cursor-pointer">
            Not ready yet ({waiting.length})
          </summary>
          <div className="px-3 pb-3 space-y-1.5">
            {waiting.map((c) => {
              const sp = SPECIES_BY_ID[c.speciesId]
              return (
                <div key={c.id} className="flex items-center gap-3 opacity-60">
                  <CreatureSprite element={sp.element} speciesId={sp.id} variant={c.variant} size={32} />
                  <span className="text-sm text-purple-200 flex-1 truncate">{c.nickname || sp.name} · Lv.{c.level}</span>
                  <span className="text-[11px] text-purple-300">{hatchBlockReason(c, battlesWon)}</span>
                </div>
              )
            })}
          </div>
        </details>
      )}
    </div>
  )
}

/** What this partner would bring — shown on each partner row so she can compare. */
function PartnerChips({ hint, variantsFound }: { hint: HatchPreview; variantsFound: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {hint.cost > HATCH_BASE_COST && (
        <Chip className="bg-amber-500/20 text-amber-200">✨ {hint.cost} to hatch</Chip>
      )}
      {hint.sameElement && <Chip className="bg-pink-500/20 text-pink-200">💫 Extra sparkle</Chip>}
      {hint.variants.map(({ variant }) =>
        variantsFound.includes(variant.id)
          ? <Chip key={variant.id} className="bg-sky-500/20 text-sky-200">{variant.emoji} {variant.name} chance</Chip>
          : <Chip key={variant.id} className="bg-fuchsia-500/20 text-fuchsia-200">❓ Mystery color chance</Chip>,
      )}
    </div>
  )
}

function Chip({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${className}`}>{children}</span>
}

function Chosen({ label, pony, onChange }: { label: string; pony: Creature; onChange: () => void }) {
  const sp = SPECIES_BY_ID[pony.speciesId]
  return (
    <div className="flex items-center gap-3 bg-purple-800/50 border border-yellow-400/40 rounded-2xl p-3">
      <CreatureSprite element={sp.element} speciesId={sp.id} variant={pony.variant} size={44} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-yellow-300 font-bold">{label}</p>
        <p className="text-white font-bold truncate">{pony.nickname || sp.name}</p>
        <IvRow c={pony} />
      </div>
      <button onClick={onChange} className="text-purple-300 text-xs underline">Change</button>
    </div>
  )
}

function Preview({ lead, partner, preview, stardust, variantsFound, onSwap, onBack, onHatch }: {
  lead: Creature
  partner: Creature
  preview: HatchPreview
  stardust: number
  variantsFound: string[]
  onSwap: () => void
  onBack: () => void
  onHatch: () => void
}) {
  const leadSp    = SPECIES_BY_ID[lead.speciesId]
  const partnerSp = SPECIES_BY_ID[partner.speciesId]
  const short     = preview.cost - stardust
  const pct = (x: number) => `${Math.round(x * 100)}%`

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-center gap-3">
        <ParentBadge label="Lead" pony={lead} />
        <div className="pb-4 moon-glow rounded-full"><Egg element={leadSp.element} size={64} /></div>
        <ParentBadge label="Partner" pony={partner} />
      </div>

      <p className="text-center text-sm text-purple-200">
        Your foal will be a <b className="text-white">{leadSp.name}</b> ({leadSp.element}).{' '}
        <button onClick={onSwap} className="underline text-sky-300">
          Make it a {partnerSp.name} instead
        </button>
      </p>

      <div className="bg-purple-900/60 rounded-2xl p-4 space-y-2">
        <p className="text-sm font-bold text-white">What the foal could get</p>
        <div className="grid grid-cols-[5.5rem_1fr_1fr_3.5rem] gap-2 text-[10px] uppercase tracking-wide text-purple-400">
          <span />
          <span>Lead</span>
          <span>Partner</span>
          <span className="text-right">Foal</span>
        </div>
        {STATS.map((k) => {
          const r = preview.stats[k]
          return (
            <div key={k} className="grid grid-cols-[5.5rem_1fr_1fr_3.5rem] items-center gap-2 text-sm">
              <span className="text-purple-200">{STAT_LABEL[k]}</span>
              <Stars value={lead.ivs?.[k] ?? 0} />
              <Stars value={partner.ivs?.[k] ?? 0} />
              <span className="text-white font-bold tabular-nums text-right">
                {r.min === r.max ? `${r.min}` : `${r.min}–${r.max}`} ★
              </span>
            </div>
          )
        })}
        <p className="text-xs text-purple-300 pt-1">
          Each stat copies one parent. 💫 Sparkle chance: <b className="text-pink-200">{pct(preview.sparkleChance)}</b> per
          stat for +1 star{preview.sameElement ? ' — extra, because they share an element!' : '.'}
        </p>
      </div>

      <div className="bg-purple-900/60 rounded-2xl p-4 space-y-1.5">
        <p className="text-sm font-bold text-white">Rare color chance</p>
        {preview.variants.length === 0 ? (
          <p className="text-xs text-purple-300">
            No rare colors for this pair. Check the Recipe Book for ideas!
          </p>
        ) : (
          preview.variants.map(({ variant, chance }) => (
            <p key={variant.id} className="text-sm text-purple-100 flex justify-between">
              <span>
                {variantsFound.includes(variant.id)
                  ? `${variant.emoji} ${variant.name}`
                  : '❓ A mystery color!'}
              </span>
              <b className="text-fuchsia-200">{pct(chance)}</b>
            </p>
          ))
        )}
      </div>

      {short > 0 && (
        <p className="text-center text-sm text-amber-200">
          You need <b>{short}</b> more ✨ Stardust. Solve puzzles in Practice to find more!
        </p>
      )}
      <p className="text-center text-xs text-purple-400">
        Both parents will rest until you win {REST_WINS} more battles.
      </p>

      <div className="flex gap-2">
        <button onClick={onBack} className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-2xl font-semibold">
          ← Back
        </button>
        <button
          onClick={onHatch}
          disabled={short > 0}
          className="flex-[2] bg-yellow-400 hover:bg-yellow-300 disabled:bg-purple-800 disabled:text-purple-500
                     text-purple-950 font-bold py-3 rounded-2xl text-lg transition-colors"
        >
          🥚 Hatch! (✨ {preview.cost})
        </button>
      </div>
    </div>
  )
}

function ParentBadge({ label, pony }: { label: string; pony: Creature }) {
  const sp = SPECIES_BY_ID[pony.speciesId]
  return (
    <div className="flex flex-col items-center w-24">
      <CreatureSprite element={sp.element} speciesId={sp.id} variant={pony.variant} size={72} />
      <p className="text-[10px] uppercase tracking-wide text-yellow-300 font-bold">{label}</p>
      <p className="text-xs text-white font-semibold truncate max-w-full">{pony.nickname || sp.name}</p>
    </div>
  )
}

function Reveal({ foal, onParty, onAgain }: { foal: Creature; onParty: () => void; onAgain: () => void }) {
  const sp = SPECIES_BY_ID[foal.speciesId]
  const variant = VARIANTS.find((v) => v.id === foal.variant)
  const sparkled = foal.ivs && STATS.some((k) => (foal.ivs?.[k] ?? 0) === 3)
  return (
    <div className="text-center space-y-4 py-4">
      <div className="text-4xl">🎉</div>
      <div className="flex justify-center foal-reveal">
        <div className={variant ? 'moon-glow rounded-full p-2' : ''}>
          <CreatureSprite element={sp.element} speciesId={sp.id} variant={foal.variant} size={96} />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-yellow-300">A baby {sp.name}!</h3>
      {variant && (
        <p className="text-lg font-bold text-fuchsia-200">
          {variant.emoji} It's a rare {variant.name} foal! {variant.emoji}
        </p>
      )}
      <div className="inline-block bg-purple-900/60 rounded-2xl px-5 py-3 text-left space-y-1">
        {STATS.map((k) => (
          <p key={k} className="text-sm text-purple-100 flex justify-between gap-6">
            <span>{STAT_LABEL[k]}</span>
            <Stars value={foal.ivs?.[k] ?? 0} />
          </p>
        ))}
      </div>
      {sparkled && !variant && <p className="text-sm text-pink-200">💫 What a star!</p>}
      <p className="text-sm text-purple-300">
        {foal.nickname} joined your party. Foals grow up with XP like everyone else!
      </p>
      <div className="flex gap-2">
        <button onClick={onAgain} className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-3 rounded-2xl font-semibold">
          Hatch another
        </button>
        <button onClick={onParty} className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-purple-950 py-3 rounded-2xl font-bold">
          See my party →
        </button>
      </div>
    </div>
  )
}

function RecipeBook({ found }: { found: string[] }) {
  return (
    <details className="bg-purple-900/40 rounded-2xl">
      <summary className="px-4 py-3 text-purple-100 font-semibold cursor-pointer">
        📜 Recipe Book <span className="text-purple-400 text-sm font-normal">({found.length} of {VARIANTS.length} found)</span>
      </summary>
      <div className="px-4 pb-4 space-y-2">
        {VARIANTS.map((v) => {
          const got = found.includes(v.id)
          return (
            <div key={v.id} className="flex gap-3 items-start">
              <span className={`text-2xl ${got ? '' : 'grayscale opacity-40'}`}>{got ? v.emoji : '❓'}</span>
              <div>
                <p className={`font-bold text-sm ${got ? 'text-white' : 'text-purple-400'}`}>{got ? v.name : '???'}</p>
                <p className="text-xs text-purple-300 italic">{got ? v.recipe : v.clue}</p>
              </div>
            </div>
          )
        })}
      </div>
    </details>
  )
}

/** Code-drawn speckled egg in the lead parent's element colors. */
function Egg({ element, size }: { element: Element; size: number }) {
  const [light, dark] = EGG_COLOR[element]
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" aria-hidden="true">
      <defs>
        <radialGradient id={`egg-${element}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
      </defs>
      <path d="M40 4 C62 4 76 40 76 62 C76 84 60 96 40 96 C20 96 4 84 4 62 C4 40 18 4 40 4 Z" fill={`url(#egg-${element})`} />
      {[[28, 40, 4], [52, 32, 3], [58, 60, 5], [24, 70, 3.5], [42, 80, 3], [36, 56, 2.5]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={dark} opacity={0.35} />
      ))}
      <text x="40" y="58" textAnchor="middle" dominantBaseline="central" fontSize="18" opacity={0.7}>✨</text>
    </svg>
  )
}
