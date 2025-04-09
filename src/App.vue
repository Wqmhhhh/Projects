<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import TabTop from './components/Tab-Top.vue'
import VideoBoxFullScreen from './components/video/VideoBox-fullScreen.vue'
import EditUserInfor from './views/my/components/EditUserInfor.vue'
import LoginPopUp from './components/loginPart/Login-PopUp.vue'
import UpLoadWorks from './components/UpLoadWorks.vue'

import { useShowFlags } from '@/stores/index'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const { ifFullScreen } = storeToRefs(FlagsStore)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div>
      <!-- 全屏显示 -->
      <div v-if="ifFullScreen">
        <VideoBoxFullScreen></VideoBoxFullScreen>
      </div>

      <!-- 正常显示 -->
      <div v-else class="normal">
        <TabTop class="tabtop"></TabTop>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!-- 编辑信息 -->
    <EditUserInfor></EditUserInfor>

    <!-- 登录弹框 -->
    <LoginPopUp></LoginPopUp>

    <!-- 投稿弹框 -->
    <UpLoadWorks></UpLoadWorks>
  </el-config-provider>
</template>

<style scoped>
.normal {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
.normal div {
  flex: 1;
}
</style>
