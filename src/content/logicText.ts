// Logic puzzle text (DESIGN.md §23): the words the logic kit builds puzzles
// from, and the fixed word puzzles kept from the pre-grade game for Grade 3
// (and as extra variety in Grades 4–5). Content only; engine/logicKit.ts
// does the building and checks every puzzle has one answer.

export interface NTheme {
  intro: string
  noun: string
  attributes: string[]
}

export const N_THEMES: NTheme[] = [
  { intro: 'A magic key is hidden behind one of these doors!',       noun: 'door',     attributes: ['red', 'blue', 'green', 'gold', 'silver', 'purple'] },
  { intro: 'A sparkly gem rests inside one of these chests!',        noun: 'chest',    attributes: ['tiny', 'small', 'medium', 'large', 'huge', 'giant'] },
  { intro: 'A wish token glows on one of these stars!',             noun: 'star',     attributes: ['dim', 'faint', 'bright', 'glowing', 'twinkly', 'shooting'] },
  { intro: 'A tiny fairy is sleeping under one of these mushrooms!', noun: 'mushroom', attributes: ['red', 'orange', 'yellow', 'purple', 'spotted', 'striped'] },
  { intro: 'A secret is tucked inside one of these lanterns!',      noun: 'lantern',  attributes: ['crimson', 'amber', 'emerald', 'azure', 'violet', 'rose'] },
  { intro: 'A friendly pony is waiting by one of these flowers!',   noun: 'flower',   attributes: ['pink', 'white', 'yellow', 'orange', 'blue', 'red'] },
]

/** Names for ordering and grid puzzles: short, easy to read, all different first letters. */
export const NAMES = ['Ava', 'Ben', 'Cleo', 'Dash', 'Ella', 'Finn', 'Gus', 'Hazel', 'Ivy', 'Jett', 'Kai', 'Luna', 'Milo', 'Nell', 'Oscar', 'Pip']

/** For ordering puzzles: [more, less, most, least] — "Ava is taller than Ben", "Who is the tallest?". */
export const ORDER_WORDS: Array<[string, string, string, string]> = [
  ['taller', 'shorter', 'tallest', 'shortest'],
  ['faster', 'slower', 'fastest', 'slowest'],
  ['older', 'younger', 'oldest', 'youngest'],
  ['heavier', 'lighter', 'heaviest', 'lightest'],
]

/** For grid puzzles: what each person has. */
export const GRID_THINGS: Array<{ intro: string; verb: string; notVerb: string; items: string[] }> = [
  { intro: 'Each friend has a different pet.',          verb: 'has the',       notVerb: 'does not have the', items: ['cat', 'dog', 'fish', 'bunny'] },
  { intro: 'Each pony wears a different color ribbon.', verb: 'wears the',     notVerb: 'does not wear the', items: ['red ribbon', 'blue ribbon', 'gold ribbon', 'green ribbon'] },
  { intro: 'Each friend picked a different snack.',     verb: 'picked the',    notVerb: 'did not pick the',  items: ['apple', 'muffin', 'carrot', 'cookie'] },
  { intro: 'Each pony lives in a different place.',     verb: 'lives in the',  notVerb: 'does not live in the', items: ['forest', 'meadow', 'cave', 'lake'] },
]

/** For attribute puzzles. */
export const GEM_COLORS = ['red', 'blue', 'green', 'yellow', 'purple']
export const GEM_SIZES = ['small', 'big']
export const GEM_SHAPES = ['round', 'square', 'star-shaped']

/** For if/then chains: each event and its "did not happen" form. */
export const EVENTS: Array<{ yes: string; no: string }> = [
  { yes: 'the bell rings',          no: 'the bell does not ring' },
  { yes: 'the gate opens',          no: 'the gate does not open' },
  { yes: 'the ponies run out',      no: 'the ponies do not run out' },
  { yes: 'the meadow gets busy',    no: 'the meadow does not get busy' },
  { yes: 'the birds fly away',      no: 'the birds do not fly away' },
  { yes: 'the owl wakes up',        no: 'the owl does not wake up' },
  { yes: 'the lanterns glow',       no: 'the lanterns do not glow' },
  { yes: 'the river sparkles',      no: 'the river does not sparkle' },
  { yes: 'the fairies dance',       no: 'the fairies do not dance' },
  { yes: 'the moonwell fills up',   no: 'the moonwell does not fill up' },
  { yes: 'the drum is played',      no: 'the drum is not played' },
  { yes: 'the flowers open',        no: 'the flowers do not open' },
]

// ── fixed word puzzles (kept from the pre-grade game) ────────────────────────

export const CHAIN_PUZZLES = [
  { setup: ['Every square has 4 sides.', 'Every shape with 4 sides is a quadrilateral.'], conclusion: 'A square is a quadrilateral.', wrongs: ['A square has 5 sides.', 'A quadrilateral has 3 sides.', 'Not all squares have sides.'] },
  { setup: ['Every rabbit has long ears.', 'Floppy is a rabbit.'],                        conclusion: 'Floppy has long ears.',          wrongs: ['Floppy is a cat.', 'Floppy has short ears.', 'All animals have long ears.'] },
  { setup: ['All fire ponies live in the fire zone.', 'Blazehoof is a fire pony.'],        conclusion: 'Blazehoof lives in the fire zone.', wrongs: ['Blazehoof is a water pony.', 'All ponies live in the fire zone.', 'Blazehoof lives in the water zone.'] },
]

export const USE_PUZZLES = [
  { q: 'You need to see underwater clearly. Which would help most?', correct: 'Swimming goggles', wrong: ['A woolen hat', 'A warm coat', 'A book'] },
  { q: 'You are lost in a dark forest at night. Which is most useful?', correct: 'A flashlight', wrong: ['An umbrella', 'A bathing suit', 'A paintbrush'] },
  { q: 'It is very hot and sunny and you\'re going outside. What should you put on?', correct: 'Sunscreen', wrong: ['A winter scarf', 'Ice skates', 'Gardening gloves'] },
  { q: 'You want to send a letter to a friend far away. What do you need?', correct: 'Paper and a pen', wrong: ['A fire pit', 'A hammer', 'Swimming fins'] },
]

export const MUST_PUZZLES = [
  { fact: 'All birds have feathers. A sparrow is a bird.', correct: 'A sparrow has feathers.', wrong: ['All animals have feathers.', 'A sparrow cannot fly.', 'Feathers are only for birds.'] },
  { fact: 'Every library has books. Mossgrove has a library.', correct: 'Mossgrove has books.', wrong: ['Every building has books.', 'Mossgrove is a library.', 'Books are only in Mossgrove.'] },
  { fact: 'Ponies that earn a badge can enter the next zone. Ember earned a badge.', correct: 'Ember can enter the next zone.', wrong: ['Ember has all the badges.', 'All ponies can enter the next zone.', 'Ember lost her badge.'] },
]

export const IMPOSSIBLE_PUZZLES = [
  { fact: 'All ponies in the Earth zone are Earth ponies.', correct: 'A Water pony lives deep in the Earth zone.', wrong: ['An Earth pony collects rocks.', 'Two Earth ponies are friends.', 'An Earth pony visits Zone 3.', 'All Earth ponies love mud.'] },
  { fact: 'Bramblewood\'s lantern has NEVER gone out since before any pony was born.', correct: 'Bramblewood\'s lantern went out last Tuesday.', wrong: ['Bramblewood polishes the lantern.', 'Other ponies admire the lantern.', 'The lantern is very old.', 'Bramblewood carries the lantern on walks.'] },
]

export const CONCLUSION_PUZZLES = [
  { setup: 'Every zone has exactly one Guardian. There are five zones.', correct: 'There are exactly five Guardians.', wrong: ['There are no Guardians.', 'One Guardian rules all five zones.', 'Some zones have two Guardians.', 'Guardians come in pairs.'] },
  { setup: 'Ponies can only enter a zone if they have the right badge. Breezy has the Zone 5 badge.', correct: 'Breezy can enter Zone 5.', wrong: ['Breezy can enter any zone.', 'Breezy has no badges.', 'Breezy is not allowed in Zone 4.', 'Zone 5 has no badge requirement.'] },
]

export const SEATING_PUZZLES = [
  { setup: 'Five friends sit in a row: Ash, Bree, Cole, Dana, Eve.\nAsh is in seat 1. Bree is next to Ash. Cole is next to Bree but NOT next to Ash.',
    q: 'Who must be in seat 3?', correct: 'Cole', wrong: ['Ash', 'Bree', 'Dana', 'Eve'] },
  { setup: 'Five items in a line: star, moon, sun, cloud, rain.\nStar is first. Moon is right after star. Sun is right after moon.',
    q: 'What is in the third spot?', correct: 'Sun', wrong: ['Star', 'Moon', 'Cloud', 'Rain'] },
]
