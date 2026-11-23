// Gera o papel de parede do site: src/assets/paisagem.svg (a cena) e src/assets/nuvens.svg (as nuvens, que se movem).
// A cena é de Mato Grosso do Sul numa tarde de céu com névoa: as chapadas de topo reto da Serra de Maracaju ao fundo,
// a planície alagada do Pantanal no meio e carandás (a palmeira do Pantanal) no primeiro plano.
// É desenhada por código, com números aleatórios de semente fixa: rodar de novo gera exatamente o mesmo arquivo.
// Para ajustar cores, posições ou alturas, mude as constantes abaixo e rode:  node scripts/paisagem.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const W = 1600
const H = 1000
const DESTINO = join(dirname(fileURLToPath(import.meta.url)), '../src/assets')

const COR = {
  ceu: ['#bfb9d6', '#d3cbe2', '#e6d9e3', '#f2dfda', '#f8e5d6'], // do alto até a linha do horizonte
  sol: '#fff4e8',
  chapadaLonge: ['#b9add2', '#d8cce0'], // topo, pé (a névoa clareia o pé de cada camada)
  chapadaPerto: ['#9383ba', '#b5a7cc'],
  mata: ['#6a5a9a', '#8879ae'],
  agua: ['#efddd8', '#c3b7d5'],
  margem: ['#352a5f', '#1c1634'],
  caranda: '#281f4b',
  nuvem: '#fcefea',
  nuvemAlta: '#aea5cb',
}

const SOL = { x: 1175, y: 592, r: 22 }
const AGUA = 712 // linha d'água: a planície termina aqui

// ---------- ferramentas ----------
function aleatorio(semente) {
  let a = semente
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function ruido(semente) {
  const r = aleatorio(semente)
  const v = Array.from({ length: 1024 }, () => r() * 2 - 1)
  const em = (i) => v[((i % 1024) + 1024) % 1024]
  return (x) => {
    const i = Math.floor(x)
    const t = (1 - Math.cos((x - i) * Math.PI)) / 2
    return em(i) + (em(i + 1) - em(i)) * t
  }
}
function fbm(n, x, oitavas = 4) {
  let soma = 0
  let amp = 1
  let freq = 1
  let total = 0
  for (let o = 0; o < oitavas; o++) {
    soma += amp * n(x * freq + o * 37.1)
    total += amp
    amp *= 0.5
    freq *= 2.07
  }
  return soma / total
}
const suave = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}
const sino = (x, centro, largura) => Math.exp(-(((x - centro) / largura) ** 2))
const num = (n) => (Math.round(n * 10) / 10).toString()

// chapada: topo plano, escarpa íngreme na borda e talude suave no pé
function chapada(x, { x0, x1, h, borda }) {
  const escarpa = suave(x0 - borda, x0 + borda, x) * (1 - suave(x1 - borda, x1 + borda, x))
  const talude = suave(x0 - 7 * borda, x0 + borda, x) * (1 - suave(x1 - borda, x1 + 7 * borda, x))
  return h * (0.72 * escarpa + 0.28 * talude)
}

function perfil(fn, passo = 4) {
  const pts = []
  for (let x = -20; x <= W + 20; x += passo) pts.push([x, fn(x)])
  return pts
}
function area(pts, base = H) {
  return `M${num(pts[0][0])} ${base}` + pts.map(([x, y]) => `L${num(x)} ${num(y)}`).join('') + `L${num(pts.at(-1)[0])} ${base}Z`
}
function poligono(pts) {
  // todas as formas no mesmo sentido, para que folhas sobrepostas não abram buracos no preenchimento
  const sentido = pts.reduce((s, [x, y], i) => {
    const [x2, y2] = pts[(i + 1) % pts.length]
    return s + x * y2 - x2 * y
  }, 0)
  const p = sentido < 0 ? [...pts].reverse() : pts
  return 'M' + p.map(([x, y]) => `${num(x)} ${num(y)}`).join('L') + 'Z'
}

// carandá: tronco fino e alto, copa redonda de folhas em leque e uma saia de folhas secas caídas
function caranda(x, chao, altura, { inclina = 0, semente = 1, folhas = 30 } = {}) {
  const r = aleatorio(semente)
  const copa = altura * 0.14
  const larguraTronco = Math.max(0.7, altura * 0.019)
  const topo = [x + inclina, chao - altura]
  const meio = [x + inclina * 0.15, chao - altura * 0.55]
  const curva = (t) => [
    (1 - t) ** 2 * x + 2 * (1 - t) * t * meio[0] + t * t * topo[0],
    (1 - t) ** 2 * chao + 2 * (1 - t) * t * meio[1] + t * t * topo[1],
  ]
  const esq = []
  const dir = []
  for (let i = 0; i <= 14; i++) {
    const [px, py] = curva(i / 14)
    const w = larguraTronco * (1 - 0.35 * (i / 14))
    esq.push([px - w, py])
    dir.push([px + w, py])
  }
  const formas = [poligono([...esq, ...dir.reverse()])]
  // miolo da copa, para as folhas não deixarem buracos no meio
  const miolo = []
  for (let k = 0; k < 14; k++) {
    const ang = (k / 14) * Math.PI * 2
    miolo.push([topo[0] + Math.cos(ang) * copa * 0.32, topo[1] + Math.sin(ang) * copa * 0.3])
  }
  formas.push(poligono(miolo))

  for (let i = 0; i < folhas; i++) {
    let a = (i / folhas) * Math.PI * 2 + (r() - 0.5) * 0.5
    const caida = Math.sin(a) > 0.3
    if (caida) a += (Math.PI / 2 - a) * 0.6 // as folhas secas pendem quase retas, junto ao tronco
    const comp = copa * (caida ? 0.8 + r() * 0.45 : 0.6 + r() * 0.55)
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    const px = -dy
    const py = dx
    const w = copa * 0.04
    const c = [topo[0] + dx * comp * 0.45, topo[1] + dy * comp * 0.45]
    const raio = comp * 0.55
    const abertura = caida ? 0.13 : 0.3 + r() * 0.25
    const pts = [
      [topo[0] + px * w, topo[1] + py * w],
      [c[0] + px * w, c[1] + py * w],
    ]
    const pontas = 9
    for (let k = 0; k <= pontas; k++) {
      const ang = a + abertura - (2 * abertura * k) / pontas
      const rr = raio * (k % 2 ? 0.76 : 1)
      pts.push([c[0] + Math.cos(ang) * rr, c[1] + Math.sin(ang) * rr])
    }
    pts.push([c[0] - px * w, c[1] - py * w], [topo[0] - px * w, topo[1] - py * w])
    formas.push(poligono(pts))
  }
  return formas.join('')
}

const gradiente = (id, [cima, baixo], y1, y2) =>
  `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y1}" x2="0" y2="${y2}"><stop offset="0" stop-color="${cima}"/><stop offset="1" stop-color="${baixo}"/></linearGradient>`

// ---------- camadas ----------
const n1 = ruido(11)
const n2 = ruido(23)
const n3 = ruido(37)
const n4 = ruido(41)
const n5 = ruido(53)

const chapadasLonge = [
  { x0: -200, x1: 330, h: 44, borda: 7 },
  { x0: 470, x1: 700, h: 26, borda: 6 },
  { x0: 1290, x1: 1820, h: 52, borda: 8 },
]
const longe = perfil((x) => 607 - chapadasLonge.reduce((s, c) => s + chapada(x, c), 0) - fbm(n1, x * 0.02) * 3)

const chapadasPerto = [
  { x0: -200, x1: 180, h: 58, borda: 6 },
  { x0: 760, x1: 960, h: 30, borda: 5 },
  { x0: 1470, x1: 1800, h: 40, borda: 6 },
]
const perto = perfil(
  (x) => 660 - chapadasPerto.reduce((s, c) => s + chapada(x, c), 0) - fbm(n2, x * 0.004) * 8 - fbm(n2, x * 0.05) * 2.5,
)

// capões: as ilhas de mato que se erguem na planície do Pantanal
const capoes = [
  [250, 60, 9],
  [520, 90, 12],
  [880, 50, 7],
  [1240, 110, 13],
  [1500, 70, 8],
]
const mataY = (x) =>
  AGUA - 8 - fbm(n3, x * 0.012) * 6 - Math.abs(n4(x * 0.09)) * 6 - capoes.reduce((s, [c, l, h]) => s + h * sino(x, c, l), 0)
const mata = perfil(mataY, 3)
// o reflexo da mata na água: o mesmo contorno, espelhado e achatado
const reflexo = mata.map(([x, y]) => [x, AGUA + (AGUA - y) * 0.55])

const margemY = (x) =>
  846 + fbm(n5, x * 0.006) * 12 - 70 * sino(x, 60, 300) - 84 * sino(x, 1580, 320) - Math.abs(n1(x * 0.35)) * 4
const margem = perfil(margemY, 3)

// touceiras de capim na beira d'água
const rc = aleatorio(63)
let capim = ''
for (let k = 0; k < 90; k++) {
  const x = rc() * W
  const chao = margemY(x) + 3
  const folhas = 3 + Math.floor(rc() * 4)
  const altura = 5 + rc() * 14
  for (let f = 0; f < folhas; f++) {
    const lado = (f / (folhas - 1) - 0.5) * 2
    const ponta = [x + lado * altura * 0.45 + (rc() - 0.5) * 3, chao - altura * (1 - Math.abs(lado) * 0.35)]
    capim += poligono([[x - 1.2, chao], ponta, [x + 1.2, chao]])
  }
}

// carandás: [x, altura, inclinação, semente]
const carandasLonge = [
  [140, 40, 1, 3],
  [168, 52, -1, 4],
  [610, 44, 0, 5],
  [648, 58, 1, 6],
  [1188, 46, -1, 7],
  [1322, 62, 1, 8],
  [1352, 40, 0, 9],
]
const carandasPerto = [
  [70, 150, -4, 21],
  [132, 250, -9, 22],
  [208, 205, 7, 23],
  [646, 96, -3, 24],
  [676, 124, 4, 25],
  [1398, 165, -4, 26],
  [1458, 235, 10, 27],
  [1532, 285, -6, 28],
]

// brilho do sol na água: traços curtos que se alargam na direção de quem olha
const rb = aleatorio(91)
let brilho = ''
for (let k = 0; k < 22; k++) {
  const y = AGUA + 3 + k * 5.6 + rb() * 3
  const largura = 10 + k * 3.4 + rb() * 18
  let x = SOL.x - largura / 2 + (rb() - 0.5) * (6 + k)
  // cada linha quebra em dois ou três pedaços, como a luz sobre a água mexida
  while (x < SOL.x + largura / 2) {
    const pedaco = 3 + rb() * largura * 0.45
    brilho += `<rect x="${num(x)}" y="${num(y)}" width="${num(pedaco)}" height="${num(1.2 + rb() * 0.8)}" rx="0.8" opacity="${num((0.9 - k * 0.03) * (0.6 + rb() * 0.4))}"/>`
    x += pedaco + 2 + rb() * 9
  }
}
// marolas: linhas finas, claras e escuras
const rm = aleatorio(77)
let marolasClaras = ''
let marolasEscuras = ''
for (let k = 0; k < 64; k++) {
  const y = AGUA + 6 + rm() * 130
  const comp = 30 + rm() * 150
  const x = rm() * (W - comp)
  const linha = `<rect x="${num(x)}" y="${num(y)}" width="${num(comp)}" height="1" opacity="${num(0.2 + rm() * 0.25)}"/>`
  if (k % 3) marolasClaras += linha
  else marolasEscuras += linha
}

const paisagem = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">
<defs>
<linearGradient id="ceu" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${AGUA}">${COR.ceu
  .map((c, i) => `<stop offset="${[0, 0.35, 0.62, 0.82, 1][i]}" stop-color="${c}"/>`)
  .join('')}</linearGradient>
<radialGradient id="halo" gradientUnits="userSpaceOnUse" cx="${SOL.x}" cy="${SOL.y}" r="440" gradientTransform="translate(${SOL.x} ${SOL.y}) scale(1 0.5) translate(${-SOL.x} ${-SOL.y})"><stop offset="0" stop-color="#fff1e2" stop-opacity="0.95"/><stop offset="0.16" stop-color="#fbe3d0" stop-opacity="0.7"/><stop offset="0.5" stop-color="#f3d9d6" stop-opacity="0.25"/><stop offset="1" stop-color="#f0d8dc" stop-opacity="0"/></radialGradient>
${gradiente('longe', COR.chapadaLonge, 548, 640)}
${gradiente('perto', COR.chapadaPerto, 596, 690)}
${gradiente('mata', COR.mata, 680, AGUA)}
${gradiente('agua', COR.agua, AGUA, 850)}
${gradiente('margem', COR.margem, 770, H)}
</defs>
<rect width="${W}" height="${H}" fill="url(#ceu)"/>
<rect width="${W}" height="${H}" fill="url(#halo)"/>
<circle cx="${SOL.x}" cy="${SOL.y}" r="${SOL.r}" fill="${COR.sol}"/>
<path fill="url(#longe)" d="${area(longe)}"/>
<path fill="url(#perto)" d="${area(perto)}"/>
<g fill="${COR.mata[0]}">${carandasLonge.map(([x, h, i, s]) => `<path d="${caranda(x, mataY(x) + 4, h, { inclina: i, semente: s, folhas: 22 })}"/>`).join('')}</g>
<path fill="url(#mata)" d="${area(mata)}"/>
<rect y="${AGUA}" width="${W}" height="${H - AGUA}" fill="url(#agua)"/>
<path fill="${COR.mata[1]}" opacity="0.3" d="M-20 ${AGUA}${reflexo.map(([x, y]) => `L${num(x)} ${num(y)}`).join('')}L${W + 20} ${AGUA}Z"/>
<g fill="#fbeee6">${marolasClaras}</g>
<g fill="#9d90c0">${marolasEscuras}</g>
<g fill="#fff4e8">${brilho}</g>
<path fill="url(#margem)" d="${area(margem)}"/>
<path fill="${COR.margem[0]}" d="${capim}"/>
<g fill="${COR.caranda}">${carandasPerto.map(([x, h, i, s]) => `<path d="${caranda(x, margemY(x) + 6, h, { inclina: i, semente: s })}"/>`).join('')}</g>
</svg>
`

// nuvens: faixas finas e compridas, iluminadas por baixo pelo sol baixo. [x, y, raio x, raio y, opacidade, alta]
const faixas = [
  [700, 262, 300, 6, 0.3, true],
  [1290, 284, 250, 5, 0.26, true],
  [520, 312, 330, 7, 0.45],
  [800, 330, 210, 5, 0.35],
  [1100, 352, 220, 6, 0.4],
  [320, 420, 250, 8, 0.5],
  [960, 438, 360, 8, 0.55],
  [1230, 404, 170, 5, 0.42],
  [640, 488, 300, 6, 0.5],
  [1110, 506, 200, 5, 0.55],
]
const nuvens = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice">
<defs><filter id="desfoque" x="-10%" y="-200%" width="120%" height="500%"><feGaussianBlur stdDeviation="3.5"/></filter></defs>
<g filter="url(#desfoque)">${faixas
  .map(
    ([x, y, rx, ry, o, alta]) =>
      `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${alta ? COR.nuvemAlta : COR.nuvem}" opacity="${o}"/>`,
  )
  .join('')}</g>
</svg>
`

mkdirSync(DESTINO, { recursive: true })
writeFileSync(join(DESTINO, 'paisagem.svg'), paisagem)
writeFileSync(join(DESTINO, 'nuvens.svg'), nuvens)
console.log(`paisagem.svg: ${(paisagem.length / 1024).toFixed(1)} KB, nuvens.svg: ${(nuvens.length / 1024).toFixed(1)} KB`)
