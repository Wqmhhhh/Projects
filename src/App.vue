<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import TabTop from './components/Tab-Top.vue'
import EditUserInfor from './views/my/components/EditUserInfor.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <TabTop class="tabtop"></TabTop>
    <router-view></router-view>
    <EditUserInfor></EditUserInfor>
  </el-config-provider>
</template>

<style scoped></style>
