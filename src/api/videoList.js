import request from '@/utils/request'

// 推荐 或 搜索 视频列表
export const getRecommendVideoListService = () => {
  return request.post()
}

// 关注 视频列表
export const getFollowVideoListService = () => {
  return request.post()
}

// 朋友 视频列表
export const getFriendVideoListService = () => {
  return request.post()
}

// 我的

// 作品列表
export const getMyWorksVideoListService = () => {
  return request.post()
}

// 私密列表
export const getMyPrivateVideoListService = () => {
  return request.post()
}

// 喜欢列表
export const getmyLikeVideoListService = () => {
  return request.post()
}
