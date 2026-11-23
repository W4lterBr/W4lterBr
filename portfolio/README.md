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

O workflow `.github/workflows/deploy.yml` (na raiz do repositório) publica no GitHub Pages a cada push em `main`
que altere `portfolio/`. Em Settings > Pages, escolha "GitHub Actions" como fonte.

Se o endereço do site mudar, atualize `og:url` e `og:image` em `index.html`.

## Imagem de prévia do link

`public/og.png` é gerada a partir de `scripts/og.html` com o Chrome:

```bash
chrome --headless=new --hide-scrollbars --window-size=1200,630 --allow-file-access-from-files \
  --screenshot=public/og.png scripts/og.html
```
