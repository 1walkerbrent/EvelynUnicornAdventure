// Help-button tips (DESIGN.md §22), keyed by screen. Two or three short
// sentences each, in simple words. 'battle' is shown on top of whichever
// screen is holding a battle (Proving Glade, Hunt, Trial, Champion).
import type { Screen } from '../state/store'

export type HelpScreen = Screen | 'slotPicker' | 'characterCreation' | 'battle'

export const HELP_TIPS: Record<HelpScreen, string[]> = {
  slotPicker: [
    'Tap an adventure to keep playing.',
    'Tap an empty slot to start a new one.',
  ],
  characterCreation: [
    'Type your name.',
    'Tap a pony to be your first friend.',
  ],
  worldMap: [
    'Tap a land to play its quests.',
    'Tap Explore to practice or hunt.',
    'Lands with a 🔒 open when you win more.',
  ],
  zone: [
    'Do the quests from top to bottom.',
    'Each quest you finish opens the next one.',
    '✅ means you finished it.',
  ],
  quest: [
    'Read the problem, then pick your answer.',
    "Wrong? That's OK, just try again.",
    'Miss three times and you get a hint.',
  ],
  exploreHub: [
    'Pick what you want to practice.',
    'Practice makes your ponies stronger.',
    'Hunt to battle a wild pony and keep it.',
  ],
  explorePractice: [
    'Solve problems to give your team XP.',
    'Practice as much as you like!',
  ],
  exploreHunt: [
    'Solve the warm-up to start the hunt.',
    'Win the battle to keep the pony.',
  ],
  // Proving Glade and the Champion go straight into battle; only the Trial
  // has a screen before it.
  provingGlade: [
    'Pick three ponies for your team.',
    '"Strong" ponies hit this team hard.',
    'Lost? Try a new team and go again.',
  ],
  trial: [
    'Pick three ponies for your team.',
    '"Strong" ponies hit this team hard.',
    'Lost? Try a new team and go again.',
  ],
  champion: [
    'Pick three ponies for your team.',
    '"Strong" ponies hit this team hard.',
    'Lost? Try a new team and go again.',
  ],
  battle: [
    'Tap a glowing pony, then tap an enemy.',
    'You can also drag from your pony to an enemy.',
    '"Super!" hits do double damage.',
  ],
  party: [
    'Tap Choose team to pick three ponies.',
    'Type Strengths shows which elements win.',
    'Use the buttons up top to sort your ponies.',
  ],
  moonwell: [
    'Pick two ponies to make an egg.',
    'Hatching costs Stardust.',
  ],
  trophies: [
    'Solve puzzles to earn Stardust.',
    'Trophies give you lots of Stardust.',
  ],
  gameComplete: [
    'You did it!',
    'Start a New Journey from the map to play again.',
  ],
}
