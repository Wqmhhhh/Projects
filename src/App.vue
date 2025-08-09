<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { useRouter } from 'vue-router'

// import { onMounted, ref } from 'vue'

import TopFix from './components/TopFix.vue'
// import loading from './components/loadingPage.vue'
// import router from './router'

// 转场动画
// const Loading = ref()
// const checkLoading = () => {
//   const timer = setInterval(() => {
//     if (document.readyState === 'complete') {
//       clearInterval(timer)
//       Loading.value.outAni()
//     }
//   }, 300)
// }

// onMounted(() => {
//   checkLoading()
//   router.beforeEach((to, from, next) => {
//     Loading.value.inAi(next)
//   })
// })

// const router = useRouter()
// router.push('/main')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <!-- 顶部 -->
    <TopFix></TopFix>

    <!-- LOADING动画 -->
    <!-- <loading ref="Loading"></loading> -->

    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
