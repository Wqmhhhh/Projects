import request from '@/utils/request'

// 注册新用户
export const userRegister = (email, code, password) => {
  return request.post('/user/register', { email, code, password })
}

// 使用邮箱、密码登录
export const userLogin = (email, password) => {
  return request.post('/user/passwordLogin', {
    email,
    password,
  })
}

// 刷新Token
export const userRefreshToken = () => {
  return request.post('/user/refreshToken')
}

// 修改密码
export const userChangePassword = (email, code, password) => {
  return request.put('/user/changePassword', { email, code, password })
}

// 发送修改密码验证码
export const userSendSmsCode = (email) => {
  return request.post(`/email/password?email=${email}`)
}

// 发送注册验证码
export const userSendRegisterSmsCode = (email) => {
  return request.post(`/email/register?email=${email}`)
}
