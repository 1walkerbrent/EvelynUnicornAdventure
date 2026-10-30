// Grade 4 reading (DESIGN.md §23): 15 passages per zone, 120–180 words.
// The grade 3 ramp (recall → two similar facts → inference) plus word
// meaning from context (Zones 1–2) and main idea (Zones 3–6).
import type { ZoneReading } from '../gradeTypes'

export const GRADE4_READING: ZoneReading = {
  // ── Zone 1: Brindlewood Home, Sunflower Hollow, the Proving Glade ──────────
  1: [
    {
      title: 'The Tallest Sunflower',
      passage: `Every summer, the ponies of Sunflower Hollow hold a fair to celebrate the tallest sunflower. This year, Meadow Bloom was determined to win. For weeks she watered her flower at dawn, pulled weeds at noon, and sang to it at dusk. Her grandmother once told her that plants grow faster when they hear music.

On the morning of the fair, the judges walked slowly down the row of flowers with a long measuring rope. Tangerine Twirl's sunflower was taller than a pony's ears. Acorn Sprout's sunflower was even taller than that. But Meadow Bloom's flower towered over all of them. It was so tall that the judges had to stand on a hay bale to reach the top.

Meadow Bloom won a blue ribbon and a basket of fresh pears. She shared the pears with everyone, and she promised to teach the other ponies her flower song next spring.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "towered" mean?',
          choices: ['Fell over onto', 'Was much taller than', 'Was the same size as', 'Was hidden behind'], correctIndex: 1,
          hint: 'The judges needed a hay bale to reach the top of her flower.' },
        { type: 'recall', question: 'What did Meadow Bloom do at dusk?',
          choices: ['Pulled weeds', 'Watered her flower', 'Sang to her flower', 'Measured her flower'], correctIndex: 2,
          hint: 'Find the word "dusk" in the first paragraph.' },
      ],
    },
    {
      title: 'Clover\'s Lucky Find',
      passage: `Clover Dewdrop had been searching the creek field for four-leaf clovers all morning. By noon, her eyes were tired and her knees were green from kneeling in the grass. She had found plenty of ordinary clovers, but not a single lucky one.

She was about to give up when a bee landed on a patch of clover near her hoof. Clover leaned in to watch it. As the bee buzzed away, she noticed something wonderful. Right where it had been sitting was a clover with not four leaves, but five.

Clover had never even heard of a five-leaf clover. She carried it home as carefully as if it were made of glass. That evening, she showed it to her friends, who agreed it was the rarest thing they had ever seen.`,
      questions: [
        { type: 'recall', question: 'What led Clover to the five-leaf clover?',
          choices: ['A bee landing on it', 'A map from a friend', 'A shiny stone nearby', 'A rabbit hopping past'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
        { type: 'wordMeaning', question: 'In this story, what does "ordinary" mean?',
          choices: ['Very rare', 'Brightly colored', 'Usual or common', 'Brand new'], correctIndex: 2,
          hint: 'She found plenty of these, but they were not the lucky kind.' },
      ],
    },
    {
      title: 'The Spinning Contest',
      passage: `Tangerine Twirl had won the spinning contest at the Sunflower Fair three years in a row. This year, a new pony named Pepper had moved to Brindlewood, and everyone said she could spin even faster.

When the contest began, Tangerine spun first. She turned so quickly that her orange mane blurred into a ring. She counted thirty spins before she stopped. The crowd cheered loudly.

Then Pepper took her turn. She started out fast, faster than Tangerine. But after twenty spins, she began to wobble. Her legs shook, and she leaned to one side like a top running out of speed. On the twenty-fifth spin, she tipped over into the soft grass.

Tangerine trotted over and helped her up. "You were faster at the start," she said kindly. "Let's practice together this year."`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "wobble" mean?',
          choices: ['To spin even faster', 'To stand perfectly still and straight', 'To sway in an unsteady way', 'To cheer very loudly'], correctIndex: 2,
          hint: 'Her legs shook and she leaned to one side.' },
        { type: 'recall', question: 'How many spins did Tangerine count?',
          choices: ['Twenty', 'Twenty-five', 'Forty', 'Thirty'], correctIndex: 3,
          hint: 'Look in the second paragraph.' },
      ],
    },
    {
      title: 'A First Battle',
      passage: `Every new trainer in the realm begins their adventure in the same place: the Proving Glade in Brindlewood Home. The glade is a round, grassy clearing with an ancient oak tree in the center.

A trainer's first battle always takes place beside that oak. The trainer stands on one side of the clearing with their new companion pony. A friendly wild creature waits on the other side. The battle is gentle, because its purpose is practice, not winning.

Neighbors often gather around the edge of the glade to watch. They clap for every good move and call out encouragement when a trainer makes a mistake. Many famous trainers say that the sound of that clapping is still one of their happiest memories.`,
      questions: [
        { type: 'recall', question: 'Where does a trainer\'s first battle take place?',
          choices: ['Beside the oak in the Proving Glade', 'At the far edge of Sunflower Hollow by the creek', 'Inside Granite Hall', 'On the road to Pebblebrook'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'Why is the first battle gentle?',
          choices: ['The oak tree protects everyone who battles there', 'Its purpose is practice, not winning', 'The neighbors ask it to be', 'The creature is very small'], correctIndex: 1,
          hint: 'Find the word "because".' },
      ],
    },
    {
      title: 'Marina\'s Big Trip',
      passage: `Marina Mist had dreamed about the sea her whole life. She had a basket of seashells from her grandmother and a song about the waves, but she had never seen the ocean with her own eyes.

So when her grandmother announced that they would visit Saltspray Cove at the end of summer, Marina could hardly sit still. She was so eager that she packed her bag three weeks early. She checked it every night to make sure nothing was missing: a towel, a sun hat, an empty jar for collecting sand.

Each morning, she crossed one more day off the calendar on her wall. Her friends teased her gently. "Marina, the sea will still be there!" Tangerine laughed. Marina just smiled and crossed off another day.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "eager" mean?',
          choices: ['Excited and impatient', 'Tired and sleepy', 'Worried and very nervous', 'Bored and quiet'], correctIndex: 0,
          hint: 'She packed three weeks early and could hardly sit still.' },
        { type: 'recall', question: 'What did Marina pack to collect sand?',
          choices: ['A small bucket', 'A sun hat', 'A cloth bag', 'An empty jar'], correctIndex: 3,
          hint: 'Look at the list of things in her bag.' },
      ],
    },
    {
      title: 'Stories in the Barn',
      passage: `Every Friday, the young ponies of Brindlewood gather around Ember Spark's campfire for stories. But last Friday, dark clouds rolled in just as the sun was setting. Big drops of rain began to splash onto the logs.

"Quick, into the barn!" called Ember. She grabbed a lantern, and everyone hurried after her.

Inside the barn, it was dry but chilly. The ponies huddled together on a pile of hay to stay warm. Ember hung the lantern from a hook, and its yellow light flickered across their faces.

Then she began her story, the one about the dragon who was afraid of the dark. With the rain drumming on the roof, it felt even more exciting than usual. When the story ended, nobody wanted to leave. So Ember told one more.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "huddled" mean?',
          choices: ['Ran away quickly', 'Pressed close together', 'Sat far apart', 'Lay down on the hay to sleep'], correctIndex: 1,
          hint: 'They did this to stay warm in the chilly barn.' },
        { type: 'recall', question: 'Why did the ponies go into the barn?',
          choices: ['It was too dark outside', 'Ember wanted to show them the hay', 'It started to rain', 'The campfire went out by itself'], correctIndex: 2,
          hint: 'Read the first paragraph.' },
      ],
    },
    {
      title: 'The Kite Race',
      passage: `On the windiest day of spring, the ponies of Brindlewood hold a kite race. Each pony builds a kite from sticks, paper and string. The winner is the one whose kite flies highest.

Sky Dancer had a clever idea this year. Instead of a heavy paper tail, she tied light feathers to the end of her kite. "Feathers help birds fly," she said. "Maybe they will help my kite too."

When the race began, most kites rose slowly and bobbed in the wind. But Sky's kite shot upward. It soared above the oak tree, then above the hill, until it was just a tiny speck against the clouds.

The judges had to squint to see it. Sky won first prize, and the next year, nearly every pony tied feathers to their kite.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "soared" mean?',
          choices: ['Fell to the ground', 'Got stuck in a tree', 'Spun around in small circles', 'Flew high into the air'], correctIndex: 3,
          hint: 'It went above the tree and the hill.' },
        { type: 'recall', question: 'What did Sky tie to the end of her kite?',
          choices: ['Light feathers', 'A paper tail', 'A red ribbon', 'A small bell'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Stella\'s Star Map',
      passage: `Stella Dream has given up trying to count every star in the sky. Now she has a new project. She is making a map of them.

Every clear night, Stella climbs the hill behind Brindlewood Home with a big sheet of paper and a stick of charcoal. She lies on her back, picks one small patch of sky, and draws each star she sees in that patch. Bright stars get big dots. Faint stars get tiny ones.

So far, Stella has filled in about a quarter of the paper. She has noticed that some stars seem to make shapes. One group looks like a teapot. Another looks like a pony jumping a fence.

Stella's mother hung the unfinished map above the fireplace. Visitors always stop to look at it.`,
      questions: [
        { type: 'recall', question: 'How does Stella show a bright star on her map?',
          choices: ['With a tiny dot', 'With a big dot', 'With a circle', 'With a star shape'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'Where did Stella\'s mother hang the map?',
          choices: ['In Stella\'s bedroom', 'On the barn door', 'Above the fireplace', 'In the village hall'], correctIndex: 2,
          hint: 'Look at the last paragraph.' },
      ],
    },
    {
      title: 'The Seed Swap',
      passage: `Every spring in Brindlewood Home, there is a tradition called the Seed Swap. It has happened on the first warm Saturday of the year for as long as anyone can remember.

Each pony brings a small bag of seeds saved from last year's garden. They set the bags out on long tables in the Proving Glade. Then everyone walks around and trades. Meadow Bloom always brings strawberry seeds, because hers are the sweetest in the village. Clover Dewdrop brings clover seeds, of course.

The Seed Swap helps the gardens of Brindlewood stay healthy. When ponies plant seeds from many different gardens, their plants are stronger and less likely to get sick. It also gives everyone a chance to share tips about growing.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "tradition" mean?',
          choices: ['A brand-new idea', 'Something done the same way for many years', 'A kind of garden tool', 'A contest with a prize'], correctIndex: 1,
          hint: 'It has happened for as long as anyone can remember.' },
        { type: 'recall', question: 'When does the Seed Swap happen?',
          choices: ['On the last day of summer', 'On Meadow Bloom\'s birthday', 'Every Friday night', 'On the first warm Saturday of the year'], correctIndex: 3,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'A Gentle Valley',
      passage: `Brindlewood Home sits in a valley surrounded by low, rolling hills. The hills block the strongest winds, so the valley is sheltered from storms. Even in winter, the snow there is usually light and melts within a few days.

Because the weather is so mild, the grass in Brindlewood stays green for most of the year. Wildflowers bloom from early spring until late autumn. Apple, pear and plum trees grow along the roads.

This gentle weather is one reason ponies of every element can live in Brindlewood. Fire ponies do not get too cold, and Water ponies do not get too dry. Earth, Air and Spirit ponies all find something they like. That is why the village is a perfect place for new trainers to begin.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "sheltered" mean?',
          choices: ['Protected from', 'Covered in snow', 'Open to', 'Far away from'], correctIndex: 0,
          hint: 'The hills block the strongest winds.' },
        { type: 'recall', question: 'What blocks the strongest winds?',
          choices: ['The fruit trees', 'The oak in the Proving Glade', 'The low, rolling hills', 'A tall stone wall'], correctIndex: 2,
          hint: 'Read the first two sentences.' },
      ],
    },
    {
      title: 'Helping with the Honey',
      passage: `Old Mrs. Thimble keeps beehives at the edge of Sunflower Hollow. Every autumn, she collects the honey, and every autumn, Clover Dewdrop and Tangerine Twirl help her.

Before they start, Mrs. Thimble gives each of them a puff of smoke from a little can. "The smoke makes the bees calm and sleepy," she explains. "Then they will not mind us."

Clover lifts the wooden frames out of the hive very gently, one at a time. Each frame is heavy and dripping with golden honey. Tangerine carries them to a table, where Mrs. Thimble scrapes the honey into jars.

By sunset, they have filled forty jars. Mrs. Thimble gives each helper two jars to take home. She always leaves plenty of honey in the hives so the bees will have food for the winter.`,
      questions: [
        { type: 'recall', question: 'Why does Mrs. Thimble use smoke?',
          choices: ['To make the honey sweeter', 'To make the bees calm and sleepy', 'To keep the ponies warm', 'To scare the bees far away'], correctIndex: 1,
          hint: 'She explains it in the second paragraph.' },
        { type: 'recall', question: 'How many jars did they fill by sunset?',
          choices: ['Two', 'Twenty', 'Forty', 'Fifty'], correctIndex: 2,
          hint: 'Look at the last paragraph.' },
      ],
    },
    {
      title: 'Fixing the Bridge',
      passage: `A little wooden bridge crosses the creek between Brindlewood Home and Sunflower Hollow. After a winter of rain and snow, the old boards had become soft and cracked. One morning, a board snapped right under Ember Spark's hoof.

"This bridge is not safe anymore," said Meadow Bloom. "We need to fix it."

So the ponies made a plan. Ember brought her red wagon to carry new boards from the lumber pile. Sky Dancer flew back and forth with nails and rope. Clover and Tangerine pulled up the cracked boards and laid down the new ones.

By evening, the bridge was finished. The new boards were thick and sturdy. Meadow jumped up and down in the middle, and the bridge did not even creak. Everyone cheered.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "sturdy" mean?',
          choices: ['Soft and cracked', 'Painted bright red', 'Strong and solid', 'Very long and thin'], correctIndex: 2,
          hint: 'Meadow jumped on it and it did not even creak.' },
        { type: 'recall', question: 'What did Sky Dancer carry?',
          choices: ['New boards from the pile', 'Nails and rope', 'The cracked boards', 'A basket of lunch'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Choosing a Companion',
      passage: `Before a new trainer can explore the realm, they must choose a companion pony. In Brindlewood Home, five young ponies wait to meet each new trainer. Each one belongs to a different element.

Marina Mist is a Water pony. She is calm and patient. Ember Spark is a Fire pony, bold and full of energy. Sky Dancer is an Air pony who loves to fly. Stella Dream is a Spirit pony with a quiet, thoughtful nature. Meadow Bloom is an Earth pony who is steady and kind.

There is no wrong choice. Every companion can grow strong and learn to battle well. Many trainers say they simply knew which pony was right the moment they met. After the choice is made, trainer and companion travel together for the whole adventure.`,
      questions: [
        { type: 'recall', question: 'Which companion is a Spirit pony?',
          choices: ['Marina Mist', 'Sky Dancer', 'Meadow Bloom', 'Stella Dream'], correctIndex: 3,
          hint: 'Read the second paragraph slowly.' },
        { type: 'recall', question: 'How many companion ponies wait to meet each new trainer?',
          choices: ['Three', 'Five', 'Six', 'Ten'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'A Soggy Picnic',
      passage: `Tangerine Twirl had planned the perfect picnic. She packed apple tarts, carrot muffins and a jug of lemonade. She chose a sunny spot on the hill above Sunflower Hollow and spread out her best blanket.

Her friends arrived just after noon. They had only eaten one muffin each when a gray cloud slid in front of the sun. A moment later, rain poured down.

There was nowhere to hide on the open hill. By the time the friends reached the oak tree, they were drenched. Water dripped from their manes and tails, and the blanket was soaked through.

At first, Tangerine felt like crying. Then Sky Dancer shook herself like a wet dog and sprayed everyone. They all burst out laughing. They finished the picnic under the oak, soggy tarts and all.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "drenched" mean?',
          choices: ['Completely wet', 'Very hungry', 'A little cold', 'Out of breath'], correctIndex: 0,
          hint: 'Water dripped from their manes and tails.' },
        { type: 'recall', question: 'Where did they finish the picnic?',
          choices: ['In Tangerine\'s barn', 'On the sunny hill', 'Under the oak tree', 'Beside the creek'], correctIndex: 2,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'Fireflies in the Hollow',
      passage: `On warm summer nights, something magical happens in Sunflower Hollow. As soon as the sun sets, thousands of fireflies rise out of the tall grass. Their tiny lights flicker on and off between the sunflower stalks.

The young ponies of Brindlewood love to walk through the hollow at night. They do not try to catch the fireflies. Instead, they stand very still and let the fireflies land on their noses and manes.

Stella Dream says the fireflies are talking to each other with their lights. She has noticed that they blink in patterns. Sometimes one blinks twice, and another answers by blinking twice too.

By midnight, most of the fireflies have settled back into the grass. The hollow goes dark, and the ponies walk home under the stars.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "flicker" mean?',
          choices: ['Shine without stopping', 'Turn on and off quickly', 'Fall to the ground', 'Change into a new color'], correctIndex: 1,
          hint: 'The lights go on and off.' },
        { type: 'recall', question: 'What do the young ponies do with the fireflies?',
          choices: ['Catch them in jars', 'Chase them away', 'Let them land on them', 'Count them one by one'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
      ],
    },
  ],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
}
