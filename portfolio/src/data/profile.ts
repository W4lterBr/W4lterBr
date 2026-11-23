// Todo o conteúdo do site mora neste arquivo. Edite aqui; nenhum texto está espalhado pelos componentes.

export type Project = {
  id: string
  file: string
  title: string
  kind: string
  summary: string
  listTitle: string
  /** Como contar os itens na etiqueta do cabeçalho, ex.: "7 recursos". */
  unidade: string
  items: string[]
  stack: string[]
  /** Duas cores do degradê do projeto (ícone e cabeçalho). O texto sobre elas é branco: use tons médios ou escuros. */
  cor: [string, string]
  /** Desenho do ícone. Os disponíveis estão em src/apps/Projetos.tsx. */
  icone: 'saude' | 'grafico' | 'caminhao' | 'codigo' | 'brilho'
  /** URL pública do sistema ou de uma demonstração. Vazio = não aparece. */
  link?: string
  /** URL do repositório, se for público. Vazio = aparece "Código privado". */
  repo?: string
  /** Prints em public/projetos/<id>/, ex.: ['projetos/planmed/agenda.webp'] */
  images?: string[]
}

export const profile = {
  name: 'Walter Manoel',
  role: 'Desenvolvedor Full Stack',
  brand: 'DWM Systems',
  city: 'Campo Grande, MS',
  natureza: 'Desenvolvimento de sistemas empresariais, automação fiscal e IA aplicada',
  bio: [
    'Sou desenvolvedor Full Stack com foco em sistemas empresariais e automação de processos.',
    'Minha experiência em tecnologia, aliada ao conhecimento da área fiscal e contábil, permite desenvolver soluções voltadas às necessidades reais das empresas brasileiras.',
    'Atualmente trabalho no desenvolvimento de aplicações Web, Desktop e Mobile utilizando arquiteturas modernas e integração com Inteligência Artificial.',
  ],
  objetivo:
    'Desenvolver soluções que simplifiquem processos empresariais através de software de alta qualidade, automação e inteligência artificial.',

  // Contato. Campo vazio não aparece no site.
  contact: {
    github: 'https://github.com/W4lterBr',
    email: '',
    linkedin: '',
    whatsapp: '', // só dígitos com DDI, ex.: 5567999990000
    cv: '', // URL do currículo em PDF ou página
  },

  // Player de música (barra do topo e tela de bloqueio).
  // Cole em `soundcloud` o link de uma playlist, faixa ou perfil do SoundCloud.
  // `titulo` e `artista` aparecem só até a primeira faixa carregar.
  music: {
    titulo: 'lofi hip hop',
    artista: 'Chillhop Music',
    soundcloud: 'https://soundcloud.com/chillhopdotcom/sets/lofihiphop',
  },

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

  // Tabela "Dados dos serviços" do documento Sobre
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
}

export const projects: Project[] = [
  {
    id: 'planmed',
    cor: ['#0fa394', '#0a5f73'],
    icone: 'saude',
    file: 'PlanMed.xml',
    title: 'PlanMed',
    kind: 'Gestão de clínicas',
    summary: 'Sistema completo para gestão de clínicas, com aplicativo mobile e inteligência artificial integrada.',
    listTitle: 'Principais recursos',
    unidade: 'recursos',
    items: ['Agenda médica', 'Pacientes', 'Especialidades', 'Financeiro', 'Dashboard', 'Inteligência artificial', 'Aplicativo mobile'],
    stack: ['React', 'TypeScript', 'React Native'], // confirmar
  },
  {
    id: 'dwm-erp',
    cor: ['#8a61e8', '#4a28a6'],
    icone: 'grafico',
    file: 'DWM-ERP.xml',
    title: 'DWM ERP',
    kind: 'ERP',
    summary: 'Sistema ERP desenvolvido para gestão empresarial, com dashboard executivo e IA integrada.',
    listTitle: 'Módulos',
    unidade: 'módulos',
    items: ['Financeiro', 'Compras', 'Vendas', 'Estoque', 'Cadastros', 'Relatórios', 'Dashboard executivo', 'IA integrada'],
    stack: ['Python'], // confirmar
  },
  {
    id: 'emissor-cte',
    cor: ['#dd6b10', '#a83808'],
    icone: 'caminhao',
    file: 'Emissor-CTe.xml',
    title: 'Emissor CT-e',
    kind: 'Documentos fiscais',
    summary: 'Sistema profissional para emissão de documentos fiscais eletrônicos, da geração do XML à autorização na SEFAZ.',
    listTitle: 'Recursos',
    unidade: 'recursos',
    items: ['Emissão de CT-e', 'Geração de XML', 'Impressão do DACTE', 'Certificado digital A1', 'Comunicação com a SEFAZ'],
    stack: ['XML', 'Certificado A1', 'Web Services SEFAZ'],
  },
  {
    id: 'captura-xml',
    cor: ['#3d8bf0', '#1f4fc0'],
    icone: 'codigo',
    file: 'Captura-XML.xml',
    title: 'Captura Inteligente de XML',
    kind: 'Automação fiscal',
    summary: 'Consulta automática de documentos fiscais, com integração completa aos Web Services da SEFAZ.',
    listTitle: 'Documentos consultados',
    unidade: 'tipos de documento',
    items: ['NF-e', 'NFC-e', 'CT-e', 'NFS-e'],
    stack: ['Python', 'Web Services SEFAZ'], // confirmar
  },
  {
    id: 'ia',
    cor: ['#e44d8e', '#9c2463'],
    icone: 'brilho',
    file: 'IA-Aplicada.xml',
    title: 'Inteligência Artificial',
    kind: 'IA aplicada',
    summary: 'Aplicações que usam IA dentro de sistemas empresariais.',
    listTitle: 'Onde a IA entra',
    unidade: 'aplicações',
    items: ['Assistentes inteligentes', 'Automação de processos', 'Atendimento', 'Geração de conteúdo', 'Produtividade empresarial'],
    stack: ['IA generativa', 'Engenharia de prompt'],
  },
]
