import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // target: 'https://anuncios-app-back.onrender.com',
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
