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

/**
 * Logos das tecnologias (pacote simple-icons), todos na cor do site para não virar um arco-íris.
 * Nomes sem logo viram uma etiqueta simples.
 */
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

export function Tech({ name }: { name: string }) {
  const logo = LOGOS[name]
  if (!logo) return <li className="tech tech-plain">{name}</li>
  return (
    <li className="tech">
      <span className="tech-logo" aria-hidden>
        <svg viewBox="0 0 24 24">
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
