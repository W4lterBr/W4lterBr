import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import type { AppId } from './windows'

function ClockWidget() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const s = now.getSeconds()
  const m = now.getMinutes() + s / 60
  const h = (now.getHours() % 12) + m / 60
  const label = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="widget widget-clock" role="img" aria-label={`Relógio: ${label}`}>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" className="clock-face" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = ((i + 1) / 12) * Math.PI * 2
          return (
            <text key={i} x={50 + 36 * Math.sin(a)} y={50 - 36 * Math.cos(a)} className="clock-num">
              {i + 1}
            </text>
          )
        })}
        <line x1="50" y1="50" x2="50" y2="27" className="clock-hour" transform={`rotate(${h * 30} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="15" className="clock-min" transform={`rotate(${m * 6} 50 50)`} />
        <line x1="50" y1="58" x2="50" y2="13" className="clock-sec" transform={`rotate(${s * 6} 50 50)`} />
        <circle cx="50" cy="50" r="2.4" className="clock-pin" />
      </svg>
    </div>
  )
}

function CalendarWidget() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const offset = new Date(year, month, 1).getDay()
  const days = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array<null>(offset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  const monthName = today.toLocaleDateString('pt-BR', { month: 'long' })

  return (
    <div className="widget widget-cal" aria-label={`Calendário de ${monthName}`}>
      <p className="cal-month">{monthName}</p>
      <div className="cal-grid" aria-hidden>
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
          <span key={i} className="cal-dow">
            {d}
          </span>
        ))}
        {cells.map((d, i) => (
          <span key={i} className={d === today.getDate() ? 'cal-day is-today' : 'cal-day'}>
            {d ?? ''}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Widgets({ openApp }: { openApp: (id: AppId) => void }) {
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <div className="widgets">
      <section className="widget widget-profile" aria-label="Apresentação">
        <div className="profile-top">
          <span className="avatar" aria-hidden>{initials}</span>
          <div>
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-role">
              {profile.role}
              <br />
              {profile.brand}
            </p>
          </div>
        </div>
        <p className="profile-line">{profile.natureza}.</p>
        <div className="profile-actions">
          <button type="button" className="btn" onClick={() => openApp('projetos')}>
            Ver projetos
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => openApp('sobre')}>
            Sobre mim
          </button>
        </div>
      </section>

      <ClockWidget />
      <CalendarWidget />

      <section className="widget widget-stats" aria-label="Em números">
        {profile.numeros.map((n) => (
          <div key={n.rotulo}>
            <strong>{n.valor}</strong>
            <span>{n.rotulo}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
