<script setup>
import { ref, onMounted } from 'vue'

// 导入库
import { useShowFlags, useVideo } from '@/stores'
import { storeToRefs } from 'pinia'
const FlagsStore = useShowFlags()
const VideoStore = useVideo()
const { ifFullScreen } = storeToRefs(FlagsStore)

// 绑定视频
const VideoRef = ref()

// 视频信息
const props = defineProps({
  videoInfo: Object,
})

const ifLike = ref(false)
const likeNum = ref(0)

// 初始化视频
const iniciateVideo = () => {
  ifLike.value = props.videoInfo.doILikeThisVlog
  likeNum.value = props.videoInfo.likeCounts
}

// 点击视频红心喜欢
const handleLikeVideo = () => {
  if (!ifLike.value) {
    console.log('发送喜欢视频请求')
    VideoStore.likeVideo(props.videoInfo.vlogerId, props.videoInfo.vlogId)
    ifLike.value = true
    likeNum.value++
  } else {
    console.log('发送取消喜欢视频请求')
    VideoStore.cancelLikeVideo(props.videoInfo.vlogerId, props.videoInfo.vlogId)
    ifLike.value = false
    likeNum.value--
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
  ifFullScreen.value = false
  console.log('点击全屏')
}

// 初始化底部文本
onMounted(() => {
  iniciateVideo()
})
</script>

<template>
  <div class="videoContainer">
    <div
      class="videoBox"
      @click="handleMoveToFullScreen"
      @mouseenter="handleVideoPlay"
      @mouseleave="handleVideoPause"
    >
      <video ref="VideoRef" :src="props.videoInfo.url" muted></video>
    </div>

    <!-- 视频上悬浮的内容 -->
    <div class="likeVideoBox">
      <i
        class="iconfont icon-aixin"
        :class="{ likeVideo: ifLike }"
        @click="handleLikeVideo()"
      ></i>
      <span>{{ likeNum }}</span>
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
  overflow: hidden;
  border-radius: 20px;
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
