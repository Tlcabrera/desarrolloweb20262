import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // En desarrollo, todo lo que empiece por /api se reenvía al backend de Express.
    // Así el navegador cree que front y back son el mismo origen: no hay problema de CORS.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'jsdom', // un navegador simulado para las pruebas
    setupFiles: './src/test/setup.ts',
  },
})
