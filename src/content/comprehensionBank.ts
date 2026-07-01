export interface ComprehensionEntry {
  zone: 1 | 2 | 3 | 4 | 5 | 6
  passage: string
  question: string
  choices: string[]
  correctIndex: number
  hint: string
}

export const COMPREHENSION_BANK: ComprehensionEntry[] = [
  // ── Zone 1 — Starter (Brindlewood / Sunflower Hollow) ────────────────────
  {
    zone: 1,
    passage: "Clover Dewdrop loves to roll in the tall grass every morning. Her favorite time of day is sunrise because the dew makes everything sparkle.",
    question: "What is Clover Dewdrop's favorite time of day?",
    choices: ["Sunset", "Sunrise", "Noon", "Midnight"],
    correctIndex: 1,
    hint: "Look for why she loves a specific time of day."
  },
  {
    zone: 1,
    passage: "Tangerine Twirl can spin in circles faster than any other pony. She practices spinning every day after lunch.",
    question: "When does Tangerine Twirl practice spinning?",
    choices: ["Before breakfast", "During morning", "After lunch", "After dinner"],
    correctIndex: 2,
    hint: "The passage says exactly when she practices."
  },
  {
    zone: 1,
    passage: "The Proving Glade has a big old oak tree in the middle. All the ponies gather under it when it rains.",
    question: "What do the ponies do when it rains?",
    choices: ["Splash in puddles", "Gather under the oak tree", "Run home", "Find a cave"],
    correctIndex: 1,
    hint: "Think about what the tree is used for."
  },
  {
    zone: 1,
    passage: "Marina Mist is a big fan of all things seashells. She loves to collect them and has several in many different shapes, like triangles, hearts, ovals, and tubes. Her favorite are the hearts.",
    question: "What is Marina Mist's favorite type of shell?",
    choices: ["Triangles", "Ovals", "Hearts", "Tubes"],
    correctIndex: 2,
    hint: "The passage names which shape she likes best."
  },
  {
    zone: 1,
    passage: "Ember Spark likes to tell stories by the campfire. She knows seven different stories and tells a new one every night of the week.",
    question: "How many stories does Ember Spark know?",
    choices: ["Five", "Six", "Eight", "Seven"],
    correctIndex: 3,
    hint: "Count the number mentioned in the passage."
  },
  {
    zone: 1,
    passage: "Sky Dancer sleeps in a nest made of clouds and feathers. She built it herself at the very top of Sunflower Hollow.",
    question: "What is Sky Dancer's nest made of?",
    choices: ["Straw and twigs", "Clouds and feathers", "Flowers and petals", "Stars and moonbeams"],
    correctIndex: 1,
    hint: "The passage describes exactly what the nest is made of."
  },
  {
    zone: 1,
    passage: "Stella Dream can see in the dark better than any other pony. She likes to take walks at night and count the stars.",
    question: "What does Stella Dream count on her night walks?",
    choices: ["Fireflies", "Moonbeams", "Flowers", "Stars"],
    correctIndex: 3,
    hint: "What does she do while walking at night?"
  },
  {
    zone: 1,
    passage: "Meadow Bloom grows a small garden behind her house. She grows carrots, sunflowers, and strawberries. The strawberries are her favorite to eat.",
    question: "What is Meadow Bloom's favorite thing to eat from her garden?",
    choices: ["Strawberries", "Carrots", "Sunflowers", "Blueberries"],
    correctIndex: 0,
    hint: "The passage tells us which plant she likes to eat most."
  },
  {
    zone: 1,
    passage: "Every pony in Brindlewood has a special talent. Clover Dewdrop's talent is finding four-leaf clovers. She has found twelve so far.",
    question: "How many four-leaf clovers has Clover Dewdrop found?",
    choices: ["Ten", "Twelve", "Fifteen", "Eight"],
    correctIndex: 1,
    hint: "The passage gives an exact number."
  },
  {
    zone: 1,
    passage: "Tangerine Twirl's mane is bright orange with golden streaks. She likes to decorate it with tiny wildflowers she finds on her walks.",
    question: "What does Tangerine Twirl decorate her mane with?",
    choices: ["Golden ribbons", "Seashells", "Wildflowers", "Sparkly gems"],
    correctIndex: 2,
    hint: "She finds these on her walks."
  },
  {
    zone: 1,
    passage: "The Sunflower Hollow got its name because sunflowers grow everywhere. The tallest sunflower is even taller than Meadow Bloom.",
    question: "What grows everywhere in Sunflower Hollow?",
    choices: ["Daisies", "Roses", "Sunflowers", "Clovers"],
    correctIndex: 2,
    hint: "Think about what the place is named after."
  },
  {
    zone: 1,
    passage: "Marina Mist sings a song every time she sees the ocean. Her song is about waves and seagulls and sandy beaches.",
    question: "What is Marina Mist's song about?",
    choices: ["Rainbows and sunshine", "Waves, seagulls, and sandy beaches", "Fish and coral reefs", "Dolphins and treasure"],
    correctIndex: 1,
    hint: "The passage lists three things her song mentions."
  },
  {
    zone: 1,
    passage: "Ember Spark has a little red wagon that she uses to carry firewood. She pulls it with her teeth because she is very strong.",
    question: "What does Ember Spark carry in her wagon?",
    choices: ["Firewood", "Berries and flowers", "Story books", "Rocks and gems"],
    correctIndex: 0,
    hint: "What is the wagon used for?"
  },
  {
    zone: 1,
    passage: "The ponies of Brindlewood have a holiday every spring called Blossom Day. They celebrate by making flower crowns for each other.",
    question: "What do the ponies make on Blossom Day?",
    choices: ["Berry baskets", "Honey cakes", "Flower crowns", "Star garlands"],
    correctIndex: 2,
    hint: "What do they make for each other during the celebration?"
  },
  {
    zone: 1,
    passage: "Sky Dancer's best trick is a triple loop in the air. She learned it when she was very young and now teaches it to other ponies.",
    question: "What is Sky Dancer's best trick?",
    choices: ["A backflip", "A triple loop", "A spinning dive", "A cloud jump"],
    correctIndex: 1,
    hint: "The passage names her best trick."
  },

  // ── Zone 2 — Earth (Pebblebrook / Mossgrove) ─────────────────────────────
  {
    zone: 2,
    passage: "Acorn Sprout keeps a collection of interesting rocks. She has smooth ones, bumpy ones, and sparkly ones. She has twenty-three rocks total.",
    question: "How many rocks does Acorn Sprout have?",
    choices: ["Twenty", "Twenty-three", "Thirty", "Fifteen"],
    correctIndex: 1,
    hint: "The passage gives the exact total."
  },
  {
    zone: 2,
    passage: "Fern Whisper can talk to plants by pressing her horn against their leaves. She says the ferns are the friendliest plants.",
    question: "Which plants does Fern Whisper say are the friendliest?",
    choices: ["Vines", "Roses", "Ferns", "Mosses"],
    correctIndex: 2,
    hint: "She has a special opinion about one type of plant."
  },
  {
    zone: 2,
    passage: "Boulderhoof is the strongest pony in Pebblebrook. He once pushed a boulder twice his size across the entire village.",
    question: "How big was the boulder Boulderhoof pushed?",
    choices: ["The same size as him", "Twice his size", "Three times his size", "Half his size"],
    correctIndex: 1,
    hint: "The passage compares the boulder's size to Boulderhoof."
  },
  {
    zone: 2,
    passage: "Daisy Dapple paints pictures using mud and berry juice. Her favorite thing to paint is butterflies. She has painted over thirty butterfly pictures.",
    question: "What is Daisy Dapple's favorite thing to paint?",
    choices: ["Flowers", "Butterflies", "Rainbows", "Mountains"],
    correctIndex: 1,
    hint: "The passage names what she likes most to paint."
  },
  {
    zone: 2,
    passage: "Clay Canter makes pottery with special clay from the riverbank. He shapes bowls, cups, and plates. The cups are the hardest to make.",
    question: "What does Clay Canter say is the hardest thing to make?",
    choices: ["Bowls", "Plates", "Cups", "Vases"],
    correctIndex: 2,
    hint: "The passage says one item is the hardest."
  },
  {
    zone: 2,
    passage: "Mossy Tussock likes to hide in the moss and surprise her friends. She is so good at hiding that sometimes they cannot find her for hours.",
    question: "How long can Mossy Tussock hide without being found?",
    choices: ["Minutes", "Days", "Hours", "Seconds"],
    correctIndex: 2,
    hint: "The passage says how long it sometimes takes to find her."
  },
  {
    zone: 2,
    passage: "Granite Hall was carved out of a giant gray mountain. Inside, glowing mushrooms light up the walls so visitors can see.",
    question: "What lights up the walls inside Granite Hall?",
    choices: ["Fireflies", "Torches", "Crystals", "Glowing mushrooms"],
    correctIndex: 3,
    hint: "Look for what provides light inside."
  },
  {
    zone: 2,
    passage: "Acorn Sprout eats three acorns for breakfast every morning. After breakfast, she always goes for a walk around the pond.",
    question: "What does Acorn Sprout do after breakfast?",
    choices: ["Takes a nap", "Goes for a walk around the pond", "Waters her garden", "Reads a book"],
    correctIndex: 1,
    hint: "The passage describes her daily routine after eating."
  },
  {
    zone: 2,
    passage: "Fern Whisper has a green mane that looks just like fern leaves. Other ponies sometimes mistake her for a bush when she stands still.",
    question: "What do other ponies sometimes mistake Fern Whisper for?",
    choices: ["A tree", "A rock", "A bush", "A flower"],
    correctIndex: 2,
    hint: "What do ponies think she is when she stays very still?"
  },
  {
    zone: 2,
    passage: "The biggest tree in Mossgrove is called Old Timber. It is so wide that five ponies holding hooves cannot reach all the way around it.",
    question: "How many ponies does it take to try to reach around Old Timber?",
    choices: ["Four", "Five", "Six", "Three"],
    correctIndex: 1,
    hint: "The passage gives a specific number of ponies."
  },
  {
    zone: 2,
    passage: "Daisy Dapple and Clay Canter are best friends. Every Tuesday they meet at the creek to skip stones together.",
    question: "What day do Daisy Dapple and Clay Canter meet at the creek?",
    choices: ["Monday", "Wednesday", "Friday", "Tuesday"],
    correctIndex: 3,
    hint: "The passage names a specific day of the week."
  },
  {
    zone: 2,
    passage: "Boulderhoof's hooves make a deep rumbling sound when he walks. The other ponies always know when he is coming because the ground shakes a little.",
    question: "How do other ponies know Boulderhoof is coming?",
    choices: ["He sings a song", "He blows a horn", "The ground shakes", "His footsteps echo"],
    correctIndex: 2,
    hint: "Something happens to the ground when he walks."
  },
  {
    zone: 2,
    passage: "Mossy Tussock collects feathers that fall from birds flying overhead. She uses them to make soft pillows for her friends.",
    question: "What does Mossy Tussock make with the feathers?",
    choices: ["Pillows", "Hats", "Blankets", "Nests"],
    correctIndex: 0,
    hint: "She makes something for her friends with the feathers."
  },
  {
    zone: 2,
    passage: "Pebblebrook has a stream that runs right through the middle of town. The water is so clear you can see all the pebbles on the bottom.",
    question: "What can you see at the bottom of Pebblebrook's stream?",
    choices: ["Fish", "Crystals", "Pebbles", "Colorful sand"],
    correctIndex: 2,
    hint: "The water is very clear — what does that let you see?"
  },
  {
    zone: 2,
    passage: "Guardian Bramblewood keeps a lantern that never goes out. It has been glowing since before any pony in the village was born.",
    question: "How long has Bramblewood's lantern been glowing?",
    choices: ["For exactly ten years", "Since the last festival", "Since before any pony was born", "Since last winter"],
    correctIndex: 2,
    hint: "The passage says how long the lantern has been lit."
  },

  // ── Zone 3 — Water (Saltspray Cove / Mistreef) ───────────────────────────
  {
    zone: 3,
    passage: "Bubble Brook can blow bubbles in five different colors. Her favorite color to blow is purple, but the green ones last the longest.",
    question: "Which color bubbles last the longest?",
    choices: ["Purple", "Pink", "Blue", "Green"],
    correctIndex: 3,
    hint: "Her favorite and the longest-lasting are different colors."
  },
  {
    zone: 3,
    passage: "Pearl Ripple found a golden pearl at the bottom of the cove. She also found a silver one the next day, but she says the golden one is more special.",
    question: "Which pearl does Pearl Ripple think is more special?",
    choices: ["The silver one", "They are equally special", "The golden one", "The blue one"],
    correctIndex: 2,
    hint: "The passage says which one she values more."
  },
  {
    zone: 3,
    passage: "Tidalhoof swims faster than any pony in the cove. He races against the dolphins every morning and usually finishes second, right behind the biggest dolphin.",
    question: "Who usually beats Tidalhoof in the morning races?",
    choices: ["Pearl Ripple", "Bubble Brook", "Tidalhoof himself (a tie)", "The biggest dolphin"],
    correctIndex: 3,
    hint: "Who finishes just ahead of him?"
  },
  {
    zone: 3,
    passage: "Splash Pebble collects smooth stones from the beach. She sorts them by color — gray ones on the left, white ones in the middle, and pink ones on the right. She has the most gray ones.",
    question: "Which color stones does Splash Pebble have the most of?",
    choices: ["White", "Pink", "Gray", "Blue"],
    correctIndex: 2,
    hint: "The passage tells us which color she has the most of."
  },
  {
    zone: 3,
    passage: "Coral Shimmer tends a garden of colorful coral. The red coral grows the fastest, but the blue coral is the rarest. She only has two pieces of blue coral.",
    question: "How many pieces of blue coral does Coral Shimmer have?",
    choices: ["Three", "One", "Four", "Two"],
    correctIndex: 3,
    hint: "The passage gives an exact number for the blue coral."
  },
  {
    zone: 3,
    passage: "Misty Wave creates fog by swishing her tail across the water. She uses thin fog to play hide-and-seek, but thick fog to keep the cove safe from strangers.",
    question: "What does Misty Wave use thick fog for?",
    choices: ["To cool the water down", "To keep the cove safe from strangers", "To make rainbows", "For sleeping"],
    correctIndex: 1,
    hint: "Thick fog has a different purpose than thin fog."
  },
  {
    zone: 3,
    passage: "The Coral Sanctum has three halls — the Hall of Tides, the Hall of Pearls, and the Hall of Echoes. The Trial battles take place in the Hall of Tides, which is the largest.",
    question: "In which hall do the Trial battles take place?",
    choices: ["The Hall of Pearls", "The Hall of Echoes", "The Coral Chamber", "The Hall of Tides"],
    correctIndex: 3,
    hint: "One of the three halls is mentioned as the battle location."
  },
  {
    zone: 3,
    passage: "Bubble Brook taught Pearl Ripple how to make bubble chains. Pearl Ripple's longest chain had fifteen bubbles, but Bubble Brook's record is twenty-two.",
    question: "What is Bubble Brook's bubble chain record?",
    choices: ["Fifteen", "Eighteen", "Thirty", "Twenty-two"],
    correctIndex: 3,
    hint: "The passage gives Bubble Brook's personal record."
  },
  {
    zone: 3,
    passage: "Tidalhoof wears a necklace made of sea glass. He has been collecting the pieces for three years. The oldest piece is dark green.",
    question: "What color is the oldest piece of sea glass?",
    choices: ["Bright blue", "Clear white", "Deep red", "Dark green"],
    correctIndex: 3,
    hint: "The passage describes the oldest piece specifically."
  },
  {
    zone: 3,
    passage: "Splash Pebble can skip stones farther than anyone in Mistreef. Her personal best is nine skips, but she is trying to reach ten this summer.",
    question: "How many skips is Splash Pebble trying to reach?",
    choices: ["Nine", "Twelve", "Eight", "Ten"],
    correctIndex: 3,
    hint: "She's trying to beat her own record."
  },
  {
    zone: 3,
    passage: "Coral Shimmer eats seaweed salad for dinner and kelp cakes for breakfast. She says kelp cakes give her more energy, but seaweed salad tastes better.",
    question: "Which meal does Coral Shimmer say tastes better?",
    choices: ["Kelp cakes", "Pearl stew", "Seaweed salad", "Coral soup"],
    correctIndex: 2,
    hint: "Even though one gives more energy, another tastes better."
  },
  {
    zone: 3,
    passage: "The water at Saltspray Cove is warm near the surface but cold deep down. The cold water is where the glowing fish live.",
    question: "Where do the glowing fish live?",
    choices: ["Near the surface", "Near the rocky shore", "In warm tide pools", "In the cold water deep down"],
    correctIndex: 3,
    hint: "Temperature and depth matter here."
  },
  {
    zone: 3,
    passage: "Guardian Nerida has a shell crown with five different shells on it. The center shell is a spiral that she found on her very first swim as a foal.",
    question: "When did Nerida find the center shell?",
    choices: ["When she became Guardian", "On her last birthday", "As a gift from Pearl Ripple", "On her very first swim as a foal"],
    correctIndex: 3,
    hint: "The passage says when she found the special center shell."
  },
  {
    zone: 3,
    passage: "Misty Wave and Bubble Brook play a game where they try to catch each other's bubbles in the fog. Misty Wave wins more often because she can see through her own fog.",
    question: "Why does Misty Wave win more often?",
    choices: ["She is faster than Bubble Brook", "She can see through her own fog", "The fog makes bubbles float higher", "She always gets lucky"],
    correctIndex: 1,
    hint: "Her ability with fog gives her an advantage."
  },
  {
    zone: 3,
    passage: "Pearl Ripple's hooves shimmer in the moonlight. On full moon nights, she dances on the shore and the other ponies watch. She says the full moon makes her feel brave.",
    question: "How does the full moon make Pearl Ripple feel?",
    choices: ["Sleepy", "Brave", "Sad", "Curious"],
    correctIndex: 1,
    hint: "She shares her feeling about the full moon."
  },

  // ── Zone 4 — Fire (Cinderpath / Ashfall Camp) ────────────────────────────
  {
    zone: 4,
    passage: "Spark Flicker can light small campfires with a tap of her horn. She lit twenty campfires last week — twelve at Cinderpath and eight at Ashfall Camp.",
    question: "How many campfires did Spark Flicker light at Ashfall Camp?",
    choices: ["Twelve", "Twenty", "Eight", "Five"],
    correctIndex: 2,
    hint: "Two locations are mentioned with separate totals."
  },
  {
    zone: 4,
    passage: "Cinder Cocoa makes the best hot chocolate in the fire zone. She uses three ingredients — cocoa beans, honey, and cinnamon. The secret to her recipe is adding the cinnamon last.",
    question: "What is the secret to Cinder Cocoa's hot chocolate?",
    choices: ["Stirring slowly", "Using cold milk", "Using extra honey", "Adding the cinnamon last"],
    correctIndex: 3,
    hint: "One of her three ingredients has a special timing."
  },
  {
    zone: 4,
    passage: "Blazehoof guards the entrance to Magma Forge. He has stood guard for two years and only takes breaks on rainy days, because fire ponies rest when it rains.",
    question: "When does Blazehoof take breaks from guarding?",
    choices: ["On sunny days", "On holidays", "Every week", "On rainy days"],
    correctIndex: 3,
    hint: "The passage tells us why fire ponies rest."
  },
  {
    zone: 4,
    passage: "Flame Twirl dances with ribbons of fire that she creates from her mane. She knows four dances — the Spark, the Swirl, the Blaze, and the Shimmer. The Shimmer is the newest one she learned.",
    question: "Which dance did Flame Twirl learn most recently?",
    choices: ["The Spark", "The Shimmer", "The Swirl", "The Blaze"],
    correctIndex: 1,
    hint: "The passage says which dance is newest."
  },
  {
    zone: 4,
    passage: "Ember Glow collects glowing embers in a special fireproof jar. She has three jars — one with orange embers, one with yellow, and one with rare blue embers. The blue jar has only four embers in it.",
    question: "How many blue embers does Ember Glow have?",
    choices: ["Two", "Six", "Three", "Four"],
    correctIndex: 3,
    hint: "The passage gives an exact count for the blue jar."
  },
  {
    zone: 4,
    passage: "Sunny Scorch wakes up at dawn every day because she gets her energy from the sun. On cloudy days she feels tired, but she never complains because she knows the sun always comes back.",
    question: "Why does Sunny Scorch feel tired on cloudy days?",
    choices: ["She stayed up too late", "She skipped breakfast", "She doesn't like clouds", "She gets her energy from the sun"],
    correctIndex: 3,
    hint: "The reason she wakes at dawn also explains why clouds make her tired."
  },
  {
    zone: 4,
    passage: "Guardian Cinda has a mane made of living flames. The flames turn from red to gold when she is happy, and from red to deep purple when she is thinking hard about something.",
    question: "What color does Cinda's mane turn when she is thinking hard?",
    choices: ["Bright gold", "Blue", "White", "Deep purple"],
    correctIndex: 3,
    hint: "Her mane changes to two different colors depending on how she feels."
  },
  {
    zone: 4,
    passage: "Cinderpath got its name because the ground is covered in soft, warm cinders. The cinders glow faintly at night, so travelers never need a lantern.",
    question: "Why don't travelers need a lantern on Cinderpath?",
    choices: ["The moon is always bright here", "Stars point the way", "The cinders glow at night", "There are torches every few steps"],
    correctIndex: 2,
    hint: "What natural feature of the path provides light?"
  },
  {
    zone: 4,
    passage: "Spark Flicker and Ember Glow both collect things. Spark Flicker collects interesting shaped stones from the lava fields, while Ember Glow prefers her glowing embers. They sometimes trade with each other.",
    question: "What does Spark Flicker collect?",
    choices: ["Glowing embers", "Rare gems", "Old campfire wood", "Interesting shaped stones from the lava fields"],
    correctIndex: 3,
    hint: "Two ponies collect two different things — which is Spark Flicker's?"
  },
  {
    zone: 4,
    passage: "Cinder Cocoa hosts a hot chocolate party every Friday. She invites six friends each time, but Blazehoof always brings an extra guest, so there are usually eight ponies total.",
    question: "How many ponies usually attend Cinder Cocoa's parties?",
    choices: ["Six", "Seven", "Ten", "Eight"],
    correctIndex: 3,
    hint: "Add the six invited friends, Cinder Cocoa, and Blazehoof's extra guest."
  },
  {
    zone: 4,
    passage: "Flame Twirl once performed her fire dance for the ponies of three different zones. The Water ponies were the most impressed because they had never seen fire dancing before.",
    question: "Which zone's ponies were most impressed by Flame Twirl's dancing?",
    choices: ["The Earth ponies", "The Water ponies", "The Air ponies", "The Spirit ponies"],
    correctIndex: 1,
    hint: "The reason they were most impressed is given in the passage."
  },
  {
    zone: 4,
    passage: "Ashfall Camp has tents made from a special fabric that cannot catch fire. The tents come in red, orange, and gold. Most ponies choose red, but Sunny Scorch picked gold to match the sunrise.",
    question: "Why did Sunny Scorch pick a gold tent?",
    choices: ["It was a gift", "Because it's the only color left", "To match the sunrise", "It's the strongest fabric"],
    correctIndex: 2,
    hint: "Her reason connects to something she loves."
  },
  {
    zone: 4,
    passage: "The Magma Forge sits above an underground river of lava. The lava keeps the forge warm all year. In winter, ponies from other zones visit just to warm up.",
    question: "What keeps the Magma Forge warm all year?",
    choices: ["Many campfires below", "A giant fire crystal", "The warm desert wind", "The underground river of lava"],
    correctIndex: 3,
    hint: "What is beneath the forge that provides heat?"
  },
  {
    zone: 4,
    passage: "Blazehoof has a younger sister who lives in Zone 2. She is an Earth pony and visits him once a month. He always makes her a fire-roasted apple as a welcome gift.",
    question: "What does Blazehoof make for his sister when she visits?",
    choices: ["A honey cake", "A bouquet of fire flowers", "A warm blanket", "A fire-roasted apple"],
    correctIndex: 3,
    hint: "He makes a specific food as a welcome gift."
  },
  {
    zone: 4,
    passage: "Ember Glow discovered that if she stacks her embers in a triangle shape, they glow twice as bright. She told Sunny Scorch about it, but Sunny said she prefers arranging hers in a circle.",
    question: "What shape does Sunny Scorch prefer for her embers?",
    choices: ["A triangle", "A star shape", "A straight line", "A circle"],
    correctIndex: 3,
    hint: "Sunny Scorch disagrees with Ember Glow's triangle approach."
  },

  // ── Zone 5 — Air (Galecrest Spire) ───────────────────────────────────────
  {
    zone: 5,
    passage: "Breezy Lark sings a different song for each season. Her spring song is about flowers and her winter song is about snowflakes. The other ponies say her autumn song is the most beautiful because it sounds like rustling leaves.",
    question: "Why do the other ponies think the autumn song is the most beautiful?",
    choices: ["It's the saddest melody", "It has the most notes", "It's the loudest", "It sounds like rustling leaves"],
    correctIndex: 3,
    hint: "The other ponies give a reason for liking the autumn song."
  },
  {
    zone: 5,
    passage: "Cloud Skip builds bridges out of clouds between the tall spires. She built four bridges last month. The longest one connects the North Spire to the South Spire, and it took her three days to finish.",
    question: "How long did it take Cloud Skip to build the longest bridge?",
    choices: ["One day", "Two days", "A week", "Three days"],
    correctIndex: 3,
    hint: "The passage gives an exact time for the longest bridge."
  },
  {
    zone: 5,
    passage: "Galehoof is the fastest flier in the Air zone, but he is not the best at landing. He often tumbles when he touches down. Feather Float, who is slower, always lands perfectly.",
    question: "Which pony is better at landing — Galehoof or Feather Float?",
    choices: ["Galehoof", "They are equally good", "Wind Whistle", "Feather Float"],
    correctIndex: 3,
    hint: "Speed and landing skill are not the same thing."
  },
  {
    zone: 5,
    passage: "Wind Whistle can change the direction of the wind by whistling different notes. A high note pushes the wind north, a low note pushes it south. She uses a medium note to make the wind stop completely.",
    question: "What happens when Wind Whistle uses a medium note?",
    choices: ["The wind turns east", "It starts to rain", "The wind stops completely", "The wind doubles in speed"],
    correctIndex: 2,
    hint: "A medium note does something different from high or low notes."
  },
  {
    zone: 5,
    passage: "Feather Float collects feathers the way other ponies collect gems. She has feathers from twelve different types of birds. Her rarest feather is from a golden eagle, but her favorite is a tiny blue jay feather because it was the first one she ever found.",
    question: "Why is the blue jay feather Feather Float's favorite?",
    choices: ["It glows in the dark", "It was a gift from Galehoof", "It's the rarest", "It was the first one she ever found"],
    correctIndex: 3,
    hint: "Her favorite is not the rarest — there's a sentimental reason."
  },
  {
    zone: 5,
    passage: "Gust Dancer creates tiny whirlwinds to carry messages between the spires. Small whirlwinds carry short messages, and bigger ones can carry packages. She once sent a whole birthday cake across the canyon using her biggest whirlwind ever.",
    question: "What is the biggest thing Gust Dancer has sent in a whirlwind?",
    choices: ["A message scroll", "A pile of feathers", "A birthday cake", "A cloud"],
    correctIndex: 2,
    hint: "She used her biggest whirlwind for something special."
  },
  {
    zone: 5,
    passage: "The Galecrest Spire is so high up that clouds drift right through the windows. The ponies who live there are used to it, but visitors from the ground zones often find it surprising and a little chilly.",
    question: "How do visitors from ground zones feel about the clouds drifting through?",
    choices: ["Excited and warm", "Scared and wet", "Confused and lost", "Surprised and a little chilly"],
    correctIndex: 3,
    hint: "Two feelings are mentioned for visitors."
  },
  {
    zone: 5,
    passage: "Breezy Lark and Wind Whistle sometimes perform together. Breezy sings while Wind Whistle controls the breeze to carry the music farther. Together, their concerts can be heard from two zones away.",
    question: "How far away can their joint concerts be heard?",
    choices: ["Only on the spire", "One zone away", "Three zones away", "Two zones away"],
    correctIndex: 3,
    hint: "The passage gives a distance for their combined performance."
  },
  {
    zone: 5,
    passage: "Cloud Skip once tried to build a bridge to the Fire zone but the warm air kept melting her clouds. She solved the problem by using thicker clouds, but the bridge still only lasted one day before it faded.",
    question: "Why did Cloud Skip's bridge to the Fire zone keep failing at first?",
    choices: ["She ran out of clouds", "A storm blew it away", "It was too far away", "The warm air melted her clouds"],
    correctIndex: 3,
    hint: "Temperature from the Fire zone caused the problem."
  },
  {
    zone: 5,
    passage: "Galehoof trains by racing against storms. He says the storms teach him to be quick and smart at the same time. He has raced forty-one storms and only been caught by three.",
    question: "How many storms has Galehoof been caught by?",
    choices: ["Zero", "Five", "Ten", "Three"],
    correctIndex: 3,
    hint: "He has raced many storms — how many of those caught him?"
  },
  {
    zone: 5,
    passage: "Feather Float and Gust Dancer both live on the East Spire. Feather Float lives near the top where it's quiet, and Gust Dancer lives near the bottom where the winds are stronger for her whirlwind practice.",
    question: "Why does Gust Dancer live near the bottom of the East Spire?",
    choices: ["It's closer to the kitchen", "Her family lives there", "She likes the view better", "The winds are stronger there for her whirlwind practice"],
    correctIndex: 3,
    hint: "Her location is connected to what she practices."
  },
  {
    zone: 5,
    passage: "Wind Whistle discovered that if she whistles during a rainstorm, the raindrops form patterns in the air. She likes to make spiral patterns because they remind her of seashells, even though she has never been to the ocean.",
    question: "What do Wind Whistle's spiral rain patterns remind her of?",
    choices: ["Pinwheels", "Raindrops", "Spiral stairs", "Seashells"],
    correctIndex: 3,
    hint: "She compares the spirals to something she has never seen in real life."
  },
  {
    zone: 5,
    passage: "Guardian Zephyr has wings that shimmer like sunlight through mist. When she flies at sunset, ponies on the ground think they see a second sun. She finds this funny and sometimes flies in circles just to confuse them.",
    question: "Why does Zephyr sometimes fly in circles at sunset?",
    choices: ["She's looking for clouds", "It's part of her training", "She wants to cool down", "To confuse the ponies who think she's a second sun"],
    correctIndex: 3,
    hint: "She finds a funny misunderstanding and plays with it."
  },
  {
    zone: 5,
    passage: "The Air ponies have a festival called Windtide where they fly as high as they can. Breezy Lark holds the record for the highest flight, but Cloud Skip says she would have won if she hadn't stopped to build a cloud chair at the top.",
    question: "Why does Cloud Skip say she didn't win the height record?",
    choices: ["The wind pushed her back", "She stopped to rest", "She lost her wings for a moment", "She stopped to build a cloud chair at the top"],
    correctIndex: 3,
    hint: "She got distracted by something she built."
  },
  {
    zone: 5,
    passage: "Galehoof and Breezy Lark once had a race around all five spires. Galehoof was faster on the straightaways, but Breezy made sharper turns. They finished at exactly the same time, so they called it a tie and shared the trophy.",
    question: "Why did Galehoof and Breezy Lark share the trophy?",
    choices: ["Breezy won by a wing tip", "Galehoof was faster on curves", "The judges couldn't decide", "They finished at exactly the same time"],
    correctIndex: 3,
    hint: "Neither pony came first or second."
  },

  // ── Zone 6 — Spirit (Starfall Temple) ────────────────────────────────────
  {
    zone: 6,
    passage: "Star Sparkle can make fallen stars glow again by touching them with her horn. She once found a star that had been dark for a hundred years. After she touched it, it glowed brighter than any star the other ponies had ever seen — they think it had been saving up its light all that time.",
    question: "Why do the ponies think the old star glowed so brightly?",
    choices: ["Star Sparkle's magic is extra strong", "It was in the middle of the sky", "The star was the biggest ever found", "It had been saving up its light for a hundred years"],
    correctIndex: 3,
    hint: "The ponies have a theory about what happened during the hundred dark years."
  },
  {
    zone: 6,
    passage: "Moon Glimmer sees reflections in the moonlight that other ponies cannot see. She says the reflections show things that happened long ago. When she told Dusk Twinkle about it, he said he sees the future in starlight but is never sure if what he sees will really happen.",
    question: "What is different about what Dusk Twinkle sees compared to Moon Glimmer?",
    choices: ["Dusk sees the past and Moon sees the future", "They both see the future", "They both see the past", "Moon Glimmer sees the past and Dusk Twinkle sees the future"],
    correctIndex: 3,
    hint: "One sees the past, the other the future — but which is which?"
  },
  {
    zone: 6,
    passage: "Astralhoof has walked every path in Starfall Temple twice. He says the paths change a little bit each night, so walking them twice means he has actually walked hundreds of different routes. He keeps a journal of every change he notices.",
    question: "Why has Astralhoof actually walked hundreds of routes even though there are fewer paths?",
    choices: ["He walks very slowly", "He has a map of every path", "He gets lost sometimes", "The paths change a little bit each night"],
    correctIndex: 3,
    hint: "The paths are not always the same."
  },
  {
    zone: 6,
    passage: "Wishing Star grants one wish per month, but the wish has to be for someone else — never for herself. Last month she wished for Coral Shimmer to find a new piece of blue coral, and the very next day Coral Shimmer found two pieces.",
    question: "What rule does Wishing Star have about her wishes?",
    choices: ["She must wish at midnight", "The wish must be for an animal", "She can only grant one wish ever", "The wish has to be for someone else, never for herself"],
    correctIndex: 3,
    hint: "There is a special rule about who the wish can be for."
  },
  {
    zone: 6,
    passage: "Dusk Twinkle is quieter than the other Spirit ponies. He spends most of his time in the library reading old books about the stars. The other ponies come to him with questions because even though he is quiet, he always knows the answer.",
    question: "Why do the other ponies come to Dusk Twinkle with questions?",
    choices: ["He is the oldest pony", "He has the biggest library", "He is the loudest", "He always knows the answer"],
    correctIndex: 3,
    hint: "Despite being quiet, he has a special quality."
  },
  {
    zone: 6,
    passage: "Nova Drift travels through the sky at night leaving a glowing trail behind her. The trail fades after an hour, but if another pony follows it before it fades, the trail leads to something they have been looking for. Nova doesn't choose what the trail leads to — it seems to know what each follower needs.",
    question: "How does the trail seem to know where to lead each pony?",
    choices: ["It always leads to treasure", "Nova picks the most helpful destination", "It circles back to the start", "It leads to something the follower has been looking for — Nova doesn't choose"],
    correctIndex: 3,
    hint: "The trail acts on its own — Nova doesn't control where it goes."
  },
  {
    zone: 6,
    passage: "The Starfall Temple only appears when all five stars above it are shining. On cloudy nights, the temple seems to vanish, though the ponies inside can still feel the floor beneath their hooves. Visitors who arrive on cloudy nights have to trust that the stairs are there even though they cannot see them.",
    question: "What do visitors have to do on cloudy nights to enter the temple?",
    choices: ["Wait for a sunny day", "Find a torch to light the way", "Come back tomorrow", "Trust that the stairs are there even though they can't see them"],
    correctIndex: 3,
    hint: "The temple is invisible on cloudy nights but the structure is still there."
  },
  {
    zone: 6,
    passage: "Star Sparkle and Moon Glimmer discovered that if they combine their abilities — Star Sparkle's glow and Moon Glimmer's reflections — they can show other ponies memories from the past as if they were happening right now. They use this to teach young ponies about the history of the realm.",
    question: "What do Star Sparkle and Moon Glimmer use their combined abilities for?",
    choices: ["Creating art for the temple walls", "Making the old stars glow again", "Sending messages across zones", "Teaching young ponies about the history of the realm"],
    correctIndex: 3,
    hint: "Together they use their powers in an educational way."
  },
  {
    zone: 6,
    passage: "Astralhoof once tried to map every version of the temple's paths. After filling thirty pages in his journal, he realized the paths weren't random — they followed the same pattern as the constellations above, just one night behind.",
    question: "What pattern do the temple paths follow?",
    choices: ["Based on the weather", "Completely random each night", "Based on the moon's position", "The same pattern as the constellations, one night behind"],
    correctIndex: 3,
    hint: "He found a connection between the paths and the sky."
  },
  {
    zone: 6,
    passage: "Wishing Star keeps a garden of wish flowers. Each flower represents a wish she has granted. The garden has forty-seven flowers so far. Her favorite is a tiny silver one that represents the first wish she ever granted — she wished for a lost foal to find its way home.",
    question: "What was Wishing Star's first wish?",
    choices: ["For it to stop raining", "For a flower garden to bloom", "For the stars to shine brighter", "For a lost foal to find its way home"],
    correctIndex: 3,
    hint: "Her favorite flower represents her very first wish."
  },
  {
    zone: 6,
    passage: "Dusk Twinkle and Nova Drift look at the same sky but see different things. Dusk sees stories written in the star patterns, while Nova sees paths she wants to fly. Once they argued about a particular star cluster — Dusk said it told the story of a brave explorer, but Nova said it mapped the fastest route to the mountains. They eventually agreed both could be true at the same time.",
    question: "How did Dusk and Nova resolve their disagreement about the star cluster?",
    choices: ["Nova was declared the winner", "Dusk changed his mind", "They agreed to disagree and never spoke of it", "They agreed both interpretations could be true at the same time"],
    correctIndex: 3,
    hint: "They found a way to both be right."
  },
  {
    zone: 6,
    passage: "Grand Champion Vesper visits the Starfall Temple once a year during the longest night. She says it is the only place where she can hear the hum of all five elements at once. The other ponies try to hear it too, but most can only hear the Spirit element humming.",
    question: "What makes the longest night at Starfall Temple special for Vesper?",
    choices: ["The stars fall closest", "It's the only night she can enter", "She always wins a race", "She can hear all five elements humming at once"],
    correctIndex: 3,
    hint: "She can perceive something there that others cannot."
  },
  {
    zone: 6,
    passage: "Nova Drift once left a trail that circled back to its own beginning. The pony who followed it walked in the loop three times before realizing the trail was trying to tell her that what she was looking for was already with her — she had been carrying it in her saddlebag the whole time.",
    question: "What was the trail trying to tell the pony?",
    choices: ["The trail was testing her patience", "She needed to keep walking in circles", "The trail was broken", "What she was looking for was already with her"],
    correctIndex: 3,
    hint: "Three loops was the clue that the answer was closer than she thought."
  },
  {
    zone: 6,
    passage: "Moon Glimmer keeps a collection of moonbeams caught in crystal jars. Each jar shows a different reflection — some show peaceful scenes, others show exciting adventures. She says the moonbeams choose what to show based on who is looking at them.",
    question: "What determines what each moonbeam jar shows?",
    choices: ["How long they have been in the jar", "How full the moon is", "The time of day", "Who is looking at them"],
    correctIndex: 3,
    hint: "The viewer matters, not the time or the moon phase."
  },
  {
    zone: 6,
    passage: "The five Guardians from all the zones met at Starfall Temple once to solve a problem together. Each Guardian could only solve their part using their own element, but the solution only worked when all five parts were combined in the right order. Astralhoof wrote down the order so they would remember it: Earth, Water, Fire, Air, Spirit.",
    question: "What was the correct order the Guardians needed to combine their elements?",
    choices: ["Fire, Air, Spirit, Earth, Water", "Water, Fire, Air, Spirit, Earth", "Spirit, Earth, Water, Fire, Air", "Earth, Water, Fire, Air, Spirit"],
    correctIndex: 3,
    hint: "Astralhoof wrote it down — the passage lists it directly."
  },
]
