import {
  siDocker,
  siExpo,
  siFastapi,
  siGit,
  siJavascript,
  siLinux,
  siMysql,
  siNestjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siSqlite,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons'

/** Logos das tecnologias (pacote simple-icons). Nomes sem logo viram uma etiqueta simples. */
const LOGOS: Record<string, SimpleIcon> = {
  Python: siPython,
  FastAPI: siFastapi,
  'Node.js': siNodedotjs,
  NestJS: siNestjs,
  React: siReact,
  'React Native': siReact,
  Expo: siExpo,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  SQLite: siSqlite,
  Docker: siDocker,
  Git: siGit,
  Linux: siLinux,
}

/** Em fundos claros (amarelo do JavaScript, ciano do React) o desenho fica escuro, para dar leitura. */
function glyphColor(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16))
  return r * 0.299 + g * 0.587 + b * 0.114 > 165 ? '#1c1c1e' : '#ffffff'
}

export function Tech({ name }: { name: string }) {
  const logo = LOGOS[name]
  if (!logo) return <li className="tech tech-plain">{name}</li>
  return (
    <li className="tech">
      <span className="tech-logo" style={{ background: `#${logo.hex}` }} aria-hidden>
        <svg viewBox="0 0 24 24" fill={glyphColor(logo.hex)}>
          <path d={logo.path} />
        </svg>
      </span>
      {name}
    </li>
  )
}

export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech-list">
      {items.map((name) => (
        <Tech key={name} name={name} />
      ))}
    </ul>
  )
}
