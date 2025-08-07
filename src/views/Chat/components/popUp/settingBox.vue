<script setup>
import { ref, reactive, nextTick } from 'vue'
import { useChatUserInfo, useShowFlags } from '@/stores'
import { storeToRefs } from 'pinia'
import { accountDelete, updateAccountInfo } from '@/api/chat'
import { ElMessage } from 'element-plus'

const { name, gender, signature, avatar, id } = storeToRefs(useChatUserInfo())
const { ifSettingShow } = storeToRefs(useShowFlags())

// 编辑状态
const isEditing = reactive({
  name: false,
  signature: false,
})

// 性别选择相关
const isGenderDropdownOpen = ref(false)
const genderOptions = ['女', '男', '武装直升机', '沃尔玛购物袋']

// 编辑
const startEditing = (field) => {
  isEditing[field] = true
  // 下一个tick聚焦输入框
  nextTick(() => {
    const inputRef =
      field === 'name' ? nameInputRef.value : signatureInputRef.value
    inputRef?.focus()
  })
}

const finishEditing = (field) => {
  isEditing[field] = false
}

// 切换性别
const toggleGenderDropdown = () => {
  isGenderDropdownOpen.value = !isGenderDropdownOpen.value
}

const selectGender = (gender) => {
  userData.gender = gender
  isGenderDropdownOpen.value = false
}

// 头像上传
// const triggerAvatarUpload = () => {
//   avatarInputRef.value?.click()
// }

// const handleAvatarChange = (event) => {
//   const target = event.target
//   if (target.files && target.files[0]) {
//     const reader = new FileReader()
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         userData.avatar = e.target.result
//       }
//     }
//     reader.readAsDataURL(target.files[0])
//   }
// }
// 更新头像
let file
const onUploadFile = async (e) => {
  file = e.raw
  // 此处为选中，还未上传，上传在提交按钮处
  avatar.value = URL.createObjectURL(e.raw)
}

// 注销账号
const confirmAccountDeletion = async () => {
  if (confirm('确定要注销账号吗？此操作不可恢复')) {
    const res = await accountDelete(id)
    console.log('注销账号返回', res)
  }
}

// 关闭弹框
const handleExit = async () => {
  // TODO:提交所有更改,库中的信息手动更新
  // const res = await updateAccountInfo(
  //   id.value,
  //   name.value,
  //   gender.value,
  //   signature.value
  // )
  // console.log('修改账号信息返回', res)

  ElMessage.success('修改账户信息成功！')
  ifSettingShow.value = false
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
            <el-upload
              class=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
              name="image"
            >
              <img v-if="avatar" :src="avatar" class="avatar" />
              <div v-else><i class="iconfont icon-24px"></i></div>
            </el-upload>
          </div>
        </div>
      </div>

      <!-- 用户名信息项 -->
      <div class="info-item flex">
        <span class="info-label">名称</span>
        <div
          class="info-content user-name"
          @click="startEditing('name')"
          v-if="!isEditing.name"
        >
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

      <!-- 个性签名信息项 -->
      <div class="info-item">
        <span class="info-label">个性签名</span>
        <div
          class="info-content user-signature"
          @click="startEditing('signature')"
          v-if="!isEditing['signature']"
        >
          {{ signature }}
        </div>

        <input
          v-else
          type="text"
          v-model="signature"
          @keyup.enter="finishEditing('signature')"
          @blur="finishEditing('signature')"
          class="signature-input"
          ref="signatureInputRef"
        />
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
  border-radius: 2vh;
  overflow: hidden;
}
.userPic img {
  height: calc(15vh * 0.8);
}
.iconfont {
  font-family: 'iconfont';
  font-size: 5vh;
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