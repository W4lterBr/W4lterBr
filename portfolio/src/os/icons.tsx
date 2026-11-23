import type { AppId } from './windows'

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 28 28',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function AppIcon({ id }: { id: AppId }) {
  switch (id) {
    case 'sobre': // pessoa
      return (
        <svg {...base}>
          <circle cx="14" cy="10" r="4.5" />
          <path d="M5 23.5c1.2-4.4 4.8-6.5 9-6.5s7.800 2.100 9 6.500" />
        </svg>
      )
    case 'projetos': // pasta
      return (
        <svg {...base}>
          <path d="M3.500 8V6.500A1.500 1.500 0 0 1 5 5h5.500l2.500 3H23a1.500 1.500 0 0 1 1.500 1.500v11A1.500 1.500 0 0 1 23 22H5a1.500 1.500 0 0 1-1.500-1.500z" />
          <path d="M3.500 12h21" />
        </svg>
      )
    case 'terminal':
      return (
        <svg {...base}>
          <path d="M7 10l4.500 4L7 18M14.500 18.500H21" />
        </svg>
      )
    case 'contato': // envelope
      return (
        <svg {...base}>
          <rect x="3.500" y="6" width="21" height="16" rx="2.500" />
          <path d="M4.500 8l9.500 7.500L23.500 8" />
        </svg>
      )
  }
}

export function GitHubIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  )
}

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="16" fill="var(--accent)" />
      <path d="M13 18h9c9 0 15 5.500 15 14s-6 14-15 14h-9z" fill="none" stroke="#fff" strokeWidth="5.500" strokeLinejoin="round" />
      <path d="M39 20l4 24 5-16 5 16" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
