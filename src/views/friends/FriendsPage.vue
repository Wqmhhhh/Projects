<script setup>
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
import NotLoginRouterView from '@/components/loginPart/NotLoginRouterView.vue'
import SideChangeButton from '@/components/video/SideChangeButton.vue'
// import { ref } from 'vue'

// 导入库
import { useShowFlags } from '@/stores'
const FlagsStore = useShowFlags()
const { ifLogin } = FlagsStore
</script>
<template>
  <div class="container" v-if="ifLogin">
    <div class="box">
      <VideoBoxBig></VideoBoxBig>
    </div>

    <!-- 切换视频按钮 -->
    <SideChangeButton></SideChangeButton>
  </div>

  <div v-else class="notLoginShow">
    <NotLoginRouterView></NotLoginRouterView>
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
