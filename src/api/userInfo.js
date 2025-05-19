import request from '@/utils/request'

// 更改用户信息
export const userInfoChangeService = (UpdatedUserBO, type) => {
  // 传递的时候UpdatedUserBO是JSON串
  return request.post(`/userInfo/modifyUserInfo?type=${type}`, {
    UpdatedUserBO,
  })
}

// 更改用户头像
export const userFaceChangeService = (userId, data) => {
  return request.post(
    // 根据示例代码写的地址`/userInfo/modifyImage?userId=${userId}&type=2`
    // 原路径
    `/userInfo/modifyImage`,
    {
      userId,
      type: 2,
      file: data,
    },
  )
}

// 查询用户信息
export const userInfoQueryService = (userId) => {
  return request.get('/userInfo/query', { params: { userId } })
}
