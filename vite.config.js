import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'node:path'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'naive-ui', '@vueuse/core'],
        },
      },
    },
  },
  server: {
    port: 3050,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4080',
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
