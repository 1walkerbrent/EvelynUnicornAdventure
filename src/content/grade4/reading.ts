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
  // ── Zone 2 (Earth): Pebblebrook, Mossgrove, Granite Hall ───────────────────
  2: [
    {
      title: 'Carving Granite Hall',
      passage: `Granite Hall, the home of Warden Bramblewood, is carved deep inside a mountain. Many visitors wonder how the Earth ponies built such an enormous place out of solid rock.

The answer is that they did not build it quickly. Long ago, a small group of Earth ponies began carving a single room. They used stone tools and chipped away just a little rock each day. When they grew old, their children took over the work. Then their grandchildren did.

It took more than one hundred years to finish the great hall. The Earth ponies who carved it were very patient. They knew they might never see the hall completed, but they kept working anyway.

Today, a carving near the entrance shows the faces of the first ponies who started the work.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "patient" mean?',
          choices: ['Calm about waiting', 'Very strong', 'Quick and clever', 'Sick and needing rest'], correctIndex: 0,
          hint: 'They kept working for many years without seeing it finished.' },
        { type: 'recall', question: 'How long did it take to finish the great hall?',
          choices: ['About ten years', 'Just one long, cold winter in the mountain', 'More than one hundred years', 'Fifty years'], correctIndex: 2,
          hint: 'Look in the third paragraph.' },
      ],
    },
    {
      title: 'Acorn\'s Rock Talk',
      passage: `Acorn Sprout was asked to give a talk about rocks at the Pebblebrook school. She brought three rocks from her collection and set them on the table.

"Rocks are made in different ways," she began. She held up a gray, sparkly rock. "This one formed deep underground, where it was very hot. Melted rock cooled slowly and hardened."

Next she held up a tan rock with thin stripes. "This one formed from tiny bits of sand and mud. They settled in layers at the bottom of a lake and pressed together over a long time. You can see the layers in the stripes."

Finally, she held up a shiny, swirly rock. "This one started as a different rock. Heat and pressure changed it into something new."

The young ponies passed the rocks around and asked a dozen questions.`,
      questions: [
        { type: 'recall', question: 'How did the striped rock form?',
          choices: ['From melted rock that cooled', 'From layers of sand and mud', 'From heat changing another rock', 'From a crystal growing slowly'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'Where did Acorn give her talk?',
          choices: ['In the great hall of Granite Hall', 'At the Pebblebrook school', 'At the creek', 'In Mossgrove'], correctIndex: 1,
          hint: 'Look at the first sentence.' },
      ],
    },
    {
      title: 'The Hidden Helper',
      passage: `One afternoon, Fern Whisper heard a small, frightened bleat deep in Mossgrove. She followed the sound and found a baby deer tangled in a thorny bush. Its mother was pacing nearby, too nervous to come close.

Fern wanted to help, but she knew the mother deer might run away if she saw a pony. So Fern used her special talent. Her soft green coat was the perfect camouflage among the ferns. She crept forward slowly, and the mother deer never noticed her.

Fern carefully pulled the thorny branches apart, one at a time. The fawn wiggled free and bounded straight to its mother.

Fern stayed hidden until the two deer had trotted away together. Then she stood up, brushed the leaves from her mane, and walked home smiling.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "camouflage" mean?',
          choices: ['A loud warning call', 'A way of blending in', 'A thick, warm coat for winter', 'A kind of thorny bush'], correctIndex: 1,
          hint: 'Her green coat let her move among the ferns without being noticed.' },
        { type: 'recall', question: 'What was the baby deer tangled in?',
          choices: ['A fallen tree', 'A tangle of vines by the stream', 'A thorny bush', 'A fence'], correctIndex: 2,
          hint: 'Read the first paragraph.' },
      ],
    },
    {
      title: 'Boulderhoof\'s Secret Garden',
      passage: `Everyone in Pebblebrook knows that Boulderhoof is the strongest pony around. He can push boulders, carry tree trunks and lift a full wagon with one shoulder. So most ponies were surprised to learn about his secret hobby.

Behind his house, hidden by a tall hedge, Boulderhoof grows tiny mountain flowers. Their petals are thin and delicate, so fragile that a strong breeze can tear them. Boulderhoof waters them with a little cup, one drop at a time. He covers them with a cloth on windy days.

When Daisy Dapple discovered the garden, she asked if she could paint it. Boulderhoof blushed. "They are just little flowers," he mumbled. But he let her come every morning, and the painting now hangs in the entrance of Granite Hall.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "delicate" mean?',
          choices: ['Easily damaged', 'Very bright', 'Huge and heavy', 'Sweet-smelling'], correctIndex: 0,
          hint: 'A strong breeze can tear them.' },
        { type: 'recall', question: 'How does Boulderhoof water his flowers?',
          choices: ['With a big bucket', 'With a hose from the stream', 'He waits for the rain', 'With a little cup'], correctIndex: 3,
          hint: 'Look in the second paragraph.' },
      ],
    },
    {
      title: 'The Mural',
      passage: `Warden Bramblewood asked Daisy Dapple to paint a mural on the long wall beside the entrance to Granite Hall. A mural is a large painting made directly on a wall.

Daisy spent a week just planning. She decided the mural would show all of the Earth zone. On the left, she would paint Pebblebrook and its clear stream. In the middle, the giant ferns of Mossgrove. On the right, the mountain with Granite Hall inside it.

The painting took her the entire summer. She stood on a tall ladder for the high parts and lay on a blanket for the low ones. Clay Canter mixed her paints. Acorn Sprout brought her lunch every day.

When it was done, Bramblewood stood in front of it for a long time without saying a word. Then he bowed to Daisy.`,
      questions: [
        { type: 'recall', question: 'What did Daisy paint on the right side of the mural?',
          choices: ['The clear stream of Pebblebrook', 'The mountain with Granite Hall', 'The ferns of Mossgrove', 'Old Timber'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'Who mixed Daisy\'s paints?',
          choices: ['Acorn Sprout', 'Warden Bramblewood', 'Fern Whisper', 'Clay Canter'], correctIndex: 3,
          hint: 'Look in the third paragraph.' },
      ],
    },
    {
      title: 'How Clay Becomes a Pot',
      passage: `A pot begins as a lump of wet clay dug from a riverbank. At that stage, it is soft and easy to shape, but it is also weak. If you filled a wet clay pot with water, it would turn back into mud.

To make a pot strong, a potter like Clay Canter follows several steps. First, she shapes the clay. Next, she lets it dry slowly in the shade for about a week. If it dries too fast, it can crack.

Then comes the most important step. Clay places the dry pot in a kiln, which is a special oven that gets much hotter than any kitchen fire. The heat changes the clay so it becomes hard as stone.

Finally, Clay paints a glaze on the pot and heats it once more. The glaze makes it shiny and keeps water in.`,
      questions: [
        { type: 'recall', question: 'What can happen if the clay dries too fast?',
          choices: ['It turns into mud', 'It changes color', 'It can crack', 'It gets too heavy'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
        { type: 'wordMeaning', question: 'In this passage, what does "kiln" mean?',
          choices: ['A tool for digging up clay', 'A shiny paint for pots', 'A very hot oven for hardening clay', 'A cool, shady place to let pots dry slowly'], correctIndex: 2,
          hint: 'The passage explains the word right after it.' },
      ],
    },
    {
      title: 'All About Moss',
      passage: `Moss covers almost everything in Mossgrove: the rocks, the logs, and even the roofs of the houses. It looks like a soft green carpet. But moss is a very unusual plant.

Most plants have roots that pull water up from the ground. Moss does not have real roots. Instead, it has tiny threads that hold it in place. Moss drinks through its leaves. When rain falls, moss can absorb many times its own weight in water, the way a sponge does.

This makes moss very useful. It keeps the forest floor damp during dry weeks, which helps other plants grow. Mossy Tussock uses dry moss to stuff pillows and line her winter blankets. She says nothing is softer or warmer.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "absorb" mean?',
          choices: ['Push away', 'Soak up', 'Grow taller', 'Dry out quickly'], correctIndex: 1,
          hint: 'Moss takes in water the way a sponge does.' },
        { type: 'recall', question: 'How does moss drink?',
          choices: ['Through long roots', 'Through its leaves', 'Through its tiny threads', 'It does not need water'], correctIndex: 1,
          hint: 'Read the second paragraph carefully.' },
      ],
    },
    {
      title: 'The Earth Zone\'s Guardian',
      passage: `Warden Bramblewood is the guardian of the Earth zone. He has protected Pebblebrook, Mossgrove and Granite Hall for many years.

Bramblewood is known for being calm and steady, like a mountain. He rarely raises his voice. When young ponies argue, he listens to both sides before he says anything.

Trainers who want to earn the Earth badge must challenge Bramblewood in a battle called the Trial. The Trial takes place in the great hall of Granite Hall. Bramblewood's ponies are strong and hard to knock down, so trainers must be well prepared.

Win or lose, Bramblewood always shakes each trainer's hoof afterward. He gives them one piece of advice to help them grow stronger. Many trainers say his advice helped them more than the badge did.`,
      questions: [
        { type: 'recall', question: 'Where does the Earth Trial take place?',
          choices: ['In the great hall of Granite Hall', 'Beside the clear stream in Pebblebrook', 'Under Old Timber', 'In the Proving Glade'], correctIndex: 0,
          hint: 'Look in the third paragraph.' },
        { type: 'recall', question: 'What does Bramblewood give every trainer after the Trial?',
          choices: ['A badge', 'A piece of advice', 'A rock from the hall', 'A new companion'], correctIndex: 1,
          hint: 'Find the words "Win or lose".' },
      ],
    },
    {
      title: 'The Spring Flood',
      passage: `For three days in early spring, rain fell on Pebblebrook without stopping. The little stream grew wider and faster. On the third night, it overflowed. Water spilled over the banks and crept toward the houses.

Boulderhoof woke everyone up. "We need to build a wall!" he called.

The ponies worked through the night by lantern light. Boulderhoof rolled large stones into a line along the bank. Acorn Sprout and Clay Canter filled the gaps with smaller rocks and mud. Fern Whisper and Mossy Tussock stuffed thick moss into the cracks to keep the water from leaking through.

By morning, the rain had stopped. The stream was still high, but the wall had held. Not a single house was flooded. The tired ponies ate a big breakfast together and then slept until noon.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "overflowed" mean?',
          choices: ['Dried up completely', 'Froze into ice', 'Flowed over its edges', 'Changed direction and ran uphill'], correctIndex: 2,
          hint: 'Read the next sentence: water spilled over the banks.' },
        { type: 'recall', question: 'What did Fern and Mossy use to fill the cracks?',
          choices: ['Mud and sticks', 'Thick moss', 'Small rocks', 'Old blankets'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Forgotten Acorns',
      passage: `Every autumn, the squirrels of Mossgrove get very busy. Old Timber and the other oak trees drop thousands of acorns, and the squirrels hurry to collect them.

A squirrel does not keep all its acorns in one place. Instead, it buries them one by one in hundreds of little holes all over the forest. In winter, when food is hard to find, the squirrel digs them up and eats them.

But squirrels do not remember every hiding spot. Many acorns stay buried all winter. When spring comes, some of those forgotten acorns sprout and grow into tiny oak trees.

This means squirrels are accidentally planting new forests. The ponies of Mossgrove say that many of the tall oaks around them were planted by squirrels long ago.`,
      questions: [
        { type: 'recall', question: 'What happens to some forgotten acorns in spring?',
          choices: ['They rot away', 'Birds eat them', 'They grow into oak trees', 'The ponies collect them'], correctIndex: 2,
          hint: 'Read the third paragraph.' },
        { type: 'recall', question: 'Where does a squirrel hide its acorns?',
          choices: ['In one big pile', 'In many holes all over the forest', 'Inside the hollow trunk of Old Timber', 'In its nest'], correctIndex: 1,
          hint: 'Look in the second paragraph.' },
      ],
    },
    {
      title: 'How Crystals Grow',
      passage: `The glowing crystals in the walls of Granite Hall did not appear overnight. They grew there gradually, over thousands of years.

Crystals form from water that has minerals in it. Minerals are tiny bits of rock that are too small to see. As the water drips slowly through cracks in the mountain, it leaves some minerals behind. Those bits stick together in neat, flat-sided shapes. Then more bits stick to them, and the crystal grows a tiny bit larger.

A crystal might grow only as much as the thickness of a hair in a whole year. That is why the biggest crystals in Granite Hall are so precious. The Earth ponies never break them off the walls. They want the crystals to keep growing for the ponies who will live there in the future.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "gradually" mean?',
          choices: ['Slowly, a little at a time', 'All at once', 'By accident', 'Very loudly'], correctIndex: 0,
          hint: 'They grew over thousands of years.' },
        { type: 'recall', question: 'Why do the Earth ponies leave the crystals on the walls?',
          choices: ['The crystals are too heavy', 'Bramblewood would be angry', 'They want them to keep growing', 'Broken crystals stop glowing right away'], correctIndex: 2,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'The Tunnel Mystery',
      passage: `Acorn Sprout's garden had a problem. Every morning, she found new piles of dirt between her carrot rows. Some of her carrots had even disappeared, pulled down into the ground.

Acorn decided to solve the mystery. That night, she hid behind her fence with a lantern and waited. For hours, nothing happened. Then, just before dawn, a little mound of dirt began to rise. Out popped a velvety gray nose with tiny pink whiskers. It was a mole!

The mole had been digging tunnels right under her garden. Acorn did not want to hurt it. Instead, she planted a row of extra carrots at the far end of the garden, away from her own rows. The mole seemed to like that idea. After that, her own carrots were left alone.`,
      questions: [
        { type: 'recall', question: 'When did the mole appear?',
          choices: ['Right at sunset', 'At noon', 'Just before dawn', 'In the middle of the afternoon'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'How did Acorn solve her problem?',
          choices: ['She chased the mole away', 'She built a fence underground', 'She asked Boulderhoof for help', 'She planted extra carrots for the mole'], correctIndex: 3,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Market Day',
      passage: `On the first day of every month, Pebblebrook has a market. Ponies from all over the Earth zone come to buy and sell things in the village square.

Clay Canter and Daisy Dapple share a table. Clay sells bowls, cups and vases. Daisy sells her painted stones and small statues. Since they started selling together, both of them have sold more than ever. Ponies who come to buy a bowl often stop to admire a painted stone. Ponies who come for a stone often notice a pretty vase.

At the end of each market day, they count their coins and split the cost of renting the table. Then they treat themselves to a slice of berry pie from the bakery stall. Clay always picks blueberry. Daisy always picks raspberry.`,
      questions: [
        { type: 'recall', question: 'When is market day in Pebblebrook?',
          choices: ['Every Saturday', 'Only on the hottest days of summer', 'Once a year', 'The first day of every month'], correctIndex: 3,
          hint: 'Look at the first sentence.' },
        { type: 'recall', question: 'Which pie does Daisy always pick?',
          choices: ['Apple', 'Blueberry', 'Cherry', 'Raspberry'], correctIndex: 3,
          hint: 'Read the end of the passage carefully.' },
      ],
    },
    {
      title: 'The Echo Game',
      passage: `Some of the halls inside Granite Hall have high, curved ceilings and smooth stone walls. When you shout in one of these halls, your voice bounces off the walls and comes back to you. This returning sound is called an echo.

Mossy Tussock invented a game using echoes. One pony stands in the middle of the hall and calls out a word. The others listen carefully to the echo and try to guess how many times it repeats before it fades away.

In the smallest hall, a word echoes about three times. In the Great Hall, where the Trial is held, it can echo as many as nine times. Mossy's record guess is perfect: nine out of nine. She says the trick is to close your eyes and count very slowly.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "echo" mean?',
          choices: ['A loud scream', 'A sound that bounces back', 'A kind of stone wall', 'A guessing game'], correctIndex: 1,
          hint: 'The passage explains the word in the first paragraph.' },
        { type: 'recall', question: 'How many times can a word echo in the Great Hall?',
          choices: ['Three times', 'Five times', 'Twelve times', 'Nine times'], correctIndex: 3,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Feeling the Ground',
      passage: `Earth ponies have a special ability that surprises visitors. They can feel tiny vibrations in the ground through their hooves.

A vibration is a very small, fast shaking. When something moves nearby, it sends vibrations through the earth. Most ponies cannot notice them. But an Earth pony standing still can tell when a rabbit is hopping across a field or when a wagon is rolling down a road far away.

This ability helps keep the Earth zone safe. Before a rockslide, the mountain rumbles very faintly. Earth ponies can feel it long before anyone can hear it. Then they warn everyone to move away from the cliffs.

Warden Bramblewood is said to have the most sensitive hooves of all. He can feel footsteps all the way across Pebblebrook.`,
      questions: [
        { type: 'recall', question: 'How do Earth ponies help before a rockslide?',
          choices: ['They push the rocks away', 'They feel the rumble and warn everyone', 'They build a wall', 'They hide in Granite Hall'], correctIndex: 1,
          hint: 'Read the third paragraph.' },
        { type: 'wordMeaning', question: 'In this passage, what does "vibration" mean?',
          choices: ['A very small, fast shaking', 'A loud crashing sound', 'A large crack in the ground', 'A strong gust of wind'], correctIndex: 0,
          hint: 'The passage explains it at the start of the second paragraph.' },
      ],
    },
  ],
  // ── Zone 3 (Water): Saltspray Cove, Mistreef, Coral Sanctum ───────────────
  3: [
    {
      title: 'Swimmers and Mist-Makers',
      passage: `Not every Water pony has the same talents. In Saltspray Cove, most Water ponies are either swimmers or mist-makers.

Swimmers, like Tidalhoof and Pearl Ripple, are built for the sea. They have strong legs and long, flat tails that push them through the waves. Some can hold their breath for several minutes and dive to the bottom of Mistreef.

Mist-makers, like Misty Wave, have a different gift. They can pull water out of the air and shape it into fog, mist or even a light rain. They rarely swim far, but they can hide the whole cove in a cloud when danger comes near.

Both kinds of Water ponies are important. Swimmers gather food and explore the reef. Mist-makers protect the cove and water the gardens on dry days.`,
      questions: [
        { type: 'twoFact', question: 'Which kind of Water pony waters the gardens on dry days?',
          choices: ['Mist-makers', 'Swimmers like Tidalhoof', 'Both kinds equally', 'Neither kind'], correctIndex: 0,
          hint: 'Each kind has its own jobs. Read the last paragraph.' },
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How to hold your breath for a very long time underwater', 'Why Misty Wave makes fog', 'The bottom of Mistreef', 'Two kinds of Water ponies and their talents'], correctIndex: 3,
          hint: 'Think about what every paragraph talks about.' },
      ],
    },
    {
      title: 'Pearls Near and Far',
      passage: `Pearl Ripple is the best pearl diver in Saltspray Cove. She has learned that where a pearl is found tells you a lot about it.

Pearls from the shallow water near the shore are easy to reach. Young divers can find them in an afternoon. These pearls are small and white, and there are plenty of them. Pearl collects them to make necklaces for her friends.

Pearls from the deep water of Mistreef are much harder to get. Only strong divers can reach them, and it may take a week to find even one. Deep-water pearls are larger and shimmer with pink, silver or gold.

Pearl never takes more pearls than she needs. "If we take them all now," she says, "there will be none left for the divers who come after us."`,
      questions: [
        { type: 'twoFact', question: 'Which pearls are larger and shimmer with color?',
          choices: ['Pearls from the shallow water', 'Pearls from the deep water', 'Pearls made into necklaces', 'Pearls that young divers find'], correctIndex: 1,
          hint: 'Compare the paragraph about shallow water to the one about deep water.' },
        { type: 'twoFact', question: 'What are shallow-water pearls like?',
          choices: ['Small, white and plentiful', 'Large and pink', 'Very rare and hard to reach', 'Silver and gold'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Tidalhoof\'s Training',
      passage: `Tidalhoof is one of the strongest swimmers in the Water zone, and he trains every single day to stay that way. His training has two parts.

In the morning, he works on speed. He swims laps between the dock and the big gray rock, back and forth twenty times. He tries to finish faster than he did the day before. On a good morning, he can swim all twenty laps before breakfast.

In the evening, he works on breath. He floats quietly in a calm tide pool and practices holding his breath underwater. He started with thirty seconds. Now he can stay under for four whole minutes.

Tidalhoof says the morning practice makes him fast, but the evening practice makes him brave. "When you can stay calm underwater," he says, "the deep sea is not scary anymore."`,
      questions: [
        { type: 'twoFact', question: 'What does Tidalhoof practice in the evening?',
          choices: ['Swimming laps to the gray rock', 'Holding his breath underwater', 'Diving for pearls', 'Racing Misty Wave on the sand'], correctIndex: 1,
          hint: 'His training has a morning part and an evening part.' },
        { type: 'recall', question: 'How long can Tidalhoof stay underwater now?',
          choices: ['Thirty seconds', 'Two minutes', 'Ten minutes', 'Four minutes'], correctIndex: 3,
          hint: 'Thirty seconds is how long he could stay at the start.' },
      ],
    },
    {
      title: 'The Living Reef',
      passage: `From above the water, the coral of Mistreef looks like a garden of colorful rocks. But coral is not a rock, and it is not a plant. Coral is made of thousands of tiny animals.

Each little coral animal is smaller than a grain of rice. It builds a hard cup around its soft body to protect itself. When millions of these animals live side by side, their cups join together. Over many years, they form the huge branching shapes that make up the reef.

A healthy reef is home to many creatures. Fish hide in its branches, crabs live in its cracks and sea turtles visit to eat. The Water ponies take good care of Mistreef. They never stand on the coral, and they clean up any trash that drifts in from the waves.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How fish and crabs hide from danger in the reef', 'Why Water ponies swim so well', 'How to clean up a beach', 'What coral is and why the reef matters'], correctIndex: 3,
          hint: 'Think about the big idea of all three paragraphs together.' },
        { type: 'recall', question: 'What does each coral animal build around its body?',
          choices: ['A hard cup', 'A soft nest of sand', 'A shell like a snail\'s', 'A web of seaweed'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Facing Nerida',
      passage: `Tidecaller Nerida is the guardian of the Water zone. Trainers who want the Water badge must defeat her in the Trial, which is held in the Hall of Echoes inside the Coral Sanctum.

Nerida's ponies are known for two things. First, they are very fast. They can strike before the other side has even moved. Second, they are slippery. Attacks often slide right off them, as if they were covered in sea foam.

Experienced trainers have learned how to prepare. Against speed, they bring ponies with sturdy defenses who can take a hit and keep going. Against slipperiness, they bring Earth ponies, because water soaks into soil instead of sliding away.

Nerida respects trainers who think ahead. After a good battle, she often gives them a small shell from her crown.`,
      questions: [
        { type: 'twoFact', question: 'Which kind of pony do trainers bring against slipperiness?',
          choices: ['Ponies with sturdy defenses', 'Fast Fire ponies', 'Earth ponies', 'Air ponies that fly'], correctIndex: 2,
          hint: 'Trainers prepare one way for speed and another way for slipperiness.' },
        { type: 'recall', question: 'Where is the Water Trial held?',
          choices: ['On the beach of Saltspray Cove', 'In the Hall of Echoes', 'In the Hall of Pearls', 'At the bottom of Mistreef'], correctIndex: 1,
          hint: 'Look in the first paragraph.' },
      ],
    },
    {
      title: 'Bubble School',
      passage: `Every summer, Bubble Brook teaches the young ponies of Saltspray Cove how to blow bubbles. She always starts with two recipes.

For pink bubbles, you mix seawater with crushed rose petals. Pink bubbles are big and beautiful, but they pop within a few seconds. They are good for practicing, because you can blow lots of them quickly.

For blue bubbles, you mix seawater with a pinch of crushed blue shell and a drop of honey. The honey makes the bubble skin thicker. Blue bubbles are smaller, but they can float for an hour or more.

On the last day of Bubble School, everyone blows a blue bubble at the same time. Hundreds of them drift over the cove together, like a sky full of tiny moons. The parents always come to watch.`,
      questions: [
        { type: 'twoFact', question: 'What makes blue bubbles last longer?',
          choices: ['The crushed rose petals', 'Blowing them very quickly', 'The honey in the mix', 'The cold seawater'], correctIndex: 2,
          hint: 'Read the paragraph about blue bubbles.' },
        { type: 'twoFact', question: 'Why are pink bubbles good for practicing?',
          choices: ['They float over the cove for an hour or more', 'They are small and strong', 'You can blow lots of them quickly', 'They never pop'], correctIndex: 2,
          hint: 'Read the paragraph about pink bubbles.' },
      ],
    },
    {
      title: 'Summer and Winter in the Cove',
      passage: `Saltspray Cove feels like two different places depending on the season.

In summer, the water is warm and calm. Gentle waves roll onto the beach, and the sand is soft and hot. Young ponies spend all day swimming, building sandcastles and searching tide pools. At night, families eat dinner on the beach and watch the sunset.

In winter, the cove changes completely. Cold winds blow in from the open sea and whip the waves into tall, white peaks. Storms can last for days. Water ponies still swim, but only in the sheltered bay behind the big rocks.

Winter is also the best time to find treasure. The big waves wash up shells, sea glass and driftwood that stayed hidden all summer. Splash Pebble says her best finds always come the morning after a storm.`,
      questions: [
        { type: 'twoFact', question: 'Where do Water ponies swim in winter?',
          choices: ['Out in the open sea', 'In the warm tide pools', 'In the sheltered bay behind the rocks', 'Out in the open sea where the big waves are'], correctIndex: 2,
          hint: 'Read the paragraph about winter.' },
        { type: 'mainIdea', question: 'What is the main idea of this passage?',
          choices: ['Winter storms are dangerous for young ponies on the beach', 'Splash Pebble finds treasure', 'The cove is very different in summer and winter', 'Young ponies love sandcastles'], correctIndex: 2,
          hint: 'Look at the first sentence. The rest of the passage explains it.' },
      ],
    },
    {
      title: 'Splash and the Hermit Crab',
      passage: `While exploring a tide pool, Splash Pebble noticed a small snail shell moving across the sand. Snails move slowly, but this shell was scurrying quickly. Splash leaned closer and saw two tiny claws poking out.

It was a hermit crab. Hermit crabs do not grow their own shells. Instead, they live inside empty shells left behind by other sea creatures. As a hermit crab grows bigger, its shell gets too tight, and it has to find a larger one.

This crab's shell was clearly too small. Its legs were squeezed, and it kept stopping to rest. Splash had an idea. She ran home and came back with three empty shells from her collection, each a little bigger than the last.

The crab tried the middle one, wiggled inside and scurried happily away.`,
      questions: [
        { type: 'twoFact', question: 'Which of Splash\'s shells did the crab choose?',
          choices: ['The smallest one', 'The middle one', 'The biggest one', 'None of them'], correctIndex: 1,
          hint: 'She brought three shells of different sizes. Read the last sentence.' },
        { type: 'recall', question: 'Why do hermit crabs need new shells?',
          choices: ['They grow too big for them', 'Their old shells break', 'They want prettier ones', 'Other crabs steal their shells at night'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'The Fog Signals',
      passage: `When Misty Wave covers Saltspray Cove in thick fog, it can be hard to tell what is happening. So the Water ponies use a large spiral shell as a horn. When someone blows into it, it makes a deep sound that travels through the fog.

The ponies of the cove agreed on two signals. One long blow means "Stay where you are. The fog will lift soon." Three short blows mean "Come to the beach right away." The three-blow signal is only used for emergencies, such as when a young pony is missing.

Last spring, a foal wandered off during a fog. Misty blew three short blasts on the horn. Within minutes, ponies arrived from every direction to help search. They found the foal napping safely behind a sand dune.`,
      questions: [
        { type: 'twoFact', question: 'What does one long blow on the horn mean?',
          choices: ['Come to the beach right away', 'A young pony is missing', 'Stay where you are', 'The fog is getting thicker'], correctIndex: 2,
          hint: 'There are two signals. One is a long blow and one is three short blows.' },
        { type: 'recall', question: 'Where was the missing foal found?',
          choices: ['On the dock', 'Behind a sand dune', 'In a tide pool', 'At the Coral Sanctum'], correctIndex: 1,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'The Cooking Contest',
      passage: `At the Saltspray Summer Festival, there is always a cooking contest. This year, Coral Shimmer entered two dishes: her crispy kelp cakes and her famous seaweed soup.

Five judges tasted everything. Three of them voted for the kelp cakes. They said the cakes were the crunchiest they had ever eaten. Two judges voted for the soup, saying it was rich and full of flavor.

So the kelp cakes won first prize, a golden ladle. The soup came in second and won a silver spoon.

Coral was pleased, but she laughed when she held up her prizes. "I still think the soup is better," she told the crowd. Then she served a bowl of soup to every pony at the festival, and many of them agreed with her.`,
      questions: [
        { type: 'twoFact', question: 'How many judges voted for the soup?',
          choices: ['One', 'Two', 'Three', 'Five'], correctIndex: 1,
          hint: 'Some judges voted for the cakes and some for the soup.' },
        { type: 'twoFact', question: 'What prize did the soup win?',
          choices: ['A golden ladle', 'A blue ribbon', 'A silver spoon', 'A basket of shells'], correctIndex: 2,
          hint: 'First place and second place won different prizes.' },
      ],
    },
    {
      title: 'Why Tides Happen',
      passage: `Twice each day, the sea rises up the beach of Saltspray Cove, and twice each day it slides back out. These changes are called tides. But what makes them happen?

The answer is the moon. Even though the moon is very far away, it pulls on everything on our world, including the water in the sea. Its pull is strongest on the side of the world that faces it. The water on that side bulges toward the moon a little bit. When the bulge reaches the cove, the tide is high.

As the world turns, the cove moves away from the bulge, and the tide goes out. This happens over and over, every day.

Water ponies can feel the pull of the tides. Many of them wake up at high tide without needing anyone to call them.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How the moon causes the tides', 'Why Water ponies wake up early', 'How to find tide pools', 'How far away the moon is'], correctIndex: 0,
          hint: 'The first paragraph asks a question. The passage answers it.' },
        { type: 'wordMeaning', question: 'In this passage, what does "bulges" mean?',
          choices: ['Freezes solid', 'Sinks down', 'Becomes much saltier', 'Swells outward'], correctIndex: 3,
          hint: 'The water rises toward the moon a little bit.' },
      ],
    },
    {
      title: 'Turtle Night',
      passage: `Once a year, on a warm night in early summer, something special happens on the beach of Saltspray Cove. Sea turtles crawl out of the waves to lay their eggs in the sand.

A mother turtle digs a deep hole with her back flippers. She lays about one hundred eggs, covers them with sand and slowly returns to the sea. About two months later, the baby turtles hatch. They dig their way out and scramble toward the water.

The Water ponies of the cove protect the nests. They mark each one with a ring of shells so nobody steps on it. When the babies hatch, the ponies stand guard to keep seagulls away. They also cover their lanterns, because bright lights can confuse the babies and lead them away from the sea.`,
      questions: [
        { type: 'mainIdea', question: 'What is the main idea of this passage?',
          choices: ['Seagulls are dangerous to baby turtles on the beach at night', 'Why lanterns are bright', 'How turtles swim in the deep sea', 'How sea turtles nest and how ponies protect them'], correctIndex: 3,
          hint: 'Think about what the whole passage explains, not just one detail.' },
        { type: 'recall', question: 'Why do the ponies cover their lanterns?',
          choices: ['To save oil', 'So they can see the stars', 'So they will not wake the seagulls', 'Bright lights confuse the babies'], correctIndex: 3,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'Two Roommates',
      passage: `Bubble Brook and Misty Wave share a little house on the dock. They are best friends, but they are very different roommates.

Bubble is extremely tidy. She folds her blanket every morning and keeps her seaweed rings lined up on a shelf from smallest to largest. She sweeps the sand out the door twice a day.

Misty is not tidy at all. Her side of the room is covered in shells, scarves and half-finished drawings. Her fog sometimes leaves little puddles on the floor.

For a while, this caused arguments. Then they made a deal. Misty promised to dry up her puddles every night. In return, Bubble agreed not to touch anything on Misty's side of the room. Now they get along perfectly.`,
      questions: [
        { type: 'twoFact', question: 'Who sweeps the sand out the door twice a day?',
          choices: ['Misty Wave', 'Bubble Brook', 'They take turns', 'Nobody does'], correctIndex: 1,
          hint: 'One roommate is tidy and the other is not.' },
        { type: 'twoFact', question: 'What did Misty promise in the deal?',
          choices: ['To dry up her puddles every night', 'To keep her side tidy', 'To stop making fog', 'To fold her blanket every single morning'], correctIndex: 0,
          hint: 'Each friend promised something different.' },
      ],
    },
    {
      title: 'The Glowing Waves',
      passage: `On some summer nights, the waves at Saltspray Cove begin to glow. Each time a wave breaks on the sand, it flashes bright blue, as if someone had switched on a light.

This glow comes from creatures so tiny that you cannot see them one at a time. Millions of them float near the surface of the water. When the water is stirred up, each tiny creature gives off a small spark of blue light. Together, their sparks make the whole wave shimmer.

The Water ponies love these nights. They wade into the shallow water and kick their hooves to make the sea sparkle. Bubble Brook blows bubbles over the glowing waves, and the bubbles reflect the blue light like little lanterns. Nobody goes to bed early on a glowing night.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['Why the waves sometimes glow blue', 'How Bubble Brook blows bubbles over the cove', 'Why nobody goes to bed early', 'How to wade in shallow water'], correctIndex: 0,
          hint: 'Think about what the passage explains from beginning to end.' },
        { type: 'wordMeaning', question: 'In this passage, what does "shimmer" mean?',
          choices: ['Shine with a flickering light', 'Go completely dark', 'Grow very cold', 'Make a loud crashing noise on the sand'], correctIndex: 0,
          hint: 'Millions of tiny sparks light up the wave together.' },
      ],
    },
    {
      title: 'Splash\'s Reef Map',
      passage: `Splash Pebble is making a map of Mistreef for young swimmers. So far, she has marked two favorite places to visit.

The first is the Coral Garden. It is close to the surface, so even beginners can reach it. The water there is bright and clear, and colorful fish dart all around. Splash marked it with a green star on her map, which means it is safe for everyone.

The second is the Sunken Rowboat. It lies much deeper, at the edge of the reef where the water turns dark blue. An old wooden boat rests on the sand there, covered in seaweed and full of curious crabs. Splash marked it with a red star, which means only strong swimmers should go there, and never alone.

She plans to add five more places by the end of summer.`,
      questions: [
        { type: 'twoFact', question: 'What does a red star on Splash\'s map mean?',
          choices: ['Safe for everyone', 'A place with colorful fish', 'A place she has not visited', 'Only for strong swimmers'], correctIndex: 3,
          hint: 'Splash uses green stars and red stars. Find what each one means.' },
        { type: 'twoFact', question: 'Which place is close to the surface?',
          choices: ['The Sunken Rowboat', 'The Coral Garden', 'The edge of the reef', 'Both places'], correctIndex: 1,
          hint: 'Compare the two places on her map.' },
      ],
    },
  ],
  // ── Zone 4 (Fire): Cinderpath, Ashfall Camp, the Magma Forge ──────────────
  4: [
    {
      title: 'Ember Glow\'s Lesson',
      passage: `Ember Glow was asked to teach the young ponies of Ashfall Camp about embers. She brought her stone jar and poured out two embers onto a flat rock: one red and one blue.

"Red embers are the most common," she explained. "They form when wood burns down slowly. They glow for about a day and give off gentle heat. That makes them perfect for warming a tent or cooking a meal."

Then she pointed to the blue one. "Blue embers are rare. They only form deep inside the Magma Forge, where the heat is much stronger than any campfire. A blue ember can glow for a whole month, and it is hot enough to melt metal. So we use them only for forging."

The young ponies leaned in close. None of them had ever seen a blue ember before.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How to cook a meal over a campfire at night', 'Why the Magma Forge is so hot', 'How young ponies learn at camp', 'How red and blue embers are different'], correctIndex: 3,
          hint: 'Think about what Ember Glow spends the whole lesson explaining.' },
        { type: 'twoFact', question: 'How long can a blue ember glow?',
          choices: ['A whole month', 'About one day', 'A single hour', 'Forever'], correctIndex: 0,
          hint: 'Red embers and blue embers glow for different amounts of time.' },
      ],
    },
    {
      title: 'Campfire Rules',
      passage: `Spark Flicker lights every campfire at Ashfall Camp, so she also makes sure everyone follows the two campfire rules.

The first rule is about where to build a fire. A fire must always sit inside a ring of stones. The stones stop burning logs from rolling out and keep sparks from reaching the dry grass. Spark checks every ring before she lights a fire. If even one stone is missing, she will not light it.

The second rule is about leaving. Nobody may walk away from a fire until it is completely out. When a fire is finished, ponies pour sand over the coals and stir them until no smoke rises.

Spark says the first rule keeps a fire where it belongs and the second keeps it from coming back. In all her years at camp, there has never been a wildfire.`,
      questions: [
        { type: 'twoFact', question: 'Which rule keeps sparks away from the dry grass?',
          choices: ['The rule about leaving a fire', 'The rule about pouring sand', 'The ring of stones rule', 'The rule about stirring coals'], correctIndex: 2,
          hint: 'One rule is about where to build a fire. The other is about leaving.' },
        { type: 'recall', question: 'What do ponies pour over a finished fire?',
          choices: ['Cold water from the spring', 'Ash from the mountain', 'Dirt from the path', 'Sand'], correctIndex: 3,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Cocoa\'s Two Drinks',
      passage: `Cinder Cocoa runs a drink stand at the edge of Ashfall Camp. Most of the year, she sells her famous hot chocolate, stirred slowly with cinnamon added last.

But summers in the Fire zone are scorching. On the hottest days, even Fire ponies do not want a steaming drink. So Cocoa invented a second recipe: iced cocoa. She makes the chocolate the same way, then pours it over chips of ice that she keeps in a cold cave behind the stand.

Her hot chocolate is still her best seller overall. But from midsummer until the first cool week of autumn, the iced cocoa sells three times as fast.

Cocoa keeps a chalkboard by the stand. Every morning, she writes the day's temperature on it, so customers know which drink she recommends.`,
      questions: [
        { type: 'twoFact', question: 'Which drink sells faster in midsummer?',
          choices: ['Iced cocoa', 'Hot chocolate', 'Cinnamon tea', 'They sell the same'], correctIndex: 0,
          hint: 'One drink sells best overall, but a different one sells fastest in summer.' },
        { type: 'wordMeaning', question: 'In this passage, what does "scorching" mean?',
          choices: ['Very rainy', 'Extremely hot', 'Short and quick', 'Quiet and calm'], correctIndex: 1,
          hint: 'Even Fire ponies do not want a hot drink then.' },
      ],
    },
    {
      title: 'The Sleeping Mountain',
      passage: `The mountain that holds the Magma Forge is not an ordinary mountain. It is a volcano. Long ago, melted rock called lava poured out of its top and flowed down its sides. Over many years, the lava cooled and hardened, building the mountain taller and taller.

Today, the volcano is dormant. That means it is resting. Lava has not reached the top in hundreds of years. But the mountain is not completely asleep. Deep inside, a river of lava still flows slowly. Its heat keeps the forge warm and the hot springs of Ashfall Camp bubbling.

Fire ponies watch the mountain closely. If the ground shakes or steam starts rising from new cracks, they know the volcano may be waking up. So far, it has stayed quiet.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "dormant" mean?',
          choices: ['Burning brightly', 'Resting and not active', 'Growing taller every day', 'Broken apart'], correctIndex: 1,
          hint: 'The passage explains it in the very next sentence.' },
        { type: 'mainIdea', question: 'What is the main idea of this passage?',
          choices: ['The Magma Forge sits inside a resting volcano', 'Hot springs are fun to swim in', 'Lava is very dangerous to touch, even when it looks cool', 'Fire ponies like to climb mountains'], correctIndex: 0,
          hint: 'Think about what every paragraph is describing.' },
      ],
    },
    {
      title: 'Strong and Quick',
      passage: `Blazehoof and Flame Twirl both battle for Emberwarden Cinda, but they could not be more different.

Blazehoof is all strength. He is the biggest pony at the Magma Forge, and his hooves can crack stone. In a battle, he does not dodge. He simply stands his ground and takes each hit, then strikes back with one powerful blow.

Flame Twirl is all speed. She is small and light, and she moves like a spinning flame. In a battle, she never stands still. She darts left and right, so her opponent can hardly touch her, and she strikes with many quick little hits.

Trainers who face them in the Trial have to change their plans for each one. Against Blazehoof, they try to outlast him. Against Flame, they try to slow her down.`,
      questions: [
        { type: 'twoFact', question: 'How does Flame Twirl battle?',
          choices: ['She stands her ground and takes each hit', 'She darts around and strikes quickly', 'She cracks stone with her hooves', 'She waits for Blazehoof to help'], correctIndex: 1,
          hint: 'The passage describes Blazehoof first, then Flame.' },
        { type: 'twoFact', question: 'What do trainers try to do against Blazehoof?',
          choices: ['Slow him down', 'Outlast him', 'Make him dodge', 'Hide from him'], correctIndex: 1,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Traveling on Cinderpath',
      passage: `Cinderpath is the only road into the Fire zone, and it can be a tough trip for visitors. Fire ponies offer two pieces of advice, one for the day and one for the night.

During the day, the sun beats down on the dark cinders. The road becomes very hot. Travelers should carry plenty of water and rest in the shade of the big boulders along the way. Fire ponies say it is best to walk only in the morning and late afternoon.

At night, the road is much cooler. The cinders glow orange, so there is no need for a lantern. But the glow can make it hard to see the stars. Travelers who want to know which way is north should check the sky before the sun sets.

Most visitors choose to travel at night.`,
      questions: [
        { type: 'twoFact', question: 'What should travelers do during the day?',
          choices: ['Look at the stars', 'Light a lantern', 'Walk only at noon when it is brightest', 'Carry water and rest in the shade'], correctIndex: 3,
          hint: 'There is advice for the day and advice for the night.' },
        { type: 'twoFact', question: 'What problem does the glowing road cause at night?',
          choices: ['It is too hot to walk on at night', 'It wakes up the animals', 'It makes the stars hard to see', 'It burns their hooves'], correctIndex: 2,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'Why It Is Called Ashfall',
      passage: `Ashfall Camp sits at the bottom of the volcano that holds the Magma Forge. It got its name from something that happens every few weeks.

Now and then, the volcano lets out a puff of gray smoke. The smoke carries tiny bits of ash high into the air. When the wind dies down, the ash floats back to earth like soft gray snow. It covers the tents, the paths and the ponies' manes.

You might think the Fire ponies would mind. But ash is very good for gardens. It is full of minerals that help plants grow. Because of the ashfall, the gardens around the camp grow the biggest peppers and the sweetest melons in the whole realm.

After every ashfall, the young ponies sweep off the tents. Then they gently spread the extra ash over the gardens.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How to sweep a tent', 'Which melons are the sweetest in the realm', 'How smoke gets into the air', 'Why ash falls on the camp and why it helps'], correctIndex: 3,
          hint: 'Think about the name of the camp and the whole passage.' },
        { type: 'recall', question: 'What do the young ponies do with the extra ash?',
          choices: ['Throw it in the hot spring', 'Pile it by the gate', 'Spread it over the gardens', 'Carry it up the mountain'], correctIndex: 2,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'The Ember Festival',
      passage: `At the end of every autumn, the Fire zone celebrates the Ember Festival. Ponies come from all over the realm for two famous events.

The first is the Lantern Parade. As soon as the sun sets, hundreds of ponies walk down Cinderpath carrying paper lanterns, each with a red ember glowing inside. They walk from the edge of the zone all the way to Ashfall Camp. From the mountain, the parade looks like a river of light.

The second event is the Fire Dance Contest, held at midnight around the biggest bonfire of the year. Dancers spin and leap while sparks fly from their hooves. Flame Twirl has won it four years in a row.

The festival ends at sunrise, when everyone shares a giant breakfast of roasted apples and hot chocolate.`,
      questions: [
        { type: 'twoFact', question: 'When is the Fire Dance Contest held?',
          choices: ['As soon as the sun sets', 'At sunrise', 'At midnight', 'In the afternoon'], correctIndex: 2,
          hint: 'The festival has two events at different times.' },
        { type: 'recall', question: 'What is inside each paper lantern?',
          choices: ['A small candle', 'A blue ember', 'A firefly', 'A red ember'], correctIndex: 3,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Cinda\'s Trial',
      passage: `Emberwarden Cinda guards the Magma Forge and the Fire badge. Trainers who come to challenge her in the Trial discover that it tests two different things.

The first part of the battle tests courage. Cinda's ponies charge in fast, with flames roaring. Many trainers panic and make hasty choices. Cinda watches to see whether a trainer can stay calm when things look scary.

The second part tests cleverness. Once a trainer has shown courage, Cinda changes her plan. Her ponies start using tricks, like pretending to be tired and then attacking suddenly. To win, a trainer must notice the pattern and plan ahead.

"Courage gets you through the door," Cinda likes to say. "Cleverness gets you to the other side." Only trainers who show both earn her badge.`,
      questions: [
        { type: 'twoFact', question: 'What does the second part of the Trial test?',
          choices: ['Cleverness', 'Courage', 'Speed', 'Strength and size'], correctIndex: 0,
          hint: 'The Trial has a first part and a second part.' },
        { type: 'wordMeaning', question: 'In this passage, what does "hasty" mean?',
          choices: ['Rushed', 'Very brave', 'Slow and careful', 'Kind and friendly'], correctIndex: 0,
          hint: 'The trainers panic when this happens.' },
      ],
    },
    {
      title: 'Plants That Love Heat',
      passage: `Most plants would wilt in the heat of the Fire zone. But two kinds of plants grow happily on the warm slopes of the volcano.

Fireflowers have bright orange petals shaped like flames. They grow best in full sunlight, right next to the glowing cinders. Their roots reach deep underground to find water, so they rarely need rain. Fire ponies weave fireflowers into crowns for the Ember Festival.

Ash ferns grow in the shade, under rocky ledges. Their soft gray leaves are covered in tiny hairs that trap moisture from the air. Unlike fireflowers, ash ferns need a cool, damp spot to survive. Fire ponies use their leaves to wrap food before baking it in the coals.

Both plants are protected. Visitors may look at them, but they must never pick them.`,
      questions: [
        { type: 'twoFact', question: 'Where do ash ferns grow?',
          choices: ['In full sunlight', 'In the shade under rocky ledges', 'Right next to the glowing cinders on the road', 'In the hot springs'], correctIndex: 1,
          hint: 'The two plants grow in different places.' },
        { type: 'twoFact', question: 'What do Fire ponies make with fireflowers?',
          choices: ['Wrappers for baking food', 'Crowns for the festival', 'Medicine for burns', 'Tea for breakfast'], correctIndex: 1,
          hint: 'Each plant has a different use.' },
      ],
    },
    {
      title: 'Sunny\'s Pepper Patch',
      passage: `Sunny Scorch grows peppers in a sunny patch behind her tent. She grows two kinds, and they could not be more different.

The yellow sun peppers are sweet and mild. They grow quickly and are ready to pick by early summer. Sunny eats them raw as a snack, and young ponies love them because they are not spicy at all.

The red fire peppers are another story. They grow slowly and are not ready until late summer. But they are so spicy that even Fire ponies take only a tiny bite. Sunny dries them in the sun, grinds them into powder and sells it at the market in small jars.

Every year, Sunny holds a pepper-tasting day. Visitors can try both kinds. She keeps a bucket of milk nearby for anyone who bites into a red one too quickly.`,
      questions: [
        { type: 'twoFact', question: 'Which peppers are ready to pick by early summer?',
          choices: ['The yellow sun peppers', 'The red fire peppers', 'Both kinds', 'Neither kind'], correctIndex: 0,
          hint: 'One pepper grows quickly and one grows slowly.' },
        { type: 'recall', question: 'Why does Sunny keep a bucket of milk nearby?',
          choices: ['To water the peppers', 'To make hot chocolate', 'To wash the jars before filling them', 'For ponies who bite a spicy pepper'], correctIndex: 3,
          hint: 'Read the last sentence.' },
      ],
    },
    {
      title: 'Bells and Horseshoes',
      passage: `The ponies of the Magma Forge make many things from metal, but their two most famous products are horseshoes and bells.

Horseshoes must be tough. To make one, a smith heats a bar of iron in the forge until it glows bright orange. Then she hammers it into a curved shape on a heavy anvil. Finally, she dips it in cold water with a loud hiss, which makes the metal harder.

Bells must sing. They are made from a softer, golden metal called bronze. Instead of hammering, the smith melts the bronze completely and pours it into a clay mold shaped like a bell. When it cools, she breaks the mold away and polishes the bell until it shines.

Every bell is tested before it leaves the forge. If its sound is not clear and sweet, it is melted down and poured again.`,
      questions: [
        { type: 'twoFact', question: 'How is a bell shaped?',
          choices: ['By hammering it flat on a heavy anvil', 'By pouring melted metal into a mold', 'By dipping it in cold water', 'By bending a bar of iron'], correctIndex: 1,
          hint: 'Horseshoes and bells are made in different ways.' },
        { type: 'twoFact', question: 'What metal are horseshoes made from?',
          choices: ['Bronze', 'Gold', 'Iron', 'Silver'], correctIndex: 2,
          hint: 'Read the paragraph about horseshoes.' },
      ],
    },
    {
      title: 'Fire Ponies and Water',
      passage: `It is well known that Fire ponies do not like rain. A sudden shower sends them running for their tents. Cold water on their manes makes them shiver and feel weak, and a heavy storm can leave them tired for a whole day.

But that does not mean Fire ponies never touch water. Like every living creature, they need to drink it to stay healthy. The difference is that they prefer it warm. Most Fire ponies sip from the hot springs at Ashfall Camp, where the water is heated by the volcano.

Fire ponies also enjoy warm baths. Soaking in the big hot spring relaxes their muscles after a long day of training.

So it is not water itself that Fire ponies dislike. It is cold water falling from the sky.`,
      questions: [
        { type: 'mainIdea', question: 'What is the main idea of this passage?',
          choices: ['Fire ponies are afraid of storms', 'They like warm water, not cold rain', 'The hot springs are heated by the volcano', 'Fire ponies need to drink water'], correctIndex: 1,
          hint: 'Read the last two sentences again.' },
        { type: 'recall', question: 'Where do most Fire ponies drink?',
          choices: ['From rain barrels', 'From the hot springs', 'From a cold stream', 'From the Magma Forge'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'The Slow Dance',
      passage: `Two weeks before the Ember Festival, Flame Twirl twisted her ankle while practicing a leap. The healer told her she could walk, but she must not jump or spin fast for a month.

Flame was heartbroken. She had won the Fire Dance Contest four years in a row, and now she would have to miss it.

But then she remembered the Swirl, the slow dance she had learned the year before. It had no jumping at all. Flame practiced it every day, carefully and gently. She added long, sweeping turns and let the sparks from her hooves drift through the air like falling leaves.

On festival night, she performed the Swirl. The crowd was completely silent until she finished. Then they cheered louder than ever. Flame did not win first place, but she said it was her favorite dance of all.`,
      questions: [
        { type: 'mainIdea', question: 'What is this story mostly about?',
          choices: ['How to treat a twisted ankle', 'Who won the Fire Dance Contest', 'Flame finding a new way to dance after getting hurt', 'Why sparks fly from Fire ponies\' hooves during dances at night'], correctIndex: 2,
          hint: 'Think about Flame\'s problem and how she solved it.' },
        { type: 'twoFact', question: 'What could Flame still do after her injury?',
          choices: ['Jump and leap', 'Spin very fast', 'Walk', 'Run races'], correctIndex: 2,
          hint: 'The healer said what she could do and what she could not.' },
      ],
    },
    {
      title: 'Glass Rock and Sponge Rock',
      passage: `Two very different rocks are found on the slopes of the Fire zone's volcano. Both were made from lava, but they cooled in different ways.

Obsidian formed when lava cooled very quickly, so fast that it turned into a kind of natural glass. It is black and shiny, and when it breaks, its edges are sharper than any knife. Long ago, Fire ponies made tools from obsidian. Today, they mostly polish it into mirrors.

Pumice formed when lava full of gas bubbles cooled. The bubbles left tiny holes all through the rock. That makes pumice so light that it floats in water. Fire ponies use pumice to scrub their hooves and smooth rough wood.

Spark Flicker has a piece of each on her shelf. She likes to show visitors how one sinks and the other floats.`,
      questions: [
        { type: 'twoFact', question: 'What do Fire ponies use pumice for?',
          choices: ['Scrubbing hooves and smoothing wood', 'Making mirrors', 'Cutting rope', 'Building walls'], correctIndex: 0,
          hint: 'Obsidian and pumice have different uses.' },
        { type: 'twoFact', question: 'Why does obsidian have sharp edges?',
          choices: ['It is full of tiny holes', 'It is light enough to float', 'It cooled quickly into a kind of glass', 'Fire ponies sharpen it'], correctIndex: 2,
          hint: 'Read the paragraph about obsidian.' },
      ],
    },
  ],
  // ── Zone 5 (Air): Windwhistle Pass, Cloudperch, Galecrest Spire ───────────
  5: [
    {
      title: 'The Tower in the Clouds',
      passage: `Galecrest Spire is the tallest building in the realm. It rises from the top of a mountain in the Air zone, and its pointed tip often disappears into the clouds. A spire is a tall, narrow tower that comes to a point. This one is made of white stone that sparkles in the sun.

The Spire has more than two hundred rooms stacked on top of one another. Near the bottom are the kitchens, the library and the training halls. Air ponies live in the middle floors. At the very top is the Sky Chamber, where Skywarden Zephyra, the guardian of the Air zone, battles trainers in the Trial.

There are no stairs inside the Spire. Air ponies simply fly from floor to floor through a tall open shaft in the center. Visitors who cannot fly ride up in a basket pulled by ropes.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How Zephyra battles trainers in the Trial at the top', 'What Galecrest Spire is like inside and out', 'How to ride a basket pulled by ropes', 'Why Air ponies like to fly'], correctIndex: 1,
          hint: 'Think about what every paragraph describes.' },
        { type: 'wordMeaning', question: 'In this passage, what does "spire" mean?',
          choices: ['A thick cloud', 'A kind of mountain with snow on top', 'A large basket', 'A tall, pointed tower'], correctIndex: 3,
          hint: 'The passage explains the word in the first paragraph.' },
      ],
    },
    {
      title: 'Breezy\'s Spring Song',
      passage: `Everyone in Cloudperch loves Breezy Lark's autumn song. For years, ponies had begged her to write one for spring, too. But every time she tried, the words came out wrong.

This year, Breezy decided to stop trying so hard. She spent each morning of early spring just listening. She listened to the baby birds chirping in their nests. She listened to the ice melting off the edges of the clouds and dripping into the valley below. She listened to the wind, which had changed from cold and sharp to soft and warm.

On the first warm day of spring, Breezy flew to the highest cloud. She did not bring any notes with her. She simply opened her mouth and sang everything she had heard.

When she landed, a crowd was waiting. Several ponies were wiping their eyes. Wind Whistle hugged her and said, "Finally."`,
      questions: [
        { type: 'inference', question: 'Why was Breezy finally able to write a spring song?',
          choices: ['She stopped forcing it and listened to spring', 'Someone else wrote all of the words for her instead', 'She practiced the autumn song more', 'Wind Whistle taught her a new melody'], correctIndex: 0,
          hint: 'Think about what she did differently this year.' },
        { type: 'inference', question: 'Why were some ponies wiping their eyes?',
          choices: ['The wind was blowing dust', 'They were sad it was over', 'The song moved them', 'They had colds'], correctIndex: 2,
          hint: 'Think about how they had waited years for this song.' },
      ],
    },
    {
      title: 'A Bridge That Would Not Melt',
      passage: `Cloud Skip had a problem. Her cloud bridge to the Fire zone kept melting into steam whenever it got close to the hot air. So she flew to the Magma Forge to ask Emberwarden Cinda for advice.

Cinda listened carefully. Then she led Cloud to a workshop where Fire ponies were making glass. "Glass starts as sand," Cinda said. "When we heat it, it turns into something new that the heat cannot hurt anymore."

Cloud's eyes went wide. She flew home, gathered a heap of clouds and asked Fire ponies to blow their warm breath across it, just a little at a time. Slowly, the clouds began to change. They grew thicker and firmer, like soft white stone.

Two months later, a sturdy bridge stretched from Cloudperch all the way to Ashfall Camp. On its railing, Cloud carved a small flame next to a small cloud.`,
      questions: [
        { type: 'inference', question: 'What gave Cloud the idea for her new bridge?',
          choices: ['Watching Fire ponies swim in the hot springs at camp', 'Seeing the bridge in Brindlewood', 'A book in the Spire library', 'Learning how heat turns sand into glass'], correctIndex: 3,
          hint: 'Think about what Cinda showed her in the workshop.' },
        { type: 'inference', question: 'Why did Cloud carve a flame next to a cloud?',
          choices: ['To show the Air and Fire zones built it together', 'She thought a flame and a cloud looked pretty side by side', 'Cinda asked her to do it', 'To warn travelers about the heat'], correctIndex: 0,
          hint: 'Think about who helped make the bridge possible.' },
      ],
    },
    {
      title: 'A Hoarse Whistle',
      passage: `Wind Whistle woke up one morning with a sore throat. When she tried to whistle, only a rough, scratchy sound came out. Her voice was so hoarse that she could barely speak above a whisper.

This was a serious problem. That afternoon, the Air ponies were supposed to fly a group of young Earth ponies across Windwhistle Pass. Wind Whistle's job was to calm the strong winds in the pass with her whistle.

Galehoof suggested they wait until she felt better. But the young Earth ponies had traveled a long way, and they were eager to see Cloudperch.

Wind Whistle thought for a moment. Then she flew to the kitchen and came back with a big pot of honey tea. She drank three cups, rested her voice all morning and did not say a single word to anyone.

By afternoon, her whistle was soft but steady. The trip across the pass was smooth.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "hoarse" mean?',
          choices: ['Loud and clear', 'Very high and squeaky', 'Rough and scratchy', 'Silent'], correctIndex: 2,
          hint: 'Look at how her whistle sounded in the first paragraph.' },
        { type: 'inference', question: 'Why did Wind Whistle not say a word all morning?',
          choices: ['She was angry at Galehoof', 'She was saving her voice for the trip', 'The Earth ponies were asleep', 'She did not know what to say to the Earth ponies'], correctIndex: 1,
          hint: 'Think about what she needed her voice for that afternoon.' },
      ],
    },
    {
      title: 'Galehoof Learns to Land',
      passage: `Galehoof is the fastest flyer in the Air zone, but his landings are famous for the wrong reason. He comes down so hard that the clouds shake. Young ponies scatter whenever they see him approaching.

One day, Galehoof quietly asked Feather Float for help. Feather was surprised. The great Galehoof, asking her for a lesson?

They practiced on an empty cloud far from the village, where no one could see. Feather showed him how to spread his wings wide and slow down long before reaching the ground. "You are trying to land the way you fly," she said. "Fast. But landing is about letting go of speed."

It took Galehoof three weeks of practice. Then, one morning, he glided down into the center of Cloudperch and touched the ground with barely a sound. The young ponies stared in amazement. Galehoof looked over at Feather and gave her a small nod.`,
      questions: [
        { type: 'inference', question: 'Why did they practice on an empty cloud far from the village?',
          choices: ['The village clouds were too small', 'Galehoof did not want to be seen', 'Feather Float lives there', 'There was more wind there for practice'], correctIndex: 1,
          hint: 'Think about how famous Galehoof is.' },
        { type: 'inference', question: 'What did Galehoof\'s nod to Feather mean?',
          choices: ['He wanted another lesson', 'He was telling her to leave', 'He was challenging her to a race', 'He was thanking her'], correctIndex: 3,
          hint: 'Think about what she had just helped him do.' },
      ],
    },
    {
      title: 'The Message That Went Astray',
      passage: `Gust Dancer sends messages in tiny whirlwinds, and they almost always arrive at the right door. But last week, one went astray.

The message was an invitation to Breezy Lark's party. Gust wrote, "Come to the party at sunset!" Then she spun a little wind around it and sent it to Cloud Skip's house. But a sudden gust from the north caught the whirlwind and blew it far off course.

The message landed on a sleepy owl's nest in Whisperwood, in the Spirit zone. The owl, whose name was Hoot, read it carefully. Then he fluffed his feathers, smoothed them down and flew all the way to Cloudperch.

At sunset, Breezy opened her door to find Cloud Skip and a very proud owl standing side by side. Breezy laughed and invited him in. Hoot stayed until midnight and ate four slices of cake.`,
      questions: [
        { type: 'wordMeaning', question: 'In this story, what does "astray" mean?',
          choices: ['Off the right path', 'Very fast', 'Upside down', 'Exactly on time, as usual'], correctIndex: 0,
          hint: 'A gust blew it far off course.' },
        { type: 'inference', question: 'Why did Hoot fly all the way to Cloudperch?',
          choices: ['He was lost in the storm', 'He wanted to return the note to Gust Dancer', 'He thought the invitation was for him', 'He was looking for a new nest'], correctIndex: 2,
          hint: 'Think about where the message landed and what it said.' },
      ],
    },
    {
      title: 'Where Clouds Come From',
      passage: `The ponies of Cloudperch live on clouds, so young ones often ask where clouds come from. The answer begins with water.

When the sun warms a lake, a river or the sea, some of the water turns into an invisible gas called water vapor. Warm air carries the vapor upward. The higher it rises, the colder the air becomes.

High in the sky, the cold makes the vapor condense. That means it changes back into tiny droplets of liquid water. Each droplet is far too small to see by itself. But when billions of them gather together, they become a cloud.

If the droplets keep bumping into each other, they join and grow heavier. Eventually they are too heavy to float, and they fall as rain. The rain fills the lakes and rivers again, and the whole process starts over.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['Why Cloudperch is built on clouds', 'How warm air rises above lakes and rivers', 'Why young ponies ask questions', 'How clouds form and turn into rain'], correctIndex: 3,
          hint: 'Think about the question at the start and how the passage answers it.' },
        { type: 'wordMeaning', question: 'In this passage, what does "condense" mean?',
          choices: ['To change from gas into liquid', 'To float higher and higher in the sky', 'To get warmer', 'To disappear'], correctIndex: 0,
          hint: 'The passage explains the word in the next sentence.' },
      ],
    },
    {
      title: 'The Sky Chamber',
      passage: `At the very top of Galecrest Spire is the Sky Chamber, where Skywarden Zephyra battles trainers for the Air badge. The chamber is round and open to the sky on every side, with no walls at all, only tall white pillars holding up the roof.

Battling there is not like battling anywhere else. The wind blows through the chamber constantly, and it changes direction without warning. Zephyra's Air ponies know how to ride the wind. They use it to speed up their attacks and to dodge at the last moment.

Trainers from other zones often struggle at first. Their ponies are pushed off balance, and their attacks get blown off course. The trainers who win are usually the ones who stop fighting the wind. They pay attention to its pattern and wait for the calm moments between gusts.

Zephyra says the wind is the real test.`,
      questions: [
        { type: 'mainIdea', question: 'What is the main idea of this passage?',
          choices: ['Zephyra\'s ponies are faster than any others in the realm', 'The Sky Chamber has white pillars', 'The wind makes battles in the Sky Chamber hard', 'Trainers from other zones always lose'], correctIndex: 2,
          hint: 'Think about what most of the passage explains.' },
        { type: 'inference', question: 'What does Zephyra mean when she says the wind is the real test?',
          choices: ['She wants trainers to battle the wind instead of her', 'Winning depends on handling the wind', 'The wind is stronger than her ponies', 'She likes the wind more than battling'], correctIndex: 1,
          hint: 'Think about what the winning trainers learn to do.' },
      ],
    },
    {
      title: 'Grounded',
      passage: `Galehoof flies every single day, rain or shine. So when he hurt his wing in a fall, the healer's orders were hard to hear. "No flying for two weeks," she said.

The first few days were miserable. Galehoof sat at his window and watched the other ponies zoom past. He barely ate. He did not want visitors.

On the fourth day, Feather Float knocked on his door with a stack of books. "I thought you might like to read about the great flyers of the past," she said. Galehoof sighed, but he opened the top book.

He did not look up until dinner. That night, he asked Feather if she had any more. By the end of two weeks, he had read every book about flying in the Spire library. When his wing healed, he tried a turn from one of the books. It worked perfectly.`,
      questions: [
        { type: 'inference', question: 'How did Galehoof feel during the first few days?',
          choices: ['Relieved to rest', 'Unhappy and left out', 'Excited to read all day long', 'Proud of himself'], correctIndex: 1,
          hint: 'Look at how he spent those days.' },
        { type: 'inference', question: 'What changed for Galehoof after Feather\'s visit?',
          choices: ['He decided to stop flying forever and stay home', 'His wing healed right away', 'He became a healer', 'He found a new way to enjoy flying'], correctIndex: 3,
          hint: 'Think about what he did with the books.' },
      ],
    },
    {
      title: 'The Storm Watcher',
      passage: `High on the east side of Galecrest Spire, a small round window looks out over the whole sky. Every day, an old Air pony named Nimbus sits there with a spyglass and a notebook. Nimbus is the Spire's storm watcher.

Nimbus studies the clouds all day long. Flat, gray sheets often mean steady rain. Tall, puffy clouds that grow taller in the afternoon can mean thunder. Thin, wispy clouds high in the sky may mean the weather will change within a day or two.

When Nimbus sees a storm coming, she rings a silver bell. Its sound carries through every floor of the Spire. Ponies who are out flying hurry home, and those who are home close their shutters.

Last month, the bell rang on a bright, sunny morning. Several young ponies laughed and kept playing outside. By lunch, they were soaked and shivering.`,
      questions: [
        { type: 'inference', question: 'Why did the young ponies get soaked last month?',
          choices: ['They ignored the warning', 'The bell was broken', 'Nimbus rang the bell too late', 'They were swimming'], correctIndex: 0,
          hint: 'Think about what they did when they heard the bell.' },
        { type: 'recall', question: 'What can tall, puffy clouds that grow taller mean?',
          choices: ['Steady rain', 'A change within two days', 'Thunder', 'Clear skies'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Travelers in the Sky',
      passage: `Every autumn, huge flocks of birds pass over the Air zone on their long journey south. Every spring, they return north again. This yearly journey is called migration.

Birds migrate to find food and warm weather. In winter, the northern lands become cold and snowy, and food is hard to find. So the birds fly south, where it stays warm. When spring arrives, they fly back north to build nests and raise their chicks.

Some birds fly for weeks without stopping for long. They need places to rest along the way. Galecrest Spire is one of their favorite stops. Air ponies leave out bowls of seeds and water on the Spire's balconies, and thousands of birds land to rest and eat.

The Air ponies love this time of year. The whole Spire fills with feathers and birdsong.`,
      questions: [
        { type: 'mainIdea', question: 'What is this passage mostly about?',
          choices: ['How Air ponies make bird feeders out of seeds and bowls', 'Which birds sing the loudest', 'How to build a nest', 'Why birds migrate and how the Spire helps them'], correctIndex: 3,
          hint: 'Think about the big idea of all the paragraphs together.' },
        { type: 'inference', question: 'Why is the Spire a favorite stop for the birds?',
          choices: ['The ponies give them food, water and rest', 'It is the warmest place in the realm', 'It is where they build nests', 'It is at the end of their trip'], correctIndex: 0,
          hint: 'Think about what the Air ponies leave on the balconies.' },
      ],
    },
    {
      title: 'A View from the Top',
      passage: `Pip was a young Air pony who had a secret. Even though he had wings, he was afraid of heights. While his friends flew between the clouds of Cloudperch, Pip stayed close to the ground and pretended he was busy.

Cloud Skip noticed. One afternoon, she asked Pip to help her test a new cloud bridge. It was only a few hooves above the ground. "Just walk across," she said. Pip did.

The next day, she built a bridge a little higher. Then a little higher the day after that. Each time, Cloud walked beside him, talking about clouds and pointing out birds.

After a month, they stood together on a bridge high above the village. Pip looked down. His legs did not shake. Then he looked out at the endless sky, opened his wings and flew a small, careful circle. Cloud cheered louder than anyone.`,
      questions: [
        { type: 'inference', question: 'Why did Cloud build each bridge a little higher?',
          choices: ['She was running out of low clouds', 'To test how strong her bridges were', 'To help Pip get used to heights slowly', 'Because Pip asked her to'], correctIndex: 2,
          hint: 'Think about what Pip was afraid of.' },
        { type: 'inference', question: 'Why did Pip pretend to be busy at the start?',
          choices: ['He did not like his friends', 'He was hiding his fear', 'He had too many chores', 'He was building a bridge'], correctIndex: 1,
          hint: 'Read the first paragraph again.' },
      ],
    },
    {
      title: 'The Kite Festival',
      passage: `Every summer, Cloudperch holds a kite festival. But kites in the Air zone are not like kites anywhere else. Air ponies build them from silk and feathers, and they fly them from the tops of clouds instead of from the ground.

The trickiest part of the festival is the wind. In Cloudperch, a sudden gust can come from any direction. A strong gust can snap a kite string or send a kite spinning into the clouds.

Gust Dancer, who was named for her love of strong winds, always wins the prize for the highest kite. Her secret is that she does not fight the gusts. When one comes, she lets out more string and allows the kite to rise with it. Then she slowly reels it back in.

This year, her kite flew so high that it disappeared completely. She had to send a whirlwind up to bring it back.`,
      questions: [
        { type: 'wordMeaning', question: 'In this passage, what does "gust" mean?',
          choices: ['A kind of kite string', 'A short, strong rush of wind', 'A thick gray cloud', 'A feather'], correctIndex: 1,
          hint: 'It can snap a kite string or send a kite spinning.' },
        { type: 'inference', question: 'Why does Gust Dancer let out more string during a gust?',
          choices: ['She wants the kite to fall', 'Her string is too short', 'She is tired of holding it', 'To let the wind lift the kite higher'], correctIndex: 3,
          hint: 'Think about her secret for winning.' },
      ],
    },
    {
      title: 'Wind Whistle\'s Apprentice',
      passage: `Wind Whistle has calmed the winds of Windwhistle Pass for many years. Recently, she began to think about who would take over someday. So she chose an apprentice, a young pony named Zuri who had a strong, clear whistle.

At first, Zuri was impatient. She wanted to start calming storms right away. But Wind Whistle had her spend the first month doing nothing but listening. Zuri sat at the pass from dawn to dusk, learning how the wind sounded in every kind of weather.

"This is boring," Zuri grumbled.

"You cannot calm the wind if you do not understand it," Wind Whistle replied.

During the second month, a fierce storm blew through the pass. Wind Whistle was away visiting the Fire zone. Zuri listened to the wind, chose the perfect note and whistled. Slowly, the storm calmed. When Wind Whistle returned and heard the news, she simply smiled.`,
      questions: [
        { type: 'inference', question: 'Why was Zuri able to calm the storm by herself?',
          choices: ['Her month of listening taught her the wind', 'The storm was very small', 'Another pony helped her', 'She read about it in a book'], correctIndex: 0,
          hint: 'Think about what Wind Whistle made her do first.' },
        { type: 'wordMeaning', question: 'In this story, what does "apprentice" mean?',
          choices: ['A strong storm', 'A guardian of a zone', 'A person learning a skill from an expert', 'A whistle'], correctIndex: 2,
          hint: 'Wind Whistle chose Zuri to learn her job and take over someday.' },
      ],
    },
    {
      title: 'The Feather Market',
      passage: `Once a month, Feather Float sets up a stall at the market in Cloudperch. She trades feathers from her huge collection. Ponies use them to decorate hats, stuff pillows and build kites.

One morning, a small foal came up to the stall holding a single coin. She pointed at a long, shimmering parrot feather, the most beautiful one on the table. "Is that enough?" she asked hopefully.

The feather was worth much more than one coin. Feather Float looked at the foal, then at the coin. She asked what the feather was for.

"My grandma is sick," the foal explained. "She used to fly every day. I want to give her something that reminds her of the sky."

Feather Float wrapped the parrot feather in soft cloth. She took the coin, then quietly slipped it back into the foal's bag when she was not looking.`,
      questions: [
        { type: 'inference', question: 'What does Feather Float\'s choice show about her?',
          choices: ['She is careless with money', 'She did not like that feather', 'She wanted the foal to leave', 'She is kind and generous'], correctIndex: 3,
          hint: 'Think about what she did with the coin.' },
        { type: 'inference', question: 'Why did the foal want that feather?',
          choices: ['To remind her grandmother of flying', 'To decorate her own hat', 'To build a kite for herself', 'To start her own collection'], correctIndex: 0,
          hint: 'Read what the foal explains.' },
      ],
    },
  ],
  6: [],
}
