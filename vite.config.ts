import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({
    
  })],
  server: {
    //host: true,
    port: 3000,
  },
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, './src') },
    ],
  },
})
