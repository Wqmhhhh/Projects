<script setup>
import { useShowFlags } from '@/stores/index'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const { ifLoginShow } = storeToRefs(FlagsStore)

// TODO：点击显示登录弹框
const PopLogin = () => {
  ifLoginShow.value = true
}
</script>

<template>
  <div class="default">
    <div>
      <div>
        <i class="iconfont icon-pintu"></i>
        <span>登录后解锁该功能</span>
      </div>
      <el-button class="el-button" @click="PopLogin">登录</el-button>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.default {
  width: 100%;
  height: 90vh;
  color: #ffffffc0;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.default > div {
  width: 30%;
  font-size: 4.5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: space-between;
}
.default > div > div {
  margin: 0 auto;
  padding: 3vh 0;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 8vh;
}
.el-button {
  font-size: 3vh;
  width: 10vw;
  height: 8vh;
  background-color: rgb(255, 44, 85);
  color: #ffffffe4;
  border: 0;
}
</style>
