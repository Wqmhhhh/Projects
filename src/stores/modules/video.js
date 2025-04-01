import { defineStore } from 'pinia'
import { ref } from 'vue'

// 视频模块信息
export const video = defineStore('SingleVideo', () => {
  // 视频信息
  // 视频本身
  const VideoRef = ref({
    src: '',
    poster: '',
  })
  // 视频总时长
  const totalLength = ref()
  // 当前播放进度
  const VideoCurrentLength = ref()
  // 视频暂停
  const VideoPause = ref(false)
  return {
    VideoRef,
    totalLength,
    VideoCurrentLength,
    VideoPause,
  }
})
