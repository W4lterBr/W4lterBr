import { useState } from 'react'
import { profile } from '../data/profile'

type Channel = { label: string; text: string; href: string; action: string }

function channels(): Channel[] {
  const c = profile.contact
  const list: Channel[] = []
  if (c.email) list.push({ label: 'E-mail', text: c.email, href: `mailto:${c.email}`, action: 'Escrever' })
  if (c.whatsapp) list.push({ label: 'WhatsApp', text: `+${c.whatsapp}`, href: `https://wa.me/${c.whatsapp}`, action: 'Conversar' })
  if (c.linkedin) list.push({ label: 'LinkedIn', text: c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin, action: 'Abrir' })
  if (c.github) list.push({ label: 'GitHub', text: c.github.replace(/^https?:\/\//, ''), href: c.github, action: 'Abrir' })
  if (c.cv) list.push({ label: 'Currículo', text: 'Versão completa', href: c.cv, action: 'Abrir' })
  return list
}

export function Contato() {
  const [copied, setCopied] = useState<string | null>(null)

  const copy = async (ch: Channel) => {
    try {
      await navigator.clipboard.writeText(ch.text)
      setCopied(ch.label)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      // Sem permissão de área de transferência: o texto continua selecionável na tela.
    }
  }

  return (
    <div className="contact">
      <h3 className="contact-title">Vamos conversar</h3>
      <p className="contact-lead">
        Para projetos, vagas ou dúvidas sobre os sistemas, fale comigo por aqui.
      </p>
      <ul className="contact-list">
        {channels().map((ch) => (
          <li key={ch.label}>
            <span className="contact-label">{ch.label}</span>
            <span className="contact-text">{ch.text}</span>
            <span className="contact-actions">
              <button type="button" className="btn btn-quiet" onClick={() => copy(ch)}>
                {copied === ch.label ? 'Copiado' : 'Copiar'}
              </button>
              <a className="btn" href={ch.href} target={ch.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
                {ch.action}
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
