import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'https://ubiquitous-space-succotash-749pw9xjr793wj7-3001.app.github.dev'
    }
  }
})