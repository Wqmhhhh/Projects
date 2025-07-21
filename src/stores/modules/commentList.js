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
import { useUserStore } from './user'
import { ElMessage } from 'element-plus'

export const useCommentList = defineStore('commentList', () => {
  // 评论列表
  const commentList = ref([])

  // 评论数量
  const commentNum = ref(0)

  // 没有更多评论
  const noMoreCom = ref(false)

  // 评论页数
  const commentPage = ref(0)

  // 当前评论对应视频
  const currentComVideoId = ref()

  // 设置视频评论列表ID
  const setVideoComListId = (id) => {
    currentComVideoId.value = id
  }

  // 获取评论列表
  const getCommentList = async (vlogId, userId, pageSize) => {
    if (noMoreCom.value === true) {
      return
    }

    // 切换视频后清空原视频请求信息
    if (currentComVideoId.value !== vlogId) {
      commentList.value = []
      commentPage.value = 0
      currentComVideoId.value = vlogId
    }

    const res = await getCommentListService(
      vlogId,
      userId,
      commentPage.value,
      pageSize,
    )
    console.log('评论列表', res)

    if (res.data.data.rows) {
      commentList.value = res.data.data.rows
      commentPage.value++
      noMoreCom.value = false
      return true
    } else {
      noMoreCom.value = true
      ElMessage('没有更多评论了')
      return false
    }
  }

  // 获取视频评论数量
  const getCommentNum = async (vlogId) => {
    const res = await getCommentNumService(vlogId)
    console.log('评论数量', res)

    commentNum.value = res.data.data
  }

  // 删除评论
  const delComment = async (commentId, vlogId) => {
    const res = await delCommentService(
      useUserStore().user.id,
      commentId,
      vlogId,
    )
    console.log('删除评论返回值：', res)

    commentPage.value = 0

    // 再次获取评论列表
    getCommentList(vlogId, useUserStore().user.id, 10)

    // 获取评论数量
    getCommentNum(vlogId)
  }

  // 发布评论
  const addComment = async (vlogerId, fatherCommentId, vlogId, content) => {
    const commentBO = {
      vlogerId,
      fatherCommentId,
      vlogId,
      commentUserId: useUserStore().user.id,
      content,
    }
    const res = await commentPublicService(commentBO)
    console.log('发布评论的返回值', res)

    commentPage.value = 0

    // 再次获取评论列表
    getCommentList(vlogId, useUserStore().user.id, 10)

    // 获取评论数量
    getCommentNum(vlogId)

    if (res.status === 200) {
      return true
    } else {
      return false
    }
  }

  // 点赞评论
  const likeComment = async (commentId, vlogId) => {
    const res = await likeCommentService(commentId, useUserStore().user.id)
    console.log('点赞评论返回值：', res)

    commentPage.value = 0

    // 再次获取评论列表
    getCommentList(vlogId, useUserStore().user.id, 10)
  }

  // 取消评论点赞
  const cancelLike = async (commentId, vlogId) => {
    const res = await cancelLikeCommentService(
      commentId,
      useUserStore().user.id,
    )
    console.log('取消点赞评论返回值：', res)

    commentPage.value = 0

    // 再次获取评论列表
    getCommentList(vlogId, useUserStore().user.id, 10)
  }

  // 清空评论有关信息
  const clearComment = () => {
    commentList.value = ''
    commentNum.value = 0
    commentPage.value = 0
    console.log(commentNum.value, commentPage.value)
  }

  return {
    commentList,
    commentNum,
    commentPage,
    currentComVideoId,
    noMoreCom,

    addComment,
    getCommentList,
    getCommentNum,
    delComment,
    likeComment,
    cancelLike,
    setVideoComListId,

    clearComment,
  }
})
