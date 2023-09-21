import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'vue-i18n', 'naive-ui', '@vueuse/core', 'nanostores', '@nanostores/vue'],
          highlight: ['highlight.js'],
        },
      },
    },
  },
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
