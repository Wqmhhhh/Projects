<script setup>
import VideoBoxBig from '@/components/VideoBox-big.vue'
</script>
<template>
  <div class="container">
    <div class="box">
      <!-- <div>朋友</div> -->
      <VideoBoxBig></VideoBoxBig>
    </div>

    <!-- 切换视频按钮 -->
    <el-button-group class="side-button">
      <el-button type="primary" class="el-button">
        <el-icon class="el-icon--left"><ArrowLeft /></el-icon>
      </el-button>
      <hr />
      <el-button type="primary" class="el-button">
        <el-icon class="el-icon--right"><ArrowRight /></el-icon>
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
  margin-left: 2%;
  width: 100%;
  height: 87vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.box {
  width: 93%;
  height: 100%;
  border-radius: 4vh;
  background-color: #ffffff09;
}

/* 侧边按钮 */
.side-button {
  margin-right: 2%;
  width: 3%;
  height: 20%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 4vh;
  background-color: rgb(43, 44, 54);
}
.side-button .el-button {
  transform: rotate(90deg);
  width: 100%;
  height: 49%;
  border: 0;
  font-size: 4vh;
  background-color: transparent;
  color: #ffffff2f;
}
.side-button .el-button:hover {
  color: #fff;
}
.side-button hr {
  width: 60%;
  height: 0.1vh;
  margin: 0 auto;
  border: 0.2vh solid #ffffff34;
}
</style>
