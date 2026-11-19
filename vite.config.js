import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// base matches GitHub Pages project URL: /pramod-portfolio/
export default defineConfig({ base: '/pramod-portfolio/', plugins: [react()],
  build: { rollupOptions: { output: { manualChunks: { three: ['three','@react-three/fiber','@react-three/drei'] } } }, chunkSizeWarningLimit: 1200 } })
