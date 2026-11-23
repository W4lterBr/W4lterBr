import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { site } from '../data/profile'
import { useI18n } from '../i18n'
import { getVolume, subscribeVolume } from './sounds'

/**
 * Música do sistema. O áudio vem do player oficial do SoundCloud, que fica invisível na página
 * e é comandado pela Widget API; os controles que aparecem (barra do topo e tela de bloqueio) são nossos.
 * O player é carregado em segundo plano logo depois da página, sem tocar nada: assim o nome e a capa
 * mostrados antes do play já são os da faixa que vai tocar, e não o nome da playlist.
 */

type Sound = { title: string; permalink_url: string; artwork_url: string | null; user: { username: string; avatar_url: string } }
type Widget = {
  bind: (event: string, cb: (data: { currentPosition: number; soundId?: number }) => void) => void
  toggle: () => void
  play: () => void
  next: () => void
  prev: () => void
  setVolume: (volume: number) => void
  getCurrentSound: (cb: (sound: Sound | null) => void) => void
  getDuration: (cb: (ms: number) => void) => void
}
type SoundCloud = { Widget: ((el: HTMLIFrameElement) => Widget) & { Events: Record<string, string> } }

declare global {
  interface Window {
    SC?: SoundCloud
  }
}

let scriptPromise: Promise<SoundCloud> | null = null
function loadSoundCloud(): Promise<SoundCloud> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://w.soundcloud.com/player/api.js'
    script.async = true
    script.onload = () => (window.SC ? resolve(window.SC) : reject(new Error('soundcloud')))
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('soundcloud'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

type Music = {
  status: 'idle' | 'loading' | 'ready' | 'error'
  playing: boolean
  title: string
  artist: string
  cover: string | null
  link: string
  position: number
  duration: number
  toggle: () => void
  next: () => void
  prev: () => void
}

const MusicContext = createContext<Music | null>(null)

export function useMusic(): Music {
  const value = useContext(MusicContext)
  if (!value) throw new Error('useMusic precisa estar dentro de MusicProvider')
  return value
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const source = site.music.soundcloud
  const [started, setStarted] = useState(false)
  const [status, setStatus] = useState<Music['status']>('idle')
  const [playing, setPlaying] = useState(false)
  // vazio até a primeira faixa carregar; os componentes mostram um texto neutro nesse intervalo
  const [track, setTrack] = useState({ title: '', artist: '', cover: null as string | null, link: source })
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const volume = useSyncExternalStore(subscribeVolume, getVolume)
  const frame = useRef<HTMLIFrameElement>(null)
  const widget = useRef<Widget | null>(null)
  const ready = useRef(false)
  // ação pedida antes de o player ficar pronto; é executada assim que ele carrega
  const pending = useRef<'play' | 'next' | 'prev' | null>(null)
  // id da faixa cujo nome está na tela, para perceber quando a faixa muda
  const shownId = useRef<number | null>(null)

  // Carrega o player pouco depois da página, sem tocar.
  useEffect(() => {
    const id = window.setTimeout(() => setStarted(true), 1200)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!started || !frame.current) return
    let cancelled = false
    setStatus('loading')
    loadSoundCloud()
      .then((SC) => {
        if (cancelled || !frame.current) return
        const w = SC.Widget(frame.current)
        const E = SC.Widget.Events
        widget.current = w

        const refresh = () => {
          w.getCurrentSound((s) => {
            if (!s) return
            const art = s.artwork_url ?? s.user.avatar_url
            setTrack({ title: s.title, artist: s.user.username, cover: art ? art.replace('-large', '-t200x200') : null, link: s.permalink_url })
          })
          w.getDuration(setDuration)
        }

        // O nome na tela acompanha a faixa que está tocando de fato: sempre que o id muda, busca de novo.
        const follow = (soundId?: number) => {
          if (soundId === undefined || soundId === shownId.current) return
          shownId.current = soundId
          refresh()
        }

        w.bind(E.READY, () => {
          ready.current = true
          setStatus('ready')
          w.setVolume(getVolume())
          refresh()
          if (pending.current === 'play') w.play()
          if (pending.current === 'next') w.next()
          if (pending.current === 'prev') w.prev()
          pending.current = null
        })
        w.bind(E.PLAY, (data) => {
          setPlaying(true)
          shownId.current = data.soundId ?? null
          refresh()
        })
        w.bind(E.PAUSE, () => setPlaying(false))
        w.bind(E.FINISH, () => setPlaying(false))
        w.bind(E.PLAY_PROGRESS, (data) => {
          setPosition(data.currentPosition)
          follow(data.soundId)
        })
      })
      .catch(() => setStatus('error'))
    return () => {
      cancelled = true
    }
  }, [started])

  const toggle = useCallback(() => {
    if (ready.current) widget.current?.toggle()
    else {
      pending.current = 'play'
      setStarted(true)
    }
  }, [])

  const next = useCallback(() => {
    if (ready.current) widget.current?.next()
    else {
      pending.current = 'next'
      setStarted(true)
    }
  }, [])

  const prev = useCallback(() => {
    if (ready.current) widget.current?.prev()
    else {
      pending.current = 'prev'
      setStarted(true)
    }
  }, [])

  // a música segue o volume do sistema (ícone de som da barra)
  useEffect(() => {
    widget.current?.setVolume(volume)
  }, [volume])

  const value = useMemo<Music>(
    () => ({ status, playing, ...track, position, duration, toggle, next, prev }),
    [status, playing, track, position, duration, toggle, next, prev],
  )

  const src =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(source) +
    `&start_track=${Math.max(0, site.music.comecarNaFaixa - 1)}` +
    '&auto_play=false&show_artwork=false&show_comments=false&show_user=false&show_teaser=false&visual=false'

  return (
    <MusicContext.Provider value={value}>
      {children}
      {started && (
        <iframe ref={frame} className="music-frame" src={src} title="Player do SoundCloud" allow="autoplay" tabIndex={-1} aria-hidden />
      )}
    </MusicContext.Provider>
  )
}

/* ---------- ícones ---------- */
const Play = () => <svg viewBox="0 0 12 12" aria-hidden><path d="M3 1.3l7.500 4.700L3 10.700z" /></svg>
const Pause = () => <svg viewBox="0 0 12 12" aria-hidden><path d="M2.500 1.500h2.500v9H2.500zM7 1.500h2.500v9H7z" /></svg>
const Prev = () => <svg viewBox="0 0 14 12" aria-hidden><path d="M7 6l6-4.500v9zM1 6l6-4.500v9z" /></svg>
const Next = () => <svg viewBox="0 0 14 12" aria-hidden><path d="M7 6L1 1.500v9zM13 6L7 1.500v9z" /></svg>
const Note = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M9 17.500V5.500l10-2v11.500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6.500" cy="17.500" r="2.500" fill="currentColor" />
    <circle cx="16.500" cy="15" r="2.500" fill="currentColor" />
  </svg>
)
function Cover({ src }: { src: string | null }) {
  return <span className="np-cover">{src ? <img src={src} alt="" draggable={false} /> : <Note />}</span>
}

function clock(ms: number): string {
  const total = Math.floor(ms / 1000)
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

function Controls() {
  const m = useMusic()
  const { t } = useI18n()
  return (
    <div className="np-controls">
      <button type="button" aria-label={t('music.prev')} title={t('music.prevTip')} onClick={m.prev}>
        <Prev />
      </button>
      <button type="button" className="np-play" aria-label={m.playing ? t('music.pause') : t('music.play')} title={m.playing ? t('music.pauseTip') : t('music.playTip')} onClick={m.toggle}>
        {m.playing ? <Pause /> : <Play />}
      </button>
      <button type="button" aria-label={t('music.next')} title={t('music.nextTip')} onClick={m.next}>
        <Next />
      </button>
    </div>
  )
}

function Title() {
  const m = useMusic()
  const { t } = useI18n()
  return (
    <span className="np-text">
      <a className="np-title" href={m.link} target="_blank" rel="noreferrer" title={t('music.open')}>
        {m.status === 'error' ? t('music.error') : m.title || t('music.group')}
      </a>
      <span className="np-artist">{m.artist || (m.status === 'loading' ? t('music.loading') : 'SoundCloud')}</span>
    </span>
  )
}

/** Player compacto do centro da barra do topo. */
export function BarPlayer() {
  const m = useMusic()
  const { t } = useI18n()
  return (
    <div className={`np np-bar${m.playing ? ' is-playing' : ''}`} role="group" aria-label={t('music.group')}>
      <Cover src={m.cover} />
      <Title />
      <Controls />
    </div>
  )
}

/** Cartão de música da tela de bloqueio, com barra de progresso. */
export function LockPlayer() {
  const m = useMusic()
  const { t } = useI18n()
  const pct = m.duration > 0 ? Math.min(100, (m.position / m.duration) * 100) : 0
  return (
    <div className={`np np-lock${m.playing ? ' is-playing' : ''}`} role="group" aria-label={t('music.group')}>
      <div className="np-row">
        <Cover src={m.cover} />
        <Title />
      </div>
      <Controls />
      <div className="np-progress">
        <span>{clock(m.position)}</span>
        <div className="np-track" role="progressbar" aria-label={t('music.progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
          <div style={{ width: `${pct}%` }} />
        </div>
        <span>{clock(m.duration)}</span>
      </div>
    </div>
  )
}
