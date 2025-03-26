import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

//方便在项目中统一管理 Pinia store 的导入路径
// export * from './modules/'
