import request from '@/utils/request'

// 更改用户信息
export const userInfoChangeService = (UpdatedUserBO, type) => {
  // 传递的时候UpdatedUserBO是JSON串
  return request.post(`/userInfo/modifyUserInfo?type=${type}`, UpdatedUserBO)
}

// 更改用户头像
export const userFaceChangeService = (userId, image) => {
  console.log('图片文件file:', image)
  return request.post(`/userInfo/modifyImage?userId=${userId}&type=2`, image)
}

// 查询用户信息
export const userInfoQueryService = (userId) => {
  return request.get('/userInfo/query', { params: { userId } })
}

// 获取通知信息
export const getMsgService = (userId, page, pageSize) => {
  return request.get('msg/list', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}
