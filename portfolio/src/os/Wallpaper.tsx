/**
 * Papel de parede animado: manchas de cor desfocadas que derivam bem devagar.
 * Só usa transform (barato para a placa de vídeo) e para quando o sistema pede menos movimento.
 * Usa <span> para também poder ficar dentro da tela de bloqueio.
 */
export function Wallpaper({ className = '' }: { className?: string }) {
  return (
    <span className={`wallpaper ${className}`} aria-hidden>
      <span className="blob blob-rosa" />
      <span className="blob blob-azul" />
      <span className="blob blob-violeta" />
      <span className="blob blob-lilas" />
    </span>
  )
}
