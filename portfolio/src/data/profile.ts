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
    whatsapp: '', // só dígitos, com DDI e DDD, ex.: 5567999990000
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
      { valor: '{projetos}', rotulo: 'Sistemas no portfólio' },
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
      { valor: '{projetos}', rotulo: 'Systems in the portfolio' },
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
  icone: 'saude' | 'grafico' | 'nota' | 'documento' | 'caminhao' | 'codigo' | 'carteira' | 'predio' | 'carro' | 'bolo' | 'brilho'
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

// A ordem desta lista é a ordem em que os projetos aparecem no site.
// As tecnologias vêm do README de cada repositório.
const projectBase: ProjectBase[] = [
  { id: 'planmed', file: 'PlanMed.xml', icone: 'saude', stack: ['NestJS', 'Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'] },
  { id: 'dwm-erp', file: 'DWM-ERP.xml', icone: 'grafico', stack: ['Python', 'PostgreSQL'] },
  { id: 'emitaqui', file: 'Emitaqui.xml', icone: 'nota', stack: ['C#', '.NET', 'Avalonia', 'SQLite', 'Docker'] },
  { id: 'nfse-nacional', file: 'NFSe-Nacional.xml', icone: 'documento', stack: ['Python', 'JavaScript', 'Docker'] },
  { id: 'emissor-cte', file: 'Emissor-CTe.xml', icone: 'caminhao', stack: ['XML', 'Certificado A1', 'Web Services SEFAZ'] },
  { id: 'captura-xml', file: 'Captura-XML.xml', icone: 'codigo', stack: ['Python', 'Tauri', 'React', 'TypeScript'] },
  { id: 'erp-financeiro', file: 'ERP-Financeiro.xml', icone: 'carteira', stack: ['Python', 'PyQt5', 'SQLite'] },
  { id: 'sass', file: 'SASS.xml', icone: 'predio', stack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'] },
  { id: 'apptype', file: 'AppType.xml', icone: 'carro', stack: ['React Native', 'Expo', 'FastAPI', 'Python', 'PostgreSQL', 'Next.js'] },
  { id: 'confeitaria', file: 'Confeitaria.xml', icone: 'bolo', stack: ['Tauri', 'React', 'TypeScript', 'Python', 'SQLite'] },
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
      items: [
        'Agenda médica',
        'Pacientes',
        'Prontuário eletrônico',
        'Especialidades',
        'Financeiro',
        'Dashboard',
        'Perfis de acesso',
        'Auditoria',
        'Inteligência artificial',
        'Aplicativo mobile',
      ],
    },
    'dwm-erp': {
      title: 'DWM ERP',
      kind: 'ERP',
      summary: 'Sistema ERP desenvolvido para gestão empresarial, com dashboard executivo e IA integrada.',
      listTitle: 'Módulos',
      unidade: 'módulos',
      items: ['Financeiro', 'Compras', 'Vendas', 'Estoque', 'Cadastros', 'Relatórios', 'Dashboard executivo', 'IA integrada'],
    },
    emitaqui: {
      title: 'Emitaqui',
      kind: 'Emissor de NF-e e NFC-e',
      summary:
        'Emissor de NF-e (modelo 55) e NFC-e (modelo 65) no leiaute 4.00, já preparado para a Reforma Tributária do Consumo. Tem versão web e aplicativo para Windows e macOS.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: [
        'Emissão de NF-e e NFC-e',
        'Cálculo de IBS, CBS e IS',
        'Validação contra o XSD oficial',
        'Assinatura digital do XML',
        'Contingência off-line',
        'Cancelamento e carta de correção',
        'Recebimento de documentos fiscais',
        'Caixa (PDV)',
        'Mais de 4.400 testes automatizados',
      ],
    },
    'nfse-nacional': {
      title: 'NFS-e Nacional',
      kind: 'Emissor de NFS-e',
      summary:
        'Emissor de NFS-e no padrão nacional, independente de ERP. Está na primeira versão: já emitiu, consultou e cancelou notas no ambiente de testes do governo.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: [
        'Emissão, consulta e cancelamento',
        'Validação da nota sem rede e sem certificado',
        'Certificado digital A1',
        'Proteção contra emissão em duplicidade',
        'Reconciliação com o ambiente nacional',
        'Linha de comando e interface web',
      ],
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
      summary: 'Consulta, download e organização automática de documentos fiscais direto da SEFAZ, em aplicativo desktop.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e', 'Download e organização automática', 'Aplicativo com atualização automática'],
    },
    'erp-financeiro': {
      title: 'ERP Financeiro',
      kind: 'Gestão financeira',
      summary: 'Sistema de gestão financeira para desktop, com contas a pagar e a receber, conciliação bancária e relatórios.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: [
        'Contas a pagar e a receber',
        'Contas bancárias com saldo atualizado',
        'Importação e conciliação de OFX',
        'Fluxo de caixa e DRE',
        'Exportação em PDF, Excel e CSV',
        'Integração com NFS-e',
        'Permissões por usuário e empresa',
      ],
    },
    sass: {
      title: 'SASS',
      kind: 'Investimentos imobiliários',
      summary:
        'Gestão de investimentos imobiliários em dois módulos que conversam entre si: participação em obras por administração e leilão de imóveis.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: [
        'Obras: aportes, custos e execução financeira',
        'Venda e aluguel com resultado e ROI',
        'Locações, baixas e reajustes',
        'Leilão: custos de aquisição e reforma',
        'Simulador de arremate',
        'Painel consolidado e relatórios',
      ],
    },
    apptype: {
      title: 'AppType',
      kind: 'Mobilidade urbana',
      summary:
        'Plataforma de transporte por aplicativo, com app para passageiros e motoristas e painel administrativo. O motorista paga uma assinatura e fica com 100% da tarifa.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: [
        'Corridas em tempo real',
        'Geolocalização e rotas',
        'Pagamento por PIX e cartão',
        'Carteira digital do motorista',
        'Assinatura de motoristas',
        'Chat, avaliações e cupons',
        'Login em duas etapas',
        'Painel administrativo',
      ],
    },
    confeitaria: {
      title: 'Confeitaria',
      kind: 'Gestão de pedidos',
      summary: 'Sistema de pedidos, produção e estoque para confeitarias, em aplicativo desktop, com painel da cozinha pelo celular.',
      listTitle: 'Recursos',
      unidade: 'recursos',
      items: ['Pedidos e clientes', 'Produção', 'Estoque', 'Painel da cozinha no celular', 'Relatórios', 'Backup do banco de dados', 'Nome e logo de cada cliente'],
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
      items: [
        'Medical schedule',
        'Patients',
        'Electronic health records',
        'Specialties',
        'Finance',
        'Dashboard',
        'Access roles',
        'Audit log',
        'Artificial intelligence',
        'Mobile app',
      ],
    },
    'dwm-erp': {
      title: 'DWM ERP',
      kind: 'ERP',
      summary: 'An ERP system built for business management, with an executive dashboard and built-in AI.',
      listTitle: 'Modules',
      unidade: 'modules',
      items: ['Finance', 'Purchasing', 'Sales', 'Inventory', 'Records', 'Reports', 'Executive dashboard', 'Built-in AI'],
    },
    emitaqui: {
      title: 'Emitaqui',
      kind: 'NF-e and NFC-e issuer',
      summary:
        'An issuer for the Brazilian electronic invoices NF-e (model 55) and NFC-e (model 65), layout 4.00, already prepared for the Consumption Tax Reform. It has a web version and an app for Windows and macOS.',
      listTitle: 'Features',
      unidade: 'features',
      items: [
        'NF-e and NFC-e issuing',
        'IBS, CBS and IS tax calculation',
        'Validation against the official XSD',
        'XML digital signature',
        'Offline contingency mode',
        'Cancellation and correction letter',
        'Receiving tax documents',
        'Point of sale (POS)',
        'Over 4,400 automated tests',
      ],
    },
    'nfse-nacional': {
      title: 'NFS-e Nacional',
      kind: 'NFS-e issuer',
      summary:
        'An issuer for NFS-e, the Brazilian service invoice, in the national standard and independent of any ERP. It is at its first version: it has already issued, queried and cancelled invoices in the government test environment.',
      listTitle: 'Features',
      unidade: 'features',
      items: [
        'Issuing, querying and cancelling',
        'Invoice validation with no network or certificate',
        'A1 digital certificate',
        'Protection against duplicate issuing',
        'Reconciliation with the national environment',
        'Command line and web interface',
      ],
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
      summary: 'Automatic retrieval, download and organization of Brazilian tax documents straight from SEFAZ, in a desktop app.',
      listTitle: 'Features',
      unidade: 'features',
      items: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e', 'Automatic download and organization', 'App with automatic updates'],
    },
    'erp-financeiro': {
      title: 'ERP Financeiro',
      kind: 'Financial management',
      summary: 'A desktop financial management system, with accounts payable and receivable, bank reconciliation and reports.',
      listTitle: 'Features',
      unidade: 'features',
      items: [
        'Accounts payable and receivable',
        'Bank accounts with up-to-date balances',
        'OFX import and reconciliation',
        'Cash flow and income statement',
        'Export to PDF, Excel and CSV',
        'NFS-e integration',
        'Permissions by user and company',
      ],
    },
    sass: {
      title: 'SASS',
      kind: 'Real estate investments',
      summary: 'Real estate investment management in two modules that work together: shares in construction projects and property auctions.',
      listTitle: 'Features',
      unidade: 'features',
      items: [
        'Construction: contributions, costs and financial progress',
        'Sale and rental with result and ROI',
        'Leases, payments and rent adjustments',
        'Auctions: acquisition and renovation costs',
        'Bid simulator',
        'Consolidated dashboard and reports',
      ],
    },
    apptype: {
      title: 'AppType',
      kind: 'Urban mobility',
      summary: 'A ride-hailing platform, with an app for passengers and drivers and an admin panel. Drivers pay a subscription and keep 100% of the fare.',
      listTitle: 'Features',
      unidade: 'features',
      items: [
        'Real-time rides',
        'Geolocation and routes',
        'Payment by PIX and card',
        'Driver digital wallet',
        'Driver subscriptions',
        'Chat, ratings and coupons',
        'Two-step login',
        'Admin panel',
      ],
    },
    confeitaria: {
      title: 'Confeitaria',
      kind: 'Order management',
      summary: 'An orders, production and inventory system for bakeries, as a desktop app, with a kitchen panel on the phone.',
      listTitle: 'Features',
      unidade: 'features',
      items: ['Orders and customers', 'Production', 'Inventory', 'Kitchen panel on the phone', 'Reports', 'Database backup', 'Each client’s own name and logo'],
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
  if (!cache[lang]) {
    const text = profileText[lang]
    cache[lang] = {
      profile: {
        ...site,
        ...text,
        // "{projetos}" vira a quantidade de projetos da lista, para o número nunca ficar desatualizado
        numeros: text.numeros.map((n) => ({ ...n, valor: n.valor.replace('{projetos}', String(projectBase.length)) })),
      },
      projects: projectBase.map((p) => ({ ...p, ...projectText[lang][p.id] })),
    }
  }
  return cache[lang]
}
