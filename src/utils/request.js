import axios from 'axios'
import { useUserStore } from '@/stores'

// 设置api的基础URL
// const baseURL = 'https://113.44.144.219:8084'
const baseURL = '/api'

// 创建 Axios 实例
const instance = axios.create({
  timeout: 100,
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  // 发送请求前的操作
  (config) => {
    // 除了login其他都添加token
    const token = useUserStore().token
    if (token) {
      console.log('请求头添加token')
      const token = useUserStore().token
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  // 请求错误操作
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  // 处理响应数据
  (res) => {
    return res
  },
  // 响应错误操作
  (error) => {
    return Promise.reject(error)
  },
)

// 导出实例
export default instance
export { baseURL }
