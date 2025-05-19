import request from '@/utils/request'

// 注册/登录接口
export const userLoginService = (mobile, smsCode) => {
  return request.post('/passport/login', {
    mobile,
    smsCode,
  })
}

// 发送验证码
export const getCodeService = (mobile) => {
  return request.get('/passport/getSMSCode', { params: { mobile } })
}

// 退出登录
export const userLogOutService = (userId) => {
  return request.get('/passport/logout', { params: { userId } })
}
