import axios from 'axios'

// 设置api的基础URL
const baseURL = ''

// 创建 Axios 实例
const instance = axios.create({
  timeout: 5000,
  baseURL,
  headers: {},
})

// 请求拦截器
instance.interceptors.request.use(
  // 发送请求前的操作
  (config) => {
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
