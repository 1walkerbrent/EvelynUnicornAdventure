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
  // ── Zone 3 (Water): Saltspray Cove, Mistreef, Coral Sanctum ───────────────
  3: [
    {
      title: 'Pink Bubbles, Blue Bubbles',
      passage: `Bubble Brook blows bubbles at the end of the dock in Saltspray Cove. She dips a ring of seaweed into the water and blows gently.

Bubble can make two colors. Her pink bubbles come out big and round, but they pop very quickly. Her blue bubbles are smaller. They float much higher, and they last the longest of all.

Sometimes a blue bubble drifts all the way across the cove. The seagulls chase it, but they never catch it. Bubble laughs and blows another one.`,
      questions: [
        { type: 'twoFact', question: 'Which bubbles last the longest?',
          choices: ['The big pink ones', 'The green ones', 'The small blue ones', 'The seaweed ones'], correctIndex: 2,
          hint: 'The passage tells about pink bubbles, then blue ones. Which one lasts longest?' },
        { type: 'recall', question: 'Where does Bubble blow her bubbles?',
          choices: ['At the end of the dock', 'Under the waves at Mistreef', 'On top of a sand hill', 'Inside the Coral Sanctum'], correctIndex: 0,
          hint: 'Look at the first sentence.' },
      ],
    },
    {
      title: 'Two Pearls',
      passage: `Pearl Ripple has two pearls. She keeps them in a shell box beside her bed.

The silver pearl is the bigger one. Pearl found it herself, deep in the waters of Mistreef. It took her three dives to reach it.

The golden pearl is very small. It was a gift from her grandmother, who found it long ago. Pearl says the golden one is more special, even though it is tiny.

"A big pearl is nice," Pearl says. "But a pearl from Grandma is the best kind of all."`,
      questions: [
        { type: 'twoFact', question: 'Which pearl is the bigger one?',
          choices: ['The golden pearl', 'The silver pearl', 'They are the same size'], correctIndex: 1,
          hint: 'Read about each pearl. Which one does the passage call bigger?' },
        { type: 'twoFact', question: 'Which pearl does Pearl think is more special?',
          choices: ['The silver one she found', 'The pink one from the cove', 'Neither of them', 'The golden one from Grandma'], correctIndex: 3,
          hint: 'Find the words "more special".' },
      ],
    },
    {
      title: 'The Morning Race',
      passage: `Every morning, Tidalhoof and Misty Wave race along the shore of Saltspray Cove. The race always ends at the big gray rock.

Tidalhoof is a strong swimmer. When they race through the water, he wins every time. Misty can hardly keep up with his splashes.

But Misty is quick on her hooves. When they race on the sand, she wins. Tidalhoof's big hooves sink into the soft sand and slow him down.

So each morning they take turns. One day they race in the water. The next day they race on the sand.`,
      questions: [
        { type: 'twoFact', question: 'Who wins when they race on the sand?',
          choices: ['Misty Wave', 'Tidalhoof', 'Nobody, it is always a tie', 'Bubble Brook'], correctIndex: 0,
          hint: 'One pony wins in the water and one wins on the sand. Find the sand part.' },
        { type: 'recall', question: 'Where does the race always end?',
          choices: ['At the end of the dock', 'At the big gray rock', 'At the edge of Mistreef', 'At Tidalhoof\'s house'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Skipping Stones',
      passage: `Splash Pebble is trying to skip a stone ten times across the water. Her best so far is eight.

Splash has learned that the kind of stone matters. Flat gray stones skip well. They bounce across the top of the water, hop, hop, hop. Round white stones do not skip at all. They just go plunk and sink to the bottom.

So Splash fills her bag with flat gray stones before she goes to the beach. She practices every afternoon when the water is calm. She is sure she will reach ten by the end of summer.`,
      questions: [
        { type: 'twoFact', question: 'Which stones sink instead of skipping?',
          choices: ['Flat gray stones', 'Small black stones', 'Round white stones', 'Shiny green stones'], correctIndex: 2,
          hint: 'The passage tells about two kinds of stones. Which one goes plunk?' },
        { type: 'recall', question: 'What is Splash\'s best number of skips so far?',
          choices: ['Six', 'Ten', 'Twelve', 'Eight'], correctIndex: 3,
          hint: 'Look at the first paragraph. Ten is her goal, not her best.' },
      ],
    },
    {
      title: 'Coral Shimmer\'s Treasures',
      passage: `Coral Shimmer collects pieces of coral that wash up on the beach. She never breaks coral off the reef. She only takes pieces the waves bring in.

Coral has four pieces in all. Three of them are pink. She found those on the beach near her home.

The fourth piece is blue. Blue coral is very rare. Coral did not find this one herself. It was a gift from Tidecaller Nerida, the guardian of the Water zone, after Coral helped clean up the beach.

Coral keeps the blue piece on a shelf all by itself.`,
      questions: [
        { type: 'twoFact', question: 'How many pink pieces of coral does Coral have?',
          choices: ['One', 'Three', 'Four'], correctIndex: 1,
          hint: 'She has four pieces in all. Count only the pink ones.' },
        { type: 'twoFact', question: 'Where did the blue coral come from?',
          choices: ['The beach near her home', 'The bottom of Mistreef', 'A gift from Nerida', 'A shop in the cove'], correctIndex: 2,
          hint: 'The pink pieces came from the beach. Read about the fourth piece.' },
      ],
    },
    {
      title: 'Thin Fog, Thick Fog',
      passage: `Misty Wave can make fog. She breathes out slowly, and a cloud of mist rolls over the water.

Misty makes two kinds of fog. Thin fog is for fun. On warm mornings, she makes a light, sparkly fog, and the young ponies play hide-and-seek inside it.

Thick fog is for keeping safe. When hungry seagulls circle over the beach, Misty makes a fog so heavy that nobody can see through it. The baby crabs hide inside it until the seagulls fly away.

The crabs of Saltspray Cove love Misty very much.`,
      questions: [
        { type: 'twoFact', question: 'What does Misty use thick fog for?',
          choices: ['Hiding baby crabs from seagulls', 'Playing hide-and-seek in the morning', 'Cooling the water down', 'Making rainbows over the cove'], correctIndex: 0,
          hint: 'Thin fog is for fun. What is thick fog for?' },
        { type: 'recall', question: 'When does Misty make thin fog?',
          choices: ['On stormy nights', 'On cold winter days', 'When seagulls come', 'On warm mornings'], correctIndex: 3,
          hint: 'Read the second paragraph.' },
      ],
    },
    {
      title: 'Inside the Coral Sanctum',
      passage: `The Coral Sanctum is a great building made of coral. It stands on a rock at the edge of Mistreef. It is the home of Tidecaller Nerida, the guardian of the Water zone.

The Sanctum has two big halls. The Hall of Echoes is round and very tall. When a pony speaks inside, their voice bounces back again and again. This is where trainers battle Nerida in the Trial.

The Hall of Pearls is quiet and calm. Its walls shine with pearls. This is where Nerida rests after a long day.`,
      questions: [
        { type: 'twoFact', question: 'In which hall do trainers battle Nerida?',
          choices: ['The Hall of Pearls', 'The Hall of Echoes', 'The Hall of Tides', 'The Coral Garden'], correctIndex: 1,
          hint: 'The passage tells about two halls. Find the one where the Trial happens.' },
        { type: 'twoFact', question: 'What happens when a pony speaks in the Hall of Echoes?',
          choices: ['The walls start to shine', 'Nerida wakes up from her rest', 'Their voice bounces back', 'The pearls begin to sing'], correctIndex: 2,
          hint: 'Read about the round, tall hall.' },
      ],
    },
    {
      title: 'The Bubble Chain',
      passage: `A bubble chain is a line of bubbles all stuck together, like beads on a string. It is very hard to make one, because a single pop can break the whole chain.

Bubble Brook and Pearl Ripple love to make bubble chains. They see who can make the longest one. They practice almost every day.

Pearl's best chain was eighteen bubbles long. She made it on a calm, quiet day.

Bubble's best chain was twenty-two bubbles long. She made it the very next morning. It floated over the dock and across the water before it finally popped.`,
      questions: [
        { type: 'twoFact', question: 'How long was Bubble\'s best chain?',
          choices: ['Twelve bubbles', 'Eighteen bubbles', 'Thirty bubbles', 'Twenty-two bubbles'], correctIndex: 3,
          hint: 'Pearl\'s chain and Bubble\'s chain had different lengths. Find Bubble\'s.' },
        { type: 'recall', question: 'Why is a bubble chain hard to make?',
          choices: ['One pop can break the whole chain', 'The water is too cold', 'The seagulls eat the bubbles', 'It only works at night'], correctIndex: 0,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Sea Glass',
      passage: `Sea glass is glass that has rolled in the waves for a very long time. The water and sand make it smooth and cloudy. Splash Pebble looks for it every day on the beach.

Splash has many pieces. Some are tiny, and some are as big as a hoof. Two of them are her favorites. Her oldest piece is dark green. Its edges are so smooth that it feels like soap. Her brightest piece is light blue, like the sky in spring. She holds it up to the sun to make it glow.

Splash keeps them both in a little jar on her windowsill.`,
      questions: [
        { type: 'twoFact', question: 'What color is Splash\'s oldest piece of sea glass?',
          choices: ['Light blue', 'Dark green', 'Clear white'], correctIndex: 1,
          hint: 'She has an oldest piece and a brightest piece. Find the oldest.' },
        { type: 'recall', question: 'What makes sea glass smooth?',
          choices: ['The hot sun on the sand', 'Splash rubbing it with soap', 'The water and the sand', 'Rain falling on the beach'], correctIndex: 2,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Coral\'s Kitchen',
      passage: `Coral Shimmer is the best cook in Saltspray Cove. Her two most famous dishes are kelp cakes and seaweed soup.

Kelp cakes are crispy and warm. Coral makes them for breakfast on sunny days. She cooks them on a hot, flat stone.

Seaweed soup is thick and salty. Coral makes it on cold, rainy nights. She cooks it in a big pot over the fire.

Her friends like both dishes. But if you ask Coral, she will tell you the soup tastes better. "Soup warms you all the way to your hooves," she says.`,
      questions: [
        { type: 'twoFact', question: 'When does Coral make seaweed soup?',
          choices: ['On cold, rainy nights', 'For breakfast on sunny days', 'On her birthday', 'Only in summer'], correctIndex: 0,
          hint: 'Kelp cakes and soup are made at different times. Find the soup part.' },
        { type: 'twoFact', question: 'Which dish does Coral say tastes better?',
          choices: ['Kelp cakes', 'Fish pie', 'Both are the same', 'Seaweed soup'], correctIndex: 3,
          hint: 'Read what Coral says at the end.' },
      ],
    },
    {
      title: 'Fish of Mistreef',
      passage: `Mistreef is a reef under the sea, not far from Saltspray Cove. Many kinds of fish live there.

Near the top, where the water is warm and bright, live the striped fish. They are yellow and black, and they swim in big groups. They dart away quickly when a pony swims near.

Far down below, where the water is cold and dark, live the glowing fish. Their bodies shine with a soft blue light. They swim slowly, all alone. Some are as long as a pony's tail.

Water ponies like to dive down at night to watch the glowing fish.`,
      questions: [
        { type: 'twoFact', question: 'Where do the glowing fish live?',
          choices: ['Near the top, in warm water', 'In the tide pools on the beach', 'Far down, in cold dark water', 'Inside the Coral Sanctum'], correctIndex: 2,
          hint: 'Striped fish live near the top. Where do the glowing fish live?' },
        { type: 'twoFact', question: 'Which fish swim in big groups?',
          choices: ['The striped fish', 'The glowing fish', 'Both kinds of fish'], correctIndex: 0,
          hint: 'Read about each kind of fish.' },
      ],
    },
    {
      title: 'Nerida\'s Crown',
      passage: `Tidecaller Nerida wears a crown made of shells. Every shell has a story.

The shell in the center is a big white spiral. Nerida found it on her very first swim, when she was just a little foal. It is the oldest shell on her crown.

The shells on the sides are smaller and pink. They were gifts from trainers who battled her in the Trial. Each time a trainer wins, Nerida gives them a badge. Many trainers give her a shell to say thank you.

Nerida's crown gets a little bigger every year.`,
      questions: [
        { type: 'twoFact', question: 'Where did the center shell come from?',
          choices: ['A gift from a trainer', 'Nerida\'s very first swim', 'The bottom of a tide pool', 'A shop in Saltspray Cove'], correctIndex: 1,
          hint: 'The center shell and the side shells came from different places.' },
        { type: 'recall', question: 'What color are the shells on the sides?',
          choices: ['White', 'Blue', 'Gold', 'Pink'], correctIndex: 3,
          hint: 'Read the third paragraph.' },
      ],
    },
    {
      title: 'High Tide, Low Tide',
      passage: `Twice a day, the sea comes up high on the beach. This is called high tide. Twice a day, the sea goes back out again. This is called low tide.

At high tide, the water covers the rocks. You can only see the tops of the tallest ones.

At low tide, the water pulls away. Little pools of water are left behind between the rocks. These are called tide pools. Inside them, you can find crabs, snails and starfish.

The young ponies of Saltspray Cove always explore the beach at low tide. Then they hurry home before the water comes back.`,
      questions: [
        { type: 'twoFact', question: 'When can you find tide pools?',
          choices: ['At high tide', 'At low tide', 'Only at night', 'Only in winter'], correctIndex: 1,
          hint: 'The passage tells about high tide and low tide. When are the pools left behind?' },
        { type: 'recall', question: 'How many times a day is there a high tide?',
          choices: ['Once', 'Three times', 'Twice'], correctIndex: 2,
          hint: 'Look at the first sentence.' },
      ],
    },
    {
      title: 'Two Paths to Mistreef',
      passage: `There are two paths from Saltspray Cove to the cliffs above Mistreef.

The cliff path is short. It goes straight up the hill, but it is steep and rocky. Strong ponies like Tidalhoof take it when they are in a hurry.

The beach path is long. It winds slowly around the bay. But it is flat and sandy, and there are shells to find along the way.

Today Splash Pebble is taking her little brother to see the reef. She picks the beach path. It will take longer, but her brother will not slip. Shells are his favorite thing.`,
      questions: [
        { type: 'twoFact', question: 'Which path is steep and rocky?',
          choices: ['The beach path', 'The forest path', 'The bridge path', 'The cliff path'], correctIndex: 3,
          hint: 'One path is short and steep. The other is long and flat.' },
        { type: 'recall', question: 'Who is Splash taking to see the reef?',
          choices: ['Her little brother', 'Tidalhoof', 'Her best friend Coral', 'Her grandmother'], correctIndex: 0,
          hint: 'Look at the last paragraph.' },
      ],
    },
    {
      title: 'Pearl and the Moon',
      passage: `Pearl Ripple feels different depending on the moon.

When the moon is full and bright, Pearl feels brave. She swims out past the reef. She goes farther than she ever would in the daytime. The moonlight shines down through the water and shows her the way.

When there is no moon at all, Pearl feels sleepy. The water is dark and quiet. She curls up in her cozy nest of sea grass and goes to bed early.

Her friends always know what kind of night it is just by looking at Pearl. Tonight, the moon is full and round.`,
      questions: [
        { type: 'twoFact', question: 'How does Pearl feel when there is no moon?',
          choices: ['Brave', 'Hungry', 'Sleepy', 'Scared'], correctIndex: 2,
          hint: 'Pearl feels one way with a full moon and another with no moon.' },
        { type: 'twoFact', question: 'What does Pearl do when the moon is full?',
          choices: ['She goes to bed early', 'She swims out past the reef', 'She sings to the fish', 'She visits Nerida'], correctIndex: 1,
          hint: 'Read the second paragraph.' },
      ],
    },
  ],
  // ── Zone 4 (Fire): Cinderpath, Ashfall Camp, the Magma Forge ──────────────
  4: [
    {
      title: 'Campfire Week',
      passage: `Spark Flicker has a very important job at Ashfall Camp. She lights the campfires every evening. She does not need matches. She just touches the wood with the tip of her horn, and a tiny spark jumps out.

This week, the camp was extra busy. On Monday, eight families came to visit, so Spark lit eight campfires. On Tuesday, even more ponies arrived. That night she lit twelve fires! The visitors cheered each time a new fire crackled to life.

By the end of Tuesday, Spark was very tired. She curled up next to the warmest fire and fell asleep right away.`,
      questions: [
        { type: 'twoFact', question: 'How many campfires did Spark light on Tuesday?',
          choices: ['Eight', 'Ten', 'Twelve', 'Twenty'], correctIndex: 2,
          hint: 'Monday and Tuesday had different numbers. Find Tuesday.' },
        { type: 'recall', question: 'How does Spark light the fires?',
          choices: ['With a box of matches', 'With a spark from her horn', 'With a lantern', 'By rubbing two sticks together'], correctIndex: 1,
          hint: 'Look at the first paragraph.' },
      ],
    },
    {
      title: 'Cocoa\'s Secret',
      passage: `Cinder Cocoa makes the best hot chocolate in the Fire zone. Ponies come all the way from Cinderpath to taste it.

Everyone asks for her secret. Cocoa says she has two. The first secret is to stir very slowly, so the chocolate never burns. The second secret is about the spices. She puts the honey in at the very beginning. But she always adds the cinnamon last, just before she pours.

"Cinnamon at the end keeps the smell strong," she explains. Then she hands you a warm mug and smiles.`,
      questions: [
        { type: 'twoFact', question: 'What does Cocoa add last?',
          choices: ['The honey', 'The milk', 'The chocolate', 'The cinnamon'], correctIndex: 3,
          hint: 'One spice goes in at the beginning and one goes in at the end.' },
        { type: 'recall', question: 'Why does Cocoa stir very slowly?',
          choices: ['So the chocolate never burns', 'So it cools down quickly', 'So it makes lots more bubbles on top', 'So the cinnamon sinks'], correctIndex: 0,
          hint: 'Read about her first secret.' },
      ],
    },
    {
      title: 'Blazehoof on Guard',
      passage: `Blazehoof guards the gate of the Magma Forge. He is big and strong, and his mane looks like a crackling flame.

On sunny days, Blazehoof stands by the gate from morning until night. He says hello to every pony who walks by. He checks that the path is safe.

Rainy days are different. Fire ponies do not like getting wet. When it rains, nobody comes to the forge, so Blazehoof takes a break. He goes inside, sits by the warm fire and reads his favorite book about dragons.`,
      questions: [
        { type: 'twoFact', question: 'What does Blazehoof do on rainy days?',
          choices: ['Stands by the gate all day', 'Checks that the path is safe', 'Reads by the fire inside', 'Visits his friends in Cinderpath'], correctIndex: 2,
          hint: 'Sunny days and rainy days are different for him.' },
        { type: 'recall', question: 'Why does nobody come to the forge when it rains?',
          choices: ['The gate is locked', 'Fire ponies do not like getting wet', 'The path gets too muddy and slippery to walk on'], correctIndex: 1,
          hint: 'Read the start of the last paragraph.' },
      ],
    },
    {
      title: 'Flame Twirl\'s Dances',
      passage: `Flame Twirl is the best dancer at Ashfall Camp. When she dances, little sparks fly from her hooves.

Flame knows many fire dances. Last spring, she learned the Spark. It is a fast dance with lots of hopping. She practiced it every morning until she could do it with her eyes closed.

Just this week, she learned a brand-new dance called the Swirl. It is slow and smooth. She spins in big circles, and the sparks swirl around her like a ribbon.

Flame plans to show the Swirl at the next campfire party.`,
      questions: [
        { type: 'twoFact', question: 'Which dance did Flame learn this week?',
          choices: ['The Spark', 'The Hop', 'The Swirl', 'The Blaze'], correctIndex: 2,
          hint: 'She learned one dance last spring and one this week.' },
        { type: 'twoFact', question: 'Which dance has lots of hopping?',
          choices: ['The Spark', 'The Swirl', 'Both dances'], correctIndex: 0,
          hint: 'Read about each dance carefully.' },
      ],
    },
    {
      title: 'Red Embers, Blue Embers',
      passage: `Ember Glow keeps a collection of embers in a stone jar. An ember is a small piece of glowing coal. Fire ponies can hold them without getting burned.

Most of Ember's embers are red. She has six red ones. They glow softly, like the sky at sunset.

Two of her embers are blue. Blue embers are very rare, and they burn much hotter than red ones. Ember found one in the Magma Forge. The other was a birthday present from her aunt. Her aunt promised to help her look for more.

At night, Ember opens the jar, and her whole room glows.`,
      questions: [
        { type: 'twoFact', question: 'How many blue embers does Ember have?',
          choices: ['One', 'Six', 'Eight', 'Two'], correctIndex: 3,
          hint: 'She has red ones and blue ones. Count only the blue.' },
        { type: 'twoFact', question: 'Which embers burn hotter?',
          choices: ['The red ones', 'The blue ones', 'They are all the same', 'The ones from her aunt'], correctIndex: 1,
          hint: 'Read the paragraph about the blue embers.' },
      ],
    },
    {
      title: 'Sunny and the Clouds',
      passage: `Sunny Scorch gets her energy from the sun. Her golden coat soaks up the sunlight the way a plant does.

On sunny days, Sunny is full of energy. She runs races, climbs hills and plays tag until sunset. Her friends can hardly keep up.

On cloudy days, Sunny feels tired. Without sunlight, her energy runs low. She moves slowly and yawns a lot. Sometimes she takes a nap in the middle of the afternoon.

When the clouds finally move away, Sunny stands in the sunshine with her eyes closed. In a few minutes, she is ready to play again. Her friends call it her sun bath.`,
      questions: [
        { type: 'twoFact', question: 'How does Sunny feel on cloudy days?',
          choices: ['Full of energy', 'Tired', 'Angry', 'Hungry'], correctIndex: 1,
          hint: 'Sunny feels one way on sunny days and another way on cloudy days.' },
        { type: 'recall', question: 'What does Sunny do when the clouds move away?',
          choices: ['She takes a long nap under a tree', 'She eats a big lunch', 'She runs home to bed', 'She stands in the sunshine'], correctIndex: 3,
          hint: 'Look at the last paragraph.' },
      ],
    },
    {
      title: 'Cinda\'s Mane',
      passage: `Emberwarden Cinda is the guardian of the Fire zone. Her mane is made of real fire, and it changes color with her mood.

Most of the time, her mane is bright orange. When Cinda is happy, it turns gold and sparkles. When she is thinking very hard, it turns deep purple. Trainers who battle her in the Trial watch her mane closely. If it turns purple, they know she is planning a clever move.

Once, a young trainer made Cinda laugh in the middle of a battle. Her mane turned gold for the rest of the day.`,
      questions: [
        { type: 'twoFact', question: 'What color is Cinda\'s mane when she is thinking hard?',
          choices: ['Bright orange', 'Gold', 'Deep purple', 'Blue'], correctIndex: 2,
          hint: 'Her mane has a color for happy and a color for thinking hard.' },
        { type: 'twoFact', question: 'What color is Cinda\'s mane most of the time?',
          choices: ['Bright orange', 'Deep purple', 'Sparkling gold', 'Silver'], correctIndex: 0,
          hint: 'Find the words "Most of the time".' },
      ],
    },
    {
      title: 'The Glowing Road',
      passage: `Cinderpath is the road that leads into the Fire zone. It is not made of dirt or stone. It is made of cinders, which are tiny bits of rock left over from old fires.

During the day, the cinders are dark gray. They feel warm under your hooves, like sand on a summer beach.

At night, something special happens. The cinders begin to glow orange. The whole road lights up like a long, bright ribbon. Because of this, travelers on Cinderpath never need a lantern after dark. They just follow the glowing road.`,
      questions: [
        { type: 'twoFact', question: 'What do the cinders look like at night?',
          choices: ['Dark gray', 'Glowing orange', 'Shiny white', 'Sparkling bright blue'], correctIndex: 1,
          hint: 'The cinders look one way during the day and another way at night.' },
        { type: 'recall', question: 'Why don\'t travelers need a lantern on Cinderpath?',
          choices: ['The moon is very bright', 'The road glows at night', 'They only walk in the day', 'Fire ponies can see in the dark'], correctIndex: 1,
          hint: 'Read the end of the last paragraph.' },
      ],
    },
    {
      title: 'Stones That Float',
      passage: `Spark Flicker collects stones from the old lava fields near Ashfall Camp. Lava is melted rock. When it cools, it turns into stone.

Spark has found two kinds. The black stones are shiny and smooth, like glass. They are heavy and have sharp edges, so Spark holds them carefully.

The gray stones are full of tiny holes, like a sponge. They are so light that they float in water! Spark likes to drop them in the hot spring and watch them bob.

She keeps the black ones on her shelf and the gray ones in her bathtub.`,
      questions: [
        { type: 'twoFact', question: 'Which stones float in water?',
          choices: ['The heavy shiny black ones', 'The gray ones with holes', 'Both kinds of stones', 'Neither kind'], correctIndex: 1,
          hint: 'Read about the black stones, then the gray ones.' },
        { type: 'twoFact', question: 'Where does Spark keep the black stones?',
          choices: ['In her bathtub', 'On her shelf', 'In the hot spring', 'Under her bed'], correctIndex: 1,
          hint: 'Look at the last sentence.' },
      ],
    },
    {
      title: 'Cocoa\'s Party',
      passage: `Cinder Cocoa loves to have parties. Last Saturday, she had a party at her house in Ashfall Camp.

Cocoa invited eight friends. She made eight mugs of hot chocolate and baked a big plate of cinnamon cookies.

But only seven friends came to the party. Sunny Scorch was home sick with a cold. So Cocoa saved a mug and some cookies for her.

Blazehoof was the last to arrive. He brought a basket of fire-roasted apples. Everyone said they were delicious. The friends played games and told stories until the stars came out.`,
      questions: [
        { type: 'twoFact', question: 'How many friends came to the party?',
          choices: ['Six', 'Seven', 'Eight', 'Nine'], correctIndex: 1,
          hint: 'Cocoa invited one number of friends, but a different number came.' },
        { type: 'recall', question: 'What did Blazehoof bring?',
          choices: ['Cinnamon cookies', 'Hot chocolate', 'Fire-roasted apples', 'A brand-new board game'], correctIndex: 2,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Choosing Tents',
      passage: `Every summer, the young ponies camp out at Ashfall Camp for a whole week. Each pony gets to pick a tent.

This year, Sunny Scorch and Flame Twirl picked last. Only two tents were left. One was gold and one was red.

Sunny chose the gold tent. "It matches the sunrise," she said. "I want to wake up to that color every morning."

Flame chose the red tent. It was the strongest tent at the camp, and the wind on the hill can be very strong. Flame does not like being woken up by flapping walls.`,
      questions: [
        { type: 'twoFact', question: 'Why did Sunny choose the gold tent?',
          choices: ['It was the strongest', 'It was the biggest one at camp', 'It matched the sunrise', 'It was the last one'], correctIndex: 2,
          hint: 'Sunny and Flame chose for different reasons.' },
        { type: 'twoFact', question: 'Which pony chose the red tent?',
          choices: ['Flame Twirl', 'Sunny Scorch', 'Spark Flicker'], correctIndex: 0,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'The Magma Forge',
      passage: `The Magma Forge is a big workshop built into the side of a mountain. It is the home of Emberwarden Cinda.

The forge is warm all year, even in winter. That is because a river of lava flows deep under the floor. Its heat rises up through the stone.

Fire ponies use this heat to make things. They melt metal and shape it into horseshoes, bells and lanterns. The ringing of their hammers can be heard all the way down the mountain.

Visitors are welcome, but they must stay behind the yellow line. The line keeps them safe from sparks.`,
      questions: [
        { type: 'twoFact', question: 'What keeps the forge warm all year?',
          choices: ['A giant campfire', 'Hot winds from the desert', 'Lava flowing under the floor', 'Many lanterns'], correctIndex: 2,
          hint: 'Find the word "because".' },
        { type: 'recall', question: 'What must visitors do?',
          choices: ['Bring their own hammer', 'Ring the bell at the door', 'Wear a horseshoe', 'Stay behind the yellow line'], correctIndex: 3,
          hint: 'Look at the last sentence.' },
      ],
    },
    {
      title: 'Apples and Toast',
      passage: `Blazehoof loves to cook for his visitors. He has a special treat for each kind of visit.

When his friends from Ashfall Camp come over, he makes toast. He holds the bread near his fiery mane until it turns crispy and brown. Then he spreads honey on top.

When his little sister visits from Cinderpath, he makes something even better. He roasts apples until they are soft and sweet. They are his sister's favorite food in the whole world.

His sister visits once a month. Blazehoof always saves the biggest apples for her. He says it is the best part of his month.`,
      questions: [
        { type: 'twoFact', question: 'What does Blazehoof make when his sister visits?',
          choices: ['Toast with honey', 'Hot chocolate', 'Roasted apples', 'Cinnamon cookies'], correctIndex: 2,
          hint: 'He makes one treat for friends and another for his sister.' },
        { type: 'recall', question: 'How often does his sister visit?',
          choices: ['Once a week', 'Every day', 'Once a year', 'Once a month'], correctIndex: 3,
          hint: 'Read the last paragraph.' },
      ],
    },
    {
      title: 'Shaping Embers',
      passage: `Sunny Scorch has a special talent. She can shape warm embers with her hooves, the way other ponies shape clay.

Sunny makes two shapes most often. For everyday use, she makes circles. A circle ember glows evenly, so it is good for keeping a room warm.

For parties, Sunny makes stars. Star embers twinkle and flicker, which makes everyone smile. But they do not stay warm for very long.

Next week, Cinder Cocoa is having a birthday party. Sunny has already made twenty star embers to hang around the room. Cocoa does not know yet. It is a surprise!`,
      questions: [
        { type: 'twoFact', question: 'Which shape does Sunny make for parties?',
          choices: ['Circles', 'Hearts', 'Stars', 'Squares'], correctIndex: 2,
          hint: 'She makes one shape for everyday and one for parties.' },
        { type: 'twoFact', question: 'Which embers are good for keeping a room warm?',
          choices: ['Circle embers', 'Star embers', 'Heart embers'], correctIndex: 0,
          hint: 'Read about the everyday shape.' },
      ],
    },
    {
      title: 'Two Hot Springs',
      passage: `There are two hot springs at Ashfall Camp. A hot spring is a pool of water that is heated from deep under the ground.

The small spring is very hot. Steam rises from it all day long. Ponies do not swim in it. Instead, they lower baskets of eggs into it to cook them for breakfast.

The big spring is just warm. It feels like a bath. The young ponies swim and splash in it every afternoon.

A wooden sign stands between the two springs. It says, "Small spring for eggs. Big spring for ponies!" Nobody has ever mixed them up.`,
      questions: [
        { type: 'twoFact', question: 'What do ponies use the small spring for?',
          choices: ['Swimming and splashing', 'Washing their manes', 'Cooking eggs', 'Drinking water'], correctIndex: 2,
          hint: 'The two springs are used for different things.' },
        { type: 'twoFact', question: 'Which spring feels like a bath?',
          choices: ['The small spring', 'The big spring', 'Neither spring'], correctIndex: 1,
          hint: 'Read about the big spring.' },
      ],
    },
  ],
  5: [],
  6: [],
}
