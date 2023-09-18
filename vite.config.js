import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
      vue(),
    UnoCSS()
  ],
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
})
