import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/get-on-your-apprenticeship/', // Chemin de base pour GitHub Pages
  build: {
    outDir: 'dist', // Dossier de sortie pour les fichiers de build
  },
})
