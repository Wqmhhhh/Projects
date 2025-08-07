import request from '@/utils/request'

// ==================== 用户相关 ====================
// 用户注册
export const userRegister = (email, password, code) => {
  return request.post('/user/register', {
    email,
    password,
    code,
  })
}

// 用户登录
export const userLogin = (email, password) => {
  return request.post('/user/login', {
    email,
    password,
  })
}

// 修改用户密码
export const userUpdatePassword = (code, newPassword) => {
  return request.put('/user/update/pwd', {
    code,
    newPassword,
  })
}

// 删除用户
export const userDelete = () => {
  return request.delete('/user/deleteUser')
}

// ==================== 邮箱验证 ====================
// 发送邮箱验证码
export const emailSendCode = (email) => {
  return request.post('/email/send', {
    email,
  })
}

// ==================== 账号相关 ====================
// 创建账号
export const accountCreate = (name, gender, signature) => {
  return request.post('/account/create', {
    name,
    gender,
    signature,
  })
}

// 获取账号的token
export const getAccountToken = (account_id) => {
  return request.get('/account/token', { account_id })
}

// 删除账号
export const accountDelete = (account_id) => {
  return request.delete(`/account/delete/${account_id}`)
}

// 获取用户的所有账号
export const getAllAccounts = () => {
  return request.get('/account/all')
}

// 更新账号信息
export const updateAccountInfo = (id, name, gender, signature) => {
  return request.put('/account/update', {
    id,
    name,
    gender,
    signature,
  })
}

// ==================== 好友申请 ====================
// 创建申请
export const createApplication = (receiverId, message) => {
  return request.post('/application/create', {
    receiverId,
    message,
  })
}

// 删除申请
export const deleteApplication = (applicationId) => {
  return request.delete(`/application/delete/${applicationId}`)
}

// 拒绝好友申请
export const rejectApplication = (applicationId) => {
  return request.put(`/application/reject/${applicationId}`)
}

// 同意好友申请
export const acceptApplication = (applicationId) => {
  return request.put(`/application/accept/${applicationId}`)
}

// 查询所有与该账号有关的好友申请
export const getAllApplications = () => {
  return request.get('/application/all')
}

// ==================== 文件相关 ====================
// 上传文件
export const uploadFile = (file, relationId) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('relationId', relationId)
  return request.post('/file/upload', formData)
}

// 删除文件
export const deleteFile = (fileId) => {
  return request.delete(`/file/delete/${fileId}`)
}

// 根据关系id查询文件
export const getFilesByRelation = (relationId) => {
  return request.post('/file/query', { relationId })
}

// 更改账户头像
export const updateAvatar = (avatarFile) => {
  const formData = new FormData()
  formData.append('avatar', avatarFile)
  return request.put('/file/avatar', formData)
}

// 根据文件id获取文件
export const getFileById = (fileId) => {
  return request.get(`/file/get/${fileId}`)
}

// ==================== 消息相关 ====================
// 发送文件类消息
export const sendFileMessage = (relationId, fileId, content) => {
  return request.post('/message/send/file', {
    relationId,
    fileId,
    content,
  })
}

// 获取指定关系指定时间戳之前的消息
export const getMessagesBefore = (relationId, timestamp) => {
  return request.get('/message/before', {
    params: { relationId, timestamp },
  })
}

// 获取所有关系指定时间戳之后的信息
export const getMessagesAfter = (timestamp) => {
  return request.get('/message/after', {
    params: { timestamp },
  })
}

// 更改消息pin状态
export const updateMessagePin = (messageId, isPinned) => {
  return request.put('/message/pin', {
    messageId,
    isPinned,
  })
}

// 更改消息置顶状态
export const updateMessageTop = (messageId, isTop) => {
  return request.put('/message/top', {
    messageId,
    isTop,
  })
}

// 撤回消息
export const recallMessage = (messageId) => {
  return request.put(`/message/recall/${messageId}`)
}

// 获取指定关系的置顶消息
export const getTopMessage = (relationId) => {
  return request.get(`/message/top/${relationId}`)
}

// 获取指定关系中的pin消息
export const getPinnedMessages = (relationId) => {
  return request.get(`/message/pinned/${relationId}`)
}

// 获取指定消息的所有回复消息
export const getReplies = (messageId) => {
  return request.get(`/message/replies/${messageId}`)
}

// 通过内容模糊查找消息
export const searchMessages = (content, relationId = -1) => {
  return request.get('/message/search', {
    params: { content, relationId },
  })
}

// ==================== 设置相关 ====================
// 更改备注昵称
export const updateRemarkName = (relationId, remarkName) => {
  return request.put('/setting/remark', {
    relationId,
    remarkName,
  })
}

// 更改置顶状态
export const updateTopStatus = (relationId, isTop) => {
  return request.put('/setting/top', {
    relationId,
    isTop,
  })
}

// 更改免打扰状态
export const updateMuteStatus = (relationId, isMuted) => {
  return request.put('/setting/mute', {
    relationId,
    isMuted,
  })
}

// 更改显示状态
export const updateVisibility = (relationId, isVisible) => {
  return request.put('/setting/visibility', {
    relationId,
    isVisible,
  })
}

// 获取当前账号pin的所有好友和群组列表
export const getPinnedRelations = () => {
  return request.get('/setting/pinned')
}

// 获取当前账户首页显示的好友和群组列表
export const getHomeRelations = () => {
  return request.get('/setting/home')
}

// 获取当前账户所有好友
export const getAllFriends = () => {
  return request.get('/setting/friends')
}

// 删除好友关系
export const deleteFriend = (relationId) => {
  return request.delete(`/setting/delete/${relationId}`)
}

// 通过姓名模糊查询好友
export const searchFriends = (name) => {
  return request.get('/setting/search', {
    params: { name },
  })
}
