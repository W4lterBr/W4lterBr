import { profile } from '../data/profile'

export function Sobre() {
  const initials = profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2)

  return (
    <article className="about">
      <header className="about-head">
        <span className="avatar avatar-lg" aria-hidden>{initials}</span>
        <div>
          <h3 className="about-name">{profile.name}</h3>
          <p className="about-role">
            {profile.role} na {profile.brand}
          </p>
          <p className="about-city">{profile.city}</p>
        </div>
      </header>

      <section className="group">
        <h4 className="group-title">Introdução</h4>
        <div className="card card-prose">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="group">
        <h4 className="group-title">Em números</h4>
        <div className="card card-stats">
          {profile.numeros.map((n) => (
            <div key={n.rotulo}>
              <strong>{n.valor}</strong>
              <span>{n.rotulo}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="group">
        <h4 className="group-title">Competências</h4>
        <div className="card card-rows">
          {profile.competencias.map((c) => (
            <div className="row" key={c.area}>
              <span className="row-label">{c.area}</span>
              <ul className="chips">
                {c.itens.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="group">
        <h4 className="group-title">Formação e trajetória</h4>
        <ol className="card card-rows">
          <li className="row row-time">
            <span className="row-main">
              <strong>{profile.formacao.curso}</strong>
            </span>
            <span className="row-when">{profile.formacao.quando}</span>
          </li>
          {profile.trajetoria.map((t) => (
            <li className="row row-time" key={t.periodo}>
              <span className="row-main">
                <strong>{t.cargo}</strong>
                <span>{t.nota}</span>
              </span>
              <span className="row-when">{t.periodo}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="group">
        <h4 className="group-title">Estudando agora</h4>
        <div className="card">
          <ul className="chips">
            {profile.estudando.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="group">
        <h4 className="group-title">Objetivo</h4>
        <div className="card card-prose">
          <p>{profile.objetivo}</p>
        </div>
      </section>
    </article>
  )
}
