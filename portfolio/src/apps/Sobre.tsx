import { profile } from '../data/profile'
import { GitHubIcon } from '../os/icons'
import { TechList } from '../os/tech'
import type { AppId } from '../os/windows'

export function Sobre({ openApp }: { openApp: (id: AppId) => void }) {
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)
  const steps = profile.trajetoria.map((t) => ({ when: t.periodo, title: t.cargo, note: t.nota }))

  return (
    <article className="ab">
      <header className="ab-hero">
        <div className="ab-cover" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="ab-id">
          <span className="avatar ab-avatar" aria-hidden>{initials}</span>
          <div className="ab-who">
            <h3 className="ab-name">{profile.name}</h3>
            <p className="ab-role">
              {profile.role} na {profile.brand}
            </p>
            <p className="ab-city">
              <svg viewBox="0 0 16 16" aria-hidden><path d="M8 14.500s4.500-4.200 4.500-7.700a4.500 4.500 0 0 0-9 0c0 3.500 4.500 7.700 4.500 7.700z" fill="none" stroke="currentColor" strokeWidth="1.500" /><circle cx="8" cy="6.700" r="1.600" fill="currentColor" /></svg>
              {profile.city}
            </p>
          </div>
          <div className="ab-actions">
            <button type="button" className="btn" onClick={() => openApp('projetos')}>
              Ver projetos
            </button>
            <button type="button" className="btn btn-quiet" onClick={() => openApp('contato')}>
              Contato
            </button>
            <a className="btn btn-quiet ab-github" href={profile.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </div>
      </header>

      <div className="ab-body">
        <ul className="ab-stats" aria-label="Em números">
          {profile.numeros.map((n) => (
            <li key={n.rotulo}>
              <strong>{n.valor}</strong>
              <span>{n.rotulo}</span>
            </li>
          ))}
        </ul>

        <section className="ab-card ab-intro">
          <h4>Introdução</h4>
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>

        <section className="ab-card">
          <h4>Habilidades</h4>
          <dl className="ab-skills">
            {profile.competencias.map((c) => (
              <div key={c.area}>
                <dt>{c.area}</dt>
                <dd>
                  <TechList items={c.itens} />
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="ab-two">
          <section className="ab-card">
            <h4>Trajetória</h4>
            <ol className="ab-timeline">
              {steps.map((s) => (
                <li key={s.when}>
                  <span className="ab-when">{s.when}</span>
                  <strong>{s.title}</strong>
                  <span className="ab-note">{s.note}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="ab-stack">
            <section className="ab-card">
              <h4>Formação</h4>
              <p className="ab-degree">{profile.formacao.curso}</p>
              <p className="ab-note">{profile.formacao.quando}</p>
            </section>
            <section className="ab-card">
              <h4>Estudando agora</h4>
              <TechList items={profile.estudando} />
            </section>
          </div>
        </div>

        <section className="ab-card ab-goal">
          <h4>Objetivo</h4>
          <p>{profile.objetivo}</p>
        </section>
      </div>
    </article>
  )
}
