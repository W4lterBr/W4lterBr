# DWM OS: portfólio de Walter Manoel

Portfólio em formato de sistema operacional. React, TypeScript e Vite.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
npm run preview  # serve dist/ localmente
```

## Editar o conteúdo

Todo o conteúdo está em `src/data/profile.ts`, em português e em inglês: bio, números, competências, trajetória, contato e projetos.

- **Contato:** `contact.email`, `whatsapp`, `instagram`, `linkedin`, `github` e `cv`. Campo vazio não aparece no site.
- **Projetos:** cada item aceita `link` (sistema no ar), `repo` (código público) e `images`. O desenho do ícone
  (`icone`) de cada projeto também fica ali.
  Coloque os prints em `public/projetos/<id>/` em WebP, com no máximo 1600 px de largura.
- **Stack dos projetos:** os itens marcados com `// confirmar` foram deduzidos e precisam de revisão.

## Publicar

O site é publicado pela Netlify. O arquivo `netlify.toml` (na raiz do repositório) manda compilar `portfolio/`
e publicar `portfolio/dist`. Cada push em `main` atualiza o site; cada pull request ganha uma prévia.

Se o endereço do site mudar (outro nome na Netlify ou domínio próprio), atualize `og:url` e `og:image` em `index.html`.

## Papel de parede

O fundo é uma paisagem de Mato Grosso do Sul numa tarde de céu com névoa: as chapadas da Serra de Maracaju,
a planície alagada do Pantanal e carandás no primeiro plano. Ela é desenhada por código em `scripts/paisagem.mjs`,
que gera `src/assets/paisagem.svg` (a cena) e `src/assets/nuvens.svg` (as nuvens, que passam devagar).
Cores, posição do sol, chapadas e carandás são constantes do script. Depois de mudar, rode:

```bash
node scripts/paisagem.mjs
```

A mesma cena aparece na capa da janela Sobre mim, na imagem de prévia do link e no banner do perfil no GitHub.
Depois de mudar a paisagem, gere essas duas imagens de novo (comandos abaixo).

## Imagem de prévia do link e banner do perfil

`public/og.png` é gerada a partir de `scripts/og.html`, e o banner do README do perfil (`assets/banner.png`, na raiz
do repositório) a partir de `scripts/banner.html`, os dois com o Chrome:

```bash
chrome --headless=new --hide-scrollbars --window-size=1200,630 --allow-file-access-from-files \
  --screenshot=public/og.png scripts/og.html

chrome --headless=new --hide-scrollbars --window-size=1600,440 --force-device-scale-factor=1.25 \
  --default-background-color=00000000 --allow-file-access-from-files \
  --screenshot=../assets/banner.png scripts/banner.html
```

O `og.png` precisa ficar abaixo de uns 300 KB, senão o WhatsApp pode não mostrar a prévia.

## Música, sons e barra do topo

- **Música:** o player usa o SoundCloud. Em `src/data/profile.ts`, troque `music.soundcloud` pelo link de uma playlist,
  faixa ou perfil. O player carrega em segundo plano logo depois da página, sem tocar, para já mostrar o nome e a capa
  da faixa certa; `music.comecarNaFaixa` diz em qual faixa da playlist ele começa.
- **Sons da interface:** são sintetizados em `src/os/sounds.ts` (não há arquivos de áudio). O ícone de alto-falante
  da barra abre o controle de volume, que vale para os sons e para a música. Ao passar o mouse sobre o dock, cada
  ícone toca uma nota curta (`playHover`), em escala pentatônica da esquerda para a direita; no toque do celular não toca.
- **Bateria:** é de enfeite. Perde 1% a cada 15 s (`DRAIN_EVERY_MS` em `src/os/StatusIcons.tsx`) e recarrega com um clique.
- **Wi-Fi:** mostra a conexão real do visitante (online/offline e velocidade estimada, quando o navegador informa).

## Idiomas

O site tem português e inglês. O logo no canto superior esquerdo abre o menu de idioma; a escolha fica salva no navegador.
Na primeira visita vale o idioma do navegador (português para quem navega em português, inglês para os demais).

- **Conteúdo** (bio, projetos, trajetória): `src/data/profile.ts`, nos blocos `pt` e `en`. Ao mudar um, mude o outro.
- **Textos da interface** (botões, avisos, rótulos): `src/i18n.tsx`.

## Cores

A paleta é uma só: a família do violeta definida no topo de `src/styles.css` (`--accent`, `--accent-strong`,
`--accent-soft`, `--c1`, `--c2`). Para trocar a cor do site, mude essas variáveis. As cores do papel de parede
ficam em `scripts/paisagem.mjs` (veja "Papel de parede").
