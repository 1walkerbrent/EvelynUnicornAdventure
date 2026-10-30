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
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
}
