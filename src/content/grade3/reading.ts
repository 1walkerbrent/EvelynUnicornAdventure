// Grade 3 reading (DESIGN.md §23): 15 passages per zone, 80–120 words,
// short sentences. Zones 1–2 ask recall, 3–4 two similar facts, 5–6 inference.
import type { ZoneReading } from '../gradeTypes'

export const GRADE3_READING: ZoneReading = {
  // ── Zone 1: Brindlewood Home, Sunflower Hollow, the Proving Glade ──────────
  1: [
    {
      title: 'Dew at Sunrise',
      passage: `Clover Dewdrop lives at Brindlewood Home, in a little barn with a green door. Every morning she wakes up before the sun. She trots out to the meadow and rolls in the wet grass. The dew makes her coat sparkle like tiny glass beads.

After her roll, Clover eats breakfast with her friend Tangerine Twirl. They share a bowl of oats and two red apples. Then they walk to Sunflower Hollow to say hello to the bees.

"Why do you get up so early?" Tangerine asks.

"Because the dew is gone by noon," Clover says. "Sunrise is the only time everything sparkles."`,
      questions: [
        { type: 'recall', question: 'What do Clover and Tangerine eat for breakfast?',
          choices: ['Honey cakes and warm milk', 'Carrots and clover leaves', 'Sunflower seeds', 'Oats and two red apples'], correctIndex: 3,
          hint: 'Look in the part about breakfast.' },
        { type: 'recall', question: 'Why does Clover get up before the sun?',
          choices: ['Tangerine always wakes her up early', 'Her barn gets too cold', 'She wants to see the dew sparkle', 'She has to feed the bees'], correctIndex: 2,
          hint: 'Clover answers this herself at the end.' },
      ],
    },
    {
      title: 'The Spinning Pony',
      passage: `Tangerine Twirl can spin faster than any pony in Brindlewood. She spins so fast that her orange mane looks like a ring of fire.

Tangerine practices every day after lunch. She picks a flat spot in the Proving Glade, far from the big oak tree. Then she counts to three and starts to turn. At first she spins slowly. Then she goes faster and faster.

Yesterday she spun twenty times in a row. When she stopped, the whole glade seemed to wobble. She had to sit down in the grass until it stood still again.`,
      questions: [
        { type: 'recall', question: 'When does Tangerine practice spinning?',
          choices: ['Before breakfast', 'After lunch', 'At bedtime'], correctIndex: 1,
          hint: 'Find the word "practices".' },
        { type: 'recall', question: 'How many times did Tangerine spin yesterday?',
          choices: ['Three', 'Ten', 'Twelve', 'Twenty'], correctIndex: 3,
          hint: 'Look at the last paragraph.' },
      ],
    },
    {
      title: 'Under the Oak',
      passage: `A giant oak tree stands in the middle of the Proving Glade. Its trunk is so wide that five ponies can hide behind it. Its leaves are thick and dark green.

One afternoon, gray clouds rolled over Brindlewood. Big raindrops began to fall. Clover, Tangerine and Meadow Bloom were playing tag in the glade.

"Quick, to the oak!" Meadow called.

The three friends ran under the branches. The rain drummed on the leaves above them, but not one drop reached their backs. They stayed under the tree and told stories until the sun came out again.`,
      questions: [
        { type: 'recall', question: 'What were the friends doing when the rain began?',
          choices: ['Telling stories', 'Eating lunch', 'Playing tag', 'Picking flowers'], correctIndex: 2,
          hint: 'Look just before Meadow calls out.' },
        { type: 'recall', question: 'How many ponies can hide behind the oak\'s trunk?',
          choices: ['Five', 'Two', 'Eight'], correctIndex: 0,
          hint: 'The first paragraph tells how wide the trunk is.' },
      ],
    },
    {
      title: 'Marina\'s Shells',
      passage: `Marina Mist keeps a basket of seashells by her bed. Her grandmother brought them from the faraway sea. Marina has twelve shells, and she knows each one by heart.

Some shells are round and smooth. Some are long and pointy, like tiny horns. Her favorite is shaped like a heart. It is pink on the inside and white on the outside.

When Marina holds a shell to her ear, she hears a soft whoosh. Her grandmother says it is the sound of the waves. Marina hopes to see those waves for herself one day.`,
      questions: [
        { type: 'recall', question: 'What shape is Marina\'s favorite shell?',
          choices: ['A star', 'A heart', 'A horn', 'A circle'], correctIndex: 1,
          hint: 'Find the word "favorite".' },
        { type: 'recall', question: 'Who brought the shells from the sea?',
          choices: ['Marina\'s grandmother', 'Marina\'s best friend', 'A traveling pony'], correctIndex: 0,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Ember\'s Stories',
      passage: `Ember Spark tells the best stories in Brindlewood. Every Friday night, the young ponies gather around her campfire to listen.

Ember knows seven stories by heart. One is about a dragon who was afraid of the dark. One is about a river that flowed uphill. The young ponies love the dragon story most of all. They always ask for it last.

Ember never reads from a book. She looks into the fire and speaks slowly. Her voice gets very quiet at the scary parts, and the young ponies lean in close to hear.`,
      questions: [
        { type: 'recall', question: 'How many stories does Ember know by heart?',
          choices: ['Five', 'Six', 'Seven', 'Eight'], correctIndex: 2,
          hint: 'Look in the second paragraph.' },
        { type: 'recall', question: 'Which story do the young ponies love most?',
          choices: ['The dragon who was afraid of the dark', 'The river that flowed uphill', 'The pony who flew all the way to the moon', 'The lost campfire'], correctIndex: 0,
          hint: 'Find the words "most of all".' },
      ],
    },
    {
      title: 'Sky Dancer\'s Nest',
      passage: `Sky Dancer is a pony who loves high places. She sleeps in a nest at the very top of a tall pine tree near Brindlewood Home.

Sky built the nest herself. She used soft feathers that birds had dropped and fluffy bits of cloud she found in the morning mist. It took her a whole week.

From her nest, Sky can see all of Sunflower Hollow. She can see the Proving Glade and the big oak too. Each night she watches the sun go down. Then she curls up in the feathers and falls asleep.`,
      questions: [
        { type: 'recall', question: 'What did Sky Dancer use to build her nest?',
          choices: ['Straw, twigs and pine needles', 'Flower petals', 'Feathers and bits of cloud', 'Leaves and mud'], correctIndex: 2,
          hint: 'Look in the second paragraph.' },
        { type: 'recall', question: 'How long did it take Sky to build the nest?',
          choices: ['One day', 'A whole week', 'A whole month'], correctIndex: 1,
          hint: 'Find the word "took".' },
      ],
    },
    {
      title: 'Counting Stars',
      passage: `Stella Dream takes a walk every night before bed. She goes to the top of the hill behind Brindlewood Home. There she lies on her back in the cool grass.

Stella likes to count the stars. Last night she counted all the way to one hundred! Then a cloud drifted by and covered half of them. She had to start over.

Stella's mother says nobody can count every star in the sky. Stella says she will keep trying anyway. She brings a little blanket now, so she can stay out longer.`,
      questions: [
        { type: 'recall', question: 'Where does Stella go to count stars?',
          choices: ['The Proving Glade', 'Sunflower Hollow', 'The roof of her barn', 'The top of the hill'], correctIndex: 3,
          hint: 'Look in the first paragraph.' },
        { type: 'recall', question: 'Why did Stella have to start counting over?',
          choices: ['She fell asleep', 'Her mother called her home', 'A cloud covered some stars', 'She lost her blanket'], correctIndex: 2,
          hint: 'Read what happened after she reached one hundred.' },
      ],
    },
    {
      title: 'Meadow\'s Garden',
      passage: `Meadow Bloom has the biggest garden in Brindlewood. She grows carrots, beans and tall yellow corn. In the sunniest corner, she grows strawberries.

The strawberries are her favorite. Every morning she checks them to see which ones are ready. A ready strawberry is bright red all over.

Meadow never picks more than she needs. She leaves some berries for the birds and some for the rabbits. "A garden is for sharing," she says. Then she fills a small basket and takes it to her friends at the Proving Glade.`,
      questions: [
        { type: 'recall', question: 'What does Meadow grow in the sunniest corner?',
          choices: ['Carrots', 'Tall yellow corn', 'Beans', 'Strawberries'], correctIndex: 3,
          hint: 'Look at the end of the first paragraph.' },
        { type: 'recall', question: 'How can Meadow tell a strawberry is ready?',
          choices: ['It is bright red all over', 'It falls off the plant by itself', 'It smells sweet', 'It is very big'], correctIndex: 0,
          hint: 'Find the word "ready".' },
      ],
    },
    {
      title: 'Lucky Clovers',
      passage: `Most clovers have three leaves. Only a few have four. Clover Dewdrop likes to look for the lucky four-leaf ones.

She searches the field by the creek, one small patch at a time. She moves slowly and looks very carefully. It can take a whole morning to find just one.

So far, Clover has found twelve four-leaf clovers. She presses each one inside a big book so it stays flat. When a friend feels sad, Clover gives them one of her clovers. She says the luck is better when it is shared.`,
      questions: [
        { type: 'recall', question: 'How many four-leaf clovers has Clover found?',
          choices: ['Four', 'Ten', 'Twelve', 'Twenty'], correctIndex: 2,
          hint: 'Find the words "So far".' },
        { type: 'recall', question: 'What does Clover do when a friend feels sad?',
          choices: ['She sings a song', 'She gives them a clover', 'She takes them to the creek', 'She reads them a book'], correctIndex: 1,
          hint: 'Look near the end.' },
      ],
    },
    {
      title: 'Ribbons for the Fair',
      passage: `The Sunflower Fair was one day away. Tangerine Twirl wanted to look her best.

She opened her ribbon box. Inside were ribbons of every color. There were green ones, blue ones and pink ones with white dots. At the very bottom, she found two golden ribbons.

"These are perfect," Tangerine said. "They will shine like the sunflowers."

She asked her friend Meadow Bloom to help. Meadow tied one golden ribbon in Tangerine's mane and one in her tail. When Tangerine spun around, the ribbons flashed in the sunlight.`,
      questions: [
        { type: 'recall', question: 'Which ribbons did Tangerine pick for the fair?',
          choices: ['Green ones', 'Pink ones with dots', 'Golden ones'], correctIndex: 2,
          hint: 'Find what she said was "perfect".' },
        { type: 'recall', question: 'Who helped Tangerine tie the ribbons?',
          choices: ['Clover Dewdrop', 'Ember Spark', 'Her mother', 'Meadow Bloom'], correctIndex: 3,
          hint: 'Look in the last paragraph.' },
      ],
    },
    {
      title: 'A Field of Sunflowers',
      passage: `Sunflower Hollow is a wide field just east of Brindlewood Home. In summer, it is full of sunflowers. Some are taller than a grown pony!

Sunflowers have a special trick. In the morning, their big yellow faces turn toward the east, where the sun comes up. As the day goes on, they slowly turn to follow it.

Bees love Sunflower Hollow. They buzz from flower to flower all day long. In the fall, the flowers dry out and drop their seeds. The ponies gather the seeds and save them to plant next spring.`,
      questions: [
        { type: 'recall', question: 'Which way do the sunflowers face in the morning?',
          choices: ['North', 'South', 'East', 'West'], correctIndex: 2,
          hint: 'Find where the sun comes up.' },
        { type: 'recall', question: 'What do the ponies do with the seeds?',
          choices: ['Save them to plant next spring', 'Eat them for lunch', 'Give them all to the bees in the hollow', 'Throw them in the creek'], correctIndex: 0,
          hint: 'Look at the last sentence.' },
      ],
    },
    {
      title: 'Marina\'s Song',
      passage: `Marina Mist loves to sing. Every evening she stands on the little bridge over the creek and sings to the water.

Her favorite song is about the sea. It tells of waves that roll onto the sand and seagulls that call in the wind. Marina has never seen the sea. She learned the song from her grandmother.

The frogs in the creek seem to like it too. When Marina sings, they stop croaking and listen. When she finishes, they start croaking again, louder than before. Marina likes to think they are clapping.`,
      questions: [
        { type: 'recall', question: 'Where does Marina stand when she sings?',
          choices: ['On the little bridge', 'Under the oak tree', 'In Sunflower Hollow', 'On top of the tall hill'], correctIndex: 0,
          hint: 'Look in the first paragraph.' },
        { type: 'recall', question: 'What do the frogs do while Marina sings?',
          choices: ['They croak along with her', 'They jump away', 'They stop and listen', 'They fall asleep'], correctIndex: 2,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Ember\'s Wagon',
      passage: `Ember Spark pulls a little red wagon wherever she goes. Its wheels squeak, so everyone hears her coming.

Today her wagon is full of berries and flowers. She picked them in the woods this morning. The berries are for Meadow Bloom, who wants to make a pie. The flowers are for Stella Dream, who is sick in bed.

Ember stops at Stella's barn first. She sets the flowers in a jar of water by the window. Stella smiles for the first time all day. Then Ember squeaks off down the road to Meadow's house.`,
      questions: [
        { type: 'recall', question: 'Who are the flowers for?',
          choices: ['Meadow Bloom', 'Stella Dream', 'Ember\'s mother'], correctIndex: 1,
          hint: 'Read the second paragraph again.' },
        { type: 'recall', question: 'What does Meadow want to make with the berries?',
          choices: ['Jam', 'A pie', 'Juice', 'Muffins'], correctIndex: 1,
          hint: 'Find the sentence about Meadow Bloom.' },
      ],
    },
    {
      title: 'Blossom Day',
      passage: `Every spring, Brindlewood Home has a party called Blossom Day. It is the day the first apple blossoms open.

All the ponies help get ready. Some sweep the paths. Some hang paper lanterns in the trees. Clover and Tangerine have the best job. They pick wildflowers and weave them into flower crowns.

At noon, every pony gets a crown to wear. Then they dance in a big circle around the oak tree in the Proving Glade. The party ends at sunset, when the lanterns are lit and everyone sings the Blossom Song.`,
      questions: [
        { type: 'recall', question: 'What do Clover and Tangerine make on Blossom Day?',
          choices: ['Paper lanterns', 'Apple pies', 'Flower crowns', 'Blossom cakes'], correctIndex: 2,
          hint: 'Find the words "best job".' },
        { type: 'recall', question: 'When does the party end?',
          choices: ['At noon', 'At midnight', 'At sunrise', 'At sunset'], correctIndex: 3,
          hint: 'Look at the last sentence.' },
      ],
    },
    {
      title: 'The Triple Loop',
      passage: `Sky Dancer has been practicing a new trick. It is called the triple loop. She flies up high, then swoops around in a circle three times without stopping.

The first time she tried it, she got dizzy after two loops. She landed in a pile of hay. The second time, she did all three loops but forgot to slow down. She landed in Meadow's bean patch.

Today, Sky tried again. She flew three perfect loops and landed softly on her hooves. All her friends in the Proving Glade cheered.`,
      questions: [
        { type: 'recall', question: 'Where did Sky land the first time she tried?',
          choices: ['In the bean patch', 'In a pile of hay', 'In the creek', 'On her hooves'], correctIndex: 1,
          hint: 'Read the second paragraph slowly.' },
        { type: 'recall', question: 'How many loops are in Sky\'s new trick?',
          choices: ['Three', 'Two', 'Seven'], correctIndex: 0,
          hint: 'The name of the trick tells you.' },
      ],
    },
  ],
  // ── Zone 2 (Earth): Pebblebrook, Mossgrove, Granite Hall ───────────────────
  2: [
    {
      title: 'Acorn\'s Rock Box',
      passage: `Acorn Sprout collects rocks. She keeps them in a wooden box under her window in Pebblebrook. Right now she has twenty-three rocks. Her little brother is not allowed to touch them.

Most of them came from the bottom of the stream. Some are smooth and gray. Some are rough and brown. One sparkles when the sun hits it.

Her favorite rock has white stripes around it, like a tiny striped egg. She found it on her birthday, when the water was very low.

Every night before bed, Acorn opens the box. She picks up each rock and says its name. Yes, every rock has a name!`,
      questions: [
        { type: 'recall', question: 'How many rocks does Acorn have right now?',
          choices: ['Thirteen', 'Twenty', 'Twenty-three', 'Thirty-three'], correctIndex: 2,
          hint: 'Look in the first paragraph.' },
        { type: 'recall', question: 'When did Acorn find her striped rock?',
          choices: ['On her birthday', 'During a big storm', 'On the first day of school', 'Last winter'], correctIndex: 0,
          hint: 'Find the words "white stripes".' },
      ],
    },
    {
      title: 'Fern in the Ferns',
      passage: `Fern Whisper lives in Mossgrove, where giant ferns grow taller than a pony. Her coat is the same soft green as their leaves.

Fern talks to the ferns every morning. She tells them about the weather and asks how they slept. She says ferns are the friendliest plants in the forest. She thinks they like to listen.

Because of her green coat, Fern is hard to see. Last week a rabbit hopped right past her without noticing. Even her friends sometimes walk by her. "Oh!" they say. "I thought you were a bush!"`,
      questions: [
        { type: 'recall', question: 'What color is Fern Whisper\'s coat?',
          choices: ['Bright yellow', 'Soft green', 'Dark brown'], correctIndex: 1,
          hint: 'Look at the end of the first paragraph.' },
        { type: 'recall', question: 'What do Fern\'s friends sometimes think she is?',
          choices: ['A rabbit', 'A big rock', 'A tree stump', 'A bush'], correctIndex: 3,
          hint: 'Read what her friends say at the end.' },
      ],
    },
    {
      title: 'The Big Push',
      passage: `One morning, a huge boulder rolled down the hill. It stopped right in the middle of the path to Granite Hall. No pony could get past. The ponies on the other side had to wait.

Boulderhoof is the strongest pony in the Earth zone. He walked up to the boulder and looked at it. It was twice as big as he was.

He put his shoulder against the rock and pushed. Nothing happened. He pushed again, harder. The boulder slowly began to roll.

It took him all morning to move it off the path. When he finished, his friends brought him a big bucket of cool water.`,
      questions: [
        { type: 'recall', question: 'Where did the boulder stop?',
          choices: ['In the stream', 'On the path to Granite Hall', 'In front of Boulderhoof\'s barn', 'At the bottom of the hill'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
        { type: 'recall', question: 'What did his friends bring Boulderhoof?',
          choices: ['A basket of apples', 'A warm blanket', 'A bucket of water', 'A shiny medal'], correctIndex: 2,
          hint: 'Read the very last sentence.' },
      ],
    },
    {
      title: 'Painted Stones',
      passage: `Daisy Dapple is an artist. She does not paint on paper. She paints on flat stones that she finds in Pebblebrook. She keeps her paints in little clay pots.

Daisy has painted flowers, frogs and even a rainbow. But her favorite thing to paint is butterflies. She paints their wings in orange, purple and blue. Each one takes her a whole afternoon.

When a stone is dry, Daisy gives it away. She leaves them in places where ponies will find them, like on a fence post or beside a door. Finding a painted stone always makes a pony smile.`,
      questions: [
        { type: 'recall', question: 'What does Daisy paint on?',
          choices: ['Paper', 'Pieces of tree bark', 'Flat stones', 'Old boards'], correctIndex: 2,
          hint: 'The first paragraph tells you.' },
        { type: 'recall', question: 'What is Daisy\'s favorite thing to paint?',
          choices: ['Butterflies', 'Rainbows', 'Green frogs', 'Flowers'], correctIndex: 0,
          hint: 'Find the word "favorite".' },
      ],
    },
    {
      title: 'The Hardest Thing to Make',
      passage: `Clay Canter makes pots in a little shop near Granite Hall. She digs wet clay from the riverbank and shapes it with her hooves.

Bowls are easy for Clay. Plates are easy too. But cups are very hard to make. The tricky part is the handle. If it is too thin, it snaps off. If it is too thick, the cup tips over.

Clay made six cups that broke before she got one right. Now that cup sits on the shelf above her door. She drinks her tea from it every morning. It is the best cup she has ever made.`,
      questions: [
        { type: 'recall', question: 'What is the hardest thing for Clay to make?',
          choices: ['Bowls', 'Plates', 'Vases', 'Cups'], correctIndex: 3,
          hint: 'Find the words "very hard".' },
        { type: 'recall', question: 'Where does Clay get her clay?',
          choices: ['From the riverbank', 'From Granite Hall', 'From a shop in town', 'From under her barn'], correctIndex: 0,
          hint: 'Look at the second sentence.' },
      ],
    },
    {
      title: 'Hide-and-Seek Champion',
      passage: `Mossy Tussock is the best hide-and-seek player in Mossgrove. Before every game, she rolls in a patch of thick moss. Then she lies very still on the forest floor. She looks just like a mossy log.

Once, Mossy stayed hidden for two whole hours. Her friends looked under bushes and behind trees. They even looked in the stream.

In the end, they only found her because she sneezed. A bit of moss had tickled her nose!

"Next time," Mossy said, "I will use less moss."`,
      questions: [
        { type: 'recall', question: 'How long did Mossy stay hidden that time?',
          choices: ['Ten minutes', 'Two whole hours', 'One whole afternoon'], correctIndex: 1,
          hint: 'Find the word "Once".' },
        { type: 'recall', question: 'How did her friends find Mossy?',
          choices: ['She laughed out loud', 'She called their names', 'She sneezed', 'She rolled over'], correctIndex: 2,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'The Glowing Walls',
      passage: `Granite Hall is a great hall carved inside a mountain. It is the home of Warden Bramblewood, the guardian of the Earth zone.

You might think a hall inside a mountain would be dark. But it is not. The walls are full of crystals. When a pony walks by, the crystals near them begin to glow. The light is soft and pale green.

Because of the crystals, the ponies of Granite Hall never need torches or lanterns. They just walk, and the walls light the way.`,
      questions: [
        { type: 'recall', question: 'What makes the light inside Granite Hall?',
          choices: ['Torches hung on the walls', 'Crystals in the walls', 'Windows in the roof', 'Glowing mushrooms'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'What color is the crystal light?',
          choices: ['Pale green', 'Bright red', 'Deep blue', 'Gold'], correctIndex: 0,
          hint: 'Find the word "light".' },
      ],
    },
    {
      title: 'Counting Ducks',
      passage: `Every morning after breakfast, Acorn Sprout takes a walk around the pond in Pebblebrook. She likes to count the ducks.

Most days there are eight ducks. They paddle in a line, one behind the other. The biggest duck always swims in front.

This morning, Acorn counted nine. She counted again to be sure. Yes, nine! At the very end of the line was a tiny, fuzzy duckling. It was paddling as fast as it could to keep up.

Acorn ran all the way home to tell her mother.`,
      questions: [
        { type: 'recall', question: 'How many ducks are there on most days?',
          choices: ['Six', 'Seven', 'Nine', 'Eight'], correctIndex: 3,
          hint: 'Look for "Most days".' },
        { type: 'recall', question: 'Which duck always swims in front?',
          choices: ['The tiny duckling', 'The biggest duck', 'The loudest duck'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Old Timber',
      passage: `In the middle of Mossgrove stands the oldest tree in the forest. The ponies call it Old Timber.

Nobody knows exactly how old it is. Old Timber is very wide. It takes five ponies standing nose to tail to reach all the way around it. Its bark is rough and covered in moss.

High up in the branches, a family of owls lives in a hollow. During the day, they sleep. At night, they hoot softly to each other.

The ponies of Mossgrove take good care of Old Timber. No pony is allowed to carve the bark or break the branches.`,
      questions: [
        { type: 'recall', question: 'How many ponies does it take to reach around Old Timber?',
          choices: ['Three', 'Four', 'Five', 'Ten'], correctIndex: 2,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'Who lives high up in Old Timber?',
          choices: ['A family of squirrels', 'A family of owls', 'A family of bats', 'A family of bees'], correctIndex: 1,
          hint: 'Look in the third paragraph.' },
      ],
    },
    {
      title: 'Tuesdays at the Creek',
      passage: `Daisy Dapple and Clay Canter are best friends. Every Tuesday, they meet at the creek behind Pebblebrook.

Each friend has a job. Clay digs up wet clay from the bank. Daisy looks for flat stones in the shallow water. Then they sit on the grass and trade.

Clay gives Daisy a lump of clay to make small statues. Daisy gives Clay a painted stone to put on her shop window.

When the sun gets low, they wash their hooves in the creek. Then they walk home together. They are always back in time for supper.`,
      questions: [
        { type: 'recall', question: 'On which day do Daisy and Clay meet?',
          choices: ['Monday', 'Tuesday', 'Friday', 'Wednesday'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
        { type: 'recall', question: 'What does Daisy give Clay?',
          choices: ['A lump of clay', 'A small statue', 'A painted stone', 'A bunch of flowers'], correctIndex: 2,
          hint: 'Read the third paragraph carefully.' },
      ],
    },
    {
      title: 'Boulderhoof Tiptoes',
      passage: `Boulderhoof is so big and heavy that the ground shakes when he walks. Pebbles hop up and down. Cups rattle on the shelves. Everyone in Pebblebrook knows when he is coming.

But there is one place where Boulderhoof walks very softly. That place is the nursery, where the baby ponies take their naps.

When he goes past the nursery, Boulderhoof lifts each hoof slowly. He sets it down as gently as a feather. Not one baby wakes up. Then, once he is past, he goes back to his normal stomping.`,
      questions: [
        { type: 'recall', question: 'Where does Boulderhoof walk very softly?',
          choices: ['Past the nursery', 'Inside Granite Hall', 'Across the bridge', 'Through the garden'], correctIndex: 0,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'What happens to the pebbles when he walks?',
          choices: ['They roll away', 'They hop up and down', 'They sink into the mud'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Feather Pillows',
      passage: `Mossy Tussock picks up every feather she finds. She finds them in the grass, on the paths and under the trees of Mossgrove.

When her basket is full, Mossy sews the feathers into soft pillows. Each pillow takes about one hundred feathers.

She gave her very first pillow to Fern Whisper. Fern had been sleeping on a pile of leaves, and they crunched all night long.

Now Fern sleeps very well. And Mossy is collecting feathers again. This time, the pillow will be for Acorn Sprout.`,
      questions: [
        { type: 'recall', question: 'Who got Mossy\'s very first pillow?',
          choices: ['Acorn Sprout', 'Daisy Dapple', 'Boulderhoof', 'Fern Whisper'], correctIndex: 3,
          hint: 'Find the words "very first".' },
        { type: 'recall', question: 'How many feathers go in one pillow?',
          choices: ['About ten', 'About fifty', 'About one hundred', 'About one thousand'], correctIndex: 2,
          hint: 'Look in the second paragraph.' },
      ],
    },
    {
      title: 'The Wishing Stones',
      passage: `Pebblebrook is named after the stream that runs through the village. The water is so clear that you can see all the way to the bottom.

The bottom of the stream is covered in pebbles. There are red ones, white ones and blue ones. When the sun shines, they look like a carpet of jewels.

The ponies of Pebblebrook have a custom. To make a wish, a pony stacks three pebbles on the bank. Each one goes on top of the last. If the stack does not fall over, the wish might come true.`,
      questions: [
        { type: 'recall', question: 'How many pebbles do you stack to make a wish?',
          choices: ['One', 'Two', 'Three', 'Seven'], correctIndex: 2,
          hint: 'Read the last paragraph.' },
        { type: 'recall', question: 'What do the pebbles look like when the sun shines?',
          choices: ['A carpet of jewels', 'A field of flowers', 'Drops of rain', 'Tiny stars'], correctIndex: 0,
          hint: 'Look at the end of the second paragraph.' },
      ],
    },
    {
      title: 'The Warden\'s Lantern',
      passage: `A green lantern hangs beside the great door of Granite Hall. It has been glowing since before any pony now living was born.

Warden Bramblewood takes care of the lantern. Every morning, he climbs a little ladder and polishes the glass until it shines. He never lets the light go out.

The lantern helps travelers. When a pony is lost in the hills at night, they look for the green glow. Then they know which way to go. Bramblewood says the lantern has guided hundreds of lost ponies home.`,
      questions: [
        { type: 'recall', question: 'What does Bramblewood do to the lantern every morning?',
          choices: ['Fills it up with oil', 'Polishes the glass', 'Paints it green', 'Moves it inside'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'Who does the lantern help?',
          choices: ['Baby ponies at naptime', 'Ponies digging for clay', 'Ponies lost in the hills', 'Owls hunting at night'], correctIndex: 2,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Rainy Day in Mossgrove',
      passage: `Most ponies stay inside when it rains. Fern Whisper does not. Rainy days are her favorite days of all.

When it rains in Mossgrove, the moss soaks up the water like a sponge. It gets thick, soft and bouncy. Fern loves to jump on it. Each jump makes a squishy sound.

The ferns love the rain too. They stretch out their leaves and turn a brighter green. Little frogs come out to sing.

When the rain stops, Fern shakes the water from her mane and goes home for a warm cup of tea.`,
      questions: [
        { type: 'recall', question: 'What does the moss do when it rains?',
          choices: ['It dries out', 'It soaks up the water', 'It turns brown', 'It washes away'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
        { type: 'recall', question: 'What does Fern do when the rain stops?',
          choices: ['She sings with the frogs', 'She jumps on the moss', 'She has a warm cup of tea', 'She takes a nap'], correctIndex: 2,
          hint: 'Read the last sentence.' },
      ],
    },
  ],
  3: [],
  4: [],
  5: [],
  6: [],
}
