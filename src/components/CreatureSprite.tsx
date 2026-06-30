import type { Element } from '../engine/types'
import marinaMist from '../assets/ponies/marina-mist.png'
import emberSpark from '../assets/ponies/ember-spark.png'
import skyDancer from '../assets/ponies/sky-dancer.png'
import stellaDream from '../assets/ponies/stella-dream.png'
import meadowBloom from '../assets/ponies/meadow-bloom.png'

// Real art for the 5 starters, keyed by speciesId. Any species not listed here
// falls back to the element emoji-circle placeholder below.
const SPRITE_BY_SPECIES: Record<string, string> = {
  'marina-mist':  marinaMist,
  'ember-spark':  emberSpark,
  'sky-dancer':   skyDancer,
  'stella-dream': stellaDream,
  'meadow-bloom': meadowBloom,
}

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
        style={{ width: size, height: size, objectFit: 'contain' }}
        className="flex-shrink-0"
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
