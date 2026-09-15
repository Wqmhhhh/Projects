import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建实例
const pinia = createPinia()
const app = createApp(App)
// app.use(pinia)

// 持久化插件
app.use(pinia.use(piniaPluginPersistedstate))

app.mount('#app')
