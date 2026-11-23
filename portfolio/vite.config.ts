import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativo: o site funciona em qualquer caminho (ex.: /W4lterBr/ no GitHub Pages)
export default defineConfig({
  base: './',
  plugins: [react()],
})
