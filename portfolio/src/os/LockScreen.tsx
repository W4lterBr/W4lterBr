import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { profile } from '../data/profile'
import { LockPlayer } from './music'
import { useClock } from './useClock'
import { Wallpaper } from './Wallpaper'

const UNLOCK_AT = -90 // arrastar mais que isso para cima desbloqueia
const DRAG_START = -6 // abaixo disso ainda conta como clique

/**
 * Tela de bloqueio. Abre com clique, toque, tecla, rolagem ou arrastando para cima
 * (a tela acompanha o arrasto). Interações dentro do player controlam a música e não desbloqueiam.
 * O rodapé é um <button> de verdade, então Enter e Espaço funcionam e leitores de tela anunciam a ação.
 */
export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useClock()
  const [leaving, setLeaving] = useState(false)
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLButtonElement>(null)
  const startY = useRef<number | null>(null)
  const dragged = useRef(false)

  const unlock = () => {
    if (leaving) return
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onUnlock, reduce ? 0 : 420)
  }

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === 'Tab' || e.key === 'Shift') return
      // teclas dentro do player controlam a música, não desbloqueiam
      if ((e.target as HTMLElement).closest?.('.np')) return
      unlock()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', unlock, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', unlock)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.np')) return
    startY.current = e.clientY
    dragged.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (startY.current === null) return
    const dy = Math.min(0, e.clientY - startY.current)
    if (dy < DRAG_START) dragged.current = true
    setOffset(dy)
  }

  const onPointerEnd = () => {
    if (startY.current === null) return
    startY.current = null
    if (offset < UNLOCK_AT) unlock()
    else setOffset(0)
  }

  const onClick = () => {
    // um arrasto curto que voltou ao lugar não conta como clique
    if (dragged.current) {
      dragged.current = false
      return
    }
    unlock()
  }

  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)
  const dragging = !leaving && offset < 0

  return (
    <div
      className={`lock${leaving ? ' is-leaving' : ''}${dragging ? ' is-dragging' : ''}`}
      style={dragging ? { transform: `translateY(${offset}px)` } : undefined}
      onClick={onClick}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <Wallpaper className="wallpaper-lock" />

      <div className="lock-clock">
        <p className="lock-date">{date}</p>
        <p className="lock-time">{time}</p>
      </div>

      <div className="lock-cards">
        <div className="lock-card">
          <span className="avatar" aria-hidden>{initials}</span>
          <div>
            <p className="lock-name">{profile.name}</p>
            <p className="lock-role">
              {profile.role}, {profile.brand}
            </p>
          </div>
        </div>
        {/* cliques no player controlam a música e não desbloqueiam */}
        <div onClick={(e) => e.stopPropagation()}>
          <LockPlayer />
        </div>
      </div>

      <button ref={ref} type="button" className="lock-foot" onClick={onClick}>
        <span className="lock-hint">Clique ou deslize para cima para desbloquear</span>
        <span className="lock-handle" aria-hidden />
      </button>
    </div>
  )
}
