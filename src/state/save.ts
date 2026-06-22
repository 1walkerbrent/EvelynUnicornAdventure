import type { Creature } from '../engine/types'

export interface SaveData {
  version: 1
  playerName: string
  party: Creature[]
  badges: number
}

const SAVE_KEY = 'evelyn_unicorn_adventure_v1'
const VERSION = 1 as const

export function saveGame(data: Omit<SaveData, 'version'>): void {
  const payload: SaveData = { version: VERSION, ...data }
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload))
}

export function loadGame(): Omit<SaveData, 'version'> | null {
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
      playerName: d.playerName ?? '',
      party: d.party ?? [],
      badges: d.badges ?? 0,
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
