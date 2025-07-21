<script setup>
import { ref } from 'vue'

// store库
import { useShowFlags } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

const FlagsStore = useShowFlags()
const { ifSettingShow } = storeToRefs(FlagsStore)

// 删除用户
const handleDeleteUser = () => {
  ElMessageBox.confirm('确认注销用户吗？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    customClass: 'custom-message-box', // 应用自定义类名
    appendTo: document.body, // 强制挂载到 body
    zIndex: 9999, // 确保在最上层
    showClose: false,
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '注销成功',
      })
    })
    .catch(() => {})
}

// 暂时信息
const nickName = ref('wwwwww')
const douyinId = ref('11111111111')
</script>
<template>
  <el-dialog
    v-model="ifSettingShow"
    class="ChangeInforDialog"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="header">设置</div>
    </template>

    <template #default>
      <div class="footer-box">
        <div class="drawer" ref="drawerRef">
          <!-- 头像及名称 -->
          <div class="drawerTop">
            <div class="drawerFace">
              <img src="../../../assets/pic2.png" alt="" />
            </div>

            <div class="drawerName">
              <!-- 昵称 -->
              <div class="nickname">昵称：{{ nickName }}</div>
              <!-- 抖音号 -->
              <div class="douyinId">抖音号：{{ douyinId }}</div>
            </div>
          </div>

          <!-- 注销账号 -->
          <div @click="handleDeleteUser">注销账号</div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.ChangeInforDialog {
  z-index: 999;
}

/* header */
.header {
  width: 90%;
  height: 10%;
  margin: 0 auto;
  text-align: left;
  font-size: 3vh;
  color: #fff;
}
/* footer */
.footer-box {
  padding: 0 2vw;
}

.drawer {
  width: 30vw;
}
.drawerTop {
  padding: 2vh;
  display: flex;
  user-select: none;
}
.drawerTop .drawerFace {
  width: 13vh;
  height: 13vh;
  overflow: hidden;
  border-radius: 1vh;
  background-color: #00000030;
  margin-right: 1vw;
}
.drawerFace img {
  width: 100%;
  height: 100%;
}
.drawerName {
  width: 20vw;
  text-align: left;
}
.drawerName div:first-child {
  font-size: 3vh;
  color: #fff;
  margin-bottom: 2vh;
}
.drawerName div:not(:first-child) {
  font-size: 2.5vh;
  color: #d6d3d3b7;
}
.drawer > div:last-child {
  color: rgb(238, 75, 75);
  font-size: 2.7vh;
  text-align: center;
}
.drawer > div:last-child:hover {
  cursor: pointer;
  color: rgba(238, 75, 75, 0.746);
}
</style>

<style>
.ChangeInforDialog {
  margin: 0 auto;
  height: 100%;
  background-color: rgb(37, 38, 50);
  width: 37vw;
  color: rgba(220, 220, 222, 0.726);
}

.custom-message-box {
  background-color: #ffffff !important;
  color: #d2d2d2 !important;
  text-align: center;
  width: 20vw;
  height: 20vh;
  position: relative;
  top: 25vh;
  left: 40vw;
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  font-size: 3vh;
}
.custom-message-box .el-message-box__title,
.custom-message-box .el-message-box__content {
  color: #000000 !important;
}
.custom-message-box .el-message-box__btns .el-button {
  background-color: #ffffff;
  color: #000000 !important;
  border: none !important;
  width: 10vw;
  height: 8vh;
  font-size: 2.5vh;
}
.custom-message-box .el-message-box__btns .el-button:hover {
  background-color: #c8c7c79b;
  color: #d2d2d2;
  cursor: pointer;
}
.custom-message-box .el-message-box__btns .el-button:nth-child(2) {
  color: red !important;
}
</style>
