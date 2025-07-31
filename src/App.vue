<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { useRouter } from 'vue-router'

import TopFix from './components/TopFix.vue'

// const router = useRouter()
// router.push('/main')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <!-- 顶部 -->
    <TopFix></TopFix>

    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
