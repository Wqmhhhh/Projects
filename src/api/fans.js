import request from '@/utils/request'

// 关注作者
export const followUperService = (myId, vlogerId) => {
  return request.get('/fans/follow', {
    params: {
      myId,
      vlogerId,
    },
  })
}

// 取消关注作者
export const cancelFollowUperService = (myId, vlogerId) => {
  return request.get('/fans/cancel', {
    params: {
      myId,
      vlogerId,
    },
  })
}

// 查询是否关注作者
export const queryIfFollowUperService = (myId, vlogerId) => {
  return request.get('/fans/queryDoIFollowVloger', {
    params: {
      myId,
      vlogerId,
    },
  })
}

// 查询关注列表
export const queryFollowListService = (myId, page, pageSize) => {
  return request.get('/fans/queryMyFollows', {
    params: {
      myId,
      page,
      pageSize,
    },
  })
}

// 查询粉丝列表
export const queryFansListService = (myId, page, pageSize) => {
  return request.get('/fans/queryMyFans', {
    params: {
      myId,
      page,
      pageSize,
    },
  })
}
