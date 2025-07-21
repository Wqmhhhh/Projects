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
// import { useShowFlags } from './showFlags'

// 视频信息

export const useVideo = defineStore('video', () => {
  const user = useUserStore().user
  //推荐视频列表
  const recommendVideo = ref([])
  const recPage = ref(0)
  const noMoreRec = ref(false)

  //关注视频列表
  const followVideo = ref([])
  const folPage = ref(0)
  const noMoreFol = ref(false)

  // 朋友视频列表
  const friendVideo = ref([])
  const friPage = ref(0)
  const noMoreFri = ref(false)

  // 搜索视频列表
  const searchVideo = ref([])
  const searPage = ref(0)
  const noMoreSear = ref(false)

  //我的

  // 我的作品列表
  const myVideoWorks = ref([])
  const myPubPage = ref(0)
  const noMorePub = ref(false)

  //我的喜欢列表
  const myLikeVideo = ref([])
  const myLikePage = ref(0)
  const noMoreLike = ref(false)

  // 我的私密列表
  const myPrivateVideo = ref([])
  const myPriPage = ref(0)
  const noMorePri = ref(false)

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
        recommendVideo.value.push(...data)
        break
      case 2:
        followVideo.value.push(...data)
        break
      case 3:
        friendVideo.value.push(...data)
        break
      case 4:
        searchVideo.value.push(...data)
        break
      case 5:
        myVideoWorks.value.push(...data)
        break
      case 6:
        myLikeVideo.value.push(...data)
        break
      case 7:
        myPrivateVideo.value.push(...data)
        break
      case 8:
        currentVideoList.value.push(...data)
        break
    }
  }

  // 获取推荐视频列表
  const getRecList = async (pageSize, method = 0) => {
    if (noMoreRec.value === true) {
      return
    }

    if (method === 1) {
      recommendVideo.value = ''
      recPage.value = 0
    }

    const res = await getRecommendVideoListService(
      user.id,
      recPage.value,
      pageSize,
    )
    console.log('获取推荐视频列表', res)

    if (res.data.data.rows) {
      setVideoList(1, res.data.data.rows)
      recPage.value++
    } else {
      noMoreRec.value = true
    }
  }

  // 获取搜索视频列表
  const getSearList = async (page, pageSize, search) => {
    if (noMoreSear.value === true) {
      return
    }

    const res = await getSearchListService(user.id, page, pageSize, search)
    console.log('获取搜索列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(4, res.data.data.rows)
      searPage.value++
    } else {
      noMoreSear.value = true
    }
  }

  // 获取关注视频列表
  const getFollList = async (pageSize) => {
    if (noMoreFol.value === true) {
      return
    }

    const res = await getFollowVideoListService(
      user.id,
      folPage.value,
      pageSize,
    )
    console.log('获取关注列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(2, res.data.data.rows)
      folPage.value++
    } else {
      noMoreFol.value = true
    }
  }

  // 获取朋友列表
  const getFriList = async (pageSize) => {
    if (noMoreFri.value === true) {
      return
    }

    const res = await getFriendVideoListService(
      user.id,
      friPage.value,
      pageSize,
    )
    console.log('获取朋友列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(3, res.data.data.rows)
      friPage.value++
    } else {
      noMoreFri.value = true
    }
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

    if (res.data.status === 200) {
      return true
    } else {
      return false
    }
  }

  // 取消点赞
  const cancelLikeVideo = async (vlogerId, vlogId) => {
    const res = await videoCancelLikeService(user.id, vlogerId, vlogId)
    console.log('取消点赞操作返回值', res)

    if (res.data.status === 200) {
      return true
    } else {
      return false
    }
  }

  // 获取 我的 公开的视频
  const getMyPubList = async (pageSize) => {
    if (noMorePub.value === true) {
      return
    }

    const res = await getPublicVideoListService(
      user.id,
      myPubPage.value,
      pageSize,
    )
    console.log('获取公开列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(5, res.data.data.rows)
      myPubPage.value++
    } else {
      noMorePub.value = true
    }
  }

  // 获取 我的 私密的视频
  const getMyPriList = async (pageSize) => {
    if (noMorePri.value === true) {
      return
    }

    const res = await getPrivateVideoListService(
      user.id,
      myPriPage.value,
      pageSize,
    )
    console.log('获取私密列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(7, res.data.data.rows)
      myPriPage.value++
    } else {
      noMorePri.value = true
    }
  }

  // 获取 我的 喜欢的视频
  const getMyLikeList = async (pageSize) => {
    if (noMoreLike.value === true) {
      return
    }

    const res = await getLikeVideoList(user.id, myLikePage.value, pageSize)
    console.log('获取喜欢列表返回值', res)

    if (res.data.data.rows) {
      setVideoList(6, res.data.data.rows)
      myLikePage.value++
    } else {
      noMoreLike.value = true
    }
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
    console.log('上传视频返回值', res)

    // 更改成功返回true
    if (res.data.status === 200) {
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
    recPage,
    noMoreRec,

    searchVideo,
    searPage,
    noMoreSear,

    followVideo,
    folPage,
    noMoreFol,

    friendVideo,
    friPage,
    noMoreFri,

    myLikeVideo,
    myLikePage,
    noMoreLike,

    myPrivateVideo,
    myPriPage,
    noMorePri,

    myVideoWorks,
    myPubPage,
    noMorePub,

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
