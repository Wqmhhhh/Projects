import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  commentPublicService,
  getCommentListService,
  getCommentNumService,
  delCommentService,
  likeCommentService,
  cancelLikeCommentService,
} from '@/api/comment'

export const useCommentList = defineStore('commentList', () => {
  // 评论列表
  const commentList = ref([])

  // 获取评论列表
  const getCommentList = async (vlogId, userId, page, pageSize) => {
    const res = await getCommentListService(vlogId, userId, page, pageSize)
    console.log(res)
  }

  // 获取视频评论数量
  const getCommentNum = async (vlogId) => {
    // 注意！vlogId为string
    const res = await getCommentNumService(vlogId)
    console.log(res)
  }

  // 删除评论
  const delComment = async (
    commentId,
    vlogId,
    commentUserId,
    page,
    pageSize,
  ) => {
    // 注意！三个均为string
    const res = await delCommentService(commentUserId, commentId, vlogId)
    console.log(res)

    // 再次获取评论列表
    getCommentList(vlogId, commentUserId, page, pageSize)
  }

  // 增加评论
  const addComment = async (
    vlogerId,
    fatherCommentId,
    vlogId,
    commentUserId,
    content,
    page,
    pageSize,
  ) => {
    const commentBO = {
      vlogerId,
      fatherCommentId,
      vlogId,
      commentUserId,
      content,
    }
    // 调用接口
    const res = await commentPublicService(commentBO)
    console.log('发布评论的返回值', res)

    // 再次获取评论列表
    getCommentList(vlogId, commentUserId, page, pageSize)
  }

  // 点赞评论
  const likeComment = async (
    commentId,
    userId,
    vlogId,
    commentUserId,
    page,
    pageSize,
  ) => {
    const res = await likeCommentService(commentId, userId)
    console.log(res)

    // 再次获取评论列表
    getCommentList(vlogId, commentUserId, page, pageSize)
  }

  // 取消评论点赞
  const cancelLike = async (
    commentId,
    userId,
    vlogId,
    commentUserId,
    page,
    pageSize,
  ) => {
    const res = await cancelLikeCommentService(commentId, userId)
    console.log(res)

    // 再次获取评论列表
    getCommentList(vlogId, commentUserId, page, pageSize)
  }

  return {
    commentList,

    addComment,
    getCommentList,
    getCommentNum,
    delComment,
    likeComment,
    cancelLike,
  }
})
