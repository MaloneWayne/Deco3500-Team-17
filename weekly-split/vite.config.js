import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/Deco3500-Team-17/' : '/',
  server: {
    host: true,
    port: 5173,
  },
})
