import { useState } from 'react'
import { useI18n } from '../i18n'

type Channel = { id: string; label: string; text: string; href: string; action: string }

export function Contato() {
  const { t, content } = useI18n()
  const [copied, setCopied] = useState<string | null>(null)

  // Só entram os canais preenchidos em src/data/profile.ts.
  const c = content.profile.contact
  const channels: Channel[] = []
  if (c.email) channels.push({ id: 'email', label: t('contact.email'), text: c.email, href: `mailto:${c.email}`, action: t('contact.write') })
  if (c.whatsapp) channels.push({ id: 'whatsapp', label: 'WhatsApp', text: `+${c.whatsapp}`, href: `https://wa.me/${c.whatsapp}`, action: t('contact.chat') })
  if (c.linkedin) channels.push({ id: 'linkedin', label: 'LinkedIn', text: c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin, action: t('contact.openLink') })
  if (c.github) channels.push({ id: 'github', label: 'GitHub', text: c.github.replace(/^https?:\/\//, ''), href: c.github, action: t('contact.openLink') })
  if (c.cv) channels.push({ id: 'cv', label: t('contact.cv'), text: t('contact.cvText'), href: c.cv, action: t('contact.openLink') })

  const copy = async (ch: Channel) => {
    try {
      await navigator.clipboard.writeText(ch.text)
      setCopied(ch.id)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      // Sem permissão de área de transferência: o texto continua selecionável na tela.
    }
  }

  return (
    <div className="contact">
      <h3 className="contact-title">{t('contact.title')}</h3>
      <p className="contact-lead">{t('contact.lead')}</p>
      <ul className="contact-list">
        {channels.map((ch) => (
          <li key={ch.id}>
            <span className="contact-label">{ch.label}</span>
            <span className="contact-text">{ch.text}</span>
            <span className="contact-actions">
              <button type="button" className="btn btn-quiet" onClick={() => copy(ch)}>
                {copied === ch.id ? t('contact.copied') : t('contact.copy')}
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
