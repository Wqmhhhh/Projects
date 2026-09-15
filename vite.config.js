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
      // 只在开发环境下代理
      '/api': {
        target: 'https://113.44.144.219:8084', // 云端后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，用于重写请求路径
        secure: false, // 如果云端证书是自签名要设成 false
      },
      onProxyReq(proxyReq) {
        proxyReq.removeHeader('origin')
      },
    },
  },
})
