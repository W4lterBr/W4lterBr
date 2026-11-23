export type AppId = 'sobre' | 'projetos' | 'terminal' | 'contato'

export const APP_IDS: AppId[] = ['sobre', 'projetos', 'terminal', 'contato']

export type Win = {
  id: AppId
  x: number
  y: number
  z: number
  minimized: boolean
  maximized: boolean
}

export type WinState = { wins: Win[]; top: number }

export type WinAction =
  | { type: 'open'; id: AppId; x: number; y: number }
  | { type: 'close'; id: AppId }
  | { type: 'focus'; id: AppId }
  | { type: 'minimize'; id: AppId }
  | { type: 'toggleMax'; id: AppId }
  | { type: 'move'; id: AppId; x: number; y: number }

export const initialWinState: WinState = { wins: [], top: 1 }

export function winReducer(state: WinState, action: WinAction): WinState {
  const top = state.top + 1
  const patch = (id: AppId, change: Partial<Win>) =>
    state.wins.map((w) => (w.id === id ? { ...w, ...change } : w))

  switch (action.type) {
    case 'open': {
      const existing = state.wins.find((w) => w.id === action.id)
      if (existing) return { wins: patch(action.id, { minimized: false, z: top }), top }
      const win: Win = { id: action.id, x: action.x, y: action.y, z: top, minimized: false, maximized: false }
      return { wins: [...state.wins, win], top }
    }
    case 'close':
      return { ...state, wins: state.wins.filter((w) => w.id !== action.id) }
    case 'focus':
      return { wins: patch(action.id, { z: top }), top }
    case 'minimize':
      return { ...state, wins: patch(action.id, { minimized: true }) }
    case 'toggleMax': {
      const w = state.wins.find((x) => x.id === action.id)
      return { wins: patch(action.id, { maximized: !w?.maximized, z: top }), top }
    }
    case 'move':
      return { ...state, wins: patch(action.id, { x: action.x, y: action.y }) }
  }
}

/** A janela visível mais à frente, ou undefined. */
export function topWindow(state: WinState): Win | undefined {
  return state.wins.filter((w) => !w.minimized).sort((a, b) => b.z - a.z)[0]
}
