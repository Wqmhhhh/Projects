<script setup>
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
import SideChangeButton from '@/components/video/SideChangeButton.vue'
</script>
<template>
  <div class="container">
    <div class="box">
      <VideoBoxBig></VideoBoxBig>
    </div>

    <!-- 切换视频按钮 -->
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
