import { useRef, useState, useMemo } from 'react'
import type { ChangeEvent } from 'react'
import { useGameStore } from '../state/store'
import PartyCard from '../components/PartyCard'
import TeamPicker from '../components/TeamPicker'
import { resolveBattleTeam, shouldShowPicker } from '../engine/team'
import { exportSave, importSave } from '../state/save'
import { SPECIES_BY_ID } from '../content/creatures'
import type { Element } from '../engine/types'

type FilterType = 'all' | Element | 'team'
type SortType = 'level-desc' | 'level-asc' | 'name-asc' | 'newest'

const ELEMENT_COLORS: Record<Element, string> = {
  water:  '#3b82f6',
  fire:   '#f97316',
  air:    '#38bdf8',
  spirit: '#a855f7',
  earth:  '#d97706',
}

const ELEMENT_FILTERS: Element[] = ['water', 'fire', 'air', 'spirit', 'earth']

// The wheel: each entry beats the next (wraps around)
const TYPE_CYCLE: Element[] = ['water', 'fire', 'air', 'spirit', 'earth']

export default function Party() {
  const playerName    = useGameStore((s) => s.playerName)
  const party         = useGameStore((s) => s.party)
  const activeTeam    = useGameStore((s) => s.activeTeam)
  const setActiveTeam = useGameStore((s) => s.setActiveTeam)
  const badges        = useGameStore((s) => s.badges)
  const levelCap      = useGameStore((s) => s.levelCap)
  const load          = useGameStore((s) => s.load)
  const resetGame     = useGameStore((s) => s.resetGame)
  const fileInputRef  = useRef<HTMLInputElement>(null)

  const [confirmReset,  setConfirmReset]  = useState(false)
  const [pickerOpen,    setPickerOpen]    = useState(false)
  const [filter,        setFilter]        = useState<FilterType>('all')
  const [sort,          setSort]          = useState<SortType>('level-desc')
  const [typeChartOpen, setTypeChartOpen] = useState(false)

  const activeIds = new Set(resolveBattleTeam(party, activeTeam).map((c) => c.speciesId))
  const canPick   = shouldShowPicker(party)

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ok = await importSave(file)
    if (ok) load()
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const displayList = useMemo(() => {
    const ids = new Set(resolveBattleTeam(party, activeTeam).map((c) => c.speciesId))
    let result = party.map((c, i) => ({ creature: c, idx: i }))

    if (filter === 'team') {
      result = result.filter(({ creature }) => ids.has(creature.speciesId))
    } else if (filter !== 'all') {
      result = result.filter(({ creature }) => SPECIES_BY_ID[creature.speciesId]?.element === filter)
    }

    return [...result].sort((a, b) => {
      switch (sort) {
        case 'level-desc': return b.creature.level - a.creature.level
        case 'level-asc':  return a.creature.level - b.creature.level
        case 'name-asc': {
          const na = a.creature.nickname || SPECIES_BY_ID[a.creature.speciesId]?.name || ''
          const nb = b.creature.nickname || SPECIES_BY_ID[b.creature.speciesId]?.name || ''
          return na.localeCompare(nb)
        }
        case 'newest': return b.idx - a.idx
      }
    })
  }, [party, activeTeam, filter, sort])

  const emptyMessage =
    filter === 'team'  ? 'No ponies on your team yet — go pick your battle team!' :
    filter !== 'all'   ? `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} ponies yet — go explore!` :
    ''

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-300">Party</h2>
        <p className="text-purple-300 text-sm mt-1">
          Trainer: <span className="text-white font-semibold">{playerName || '—'}</span>
          {' · '}Badges: {badges}
          {' · '}Level cap: {levelCap}
        </p>
        {party.length > 0 && (
          <p className="text-purple-400 text-sm mt-0.5">
            🦄 {party.length} {party.length === 1 ? 'pony' : 'ponies'} collected
          </p>
        )}
      </div>

      {party.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-3">🌟</div>
          <p className="text-purple-400">No creatures yet.</p>
          <p className="text-purple-500 text-sm">Start your adventure to build your party!</p>
        </div>
      ) : (
        <div className="space-y-3">

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2">
            {(['all', ...ELEMENT_FILTERS, 'team'] as FilterType[]).map((f) => {
              const isActive = filter === f
              const label =
                f === 'all'  ? 'All' :
                f === 'team' ? 'On Team' :
                f.charAt(0).toUpperCase() + f.slice(1)
              const color = ELEMENT_COLORS[f as Element]
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={isActive && color ? { backgroundColor: color, color: 'white' } : undefined}
                  className={[
                    'min-h-[44px] px-3 py-1 rounded-xl text-sm font-semibold transition-all',
                    isActive && !color
                      ? 'bg-yellow-400 text-purple-950'
                      : !isActive
                        ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                        : '',
                  ].join(' ')}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Sort row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-purple-400 text-xs shrink-0">Sort:</span>
            {([
              ['level-desc', 'Level ↓'],
              ['level-asc',  'Level ↑'],
              ['name-asc',   'A→Z'],
              ['newest',     'Newest'],
            ] as [SortType, string][]).map(([s, label]) => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={[
                  'min-h-[44px] px-3 py-1 rounded-xl text-xs font-medium transition-all',
                  sort === s
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-900/50 text-purple-400 border border-purple-700/50',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Type advantage quick reference */}
          <div className="bg-purple-900/40 rounded-2xl overflow-hidden">
            <button
              onClick={() => setTypeChartOpen((o) => !o)}
              className="w-full min-h-[44px] px-4 py-2 flex items-center justify-between"
            >
              <span className="text-purple-200 text-sm font-semibold">⚔️ Type Strengths</span>
              <span className="text-purple-400 text-xs">{typeChartOpen ? '▲ hide' : '▼ show'}</span>
            </button>
            {typeChartOpen && (
              <div className="px-4 pb-4 space-y-3">
                <div>
                  <p className="text-purple-300 text-xs font-semibold mb-1">⚔️ Offense (deals ×2 to next)</p>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
                    {[...TYPE_CYCLE, TYPE_CYCLE[0]].map((el, i) => (
                      <span key={i} className="flex items-center gap-1">
                        {i > 0 && <span className="text-purple-400">→</span>}
                        <span className="font-bold capitalize" style={{ color: ELEMENT_COLORS[el] }}>
                          {el}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-purple-300 text-xs font-semibold mb-1">🛡️ Defense (resists attacks from)</p>
                  <div className="space-y-0.5">
                    {TYPE_CYCLE.map((el) => {
                      // Each element resists the element 2 steps behind it on the attack wheel
                      const resistsIdx = (TYPE_CYCLE.indexOf(el) + 3) % TYPE_CYCLE.length
                      const resists = TYPE_CYCLE[resistsIdx]
                      return (
                        <div key={el} className="flex items-center gap-1 text-xs">
                          <span className="font-bold capitalize w-12" style={{ color: ELEMENT_COLORS[el] }}>{el}</span>
                          <span className="text-purple-400">resists</span>
                          <span className="font-bold capitalize" style={{ color: ELEMENT_COLORS[resists] }}>{resists}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-purple-500 text-xs">Offense and defense run on different axes — being strong against an element doesn't mean it's weak against you!</p>
              </div>
            )}
          </div>

          {/* Battle team — always visible, unaffected by filter */}
          {canPick && (
            <div className="flex items-center justify-between bg-purple-900/40 rounded-2xl px-3 py-2">
              <p className="text-sm text-purple-200">
                Battle team: <span className="text-white font-semibold">{activeIds.size} of 3 ponies</span>
              </p>
              <button
                onClick={() => setPickerOpen(true)}
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-bold text-sm px-4 py-2 rounded-xl transition-colors"
              >
                Choose team
              </button>
            </div>
          )}

          {/* Pony list */}
          {displayList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🔍</p>
              <p className="text-purple-400 text-sm">{emptyMessage}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayList.map(({ creature, idx }) => (
                <PartyCard
                  key={idx}
                  creature={creature}
                  levelCap={levelCap}
                  active={canPick && activeIds.has(creature.speciesId)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {pickerOpen && (
        <TeamPicker
          party={party}
          initialSelection={[...activeIds]}
          onConfirm={(ids) => { setActiveTeam(ids); setPickerOpen(false) }}
          onCancel={() => setPickerOpen(false)}
        />
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={exportSave}
          className="flex-1 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 text-white py-2 rounded-xl text-sm font-medium transition-colors"
        >
          Export Save
        </button>
        <label className="flex-1 bg-purple-700 hover:bg-purple-600 active:bg-purple-500 text-white py-2 rounded-xl text-sm font-medium transition-colors text-center cursor-pointer">
          Import Save
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleImport}
          />
        </label>
      </div>

      {confirmReset ? (
        <div className="bg-red-950/60 border border-red-700/50 rounded-2xl p-4 space-y-3">
          <p className="text-red-300 text-sm font-medium text-center">
            This will erase your save and restart from the beginning.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-xl text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl text-sm font-bold transition-colors"
            >
              Yes, reset
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setConfirmReset(true)}
          className="w-full text-red-400 hover:text-red-300 text-sm py-2 transition-colors"
        >
          New Game (erase save)
        </button>
      )}
    </div>
  )
}
