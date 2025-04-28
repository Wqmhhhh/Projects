<script setup>
import TabTop from '@/components/Tab-Top.vue'
import VideoBoxFullScreen from '@/components/video/VideoBox-fullScreen.vue'
import EditUserInfor from '@/views/my/components/EditUserInfor.vue'
import LoginPopUp from '@/components/loginPart/Login-PopUp.vue'
import UpLoadWorks from '@/components/UpLoadWorks.vue'

import { useShowFlags } from '@/stores/index'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const { ifFullScreen } = storeToRefs(FlagsStore)
</script>

<template>
  <div>
    <!-- 全屏显示 -->
    <div v-show="ifFullScreen">
      <VideoBoxFullScreen></VideoBoxFullScreen>
    </div>

    <!-- 正常显示 -->
    <div v-show="!ifFullScreen" class="normal">
      <TabTop class="tabtop"></TabTop>
      <router-view></router-view>
    </div>
  </div>

  <!-- 编辑个人信息弹框 -->
  <EditUserInfor></EditUserInfor>

  <!-- 登录弹框 -->
  <LoginPopUp></LoginPopUp>

  <!-- 投稿弹框 -->
  <UpLoadWorks></UpLoadWorks>
</template>

<style scoped></style>
