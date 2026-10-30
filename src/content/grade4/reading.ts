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
  4: [],
  5: [],
  6: [],
}
