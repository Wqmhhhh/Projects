import axios from 'axios'

// 导入库
import { useChatUserInfo } from '@/stores'

// 导入加载动画
import { storeToRefs } from 'pinia'

// 基础地址：后端服务器的API接口
const baseURL = '/chatApi'

// 创建 Axios 实例
const instance = axios.create({
  // 设置超时时间（毫秒）
  timeout: 5000,

  // 设置基础地址
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  // 发送请求前的操作
  (config) => {
    const UserStore = useChatUserInfo()
    const { emailToken, accountToken } = storeToRefs(UserStore)

    // 需要请求头的路径数组
    if (!(config.url.includes('/user/register') || config.url.includes('/user/login'))) {
      let token = accountToken.value ? accountToken.value : emailToken.value

      config.headers['Authorization'] = 'Bearer ' + token
    }

    console.log('Content-Type', config.headers['Content-Type'])

    return config
  },

  // 请求错误操作
  (error) => {
    // 将错误封装为一个被拒绝的 Promise 对象进行返回
    return Promise.reject(error)
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
      console.log('status', status)
    }
    return Promise.reject(error) // 确保返回被拒绝的Promise
  },
)

// 导出实例
export default instance

// 按需导出
export { baseURL }
