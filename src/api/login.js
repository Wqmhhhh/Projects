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
  return request.post('/passport/logout', { userId })
}

// 更改用户信息
export const userInfoChangeService = (userId, changeNum, data) => {
  // TODO:和后端确认是否需要指定参数名
  return request.post(`/userInfo/modifyUserInfo?type=${changeNum}`, {
    userId,
    data,
  })
}

// 更改用户头像
export const userFaceChangeService = (userId) => {
  return request.post('/userInfo/modifyImage', { userId, type: 2 })
}
