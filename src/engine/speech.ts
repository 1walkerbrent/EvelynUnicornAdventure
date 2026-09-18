// Text-to-speech for the spelling puzzles, built on the browser's built-in Web
// Speech API. Deliberately asset-free: no audio files to record, ship, or cache,
// and the voices come from the device's OS.
//
// iOS/Safari only starts speech from inside a user gesture — every call site here
// is a button tap, which satisfies that. Nothing ever auto-speaks on mount.

/** Normal reading pace — still a little slower than default, for a 9-year-old. */
export const RATE_NORMAL = 0.85
/** "Slower" button — slow enough to sound out, not so slow it distorts. */
export const RATE_SLOW = 0.5

function synth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null
  return window.speechSynthesis ?? null
}

/**
 * Whether this device can speak at all. Used to drop spelling from the puzzle
 * rotation rather than serving a puzzle she has no way to hear.
 *
 * Checks the API surface, not `getVoices()`, because voices load asynchronously
 * and are commonly empty on the first call.
 */
export function isSpeechAvailable(): boolean {
  return synth() !== null && typeof window.SpeechSynthesisUtterance === 'function'
}

/** Prefer a local (offline) English voice; fall back to any English voice. */
function pickVoice(s: SpeechSynthesis): SpeechSynthesisVoice | null {
  const voices = s.getVoices()
  if (voices.length === 0) return null
  const english = voices.filter(v => v.lang?.toLowerCase().startsWith('en'))
  const pool = english.length > 0 ? english : voices
  return pool.find(v => v.localService) ?? pool[0]
}

/**
 * Speak `text`, cancelling anything already in flight so repeated taps on the
 * replay button restart the word instead of queueing up a backlog.
 */
export function speak(text: string, rate: number = RATE_NORMAL): void {
  const s = synth()
  if (!s || typeof window.SpeechSynthesisUtterance !== 'function') return

  s.cancel()
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.rate = rate
  utterance.pitch = 1.1   // a touch bright, to match the game's tone
  utterance.lang = 'en-US'
  const voice = pickVoice(s)
  if (voice) utterance.voice = voice
  s.speak(utterance)
}

/** Stop any in-flight speech — called when a puzzle unmounts. */
export function cancelSpeech(): void {
  synth()?.cancel()
}
