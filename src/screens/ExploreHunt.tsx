import { useMemo, useState } from 'react'
import { useGameStore } from '../state/store'
import { SPECIES_BY_ID } from '../content/creatures'
import { ZONE_BY_ID } from '../content/zones'
import { getStats } from '../engine/stats'
import { pickWildEncounter, buildWildMiniBoss } from '../engine/explore'
import { rollIvs } from '../engine/ivs'
import { resolveBattleTeam } from '../engine/team'
import { XP_PER_BATTLE_WIN } from '../engine/leveling'
import { effectiveDifficulty } from '../engine/difficulty'
import { zoneNumber } from '../engine/progression'
import { generateHuntMathProblem } from '../engine/huntMathGenerator'
import { generateLogicProblem } from '../engine/logicGenerator'
import { generateComprehensionProblem } from '../engine/comprehensionGenerator'
import { selectProblemCategory } from '../engine/puzzleSelector'
import type { Problem } from '../engine/problems'
import BattleScreen from '../components/BattleScreen'
import ProblemCard from '../components/ProblemCard'
import { buildPlayerTeam } from './teams'

// Explore → Hunt (§8): the collection faucet. A warm-up puzzle (weighted category
// selection + Hunt math bands) gates a wild pony battle; win to tame.
export default function ExploreHunt() {
  const party                = useGameStore((s) => s.party)
  const activeTeam           = useGameStore((s) => s.activeTeam)
  const levelCap             = useGameStore((s) => s.levelCap)
  const addToParty           = useGameStore((s) => s.addToParty)
  const awardXpToParty       = useGameStore((s) => s.awardXpToParty)
  const setScreen            = useGameStore((s) => s.setScreen)
  const selectedZoneId       = useGameStore((s) => s.selectedZoneId)
  const recentPuzzleAttempts = useGameStore((s) => s.recentPuzzleAttempts)
  const recordPuzzleAttempt  = useGameStore((s) => s.recordPuzzleAttempt)

  const zone       = selectedZoneId ? ZONE_BY_ID[selectedZoneId] : undefined
  const num        = zone ? zoneNumber(zone.id) : 1
  const partyLevel = party.reduce((m, c) => Math.max(m, c.level), 1)

  // Pick the encounter once on mount (stable across retries).
  const encounter = useState(() => {
    const owned = new Set(party.map((c) => c.speciesId))
    return selectedZoneId ? pickWildEncounter(selectedZoneId, owned) : null
  })[0]

  const species = encounter ? SPECIES_BY_ID[encounter.speciesId] : undefined

  // Generate the warm-up puzzle once on mount. Hunt uses simpler math bands.
  const huntPuzzle = useState<Problem>(() => {
    const diff     = effectiveDifficulty(num, partyLevel)
    const category = selectProblemCategory(recentPuzzleAttempts)
    if (category === 'math')  return generateHuntMathProblem(num)
    if (category === 'logic') return generateLogicProblem(diff)
    return generateComprehensionProblem(diff)
  })[0]

  const [phase, setPhase] = useState<'puzzle' | 'battle'>('puzzle')

  // Hunts use the active team as-is (no swap nudge — the wild element is unknown).
  const playerPonies = useMemo(
    () => buildPlayerTeam(resolveBattleTeam(party, activeTeam)),
    [party, activeTeam],
  )
  // The wild pony is a mini-boss (§8): level = party top + 2, with buffed
  // Heart/Power so taming is earned. Catch difficulty is decoupled from the
  // reward — see tameAndReturn, which joins it at the current level cap.
  const enemyPonies = useMemo(
    () => species && encounter ? [{ ...buildWildMiniBoss('wild-0', species.name, species.element, encounter.tier, partyLevel), speciesId: species.id }] : [],
    [species, encounter, partyLevel],
  )

  // ── Nothing left to catch here ───────────────────────────────────────────
  if (!encounter || !species) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6 text-center bg-purple-950">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold text-yellow-300">You've caught them all here!</h2>
        <p className="text-purple-300 max-w-xs">
          Every wild pony in this region is already your friend. Try Practice to keep leveling up!
        </p>
        <button
          onClick={() => setScreen('exploreHub')}
          className="bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold px-8 py-3 rounded-2xl transition-colors"
        >
          ← Back to Explore
        </button>
      </div>
    )
  }

  // ── Warm-up puzzle phase ─────────────────────────────────────────────────
  if (phase === 'puzzle') {
    return (
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-yellow-300">Before the Hunt…</h2>
          <p className="text-purple-400 text-sm mt-1">
            Solve this warm-up, then go catch <span className="text-white font-semibold">{species.name}</span>!
          </p>
        </div>
        <ProblemCard
          problem={huntPuzzle}
          onSolve={() => setPhase('battle')}
          onAttempt={(correct) => recordPuzzleAttempt(huntPuzzle.type, correct)}
        />
        <button
          onClick={() => setScreen('exploreHub')}
          className="w-full text-purple-400 hover:text-purple-300 text-sm py-2"
        >
          ← Back to Explore
        </button>
      </div>
    )
  }

  // ── Battle phase ─────────────────────────────────────────────────────────
  function tameAndReturn() {
    // Tame-at-cap (§8/§6): the tamed pony joins at the player's CURRENT level
    // cap at full HP — strong and usable, but never above cap and never at the
    // boosted mini-boss level. Catch difficulty and reward power stay separate.
    const tameLevel = levelCap
    // Roll this pony's permanent IVs on acquisition (§5).
    const ivs = rollIvs()
    const stats = getStats(species!.tier, tameLevel, ivs)
    addToParty({
      speciesId: species!.id,
      nickname:  species!.name,
      level:     tameLevel,
      currentHp: stats.heart,
      xp:        0,
      ivs,
    })
    awardXpToParty(XP_PER_BATTLE_WIN)
    setScreen('exploreHub')
  }

  return (
    <BattleScreen
      playerPonies={playerPonies}
      enemyPonies={enemyPonies}
      enemyLabel={encounter.rare ? `Rare ${species.name}!` : `Wild ${species.name}`}
      // Per-zone hunt scene ("hunt-z1"…"hunt-z6").
      backgroundId={selectedZoneId ? `hunt-${selectedZoneId}` : undefined}
      victoryTitle={`You tamed ${species.name}! 🦄`}
      victoryMessage={
        encounter.rare
          ? `A rare ${species.name} joins your party — what a find!`
          : `${species.name} joins your party!`
      }
      victoryButtonLabel="Add to party →"
      onVictory={tameAndReturn}
      onDefeat={() => setScreen('exploreHub')}
    />
  )
}
