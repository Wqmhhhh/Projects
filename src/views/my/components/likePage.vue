<script setup>
import VideoBoxSmall from '@/components/video/VideoBox-small.vue'
import { useVideo } from '@/stores'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref } from 'vue'
import NoVideoView from './NoVideoView.vue'

const { myLikeVideo } = storeToRefs(useVideo())

// 绑定视频容器
const videoRef = ref()
const singleVideo = ref()

onMounted(() => {
  nextTick(() => {
    if (videoRef.value) {
      videoRef.value.addEventListener('wheel', (e) => {
        console.log(videoRef.value.clientWidth, singleVideo.value.clientWidth)
        console.log(e.deltaY)
      })
    } else {
      console.log('videoRef未绑定')
    }
  })
})
</script>
<template>
  <!-- 有视频视图 -->
  <div v-if="myLikeVideo.length > 0">
    <div class="UperWorksVideosContainer" ref="videoRef">
      <div
        v-for="item in myLikeVideo"
        :key="item.vlogId"
        class="videoList"
        ref="singleVideo"
      >
        <VideoBoxSmall :videoInfo="item"></VideoBoxSmall>
      </div>
    </div>

    <div class="end-list">已经到底啦！</div>
  </div>

  <!-- 没视频视图 -->
  <NoVideoView v-else></NoVideoView>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.UperWorksVideosContainer {
  width: 100%;
  height: 99%;
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
}
.videoList {
  width: 200px;
  height: 350px;
  margin: 20px 30px;
  background-color: #ffffff20;
  border-radius: 20px;
}
.end-list {
  color: #ffffff81;
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin-top: 20px;
}
</style>
