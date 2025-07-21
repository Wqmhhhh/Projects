import request from '@/utils/request'

// 发表评论
export const commentPublicService = (commentBO) => {
  return request.post('/comment/create', JSON.stringify(commentBO))
}

// 获取视频评论数
export const getCommentNumService = (vlogId) => {
  return request.get('/comment/counts', {
    params: {
      vlogId,
    },
  })
}

// 获取视频评论列表
export const getCommentListService = (vlogId, userId, page, pageSize) => {
  return request.get('/comment/list', {
    params: {
      vlogId,
      userId,
      page,
      pageSize,
    },
  })
}

// 删除评论
export const delCommentService = (commentUserId, commentId, vlogId) => {
  return request.delete('/comment/delete', {
    params: {
      commentUserId,
      commentId,
      vlogId,
    },
  })
}

// 点赞评论
export const likeCommentService = (commentId, userId) => {
  return request.get('/comment/like', {
    params: {
      commentId,
      userId,
    },
  })
}

// 取消评论点赞
export const cancelLikeCommentService = (commentId, userId) => {
  return request.get('/comment/unlike', {
    params: {
      commentId,
      userId,
    },
  })
}

// 获取通知列表
export const getNoticeListService = (userId, page, pageSize) => {
  return request.get('msg/list', {
    params: {
      userId,
      page,
      pageSize,
    },
  })
}
