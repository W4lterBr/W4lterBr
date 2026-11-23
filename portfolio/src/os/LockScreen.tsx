import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useClock } from './useClock'

/**
 * Tela de bloqueio. Qualquer interação abre: clique, toque, tecla, rolagem ou deslizar.
 * É um <button> de verdade, então Enter e Espaço funcionam e leitores de tela anunciam a ação.
 */
export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const now = useClock()
  const [leaving, setLeaving] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const unlock = () => {
    if (leaving) return
    setLeaving(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(onUnlock, reduce ? 0 : 420)
  }

  useEffect(() => {
    ref.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === 'Tab') return
      unlock()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', unlock, { passive: true })
    window.addEventListener('touchmove', unlock, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', unlock)
      window.removeEventListener('touchmove', unlock)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving])

  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <button ref={ref} type="button" className={`lock${leaving ? ' is-leaving' : ''}`} onClick={unlock}>
      <span className="lock-clock">
        <span className="lock-date">{date}</span>
        <span className="lock-time">{time}</span>
      </span>

      <span className="lock-card">
        <span className="avatar" aria-hidden>{initials}</span>
        <span className="lock-card-text">
          <span className="lock-name">{profile.name}</span>
          <span className="lock-role">
            {profile.role}, {profile.brand}
          </span>
        </span>
      </span>

      <span className="lock-foot">
        <span className="lock-hint">Clique ou deslize para cima para desbloquear</span>
        <span className="lock-handle" aria-hidden />
      </span>
    </button>
  )
}
