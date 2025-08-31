import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  // base: 'http://192.168.3.76:8099',
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.76:8099/', //请求的地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，用于重写请求路径
      },
      '/chatApi': {
        // target: 'http://192.168.3.225:8888',
        target: 'http://8.137.23.88:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chatApi/, ''), // 可选，用于重写请求路径
      },
      onProxyReq(proxyReq) {
        proxyReq.removeHeader('origin')
      },
    },
  },
})
