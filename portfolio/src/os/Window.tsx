import { useEffect, useRef, type CSSProperties, type Dispatch, type PointerEvent, type ReactNode } from 'react'
import type { Win, WinAction } from './windows'

type Props = {
  win: Win
  title: string
  width: number
  height: number
  active: boolean
  /** animação de saída em andamento */
  leaving?: 'close' | 'min'
  dispatch: Dispatch<WinAction>
  children: ReactNode
}

const MOBILE = '(max-width: 720px)'

export function Window({ win, title, width, height, active, leaving, dispatch, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

  // Ao abrir, o foco vai para a janela: quem usa teclado continua de dentro dela.
  // (Se o conteúdo já pegou o foco, como o campo do terminal, ele fica onde está.)
  useEffect(() => {
    const el = ref.current
    if (active && el && !el.contains(document.activeElement)) el.focus({ preventScroll: true })
  }, [active, win.minimized])

  const onPointerDown = (e: PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    dispatch({ type: 'focus', id: win.id })
    if (win.maximized || window.matchMedia(MOBILE).matches) return
    drag.current = { dx: e.clientX - win.x, dy: e.clientY - win.y }
    e.currentTarget.setPointerCapture(e.pointerId)
    // durante o arrasto a janela segue o mouse sem a transição de posição
    if (ref.current) ref.current.dataset.dragging = ''
  }

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!drag.current) return
    const maxX = window.innerWidth - 80
    const maxY = window.innerHeight - 120
    const x = Math.min(Math.max(e.clientX - drag.current.dx, 80 - width), maxX)
    const y = Math.min(Math.max(e.clientY - drag.current.dy, 32), maxY)
    dispatch({ type: 'move', id: win.id, x, y })
  }

  const endDrag = () => {
    drag.current = null
    if (ref.current) delete ref.current.dataset.dragging
  }

  const style = {
    '--x': `${win.x}px`,
    '--y': `${win.y}px`,
    '--w': `${width}px`,
    '--h': `${height}px`,
    zIndex: win.z,
  } as CSSProperties

  return (
    <section
      ref={ref}
      className={`win${active ? ' is-active' : ''}${win.maximized ? ' is-max' : ''}${leaving ? ` is-leaving-${leaving}` : ''}`}
      style={style}
      hidden={win.minimized}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      onPointerDownCapture={() => !active && dispatch({ type: 'focus', id: win.id })}
    >
      <header
        className="win-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => dispatch({ type: 'toggleMax', id: win.id })}
      >
        <div className="lights">
          <button type="button" className="light light-close" aria-label={`Fechar ${title}`} title="Fechar (Esc)" onClick={() => dispatch({ type: 'close', id: win.id })}>
            <svg viewBox="0 0 10 10" aria-hidden><path d="M2.6 2.6l4.8 4.8M7.4 2.6L2.6 7.4" /></svg>
          </button>
          <button type="button" className="light light-min" aria-label={`Minimizar ${title}`} title="Minimizar" onClick={() => dispatch({ type: 'minimize', id: win.id })}>
            <svg viewBox="0 0 10 10" aria-hidden><path d="M2 5h6" /></svg>
          </button>
          <button
            type="button"
            className="light light-max"
            aria-label={win.maximized ? `Restaurar ${title}` : `Maximizar ${title}`}
            title={win.maximized ? 'Restaurar' : 'Maximizar'}
            onClick={() => dispatch({ type: 'toggleMax', id: win.id })}
          >
            <svg viewBox="0 0 10 10" aria-hidden><path d="M2 5h6M5 2v6" /></svg>
          </button>
        </div>
        <h2 className="win-title">{title}</h2>
      </header>
      <div className="win-body">{children}</div>
    </section>
  )
}
