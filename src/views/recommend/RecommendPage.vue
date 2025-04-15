<script setup>
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
// import NotLoginRouterView from '@/components/loginPart/NotLoginRouterView.vue'
// // import { ref } from 'vue'

// // 导入库
// import { useShowFlags } from '@/stores'
// const FlagsStore = useShowFlags()
// const { ifLogin } = FlagsStore

// 处理视频切换
const handleBefore = () => {}
const handleNext = () => {}
</script>
<template>
  <div class="container">
    <div class="box">
      <VideoBoxBig></VideoBoxBig>
    </div>

    <!-- 切换视频按钮 -->
    <el-button-group class="side-button">
      <el-button type="primary" class="el-button" @click="handleBefore">
        <el-icon class="el-icon--left"><ArrowLeftBold /></el-icon>
      </el-button>
      <hr />
      <el-button type="primary" class="el-button" @click="handleNext">
        <el-icon class="el-icon--right"><ArrowRightBold /></el-icon>
      </el-button>
    </el-button-group>
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

/* 侧边按钮 */
.side-button {
  margin: 0 1%;
  width: 40px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 4vh;
}
.side-button .el-button {
  transform: rotate(90deg);
  width: 100%;
  height: 49%;
  border: 0;
  font-size: 20px;
  background-color: transparent;
  color: #ffffff2f;
}
.side-button .el-button:hover {
  color: #fff;
}
.side-button hr {
  width: 60%;
  height: 1px;
  margin: 0 auto;
  border: 1px solid #ffffff34;
}
</style>
