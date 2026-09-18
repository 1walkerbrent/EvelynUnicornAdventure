export interface SpellingEntry {
  /** Difficulty band 1–6, mapped from zone number (matches the comprehension bank). */
  zone: 1 | 2 | 3 | 4 | 5 | 6
  /** The word to spell — lowercase a–z only (tiles are one letter each). */
  word: string
  /** Read aloud by the "in a sentence" button. Gives context without spelling it out. */
  sentence: string
  /** Shown on the 3rd wrong attempt (§10) — a phonics nudge, never the full word. */
  hint: string
}

// Static spelling bank: 15 words per zone, themed to that zone's region and element.
// Banded by spelling difficulty, not just length — band 1 is simple short vowels and
// CVCe, band 6 is multi-syllable words with schwa sounds and silent letters.
// Anti-repeat cycling in spellingGenerator.ts means a zone's 15 cycle before repeating.
export const SPELLING_BANK: SpellingEntry[] = [
  // ── Zone 1 — Starter: Brindlewood Home, Sunflower Hollow, Proving Glade ───
  // Band 1: 4–5 letters, one syllable, regular short vowels and CVCe.
  {
    zone: 1,
    word: 'mane',
    sentence: 'Her mane shines in the morning sun.',
    hint: "Starts with 'm'. The silent 'e' at the end makes the 'a' say its name.",
  },
  {
    zone: 1,
    word: 'hoof',
    sentence: 'The pony tapped one hoof on the path.',
    hint: "Starts with 'h'. Two 'o' letters in the middle make the 'oo' sound.",
  },
  {
    zone: 1,
    word: 'glow',
    sentence: 'Her horn began to glow with soft light.',
    hint: "Starts with a 'gl' blend and ends with 'ow', like in 'snow'.",
  },
  {
    zone: 1,
    word: 'leaf',
    sentence: 'A green leaf floated down from the tree.',
    hint: "Starts with 'l'. The 'ea' in the middle says 'ee'.",
  },
  {
    zone: 1,
    word: 'star',
    sentence: 'The first star appeared above the glade.',
    hint: "Starts with an 'st' blend and ends with 'ar'.",
  },
  {
    zone: 1,
    word: 'wish',
    sentence: 'She made a wish before the race began.',
    hint: "Starts with 'w' and ends with the 'sh' sound — two letters for one sound.",
  },
  {
    zone: 1,
    word: 'gate',
    sentence: 'The wooden gate creaked when it opened.',
    hint: "Starts with 'g'. The silent 'e' makes the 'a' say its name.",
  },
  {
    zone: 1,
    word: 'home',
    sentence: 'Brindlewood Home is where her journey starts.',
    hint: "Starts with 'h'. The silent 'e' makes the 'o' say its name.",
  },
  {
    zone: 1,
    word: 'path',
    sentence: 'A narrow path led into the hollow.',
    hint: "Starts with a 'p' and ends with the 'th' sound.",
  },
  {
    zone: 1,
    word: 'seed',
    sentence: 'She planted a sunflower seed in the soil.',
    hint: "Starts with 's'. Two 'e' letters in the middle say 'ee'.",
  },
  {
    zone: 1,
    word: 'bloom',
    sentence: 'The sunflowers bloom all summer long.',
    hint: "Starts with a 'bl' blend. The 'oo' sounds like in 'moon'.",
  },
  {
    zone: 1,
    word: 'grass',
    sentence: 'The tall grass tickled her legs.',
    hint: "Starts with a 'gr' blend and ends with a double 's'.",
  },
  {
    zone: 1,
    word: 'petal',
    sentence: 'One yellow petal drifted to the ground.',
    hint: "Starts with 'pet'. It ends with 'al', not 'el'.",
  },
  {
    zone: 1,
    word: 'field',
    sentence: 'They galloped across the open field.',
    hint: "Starts with 'f'. Remember: 'i' before 'e' here.",
  },
  {
    zone: 1,
    word: 'friend',
    sentence: 'Every pony she meets becomes a friend.',
    hint: "Starts with an 'fr' blend. There is a hidden 'i' — think 'fri-end'.",
  },

  // ── Zone 2 — Earth: Pebblebrook, Mossgrove, Granite Hall ─────────────────
  // Band 2: 5–7 letters, two syllables, consonant blends and double letters.
  {
    zone: 2,
    word: 'stone',
    sentence: 'A smooth grey stone sat beside the brook.',
    hint: "Starts with an 'st' blend. The silent 'e' makes the 'o' say its name.",
  },
  {
    zone: 2,
    word: 'brook',
    sentence: 'Pebblebrook is named for its bubbling brook.',
    hint: "Starts with a 'br' blend. The 'oo' sounds like in 'book'.",
  },
  {
    zone: 2,
    word: 'acorn',
    sentence: 'An acorn fell from the oak branch.',
    hint: "Starts with the letter 'a' all by itself, then 'corn'.",
  },
  {
    zone: 2,
    word: 'pebble',
    sentence: 'She nudged a tiny pebble with her hoof.',
    hint: "Starts with 'peb'. There is a double 'b' in the middle and it ends in 'le'.",
  },
  {
    zone: 2,
    word: 'forest',
    sentence: 'Mossgrove sits deep inside the forest.',
    hint: "Starts with 'for'. The ending sounds like 'rest'.",
  },
  {
    zone: 2,
    word: 'branch',
    sentence: 'A thick branch hung over the trail.',
    hint: "Starts with a 'br' blend and ends with the 'ch' sound.",
  },
  {
    zone: 2,
    word: 'garden',
    sentence: 'Her garden grows carrots and clover.',
    hint: "Starts with 'gar'. The ending is 'den', like a cozy room.",
  },
  {
    zone: 2,
    word: 'meadow',
    sentence: 'The ponies rested in a sunny meadow.',
    hint: "Starts with 'mea', where 'ea' says 'eh'. It ends with 'ow', like 'shadow'.",
  },
  {
    zone: 2,
    word: 'sprout',
    sentence: 'A green sprout pushed up through the dirt.',
    hint: "Starts with a three-letter 'spr' blend. The 'ou' sounds like in 'shout'.",
  },
  {
    zone: 2,
    word: 'hollow',
    sentence: 'They camped inside a hollow log.',
    hint: "Starts with 'hol' and has a double 'l'. It ends with 'ow'.",
  },
  {
    zone: 2,
    word: 'granite',
    sentence: 'Granite Hall is carved from solid rock.',
    hint: "Starts with 'gran'. The silent 'e' at the end makes the 'i' say its name.",
  },
  {
    zone: 2,
    word: 'tunnel',
    sentence: 'A narrow tunnel ran under the hill.',
    hint: "Starts with 'tun'. Double 'n' in the middle, and it ends with 'el'.",
  },
  {
    zone: 2,
    word: 'blossom',
    sentence: 'Every blossom opened after the rain.',
    hint: "Starts with a 'bl' blend. There is a double 's' in the middle.",
  },
  {
    zone: 2,
    word: 'boulder',
    sentence: 'A huge boulder blocked the mountain road.',
    hint: "Starts with 'boul' — there is a silent 'u' after the 'o'.",
  },
  {
    zone: 2,
    word: 'thicket',
    sentence: 'A rabbit darted into the thicket.',
    hint: "Starts with the 'th' sound. The middle is 'ck', and it ends with 'et'.",
  },

  // ── Zone 3 — Water: Saltspray Cove, Mistreef, Coral Sanctum ──────────────
  // Band 3: 6–8 letters, vowel teams, soft c, and unstressed endings.
  {
    zone: 3,
    word: 'ocean',
    sentence: 'The ocean stretched past the horizon.',
    hint: "Starts with 'oce' — the 'c' makes a 'sh' sound here. It ends with 'an'.",
  },
  {
    zone: 3,
    word: 'coral',
    sentence: 'The Coral Sanctum glitters pink and orange.',
    hint: "Starts with 'cor'. It ends with 'al', not 'el'.",
  },
  {
    zone: 3,
    word: 'splash',
    sentence: 'She made a big splash in the shallow water.',
    hint: "Starts with a three-letter 'spl' blend and ends with 'sh'.",
  },
  {
    zone: 3,
    word: 'ripple',
    sentence: 'One ripple spread across the still pool.',
    hint: "Starts with 'rip'. Double 'p' in the middle, and it ends in 'le'.",
  },
  {
    zone: 3,
    word: 'lagoon',
    sentence: 'A warm lagoon sat behind the reef.',
    hint: "Starts with 'la'. The 'oo' in the second part sounds like 'moon'.",
  },
  {
    zone: 3,
    word: 'bubble',
    sentence: 'A silver bubble rose to the surface.',
    hint: "Starts with 'bub'. Double 'b' in the middle, and it ends in 'le'.",
  },
  {
    zone: 3,
    word: 'seaweed',
    sentence: 'Long strands of seaweed swayed below.',
    hint: "Two small words joined: 'sea' and 'weed'. Both use 'ea' and 'ee'.",
  },
  {
    zone: 3,
    word: 'shallow',
    sentence: 'The water is shallow near the shore.',
    hint: "Starts with 'sh'. Double 'l' in the middle, and it ends with 'ow'.",
  },
  {
    zone: 3,
    word: 'current',
    sentence: 'A strong current pulled them sideways.',
    hint: "Starts with 'cur'. Double 'r' in the middle, and it ends with 'ent'.",
  },
  {
    zone: 3,
    word: 'dolphin',
    sentence: 'A friendly dolphin swam beside the reef.',
    hint: "Starts with 'dol'. The 'ph' in the middle makes an 'f' sound.",
  },
  {
    zone: 3,
    word: 'shimmer',
    sentence: 'The waves shimmer under the moonlight.',
    hint: "Starts with 'sh'. There is a double 'm' before the 'er' ending.",
  },
  {
    zone: 3,
    word: 'saltspray',
    sentence: 'Saltspray Cove smells like the sea.',
    hint: "Two small words joined: 'salt' and 'spray'. The ending 'ay' says its name.",
  },
  {
    zone: 3,
    word: 'tidepool',
    sentence: 'Tiny crabs hide in every tidepool.',
    hint: "Two small words joined: 'tide' and 'pool'.",
  },
  {
    zone: 3,
    word: 'driftwood',
    sentence: 'A piece of driftwood washed onto the sand.',
    hint: "Two small words joined: 'drift' and 'wood'.",
  },
  {
    zone: 3,
    word: 'seashell',
    sentence: 'Marina Mist collects every seashell she finds.',
    hint: "Two small words joined: 'sea' and 'shell'. Watch the double 'l'.",
  },

  // ── Zone 4 — Fire: Cinderpath, Ashfall Camp, Magma Forge ─────────────────
  // Band 4: 7–9 letters, soft c/g, -le and -ing endings, three syllables.
  {
    zone: 4,
    word: 'cinder',
    sentence: 'A glowing cinder drifted up from the fire.',
    hint: "Starts with 'c' making an 's' sound. The ending is 'der'.",
  },
  {
    zone: 4,
    word: 'flicker',
    sentence: 'The torches flicker along the dark path.',
    hint: "Starts with an 'fl' blend. The 'ck' in the middle comes before 'er'.",
  },
  {
    zone: 4,
    word: 'furnace',
    sentence: 'The furnace at Magma Forge never cools.',
    hint: "Starts with 'fur'. It ends with 'ace', where the 'c' sounds like 's'.",
  },
  {
    zone: 4,
    word: 'crackle',
    sentence: 'The logs crackle as they burn.',
    hint: "Starts with a 'cr' blend. The 'ck' comes before the 'le' ending.",
  },
  {
    zone: 4,
    word: 'smolder',
    sentence: 'The coals smolder long after midnight.',
    hint: "Starts with an 'sm' blend. The ending is 'der', like 'cinder'.",
  },
  {
    zone: 4,
    word: 'lantern',
    sentence: 'She carried a lantern through Ashfall Camp.',
    hint: "Starts with 'lan'. The ending is 'tern' — an 'r' before the 'n'.",
  },
  {
    zone: 4,
    word: 'charcoal',
    sentence: 'Black charcoal covered the campfire ring.',
    hint: "Two parts: 'char' and 'coal'. Both start with the 'ch' and 'c' sounds.",
  },
  {
    zone: 4,
    word: 'kindling',
    sentence: 'They gathered kindling to start the fire.',
    hint: "Starts with 'kind', like being kind, then add 'ling'.",
  },
  {
    zone: 4,
    word: 'scorched',
    sentence: 'The scorched ground still felt warm.',
    hint: "Starts with an 'sc' blend. Ends with 'ched' — the 'ed' sounds like 't'.",
  },
  {
    zone: 4,
    word: 'blazing',
    sentence: 'A blazing trail lit up the canyon.',
    hint: "Starts with a 'bl' blend. 'Blaze' drops its silent 'e' before 'ing'.",
  },
  {
    zone: 4,
    word: 'campfire',
    sentence: 'They told stories around the campfire.',
    hint: "Two small words joined: 'camp' and 'fire'.",
  },
  {
    zone: 4,
    word: 'chimney',
    sentence: 'Smoke curled out of the stone chimney.',
    hint: "Starts with the 'ch' sound. It ends with 'ney', not 'nee'.",
  },
  {
    zone: 4,
    word: 'sizzling',
    sentence: 'The hot rocks were sizzling in the rain.',
    hint: "Starts with 'siz'. Double 'z' in the middle, then 'ling'.",
  },
  {
    zone: 4,
    word: 'volcano',
    sentence: 'The forge was built inside an old volcano.',
    hint: "Three parts: 'vol', 'ca', 'no'. It ends with the letter 'o'.",
  },
  {
    zone: 4,
    word: 'ember',
    sentence: 'One last ember glowed in the ashes.',
    hint: "Starts with the letter 'e' by itself, then 'mber'.",
  },

  // ── Zone 5 — Air: Windwhistle Pass, Cloudperch, Galecrest Spire ──────────
  // Band 5: 8–10 letters, silent letters, -tion/-ous style endings.
  {
    zone: 5,
    word: 'mountain',
    sentence: 'The spire rises above the tallest mountain.',
    hint: "Starts with 'moun'. The ending 'tain' sounds like 'tin' but is spelled 'tain'.",
  },
  {
    zone: 5,
    word: 'whirlwind',
    sentence: 'A sudden whirlwind spun the leaves around.',
    hint: "Two small words joined: 'whirl' and 'wind'. Both start with 'w'.",
  },
  {
    zone: 5,
    word: 'lightning',
    sentence: 'Lightning flashed over Galecrest Spire.',
    hint: "Starts with 'light' — the 'gh' is silent — then add 'ning'.",
  },
  {
    zone: 5,
    word: 'hurricane',
    sentence: 'The storm grew into a roaring hurricane.',
    hint: "Starts with 'hur'. Double 'r' in the middle, and it ends with a silent 'e'.",
  },
  {
    zone: 5,
    word: 'feathered',
    sentence: 'Her feathered wings caught the updraft.',
    hint: "Starts with 'feather', where 'ea' says 'eh', then add 'ed'.",
  },
  {
    zone: 5,
    word: 'drifting',
    sentence: 'Clouds kept drifting past the high pass.',
    hint: "Starts with a 'dr' blend. 'Drift' plus 'ing' — no letters change.",
  },
  {
    zone: 5,
    word: 'floating',
    sentence: 'Cloudperch looks like a floating island.',
    hint: "Starts with an 'fl' blend. 'Float' plus 'ing' — the 'oa' says 'oh'.",
  },
  {
    zone: 5,
    word: 'updraft',
    sentence: 'A warm updraft lifted her off the cliff.',
    hint: "Two small words joined: 'up' and 'draft'.",
  },
  {
    zone: 5,
    word: 'whistling',
    sentence: 'The wind was whistling through the pass.',
    hint: "Starts with 'whi'. The 't' is silent, then 'sling'.",
  },
  {
    zone: 5,
    word: 'cloudburst',
    sentence: 'A cloudburst soaked the whole valley.',
    hint: "Two small words joined: 'cloud' and 'burst'.",
  },
  {
    zone: 5,
    word: 'turbulent',
    sentence: 'The air grew turbulent near the summit.',
    hint: "Three parts: 'tur', 'bu', 'lent'. It ends like the word 'lent'.",
  },
  {
    zone: 5,
    word: 'breathless',
    sentence: 'The climb left her breathless and happy.',
    hint: "Starts with 'breath' — watch the 'ea' — then add 'less'.",
  },
  {
    zone: 5,
    word: 'soaring',
    sentence: 'An eagle was soaring above the spire.',
    hint: "Starts with 'soar', where 'oa' says 'or', then add 'ing'.",
  },
  {
    zone: 5,
    word: 'atmosphere',
    sentence: 'The atmosphere is thin at the very top.',
    hint: "Three parts: 'at', 'mos', 'phere'. The 'ph' makes an 'f' sound.",
  },
  {
    zone: 5,
    word: 'gliding',
    sentence: 'She was gliding on the mountain wind.',
    hint: "Starts with a 'gl' blend. 'Glide' drops its silent 'e' before 'ing'.",
  },

  // ── Zone 6 — Spirit: Whisperwood, Moonveil, Starfall Temple ──────────────
  // Band 6: 9–13 letters, schwa sounds, silent letters, and tricky endings.
  {
    zone: 6,
    word: 'adventure',
    sentence: 'Her whole adventure led to this temple.',
    hint: "Starts with 'ad'. The ending is 'ture', which sounds like 'cher'.",
  },
  {
    zone: 6,
    word: 'guardian',
    sentence: 'The last guardian waits inside Starfall Temple.',
    hint: "Starts with 'gu' — the 'u' is silent — then 'ardian'.",
  },
  {
    zone: 6,
    word: 'enchanted',
    sentence: 'Whisperwood is an enchanted forest.',
    hint: "Starts with 'en'. The middle is 'chant', like a song, then 'ed'.",
  },
  {
    zone: 6,
    word: 'moonlight',
    sentence: 'Moonveil glows softly in the moonlight.',
    hint: "Two small words joined: 'moon' and 'light'. The 'gh' is silent.",
  },
  {
    zone: 6,
    word: 'twilight',
    sentence: 'They arrived just after twilight.',
    hint: "Starts with 'twi'. The ending 'light' has a silent 'gh'.",
  },
  {
    zone: 6,
    word: 'mysterious',
    sentence: 'A mysterious voice echoed in the temple.',
    hint: "Starts with 'my' — the 'y' says 'ih'. The ending is 'ous'.",
  },
  {
    zone: 6,
    word: 'shimmering',
    sentence: 'A shimmering light circled the altar.',
    hint: "Starts with 'sh'. Double 'm' in the middle, then 'ering'.",
  },
  {
    zone: 6,
    word: 'celestial',
    sentence: 'The ceiling is painted with celestial maps.',
    hint: "Starts with 'ce', where 'c' sounds like 's'. The ending is 'tial'.",
  },
  {
    zone: 6,
    word: 'whispering',
    sentence: 'The trees of Whisperwood keep whispering.',
    hint: "Starts with 'whi'. 'Whisper' plus 'ing' — no letters change.",
  },
  {
    zone: 6,
    word: 'legendary',
    sentence: 'Aurelune is a legendary unicorn.',
    hint: "Starts with 'legend', like a famous story, then add 'ary'.",
  },
  {
    zone: 6,
    word: 'starlight',
    sentence: 'Starlight pours through the temple roof.',
    hint: "Two small words joined: 'star' and 'light'. The 'gh' is silent.",
  },
  {
    zone: 6,
    word: 'brilliance',
    sentence: 'The brilliance of her horn lit the hall.',
    hint: "Starts with 'bri'. Double 'l' in the middle, and it ends with 'ance'.",
  },
  {
    zone: 6,
    word: 'magnificent',
    sentence: 'The magnificent temple stood in silence.',
    hint: "Three parts: 'mag', 'ni', 'ficent'. The 'c' near the end sounds like 's'.",
  },
  {
    zone: 6,
    word: 'everlasting',
    sentence: 'Their friendship is everlasting.',
    hint: "Two small words joined: 'ever' and 'lasting'.",
  },
  {
    zone: 6,
    word: 'constellation',
    sentence: 'A new constellation appeared above them.',
    hint: "Starts with 'con'. Double 'l' in the middle, and it ends with 'ation'.",
  },
]
