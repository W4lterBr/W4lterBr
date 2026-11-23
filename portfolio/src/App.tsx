import { useCallback, useEffect, useReducer, useState, type ReactNode } from 'react'
import { Contato } from './apps/Contato'
import { Projetos } from './apps/Projetos'
import { Sobre } from './apps/Sobre'
import { Terminal } from './apps/Terminal'
import { useI18n } from './i18n'
import { AppIcon, GitHubIcon } from './os/icons'
import { LanguageMenu } from './os/LanguageMenu'
import { LockScreen } from './os/LockScreen'
import { BarPlayer, MusicProvider } from './os/music'
import { playSound } from './os/sounds'
import { Battery, VolumeControl, Wifi } from './os/StatusIcons'
import { useClock } from './os/useClock'
import { Wallpaper } from './os/Wallpaper'
import { Widgets } from './os/Widgets'
import { Window } from './os/Window'
import { APP_IDS, initialWinState, topWindow, winReducer, type AppId } from './os/windows'

// Tamanho inicial de cada janela. Os nomes vêm das traduções (app.sobre, app.projetos...).
const APPS: Record<AppId, { w: number; h: number }> = {
  sobre: { w: 800, h: 660 },
  projetos: { w: 920, h: 620 },
  terminal: { w: 640, h: 420 },
  contato: { w: 520, h: 420 },
}

const isMobile = () => window.matchMedia('(max-width: 720px)').matches

/** Janela pedida pelo endereço, ex.: .../#projetos abre direto em Projetos, sem tela de bloqueio. */
function appFromHash(): AppId | undefined {
  const id = window.location.hash.slice(1)
  return APP_IDS.find((a) => a === id)
}

type Toast = { id: number; title: string; text: string }

export default function App() {
  const { t, locale, content: data } = useI18n()
  const [state, dispatch] = useReducer(winReducer, initialWinState)
  const [locked, setLocked] = useState(() => !appFromHash())
  const [toast, setToast] = useState<Toast | null>(null)
  const [projectRequest, setProjectRequest] = useState<{ id: string; n: number }>()
  // janelas que estão saindo de cena (animação de fechar ou minimizar em andamento)
  const [leaving, setLeaving] = useState<Partial<Record<AppId, 'close' | 'min'>>>({})
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
    setLeaving((l) => ({ ...l, [id]: undefined }))
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

  /** Tira a janela de cena com animação e só então aplica a ação. */
  const leave = useCallback((id: AppId, how: 'close' | 'min') => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setLeaving((l) => ({ ...l, [id]: how }))
    window.setTimeout(
      () => {
        dispatch({ type: how === 'close' ? 'close' : 'minimize', id })
        setLeaving((l) => ({ ...l, [id]: undefined }))
        // devolve o foco ao botão do dock, para quem navega pelo teclado
        document.querySelector<HTMLElement>(`[data-dock="${id}"]`)?.focus()
      },
      reduce ? 0 : how === 'close' ? 170 : 240,
    )
  }, [])

  const closeApp = useCallback(
    (id: AppId) => {
      playSound('close')
      leave(id, 'close')
    },
    [leave],
  )

  const minimizeApp = useCallback((id: AppId) => leave(id, 'min'), [leave])

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
      () => notify(t('welcome.title'), t('welcome.text')),
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
    sobre: <Sobre openApp={openApp} />,
    projetos: <Projetos request={projectRequest} />,
    terminal: <Terminal openApp={openApp} openProject={openProject} />,
    contato: <Contato />,
  }

  const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  // mesmo formato do relógio do macOS: dom. 22 de nov.
  const date = now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '')

  return (
    <MusicProvider>
      <Wallpaper />

      <div className="os" inert={locked}>
        <header className="bar">
          <div className="bar-left">
            <LanguageMenu />
            <span className="bar-brand">{top ? t(`app.${top.id}`) : 'DWM OS'}</span>
            <nav className="bar-menu" aria-label={t('bar.menu')}>
              {APP_IDS.map((id) => (
                <button key={id} type="button" onClick={() => openApp(id)}>
                  {t(`app.${id}`)}
                </button>
              ))}
            </nav>
          </div>

          <BarPlayer />

          <div className="bar-right">
            <Battery notify={notify} />
            <Wifi notify={notify} />
            <VolumeControl />
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
              <button type="button" className="toast-close" aria-label={t('toast.close')} onClick={() => setToast(null)}>
                <svg viewBox="0 0 10 10" aria-hidden><path d="M2 2l6 6M8 2L2 8" /></svg>
              </button>
            </div>
          )}

          {state.wins.map((win) => (
            <Window
              key={win.id}
              win={win}
              title={t(`app.${win.id}`)}
              width={APPS[win.id].w}
              height={APPS[win.id].h}
              active={top?.id === win.id}
              leaving={leaving[win.id]}
              dispatch={(action) =>
                action.type === 'close' ? closeApp(action.id) : action.type === 'minimize' ? minimizeApp(action.id) : dispatch(action)
              }
            >
              {content[win.id]}
            </Window>
          ))}
        </main>

        <nav className="dock" aria-label={t('dock.label')}>
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
                  onClick={() => (top?.id === id ? minimizeApp(id) : openApp(id))}
                >
                  <span className={`dock-tile tile-${id}`}>
                    <AppIcon id={id} />
                  </span>
                  <span className="dock-label">{t(`app.${id}`)}</span>
                </button>
              )
            })}
            <span className="dock-sep" aria-hidden />
            <a className="dock-item" href={data.profile.contact.github} target="_blank" rel="noreferrer">
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
