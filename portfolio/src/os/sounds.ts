/**
 * Sons da interface, sintetizados na hora com a Web Audio API.
 * Não há arquivos de áudio: cada som é uma ou duas notas curtas com decaimento suave.
 */

export type SoundName = 'notify' | 'open' | 'close' | 'unlock' | 'charge'

const KEY = 'dwm-os-sons-mudos'
let ctx: AudioContext | null = null
let muted = false
try {
  muted = localStorage.getItem(KEY) === '1'
} catch {
  // armazenamento bloqueado: segue com som ligado
}

const listeners = new Set<() => void>()

export function isMuted(): boolean {
  return muted
}

export function setMuted(value: boolean): void {
  muted = value
  try {
    localStorage.setItem(KEY, value ? '1' : '0')
  } catch {
    // sem armazenamento a escolha vale só para esta visita
  }
  listeners.forEach((fn) => fn())
}

export function subscribeMuted(fn: () => void): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

type Note = { freq: number; to?: number; at: number; dur: number; gain: number; type?: OscillatorType }

const SOUNDS: Record<SoundName, Note[]> = {
  // dois toques de sino, como um aviso de mensagem
  notify: [
    { freq: 880, at: 0, dur: 0.32, gain: 0.11 },
    { freq: 1318.5, at: 0.11, dur: 0.5, gain: 0.1 },
  ],
  open: [{ freq: 520, to: 760, at: 0, dur: 0.11, gain: 0.07, type: 'triangle' }],
  close: [{ freq: 620, to: 400, at: 0, dur: 0.12, gain: 0.06, type: 'triangle' }],
  unlock: [
    { freq: 523.25, at: 0, dur: 0.22, gain: 0.07 },
    { freq: 659.25, at: 0.07, dur: 0.24, gain: 0.07 },
    { freq: 783.99, at: 0.14, dur: 0.38, gain: 0.08 },
  ],
  charge: [
    { freq: 440, to: 880, at: 0, dur: 0.35, gain: 0.07 },
    { freq: 1174.7, at: 0.3, dur: 0.4, gain: 0.07 },
  ],
}

export function playSound(name: SoundName): void {
  if (muted) return
  // Navegadores só liberam áudio depois de uma interação; antes disso não há o que tocar.
  if (!ctx && navigator.userActivation && !navigator.userActivation.hasBeenActive) return
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    const now = ctx.currentTime
    for (const n of SOUNDS[name]) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const t0 = now + n.at
      osc.type = n.type ?? 'sine'
      osc.frequency.setValueAtTime(n.freq, t0)
      if (n.to) osc.frequency.exponentialRampToValueAtTime(n.to, t0 + n.dur)
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(n.gain, t0 + 0.012)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + n.dur)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t0)
      osc.stop(t0 + n.dur + 0.02)
    }
  } catch {
    // sem suporte a áudio: a interface segue funcionando em silêncio
  }
}
