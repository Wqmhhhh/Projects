<script setup>
import { ref, onMounted } from 'vue'

// 视频底部介绍

// 根据父组件传入的决定是否显示底部介绍
const props = defineProps({
  IntroShow: Boolean,
})
const VideoRef = ref()
const VideoInfo = ref({
  VideoSrc: '',
  VideoIntro: '111111111111111111111111111111111',
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

// 点击评论喜欢
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
  console.log('点击小-视频播放器进入全屏')
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
      <video
        ref="VideoRef"
        src="../../assets/98433cc4904e30ec520e03aa62a268b1.mp4"
        muted
      ></video>
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

    <div class="introduce" v-show="props.IntroShow">
      {{ VideoIntroShow }}
      <span v-show="IntroduceToolong">...</span>
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
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff5f;
  border-radius: 1.5vh;
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
.introduce {
  width: 100%;
  font-size: 2.3vh;
  color: #fff;
  text-align: left;
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
