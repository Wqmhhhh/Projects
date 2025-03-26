<script setup>
</script>
<template>
  <div class="box">
    <div>
      <div>登录后即可查看</div>
      <el-button class="el-button" @click="PopLogin">立即登录</el-button>
    </div>
  </div>
</template>
<style scoped>
.box {
  width: 17vw;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #dd1313; */
  text-align: center;
  font-size: 2.5vh;
  line-height: 8vh;
}
.box > div {
  width: 90%;
}
.el-button {
  width: 100%;
  margin: 0 auto;
  background-color: rgb(255, 44, 85);
  height: 6.5vh;
  border: 0;
  border-radius: 2vh;
  color: #fff;
  font-size: 3vh;
}
.el-button:hover {
  cursor: pointer;
  background-color: rgba(255, 44, 86, 0.658);
}
</style>
