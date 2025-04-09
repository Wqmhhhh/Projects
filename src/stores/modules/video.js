import { defineStore } from 'pinia'
import { ref } from 'vue'

// 单个信息
export const useSingleVideo = defineStore('SingleVideo', () => {
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

  // 视频点赞
  const VideoLikeNum = ref()

  //视频评论
  const VideoCommentNum = ref()
  const VideoCommentList = ref()

  // 视频收藏
  const VideoCollectNum = ref()

  // 视频中是否为作者视频：可切换私密
  const ifUserWork = ref(true)

  // 视频是否私密
  const ifPrivate = ref(false)

  return {
    VideoRef,
    totalLength,
    VideoCurrentLength,
    VideoPause,

    VideoCollectNum,
    VideoCommentList,
    VideoCommentNum,
    VideoLikeNum,
    ifUserWork,
    ifPrivate,
  }
})
