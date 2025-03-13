import axios from 'axios'

// 设置api的基础URL
const baseURL = 'http://'

// 创建 Axios 实例
const instance = axios.create({
  timeout: 10000, // 设置超时时间（毫秒）
  baseURL,
  // 设置请求头
  headers: {},
})

// 导出实例
export default instance
