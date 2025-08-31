<script setup>
import { reactive } from 'vue'
import { useChatUserInfo, useShowFlags, useChatRoomInfo } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const { name, gender, avatar, id, accountList, ifHaveAccount } = storeToRefs(useChatUserInfo())
const { ifSettingShow } = storeToRefs(useShowFlags())

// 导入接口
import { accountDelete, updateAccountInfo, getAllAccounts } from '@/api/chat'
import router from '@/router'

// 编辑状态
const isEditing = reactive({
  name: false,
  signature: false,
})

// 性别选择相关
const genderOptions = ['女', '男', '武装直升机', '沃尔玛购物袋']

// 编辑
const startEditing = (field) => {
  isEditing[field] = true
  // 下一个tick聚焦输入框
}

const finishEditing = (field) => {
  isEditing[field] = false
}

// 获取用户的所有账号
const getUserAccounts = async () => {
  try {
    const res = await getAllAccounts()
    console.log('获取用户所有账号返回值', res)

    accountList.value = [...res.data.data.list]
    if (accountList.value.length > 0) {
      ifHaveAccount.value = true
    }
  } catch (e) {
    console.log('获取用户所有账号失败', e)
  }
}

// 注销账号
const confirmAccountDeletion = async () => {
  if (confirm('确定要注销账号吗？此操作不可恢复')) {
    const res = await accountDelete(id.value)
    console.log('注销账号返回', res)

    ifSettingShow.value = false

    router.push('/chatSelect')
    getUserAccounts()
  }
}

// 关闭弹框
const handleExit = async () => {
  const res = await updateAccountInfo(name.value, gender.value, '签名占位')
  console.log('修改账号信息返回', res)

  ElMessage.success('修改账户信息成功！')
  ifSettingShow.value = false
}

// 退出登录
const handleLogOut = async () => {
  useChatUserInfo().clearSome()
  ifSettingShow.value = false
  useChatRoomInfo().clearAll()
  router.push('/chatSelect')
}
</script>

<template>
  <!-- 用户信息弹窗容器 -->
  <el-dialog
    v-model="ifSettingShow"
    class="chatUserInfoSetting"
    :close-on-click-modal="false"
    :before-close="handleExit"
  >
    <template #header>
      <div class="header">设置</div>
    </template>

    <!-- 信息列表区域 -->
    <div class="info-list space-y-6">
      <!-- 头像信息项 -->
      <div class="info-item">
        <span class="info-label">头像</span>
        <div class="info-content" @click="triggerAvatarUpload">
          <!-- 隐藏的文件上传输入 -->
          <div class="userPic">
            <img v-if="avatar" :src="avatar" class="avatar" />
            <div v-else><i class="iconfont icon-24px"></i></div>
          </div>
        </div>
      </div>

      <!-- 用户名信息项 -->
      <div class="info-item flex">
        <span class="info-label">名称</span>
        <div class="info-content user-name" @click="startEditing('name')" v-if="!isEditing.name">
          {{ name }}
        </div>
        <input
          v-else
          type="text"
          v-model="name"
          @keyup.enter="finishEditing('name')"
          @blur="finishEditing('name')"
        />
      </div>

      <!-- 性别信息项 -->
      <div class="info-item">
        <span class="info-label">性别</span>
        <!-- 性别下拉菜单 -->
        <select class="gender-option" v-model="gender">
          <option :value="item" v-for="item in genderOptions" :key="item">
            {{ item }}
          </option>
        </select>
      </div>

      <!-- 用户ID信息项（不可编辑） -->
      <div class="info-item">
        <span class="info-label">ID</span>
        <div class="info-content user-id">
          {{ id }}
        </div>
      </div>
    </div>

    <!-- 底部操作按钮 -->
    <div class="dialog-footer logout" @click="handleLogOut">退出登录</div>
    <div class="dialog-footer" @click="confirmAccountDeletion">注销账号</div>
  </el-dialog>
</template>

<style scoped>
/* flex */
.info-item,
.info-item:first-of-type .info-content,
.userPic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  font-size: 3.5vh;
  padding: 0 1vw;
}

.info-item:first-of-type {
  height: 15vh;
  font-size: 2.5vh;
}
.info-item:first-of-type .info-content {
  height: 100%;
}
.userPic {
  height: 80%;
  aspect-ratio: 1;
  border: 2px dashed rgba(0, 0, 0, 0.247);
  justify-content: center;
  align-items: start;
  border-radius: 1vh;
  overflow: hidden;
}
.userPic img {
  height: 12vh;
}
.iconfont {
  font-family: 'iconfont';
  font-size: 5vh;
  line-height: 12vh;
}

/* select */
select {
  width: 20%;
  height: 80%;
  font-size: 2.5vh;
  background-color: transparent;
  border: 0;
  outline: none;
}

.info-item:not(:first-of-type) {
  height: 8vh;
  font-size: 2.5vh;
}
.info-item:last-of-type {
  user-select: none;
}
.info-item {
  border-radius: 2vh;
  padding: 0 1vw;
}
.info-item input {
  width: 30%;
  height: 50%;
  outline: none;
  border: 0;
  background-color: transparent;
  font-size: 2.5vh;
}
.info-item:hover:not(:last-of-type) {
  background-color: #00000028;
}
.dialog-footer {
  height: 10vh;
  font-size: 3vh;
  text-align: center;
  line-height: 10vh;
  color: rgba(255, 0, 0, 0.705);
}
.dialog-footer:hover {
  cursor: pointer;
}
.logout {
  color: #000;
}
</style>

<style>
.chatUserInfoSetting {
  width: 50vw;
  height: 70vh !important;
  background: linear-gradient(
    to bottom right,
    rgb(194, 235, 225) 10%,
    rgb(238, 238, 240) 35%,
    rgb(238, 238, 240) 60%,
    rgb(227, 194, 222) 85%
  ) !important;
  border-radius: 2.5vh;
}
</style>
