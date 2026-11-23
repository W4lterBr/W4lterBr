import { useEffect, useState } from 'react'
import type { Project } from '../data/profile'
import { useI18n } from '../i18n'
import { TechList } from '../os/tech'

type Props = {
  /** Pedido para abrir um projeto específico (ex.: vindo do terminal). `n` muda a cada pedido. */
  request?: { id: string; n: number }
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.1, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/** Desenho de cada projeto, usado no ícone e, ampliado, no fundo do cabeçalho. */
function ProjectGlyph({ icon }: { icon: Project['icone'] }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden {...stroke}>
      {icon === 'saude' && <path d="M11 4.500h6v6.500h6.500v6H17v6.500h-6V17H4.500v-6H11z" />}
      {icon === 'grafico' && <path d="M5 23.500h18M7.500 19.500v-6M12 19.500V7M16.500 19.500v-9M21 19.500v-4.500" />}
      {icon === 'caminhao' && (
        <>
          <path d="M2.500 7.500h13V19h-13zM15.500 11.500h5l4 4V19h-9z" />
          <circle cx="8" cy="20.500" r="2.300" fill="currentColor" stroke="none" />
          <circle cx="19.500" cy="20.500" r="2.300" fill="currentColor" stroke="none" />
        </>
      )}
      {icon === 'codigo' && <path d="M10 8l-6 6 6 6M18 8l6 6-6 6M16 5.500l-4 17" />}
      {icon === 'brilho' && (
        <>
          <path d="M12.500 4l2.300 6.700L21.500 13l-6.700 2.300L12.500 22l-2.300-6.700L3.500 13l6.700-2.300z" />
          <path d="M22 4v4M20 6h4M22.500 19v3M21 20.500h3" />
        </>
      )}
    </svg>
  )
}

export function Projetos({ request }: Props) {
  const { t, content } = useI18n()
  const { projects } = content
  // No celular a janela mostra a lista primeiro; em telas largas, lista e detalhe lado a lado.
  const wide = typeof window !== 'undefined' && !window.matchMedia('(max-width: 720px)').matches
  const [selected, setSelected] = useState<string | null>(request?.id ?? (wide ? projects[0].id : null))

  useEffect(() => {
    if (request) setSelected(request.id)
  }, [request])

  const project = projects.find((p) => p.id === selected)

  return (
    <div className="pj" data-view={project ? 'detail' : 'list'}>
      <nav className="pj-list" aria-label={t('app.projetos')}>
        <p className="pj-list-title">{t('proj.list')}</p>
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <button type="button" className="pj-item" aria-current={p.id === selected ? 'true' : undefined} onClick={() => setSelected(p.id)}>
                <span className="pj-icon">
                  <ProjectGlyph icon={p.icone} />
                </span>
                <span className="pj-item-text">
                  <span className="pj-item-name">{p.title}</span>
                  <span className="pj-item-kind">{p.kind}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="pj-detail">
        {project ? (
          // a chave refaz a animação de entrada a cada troca de projeto
          <article key={project.id} className="pj-page">
            <header className="pj-hero">
              <span className="pj-hero-art" aria-hidden>
                <ProjectGlyph icon={project.icone} />
              </span>
              <button type="button" className="pj-back" onClick={() => setSelected(null)}>
                <svg viewBox="0 0 10 16" aria-hidden><path d="M8 2L2 8l6 6" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" /></svg>
                {t('proj.back')}
              </button>
              <span className="pj-icon pj-icon-lg">
                <ProjectGlyph icon={project.icone} />
              </span>
              <div className="pj-hero-text">
                <p className="pj-kind">{project.kind}</p>
                <h3 className="pj-title">{project.title}</h3>
              </div>
              <ul className="pj-pills">
                <li>
                  {project.items.length} {project.unidade}
                </li>
                <li>{project.repo ? t('proj.public') : t('proj.private')}</li>
              </ul>
            </header>

            <div className="pj-body">
              <section className="pj-card">
                <h4>{t('proj.about')}</h4>
                <p className="pj-summary">{project.summary}</p>
              </section>

              {project.images && project.images.length > 0 && (
                <section className="pj-card">
                  <h4>{t('proj.screens')}</h4>
                  <div className="pj-shots">
                    {project.images.map((src) => (
                      <img key={src} src={src} alt={t('proj.screenAlt', { t: project.title })} loading="lazy" decoding="async" />
                    ))}
                  </div>
                </section>
              )}

              <section className="pj-card">
                <h4>{project.listTitle}</h4>
                <ul className="pj-features">
                  {project.items.map((item) => (
                    <li key={item}>
                      <svg viewBox="0 0 16 16" aria-hidden><path d="M3.500 8.500l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="pj-card">
                <h4>{t('proj.tech')}</h4>
                <TechList items={project.stack} />
              </section>

              {(project.link || project.repo) && (
                <p className="pj-links">
                  {project.link && (
                    <a className="btn" href={project.link} target="_blank" rel="noreferrer">
                      {t('proj.open')}
                    </a>
                  )}
                  {project.repo && (
                    <a className="btn btn-quiet" href={project.repo} target="_blank" rel="noreferrer">
                      {t('proj.code')}
                    </a>
                  )}
                </p>
              )}
            </div>
          </article>
        ) : (
          <p className="pj-empty">{t('proj.empty')}</p>
        )}
      </div>
    </div>
  )
}
