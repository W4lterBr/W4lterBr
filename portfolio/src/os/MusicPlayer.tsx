import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

/**
 * Player do topo, ligado ao Spotify pela API oficial de incorporação (iFrame API).
 * Nada do Spotify é carregado até a pessoa clicar no player: o site abre leve e sem cookies de terceiros.
 * Quem não está logado no Spotify ouve as prévias das faixas; quem está logado ouve as faixas inteiras.
 */

type Controller = {
  togglePlay: () => void
  play: () => void
  addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void
}
type SpotifyApi = {
  createController: (
    el: HTMLElement,
    options: { uri: string; width: string | number; height: number },
    cb: (controller: Controller) => void,
  ) => void
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyApi) => void
  }
}

/** https://open.spotify.com/playlist/ID  ->  spotify:playlist:ID */
function toUri(url: string): string | null {
  const m = url.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/)
  return m ? `spotify:${m[1]}:${m[2]}` : null
}

let apiPromise: Promise<SpotifyApi> | null = null
function loadApi(): Promise<SpotifyApi> {
  apiPromise ??= new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'
    script.async = true
    script.onerror = () => {
      apiPromise = null
      reject(new Error('spotify'))
    }
    document.head.appendChild(script)
  })
  return apiPromise
}

type Status = 'idle' | 'loading' | 'ready' | 'error'

export function MusicPlayer() {
  const uri = toUri(profile.music.spotify)
  const [status, setStatus] = useState<Status>('idle')
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const controller = useRef<Controller | null>(null)
  const playWhenReady = useRef(false)

  const start = () => {
    if (status !== 'idle' && status !== 'error') return
    if (!uri || !hostRef.current) return
    setStatus('loading')
    // O Spotify troca o elemento por um iframe; por isso ele é criado aqui, fora do controle do React.
    const slot = document.createElement('div')
    hostRef.current.replaceChildren(slot)
    loadApi()
      .then((api) => {
        api.createController(slot, { uri, width: '100%', height: 352 }, (ctrl) => {
          controller.current = ctrl
          ctrl.addListener('ready', () => {
            setStatus('ready')
            if (playWhenReady.current) ctrl.play()
          })
          ctrl.addListener('playback_update', (e) => setPlaying(!e.data.isPaused))
        })
      })
      .catch(() => setStatus('error'))
  }

  const togglePlay = () => {
    if (controller.current && status === 'ready') {
      controller.current.togglePlay()
      return
    }
    playWhenReady.current = true
    start()
  }

  const toggleOpen = () => {
    setOpen((o) => !o)
    start()
  }

  // Fecha o painel com Esc ou clique fora. (Em captura, para o Esc não fechar também a janela da frente.)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  if (!uri) return null

  return (
    <div className="music" ref={rootRef}>
      <div className={`music-pill${playing ? ' is-playing' : ''}`}>
        <button type="button" className="music-info" aria-expanded={open} aria-controls="music-panel" onClick={toggleOpen}>
          <svg className="music-logo" viewBox="0 0 24 24" aria-hidden>
            <circle cx="12" cy="12" r="12" fill="#1ed760" />
            <path d="M6.200 9.300c3.700-1.100 8.300-.800 11.600 1.100M6.900 12.400c3.100-.900 6.700-.600 9.500 1M7.600 15.300c2.400-.700 5-.500 7.300.800" fill="none" stroke="#111" strokeWidth="1.700" strokeLinecap="round" />
          </svg>
          <span className="music-text">
            <span className="music-title">{profile.music.titulo}</span>
            <span className="music-sub">{playing ? 'Tocando no Spotify' : 'Spotify'}</span>
          </span>
        </button>
        <button
          type="button"
          className="music-play"
          aria-label={playing ? 'Pausar música' : 'Tocar música'}
          title={playing ? 'Pausar' : 'Tocar'}
          disabled={status === 'loading'}
          onClick={togglePlay}
        >
          {playing ? (
            <svg viewBox="0 0 12 12" aria-hidden><path d="M2.500 1.500h2.500v9H2.500zM7 1.500h2.500v9H7z" /></svg>
          ) : (
            <svg viewBox="0 0 12 12" aria-hidden><path d="M3 1.300l7.500 4.700L3 10.700z" /></svg>
          )}
        </button>
      </div>

      <div id="music-panel" className={`music-panel${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <div className="music-embed" ref={hostRef} />
        {status === 'loading' && <p className="music-note">Carregando o Spotify...</p>}
        {status === 'error' && (
          <p className="music-note">Não foi possível carregar o Spotify. Verifique a conexão e clique no player de novo.</p>
        )}
        <a className="music-link" href={profile.music.spotify} target="_blank" rel="noreferrer">
          Abrir no Spotify
        </a>
      </div>
    </div>
  )
}
