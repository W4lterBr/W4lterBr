import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getContent, type Content, type Lang } from './data/profile'

/**
 * Idioma da interface. Os textos de botões, avisos e rótulos ficam aqui;
 * o conteúdo (bio, projetos, trajetória) fica em src/data/profile.ts.
 * Variáveis entram entre chaves: t('battery.title', { n: 80 }).
 */
const UI = {
  pt: {
    'lang.title': 'Idioma',
    'lang.open': 'Idioma: Português. Trocar idioma.',

    'app.sobre': 'Sobre mim',
    'app.projetos': 'Projetos',
    'app.terminal': 'Terminal',
    'app.contato': 'Contato',
    'bar.menu': 'Menu',
    'dock.label': 'Aplicativos',

    'welcome.title': 'Bem-vindo ao meu portfólio',
    'welcome.text': 'Os aplicativos ficam no dock aqui embaixo. Fique à vontade para explorar.',
    'toast.close': 'Fechar aviso',

    'lock.hint': 'Clique ou deslize para cima para desbloquear',

    'win.close': 'Fechar {t}',
    'win.closeTip': 'Fechar (Esc)',
    'win.min': 'Minimizar {t}',
    'win.minTip': 'Minimizar',
    'win.max': 'Maximizar {t}',
    'win.maxTip': 'Maximizar',
    'win.restore': 'Restaurar {t}',
    'win.restoreTip': 'Restaurar',

    'widget.intro': 'Apresentação',
    'widget.projects': 'Ver projetos',
    'widget.clock': 'Relógio: {t}',
    'widget.calendar': 'Calendário de {t}',
    'widget.numbers': 'Em números',
    'widget.weekdays': 'D,S,T,Q,Q,S,S',

    'battery.label': 'Bateria em {n}%. Clique para recarregar.',
    'battery.title': 'Bateria: {n}%. Clique para recarregar',
    'battery.charging': 'Recarregando...',
    'battery.lowTitle': 'Bateria fraca',
    'battery.lowText': 'Restam {n}%. Clique na bateria para recarregar.',

    'wifi.label': 'Wi-Fi: {t}',
    'wifi.off': 'Sem conexão',
    'wifi.on': 'Conectado',
    'wifi.speed': 'cerca de {n} Mb/s',
    'wifi.backTitle': 'Conexão restabelecida',
    'wifi.backText': 'Você está online de novo.',
    'wifi.lostTitle': 'Sem conexão',
    'wifi.lostText': 'A internet caiu. O que já carregou continua funcionando.',

    'vol.title': 'Som',
    'vol.open': 'Volume: {n}%. Abrir controle de volume.',
    'vol.tip': 'Volume: {n}%',
    'vol.range': 'Volume',
    'vol.mute': 'Silenciar',
    'vol.unmute': 'Ativar som',

    'music.group': 'Música',
    'music.prev': 'Faixa anterior',
    'music.prevTip': 'Anterior',
    'music.next': 'Próxima faixa',
    'music.nextTip': 'Próxima',
    'music.play': 'Tocar música',
    'music.playTip': 'Tocar',
    'music.pause': 'Pausar música',
    'music.pauseTip': 'Pausar',
    'music.open': 'Abrir no SoundCloud',
    'music.loading': 'Carregando...',
    'music.error': 'Música indisponível',
    'music.progress': 'Progresso da faixa',

    'about.at': '{role} na {brand}',
    'about.contact': 'Contato',
    'about.numbers': 'Em números',
    'about.intro': 'Introdução',
    'about.skills': 'Habilidades',
    'about.path': 'Trajetória',
    'about.education': 'Formação',
    'about.studying': 'Estudando agora',
    'about.goal': 'Objetivo',

    'proj.list': 'Sistemas',
    'proj.back': 'Projetos',
    'proj.about': 'Sobre',
    'proj.screens': 'Telas',
    'proj.screenAlt': 'Tela do {t}',
    'proj.tech': 'Tecnologias',
    'proj.private': 'Código privado',
    'proj.public': 'Código aberto',
    'proj.open': 'Abrir o sistema',
    'proj.code': 'Ver o código',
    'proj.empty': 'Escolha um projeto na lista.',

    'contact.title': 'Vamos conversar',
    'contact.lead': 'Para projetos, vagas ou dúvidas sobre os sistemas, fale comigo por aqui.',
    'contact.email': 'E-mail',
    'contact.cv': 'Currículo',
    'contact.cvText': 'Versão completa',
    'contact.copy': 'Copiar',
    'contact.copied': 'Copiado',
    'contact.write': 'Escrever',
    'contact.chat': 'Conversar',
    'contact.openLink': 'Abrir',

    'term.hint': 'Digite "ajuda" para ver os comandos.',
    'term.input': 'Comando',
    'term.help.ajuda': 'lista os comandos',
    'term.help.sobre': 'resumo de quem eu sou',
    'term.help.projetos': 'lista os projetos',
    'term.help.abrir': 'abre uma janela ou um projeto (ex.: abrir planmed)',
    'term.help.skills': 'competências por área',
    'term.help.contato': 'como falar comigo',
    'term.help.sefaz': 'consulta o status do serviço',
    'term.help.emitir': 'simula a autorização de uma nota',
    'term.help.limpar': 'limpa a tela',
    'term.cmd.abrir': 'abrir <nome>',
    'term.whoami': '{name}, {role} na {brand}.',
    'term.opened': 'Janela "{t}" aberta.',
    'term.openedProject': '{t} aberto em Projetos.',
    'term.notFound': 'Não encontrei "{t}". Use um destes: {list}.',
    'term.openWhat': 'Diga o que abrir. Exemplo: abrir projetos',
    'term.sefaz1': 'Consultando status do serviço...',
    'term.sefaz2': 'cStat 107  Serviço em Operação',
    'term.emit1': 'Assinando XML com certificado A1...',
    'term.emit2': 'Enviando lote para autorização...',
    'term.emit3': 'cStat 100  Autorizado o uso da NF-e',
    'term.emit4': 'Simulação: nenhuma nota foi emitida de verdade.',
    'term.unknown': 'Comando não encontrado: {t}. Digite "ajuda".',
  },

  en: {
    'lang.title': 'Language',
    'lang.open': 'Language: English. Change language.',

    'app.sobre': 'About me',
    'app.projetos': 'Projects',
    'app.terminal': 'Terminal',
    'app.contato': 'Contact',
    'bar.menu': 'Menu',
    'dock.label': 'Apps',

    'welcome.title': 'Welcome to my portfolio',
    'welcome.text': 'The apps are in the dock down here. Feel free to explore.',
    'toast.close': 'Close notification',

    'lock.hint': 'Click or swipe up to unlock',

    'win.close': 'Close {t}',
    'win.closeTip': 'Close (Esc)',
    'win.min': 'Minimize {t}',
    'win.minTip': 'Minimize',
    'win.max': 'Maximize {t}',
    'win.maxTip': 'Maximize',
    'win.restore': 'Restore {t}',
    'win.restoreTip': 'Restore',

    'widget.intro': 'Introduction',
    'widget.projects': 'View projects',
    'widget.clock': 'Clock: {t}',
    'widget.calendar': 'Calendar for {t}',
    'widget.numbers': 'In numbers',
    'widget.weekdays': 'S,M,T,W,T,F,S',

    'battery.label': 'Battery at {n}%. Click to recharge.',
    'battery.title': 'Battery: {n}%. Click to recharge',
    'battery.charging': 'Recharging...',
    'battery.lowTitle': 'Low battery',
    'battery.lowText': '{n}% left. Click the battery to recharge.',

    'wifi.label': 'Wi-Fi: {t}',
    'wifi.off': 'No connection',
    'wifi.on': 'Connected',
    'wifi.speed': 'about {n} Mb/s',
    'wifi.backTitle': 'Connection restored',
    'wifi.backText': 'You are back online.',
    'wifi.lostTitle': 'No connection',
    'wifi.lostText': 'The internet went down. What already loaded keeps working.',

    'vol.title': 'Sound',
    'vol.open': 'Volume: {n}%. Open volume control.',
    'vol.tip': 'Volume: {n}%',
    'vol.range': 'Volume',
    'vol.mute': 'Mute',
    'vol.unmute': 'Unmute',

    'music.group': 'Music',
    'music.prev': 'Previous track',
    'music.prevTip': 'Previous',
    'music.next': 'Next track',
    'music.nextTip': 'Next',
    'music.play': 'Play music',
    'music.playTip': 'Play',
    'music.pause': 'Pause music',
    'music.pauseTip': 'Pause',
    'music.open': 'Open on SoundCloud',
    'music.loading': 'Loading...',
    'music.error': 'Music unavailable',
    'music.progress': 'Track progress',

    'about.at': '{role} at {brand}',
    'about.contact': 'Contact',
    'about.numbers': 'In numbers',
    'about.intro': 'Introduction',
    'about.skills': 'Skills',
    'about.path': 'Career',
    'about.education': 'Education',
    'about.studying': 'Currently studying',
    'about.goal': 'Goal',

    'proj.list': 'Systems',
    'proj.back': 'Projects',
    'proj.about': 'About',
    'proj.screens': 'Screens',
    'proj.screenAlt': '{t} screen',
    'proj.tech': 'Technologies',
    'proj.private': 'Private code',
    'proj.public': 'Open source',
    'proj.open': 'Open the system',
    'proj.code': 'View the code',
    'proj.empty': 'Pick a project from the list.',

    'contact.title': 'Let’s talk',
    'contact.lead': 'For projects, job openings or questions about the systems, reach me here.',
    'contact.email': 'Email',
    'contact.cv': 'Résumé',
    'contact.cvText': 'Full version',
    'contact.copy': 'Copy',
    'contact.copied': 'Copied',
    'contact.write': 'Write',
    'contact.chat': 'Chat',
    'contact.openLink': 'Open',

    'term.hint': 'Type "help" to see the commands.',
    'term.input': 'Command',
    'term.help.ajuda': 'lists the commands',
    'term.help.sobre': 'a summary of who I am',
    'term.help.projetos': 'lists the projects',
    'term.help.abrir': 'opens a window or a project (e.g. open planmed)',
    'term.help.skills': 'skills by area',
    'term.help.contato': 'how to reach me',
    'term.help.sefaz': 'checks the tax service status',
    'term.help.emitir': 'simulates the authorization of an invoice',
    'term.help.limpar': 'clears the screen',
    'term.cmd.abrir': 'open <name>',
    'term.whoami': '{name}, {role} at {brand}.',
    'term.opened': 'Window "{t}" opened.',
    'term.openedProject': '{t} opened in Projects.',
    'term.notFound': 'Could not find "{t}". Use one of these: {list}.',
    'term.openWhat': 'Say what to open. Example: open projetos',
    'term.sefaz1': 'Checking service status...',
    'term.sefaz2': 'cStat 107  Service in operation',
    'term.emit1': 'Signing the XML with the A1 certificate...',
    'term.emit2': 'Sending the batch for authorization...',
    'term.emit3': 'cStat 100  Use of the NF-e authorized',
    'term.emit4': 'Simulation: no invoice was actually issued.',
    'term.unknown': 'Command not found: {t}. Type "help".',
  },
} satisfies Record<Lang, Record<string, string>>

export type UIKey = keyof (typeof UI)['pt']
export type Translate = (key: UIKey, vars?: Record<string, string | number>) => string

type I18n = {
  lang: Lang
  /** Código de localidade para datas e horas. */
  locale: 'pt-BR' | 'en-US'
  setLang: (lang: Lang) => void
  t: Translate
  content: Content
}

export const LANGS: { id: Lang; name: string }[] = [
  { id: 'pt', name: 'Português (Brasil)' },
  { id: 'en', name: 'English (US)' },
]

const KEY = 'dwm-os-idioma'

/** Idioma escolhido antes; senão, o do navegador (português para quem navega em português, inglês para os demais). */
function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'pt' || stored === 'en') return stored
  } catch {
    // armazenamento bloqueado: cai no idioma do navegador
  }
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

const I18nContext = createContext<I18n | null>(null)

export function useI18n(): I18n {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n precisa estar dentro de I18nProvider')
  return value
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      // sem armazenamento a escolha vale só para esta visita
    }
  }, [])

  // o idioma também vale para o título da aba e para o atributo lang da página
  useEffect(() => {
    const { profile } = getContent(lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = `${profile.name} · ${profile.role}`
  }, [lang])

  const value = useMemo<I18n>(() => {
    const table: Record<string, string> = UI[lang]
    const t: Translate = (key, vars) => {
      let text = table[key] ?? key
      if (vars) for (const [name, v] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(v))
      return text
    }
    return { lang, locale: lang === 'pt' ? 'pt-BR' : 'en-US', setLang, t, content: getContent(lang) }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
