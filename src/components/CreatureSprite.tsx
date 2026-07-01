import type { Element } from '../engine/types'

// Real pony art, keyed by speciesId (= PNG filename without extension). Sprites
// are discovered at build time from src/assets/ponies/, so adding a new pony is
// just dropping a correctly-named PNG in that folder — no code change here. Any
// speciesId without a matching file falls back to the element emoji-circle.
const spriteModules = import.meta.glob<string>('/src/assets/ponies/*.png', {
  eager: true,
  import: 'default',
})
const SPRITE_BY_SPECIES: Record<string, string> = Object.fromEntries(
  Object.entries(spriteModules).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.png$/, ''),
    url,
  ]),
)

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
  speciesId?: string
}

export default function CreatureSprite({ element, color, size = 64, speciesId }: Props) {
  // Starters with real art render their PNG; everything else uses the placeholder.
  const sprite = speciesId ? SPRITE_BY_SPECIES[speciesId] : undefined
  if (sprite) {
    return (
      <img
        src={sprite}
        alt={`${element} unicorn`}
        draggable={false}
        // pointer-events:none so the native image drag can't hijack the wrapper's
        // custom drag-to-target gesture — the wrapper <div> owns all pointer input.
        style={{ width: size, height: size, objectFit: 'contain', pointerEvents: 'none' }}
        className="flex-shrink-0 select-none"
      />
    )
  }

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
