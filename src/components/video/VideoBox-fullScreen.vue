<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import VideoBoxBig from './VideoBox-big.vue'

// 导入库
import { useShowFlags } from '@/stores'
const FlagsStore = useShowFlags()
const { ifFullScreen } = storeToRefs(FlagsStore)
const videoList = ref([])

// 点击 返回 回到上一个页面
const handleBack = () => {
  ifFullScreen.value = false
  console.log('点击返回')
}
</script>

<template>
  <div class="container">
    <div class="back" @click="handleBack">
      <el-icon><ArrowLeftBold /></el-icon>
    </div>
    <div class="box">
      <div v-for="item in videoList" :key="item.vlogId">
        <VideoBoxBig :props="item"></VideoBoxBig>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  object-fit: contain;
}
.back {
  z-index: 99;
  position: absolute;
  top: 20px;
  left: 30px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: #ffffff2a;
  border-radius: 10px;
}
.back:hover {
  cursor: pointer;
  background-color: #ffffff67;
}
</style>
