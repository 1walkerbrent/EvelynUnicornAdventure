import type { Element } from '../engine/types'

const ELEMENT_EMOJI: Record<Element, string> = {
  water:  '💧',
  fire:   '🔥',
  air:    '💨',
  spirit: '✨',
  earth:  '🌿',
}

const ELEMENT_DEFAULT_COLOR: Record<Element, string> = {
  water:  '#3b82f6',
  fire:   '#f97316',
  air:    '#38bdf8',
  spirit: '#a855f7',
  earth:  '#d97706',
}

interface Props {
  element: Element
  color?: string
  size?: number
}

export default function CreatureSprite({ element, color, size = 64 }: Props) {
  const bg = color ?? ELEMENT_DEFAULT_COLOR[element]
  const emojiSize = Math.round(size * 0.45)

  return (
    <div
      style={{ width: size, height: size, backgroundColor: bg, fontSize: emojiSize }}
      className="rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
      aria-label={`${element} unicorn placeholder`}
      role="img"
    >
      {ELEMENT_EMOJI[element]}
    </div>
  )
}
