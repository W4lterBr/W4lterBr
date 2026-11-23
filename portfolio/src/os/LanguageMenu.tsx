import { useEffect, useRef, useState } from 'react'
import { LANGS, useI18n } from '../i18n'
import type { Lang } from '../data/profile'
import { Logo } from './icons'
import { playSound } from './sounds'

/**
 * Bandeiras desenhadas em SVG: os emojis de bandeira não aparecem no Windows
 * (lá viram as letras "BR" e "US"), então o desenho garante o mesmo resultado em qualquer sistema.
 */
function Flag({ lang }: { lang: Lang }) {
  if (lang === 'pt') {
    return (
      <svg className="flag" viewBox="0 0 28 20" aria-hidden>
        <rect width="28" height="20" fill="#009c3b" />
        <path d="M14 2.600L25 10 14 17.400 3 10z" fill="#ffdf00" />
        <circle cx="14" cy="10" r="4.300" fill="#002776" />
        <path d="M9.900 9.100c2.900-.600 5.900.100 8.300 1.900" fill="none" stroke="#fff" strokeWidth="0.900" />
      </svg>
    )
  }
  return (
    <svg className="flag" viewBox="0 0 28 20" aria-hidden>
      <rect width="28" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="12" height={(20 / 13) * 7} fill="#3c3b6e" />
      {[2, 5, 8].map((y) => [2, 5, 8, 10.500].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.650" fill="#fff" />))}
    </svg>
  )
}

/** O logo da barra abre o menu de idioma. A troca vale na hora para toda a interface. */
export function LanguageMenu() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  // Fecha com Esc ou clique fora. (Em captura, para o Esc não fechar também a janela da frente.)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setOpen(false)
    }
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const choose = (next: Lang) => {
    if (next !== lang) {
      setLang(next)
      playSound('open')
    }
    setOpen(false)
  }

  return (
    <div className="lang" ref={root}>
      <button type="button" className="bar-btn lang-btn" aria-haspopup="menu" aria-expanded={open} aria-controls="lang-menu" aria-label={t('lang.open')} title={t('lang.title')} onClick={() => setOpen((o) => !o)}>
        <Logo size={18} />
      </button>

      <div id="lang-menu" className={`pop pop-left lang-pop${open ? ' is-open' : ''}`} role="menu" aria-label={t('lang.title')} inert={!open}>
        <p className="lang-head">{t('lang.title')}</p>
        {LANGS.map((l) => (
          <button key={l.id} type="button" className="lang-item" role="menuitemradio" aria-checked={l.id === lang} onClick={() => choose(l.id)}>
            <Flag lang={l.id} />
            <span>{l.name}</span>
            {l.id === lang && (
              <svg className="lang-check" viewBox="0 0 16 16" aria-hidden>
                <path d="M3 8.500l3.300 3.300L13 4.500" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
