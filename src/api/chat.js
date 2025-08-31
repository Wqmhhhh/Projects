import request from '@/utils/chatRequest'

// ==================== 用户相关 ====================
// 用户注册 OK
export const userRegister = (email, password, code) => {
  return request.post('/api/user/register', {
    email,
    password,
    code,
  })
}

// 用户登录 OK
export const userLogin = (email, password) => {
  return request.post('/api/user/login', {
    email,
    password,
  })
}

// 修改用户密码
export const userUpdatePassword = (code, newPassword) => {
  return request.put('/api/user/update/pwd', {
    code,
    newPassword,
  })
}

// ==================== 邮箱验证 ====================
// 发送邮箱验证码 OK
export const emailSendCode = (email) => {
  return request.post('/api/email/send', {
    email,
  })
}

// ==================== 账号相关 ====================
// 创建账号 OK
export const accountCreate = (name, gender, signature) => {
  return request.post('/api/account/create', {
    name,
    gender,
    signature,
  })
}

// 获取账号的token OK
export const getAccountToken = (account_id) => {
  return request.post(`/api/account/token`, {
    account_id,
  })
}

// 删除账号 OK
export const accountDelete = (account_id) => {
  return request.delete(`/api/account/delete`, {
    data: { account_id },
  })
}

// 获取用户的所有账号 OK
export const getAllAccounts = () => {
  return request.get('/api/account/infos/account')
}

// 更新账号信息 OK
export const updateAccountInfo = (name, gender, signature) => {
  return request.put('/api/account/update', {
    name,
    gender,
    signature,
  })
}

// ==================== 好友申请 ====================
// 创建申请 OK
export const createApplication = (account_id, application_msg) => {
  return request.post('/api/application/create', {
    account_id,
    application_msg,
  })
}

// 拒绝好友申请 OK
export const rejectApplication = (account_id, create_at) => {
  return request.put('/api/application/refuse', {
    account_id,
    create_at,
  })
}

// 同意好友申请 OK
export const acceptApplication = (account_id, create_at) => {
  return request.put('/api/application/accept', {
    account_id,
    create_at,
  })
}

// 查询所有与该账号有关的好友申请 OK
export const getAllApplications = () => {
  return request.get('/api/application/list')
}

// ==================== 文件相关 ====================
// 上传文件
export const uploadFile = (file, relationId) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('relationId', relationId)
  return request.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 删除文件
export const deleteFile = (fileId) => {
  return request.delete(`/file/delete/${fileId}`)
}

// 根据关系id查询文件
export const getFilesByRelation = (relationId) => {
  return request.get('/file/query', {
    params: { relationId },
  })
}

// 根据文件id获取文件
export const getFileById = (fileId) => {
  return request.get(`/file/get/${fileId}`, {
    responseType: 'blob',
  })
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
export const getMessagesBefore = (relation_id, last_time, page, page_size) => {
  return request.post(`/api/message/list/time?page=${page}&page_size=${page_size}`, {
    relation_id,
    last_time,
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
// 更改备注昵称 OK
export const updateRemarkName = (relation_id, nick_name) => {
  return request.put('/api/setting/update/nick_name', {
    relation_id,
    nick_name,
  })
}

// 更改置顶状态 OK
export const updateTopStatus = (relation_id, is_pin) => {
  return request.put('/api/setting/update/pin', {
    relation_id,
    is_pin,
  })
}

// 更改免打扰状态 OK
export const updateMuteStatus = (relation_id, is_not_disturb) => {
  return request.put('/api/setting/update/disturb', {
    relation_id,
    is_not_disturb,
  })
}

// 获取当前账户首页显示的好友和群组列表 OK
export const getHomeRelations = () => {
  return request.get('/api/setting/pins')
}

// 获取当前账户所有好友 OK
export const getAllFriends = () => {
  return request.get('/api/setting/friend/list')
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
