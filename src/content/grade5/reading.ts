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
  // ── Zone 2 (Earth): Pebblebrook, Mossgrove, Granite Hall ───────────────────
  2: [
    {
      title: 'The Carvers of Granite Hall',
      passage: `Granite Hall, the great hall inside the mountain where Warden Bramblewood lives, was not carved by a single group of ponies. It was carved over five generations, and each generation left its own mark.

The first carvers, more than a century ago, had only simple stone tools. They worked slowly, chipping out one small room at a time. Their walls are rough and uneven, and their ceilings are low. Visitors can still see the marks of their tools in the stone.

Their grandchildren discovered a better method. They learned that pouring water into a crack and letting it freeze overnight would split the rock open. This let them carve much larger rooms, including the Great Hall where the Trial is held today.

The most recent carvers have focused on beauty rather than size. They polished the walls of the entrance until they shine and carved patterns of leaves and acorns around every doorway.

The Earth ponies are proud that no generation tried to undo the work of the one before. Walking through Granite Hall today is like reading a history book written in stone. The oldest, roughest rooms lie at the very back, where the work first began.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "generations" mean?',
          choices: ['Kinds of stone tools used for carving the rock', 'Family groups born around the same time', 'Rooms in a hall', 'Long winters'], correctIndex: 1,
          hint: 'The first carvers were followed by their grandchildren.' },
        { type: 'twoFact', question: 'What did the most recent carvers focus on?',
          choices: ['Carving the largest rooms', 'Splitting rock with ice', 'Using simple stone tools', 'Making the hall beautiful'], correctIndex: 3,
          hint: 'Each generation focused on something different.' },
      ],
    },
    {
      title: 'Three Kinds of Soil',
      passage: `Every Earth pony learns early that not all dirt is the same. Gardeners in Pebblebrook talk about three main kinds of soil, and each one behaves differently.

Sandy soil is made of large, gritty grains. If you squeeze a handful, it falls apart as soon as you open your hoof. Water drains through sandy soil very quickly, which means plants growing in it can dry out. Carrots and other root vegetables do well in it, because their roots can push through easily.

Clay soil is the opposite. Its grains are so tiny and packed so tightly that it feels smooth and sticky when wet. Squeeze a handful, and it holds its shape like dough. Clay soil holds water for a long time, sometimes too long, so plant roots can rot. But it is rich in minerals, and Clay Canter digs it from the riverbank to make her pots.

The best garden soil is called loam. Loam is a mix of sand, clay and bits of old leaves and plants. It holds enough water for plants to drink but lets the rest drain away. When squeezed, it forms a loose ball that crumbles when you poke it.

Acorn Sprout spent two whole summers mixing sand and dead leaves into the clay of her garden. Now it is the best loam in Pebblebrook.`,
      questions: [
        { type: 'twoFact', question: 'Which soil holds water for a very long time?',
          choices: ['Clay soil', 'Sandy soil', 'Loam', 'All three equally'], correctIndex: 0,
          hint: 'The passage compares how each soil handles water.' },
        { type: 'recall', question: 'What happens when you squeeze a handful of loam?',
          choices: ['It falls apart right away', 'It holds its shape like a lump of dough', 'It forms a loose ball that crumbles', 'It turns into water'], correctIndex: 2,
          hint: 'Read the paragraph about loam.' },
      ],
    },
    {
      title: 'The Warden\'s Advice',
      passage: `Every trainer who faces Warden Bramblewood in the Earth Trial receives one piece of advice afterward, win or lose. Over the years, trainers have shared the advice they were given, and a few pieces have become famous.

To a trainer who rushed every move, Bramblewood said, "A mountain is not built in a day, and neither is a victory. Wait for the right moment." The trainer later became known for her patience in long battles.

To a trainer who had lost because he never changed his plan, Bramblewood said, "Water flows around a rock. Be water when you need to be." That trainer went on to win the Water Trial on his very first try.

To a trainer who won easily and bragged about it, Bramblewood said only, "The ground remembers who walks on it gently." She did not understand at first. Years later, she told the story to her own students as a lesson about humility.

Not all of Bramblewood's advice is so serious. To one young trainer who was clearly exhausted, he simply said, "Eat a good dinner and go to bed early." She says it was the most useful thing anyone told her during her entire adventure.

Bramblewood never writes his advice down. He says each trainer needs something different.`,
      questions: [
        { type: 'recall', question: 'What did Bramblewood tell the trainer who never changed his plan?',
          choices: ['Wait for the right moment', 'Eat a good dinner and go to bed early', 'The ground remembers', 'Be water when you need to be'], correctIndex: 3,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'Why does Bramblewood never write his advice down?',
          choices: ['He says each trainer needs something different', 'He forgets it right away', 'He wants it to stay a secret between him and each trainer', 'He cannot write'], correctIndex: 0,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Counting the Forest',
      passage: `Every five years, Fern Whisper leads a census of the animals living in Mossgrove. A census is an official count, and this one helps the Earth ponies understand whether the forest is healthy.

Counting animals in a thick forest is not easy. Many creatures hide during the day, and some only come out at night. So Fern divides Mossgrove into twenty sections and assigns two volunteers to each one. For one week, the volunteers visit their section at dawn, at noon and at dusk. They write down every animal they see or hear, along with any tracks, nests or droppings they find.

At the end of the week, Fern adds up all the numbers. Then she compares them to the census from five years earlier.

This year's results held good news and bad news. The number of owls had grown by almost a third, which Fern believes is because ponies stopped cutting down old hollow trees. But the number of frogs had dropped. After some investigation, Fern discovered that a small pond in the eastern section had been slowly filling with fallen leaves.

The Earth ponies spent a weekend clearing the pond. Fern hopes the frogs will be back by the next census.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "census" mean?',
          choices: ['A kind of owl', 'A section of forest', 'An official count', 'A walk at dawn'], correctIndex: 2,
          hint: 'The passage explains the word in the first paragraph.' },
        { type: 'twoFact', question: 'Which animals had grown in number since the last census?',
          choices: ['Frogs', 'Owls', 'Foxes', 'Both owls and frogs'], correctIndex: 1,
          hint: 'There was good news about one animal and bad news about another.' },
      ],
    },
    {
      title: 'How Boulderhoof Trains',
      passage: `Boulderhoof is the strongest pony in the Earth zone, and visitors often ask how he became so powerful. Most expect to hear about lifting giant boulders every day. His real routine surprises them.

Boulderhoof trains only four days a week. He says muscles grow stronger while they rest, not while they work, so resting days are just as important as training days. On those days, he walks slowly through Mossgrove or helps Daisy Dapple carry her paints.

On training days, he does not lift his heaviest boulder right away. He begins with small stones and works up to bigger ones over the course of a morning. He also practices balance by standing on one hoof on a narrow log. "Strength is useless if you fall over," he likes to say.

What he eats matters too. Boulderhoof eats a large breakfast of oats, apples and carrots, and he drinks plenty of water throughout the day. He avoids sweets before training, though he admits he has a weakness for honey cakes on rest days.

Finally, Boulderhoof sleeps at least nine hours every night. He goes to bed when the sun sets and wakes when it rises. Young ponies who copy his routine are often surprised to find that the sleeping part is the hardest.`,
      questions: [
        { type: 'recall', question: 'Why does Boulderhoof think resting days are important?',
          choices: ['He gets bored of training', 'Muscles grow stronger while they rest', 'He needs time to eat honey cakes with his friends', 'Daisy needs his help'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'How does Boulderhoof practice balance?',
          choices: ['By lifting small stones', 'By walking slowly through the ferns of Mossgrove', 'By carrying paint', 'By standing on one hoof on a log'], correctIndex: 3,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Colors from the Earth',
      passage: `Daisy Dapple never buys her paints. She makes every color herself from things she finds in the Earth zone. The colored powder at the heart of each paint is called a pigment, and Daisy has spent years learning where to find the best ones.

Her reds and browns come from clay. Different riverbanks hold clay of different colors, from pale orange to deep rusty red. Daisy dries the clay in the sun, grinds it into a fine powder with a stone and mixes it with a little oil.

Her purples and blues come from berries. She crushes ripe blackberries and elderberries and strains out the seeds. Berry colors are bright and beautiful, but they have a weakness. Over a few years, sunlight slowly fades them. So Daisy uses berry paints only for indoor paintings.

Her black comes from charcoal, the burned ends of sticks from old campfires. Charcoal black never fades at all, so Daisy uses it for outlines on her outdoor murals.

The hardest color for Daisy to make is green. Most green plants turn brown when they are crushed and dried. After many experiments, she found that a certain moss from Mossgrove keeps its color if she dries it in the shade. She guards the exact location of that moss carefully.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "pigment" mean?',
          choices: ['The colored powder in paint', 'A kind of paintbrush', 'A type of berry', 'A large painting on the wall of a building'], correctIndex: 0,
          hint: 'The passage explains the word in the first paragraph.' },
        { type: 'twoFact', question: 'Why does Daisy use berry paints only indoors?',
          choices: ['They are too dark', 'They smell too strong to use in the sun', 'Sunlight slowly fades them', 'They are hard to make'], correctIndex: 2,
          hint: 'Compare berry paints with charcoal black.' },
      ],
    },
    {
      title: 'Acorn Learns the Wheel',
      passage: `Acorn Sprout had collected rocks for years, but last spring she decided to try something new. She asked Clay Canter if she could learn to make pots.

Clay agreed, but she warned Acorn that the first lessons would be frustrating. She was right. Clay sat Acorn down at the potter's wheel, a flat round table that spins when you press a pedal with your hoof. The idea is to place a lump of wet clay in the center and shape it with your hooves while it spins.

The first problem was centering. If the clay is even slightly off-center, it wobbles and eventually flies off the wheel. Acorn's first six lumps all ended up on the floor. One hit Clay's cat.

The second problem was pressure. Pressing too hard made the walls of the pot collapse. Pressing too softly did nothing at all. Clay told her to imagine she was holding a baby bird.

After a month of practice, Acorn made her first bowl. It was lopsided and much too thick on one side. But Clay fired it in the kiln anyway, and Acorn uses it every morning for her oats. She says it is the best bowl in Pebblebrook. Clay says it is the most determined.`,
      questions: [
        { type: 'twoFact', question: 'What happened when Acorn pressed too hard?',
          choices: ['The clay flew off the wheel and hit the cat', 'Nothing happened at all', 'The wheel stopped spinning', 'The walls of the pot collapsed'], correctIndex: 3,
          hint: 'The passage describes pressing too hard and pressing too softly.' },
        { type: 'recall', question: 'What does Acorn use her first bowl for?',
          choices: ['Her oats every morning', 'Holding her rocks', 'Mixing Daisy\'s paints', 'Watering plants'], correctIndex: 0,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'The Forest\'s Recyclers',
      passage: `Every autumn, the trees of Mossgrove drop millions of leaves. Branches fall in storms, and old logs topple over. Yet the forest floor never becomes buried under a mountain of dead wood. Where does it all go?

The answer lies with some of the forest's smallest workers: mushrooms, worms and tiny creatures called beetles. Together, they decompose dead plants. To decompose means to break something down into smaller and smaller pieces until it becomes part of the soil again.

Mushrooms do much of the work. What we see above ground is only a small part of a mushroom. Underneath, it spreads a web of thin white threads through the dead wood. These threads slowly soften the wood from the inside. Then worms and beetles chew through the softened wood and leaves, turning them into rich, dark soil.

This process is extremely important. The new soil is full of nutrients, the food that plants need to grow. Without decomposers, the forest would run out of nutrients, and new trees could not grow.

Fern Whisper tells young ponies never to kick over mushrooms in Mossgrove. "They may not look like much," she says, "but they are feeding every tree in the forest."`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "decompose" mean?',
          choices: ['To grow tall', 'To fall from a tree', 'To break down into smaller pieces', 'To hide underground until spring comes'], correctIndex: 2,
          hint: 'The passage explains the word in the second paragraph.' },
        { type: 'recall', question: 'What does the white web of a mushroom do?',
          choices: ['It catches insects', 'It slowly softens wood from the inside', 'It holds up the tree when the wind blows hard', 'It turns leaves green'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Cleaning the Stream',
      passage: `The stream that gives Pebblebrook its name is famous for being clear enough to see every pebble on the bottom. But last summer, the ponies noticed a problem. The water near the village had turned cloudy, and the fish had begun to disappear.

Acorn Sprout and Boulderhoof decided to find the cause. They walked upstream, following the cloudy water. About a mile above the village, they found it. A section of the riverbank had collapsed after a heavy rain, and loose mud was pouring into the stream every time the water rose.

The fix took a full week. Boulderhoof rolled large flat stones into place along the bottom of the bank to hold it steady. Acorn and a group of young ponies planted willow cuttings in the soil above. Willows grow quickly, and their roots spread out and grip the earth, which keeps a riverbank from washing away.

Fern Whisper added a layer of thick moss over the bare dirt between the willows. The moss would hold the soil in place until the willow roots grew strong enough to take over.

Within a month, the water ran clear again. By autumn, the fish had returned, and the willows were already taller than Acorn.`,
      questions: [
        { type: 'recall', question: 'What was making the stream cloudy?',
          choices: ['Trash thrown in by ponies in the village', 'Mud from a collapsed riverbank', 'Too many fish', 'Paint from Daisy\'s studio'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'twoFact', question: 'What was the job of the moss?',
          choices: ['To feed the fish', 'To grip the earth with deep roots', 'To block the stream', 'To hold soil until the willow roots grew'], correctIndex: 3,
          hint: 'The willows and the moss each had a different job.' },
      ],
    },
    {
      title: 'Icicles of Stone',
      passage: `Deep in the caves beneath Granite Hall, visitors find strange stone shapes that look like giant icicles. Some hang down from the ceiling, while others rise up from the floor. They are called stalactites and stalagmites, and they form in a fascinating way.

Rainwater seeps slowly through the ground above the cave. As it travels, it picks up tiny amounts of a mineral from the rock. When a drop of this water reaches the cave ceiling, it hangs there for a moment before falling. During that moment, a tiny bit of the mineral is left behind on the ceiling. Drop after drop, over thousands of years, these tiny bits build a stone icicle hanging down. That is a stalactite.

When the drop finally falls and splashes on the floor, it leaves a bit of mineral there too. Over time, these build a stone column rising up from the floor. That is a stalagmite.

Here is an easy way to remember which is which. Stalactites hold tight to the ceiling. Stalagmites might reach it someday.

In a few places in the caves, a stalactite and a stalagmite have grown so long that they have met in the middle, forming a single stone pillar from floor to ceiling.`,
      questions: [
        { type: 'twoFact', question: 'Which formation rises up from the floor?',
          choices: ['A stalagmite', 'A stalactite', 'An icicle', 'A crystal'], correctIndex: 0,
          hint: 'One hangs down and one rises up.' },
        { type: 'recall', question: 'What happens when a stalactite and a stalagmite meet?',
          choices: ['They both break', 'They stop growing forever', 'They form a single stone pillar', 'They turn into crystals'], correctIndex: 2,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Mossy\'s Winter Burrow',
      passage: `Most Earth ponies stay in their houses during the cold months, but Mossy Tussock prefers something cozier. Every autumn, she digs a winter burrow in a hillside at the edge of Mossgrove.

Mossy chooses her spot carefully. It must face south, so the sun warms the entrance during the short winter days. It must be on a slope, so rain and melting snow run away instead of flooding in. And it must be under the roots of a large tree, which hold the soil together and stop the ceiling from caving in.

Digging takes about a week. The entrance tunnel slopes slightly upward before opening into a round room. Mossy explains that warm air rises, so the upward slope traps warmth inside the room and keeps cold air near the entrance.

Then comes the best part. Mossy lines the floor and walls with thick layers of dry moss that she has been collecting all summer. Moss traps air between its tiny leaves, and that trapped air keeps the warmth in.

On the coldest nights of winter, when frost covers the whole forest, Mossy's burrow stays warm enough that she sleeps without a blanket. Her friends often visit just to sit inside it for a while.`,
      questions: [
        { type: 'recall', question: 'Why must Mossy\'s burrow face south?',
          choices: ['So she can see Granite Hall from her bed', 'So rain runs away from it', 'So it is under a tree', 'So the sun warms the entrance'], correctIndex: 3,
          hint: 'Read the second paragraph.' },
        { type: 'twoFact', question: 'Why does the entrance tunnel slope upward?',
          choices: ['To trap warm air inside the room', 'To keep rain out', 'To make digging easier', 'To hide it from visitors'], correctIndex: 0,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Bare Trees and Green Trees',
      passage: `In winter, Mossgrove looks like two different forests mixed together. Some trees stand completely bare, their branches gray against the sky. Others stay green all year long. The difference comes down to the leaves.

Trees like Old Timber, the great oak, have wide, flat leaves. These leaves are excellent at catching sunlight in summer, but they are thin and would freeze in winter. So every autumn, these trees stop sending water to their leaves. The leaves change color, turning red, orange and yellow, and then fall off. The tree rests through the winter and grows new leaves in spring.

Pine and fir trees are different. They are called evergreens because they keep their leaves all year. Their leaves are long and narrow, shaped like needles, and covered with a waxy coating. The narrow shape and the wax keep the needles from losing water or freezing. Evergreens keep making food from sunlight all winter, though more slowly than in summer.

Each kind of tree has an advantage. The broad-leaved trees grow faster in summer. The evergreens can keep working when the others are resting.

The Earth ponies of Mossgrove love both. In autumn they celebrate the colors, and in winter they decorate the evergreens with strings of dried berries.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "evergreen" mean?',
          choices: ['A tree with red leaves', 'A very old tree', 'A tree that keeps its leaves all year', 'A tree that grows quickly in the summer sun'], correctIndex: 2,
          hint: 'The passage explains the word in the third paragraph.' },
        { type: 'twoFact', question: 'What advantage do broad-leaved trees have?',
          choices: ['They keep working all winter', 'They grow faster in summer', 'They never lose water', 'They have waxy needles'], correctIndex: 1,
          hint: 'Each kind of tree has a different advantage.' },
      ],
    },
    {
      title: 'A Trainer\'s Letter Home',
      passage: `Dear Grandma,

I made it to the Earth zone! The walk from Brindlewood took four days. On the first night, I camped by the stream in Pebblebrook, which is so clear that I could count the pebbles by moonlight. A pony named Acorn Sprout showed me her rock collection. She has a striped one that looks like an egg.

Yesterday I explored Mossgrove. The ferns are taller than I am, and I almost walked right past a pony named Fern Whisper because her coat is the same green as the leaves. She laughed and said it happens all the time.

Today I challenged Warden Bramblewood in the Trial. His ponies are so sturdy that my attacks barely moved them. I lost in the end, but it was close. Afterward, he shook my hoof and told me to stop rushing. He said I should wait for the right moment, the way a mountain waits.

So tomorrow I am going to practice being patient. Acorn says I can help her clear rocks from her garden, which she promises is excellent patience training. Then I will try the Trial again next week.

I miss your apple pie. Please save me a slice.

Love,
Rowan`,
      questions: [
        { type: 'recall', question: 'What advice did Bramblewood give Rowan?',
          choices: ['To train with heavier rocks', 'To stop rushing and wait for the right moment', 'To go home and rest', 'To choose a new companion'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'How long did the walk from Brindlewood take?',
          choices: ['One day', 'Two days', 'A whole week', 'Four days'], correctIndex: 3,
          hint: 'Look at the start of the letter.' },
      ],
    },
    {
      title: 'When the Ground Trembles',
      passage: `Once or twice a year, the ponies of the Earth zone feel the ground shake. Usually it is just a gentle tremble that rattles cups on a shelf and is over in a few seconds. These small shakes are called tremors.

Tremors happen because the ground beneath us is not one solid piece. Deep underground, the earth is made of enormous slabs of rock that fit together like pieces of a puzzle. These slabs move very slowly, about as fast as a fingernail grows. Usually they slide past each other smoothly. But sometimes two slabs get stuck, and pressure builds up. When the pressure finally releases, the slabs jerk forward, and the ground above them shakes.

Earth ponies can often feel a tremor coming before anyone else, because their hooves sense the tiny vibrations that come first. Warden Bramblewood says he can tell how strong a tremor will be by how it feels in the first moment.

The ponies of Granite Hall have a simple rule for tremors. Anyone inside moves to stand under a stone doorway, which is the strongest part of any room. Anyone outside moves away from cliffs and tall trees.

In all its history, Granite Hall has never been seriously damaged. The Earth ponies say that is because they carved it into the strongest rock in the mountain.`,
      questions: [
        { type: 'recall', question: 'What causes the ground to shake during a tremor?',
          choices: ['Stuck slabs of rock suddenly moving', 'Boulderhoof stomping', 'Water freezing deep underground in winter', 'Strong winds'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
        { type: 'twoFact', question: 'What should ponies who are outside do during a tremor?',
          choices: ['Stand under a stone doorway', 'Lie flat on the ground', 'Move away from cliffs and tall trees', 'Run into Granite Hall'], correctIndex: 2,
          hint: 'The rule is different for ponies inside and outside.' },
      ],
    },
    {
      title: 'Acorn\'s Fossil',
      passage: `Acorn Sprout has found many interesting rocks, but last autumn she found something truly special. While splitting a flat gray stone from the creek bank, she noticed a pattern inside it: the perfect shape of a fern leaf, every tiny leaflet pressed into the rock.

She carried it straight to Fern Whisper, who studied it carefully. "This is a fossil," Fern said. A fossil is the remains or the shape of a living thing from long ago, preserved in rock.

Fern explained how it probably formed. Long ago, a fern leaf fell into soft mud at the bottom of a pond. More mud settled on top of it, layer after layer. Over a very long time, the layers pressed together and hardened into stone. The leaf itself rotted away, but it left its shape behind, like a footprint.

What surprised Acorn most was that this kind of fern does not grow anywhere in Mossgrove today. Fern said it might be a kind that no longer exists at all.

Acorn now keeps the fossil in a special box lined with cloth, separate from her other rocks. She has started searching the creek bank every week. So far she has found two more fossils: a tiny shell and what might be part of an insect wing.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "fossil" mean?',
          choices: ['A very smooth stone from a creek', 'A kind of fern', 'A box for rocks', 'An ancient shape saved in rock'], correctIndex: 3,
          hint: 'Fern explains the word in the second paragraph.' },
        { type: 'recall', question: 'What surprised Acorn most about the fossil?',
          choices: ['That kind of fern no longer grows in Mossgrove', 'It was very heavy', 'Fern Whisper had already seen hundreds of them before', 'It glowed in the dark'], correctIndex: 0,
          hint: 'Read the fourth paragraph.' },
      ],
    },
  ],
  // ── Zone 3 (Water): Saltspray Cove, Mistreef, Coral Sanctum ───────────────
  3: [
    {
      title: 'Breathing Below the Waves',
      passage: `Both Water ponies and fish spend much of their lives underwater, but they solve the problem of breathing in completely different ways.

Fish breathe with gills, thin feathery organs on the sides of their heads. As water flows over the gills, they pull out the oxygen that is dissolved in it. Fish never need to come up for air. In fact, if a fish is taken out of the water, its gills collapse and it cannot breathe at all.

Water ponies breathe air, just like ponies of every other element. Before a dive, a Water pony takes several slow, deep breaths and then holds the last one. Their bodies are built to make that breath last. Their hearts slow down underwater, so they use less oxygen, and their large lungs store more air than most ponies'. Their thick coats also keep them warm in cold water. A trained diver like Tidalhoof can stay under for four minutes, but even he must eventually swim back to the surface.

Each way has its advantages. Fish can stay underwater forever but cannot leave it. Water ponies must return to the surface often, but they can live comfortably on land and in the sea.

Young Water ponies sometimes wish they had gills. Older ones say they would rather keep the beach.`,
      questions: [
        { type: 'compare', question: 'How is breathing different for fish and Water ponies?',
          choices: ['Fish breathe air at the surface, while ponies use gills', 'Fish use gills, while ponies hold their breath', 'Both of them must come up for air', 'Both of them use gills'], correctIndex: 1,
          hint: 'Read the second and third paragraphs and compare them.' },
        { type: 'purpose', question: 'Why did the author write this passage?',
          choices: ['To tell a story about Tidalhoof', 'To convince readers to learn to dive deep in the reef', 'To describe the beach', 'To explain two ways of breathing underwater'], correctIndex: 3,
          hint: 'Look at the first sentence and what the rest of the passage does.' },
      ],
    },
    {
      title: 'The Tidecaller',
      passage: `Tidecaller Nerida has guarded the Water zone for longer than most of its ponies have been alive. Yet few visitors know much about her life before she became guardian.

Nerida grew up in a tiny fishing village on the far side of Mistreef. As a foal, she was not a strong swimmer. Other young ponies teased her for always staying in the shallow water. But she spent hours watching the tides, learning when the water would rise, when it would fall and how the currents shifted around the reef.

When she was twelve, a sudden storm trapped a group of divers inside a reef cave. The strong swimmers tried to reach them and were pushed back by the current. Nerida, who knew the tides better than anyone, waited for the exact moment when the current paused. Then she swam in and guided every diver out.

The old guardian of the Water zone heard the story and invited her to train at the Coral Sanctum. Years later, Nerida took the old guardian's place.

Her name comes from that day. Ponies said she seemed to call the tide to her, and she has been the Tidecaller ever since. She still begins every morning by watching the water.`,
      questions: [
        { type: 'purpose', question: 'Why does the author include the story about the storm?',
          choices: ['To show how Nerida earned her name and her role', 'To warn readers never to swim into reef caves in storms', 'To explain how currents work', 'To describe the fishing village'], correctIndex: 0,
          hint: 'Think about what happened because of that day.' },
        { type: 'twoFact', question: 'How did Nerida reach the trapped divers?',
          choices: ['She swam faster than the strong swimmers', 'She called for help from the Sanctum', 'She waited for the current to pause', 'She dug a tunnel'], correctIndex: 2,
          hint: 'The strong swimmers and Nerida tried different things.' },
      ],
    },
    {
      title: 'Two Divers',
      passage: `Pearl Ripple and Tidalhoof are the two best divers in Saltspray Cove, and they often dive together in Mistreef. But anyone who watches them can see they have very different styles.

Tidalhoof dives with power. He kicks hard with his strong legs and shoots straight down toward the bottom like a falling stone. He reaches the deepest parts of the reef faster than anyone. But his powerful kicks use up air quickly, so his dives are short, and he often stirs up sand that clouds the water.

Pearl dives with patience. She glides down slowly in wide spirals, barely moving her legs. She takes much longer to reach the bottom, but she uses so little air that she can stay down nearly twice as long. Because she moves gently, the water around her stays clear, and fish swim right up to her.

Their different styles make them a perfect team. When they search for pearls, Tidalhoof dives first to scout the deepest spots and point out where the oysters are. Then Pearl follows, slowly and carefully, to collect them without disturbing the reef.

Both divers agree on one thing. Neither of them would ever dive alone. Each one always waits on the surface for the other.`,
      questions: [
        { type: 'compare', question: 'How are Pearl\'s dives different from Tidalhoof\'s?',
          choices: ['Pearl dives faster and deeper', 'Pearl kicks much harder with her strong legs', 'Pearl stirs up more sand', 'Pearl dives slowly but stays down longer'], correctIndex: 3,
          hint: 'Compare the second and third paragraphs.' },
        { type: 'compare', question: 'What do both divers agree on?',
          choices: ['Neither would ever dive alone', 'Fast dives are best', 'Pearls are easy to find', 'Spirals are the best way down'], correctIndex: 0,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'How to Explore a Tide Pool',
      passage: `Tide pools are one of the best places in Saltspray Cove to see sea creatures up close. They appear at low tide, when the sea pulls back and leaves water trapped between the rocks. If you visit one, follow these steps to stay safe and protect the creatures who live there.

First, check the tide. Low tide happens twice a day, at a different time each day. Plan to arrive about an hour before the lowest point, and leave before the water starts rising again. The sea comes back faster than most visitors expect.

Second, watch your step. The rocks around tide pools are often covered in slippery seaweed. Walk slowly and step on bare, dry rock whenever you can. Never step inside the pool itself, because the creatures hiding there are easy to crush.

Third, look before you touch. Many creatures blend in with the rocks. Be patient and stay still, and you will start to notice crabs, snails, starfish and tiny fish moving around.

Finally, if you gently pick up a creature, put it back exactly where you found it. Many of them have a favorite spot under a certain rock, and they need it to stay safe from the sun and seagulls. A tide pool is a home, not a toy.`,
      questions: [
        { type: 'purpose', question: 'What is the author\'s main purpose in this passage?',
          choices: ['To tell a story about a crab', 'To explain what causes the tides to rise and fall each day', 'To teach readers how to visit a tide pool safely', 'To describe Saltspray Cove'], correctIndex: 2,
          hint: 'Notice the words "First," "Second," "Third" and "Finally."' },
        { type: 'recall', question: 'Why should visitors never step inside a tide pool?',
          choices: ['The water is too cold', 'The creatures hiding there are easy to crush', 'The seaweed inside is too slippery to stand on', 'The pool is very deep'], correctIndex: 1,
          hint: 'Read the paragraph about watching your step.' },
      ],
    },
    {
      title: 'Above and Below',
      passage: `The Water zone has two main areas, and they could hardly be more different. Saltspray Cove lies above the water, while Mistreef lies below it.

Saltspray Cove is a curved bay with a wide sandy beach. Most Water ponies live there, in small houses on the dock or along the shore. The cove is full of sounds: waves crashing, seagulls calling and young ponies laughing in the tide pools. It is bright, busy and warm in summer, though winter storms can make it wild.

Mistreef is a coral reef just offshore, entirely underwater. It is quiet, except for the soft clicking of shrimp and the bubbles from passing divers. The light there is blue and wavy, and the colors of the coral seem to glow. Few ponies live in Mistreef, but it is where they find food, pearls and the glowing fish that come out at night.

Even though they are so different, the two places depend on each other. The reef breaks the biggest waves before they reach the beach, protecting the cove from storms. In return, the ponies of the cove protect the reef. They keep its water clean and never break the coral.

Visitors who only see the beach have seen only half of the Water zone.`,
      questions: [
        { type: 'compare', question: 'How are Saltspray Cove and Mistreef different?',
          choices: ['The cove is underwater, while the reef is up on dry land', 'The cove is loud and busy, while the reef is quiet', 'Both are full of houses', 'Both are covered in sand'], correctIndex: 1,
          hint: 'Compare the second and third paragraphs.' },
        { type: 'mainIdea', question: 'What is the main idea of the fourth paragraph?',
          choices: ['The reef stops the biggest waves during storms', 'Ponies never break coral', 'Storms are dangerous', 'The cove and the reef help protect each other'], correctIndex: 3,
          hint: 'Read the first sentence of that paragraph.' },
      ],
    },
    {
      title: 'From Misty\'s Fog Journal',
      passage: `Day 1. Nerida asked me to keep a journal while I practice making thicker fog. She says writing things down helps you notice patterns. I am not sure I believe her, but here goes. Today I made fog for ten minutes before I got tired. It was thin and wispy and blew away fast.

Day 4. I tried making fog in the morning instead of the afternoon. It lasted much longer! Maybe the cool morning air helps it stay together.

Day 9. Big discovery. When the air is already damp, like after rain, my fog is twice as thick and takes half the effort. When the air is dry and windy, I can barely make any at all. I never noticed this before.

Day 15. I made a fog thick enough to hide the whole dock for an hour. Bubble Brook walked right into a post. I said sorry, but I was secretly very proud.

Day 21. Nerida read my journal today. She smiled and asked what I had learned. I told her that fog is easiest on cool, damp mornings and hardest on dry, windy afternoons. She said that is exactly what a good mist-maker needs to know.

I guess she was right about writing things down.`,
      questions: [
        { type: 'purpose', question: 'Why is this passage written as a journal?',
          choices: ['To show how Misty learned by noticing patterns', 'To give a list of rules', 'To explain how Bubble hurt herself by walking into a post', 'To describe the dock'], correctIndex: 0,
          hint: 'Think about what the entries show from Day 1 to Day 21.' },
        { type: 'compare', question: 'How does fog-making on damp days compare with dry, windy days?',
          choices: ['It is easier on dry, windy days', 'It is the same on both', 'It is much easier on damp days', 'Fog cannot be made on damp days'], correctIndex: 2,
          hint: 'Read the Day 9 entry.' },
      ],
    },
    {
      title: 'When Coral Turns White',
      passage: `Most of the coral in Mistreef is brightly colored, in shades of pink, orange, purple and green. But in a few places, divers have noticed patches of coral that have turned completely white. This is called bleaching, and it is a sign that the coral is in trouble.

Coral gets its colors from tiny living things that live inside it. These little partners make food from sunlight and share it with the coral. In return, the coral gives them a safe place to live. It is a partnership that helps both.

When the water becomes too warm, this partnership breaks down. The stressed coral pushes its tiny partners out, and without them, the coral loses its color and its main source of food. If the water cools down soon enough, the partners can return and the coral recovers. If the water stays warm too long, the coral can starve.

The Water ponies are working to protect Mistreef. They plant small pieces of healthy coral in damaged areas to help the reef regrow. They keep the water clean, because coral that is already weak from dirty water bleaches more easily.

Every pony who visits the reef can help too. Never touch or stand on coral, and always take your trash home.`,
      questions: [
        { type: 'purpose', question: 'Why does the author include the last paragraph?',
          choices: ['To explain where the colors of coral come from', 'To describe a dive', 'To tell a funny story', 'To encourage readers to help protect the reef'], correctIndex: 3,
          hint: 'Notice that the paragraph speaks directly to the reader.' },
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['Why coral bleaches and how ponies protect it', 'How to plant coral', 'The colors of Mistreef', 'Why warm water is nice for swimming in the summer'], correctIndex: 0,
          hint: 'Think about what the whole passage explains.' },
      ],
    },
    {
      title: 'The Bubble and Fog Show',
      passage: `Every year at the Saltspray Summer Festival, Bubble Brook and Misty Wave perform a show together. Each brings her own talent, and the crowd loves the way they combine.

Bubble begins by blowing hundreds of blue bubbles, the long-lasting kind made with a drop of honey. They float over the beach in slow, glittering rows, each one catching the evening light. The crowd watches quietly as the bubbles drift higher.

Then Misty takes over. She breathes out a soft, low fog that rolls across the sand and rises slowly until it surrounds the floating bubbles. Inside the fog, the bubbles seem to glow like tiny lanterns, and the edges of everything turn silver and soft.

The two talents could not be more different. Bubbles are clear and round, and each one is separate. Fog is cloudy and shapeless, spreading everywhere at once. Bubbles rise upward. Fog creeps along the ground first. But together, they create something neither could make alone.

The show ends when Bubble blows one giant bubble right in the center of the fog. Misty pulls the fog inside it, and for a moment the crowd sees a perfect sphere of swirling mist. Then it pops, and the fog drifts away over the water.`,
      questions: [
        { type: 'compare', question: 'How is fog different from bubbles in this passage?',
          choices: ['Fog is clear and round', 'Fog rises upward first', 'Fog is cloudy and spreads everywhere', 'Fog is made with honey'], correctIndex: 2,
          hint: 'Read the fourth paragraph.' },
        { type: 'twoFact', question: 'What happens at the very end of the show?',
          choices: ['Bubble blows hundreds of blue bubbles', 'Misty pulls fog into one giant bubble', 'The crowd leaves the beach', 'Misty makes a low fog'], correctIndex: 1,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Please Do Not Feed the Seagulls',
      passage: `Many visitors to Saltspray Cove enjoy tossing bits of bread to the seagulls. The birds swoop and squawk and catch the crumbs in midair, and it can seem like harmless fun. But the ponies of the cove are asking visitors to stop, and they have good reasons.

First, bread is bad for seagulls. It fills their stomachs without giving them the nutrients they need. A seagull that eats too much bread may stop hunting for fish and crabs, which are much healthier foods.

Second, feeding seagulls changes how they behave. Once seagulls learn that ponies carry food, they become bold. At Saltspray Cove, seagulls have started snatching snacks right out of foals' hooves, and some have even raided picnic baskets.

Third, large crowds of seagulls cause problems for other animals. When too many gather on the beach, they scare away the sandpipers and disturb the turtle nests that the Water ponies work so hard to protect.

Seagulls are wonderful birds. They are clever, loud and full of personality. The best way to enjoy them is to watch them hunt for their own food along the shore. So the next time you visit the cove, please keep your bread to yourself. The seagulls, and the turtles, will thank you.`,
      questions: [
        { type: 'purpose', question: 'What is the author trying to do in this passage?',
          choices: ['Describe how seagulls fly', 'Convince readers not to feed seagulls', 'Explain how to bake bread', 'Tell a story about a picnic that seagulls raided'], correctIndex: 1,
          hint: 'Look at the title and the last few sentences.' },
        { type: 'twoFact', question: 'What is the author\'s second reason?',
          choices: ['Bread is bad for seagulls', 'Seagulls scare away other animals', 'Seagulls are clever', 'Feeding changes how seagulls behave'], correctIndex: 3,
          hint: 'Find the paragraph that starts with "Second."' },
      ],
    },
    {
      title: 'Giants in the Cove',
      passage: `Every autumn, the Water ponies of Saltspray Cove watch for a spout of mist rising from the open sea. It means the whales have arrived.

Whales are the largest creatures that visit the Water zone. The biggest are longer than ten ponies standing nose to tail. Although they live in the sea and are shaped a little like fish, whales are not fish at all. They are more like ponies in some surprising ways.

Fish breathe through gills, but whales breathe air, just as ponies do. They must swim up to the surface to breathe through a blowhole on top of their heads. That spout of mist is the whale breathing out. Fish lay eggs, but whales give birth to live babies, called calves, and feed them milk. Fish are usually cold to the touch, but whales are warm. Their songs can be heard through the water from far away.

The whales come to the warm, calm waters near the cove to have their calves. Mothers and calves stay for about two months before swimming back to colder seas to feed.

Water ponies sometimes swim out to greet them, staying a respectful distance away. Pearl Ripple says that once, a calf swam right up to her, looked at her with one huge, gentle eye and then dove back to its mother.`,
      questions: [
        { type: 'compare', question: 'How are whales different from fish?',
          choices: ['Whales breathe air and give birth to live babies', 'Whales lay eggs on the sandy beach and breathe water', 'Whales are colder to the touch', 'Whales have gills'], correctIndex: 0,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'Why do the whales come to the waters near the cove?',
          choices: ['To find fish to eat', 'To escape storms', 'To have their calves', 'To meet the Water ponies'], correctIndex: 2,
          hint: 'Read the fourth paragraph.' },
      ],
    },
    {
      title: 'Two Collectors',
      passage: `Splash Pebble and Coral Shimmer both collect treasures from the beach of Saltspray Cove, but they look for very different things and keep them in very different ways.

Splash collects sea glass. She loves how the waves turn sharp broken glass into smooth, frosty pebbles over many years. She searches the beach early every morning, especially after storms, and she keeps her finds in glass jars sorted by color. Her rarest piece is a tiny red one, which she says is harder to find than a pearl.

Coral collects shells, but only empty ones. She checks every shell carefully to make sure no creature is living inside before she picks it up. Instead of jars, she displays her shells on long wooden shelves, each one labeled with the name of the creature that once lived in it and the date she found it.

Despite their differences, they share one important rule. Neither of them ever takes anything from a living reef or a tide pool. They only collect what the sea has already washed up and left behind.

Every winter, they host a show in Coral's house, where young ponies can see both collections side by side. Splash brings her jars, and Coral moves a few shelves into the light.`,
      questions: [
        { type: 'compare', question: 'How do Splash and Coral keep their collections differently?',
          choices: ['Splash uses wooden shelves, while Coral uses glass jars', 'Both keep them in boxes', 'Both hang them from the ceiling', 'Splash uses jars, while Coral uses labeled shelves'], correctIndex: 3,
          hint: 'Compare how each one stores her treasures.' },
        { type: 'compare', question: 'What rule do both collectors share?',
          choices: ['Never take from a living reef or tide pool', 'Only collect red items', 'Only search after storms', 'Always label every find'], correctIndex: 0,
          hint: 'Read the fourth paragraph.' },
      ],
    },
    {
      title: 'Inside the Coral Sanctum',
      passage: `The Coral Sanctum stands on a rocky island at the edge of Mistreef. Its walls are made of living coral that has grown over hundreds of years, and its two great halls serve very different purposes.

The Hall of Echoes is where Tidecaller Nerida meets challengers in the Trial. It is round, with a ceiling so high and smooth that every sound bounces around the room several times. Trainers say it is hard to concentrate at first, because every command they call out comes back at them. The floor is covered in a thin layer of seawater, which makes it slippery for ponies who are not used to it.

The Hall of Pearls is a place of rest. Its walls are set with thousands of pearls, gifts from the divers of the cove over many generations. The room is quiet, because soft curtains of seaweed hang from the ceiling and absorb sound. The floor is dry sand, warm from the sun that shines through openings in the roof. The silence there is so deep that some visitors fall asleep.

Nerida spends her mornings in the Hall of Pearls, watching the tides through the windows. She enters the Hall of Echoes only when a challenger arrives.

Visitors may enter the Hall of Pearls freely. The Hall of Echoes is opened only for the Trial.`,
      questions: [
        { type: 'compare', question: 'How is the Hall of Pearls different from the Hall of Echoes?',
          choices: ['It is louder and slippery', 'It is where the Trial happens', 'It is quiet, with a dry sand floor', 'It is closed to visitors'], correctIndex: 2,
          hint: 'Compare the second and third paragraphs.' },
        { type: 'recall', question: 'Why is it hard for trainers to concentrate in the Hall of Echoes?',
          choices: ['It is too dark', 'Their commands echo back at them', 'Nerida talks during the battle', 'The pearls are distracting'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'The Night of the Big Storm',
      passage: `The storm reached Saltspray Cove just after sunset. Misty Wave had felt it coming all afternoon, the air thick and heavy, the seagulls flying inland in silent groups.

At first, the rain was steady but gentle. Then the wind rose. Waves that had been lapping at the beach began crashing against the dock. By midnight, they were spilling over the top.

Tidalhoof and Pearl Ripple went from house to house along the dock, helping families carry their belongings to the cliffs above the cove. Misty climbed onto the highest rock and wrapped the beach in a thick, heavy fog. The fog could not stop the waves, but it calmed the wind just enough to keep the houses' roofs from blowing away.

Out beyond the beach, Mistreef took the worst of the storm. The reef broke the biggest waves before they reached the shore, turning walls of water into rolling foam.

By dawn, the storm had passed. The beach was covered in seaweed and driftwood, and two boards were missing from the dock. It took a week to clean the beach. But every pony was safe, and every house was still standing.

Nerida came to the cove that morning. She thanked Misty, Tidalhoof and Pearl, and then she swam out to check on the reef.`,
      questions: [
        { type: 'twoFact', question: 'What did Misty\'s fog do during the storm?',
          choices: ['It stopped the waves from reaching the dock at all', 'It calmed the wind enough to save the roofs', 'It made the rain stop', 'It hid the cove from the storm'], correctIndex: 1,
          hint: 'The passage says what the fog could and could not do.' },
        { type: 'recall', question: 'What broke the biggest waves before they reached the shore?',
          choices: ['The dock', 'Misty\'s fog', 'The cliffs', 'Mistreef'], correctIndex: 3,
          hint: 'Read the fourth paragraph.' },
      ],
    },
    {
      title: 'Salt Water and Fresh Water',
      passage: `Water ponies swim in salt water, but they drink fresh water. Visitors are sometimes surprised to learn that these are not the same thing.

Salt water is found in the sea. It contains so much dissolved salt that it tastes sharp and bitter. Salt water is also heavier than fresh water, which means things float more easily in it. Water ponies say that swimming in the sea feels easier than swimming in a lake for this reason.

Fresh water is found in rivers, streams, lakes and rain. It contains very little salt. All land creatures, including ponies, need fresh water to drink. Drinking salt water actually makes a pony thirstier, because the body has to use up its own water to get rid of the extra salt.

So where do the ponies of Saltspray Cove get fresh water? A small stream flows down from the hills and into the cove. The ponies built a stone basin where the stream enters the bay, to collect clean water before it mixes with the sea. They also catch rainwater in barrels on their roofs.

Where the stream meets the sea, the water is a mix of both kinds. Certain fish live only in this in-between water, and Splash Pebble likes to watch them in the evenings.`,
      questions: [
        { type: 'compare', question: 'How is salt water different from fresh water?',
          choices: ['Salt water is heavier, so things float more easily', 'Salt water is lighter, so things sink to the bottom faster', 'Salt water is safe to drink', 'Salt water is found in rain'], correctIndex: 0,
          hint: 'Read the second and third paragraphs.' },
        { type: 'purpose', question: 'Why does the author explain the stone basin?',
          choices: ['To describe the shape of the bay', 'To explain why fish live there', 'To show how the ponies get fresh water to drink', 'To tell where Splash likes to go in the evenings'], correctIndex: 2,
          hint: 'Look at the question that starts the fourth paragraph.' },
      ],
    },
    {
      title: 'Advice from a Water Badge Winner',
      passage: `Dear future trainer,

When I arrived at the Coral Sanctum to challenge Tidecaller Nerida, I thought I was ready. I had already won the Earth badge, and I had trained my team hard. Nerida's ponies beat me in less than five minutes.

The problem was speed. Nerida's ponies moved so fast that I could barely give a command before they struck. And their attacks seemed to slide right off my best defenders, as if they were covered in sea foam.

So I spent two weeks in Saltspray Cove, watching and learning. I swam with Tidalhoof and noticed how he always paused for a breath before a big dive. I watched Misty Wave make fog and noticed that she always waited for a cool, damp moment.

When I returned for my second try, I watched Nerida's ponies the same way. Sure enough, each one paused for the briefest moment before a big attack. I told my team to strike right then. I also brought an Earth pony, because water soaks into soil instead of sliding off.

I won. Nerida smiled and gave me a small shell from her crown.

My advice is simple. Before you battle in the Water zone, spend time in it. The sea will teach you more than any book.

Good luck,
Juniper`,
      questions: [
        { type: 'purpose', question: 'Why did Juniper write this letter?',
          choices: ['To complain about losing', 'To describe Tidalhoof\'s diving', 'To thank Nerida for the shell', 'To give advice to future trainers'], correctIndex: 3,
          hint: 'Look at who the letter is addressed to and how it ends.' },
        { type: 'twoFact', question: 'What did Juniper notice about Nerida\'s ponies on her second try?',
          choices: ['They paused briefly before a big attack', 'They were slower than before', 'They were covered in sea foam', 'They could not swim'], correctIndex: 0,
          hint: 'Read the fourth paragraph.' },
      ],
    },
  ],
  4: [],
  5: [],
  6: [],
}
