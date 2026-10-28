import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // dist/.vite/manifest.json: el prerender lo lee para precargar el paquete de cada página diferida.
  build: { manifest: true },
  resolve: {
    // "@/..." apunta a src/ (p. ej. import { SITE } from '@/config/site').
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
