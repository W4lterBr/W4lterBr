import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useI18n, type UIKey } from '../i18n'
import { APP_IDS, type AppId } from '../os/windows'

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: string }

type Props = {
  openApp: (id: AppId) => void
  openProject: (id: string) => void
}

// Os comandos funcionam nos dois idiomas, qualquer que seja o idioma da interface.
const HELP: { pt: string; en: string; key: UIKey }[] = [
  { pt: 'ajuda', en: 'help', key: 'term.help.ajuda' },
  { pt: 'sobre', en: 'about', key: 'term.help.sobre' },
  { pt: 'projetos', en: 'projects', key: 'term.help.projetos' },
  { pt: 'abrir <nome>', en: 'open <name>', key: 'term.help.abrir' },
  { pt: 'skills', en: 'skills', key: 'term.help.skills' },
  { pt: 'contato', en: 'contact', key: 'term.help.contato' },
  { pt: 'sefaz', en: 'sefaz', key: 'term.help.sefaz' },
  { pt: 'emitir', en: 'issue', key: 'term.help.emitir' },
  { pt: 'limpar', en: 'clear', key: 'term.help.limpar' },
]

/** Nomes de janela aceitos em "abrir", nos dois idiomas. */
const APP_ALIASES: Record<string, AppId> = { about: 'sobre', projects: 'projetos', contact: 'contato' }

export function Terminal({ openApp, openProject }: Props) {
  const { t, lang, content } = useI18n()
  const { profile, projects } = content
  const [lines, setLines] = useState<Line[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [lines])

  const run = (raw: string): Line[] => {
    const [cmd, ...rest] = raw.trim().toLowerCase().split(/\s+/)
    const arg = rest.join(' ')
    const out = (text: string): Line => ({ kind: 'out', text })

    switch (cmd) {
      case 'ajuda':
      case 'help':
        return HELP.map((h) => out(`${h[lang].padEnd(14)} ${t(h.key)}`))
      case 'sobre':
      case 'about':
      case 'whoami':
        return [out(t('term.whoami', { name: profile.name, role: profile.role, brand: profile.brand })), ...profile.bio.map(out)]
      case 'projetos':
      case 'projects':
      case 'ls':
        return projects.map((p) => out(`${p.file.padEnd(18)} ${p.kind}`))
      case 'skills':
        return profile.competencias.map((c) => out(`${c.area.padEnd(20)} ${c.itens.join(', ')}`))
      case 'contato':
      case 'contact': {
        const c = profile.contact
        const rows = [
          c.email && `${t('contact.email').padEnd(9)} ${c.email}`,
          c.github && `GitHub    ${c.github.replace('https://', '')}`,
          c.linkedin && `LinkedIn  ${c.linkedin.replace('https://', '')}`,
        ].filter(Boolean) as string[]
        return rows.map(out)
      }
      case 'abrir':
      case 'open': {
        const app = APP_IDS.find((id) => id === arg) ?? APP_ALIASES[arg]
        if (app) {
          openApp(app)
          return [{ kind: 'ok', text: t('term.opened', { t: t(`app.${app}`) }) }]
        }
        const project = projects.find((p) => p.id === arg || p.file.toLowerCase() === arg || p.title.toLowerCase() === arg)
        if (project) {
          openProject(project.id)
          return [{ kind: 'ok', text: t('term.openedProject', { t: project.file }) }]
        }
        return [
          {
            kind: 'err',
            text: arg ? t('term.notFound', { t: arg, list: [...APP_IDS, ...projects.map((p) => p.id)].join(', ') }) : t('term.openWhat'),
          },
        ]
      }
      case 'sefaz':
        return [out(t('term.sefaz1')), { kind: 'ok', text: t('term.sefaz2') }]
      case 'emitir':
      case 'issue':
        return [out(t('term.emit1')), out(t('term.emit2')), { kind: 'ok', text: t('term.emit3') }, out(t('term.emit4'))]
      case '':
        return []
      default:
        return [{ kind: 'err', text: t('term.unknown', { t: cmd }) }]
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const raw = value
    setValue('')
    setCursor(-1)
    if (raw.trim()) setHistory((h) => [raw, ...h].slice(0, 50))
    const first = raw.trim().toLowerCase()
    if (first === 'limpar' || first === 'clear' || first === 'cls') {
      setLines([])
      return
    }
    setLines((prev) => [...prev, { kind: 'in', text: raw }, ...run(raw)])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === 'ArrowUp' ? 1 : -1)))
      setCursor(next)
      setValue(next === -1 ? '' : history[next])
    }
    if (e.key === 'Escape' && value) {
      // Esc com texto digitado só limpa a linha; a janela não fecha.
      e.stopPropagation()
      setValue('')
    }
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term-out" role="log" aria-live="polite">
        {/* as duas linhas de abertura acompanham o idioma; o histórico fica como foi digitado */}
        <p className="term-line is-out">DWM OS 1.0</p>
        <p className="term-line is-out">{t('term.hint')}</p>
        {lines.map((l, i) => (
          <p key={i} className={`term-line is-${l.kind}`}>
            {l.kind === 'in' && <span className="term-prompt">walter@dwm:~$ </span>}
            {l.text}
          </p>
        ))}
        <div ref={endRef} />
      </div>
      <form className="term-form" onSubmit={onSubmit}>
        <label htmlFor="term-input" className="term-prompt">
          walter@dwm:~$
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          aria-label={t('term.input')}
        />
      </form>
    </div>
  )
}
