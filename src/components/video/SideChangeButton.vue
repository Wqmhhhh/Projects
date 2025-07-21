<script setup>
const emit = defineEmits(['changeVideo'])
// 处理视频切换：1代表下一个，-1代表上一个
const handleBefore = () => {
  emit('changeVideo', -1)
}
const handleNext = () => {
  emit('changeVideo', 1)
}
</script>
<template>
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
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 侧边按钮 */
.side-button {
  margin: 0 1%;
  width: 40px;
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-radius: 40px;
  background-color: rgb(43, 44, 54);
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
