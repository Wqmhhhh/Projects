import { createApp } from 'vue'

import App from './App.vue'

// 导入 router
import router from './router'

// 导入 Pinia
import { createPinia } from 'pinia'
// 导入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 导入el-icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia.use(piniaPluginPersistedstate))

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
