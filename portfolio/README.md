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

## Imagem de prévia do link

`public/og.png` é gerada a partir de `scripts/og.html` com o Chrome:

```bash
chrome --headless=new --hide-scrollbars --window-size=1200,630 --allow-file-access-from-files \
  --screenshot=public/og.png scripts/og.html
```

## Música, sons e barra do topo

- **Música:** o player usa o SoundCloud. Em `src/data/profile.ts`, troque `music.soundcloud` pelo link de uma playlist,
  faixa ou perfil. O player carrega em segundo plano logo depois da página, sem tocar, para já mostrar o nome e a capa
  da faixa certa; `music.comecarNaFaixa` diz em qual faixa da playlist ele começa.
- **Sons da interface:** são sintetizados em `src/os/sounds.ts` (não há arquivos de áudio). O ícone de alto-falante
  da barra abre o controle de volume, que vale para os sons e para a música.
- **Bateria:** é de enfeite. Perde 1% a cada 15 s (`DRAIN_EVERY_MS` em `src/os/StatusIcons.tsx`) e recarrega com um clique.
- **Wi-Fi:** mostra a conexão real do visitante (online/offline e velocidade estimada, quando o navegador informa).

## Idiomas

O site tem português e inglês. O logo no canto superior esquerdo abre o menu de idioma; a escolha fica salva no navegador.
Na primeira visita vale o idioma do navegador (português para quem navega em português, inglês para os demais).

- **Conteúdo** (bio, projetos, trajetória): `src/data/profile.ts`, nos blocos `pt` e `en`. Ao mudar um, mude o outro.
- **Textos da interface** (botões, avisos, rótulos): `src/i18n.tsx`.

## Cores

A paleta é uma só: a família do violeta definida no topo de `src/styles.css` (`--accent`, `--accent-strong`,
`--accent-soft`, `--c1`, `--c2`). Para trocar a cor do site, mude essas variáveis e os tons do `.wallpaper`.
