<script setup>
import { ref, onMounted } from 'vue'

// 导入库
import { useShowFlags } from '@/stores'
import { storeToRefs } from 'pinia'
const FlagsStore = useShowFlags()
const { ifFullScreen } = storeToRefs(FlagsStore)

// 绑定视频
const VideoRef = ref()
const VideoInfo = ref({
  VideoSrc: '',
  VideoIntro:
    '网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态',
  VideoLikeNum: 999,
})
const ifLike = ref(false)

const VideoIntroShow = ref()
const IntroduceToolong = ref(true)
// 初始化底部文本
onMounted(() => {
  if (VideoInfo.value.VideoIntro.length > 10) {
    VideoIntroShow.value = VideoInfo.value.VideoIntro.substring(0, 10)
    IntroduceToolong.value = true
  } else {
    VideoIntroShow.value = VideoInfo.value.VideoIntro
  }
})

// 点击视频红心喜欢
const handleLikeVideo = () => {
  if (ifLike.value) {
    ifLike.value = false
    VideoInfo.value.VideoLikeNum--
  } else {
    ifLike.value = true
    VideoInfo.value.VideoLikeNum++
  }
}

// 视频悬浮时播放or暂停
const handleVideoPlay = () => {
  if (VideoRef.value) {
    VideoRef.value.play()
  }
}
const handleVideoPause = () => {
  if (VideoRef.value) {
    VideoRef.value.pause()
  }
}

// TODO:点击视频跳转全屏
const handleMoveToFullScreen = () => {
  // TODO:将视频信息写入 当前视频 中

  // 全屏
  ifFullScreen.value = true
}
</script>

<template>
  <div class="videoContainer">
    <div
      class="videoBox"
      @click="handleMoveToFullScreen"
      @mouseenter="handleVideoPlay"
      @mouseleave="handleVideoPause"
    >
      <video ref="VideoRef" src="../../assets/竖屏.mp4" muted></video>
    </div>

    <!-- 视频上上悬浮的内容 -->
    <div class="likeVideoBox">
      <i
        class="iconfont icon-aixin"
        :class="{ likeVideo: ifLike }"
        @click="handleLikeVideo()"
      ></i>
      <span>{{ VideoInfo.VideoLikeNum }}</span>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.videoContainer {
  width: 100%;
  height: 100%;
  position: relative;
}
.videoBox {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.videoBox:hover {
  cursor: pointer;
}
.videoBox > video {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 3vh;
  margin-right: 1vh;
  line-height: 5vh;
  color: #ffffffb7;
}
.likeVideoBox {
  font-size: 2.5vh;
  position: absolute;
  top: 5%;
  left: 5%;
  color: #fff;
}
.likeVideoBox > .iconfont:hover {
  cursor: pointer;
}
.likeVideo {
  color: rgb(254, 44, 85) !important;
}
</style>
