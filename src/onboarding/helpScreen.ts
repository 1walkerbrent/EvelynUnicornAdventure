import { create } from 'zustand'
import type { HelpScreen } from './helpContent'

// Which tips the help button shows. Normally that follows the current screen;
// a battle sets 'battle' while it is mounted, since Proving Glade, Hunt, Trial
// and Champion all hold one.
export const useHelpOverride = create<{ screen: HelpScreen | null }>(() => ({ screen: null }))
