import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { ACHIEVEMENTS } from '../engine/achievements'
import type { Achievement, Family, Snapshot } from '../engine/achievements'
import Medal from '../components/Medal'

// The Trophy Shelf (§19): achievements grouped by family. A bronze/silver/gold
// ladder shows as ONE card — the best medal earned so far, and a progress bar
// toward the next step. Secret trophies stay "???" until earned.

const FAMILIES: Array<{ id: Family; title: string }> = [
  { id: 'learning',   title: '📚 Learning' },
  { id: 'collecting', title: '🦄 Collecting' },
  { id: 'hatching',   title: '🥚 Hatching' },
  { id: 'battle',     title: '⚔️ Battle' },
  { id: 'journey',    title: '🗺️ Journey' },
]

/** One card's worth: a single trophy, or every step of one ladder. */
function groupFamily(family: Family): Achievement[][] {
  const groups: Achievement[][] = []
  const byLadder = new Map<string, Achievement[]>()
  for (const a of ACHIEVEMENTS.filter((x) => x.family === family)) {
    if (!a.ladder) { groups.push([a]); continue }
    const g = byLadder.get(a.ladder)
    if (g) g.push(a)
    else { const fresh = [a]; byLadder.set(a.ladder, fresh); groups.push(fresh) }
  }
  return groups
}

export default function Trophies() {
  const lifetime      = useGameStore((s) => s.lifetime)
  const party         = useGameStore((s) => s.party)
  const badges        = useGameStore((s) => s.badges)
  const prestigeCount = useGameStore((s) => s.prestigeCount)
  const stardust      = useGameStore((s) => s.stardust)
  const unlocked      = useGameStore((s) => s.achievements)

  const snap: Snapshot = {
    lifetime, party, badges, prestigeCount,
    elementOf: (id) => SPECIES_BY_ID[id]?.element,
  }
  const earnedCount = ACHIEVEMENTS.filter((a) => a.id in unlocked).length

  return (
    <div className="p-4 space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-yellow-300">Trophies</h2>
          <p className="text-purple-300 text-sm">{earnedCount} of {ACHIEVEMENTS.length} earned</p>
        </div>
        <div className="bg-black/40 border border-amber-300/40 rounded-2xl px-4 py-2 text-right">
          <p className="text-amber-200 text-xl font-bold leading-tight">✨ {stardust}</p>
          <p className="text-purple-300 text-[11px]">Stardust</p>
        </div>
      </div>

      <p className="text-purple-300 text-xs">
        Every puzzle you solve finds Stardust — even more on the first try. Trophies give a big handful!
      </p>

      {FAMILIES.map((f) => (
        <section key={f.id} className="space-y-2">
          <h3 className="text-lg font-bold text-white">{f.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {groupFamily(f.id).map((steps) => (
              <TrophyCard key={steps[0].id} steps={steps} snap={snap} unlocked={unlocked} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function TrophyCard({ steps, snap, unlocked }: {
  steps: Achievement[]
  snap: Snapshot
  unlocked: Record<string, string>
}) {
  const earned = steps.filter((a) => a.id in unlocked)
  const best   = earned.at(-1)
  const next   = steps.find((a) => !(a.id in unlocked))
  // Show the next step to chase; once the ladder is done, show the top step.
  const shown  = next ?? steps[steps.length - 1]
  const hidden = shown.secret && !best
  const value  = Math.min(shown.progress(snap), shown.target)
  const showBar = next !== undefined && !hidden && next.target > 1

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3 border ${
      best ? 'bg-purple-800/60 border-amber-300/40' : 'bg-purple-900/40 border-purple-800'
    }`}>
      <Medal tier={(best ?? shown).tier} icon={shown.icon} locked={!best} size={44} />
      <div className="min-w-0 flex-1">
        <p className={`font-bold ${best ? 'text-white' : 'text-purple-300'}`}>
          {hidden ? '???' : shown.name}
          {steps.length > 1 && (
            <span className="ml-1.5 inline-flex gap-0.5 align-middle" aria-label={`${earned.length} of ${steps.length} steps`}>
              {steps.map((a) => (
                <span key={a.id} className={`inline-block w-2 h-2 rounded-full ${
                  a.id in unlocked ? TIER_DOT[a.tier] : 'bg-purple-700'
                }`} />
              ))}
            </span>
          )}
        </p>
        <p className="text-purple-300 text-xs">
          {hidden ? 'A secret trophy. Keep adventuring!'
            : next ? next.description
            : `${shown.description} — all done!`}
        </p>
        {showBar && (
          <div className="mt-1.5 flex items-center gap-2">
            <div className="h-2 flex-1 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-amber-300 rounded-full" style={{ width: `${(value / next.target) * 100}%` }} />
            </div>
            <span className="text-[10px] text-purple-300 tabular-nums">{value}/{next.target}</span>
          </div>
        )}
        {showBar && (
          <p className="text-amber-200/70 text-[10px] mt-0.5">Next: +{next.reward} ✨</p>
        )}
        {best && !next && (
          <p className="text-amber-200/80 text-[10px] mt-0.5">
            Earned {new Date(unlocked[best.id]).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

const TIER_DOT: Record<Achievement['tier'], string> = {
  bronze:  'bg-[#cd7f32]',
  silver:  'bg-[#c0c7d4]',
  gold:    'bg-[#f5c518]',
  special: 'bg-[#e879f9]',
}
