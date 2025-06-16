import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getRecommendVideoListService,
  getSearchListService,
  getFriendVideoListService,
  getVideoDetailService,
  getVideoLikeNumService,
  videoLikeService,
  videoCancelLikeService,
  VideoPublicService,
  VideoPrivateService,
  getPublicVideoListService,
  getPrivateVideoListService,
  getLikeVideoList,
  vlogUploadService,
  getFollowVideoListService,
} from '@/api/video'
import { useUserStore } from '@/stores/modules/user'

// 视频信息
export const useVideo = defineStore('video', () => {
  const user = useUserStore().user
  //推荐视频列表
  const recommendVideo = ref([])

  //关注视频列表
  const followVideo = ref([])

  // 朋友视频列表
  const friendVideo = ref([])

  // 搜索视频列表
  const searchVideo = ref([])

  //我的视频

  // 我的作品列表
  const myVideoWorks = ref([])

  //我的喜欢列表
  const myLikeVideo = ref([])

  // 我的私密列表
  const myPrivateVideo = ref([])

  // 当前视频列表
  const currentVideoList = ref([])

  // 当前视频信息
  const currentVideo = ref({
    // 视频总时长
    totalLength: 0,

    // 当前播放进度
    currentLength: 0,

    // 视频暂停
    isPlay: '',
  })

  // 当前视频vlogId
  const currentVlogId = ref()

  // 设置视频列表
  const setVideoList = (n, data) => {
    switch (n) {
      case 1:
        recommendVideo.value = data
        break
      case 2:
        followVideo.value = data
        break
      case 3:
        friendVideo.value = data
        break
      case 4:
        searchVideo.value = data
        break
      case 5:
        myVideoWorks.value = data
        break
      case 6:
        myLikeVideo.value = data
        break
      case 7:
        myPrivateVideo.value = data
        break
      case 8:
        currentVideoList.value = data
        break
    }
  }

  // 获取推荐视频列表
  const getRecList = async (page, pageSize) => {
    const res = await getRecommendVideoListService(user.id, page, pageSize)
    console.log('获取推荐视频列表', res)

    // setVideoList(1,data)
  }

  // 获取搜索视频列表
  const getSearList = async (userId, page, pageSize, search) => {
    const res = await getSearchListService(user.id, page, pageSize, search)
    console.log('获取搜索列表返回值', res)

    // setVideoList(4,data)
  }

  // 获取关注视频列表
  const getFollList = async (page, pageSize) => {
    const res = await getFollowVideoListService(user.id, page, pageSize)
    console.log('获取关注列表返回值', res)

    // setVideoList(2,data)
  }

  // 获取朋友列表
  const getFriList = async (page, pageSize) => {
    const res = await getFriendVideoListService(user.id, page, pageSize)
    console.log('获取关注列表返回值', res)

    // setVideoList(3,data)
  }

  // 单个视频

  // 获取视频详细信息
  const getVideoDetail = async (vlogId) => {
    const res = await getVideoDetailService(user.id, vlogId)
    console.log('视频详细信息返回值', res)

    // setVideoList(9,data)
  }

  // 获取视频总点赞量
  const getVideoLikeNum = async (vlogId) => {
    const res = await getVideoLikeNumService(user.id, vlogId)
    console.log('视频点赞量返回值', res)
  }

  // 点赞视频
  const likeVideo = async (vlogerId, vlogId) => {
    const res = await videoLikeService(user.id, vlogerId, vlogId)
    console.log('点赞操作返回值', res)
  }

  // 取消点赞
  const cancelLikeVideo = async (vlogerId, vlogId) => {
    const res = await videoCancelLikeService(user.id, vlogerId, vlogId)
    console.log('取消点赞操作返回值', res)
  }

  // 获取 我的 公开的视频
  const getMyPubList = async (page, pageSize) => {
    const res = await getPublicVideoListService(user.id, page, pageSize)
    console.log('获取公开列表返回值', res)

    // setVideoList(5,data)
  }

  // 获取 我的 私密的视频
  const getMyPriList = async (page, pageSize) => {
    const res = await getPrivateVideoListService(user.id, page, pageSize)
    console.log('获取私密列表返回值', res)

    // setVideoList(7,data)
  }

  // 获取 我的 喜欢的视频
  const getMyLikeList = async (page, pageSize) => {
    const res = await getLikeVideoList(user.id, page, pageSize)
    console.log('获取喜欢列表返回值', res)

    // setVideoList(6,data)
  }

  // 视频公开
  const publicVideo = async (vlogId) => {
    const res = await VideoPublicService(user.id, vlogId)
    console.log('公开视频操作返回值', res)
  }

  // 视频私密
  const privateVideo = async (vlogId) => {
    const res = await VideoPrivateService(user.id, vlogId)
    console.log('私密视频操作返回值', res)
  }

  // 上传视频
  const uploadVideo = async (title, width, height, video, image) => {
    const res = await vlogUploadService(
      user.id,
      title,
      width,
      height,
      video,
      image,
    )
    console.log(res)

    // TODO：更新 我的 对应视频列表

    // TODO更改成功返回true
    if (res.data) {
      return true
    } else {
      return false
    }
  }

  // 设置当前视频vlogId
  const setCurrentVlogId = (vlogId) => {
    vlogId.value = vlogId
  }

  // 设置当前视频信息
  const setCurrentVlog = (totalLength, currentLength, isPlay) => {
    currentVideo.value.totalLength = totalLength
    currentVideo.value.currentLength = currentLength
    currentVideo.value.isPlay = isPlay
  }

  return {
    recommendVideo,
    searchVideo,
    followVideo,
    friendVideo,

    myLikeVideo,
    myPrivateVideo,
    myVideoWorks,

    currentVideoList,
    currentVideo,
    currentVlogId,

    setVideoList,
    getRecList,
    getSearList,
    getFollList,
    getFriList,

    getVideoDetail,
    getVideoLikeNum,
    likeVideo,
    cancelLikeVideo,

    getMyPriList,
    getMyPubList,
    getMyLikeList,
    publicVideo,
    privateVideo,
    uploadVideo,

    setCurrentVlogId,
    setCurrentVlog,
  }
})
