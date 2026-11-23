import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { LockPlayer } from './music'
import { useClock } from './useClock'
import { Wallpaper } from './Wallpaper'

/**
 * Tela de bloqueio. Qualquer interação fora do player abre: clique, toque, tecla, rolagem ou deslizar.
 * O rodapé é um <button> de verdade, então Enter e Espaço funcionam e leitores de tela anunciam a ação.
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
      if (e.metaKey || e.ctrlKey || e.altKey || e.key === 'Tab' || e.key === 'Shift') return
      // teclas dentro do player controlam a música, não desbloqueiam
      if ((e.target as HTMLElement).closest?.('.np')) return
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
    <div className={`lock${leaving ? ' is-leaving' : ''}`} onClick={unlock}>
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

      <button ref={ref} type="button" className="lock-foot" onClick={unlock}>
        <span className="lock-hint">Clique ou deslize para cima para desbloquear</span>
        <span className="lock-handle" aria-hidden />
      </button>
    </div>
  )
}
