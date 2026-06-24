import type { Creature } from '../engine/types'

export interface SaveData {
  version: 2
  playerName: string
  party: Creature[]
  badges: number
  brindlewoodDone: boolean
  sunflowerDone: boolean
  zone1Complete: boolean
  zone2Unlocked: boolean
}

const SAVE_KEY = 'evelyn_unicorn_adventure'
const VERSION = 2 as const

type PersistedState = Omit<SaveData, 'version'>

export function saveGame(data: PersistedState): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify({ version: VERSION, ...data }))
}

export function loadGame(): PersistedState | null {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      (parsed as SaveData).version !== VERSION
    ) {
      return null
    }
    const d = parsed as SaveData
    return {
      playerName:      d.playerName      ?? '',
      party:           d.party           ?? [],
      badges:          d.badges          ?? 0,
      brindlewoodDone: d.brindlewoodDone ?? false,
      sunflowerDone:   d.sunflowerDone   ?? false,
      zone1Complete:   d.zone1Complete   ?? false,
      zone2Unlocked:   d.zone2Unlocked   ?? false,
    }
  } catch {
    return null
  }
}

export function exportSave(): void {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return
  const blob = new Blob([raw], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'evelyn-adventure-save.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY)
}

export function importSave(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const parsed: unknown = JSON.parse(e.target?.result as string)
        if (
          typeof parsed !== 'object' ||
          parsed === null ||
          (parsed as SaveData).version !== VERSION
        ) {
          resolve(false)
          return
        }
        localStorage.setItem(SAVE_KEY, JSON.stringify(parsed))
        resolve(true)
      } catch {
        resolve(false)
      }
    }
    reader.readAsText(file)
  })
}
