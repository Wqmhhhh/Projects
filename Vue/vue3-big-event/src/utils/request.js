import axios from 'axios'
import { useUserStore } from '@/stores/index'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 2. 携带token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    // 3. 处理业务失败
    ElMessage.error(res.data.message || '服务器繁忙')
    return Promise.reject(res.data)
  },
  (err) => {
    // 5. 处理401错误：错误特殊情况，拦截回登录页面
    if (err.response.status === 401) {
      router.push('/login')
    }
    // 错误默认情况
    ElMessage.error(err.response.data.message || '服务器繁忙')
    return Promise.reject(err)
  },
)

// 处理携带cookie的前端跨域
Vue.http.options.credentials = true

export default instance

// 按需导出
export { baseURL }
