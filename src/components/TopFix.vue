<script setup>
import { ref } from 'vue'
import router from '@/router'

// 处理跳转到主页
const handleMain = () => {
  router.push('/')
}

// 处理登录
const handleLogin = () => {
  router.push('/login')

  console.log('点击登录')
}
// 处理报名
const handleRegister = () => {
  router.push('/register')
}

// 跳转联系我们
const handleContact = () => {
  const targetSection = document.querySelector('.official')

  if (!targetSection) {
    router.push('/')
    return
  }

  const targetPosition = targetSection.offsetTop
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  })
}

// 暂时标志
const ifLogin = ref(true)
</script>

<template>
  <div class="space"></div>
  <div class="top">
    <div class="topRight">
      <!-- 主页 -->
      <div @click="handleMain">主页</div>

      <!-- 联系我们 -->
      <div class="contact" @click="handleContact">联系我们</div>

      <!-- 报名 -->
      <div @click="handleRegister" v-show="ifLogin">报名</div>

      <!-- 登录 -->
      <div class="login" @click="handleLogin" v-if="!ifLogin">登录</div>
    </div>

    <div class="logo"></div>
  </div>
</template>

<style scoped>
.space {
  height: 5vw;
}
.top,
.logo,
.topRight {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 顶部 */
.top {
  background-color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5vw;
  padding: 0 3%;
  border-bottom: 2px solid #dadada;
  z-index: 999;
}
.topRight {
  width: 25%;
  font-size: 1.5vw;
  color: #000;
}
.topRight div:hover {
  cursor: pointer;
}
.logo {
  height: 100%;
  aspect-ratio: 1;
  background-image: url('../assets/logo.jpg');
  background-size: contain;
}

@media (max-width: 768px) {
  /* 顶部 */
  .top {
    height: 7vh;
  }
  .space {
    height: 7vh;
  }
  .topRight {
    width: 50%;
    font-size: 2vh;
  }
}
</style>
