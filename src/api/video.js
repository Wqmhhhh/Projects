import request from '@/utils/request'

// 视频列表

// 推荐视频列表
export const getRecommendVideoListService = (userId, page, pageSize) => {
  return request.get('/vlog/indexList', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}

// 获取搜索列表
export const getSearchListService = (userId, page, pageSize, search) => {
  return request.get('/vlog/indexList', {
    params: {
      userId,
      page,
      pageSize,
      search,
    },
  })
}

// 关注 视频列表
export const getFollowVideoListService = (myId, page, pageSize) => {
  return request.get('/vlog/followList', {
    params: {
      myId,
      page,
      pageSize,
    },
  })
}

// 朋友 视频列表
export const getFriendVideoListService = (myId, page, pageSize) => {
  return request.get('/vlog/friendList', {
    params: {
      myId,
      page,
      pageSize,
    },
  })
}

// 单个视频

// 获取视频详细信息
export const getVideoDetailService = (userId, vlogId) => {
  return request.get('/vlog/detail', {
    params: {
      userId,
      vlogId,
    },
  })
}

// 获取视频总点赞量
export const getVideoLikeNumService = (vlogId) => {
  return request.get('/vlog/totalLikedCounts', {
    params: {
      vlogId,
    },
  })
}

// 点赞视频
export const videoLikeService = (userId, vlogerId, vlogId) => {
  return request.get('/vlog/like', {
    params: {
      userId,
      vlogId,
      vlogerId,
    },
  })
}

// 取消点赞
export const videoCancelLikeService = (userId, vlogerId, vlogId) => {
  return request.get('/vlog/unlike', {
    params: {
      userId,
      vlogId,
      vlogerId,
    },
  })
}

// 我的

// 将视频公开
export const VideoPublicService = (userId, vlogId) => {
  return request.get('/vlog/changeToPublic', {
    params: {
      userId,
      vlogId,
    },
  })
}

// 视频变为私密
export const VideoPrivateService = (userId, vlogId) => {
  return request.get('/vlog/changeToPrivate', {
    params: {
      userId,
      vlogId,
    },
  })
}

// 查看公开的视频
export const getPublicVideoListService = (userId, page, pageSize) => {
  return request.get('/vlog/myPublicList', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}

// 查看私密的视频
export const getPrivateVideoListService = (userId, page, pageSize) => {
  return request.get('/vlog/myPrivateList', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}

// 查看喜欢的视频
export const getLikeVideoList = (userId, page, pageSize) => {
  return request.get('/vlog/myLikedList', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}

// 上传视频
export const vlogUploadService = (vlog) => {
  return request.post('/vlog//publish', vlog)
}
