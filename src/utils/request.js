import axios from 'axios'

// 基础地址：
const baseURL = 'http://192.168.3.76:8099'

// 创建 Axios 实例
const instance = axios.create({
  timeout: 10000, // 设置超时时间（毫秒）
  baseURL,
  // 设置请求头
  headers: {},
})

// 导出实例
export default instance
