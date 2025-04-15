import request from '@/utils/request'

// 注册/登录接口
export const userLoginService = (mobile, Code) => {
  return request.post('/passport/login', {
    mobile,
    smsCode: Code,
  })
}

// 发送验证码
export const getCodeService = (mobile) => {
  return request.post(`/passport/getSMSCode`, { mobile })
}

// 退出登录
export const userLogOutService = (userId) => {
  return request.post('/passport/logout', userId)
}
