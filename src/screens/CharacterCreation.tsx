import { useState } from 'react'
import { useGameStore } from '../state/store'
import { STARTER_SPECIES, STARTER_VIBES, SPECIES_BY_ID } from '../content/creatures'
import CreatureSprite from '../components/CreatureSprite'
import { getStats } from '../engine/stats'
import { rollIvs } from '../engine/ivs'
import type { Element, Ivs } from '../engine/types'
import charCreationBg from '../assets/backgrounds/character-creation.jpg'

const ELEMENT_LABEL: Record<Element, string> = {
  water: 'Water', fire: 'Fire', air: 'Air', spirit: 'Spirit', earth: 'Earth',
}

const ELEMENT_FLAVOR: Record<Element, string> = {
  water:  'Calm and flowing — she keeps the team steady.',
  fire:   'Bold and bright — she charges in fearlessly.',
  air:    'Quick and light — nothing can catch her.',
  spirit: 'Mysterious and wise — she sees what others miss.',
  earth:  'Strong and true — a steadfast friend.',
}

const ACCENT_SWATCHES = [
  { label: 'Rose',     hex: '#f472b6' },
  { label: 'Teal',     hex: '#2dd4bf' },
  { label: 'Gold',     hex: '#fbbf24' },
  { label: 'Lavender', hex: '#c084fc' },
  { label: 'Coral',    hex: '#fb7185' },
  { label: 'Mint',     hex: '#4ade80' },
]

export default function CharacterCreation() {
  const setPlayerName = useGameStore((s) => s.setPlayerName)
  const addToParty    = useGameStore((s) => s.addToParty)
  const setScreen     = useGameStore((s) => s.setScreen)

  const [step,         setStep]        = useState<'pick' | 'customize'>('pick')
  const [trainerName,  setTrainerName] = useState('Evelyn')
  const [pickedId,     setPickedId]    = useState('')
  const [nickname,     setNickname]    = useState('')
  const [accentColor,  setAccentColor] = useState('#f472b6')
  // Her starter's permanent IVs (§5), rolled when she picks a pony.
  const [starterIvs,   setStarterIvs]  = useState<Ivs>(() => rollIvs())

  function handlePick(speciesId: string) {
    const species = SPECIES_BY_ID[speciesId]
    setPickedId(speciesId)
    setNickname(species.name)
    setAccentColor(species.spritePlaceholderColor)
    setStarterIvs(rollIvs())   // fresh IVs for this chosen pony
    setStep('customize')
  }

  function handleStartAdventure() {
    const species = SPECIES_BY_ID[pickedId]
    const stats   = getStats(species.tier, 3, starterIvs)  // all Zone 1 ponies start at level 3
    addToParty({
      speciesId:   pickedId,
      nickname:    nickname.trim() || species.name,
      level:       3,
      currentHp:   stats.heart,
      accentColor,
      ivs:         starterIvs,
    })
    setPlayerName(trainerName.trim() || 'Trainer') // setPlayerName also saves
    setScreen('worldMap')
  }

  // ── Step 1: Pick your pony ───────────────────────────────────────────────
  if (step === 'pick') {
    return (
      <div className="min-h-screen relative flex flex-col">
        <img src={charCreationBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-5">
          <div className="text-center pt-4">
            <div className="text-5xl mb-2">🌟</div>
            <h1 className="text-3xl font-bold text-yellow-300">Welcome, Trainer!</h1>
            <p className="text-purple-300 text-sm mt-1">
              Choose your first companion to begin your adventure.
            </p>
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-medium mb-1">
              Your name
            </label>
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              maxLength={20}
              className="w-full bg-purple-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="space-y-3">
            <p className="text-purple-300 text-sm font-medium">Pick your companion:</p>
            {STARTER_SPECIES.map((species) => (
              <button
                key={species.id}
                onClick={() => handlePick(species.id)}
                className="w-full bg-purple-900/70 hover:bg-purple-800 active:bg-purple-700 rounded-2xl p-4 flex items-center gap-4 transition-colors text-left"
              >
                {/* Mystery sprite — neutral color until element is revealed */}
                <div
                  style={{ width: 56, height: 56, backgroundColor: '#6b7280' }}
                  className="rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-lg"
                >
                  ⭐
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold">{species.name}</div>
                  <div className="text-purple-300 text-sm">
                    {STARTER_VIBES[species.id]}
                  </div>
                </div>
                <span className="text-purple-400 text-xl">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Step 2: Reveal element & customize ──────────────────────────────────
  const picked = SPECIES_BY_ID[pickedId]
  const stats  = getStats(picked.tier, 3, starterIvs)

  return (
    <div className="min-h-screen relative flex flex-col">
      <img src={charCreationBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-5">
        {/* Reveal banner */}
        <div className="text-center pt-4 space-y-2">
          <div className="text-4xl">✨</div>
          <h2 className="text-2xl font-bold text-yellow-300">
            {picked.name} is a{' '}
            <span className="capitalize">{ELEMENT_LABEL[picked.element]}</span> pony!
          </h2>
          <p className="text-purple-300 text-sm">{ELEMENT_FLAVOR[picked.element]}</p>
        </div>

        {/* Live preview sprite with accent color */}
        <div className="flex justify-center">
          <CreatureSprite element={picked.element} color={accentColor} size={100} />
        </div>

        {/* Stats preview */}
        <div className="flex justify-center gap-6 text-center text-sm">
          <div><div className="text-red-400 font-bold text-lg">{stats.heart}</div><div className="text-purple-400">Heart</div></div>
          <div><div className="text-orange-400 font-bold text-lg">{stats.power}</div><div className="text-purple-400">Power</div></div>
          <div><div className="text-sky-400 font-bold text-lg">{stats.speed}</div><div className="text-purple-400">Speed</div></div>
        </div>

        {/* Rename */}
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-1">
            Give her a nickname
          </label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={20}
            className="w-full bg-purple-800 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Color accent */}
        <div>
          <p className="text-purple-300 text-sm font-medium mb-2">Pick her accent color</p>
          <div className="flex gap-2 flex-wrap">
            {ACCENT_SWATCHES.map((swatch) => (
              <button
                key={swatch.hex}
                onClick={() => setAccentColor(swatch.hex)}
                style={{ backgroundColor: swatch.hex }}
                className={`w-10 h-10 rounded-full transition-transform ${
                  accentColor === swatch.hex ? 'ring-2 ring-white scale-110' : 'hover:scale-105'
                }`}
                aria-label={swatch.label}
              />
            ))}
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={handleStartAdventure}
          className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-200 text-purple-950 font-bold py-4 rounded-2xl text-lg transition-colors mt-2"
        >
          Start Adventure! 🌟
        </button>

        <button
          onClick={() => setStep('pick')}
          className="w-full text-purple-400 hover:text-purple-300 text-sm py-2"
        >
          ← Pick a different pony
        </button>
      </div>
    </div>
  )
}
