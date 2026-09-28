import { useId } from 'react'
import type { Tier } from '../engine/achievements'

// Code-drawn trophy medal (§19): a ribboned disc in the tier's metal with the
// achievement's emoji in the middle. Locked medals render as a grey silhouette.

const METAL: Record<Tier, { light: string; mid: string; dark: string; ribbon: string }> = {
  bronze:  { light: '#f6c89a', mid: '#cd7f32', dark: '#8a4f1d', ribbon: '#7c3aed' },
  silver:  { light: '#ffffff', mid: '#c0c7d4', dark: '#7b8494', ribbon: '#2563eb' },
  gold:    { light: '#fff3b0', mid: '#f5c518', dark: '#a67c00', ribbon: '#dc2626' },
  special: { light: '#fbcfe8', mid: '#e879f9', dark: '#9d2fb5', ribbon: '#0ea5e9' },
}

const NOTCHES: Record<Tier, number> = { bronze: 1, silver: 2, gold: 3, special: 0 }

const LOCKED = { light: '#6b6480', mid: '#4a4460', dark: '#2f2a40', ribbon: '#3b3552' }

interface Props {
  tier: Tier
  icon: string
  locked?: boolean
  /** Rendered width in px; height is 1.25× for the ribbon. */
  size?: number
}

export default function Medal({ tier, icon, locked = false, size = 56 }: Props) {
  const c = locked ? LOCKED : METAL[tier]
  // useId() output can contain ':' / '«»', which break SVG url(#id) references.
  const gid = 'm' + useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 80 100" aria-hidden="true" className="flex-shrink-0">
      <defs>
        <radialGradient id={`${gid}-disc`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="55%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
      </defs>

      {/* Ribbon tails */}
      <path d="M22 4 L36 4 L44 42 L30 42 Z" fill={c.ribbon} />
      <path d="M58 4 L44 4 L36 42 L50 42 Z" fill={c.ribbon} opacity={0.8} />

      {/* Disc: rim, face, inner ring */}
      <circle cx="40" cy="62" r="34" fill={c.dark} />
      <circle cx="40" cy="62" r="31" fill={`url(#${gid}-disc)`} />
      <circle cx="40" cy="62" r="24" fill="none" stroke={c.dark} strokeOpacity={0.45} strokeWidth="1.5" />

      {/* Tier notches around the rim (1 bronze, 2 silver, 3 gold) */}
      {!locked && tier !== 'special' &&
        Array.from({ length: NOTCHES[tier] }, (_, i) => {
          const x = 40 + (i - (NOTCHES[tier] - 1) / 2) * 9
          return <circle key={i} cx={x} cy="92" r="2.6" fill={c.light} stroke={c.dark} strokeWidth="1" />
        })}

      <text
        x="40" y="63"
        textAnchor="middle" dominantBaseline="central"
        fontSize="28"
        style={locked ? { filter: 'grayscale(1)', opacity: 0.35 } : undefined}
      >
        {locked ? '🔒' : icon}
      </text>
    </svg>
  )
}
