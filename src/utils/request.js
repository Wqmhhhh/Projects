import axios from 'axios'

// 导入库
import { useUserStore } from '@/stores'

// 基础地址：后端服务器的API接口
const baseURL = 'http://192.168.3.76:8099'

// 创建 Axios 实例
const instance = axios.create({
  // 设置超时时间（毫秒）
  timeout: 5000,

  // 设置基础地址
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  // 发送请求前的操作
  (config) => {
    // 携带 token 进行数据访问
    const UserStore = useUserStore()
    if (UserStore.token) {
      // 在请求头中添加认证信息字段
      config.headers.Authorization = UserStore.token
    }
    return config
  },

  // 请求错误操作
  (error) => {
    // 将错误封装为一个被拒绝的 Promise 对象进行返回
    // return Promise.reject(error)
    console.log(error)
    return error
  },
)

// 响应拦截器
instance.interceptors.response.use(
  // 对响应数据操作
  (response) => {
    return response
  },

  // 响应错误操作
  (error) => {
    console.log(error)
    if (error.message === 'Network Error') {
      ElMessage.error('网络连接异常，请检查服务器状态')
    } else if (error.response) {
      const { status } = error.response
      console.log(status)
    }
    return Promise.reject(error) // 确保返回被拒绝的Promise
  },
)

// 导出实例
export default instance

// 按需导出
export { baseURL }
