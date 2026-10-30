// Grade 5 reading (DESIGN.md §23): 15 passages per zone, 180–250 words.
// Zones 1–2 ask recall and word meaning; 3–4 compare details and author's
// purpose; 5–6 inference, theme, purpose and comparing.
import type { ZoneReading } from '../gradeTypes'

export const GRADE5_READING: ZoneReading = {
  // ── Zone 1: Brindlewood Home, Sunflower Hollow, the Proving Glade ──────────
  1: [
    {
      title: 'A Guide to Brindlewood Home',
      passage: `Brindlewood Home is the first place most young trainers visit, and for good reason. The village sits in a wide, sheltered valley where the wind is gentle and the grass stays green for most of the year. Because the weather is so mild, ponies of every element can live here comfortably, which is rare in the realm.

The center of the village is the Proving Glade, a round clearing with an enormous oak tree in the middle. The oak is thought to be more than three hundred years old. Its branches spread so wide that a whole herd can rest beneath them during a storm. New trainers battle for the first time in this glade, often with an audience of curious neighbors.

To the east lies Sunflower Hollow, a field so crowded with sunflowers that visitors sometimes lose sight of one another. Ponies who get separated there are told to stand still and whistle. The thick flowers muffle the sound of hooves, but a whistle carries far.

Brindlewood is not the most exciting corner of the realm. It has no lava fields, no floating clouds, and no glowing temple. Yet nearly every great trainer remembers it fondly, because it is where their first adventure began.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "muffle" mean?',
          choices: ['Make louder', 'Make quieter', 'Hide from view', 'Slow down'], correctIndex: 1,
          hint: 'A whistle carries far, but hoofbeats do not.' },
        { type: 'recall', question: 'Why can ponies of every element live in Brindlewood?',
          choices: ['The oak tree shelters them from every storm', 'It is the first village trainers visit', 'The sunflowers keep them safe', 'The weather is mild'], correctIndex: 3,
          hint: 'Find the word "Because" in the first paragraph.' },
      ],
    },
    {
      title: 'Rings of the Old Oak',
      passage: `No one knows exactly when the great oak in the Proving Glade first sprouted, but the ponies of Brindlewood have a good guess. Their evidence comes from a fallen branch.

Many years ago, a lightning storm split off one of the oak's lower branches. When the village carpenter cut through it, she found a pattern of rings inside the wood, one circle inside another. Every year, a tree grows a new layer of wood just beneath its bark. In spring, that layer is pale and wide. In late summer, it is darker and thin. Together, each pale and dark pair makes one ring.

The carpenter counted the rings on the branch and found one hundred and eighty. Since the branch had grown out of the trunk long after the tree began, the trunk itself had to be much older. By comparing the branch to other oaks in the valley, the village elders estimated that the great oak was more than three hundred years old.

The carpenter polished a slice of that branch and hung it in the village hall. Young ponies still stop to count the rings, though few of them make it past one hundred before losing their place.`,
      questions: [
        { type: 'twoFact', question: 'What does the spring layer of wood look like?',
          choices: ['Pale and wide', 'Dark and thin', 'Red and twisted', 'Smooth and shiny'], correctIndex: 0,
          hint: 'The passage describes the spring layer and the late-summer layer differently.' },
        { type: 'wordMeaning', question: 'In this passage, what does "estimated" mean?',
          choices: ['Proved exactly', 'Wrote down in a book', 'Made a careful guess', 'Forgot completely'], correctIndex: 2,
          hint: 'No one knows the exact age, but the elders compared trees to decide.' },
      ],
    },
    {
      title: 'Growing Together',
      passage: `Every trainer in the realm begins with a companion pony, chosen in Brindlewood Home on the first day of their adventure. At first, the two are strangers. Over time, they become a team.

Companions grow stronger through experience. Each battle teaches a companion something new, whether it wins or loses. A companion that faces many different opponents learns to handle surprises. This is why experienced trainers encourage beginners to explore every zone, not just the ones where battles feel easy.

Trainers grow too. In the beginning, many trainers give orders without thinking about how their companion feels. Experienced trainers learn to notice small signs. A companion that lowers its ears may be tired. One that paws the ground is eager to keep going. Paying attention to these signs helps a trainer make better choices in battle.

The strongest teams are not always the ones with the most powerful ponies. They are the ones where trainer and companion understand each other well. Vesper, the Grand Champion, has said that her first companion taught her more than any book ever did. She still visits Brindlewood every spring to see the place where the two of them first met.`,
      questions: [
        { type: 'recall', question: 'What might it mean when a companion lowers its ears?',
          choices: ['It is eager to keep going', 'It is ready to win', 'It wants a new trainer', 'It may be tired'], correctIndex: 3,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'Why do experienced trainers encourage beginners to explore every zone?',
          choices: ['So companions learn to handle surprises', 'So they can collect more badges faster than others', 'So they meet Vesper', 'So they can find new companions'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Friendly Rivals',
      passage: `When Pepper first arrived in Brindlewood, Tangerine Twirl saw her as a threat. Pepper could spin faster than anyone Tangerine had ever seen, at least for the first twenty turns. Tangerine had won the spinning contest at the Sunflower Fair three years in a row, and she did not want to lose her title.

But after Pepper wobbled and fell at last year's contest, Tangerine had offered to practice with her. At first, their practices were awkward. Each pony secretly watched the other, trying to learn her tricks without giving away her own.

Over the winter, that slowly changed. Tangerine noticed that Pepper always started too fast and ran out of balance. Pepper noticed that Tangerine started too slowly and wasted her first few turns. Instead of keeping these observations secret, they began to share them.

By spring, both ponies were spinning better than ever. Their rivalry had become something friendlier, a reason to push each other rather than a reason to stay apart. At this year's fair, Pepper spun thirty-two times and Tangerine spun thirty-four. Tangerine won again, but she insisted that Pepper stand beside her on the winner's bench.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "rivalry" mean?',
          choices: ['A long friendship that started in childhood', 'A kind of dance', 'A competition between two people', 'A secret plan'], correctIndex: 2,
          hint: 'The two ponies were both trying to win the same contest.' },
        { type: 'twoFact', question: 'What did Tangerine notice about Pepper\'s spinning?',
          choices: ['She started too slowly', 'She always started too fast', 'She spun with her eyes closed', 'She wasted her first few turns'], correctIndex: 1,
          hint: 'Each pony noticed something different about the other.' },
      ],
    },
    {
      title: 'Why Meadow Loves Bees',
      passage: `Meadow Bloom grows the best strawberries in Brindlewood, and she gives much of the credit to bees. Without them, she says, her garden would be half as full.

Most fruit begins as a flower. Inside each flower is a fine yellow powder called pollen. Before a flower can turn into a strawberry, pollen has to travel from one part of the flower to another, or from one flower to the next. Plants cannot move, so they need help. That is where bees come in.

When a bee lands on a flower to drink its sweet nectar, pollen sticks to the tiny hairs on its body. As the bee flies to the next flower, some of that pollen rubs off. In this way, bees pollinate the plants they visit, and the flowers can grow into fruit.

To attract more bees, Meadow plants rows of lavender and clover between her strawberries. She never uses sprays that could harm insects. She also leaves a shallow dish of water with pebbles in it, so bees can land and drink without falling in.

Each summer, Meadow counts how many strawberries she picks. Since she started planting for the bees, her harvest has nearly doubled.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "pollinate" mean?',
          choices: ['To water plants on hot, dry summer days', 'To carry pollen between flowers', 'To pick ripe fruit', 'To plant seeds in rows'], correctIndex: 1,
          hint: 'Read how pollen rubs off as the bee flies.' },
        { type: 'recall', question: 'Why does Meadow put pebbles in the dish of water?',
          choices: ['To keep the water cool', 'To make the dish heavier', 'To show the bees where the strawberries are', 'So bees can land without falling in'], correctIndex: 3,
          hint: 'Read the fourth paragraph.' },
      ],
    },
    {
      title: 'The First Storyteller',
      passage: `Ember Spark's Friday campfire stories are a tradition in Brindlewood, but she did not start it. The tradition began with her great-grandmother, a Fire pony named Ashby.

Ashby moved to Brindlewood from the Fire zone when she was young. She missed the campfires of Ashfall Camp, where ponies gathered every night to share stories. So one Friday, she built a small fire at the edge of the Proving Glade and began telling a tale about a dragon who was afraid of the dark. Only two foals came to listen. The next week, five came. By the end of the summer, half the village was there.

Ashby's stories were long and full of songs. She would stop in the middle of a story and teach everyone a chorus to sing. Ember's stories are different. They are shorter and quieter, and her voice drops to a whisper at the scary parts so listeners have to lean in.

Ember still tells the dragon story, but she changed the ending. In Ashby's version, the dragon learns to carry a lantern. In Ember's version, the dragon discovers that the dark is full of stars. Ember says every storyteller should leave a story a little different from how she found it.`,
      questions: [
        { type: 'twoFact', question: 'How does the dragon story end in Ember\'s version?',
          choices: ['The dragon discovers the dark is full of stars', 'The dragon learns to carry a lantern', 'The dragon flies to Ashfall Camp', 'The dragon falls asleep'], correctIndex: 0,
          hint: 'Ashby\'s ending and Ember\'s ending are different.' },
        { type: 'recall', question: 'How many foals came to Ashby\'s very first story?',
          choices: ['Five', 'Half the village', 'Two', 'Ten'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Learning to Fly',
      passage: `Sky Dancer can loop, dive and spin through the air, but she was not born knowing how. Like every young Air pony, she had to learn to fly one small step at a time.

Her first lessons happened on the ground. Her mother taught her to stretch her wings fully and flap them in a steady rhythm while standing still. For two weeks, Sky practiced flapping every morning until her shoulders were strong enough to lift her body.

Next came short hops. Sky would run across the meadow, flap hard and lift off the ground for a moment before landing again. Most of her early hops ended with a tumble into the grass. Her mother told her that falling was part of learning, and that every tumble taught her wings something new.

The hardest lesson was gliding. Instead of flapping constantly, Sky had to learn to hold her wings still and let the air carry her. It felt terrifying at first, because she was sure she would drop like a stone. But one windy afternoon, she jumped from a low hill, spread her wings and floated all the way to the bottom.

Sky says that first glide is still her favorite memory. She has been chasing that feeling ever since.`,
      questions: [
        { type: 'recall', question: 'What was the hardest lesson for Sky?',
          choices: ['Flapping in a steady rhythm', 'Short hops across the meadow', 'Landing softly', 'Gliding'], correctIndex: 3,
          hint: 'Read the fourth paragraph.' },
        { type: 'recall', question: 'What did Sky\'s mother say about falling?',
          choices: ['It was part of learning', 'It meant Sky should stop for the day', 'It only happened to weak flyers', 'It could be avoided by flying faster'], correctIndex: 0,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Stella\'s Finished Map',
      passage: `For three years, Stella Dream worked on her map of the night sky. Every clear night, she climbed the hill behind Brindlewood Home and added a few more stars. Last month, she finally finished.

The completed map shows more than nine hundred stars. Bright stars are marked with large dots and faint stars with tiny ones. But the most interesting part of the map is the constellations. A constellation is a group of stars that seems to form a picture when you imagine lines connecting them. Stella drew those lines in pale blue chalk.

Some of Stella's constellations were already known to the ponies of Brindlewood, such as the Teapot and the Leaping Pony. Others she named herself. One cluster of seven stars looks like a sunflower, so she called it the Hollow Flower. A long, curved line of stars reminded her of Tangerine Twirl mid-spin, so she named it the Twirl.

Stella gave the finished map to the village hall, where it now hangs beside the slice of the old oak branch. She has already begun a second map. This one will show how the stars move across the sky during a single night.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "constellation" mean?',
          choices: ['A very bright star', 'A map of the whole night sky, drawn in chalk', 'A group of stars that forms a picture', 'A kind of telescope'], correctIndex: 2,
          hint: 'The passage explains the word in the second paragraph.' },
        { type: 'recall', question: 'Why did Stella name a constellation the Twirl?',
          choices: ['It spins across the sky each night', 'It reminded her of Tangerine spinning', 'Tangerine asked her to name it', 'It is shaped like a sunflower'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'A Year in Brindlewood',
      passage: `Brindlewood Home may be a quiet village, but its calendar is full of celebrations. Each season has its own special day.

Spring begins with the Seed Swap, held on the first warm Saturday of the year. Ponies trade seeds saved from their gardens so that everyone can plant something new. A few weeks later comes Blossom Day, when the first apple blossoms open. Ponies weave flower crowns and dance around the oak in the Proving Glade.

Summer belongs to the Sunflower Fair. There is a contest for the tallest sunflower, a spinning contest and a kite race on the windiest afternoon. The fair lasts three days and ends with a picnic in Sunflower Hollow.

In autumn, the village holds the Harvest Supper. Every family brings a dish made from its own garden, and the whole village eats together at long tables under lanterns.

Winter is the quietest season, but it has the Night of Small Lights. On the longest night of the year, every pony places a candle in a window. From the hill behind the village, Brindlewood looks like a valley full of fallen stars.

Many ponies say Blossom Day is their favorite, but the Night of Small Lights is the most beautiful.`,
      questions: [
        { type: 'twoFact', question: 'Which celebration comes first in spring?',
          choices: ['Blossom Day', 'The Seed Swap', 'The Sunflower Fair', 'The Harvest Supper'], correctIndex: 1,
          hint: 'Spring has two celebrations. Which one happens first?' },
        { type: 'recall', question: 'What happens on the Night of Small Lights?',
          choices: ['Ponies race kites', 'Families share a big supper at long tables', 'Ponies trade seeds', 'Every pony puts a candle in a window'], correctIndex: 3,
          hint: 'Read the paragraph about winter.' },
      ],
    },
    {
      title: 'Marina Meets the Sea',
      passage: `Marina Mist had imagined the sea a thousand times. She had listened to shells, learned songs about waves and studied her grandmother's drawings. But nothing prepared her for the moment she finally stood on the beach at Saltspray Cove.

The sea was vast. It stretched from one side of the sky to the other, with no shore in sight beyond it. Marina had expected it to be blue, but it changed color as she watched: green near the sand, deep blue farther out and silver where the sunlight touched it.

The sound surprised her too. In her shells, the ocean had been a soft, steady whoosh. In real life, it was a crash, then a hiss, then a pause, over and over. The rhythm reminded her of breathing.

Marina's grandmother stood beside her, smiling. "Well?" she asked.

Marina did not answer. She walked straight into the water until the waves reached her knees. A seagull called overhead. A little crab scuttled past her hoof. Then Marina began to sing her grandmother's sea song, and for the first time, the song made complete sense to her.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "vast" mean?',
          choices: ['Extremely large', 'Very cold', 'Very noisy', 'Calm and still'], correctIndex: 0,
          hint: 'It stretched from one side of the sky to the other.' },
        { type: 'twoFact', question: 'How did the real sea sound different from the sea in her shells?',
          choices: ['It was a soft, steady whoosh', 'It was completely silent', 'It was a crash, a hiss and a pause', 'It sounded like a song'], correctIndex: 2,
          hint: 'Compare the shell sound to the real sound.' },
      ],
    },
    {
      title: 'The Mill on the Creek',
      passage: `At the edge of Brindlewood Home, where the creek runs fastest, stands an old stone mill. For more than a century, it has turned grain into flour for the whole village.

The mill does not need any pony to push it. Instead, it uses the power of moving water. A large wooden wheel stands beside the mill with its bottom edge dipped into the creek. As the water rushes past, it pushes against flat boards attached to the wheel, and the wheel turns.

Inside the mill, the turning wheel spins a long wooden pole. That pole turns a pair of heavy, round stones called millstones. One stone stays still while the other spins on top of it. When grain is poured into a hole in the center, it gets crushed between the stones and comes out the sides as soft flour.

The miller, an Earth pony named Barley, checks the stones every week. If they become too smooth, they cannot grind properly, so he carves fresh grooves into them with a chisel.

Barley says the mill is busiest in late summer, after the harvest. During those weeks, the wheel turns from sunrise to sunset, and the whole building hums.`,
      questions: [
        { type: 'recall', question: 'What makes the mill\'s wheel turn?',
          choices: ['Ponies pushing it', 'The wind', 'A team of strong oxen walking in circles', 'The moving water of the creek'], correctIndex: 3,
          hint: 'Read the second paragraph.' },
        { type: 'twoFact', question: 'What happens to the two millstones?',
          choices: ['One stays still while the other spins', 'Both stones spin together', 'They take turns spinning on different days', 'Neither stone moves'], correctIndex: 0,
          hint: 'Read the third paragraph carefully.' },
      ],
    },
    {
      title: 'The Frost Night',
      passage: `One spring evening, the sky over Brindlewood turned perfectly clear, and the air grew colder by the minute. Clover Dewdrop's grandfather looked up and frowned. "Frost tonight," he said.

This was bad news for the apple orchard. The trees had just burst into blossom, and new blossoms are especially vulnerable to cold. If ice formed on their petals overnight, they would turn brown and fall off, and there would be no apples that autumn.

The ponies of Brindlewood had a plan for nights like this. As soon as the sun set, they lit small fires in metal pots between the rows of trees. The fires did not need to be large. They only needed to keep the air in the orchard a few degrees warmer than the air outside.

Clover and Tangerine Twirl took the first watch. They walked up and down the rows, adding sticks to the pots whenever a fire burned low. At midnight, Ember Spark and Meadow Bloom took over.

At sunrise, the meadow outside the orchard sparkled white with frost. But inside, the apple blossoms were still pink and soft. That autumn, the orchard gave its biggest harvest in ten years.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "vulnerable" mean?',
          choices: ['Very strong', 'Bright and colorful', 'Easily hurt', 'Ready to pick'], correctIndex: 2,
          hint: 'Cold can make new blossoms turn brown and fall off.' },
        { type: 'recall', question: 'Why did the ponies light small fires in the orchard?',
          choices: ['To scare away animals', 'To keep the air a little warmer', 'To see in the dark', 'To cook a midnight meal for the workers'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Keeping a Trainer\'s Journal',
      passage: `Many experienced trainers keep a journal, and most of them say they wish they had started sooner. A journal helps a trainer remember what they learn on their adventure.

There are two kinds of notes worth keeping. The first kind is about creatures. Whenever you meet a new wild creature, write down where you found it, what element it belongs to and how it behaved in battle. Did it attack quickly or wait for you to move first? Was it weak against water or fire? These notes will help you prepare the next time you meet one.

The second kind of note is about your own team. After each battle, write one thing that went well and one thing you could do better. Over time, these notes show patterns. You might notice that your companion struggles against fast opponents or does especially well in the morning.

Some trainers add drawings, maps or pressed flowers from the places they visit. Others keep their journals short and simple. There is no wrong way to do it, as long as you write regularly.

Vesper, the Grand Champion, has filled eleven journals. She still reads her very first one whenever she needs to remember how far she has come.`,
      questions: [
        { type: 'twoFact', question: 'What should a trainer write after each battle?',
          choices: ['Where they found a new creature', 'One thing that went well and one to improve', 'What element each creature belongs to', 'A drawing of the place'], correctIndex: 1,
          hint: 'The passage describes notes about creatures and notes about your own team.' },
        { type: 'recall', question: 'How many journals has Vesper filled?',
          choices: ['Three', 'Seven', 'Twenty', 'Eleven'], correctIndex: 3,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Creatures of the Glade',
      passage: `New trainers often wonder which wild creatures they will meet first. In the Proving Glade and the meadows around Brindlewood, most creatures are gentle, and they make good practice partners.

The most common creature is the meadow hopper, a small, round animal with long ears and a fluffy tail. Meadow hoppers are quick and love to dodge, but their attacks are weak. Battling them teaches a companion to be patient and aim carefully.

Less common, but still friendly, is the bramble pup. It looks like a small fox with leaves growing from its fur. Bramble pups are slower than meadow hoppers, but they hit harder. Battling them teaches a companion to take a hit and keep going.

The rarest creature in the glade is the dusk moth, which appears only around sunset. Its wings shimmer with every color of the rainbow. Dusk moths do not battle at all. If a trainer approaches calmly, a dusk moth will sometimes land on their companion's nose for a moment before fluttering away. Many trainers consider this a sign of good luck.

None of these creatures are dangerous. Even so, trainers are taught to battle them gently and let them go afterward.`,
      questions: [
        { type: 'twoFact', question: 'How are bramble pups different from meadow hoppers?',
          choices: ['They are slower but hit harder', 'They are faster and dodge more', 'They only appear at sunset', 'They do not battle at all'], correctIndex: 0,
          hint: 'The passage compares the two creatures in the third paragraph.' },
        { type: 'recall', question: 'When does the dusk moth appear?',
          choices: ['At dawn', 'At noon', 'Around sunset', 'Only in winter'], correctIndex: 2,
          hint: 'Read the fourth paragraph.' },
      ],
    },
    {
      title: 'The Sunflower Maze',
      passage: `Last summer, Clover Dewdrop and Tangerine Twirl had an idea for the Sunflower Fair. Instead of letting the sunflowers in one corner of the hollow grow wherever they liked, they would plant them in a pattern to make a maze.

Planning took weeks. The two friends drew dozens of designs on paper before choosing one. It had a single entrance, a single exit and a small clearing in the center with a bench. They included several dead ends, places where a path stops and you have to turn back, to make the maze more challenging.

In early spring, they marked the paths with string and planted seeds along both sides of every path. They watered the young plants every evening and pulled out any sunflowers that sprouted in the wrong place.

By midsummer, the sunflowers were taller than any pony. From the inside, the maze was a world of green stalks and yellow faces, and it was impossible to see where you were going.

On the first day of the fair, more than a hundred ponies tried the maze. The fastest made it through in eight minutes. The slowest took nearly an hour and had to be guided out by Clover, who knew every turn.`,
      questions: [
        { type: 'recall', question: 'What is in the center of the maze?',
          choices: ['The tallest sunflower', 'A water fountain', 'The exit', 'A small clearing with a bench'], correctIndex: 3,
          hint: 'Read the second paragraph.' },
        { type: 'wordMeaning', question: 'In this passage, what is a "dead end"?',
          choices: ['A place where a path stops', 'The exit of the maze', 'A very tall sunflower', 'The fastest way through'], correctIndex: 0,
          hint: 'The passage explains it right after the words.' },
      ],
    },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
}
