import { useEffect, useState } from 'react'
import { projects } from '../data/profile'

type Props = {
  /** Pedido para abrir um projeto específico (ex.: vindo do terminal). `n` muda a cada pedido. */
  request?: { id: string; n: number }
}

export function Projetos({ request }: Props) {
  // No celular a janela mostra a lista primeiro; em telas largas, lista e detalhe lado a lado.
  const wide = typeof window !== 'undefined' && !window.matchMedia('(max-width: 720px)').matches
  const [selected, setSelected] = useState<string | null>(request?.id ?? (wide ? projects[0].id : null))

  useEffect(() => {
    if (request) setSelected(request.id)
  }, [request])
  const project = projects.find((p) => p.id === selected)

  return (
    <div className="proj" data-view={project ? 'detail' : 'list'}>
      <nav className="proj-list" aria-label="Projetos">
        <ul>
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className="proj-file"
                aria-current={p.id === selected ? 'true' : undefined}
                onClick={() => setSelected(p.id)}
              >
                <span className="proj-file-name">{p.file}</span>
                <span className="proj-file-kind">{p.kind}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="proj-detail">
        {project ? (
          <article key={project.id}>
            <button type="button" className="proj-back" onClick={() => setSelected(null)}>
              Voltar para a lista
            </button>
            <p className="proj-kind">{project.kind}</p>
            <h3 className="proj-title">{project.title}</h3>
            <p className="proj-summary">{project.summary}</p>

            {project.images && project.images.length > 0 && (
              <div className="proj-shots">
                {project.images.map((src) => (
                  <img key={src} src={src} alt={`Tela do ${project.title}`} loading="lazy" decoding="async" />
                ))}
              </div>
            )}

            <h4 className="proj-sub">{project.listTitle}</h4>
            <ul className="proj-items">
              {project.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h4 className="proj-sub">Tecnologias</h4>
            <ul className="chips">
              {project.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <p className="proj-links">
              {project.link && (
                <a className="btn" href={project.link} target="_blank" rel="noreferrer">
                  Abrir o sistema
                </a>
              )}
              {project.repo ? (
                <a className="btn btn-quiet" href={project.repo} target="_blank" rel="noreferrer">
                  Ver o código
                </a>
              ) : (
                <span className="proj-private">Código em repositório privado.</span>
              )}
            </p>
          </article>
        ) : (
          <p className="proj-empty">Escolha um projeto na lista.</p>
        )}
      </div>
    </div>
  )
}
