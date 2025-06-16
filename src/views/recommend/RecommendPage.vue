<script setup>
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
import SideChangeButton from '@/components/video/SideChangeButton.vue'
import { useVideo } from '@/stores'
import { storeToRefs } from 'pinia'
const VideoStore = useVideo()
const { currentVideoList: videoList } = storeToRefs(VideoStore)
</script>
<template>
  <div class="container">
    <div class="box">
      <div v-for="item in videoList" :key="item.vlogId">
        <VideoBoxBig :videoInfo="item"></VideoBoxBig>
      </div>
    </div>

    <!-- 切换视频按钮 -->
    <!-- TODO:传递视频高度 -->
    <SideChangeButton></SideChangeButton>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 视频容器 */
.box {
  width: 96%;
  height: 98%;
  border-radius: 15px;
  overflow: hidden;
}
</style>
