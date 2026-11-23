import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile, projects } from '../data/profile'
import { APP_IDS, type AppId } from '../os/windows'

type Line = { kind: 'in' | 'out' | 'ok' | 'err'; text: string }

type Props = {
  openApp: (id: AppId) => void
  openProject: (id: string) => void
}

const HELP: [string, string][] = [
  ['ajuda', 'lista os comandos'],
  ['sobre', 'resumo de quem eu sou'],
  ['projetos', 'lista os projetos'],
  ['abrir <nome>', 'abre uma janela ou um projeto (ex.: abrir planmed)'],
  ['skills', 'competências por área'],
  ['contato', 'como falar comigo'],
  ['sefaz', 'consulta o status do serviço'],
  ['emitir', 'simula a autorização de uma nota'],
  ['limpar', 'limpa a tela'],
]

const WELCOME: Line[] = [
  { kind: 'out', text: 'DWM OS 1.0' },
  { kind: 'out', text: 'Digite "ajuda" para ver os comandos.' },
]

export function Terminal({ openApp, openProject }: Props) {
  const [lines, setLines] = useState<Line[]>(WELCOME)
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
        return HELP.map(([c, d]) => out(`${c.padEnd(14)} ${d}`))
      case 'sobre':
      case 'whoami':
        return [out(`${profile.name}, ${profile.role} na ${profile.brand}.`), ...profile.bio.map(out)]
      case 'projetos':
      case 'ls':
        return projects.map((p) => out(`${p.file.padEnd(18)} ${p.kind}`))
      case 'skills':
        return profile.competencias.map((c) => out(`${c.area.padEnd(20)} ${c.itens.join(', ')}`))
      case 'contato': {
        const c = profile.contact
        const rows = [
          c.email && `E-mail    ${c.email}`,
          c.github && `GitHub    ${c.github.replace('https://', '')}`,
          c.linkedin && `LinkedIn  ${c.linkedin.replace('https://', '')}`,
        ].filter(Boolean) as string[]
        return rows.map(out)
      }
      case 'abrir':
      case 'open': {
        const app = APP_IDS.find((id) => id === arg)
        if (app) {
          openApp(app)
          return [{ kind: 'ok', text: `Janela "${app}" aberta.` }]
        }
        const project = projects.find((p) => p.id === arg || p.file.toLowerCase() === arg || p.title.toLowerCase() === arg)
        if (project) {
          openProject(project.id)
          return [{ kind: 'ok', text: `${project.file} aberto em Projetos.` }]
        }
        return [
          {
            kind: 'err',
            text: arg
              ? `Não encontrei "${arg}". Use um destes: ${[...APP_IDS, ...projects.map((p) => p.id)].join(', ')}.`
              : 'Diga o que abrir. Exemplo: abrir projetos',
          },
        ]
      }
      case 'sefaz':
        return [out('Consultando status do serviço...'), { kind: 'ok', text: 'cStat 107  Serviço em Operação' }]
      case 'emitir':
        return [
          out('Assinando XML com certificado A1...'),
          out('Enviando lote para autorização...'),
          { kind: 'ok', text: 'cStat 100  Autorizado o uso da NF-e' },
          out('Simulação: nenhuma nota foi emitida de verdade.'),
        ]
      case '':
        return []
      default:
        return [{ kind: 'err', text: `Comando não encontrado: ${cmd}. Digite "ajuda".` }]
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
          aria-label="Comando"
        />
      </form>
    </div>
  )
}
