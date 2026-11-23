import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { isMuted, playSound, setMuted, subscribeMuted } from './sounds'

type Notify = (title: string, text: string) => void

const DRAIN_EVERY_MS = 15_000 // 1% a cada 15 s: de 100% ao mínimo em uns 24 minutos
const FLOOR = 4

/** Bateria de enfeite: esgota devagar e recarrega com um clique. */
export function Battery({ notify }: { notify: Notify }) {
  const [level, setLevel] = useState(100)
  const [charging, setCharging] = useState(false)
  const warned = useRef(false)

  useEffect(() => {
    if (charging) {
      const id = window.setInterval(() => {
        setLevel((l) => {
          if (l >= 100) {
            setCharging(false)
            return 100
          }
          return Math.min(100, l + 2)
        })
      }, 40)
      return () => window.clearInterval(id)
    }
    const id = window.setInterval(() => setLevel((l) => Math.max(FLOOR, l - 1)), DRAIN_EVERY_MS)
    return () => window.clearInterval(id)
  }, [charging])

  useEffect(() => {
    if (level > 20) warned.current = false
    if (level <= 15 && !warned.current && !charging) {
      warned.current = true
      notify('Bateria fraca', `Restam ${level}%. Clique na bateria para recarregar.`)
    }
  }, [level, charging, notify])

  const recharge = () => {
    if (charging || level >= 100) return
    playSound('charge')
    setCharging(true)
  }

  const low = level <= 20 && !charging
  return (
    <button
      type="button"
      className={`bar-btn bar-battery${low ? ' is-low' : ''}${charging ? ' is-charging' : ''}`}
      aria-label={`Bateria em ${level}%. Clique para recarregar.`}
      title={charging ? 'Recarregando...' : `Bateria: ${level}%. Clique para recarregar`}
      onClick={recharge}
    >
      <span className="bar-battery-pct">{level}%</span>
      <svg viewBox="0 0 28 13" aria-hidden>
        <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity="0.45" />
        <rect className="bar-battery-fill" x="2" y="2" width={Math.max(1.5, (20 * level) / 100)} height="9" rx="2" />
        <path d="M25 4.5v4c.9-.3 1.500-1.100 1.500-2s-.600-1.700-1.500-2z" fill="currentColor" opacity="0.5" />
        {charging && <path className="bar-battery-bolt" d="M13.200 1.800L9 7h3l-1.200 4.200L15 6h-3z" />}
      </svg>
    </button>
  )
}

type NetInfo = { effectiveType?: string; downlink?: number; addEventListener?: (t: string, cb: () => void) => void; removeEventListener?: (t: string, cb: () => void) => void }

/** Wi-Fi: reflete a conexão de verdade (online/offline e velocidade estimada) e pulsa de tempos em tempos. */
export function Wifi({ notify }: { notify: Notify }) {
  const [online, setOnline] = useState(() => navigator.onLine)
  const [, refresh] = useState(0)
  const net = (navigator as Navigator & { connection?: NetInfo }).connection

  useEffect(() => {
    const on = () => {
      setOnline(true)
      notify('Conexão restabelecida', 'Você está online de novo.')
    }
    const off = () => {
      setOnline(false)
      notify('Sem conexão', 'A internet caiu. O que já carregou continua funcionando.')
    }
    const change = () => refresh((n) => n + 1)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    net?.addEventListener?.('change', change)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
      net?.removeEventListener?.('change', change)
    }
  }, [net, notify])

  // força do sinal a partir da velocidade estimada pelo navegador (quando ele informa)
  const down = net?.downlink
  const bars = !online ? 0 : down === undefined ? 3 : down >= 5 ? 3 : down >= 1.5 ? 2 : 1
  const detail = !online
    ? 'Sem conexão'
    : `Conectado${net?.effectiveType ? ` (${net.effectiveType.toUpperCase()})` : ''}${down ? `, cerca de ${down} Mb/s` : ''}`

  return (
    <span className={`bar-wifi${online ? '' : ' is-off'}`} data-bars={bars} role="img" aria-label={`Wi-Fi: ${detail}`} title={`Wi-Fi: ${detail}`}>
      <svg viewBox="0 0 18 14">
        <path className="wifi-arc wifi-3" d="M1 4.800a11.500 11.500 0 0 1 16 0" />
        <path className="wifi-arc wifi-2" d="M3.700 7.500a7.700 7.700 0 0 1 10.600 0" />
        <path className="wifi-arc wifi-1" d="M6.400 10.200a3.800 3.800 0 0 1 5.200 0" />
        <circle className="wifi-dot" cx="9" cy="12.300" r="1.200" />
        {!online && <path className="wifi-slash" d="M2.500 1.500l13 11.500" />}
      </svg>
    </span>
  )
}

/** Liga e desliga os sons da interface (avisos, abrir e fechar janelas). A música tem controle próprio no player. */
export function SoundToggle() {
  const muted = useSyncExternalStore(subscribeMuted, isMuted)
  const toggle = () => {
    setMuted(!muted)
    if (muted) playSound('open')
  }
  return (
    <button type="button" className="bar-btn bar-sound" aria-pressed={!muted} aria-label={muted ? 'Ligar sons do sistema' : 'Desligar sons do sistema'} title={muted ? 'Sons do sistema desligados' : 'Sons do sistema ligados'} onClick={toggle}>
      <svg viewBox="0 0 16 12" aria-hidden>
        <path d="M1 4h2.500L7 1v10L3.500 8H1z" fill="currentColor" />
        {muted ? (
          <path d="M10 3.500l4 5M14 3.500l-4 5" fill="none" stroke="currentColor" strokeWidth="1.500" strokeLinecap="round" />
        ) : (
          <path d="M9.500 3.500a3.500 3.500 0 0 1 0 5M11.500 1.500a6 6 0 0 1 0 9" fill="none" stroke="currentColor" strokeWidth="1.400" strokeLinecap="round" />
        )}
      </svg>
    </button>
  )
}
