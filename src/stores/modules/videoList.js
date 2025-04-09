import { defineStore } from 'pinia'
import { ref } from 'vue'

// 视频列表信息
export const useVideoList = defineStore('videoList', () => {
  //推荐视频
  const recommendVideo = ref([])

  //关注视频
  const followVideo = ref([])

  // 朋友视频
  const friendVideo = ref([])

  //我的视频
  // 我的作品
  const myVideoWorks = ref([])

  //我的喜欢
  const myLikeVideo = ref([])

  // 我的私密
  const myPrivateVideo = ref([])

  return {
    recommendVideo,
    followVideo,
    friendVideo,

    myLikeVideo,
    myPrivateVideo,
    myVideoWorks,
  }
})
