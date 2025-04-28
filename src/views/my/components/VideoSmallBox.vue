<script setup>
import VideoBoxSmall from '@/components/video/VideoBox-small.vue'
import { ref, onMounted } from 'vue'

const VideoInfo = ref({
  VideoSrc: '',
  VideoIntro:
    '网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态',
  VideoLikeNum: 0,
})
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
</script>
<template>
  <div class="UperWorksVideosBox">
    <div class="video">
      <VideoBoxSmall></VideoBoxSmall>
    </div>
    <div class="introduce">
      {{ VideoIntroShow }}
      <span v-show="IntroduceToolong">...</span>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.UperWorksVideosBox {
  width: 14%;
  height: 55%;
  border-radius: 2.5vh;
  margin: 3vh 1vw;
  overflow: hidden;
}
.video {
  height: 87%;
}
.introduce {
  width: 100%;
  height: 20%;
  font-size: 2.3vh;
  line-height: 4vh;
  padding-left: 2%;
  color: #fff;
  text-align: left;
}
</style>
