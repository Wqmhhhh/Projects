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
  <div class="box">
    <div>
      <div>登录后即可查看</div>
      <el-button class="el-button" @click="PopLogin">立即登录</el-button>
    </div>
  </div>
</template>
<style scoped>
.box {
  width: 100%;
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 25px;
  line-height: 8vh;
}
.box > div {
  width: 90%;
}
.el-button {
  width: 100%;
  margin: 0 auto;
  background-color: rgb(255, 44, 85);
  height: 50px;
  border: 0;
  border-radius: 2vh;
  color: #fff;
  font-size: 25px;
}
.el-button:hover {
  cursor: pointer;
  background-color: rgba(255, 44, 86, 0.658);
}
</style>
