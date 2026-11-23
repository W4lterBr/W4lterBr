import { useCallback, useEffect, useReducer, useState, type ReactNode } from 'react'
import { Contato } from './apps/Contato'
import { Projetos } from './apps/Projetos'
import { Sobre } from './apps/Sobre'
import { Terminal } from './apps/Terminal'
import { profile } from './data/profile'
import { AppIcon, GitHubIcon, Logo } from './os/icons'
import { LockScreen } from './os/LockScreen'
import { BarPlayer, MusicProvider } from './os/music'
import { playSound } from './os/sounds'
import { Battery, SoundToggle, Wifi } from './os/StatusIcons'
import { useClock } from './os/useClock'
import { Wallpaper } from './os/Wallpaper'
import { Widgets } from './os/Widgets'
import { Window } from './os/Window'
import { APP_IDS, initialWinState, topWindow, winReducer, type AppId } from './os/windows'

const APPS: Record<AppId, { label: string; title: string; w: number; h: number }> = {
  sobre: { label: 'Sobre mim', title: 'Sobre mim', w: 760, h: 620 },
  projetos: { label: 'Projetos', title: 'Projetos', w: 860, h: 560 },
  terminal: { label: 'Terminal', title: 'Terminal', w: 640, h: 420 },
  contato: { label: 'Contato', title: 'Contato', w: 520, h: 420 },
}

const isMobile = () => window.matchMedia('(max-width: 720px)').matches

/** Janela pedida pelo endereço, ex.: .../#projetos abre direto em Projetos, sem tela de bloqueio. */
function appFromHash(): AppId | undefined {
  const id = window.location.hash.slice(1)
  return APP_IDS.find((a) => a === id)
}

type Toast = { id: number; title: string; text: string }

export default function App() {
  const [state, dispatch] = useReducer(winReducer, initialWinState)
  const [locked, setLocked] = useState(() => !appFromHash())
  const [toast, setToast] = useState<Toast | null>(null)
  const [projectRequest, setProjectRequest] = useState<{ id: string; n: number }>()
  const now = useClock()
  const top = topWindow(state)

  /** Mostra um aviso no canto, com som. Some sozinho depois de alguns segundos. */
  const notify = useCallback((title: string, text: string) => {
    setToast({ id: Date.now(), title, text })
    playSound('notify')
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 8000)
    return () => window.clearTimeout(id)
  }, [toast])

  const openApp = useCallback((id: AppId) => {
    const app = APPS[id]
    const step = APP_IDS.indexOf(id) * 28
    const x = Math.max(16, Math.round((window.innerWidth - app.w) / 2) + step - 40)
    const y = Math.max(44, Math.round((window.innerHeight - app.h) / 2) + step - 60)
    dispatch({ type: 'open', id, x, y })
    playSound('open')
  }, [])

  const openProject = useCallback(
    (id: string) => {
      setProjectRequest((prev) => ({ id, n: (prev?.n ?? 0) + 1 }))
      openApp('projetos')
    },
    [openApp],
  )

  const closeApp = useCallback((id: AppId) => {
    dispatch({ type: 'close', id })
    playSound('close')
    // devolve o foco ao botão do dock, para quem navega pelo teclado
    document.querySelector<HTMLElement>(`[data-dock="${id}"]`)?.focus()
  }, [])

  const unlock = useCallback(() => {
    playSound('unlock')
    setLocked(false)
  }, [])

  // Ao desbloquear: abre a janela pedida no endereço, ou mostra o aviso de boas-vindas.
  useEffect(() => {
    if (locked) return
    const wanted = appFromHash()
    if (wanted) {
      openApp(wanted)
      return
    }
    const id = window.setTimeout(
      () => notify('Bem-vindo ao meu portfólio', 'Os aplicativos ficam no dock aqui embaixo. Fique à vontade para explorar.'),
      650,
    )
    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked])

  // No celular a janela ocupa a tela toda: o aviso sai para não cobrir os botões dela.
  useEffect(() => {
    if (top && isMobile()) setToast(null)
  }, [top])

  // Voltar/avançar do navegador ou um link #janela com o site já aberto.
  useEffect(() => {
    const onHash = () => {
      const wanted = appFromHash()
      if (!wanted) return
      setLocked(false)
      openApp(wanted)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [openApp])

  // O endereço acompanha a janela da frente, para o link poder ser copiado e enviado.
  useEffect(() => {
    if (locked) return
    const url = top ? `#${top.id}` : window.location.pathname + window.location.search
    window.history.replaceState(null, '', url)
  }, [top?.id, locked])

  useEffect(() => {
    if (locked) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && top) closeApp(top.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [locked, top, closeApp])

  const content: Record<AppId, ReactNode> = {
    sobre: <Sobre />,
    projetos: <Projetos request={projectRequest} />,
    terminal: <Terminal openApp={openApp} openProject={openProject} />,
    contato: <Contato />,
  }

  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  // mesmo formato do relógio do macOS: dom. 22 de nov.
  const date = now.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '')

  return (
    <MusicProvider>
      <Wallpaper />

      <div className="os" inert={locked}>
        <header className="bar">
          <div className="bar-left">
            <Logo size={18} />
            <span className="bar-brand">{top ? APPS[top.id].title : 'DWM OS'}</span>
            <nav className="bar-menu" aria-label="Menu">
              {APP_IDS.map((id) => (
                <button key={id} type="button" onClick={() => openApp(id)}>
                  {APPS[id].label}
                </button>
              ))}
            </nav>
          </div>

          <BarPlayer />

          <div className="bar-right">
            <Battery notify={notify} />
            <Wifi notify={notify} />
            <SoundToggle />
            <time className="bar-clock" dateTime={now.toISOString()}>
              <span className="bar-date">{date}</span>
              <span>{time}</span>
            </time>
          </div>
        </header>

        <main className="desk">
          <Widgets openApp={openApp} />

          {toast && (
            <div className="toast" role="status" key={toast.id}>
              <span className="toast-icon" aria-hidden>
                <AppIcon id="contato" />
              </span>
              <div className="toast-text">
                <strong>{toast.title}</strong>
                <span>{toast.text}</span>
              </div>
              <button type="button" className="toast-close" aria-label="Fechar aviso" onClick={() => setToast(null)}>
                <svg viewBox="0 0 10 10" aria-hidden><path d="M2 2l6 6M8 2L2 8" /></svg>
              </button>
            </div>
          )}

          {state.wins.map((win) => (
            <Window
              key={win.id}
              win={win}
              title={APPS[win.id].title}
              width={APPS[win.id].w}
              height={APPS[win.id].h}
              active={top?.id === win.id}
              dispatch={(action) => (action.type === 'close' ? closeApp(action.id) : dispatch(action))}
            >
              {content[win.id]}
            </Window>
          ))}
        </main>

        <nav className="dock" aria-label="Aplicativos">
          <div className="dock-shelf">
            {APP_IDS.map((id) => {
              const win = state.wins.find((w) => w.id === id)
              return (
                <button
                  key={id}
                  type="button"
                  className="dock-item"
                  data-dock={id}
                  data-open={win ? '' : undefined}
                  aria-pressed={top?.id === id}
                  onClick={() => (top?.id === id ? dispatch({ type: 'minimize', id }) : openApp(id))}
                >
                  <span className={`dock-tile tile-${id}`}>
                    <AppIcon id={id} />
                  </span>
                  <span className="dock-label">{APPS[id].label}</span>
                </button>
              )
            })}
            <span className="dock-sep" aria-hidden />
            <a className="dock-item" href={profile.contact.github} target="_blank" rel="noreferrer">
              <span className="dock-tile tile-github">
                <GitHubIcon />
              </span>
              <span className="dock-label">GitHub</span>
            </a>
          </div>
        </nav>
      </div>

      {locked && <LockScreen onUnlock={unlock} />}
    </MusicProvider>
  )
}
