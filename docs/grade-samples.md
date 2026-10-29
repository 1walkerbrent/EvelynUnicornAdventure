# Grade samples

Three math and three logic problems per zone per grade, made by the real generators with a fixed seed.
Regenerate with `WRITE_SAMPLES=1 npx vitest run scripts/grade-samples.test.ts`. The rules behind them are in DESIGN.md §23.

## Grade 3

### Zone 1

**Math**

1. `224 + 443 = __` → **667**  
   _3-digit + and − without regrouping_
2. `7 × 2 = __` → **14**  
   _× facts: ×1, ×2, ×5, ×10_
3. `444 − 331 = __` → **113**  
   _3-digit + and − without regrouping_

**Logic**

1. _find it: 3 items_

   ```
   A sparkly gem rests inside one of these chests!
   
   Spot 1: huge chest
   Spot 2: small chest
   Spot 3: tiny chest
   
   It is NOT the tiny chest.
   It is NOT the huge chest.
   
   Which chest is it?
   ```

   Choices: Spot 1: huge chest · **Spot 2: small chest** ✓ · Spot 3: tiny chest

2. _pattern, one rule_

   ```
   What number comes next?
   
   5, 10, 20, 40, 80, __
   ```

   Choices: **160** ✓ · 161 · 162 · 120

3. _biggest 3-digit number_

   ```
   Which number is the biggest?
   
   • 459
   • 466
   • 486
   ```

   Choices: 459 · 466 · **486** ✓

### Zone 2

**Math**

1. `497 + 344 = __` → **841**  
   _3-digit + and − with regrouping_
2. `10 × 7 = __` → **70**  
   _× facts: adds ×3, ×4_
3. `Round 322 to the nearest 10 = __` → **320**  
   _round to the nearest 10_

**Logic**

1. _find it: 4 items_

   ```
   A magic key is hidden behind one of these doors!
   
   Spot 1: gold door
   Spot 2: red door
   Spot 3: blue door
   Spot 4: green door
   
   It is NOT in spot 3.
   It is NOT the gold door.
   It is NOT the red door.
   
   Which door is it?
   ```

   Choices: Spot 1: gold door · Spot 2: red door · Spot 3: blue door · **Spot 4: green door** ✓

2. _pattern, one rule_

   ```
   What number comes next?
   
   3, 6, 12, 24, 48, __
   ```

   Choices: 72 · **96** ✓ · 97 · 98

3. _who has what: 2 friends_

   ```
   Each friend has a different pet.
   To choose from: cat, bunny.
   
   • Finn does not have the bunny.
   
   Who has the cat?
   ```

   Choices: Ava · **Finn** ✓

### Zone 3

**Math**

1. `764 + 209 + 13 = __` → **986**  
   _+ and − within 1,000, 2 steps_
2. `3 × 10 = __` → **30**  
   _× facts: adds ×0, ×6_
3. `6 ÷ 2 = __` → **3**  
   _÷ facts by 2, 5, 10_

**Logic**

1. _find it: 4 items_

   ```
   A tiny fairy is sleeping under one of these mushrooms!
   
   Spot 1: purple mushroom
   Spot 2: striped mushroom
   Spot 3: spotted mushroom
   Spot 4: yellow mushroom
   
   It is NOT in spot 1.
   It is NOT in spot 2.
   It is NOT in spot 3.
   
   Which mushroom is it?
   ```

   Choices: Spot 1: purple mushroom · Spot 2: striped mushroom · Spot 3: spotted mushroom · **Spot 4: yellow mushroom** ✓

2. _order 4 friends_

   ```
   Use these clues:
   • Luna is younger than Kai.
   • Luna is older than Ivy.
   • Luna is younger than Ella.
   
   Who is the youngest?
   ```

   Choices: Ella · Kai · Luna · **Ivy** ✓

3. _what must be true_

   ```
   Given that:
   • All fire ponies live in the fire zone.
   • Blazehoof is a fire pony.
   
   What MUST be true?
   ```

   Choices: Blazehoof lives in the water zone. · **Blazehoof lives in the fire zone.** ✓ · Blazehoof is a water pony. · All ponies live in the fire zone.

### Zone 4

**Math**

1. `867 − 715 + 840 = __` → **992**  
   _3-digit + and −, 2 steps_
2. `10 × 4 = __` → **40**  
   _all × facts to 10 × 10_
3. `16 ÷ 2 = __` → **8**  
   _÷ facts by 2–6_

**Logic**

1. _find it: 4 items_

   ```
   A friendly pony is waiting by one of these flowers!
   
   Spot 1: red flower
   Spot 2: yellow flower
   Spot 3: pink flower
   Spot 4: blue flower
   
   It is NOT in spot 1.
   It is NOT in spot 3.
   It is NOT in spot 2.
   
   Which flower is it?
   ```

   Choices: Spot 1: red flower · Spot 2: yellow flower · Spot 3: pink flower · **Spot 4: blue flower** ✓

2. _order 4 friends_

   ```
   Use these clues:
   • Nell is younger than Ella.
   • Oscar is younger than Dash.
   • Oscar is younger than Nell.
   
   Who is the youngest?
   ```

   Choices: **Oscar** ✓ · Nell · Ella · Dash

3. _what must also be true_

   ```
   Given that: All birds have feathers. A sparrow is a bird.
   
   What MUST also be true?
   ```

   Choices: All animals have feathers. · Feathers are only for birds. · **A sparrow has feathers.** ✓ · A sparrow cannot fly.

### Zone 5

**Math**

1. `948 − 591 − 203 = __` → **154**  
   _+ and − within 1,000, 2–3 steps_
2. `72 ÷ 8 = __` → **9**  
   _all ÷ facts_
3. `__ × 7 = 14` → **2**  
   _missing factor (6 × __ = 42)_

**Logic**

1. _find it: 5 items_

   ```
   A tiny fairy is sleeping under one of these mushrooms!
   
   Spot 1: orange mushroom
   Spot 2: spotted mushroom
   Spot 3: striped mushroom
   Spot 4: yellow mushroom
   Spot 5: red mushroom
   
   It is NOT in spot 1.
   It is NOT the striped mushroom.
   It is NOT the yellow mushroom.
   It is NOT the spotted mushroom.
   
   Which mushroom is it?
   ```

   Choices: Spot 1: orange mushroom · Spot 2: spotted mushroom · Spot 3: striped mushroom · Spot 4: yellow mushroom · **Spot 5: red mushroom** ✓

2. _order 5 friends_

   ```
   Use these clues:
   • Nell is faster than Finn.
   • Pip is slower than Luna.
   • Kai is slower than Finn.
   • Luna is slower than Kai.
   
   Who is the fastest?
   ```

   Choices: Kai · Pip · Finn · **Nell** ✓ · Luna

3. _which is impossible_

   ```
   Fact: All ponies in the Earth zone are Earth ponies.
   
   Which of these is IMPOSSIBLE?
   ```

   Choices: All Earth ponies love mud. · An Earth pony collects rocks. · **A Water pony lives deep in the Earth zone.** ✓ · An Earth pony visits Zone 3. · Two Earth ponies are friends.

### Zone 6

**Math**

1. `130 + 362 − 194 = __` → **298**  
   _+ and − within 1,000, 2–3 steps_
2. `__ × 10 = 40` → **4**  
   _missing factor or divisor_
3. `3 × __ = 21` → **7**  
   _× facts, some with a missing factor_

**Logic**

1. _find it: 5 items, left/right clues_

   ```
   A friendly pony is waiting by one of these flowers!
   
   Spot 1: red flower
   Spot 2: white flower
   Spot 3: blue flower
   Spot 4: orange flower
   Spot 5: yellow flower
   
   It is right next to the orange flower.
   It is somewhere to the right of the blue flower.
   
   Which flower is it?
   ```

   Choices: Spot 1: red flower · Spot 2: white flower · Spot 3: blue flower · Spot 4: orange flower · **Spot 5: yellow flower** ✓

2. _order 5 friends_

   ```
   Use these clues:
   • Ben is lighter than Milo.
   • Hazel is heavier than Ben.
   • Ivy is heavier than Hazel.
   • Luna is heavier than Ivy.
   
   Who is the lightest?
   ```

   Choices: Hazel · Ivy · **Ben** ✓ · Luna · Milo

3. _if/then, 3 steps_

   ```
   Rules:
   • If the lanterns glow, then the fairies dance.
   • If the fairies dance, then the gate opens.
   • If the gate opens, then the meadow gets busy.
   
   This time, the lanterns glow.
   
   What must happen?
   ```

   Choices: The lanterns do not glow. · **The meadow gets busy.** ✓ · The flowers open. · The meadow does not get busy.

## Grade 4

### Zone 1

**Math**

1. `6,206 + 2,082 = __` → **8,288**  
   _+ and − to 10,000_
2. `Which number is a factor of 48?` → **12** _(buttons: 13 · 11 · 12 · 5)_  
   _which is a factor_
3. `1,711 + 4,146 = __` → **5,857**  
   _+ and − to 10,000_

**Logic**

1. _find it: 4 items, left/right clues_

   ```
   A sparkly gem rests inside one of these chests!
   
   Spot 1: huge chest
   Spot 2: tiny chest
   Spot 3: large chest
   Spot 4: medium chest
   
   It is right next to the medium chest.
   
   Which chest is it?
   ```

   Choices: Spot 1: huge chest · Spot 2: tiny chest · **Spot 3: large chest** ✓ · Spot 4: medium chest

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   6, 9, 13, 18, 24, __
   ```

   Choices: **31** ✓ · 33 · 32 · 30

3. _who has what: 3 friends_

   ```
   Each friend picked a different snack.
   To choose from: cookie, muffin, carrot.
   
   • Cleo did not pick the cookie.
   • Ava picked the carrot.
   
   Who picked the muffin?
   ```

   Choices: Gus · Ava · **Cleo** ✓

### Zone 2

**Math**

1. `69,318 + 11,494 = __` → **80,812**  
   _+ and − to 100,000_
2. `373 × 3 = __` → **1,119**  
   _2–3 digit × 1-digit_
3. `Which number is a multiple of 9?` → **108** _(buttons: 118 · 106 · 107 · 108)_  
   _which is a multiple_

**Logic**

1. _find it: 5 items, left/right clues_

   ```
   A secret is tucked inside one of these lanterns!
   
   Spot 1: emerald lantern
   Spot 2: crimson lantern
   Spot 3: azure lantern
   Spot 4: violet lantern
   Spot 5: amber lantern
   
   It is right next to the emerald lantern.
   
   Which lantern is it?
   ```

   Choices: Spot 1: emerald lantern · **Spot 2: crimson lantern** ✓ · Spot 3: azure lantern · Spot 4: violet lantern · Spot 5: amber lantern

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   288, 144, 72, 36, 18, __
   ```

   Choices: 16 · 8 · **9** ✓ · 10

3. _who has what: 3 friends_

   ```
   Each friend picked a different snack.
   To choose from: apple, carrot, cookie.
   
   • Finn did not pick the apple.
   • Finn did not pick the cookie.
   
   Who picked the carrot?
   ```

   Choices: **Finn** ✓ · Ben · Kai

### Zone 3

**Math**

1. `765,747 + 201,625 = __` → **967,372**  
   _+ and − to 1,000,000_
2. `9,729 × 9 = __` → **87,561**  
   _4-digit × 1-digit_
3. `864 ÷ 2 = __` → **432 R 0** _(remainder entry)_  
   _3-digit ÷ 1-digit with remainder_

**Logic**

1. _find it: 5 items, left/right clues_

   ```
   A tiny fairy is sleeping under one of these mushrooms!
   
   Spot 1: orange mushroom
   Spot 2: striped mushroom
   Spot 3: red mushroom
   Spot 4: yellow mushroom
   Spot 5: purple mushroom
   
   It is somewhere to the left of the striped mushroom.
   
   Which mushroom is it?
   ```

   Choices: **Spot 1: orange mushroom** ✓ · Spot 2: striped mushroom · Spot 3: red mushroom · Spot 4: yellow mushroom · Spot 5: purple mushroom

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   3, 9, 27, 81, 243, __
   ```

   Choices: 732 · 486 · **729** ✓ · 324

3. _who has what: 3 friends, only "not" clues_

   ```
   Each friend picked a different snack.
   To choose from: carrot, cookie, apple.
   
   • Luna did not pick the cookie.
   • Hazel did not pick the cookie.
   
   Who picked the cookie?
   ```

   Choices: Luna · Hazel · **Oscar** ✓

### Zone 4

**Math**

1. `46 × 93 = __` → **4,278**  
   _2-digit × 2-digit_
2. `6,602 ÷ 5 = __` → **1,320 R 2** _(remainder entry)_  
   _4-digit ÷ 1-digit with remainder_
3. `5/8 + 6/8 = __` → **1 3/8** _(fraction entry)_  
   _+ − fractions, like denominators_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A magic key is hidden behind one of these doors!
   
   Spot 1: gold door
   Spot 2: green door
   Spot 3: purple door
   Spot 4: blue door
   Spot 5: red door
   Spot 6: silver door
   
   It is right next to the gold door.
   
   Which door is it?
   ```

   Choices: Spot 1: gold door · **Spot 2: green door** ✓ · Spot 3: purple door · Spot 4: blue door · Spot 5: red door · Spot 6: silver door

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   128, 64, 32, 16, 8, __
   ```

   Choices: **4** ✓ · 3 · 6 · 5

3. _who has what: 3 friends, only "not" clues_

   ```
   Each pony wears a different color ribbon.
   To choose from: gold ribbon, blue ribbon, green ribbon.
   
   • Milo does not wear the gold ribbon.
   • Milo does not wear the green ribbon.
   
   Who wears the blue ribbon?
   ```

   Choices: **Milo** ✓ · Jett · Ella

### Zone 5

**Math**

1. `0.8  __  0.80` → **=** _(buttons: < · = · >)_  
   _compare decimals to tenths_
2. `2 3/6 + 4 4/6 = __` → **7 1/6** _(fraction entry)_  
   _mixed numbers, like denominators_
3. `Is 27 prime or composite?` → **Composite** _(buttons: Prime · Composite)_  
   _factors, multiples, primes_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A sparkly gem rests inside one of these chests!
   
   Spot 1: large chest
   Spot 2: tiny chest
   Spot 3: huge chest
   Spot 4: small chest
   Spot 5: giant chest
   Spot 6: medium chest
   
   It is right next to the large chest.
   
   Which chest is it?
   ```

   Choices: Spot 1: large chest · **Spot 2: tiny chest** ✓ · Spot 3: huge chest · Spot 4: small chest · Spot 5: giant chest · Spot 6: medium chest

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   171, 144, 117, 90, 63, __
   ```

   Choices: **36** ✓ · 37 · 35 · 90

3. _who has what: 4 friends_

   ```
   Each pony wears a different color ribbon.
   To choose from: green ribbon, blue ribbon, gold ribbon, red ribbon.
   
   • Gus does not wear the green ribbon.
   • Oscar wears the red ribbon.
   • Finn wears the gold ribbon.
   
   Who wears the blue ribbon?
   ```

   Choices: Ella · Finn · Oscar · **Gus** ✓

### Zone 6

**Math**

1. `0.39  __  0.8` → **<** _(buttons: < · = · >)_  
   _compare decimals to hundredths_
2. `975,502 − 249,221 = __` → **726,281**  
   _+ and − to 1,000,000_
3. `42 × 64 = __` → **2,688**  
   _2-digit × 2-digit_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A magic key is hidden behind one of these doors!
   
   Spot 1: blue door
   Spot 2: green door
   Spot 3: silver door
   Spot 4: gold door
   Spot 5: red door
   Spot 6: purple door
   
   It is somewhere to the right of the gold door.
   It is right next to the gold door.
   
   Which door is it?
   ```

   Choices: Spot 1: blue door · Spot 2: green door · Spot 3: silver door · Spot 4: gold door · **Spot 5: red door** ✓ · Spot 6: purple door

2. _patterns: bigger steps, ×3, ÷2_

   ```
   What number comes next?
   
   1, 3, 9, 27, 81, __
   ```

   Choices: **243** ✓ · 246 · 108 · 162

3. _who has what: 4 friends_

   ```
   Each friend picked a different snack.
   To choose from: carrot, apple, muffin, cookie.
   
   • Ella picked the carrot.
   • Pip did not pick the cookie.
   • Milo picked the apple.
   
   Who picked the cookie?
   ```

   Choices: Ella · Milo · Pip · **Luna** ✓

## Grade 5

### Zone 1

**Math**

1. `72,100 ÷ 100 = __` → **721**  
   _× ÷ by 10, 100, 1,000_
2. `3 × (9 − 5) = __` → **12**  
   _order of operations, ( )_
3. `375 × 100 = __` → **37,500**  
   _× ÷ by 10, 100, 1,000_

**Logic**

1. _find it: 5 items, left/right clues_

   ```
   A magic key is hidden behind one of these doors!
   
   Spot 1: gold door
   Spot 2: purple door
   Spot 3: blue door
   Spot 4: green door
   Spot 5: red door
   
   It is right next to the purple door.
   It is somewhere to the right of the purple door.
   
   Which door is it?
   ```

   Choices: Spot 1: gold door · Spot 2: purple door · **Spot 3: blue door** ✓ · Spot 4: green door · Spot 5: red door

2. _patterns: growing, two woven together_

   ```
   What number comes next?
   
   1, 3, 9, 27, 81, __
   ```

   Choices: 108 · 162 · 246 · **243** ✓

3. _who has what: 3 friends, only "not" clues_

   ```
   Each pony lives in a different place.
   To choose from: cave, meadow, lake.
   
   • Ava does not live in the meadow.
   • Ava does not live in the lake.
   
   Who lives in the cave?
   ```

   Choices: **Ava** ✓ · Finn · Nell

### Zone 2

**Math**

1. `487 × 83 = __` → **40,421**  
   _3-digit × 2-digit_
2. `54.76 − 52.03 = __` → **2.73** _(decimal entry)_  
   _decimal + − to hundredths_
3. `88.29 × 1,000 = __` → **88,290** _(decimal entry)_  
   _powers of 10 with decimals_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A wish token glows on one of these stars!
   
   Spot 1: dim star
   Spot 2: faint star
   Spot 3: twinkly star
   Spot 4: shooting star
   Spot 5: bright star
   Spot 6: glowing star
   
   It is right next to the faint star.
   It is somewhere to the right of the dim star.
   
   Which star is it?
   ```

   Choices: Spot 1: dim star · Spot 2: faint star · **Spot 3: twinkly star** ✓ · Spot 4: shooting star · Spot 5: bright star · Spot 6: glowing star

2. _patterns with two rules_

   ```
   What number comes next?
   
   10, 13, 17, 22, 28, __
   ```

   Choices: **35** ✓ · 34 · 37 · 36

3. _who has what: 3 friends, only "not" clues_

   ```
   Each pony lives in a different place.
   To choose from: forest, meadow, lake.
   
   • Cleo does not live in the meadow.
   • Cleo does not live in the forest.
   
   Who lives in the lake?
   ```

   Choices: **Cleo** ✓ · Ella · Ben

### Zone 3

**Math**

1. `9,120 ÷ 32 = __` → **285**  
   _4-digit ÷ 2-digit_
2. `1/3 × 7 = __` → **2 1/3** _(fraction entry)_  
   _fraction × whole number_
3. `1.64 × 5 = __` → **8.2** _(decimal entry)_  
   _decimal × whole number_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A wish token glows on one of these stars!
   
   Spot 1: glowing star
   Spot 2: faint star
   Spot 3: shooting star
   Spot 4: twinkly star
   Spot 5: dim star
   Spot 6: bright star
   
   It is somewhere to the right of the dim star.
   
   Which star is it?
   ```

   Choices: Spot 1: glowing star · Spot 2: faint star · Spot 3: shooting star · Spot 4: twinkly star · Spot 5: dim star · **Spot 6: bright star** ✓

2. _patterns with two rules_

   ```
   What number comes next?
   
   4, 8, 13, 26, 31, __
   ```

   Choices: **62** ✓ · 57 · 67 · 36

3. _if/then, 5 steps, some backward_

   ```
   Rules:
   • If the moonwell fills up, then the gate opens.
   • If the gate opens, then the fairies dance.
   • If the fairies dance, then the ponies run out.
   • If the ponies run out, then the flowers open.
   • If the flowers open, then the birds fly away.
   • If the drum is played, then the lanterns glow.
   
   This time, the moonwell fills up.
   
   What must happen?
   ```

   Choices: **The birds fly away.** ✓ · The lanterns glow. · The moonwell does not fill up. · The birds do not fly away.

### Zone 4

**Math**

1. `9,981 ÷ 32 = __` → **311 R 29** _(remainder entry)_  
   _4-digit ÷ 2-digit with remainder_
2. `3/6 − 1/3 = __` → **1/6** _(fraction entry)_  
   _unlike denominators (one a multiple)_
3. `2.7 × 0.5 = __` → **1.35** _(decimal entry)_  
   _decimal × decimal_

**Logic**

1. _find it: 6 items, left/right clues_

   ```
   A friendly pony is waiting by one of these flowers!
   
   Spot 1: blue flower
   Spot 2: yellow flower
   Spot 3: white flower
   Spot 4: pink flower
   Spot 5: orange flower
   Spot 6: red flower
   
   It is somewhere to the right of the orange flower.
   
   Which flower is it?
   ```

   Choices: Spot 1: blue flower · Spot 2: yellow flower · Spot 3: white flower · Spot 4: pink flower · Spot 5: orange flower · **Spot 6: red flower** ✓

2. _order 6 friends, second place_

   ```
   Use these clues:
   • Ben is heavier than Ava.
   • Dash is lighter than Hazel.
   • Hazel is lighter than Ava.
   • Ben is lighter than Gus.
   • Ivy is lighter than Ben.
   
   Who is the second heaviest?
   ```

   Choices: Ivy · Gus · Dash · **Ben** ✓ · Hazel · Ava

3. _patterns with two rules_

   ```
   What number comes next?
   
   4, 8, 9, 18, 19, __
   ```

   Choices: 39 · 20 · 37 · **38** ✓

### Zone 5

**Math**

1. `2/4 + 2/3 = __` → **1 1/6** _(fraction entry)_  
   _unlike denominators_
2. `1/2 × 2/3 = __` → **1/3** _(fraction entry)_  
   _fraction × fraction_
3. `106.2 ÷ 9 = __` → **11.8** _(decimal entry)_  
   _decimal ÷ whole number_

**Logic**

1. _order 6 friends, second place_

   ```
   Use these clues:
   • Finn is heavier than Nell.
   • Kai is not the heaviest.
   • Cleo is lighter than Nell.
   • Pip is not the heaviest.
   • Dash is lighter than Kai.
   
   Who is the heaviest?
   ```

   Choices: Kai · Dash · Pip · Nell · **Finn** ✓ · Cleo

2. _patterns with two rules_

   ```
   What number comes next?
   
   4, 8, 10, 20, 22, __
   ```

   Choices: 24 · **44** ✓ · 46 · 42

3. _who has what: 4 friends, only "not" clues_

   ```
   Each pony lives in a different place.
   To choose from: meadow, lake, cave, forest.
   
   • Oscar does not live in the meadow.
   • Ben does not live in the meadow.
   • Ben does not live in the forest.
   • Oscar does not live in the forest.
   • Oscar does not live in the lake.
   
   Who lives in the lake?
   ```

   Choices: **Ben** ✓ · Oscar · Dash · Milo

### Zone 6

**Math**

1. `2 2/4 − 1 1/2 = __` → **1** _(fraction entry)_  
   _mixed numbers, unlike denominators_
2. `3 × [9 + (7 × 4)] = __` → **111**  
   _nested parentheses_
3. `7.2 ÷ 0.6 = __` → **12** _(decimal entry)_  
   _decimal ÷ decimal_

**Logic**

1. _who has what: 4 friends, only "not" clues_

   ```
   Each friend has a different pet.
   To choose from: fish, bunny, cat, dog.
   
   • Dash does not have the dog.
   • Dash does not have the bunny.
   • Dash does not have the fish.
   
   Who has the cat?
   ```

   Choices: Luna · Ivy · Milo · **Dash** ✓

2. _order 6 friends, second place_

   ```
   Use these clues:
   • Milo is taller than Ella.
   • Nell is not the shortest.
   • Ella is shorter than Jett.
   • Hazel is taller than Jett.
   • Finn is taller than Hazel.
   
   Who is the shortest?
   ```

   Choices: Finn · Milo · **Ella** ✓ · Nell · Hazel · Jett

3. _patterns with two rules_

   ```
   What number comes next?
   
   5, 29, 10, 24, 15, __
   ```

   Choices: 14 · 24 · **19** ✓ · 10
