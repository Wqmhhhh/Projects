<script setup>
import { onMounted, ref } from 'vue'
import VideoBoxSmall from '@/components/video/VideoBox-small.vue'

// 初始化Box大小
const searchBox = ref()
const initialBoxWidth = () => {
  if (!searchBox.value) {
    return
  }
  if (window.innerWidth < 1545) {
    searchBox.value.style.width = '100%'
  } else {
    searchBox.value.style.width = '1545px'
  }
}

// 底部文字
const VideoInfo = ref({
  VideoSrc: '',
  VideoIntro:
    '网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态网络连接异常，请检查服务器状态',
  VideoLikeNum: 0,
})
const VideoIntroShow = ref()
const IntroduceToolong = ref(false)
// 初始化底部文本过长折叠
const TooLongWrap = () => {
  if (VideoInfo.value.VideoIntro.length > 25) {
    VideoIntroShow.value = VideoInfo.value.VideoIntro.substring(0, 25)
    IntroduceToolong.value = true
  } else {
    VideoIntroShow.value = VideoInfo.value.VideoIntro
    IntroduceToolong.value = false
  }
}
onMounted(() => {
  TooLongWrap()

  initialBoxWidth()

  // 动态调整Box宽度
  window.addEventListener('resize', initialBoxWidth)
})
</script>

<template>
  <div class="searchContainer">
    <div class="searchBox" ref="searchBox">
      <div class="top">综合</div>

      <div class="singleContainer">
        <div class="singleBox">
          <div class="video">
            <videoBoxSmall></videoBoxSmall>
          </div>
          <div class="introduce">
            {{ VideoIntroShow }}
            <span v-show="IntroduceToolong">...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.searchContainer {
  width: 100vw;
  height: 100vh;
  background-color: rgb(22, 24, 35);
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}
.searchBox {
  width: 100%;
  height: 100vh;
  background-color: transparent;
  padding: 10px 20px;
}

/* 顶部文字 */
.top {
  height: 60px;
  font-size: 25px;
  font-weight: bold;
  line-height: 60px;
  padding-left: 20px;
  color: #ffffffd8;
}

/* 视频容器 */
.singleContainer {
  width: 100%;
  padding-bottom: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.singleBox {
  width: 229px;
  height: 404px;
  margin: 20px 20px;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(37, 38, 50);
}
.video {
  height: 80%;
}
.introduce {
  width: 100%;
  height: 20%;
  padding-top: 10px;
  font-size: 17px;
  line-height: 30px;
  padding-left: 2%;
  color: #fff;
  text-align: left;
}

/* 滚动条样式 */
.searchContainer::-webkit-scrollbar {
  width: 7px; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
.searchContainer::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.searchContainer::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.searchContainer::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 4px; /* 轨道圆角 */
}
</style>
