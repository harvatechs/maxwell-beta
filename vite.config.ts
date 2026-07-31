import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/maxwell-beta/', // Exact GitHub Pages repository path
  server: {
    port: 3000,
    open: false
  }
})
