import paisagem from '../assets/paisagem.svg'
import nuvens from '../assets/nuvens.svg'

/**
 * Papel de parede: uma tarde em Mato Grosso do Sul, com as chapadas da Serra de Maracaju, a planície alagada do
 * Pantanal e carandás no primeiro plano. A cena é gerada por scripts/paisagem.mjs.
 * As nuvens ficam numa camada à parte, com o mesmo enquadramento, e passam bem devagar (param quando o sistema
 * pede menos movimento). Usa <span> para também poder ficar dentro da tela de bloqueio.
 */
export function Wallpaper({ className = '' }: { className?: string }) {
  return (
    <span className={`wallpaper ${className}`} aria-hidden>
      <img className="wp-camada" src={paisagem} alt="" decoding="async" />
      <img className="wp-camada wp-nuvens" src={nuvens} alt="" decoding="async" />
    </span>
  )
}

/** A mesma cena, parada e recortada na linha do horizonte (capa da janela Sobre mim). */
export function Horizonte() {
  return <img className="wp-horizonte" src={paisagem} alt="" decoding="async" />
}
