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

Todo o texto está em `src/data/profile.ts`: bio, números, competências, trajetória, contato e projetos.

- **Contato:** preencha `contact.email`, `linkedin`, `whatsapp` e `cv`. Campo vazio não aparece no site.
- **Projetos:** cada item aceita `link` (sistema no ar), `repo` (código público) e `images`.
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
