// Todo o conteúdo do site mora neste arquivo, em português e em inglês.
// Edite aqui; nenhum texto de conteúdo está espalhado pelos componentes.
// (Os textos da interface, como botões e avisos, ficam em src/i18n.tsx.)

export type Lang = 'pt' | 'en'

/** Dados que não mudam com o idioma. */
export const site = {
  name: 'Walter Manoel',
  brand: 'DWM Systems',
  city: 'Campo Grande, MS',

  // Contato. Campo vazio não aparece no site.
  contact: {
    email: 'waltermanoel17@gmail.com',
    whatsapp: '5567992509407', // só dígitos, com DDI e DDD
    instagram: 'https://www.instagram.com/walter_manoel_/',
    linkedin: '',
    github: 'https://github.com/W4lterBr',
    cv: '', // URL do currículo em PDF ou página
  },

  // Player de música (barra do topo e tela de bloqueio).
  // Cole em `soundcloud` o link de uma playlist, faixa ou perfil do SoundCloud.
  // O nome, o artista e a capa mostrados no player vêm da própria faixa.
  music: {
    soundcloud: 'https://soundcloud.com/chillhopdotcom/sets/lofihiphop',
    // Faixa da playlist em que o player começa (1 = primeira). Nesta playlist as duas primeiras são álbuns
    // inteiros de mais de 20 minutos, em que a música muda e o nome não; por isso começa na terceira.
    comecarNaFaixa: 3,
  },
}

type ProfileText = {
  role: string
  natureza: string
  bio: string[]
  objetivo: string
  numeros: { valor: string; rotulo: string }[]
  formacao: { curso: string; quando: string }
  trajetoria: { periodo: string; cargo: string; nota: string }[]
  competencias: { area: string; itens: string[] }[]
  estudando: string[]
}

const profileText: Record<Lang, ProfileText> = {
  pt: {
    role: 'Desenvolvedor Full Stack',
    natureza: 'Desenvolvimento de sistemas empresariais, automação fiscal e IA aplicada',
    bio: [
      'Sou desenvolvedor Full Stack com foco em sistemas empresariais e automação de processos.',
      'Minha experiência em tecnologia, aliada ao conhecimento da área fiscal e contábil, permite desenvolver soluções voltadas às necessidades reais das empresas brasileiras.',
      'Atualmente trabalho no desenvolvimento de aplicações Web, Desktop e Mobile utilizando arquiteturas modernas e integração com Inteligência Artificial.',
    ],
    objetivo:
      'Desenvolver soluções que simplifiquem processos empresariais através de software de alta qualidade, automação e inteligência artificial.',
    numeros: [
      { valor: '+8 anos', rotulo: 'Experiência profissional' },
      { valor: '+4 anos', rotulo: 'Rotinas contábeis e fiscais' },
      { valor: '5', rotulo: 'Sistemas no portfólio' },
    ],
    formacao: { curso: 'Bacharelado em Ciências Contábeis', quando: 'Conclusão em dez/2025' },
    trajetoria: [
      {
        periodo: '2020 – atual',
        cargo: 'Analista Contábil',
        nota: 'Progressão interna: Auxiliar de Escritório, Auxiliar Contábil II, Auxiliar Contábil III, Analista Contábil.',
      },
      { periodo: '2019 – 2020', cargo: 'Auxiliar de Escritório', nota: 'Notas fiscais, estoque e controle administrativo.' },
      { periodo: '2016 – 2018', cargo: 'Aprendiz Administrativo', nota: 'Faturamento e rotinas administrativas.' },
    ],
    competencias: [
      { area: 'Back-end', itens: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'APIs REST'] },
      { area: 'Front-end e mobile', itens: ['React', 'React Native', 'TypeScript', 'JavaScript'] },
      { area: 'Dados', itens: ['PostgreSQL', 'MySQL', 'SQLite'] },
      { area: 'Infra', itens: ['Docker', 'Git', 'Linux'] },
      {
        area: 'Fiscal',
        itens: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e', 'MDF-e', 'SPED Fiscal', 'EFD-Reinf', 'DCTFWeb', 'Certificado A1', 'Web Services SEFAZ'],
      },
      { area: 'IA', itens: ['Assistentes', 'Automação de processos', 'Engenharia de prompt'] },
    ],
    estudando: [
      'Arquitetura de software',
      'Clean Architecture',
      'Microsserviços',
      'Engenharia de prompt',
      'IA aplicada ao desenvolvimento',
      'Escalabilidade de aplicações',
    ],
  },

  en: {
    role: 'Full Stack Developer',
    natureza: 'Business systems, tax automation and applied AI',
    bio: [
      'I am a Full Stack developer focused on business systems and process automation.',
      'My experience in technology, combined with a background in tax and accounting, lets me build solutions for the real needs of Brazilian companies.',
      'I currently build Web, Desktop and Mobile applications using modern architectures and Artificial Intelligence integration.',
    ],
    objetivo: 'To build solutions that simplify business processes through high-quality software, automation and artificial intelligence.',
    numeros: [
      { valor: '8+ years', rotulo: 'Professional experience' },
      { valor: '4+ years', rotulo: 'Accounting and tax routines' },
      { valor: '5', rotulo: 'Systems in the portfolio' },
    ],
    formacao: { curso: 'Bachelor’s degree in Accounting', quando: 'Completed in Dec 2025' },
    trajetoria: [
      {
        periodo: '2020 – present',
        cargo: 'Accounting Analyst',
        nota: 'Internal progression: Office Assistant, Accounting Assistant II, Accounting Assistant III, Accounting Analyst.',
      },
      { periodo: '2019 – 2020', cargo: 'Office Assistant', nota: 'Invoices, inventory and administrative control.' },
      { periodo: '2016 – 2018', cargo: 'Administrative Apprentice', nota: 'Billing and administrative routines.' },
    ],
    competencias: [
      { area: 'Back-end', itens: ['Python', 'FastAPI', 'Node.js', 'NestJS', 'REST APIs'] },
      { area: 'Front-end and mobile', itens: ['React', 'React Native', 'TypeScript', 'JavaScript'] },
      { area: 'Data', itens: ['PostgreSQL', 'MySQL', 'SQLite'] },
      { area: 'Infra', itens: ['Docker', 'Git', 'Linux'] },
      {
        // siglas dos documentos e obrigações fiscais brasileiras: não se traduzem
        area: 'Brazilian tax',
        itens: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e', 'MDF-e', 'SPED Fiscal', 'EFD-Reinf', 'DCTFWeb', 'A1 digital certificate', 'SEFAZ web services'],
      },
      { area: 'AI', itens: ['Assistants', 'Process automation', 'Prompt engineering'] },
    ],
    estudando: [
      'Software architecture',
      'Clean Architecture',
      'Microservices',
      'Prompt engineering',
      'AI applied to development',
      'Application scalability',
    ],
  },
}

/** Parte de cada projeto que não muda com o idioma. */
type ProjectBase = {
  id: string
  /** Nome de arquivo mostrado no terminal. */
  file: string
  /** Desenho do ícone. Os disponíveis estão em src/apps/Projetos.tsx. */
  icone: 'saude' | 'grafico' | 'caminhao' | 'codigo' | 'brilho'
  stack: string[]
  /** URL pública do sistema ou de uma demonstração. Vazio = não aparece. */
  link?: string
  /** URL do repositório, se for público. Vazio = aparece "Código privado". */
  repo?: string
  /** Prints em public/projetos/<id>/, ex.: ['projetos/planmed/agenda.webp'] */
  images?: string[]
}

type ProjectText = {
  title: string
  kind: string
  summary: string
  listTitle: string
  /** Como contar os itens na etiqueta do cabeçalho, ex.: "7 recursos". */
  unidade: string
  items: string[]
  /** Só quando os nomes das tecnologias mudam no idioma; senão vale o `stack` do projeto. */
  stack?: string[]
}

export type Project = ProjectBase & ProjectText

const projectBase: ProjectBase[] = [
  { id: 'planmed', file: 'PlanMed.xml', icone: 'saude', stack: ['React', 'TypeScript', 'React Native'] }, // stack: confirmar
  { id: 'dwm-erp', file: 'DWM-ERP.xml', icone: 'grafico', stack: ['Python'] }, // stack: confirmar
  { id: 'emissor-cte', file: 'Emissor-CTe.xml', icone: 'caminhao', stack: ['XML', 'Certificado A1', 'Web Services SEFAZ'] },
  { id: 'captura-xml', file: 'Captura-XML.xml', icone: 'codigo', stack: ['Python', 'Web Services SEFAZ'] }, // stack: confirmar
  { id: 'ia', file: 'IA-Aplicada.xml', icone: 'brilho', stack: ['IA generativa', 'Engenharia de prompt'] },
]

const projectText: Record<Lang, Record<string, ProjectText>> = {
  pt: {
    planmed: {
      title: 'PlanMed',
      kind: 'Gestão de clínicas',
      summary: 'Sistema completo para gestão de clínicas, com aplicativo mobile e inteligência artificial integrada.',
      listTitle: 'Principais recursos',
      unidade: 'recursos',
      items: ['Agenda médica', 'Pacientes', 'Especialidades', 'Financeiro', 'Dashboard', 'Inteligência artificial', 'Aplicativo mobile'],
    },
    'dwm-erp': {
      title: 'DWM ERP',
      kind: 'ERP',
      summary: 'Sistema ERP desenvolvido para gestão empresarial, com dashboard executivo e IA integrada.',
      listTitle: 'Módulos',
      unidade: 'módulos',
      items: ['Financeiro', 'Compras', 'Vendas', 'Estoque', 'Cadastros', 'Relatórios', 'Dashboard executivo', 'IA integrada'],
    },
    'emissor-cte': {
      title: 'Emissor CT-e',
      kind: 'Documentos fiscais',
      summary: 'Sistema profissional para emissão de documentos fiscais eletrônicos, da geração do XML à autorização na SEFAZ.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: ['Emissão de CT-e', 'Geração de XML', 'Impressão do DACTE', 'Certificado digital A1', 'Comunicação com a SEFAZ'],
    },
    'captura-xml': {
      title: 'Captura Inteligente de XML',
      kind: 'Automação fiscal',
      summary: 'Consulta automática de documentos fiscais, com integração completa aos Web Services da SEFAZ.',
      listTitle: 'Documentos consultados',
      unidade: 'tipos de documento',
      items: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e'],
    },
    ia: {
      title: 'Inteligência Artificial',
      kind: 'IA aplicada',
      summary: 'Aplicações que usam IA dentro de sistemas empresariais.',
      listTitle: 'Onde a IA entra',
      unidade: 'aplicações',
      items: ['Assistentes inteligentes', 'Automação de processos', 'Atendimento', 'Geração de conteúdo', 'Produtividade empresarial'],
    },
  },

  en: {
    planmed: {
      title: 'PlanMed',
      kind: 'Clinic management',
      summary: 'A complete clinic management system, with a mobile app and built-in artificial intelligence.',
      listTitle: 'Main features',
      unidade: 'features',
      items: ['Medical schedule', 'Patients', 'Specialties', 'Finance', 'Dashboard', 'Artificial intelligence', 'Mobile app'],
    },
    'dwm-erp': {
      title: 'DWM ERP',
      kind: 'ERP',
      summary: 'An ERP system built for business management, with an executive dashboard and built-in AI.',
      listTitle: 'Modules',
      unidade: 'modules',
      items: ['Finance', 'Purchasing', 'Sales', 'Inventory', 'Records', 'Reports', 'Executive dashboard', 'Built-in AI'],
    },
    'emissor-cte': {
      title: 'CT-e Issuer',
      kind: 'Tax documents',
      summary: 'A professional system for issuing Brazilian electronic tax documents, from generating the XML to authorization by SEFAZ, the state tax authority.',
      listTitle: 'Features',
      unidade: 'features',
      items: ['CT-e issuing', 'XML generation', 'DACTE printing', 'A1 digital certificate', 'Communication with SEFAZ'],
      stack: ['XML', 'A1 digital certificate', 'SEFAZ web services'],
    },
    'captura-xml': {
      title: 'Smart XML Capture',
      kind: 'Tax automation',
      summary: 'Automatic retrieval of Brazilian tax documents, fully integrated with the SEFAZ web services.',
      listTitle: 'Documents retrieved',
      unidade: 'document types',
      items: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e'],
      stack: ['Python', 'SEFAZ web services'],
    },
    ia: {
      title: 'Artificial Intelligence',
      kind: 'Applied AI',
      summary: 'Applications that use AI inside business systems.',
      listTitle: 'Where AI comes in',
      unidade: 'applications',
      items: ['Smart assistants', 'Process automation', 'Customer service', 'Content generation', 'Business productivity'],
      stack: ['Generative AI', 'Prompt engineering'],
    },
  },
}

export type Profile = typeof site & ProfileText
export type Content = { profile: Profile; projects: Project[] }

const cache: Partial<Record<Lang, Content>> = {}

/** Conteúdo completo no idioma pedido. */
export function getContent(lang: Lang): Content {
  cache[lang] ??= {
    profile: { ...site, ...profileText[lang] },
    projects: projectBase.map((p) => ({ ...p, ...projectText[lang][p.id] })),
  }
  return cache[lang]
}
