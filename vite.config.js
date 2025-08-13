import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://113.44.144.219:8084/', //请求的地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，用于重写请求路径
      },
      onProxyReq(proxyReq) {
        proxyReq.removeHeader('origin')
      },
    },
  },
})
