<script setup>
import { onMounted, ref } from 'vue'

// store库
import { useShowFlags, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const UserStore = useUserStore()
const { ifEditShow } = storeToRefs(FlagsStore)
const { user } = storeToRefs(UserStore)

// 简介
const UserIntroduce = ref('')
// 用户名
const UserName = ref('')
// 头像地址
const imgUrl = ref()
// 更新后头像地址
const file = ref({})
// 用户名字数
const NameWordNum = ref(0)
// 有数据更新activeButton才更新为true
const activeButton = ref(false)

const handleNameInput = () => {
  NameWordNum.value = UserName.value.length
  if (UserName.value != user.nickname) {
    activeButton.value = true
  } else {
    activeButton.value = false
  }
}

const handleIntroChange = () => {
  if (UserIntroduce.value != user.nickname) {
    activeButton.value = true
  } else {
    activeButton.value = false
  }
}

// 填充用户信息
const InputInfo = () => {
  UserIntroduce.value = user.description
  UserName.value = user.nickname
  imgUrl.value = user.face
}

// 更新头像
const onUploadFile = async (f) => {
  // TODO：使用unicloud现成的API上传图片、视频
  file.value = f.raw

  // 此处为选中，还未上传，上传在提交按钮处
  imgUrl.value = URL.createObjectURL(f.raw)
  activeButton.value = true
}

// 取消按钮退出
const handleExit = () => {
  UserIntroduce.value = user.description
  UserName.value = user.nickname
  imgUrl.value = user.face
  ifEditShow.value = false
}

// TODO:提交按钮更新数据
const handleSubmit = async () => {
  // TODO:昵称更新
  // if (UserName.value !== user.nickname) {
  //   if (UserStore.changeInfo(1, UserName.value)) {
  //     ElMessage.success('更改昵称成功！')
  //   } else {
  //     ElMessage.error('更改昵称失败！')
  //   }
  // }

  // TODO:简介更新
  // if (UserIntroduce.value !== user.description) {
  //   if (UserStore.changeInfo(1, UserIntroduce.value)) {
  //     ElMessage.success('更改简介成功！')
  //   } else {
  //     ElMessage.error('更改简介失败！')
  //   }
  // }

  // TODO：头像更新
  // if (imgUrl.value != user.bgImg) {
  //   const data = new FormData()
  //   data.append('image', file.value)

  //   if (UserStore.changeInfo(data)) {
  //     ElMessage.success('更改头像成功！')
  //   } else {
  //     ElMessage.error('更改头像失败！')
  //   }
  // }

  // 更新后重新获取用户信息
  UserStore.getUserInfo()
}

onMounted(() => {
  InputInfo()
  handleNameInput()
})
</script>
<template>
  <el-dialog
    v-model="ifEditShow"
    class="ChangeInforDialog"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="header">编辑资料</div>
    </template>
    <template #footer>
      <div class="footer-box">
        <div class="userPicBox">
          <div class="userPic">
            <el-upload
              class=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <div v-else><i class="iconfont icon-24px"></i></div>
            </el-upload>
          </div>
          <div>点击修改头像</div>
        </div>

        <div class="nameBox">
          <div>名字</div>
          <div class="nameInput">
            <input
              v-model="UserName"
              type="text"
              placeholder="不填昵称要变黑户啦！"
              maxlength="20"
              @input="handleNameInput"
            />
            <span>{{ NameWordNum }}/20</span>
          </div>
        </div>

        <div class="introduceBox">
          <div>简介</div>
          <div class="IntroduceInput">
            <textarea
              v-model="UserIntroduce"
              placeholder="oi 小鬼，介绍一下自己叭！"
              @input="handleIntroChange"
            ></textarea>
          </div>
        </div>

        <div class="buttons">
          <el-button class="el-button no" @click="handleExit">取消</el-button>
          <el-button
            class="el-button submit"
            :class="{ activeButton: activeButton }"
            @click="handleSubmit"
          >
            保存
          </el-button>
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

/* pic */
.userPic {
  margin: 0 auto;
  width: 10vw;
  height: 10vw;
  margin-bottom: 2vh;
  background-color: #ffffff94;
  border-radius: 10vw;
  border: 3px dashed #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.userPic img,
.userPic div {
  width: 10vw;
  height: 10vw;
  text-align: center;
  line-height: 10vw;
}
.userPic .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 10vh;
}
.userPicBox > div {
  font-size: 2.5vh;
  text-align: center;
}

/* name */
.nameBox,
.introduceBox {
  margin-top: 2vh;
  height: 15vh;
  text-align: left;
  font-size: 2.5vh;
  line-height: 5vh;
  color: #fff;
}
.nameInput {
  margin-top: 1vh;
  padding: 0 1vw;
  width: 100%;
  height: 6vh;
  border-radius: 2vh;
  background-color: #ffffff38;
}
.nameInput input {
  width: 80%;
  height: 100%;
  font-size: 2.4vh;
  background-color: transparent;
  border: 0;
  outline: none;
  color: #ffffffe7;
}
.nameInput span {
  font-size: 2.5vh;
  position: relative;
  left: 3vw;
  line-height: 6vh;
  color: #ffffff4d;
}

/* introduce */
.introduceBox {
  margin-top: 0;
  height: 25vh;
}
.IntroduceInput {
  height: 75%;
  margin-top: 1vh;
  border-radius: 2vh;
  background-color: #ffffff38;
  padding: 1vh 1vw;
  width: 100%;
}
.IntroduceInput textarea {
  width: 100%;
  padding-right: 1vw;
  height: 95%;
  font-size: 2.3vh;
  background-color: transparent;
  overflow-y: scroll;
  outline: none;
  border: 0;
  color: #fff;
  resize: none;
}
.IntroduceInput textarea::-webkit-scrollbar {
  background-color: transparent;
  width: 0.5vw;
}
/* 滚动条滑块样式 */
.IntroduceInput textarea::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 1vh; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.IntroduceInput textarea::-webkit-scrollbar-thumb:hover {
  cursor: pointer;
  background-color: #88878773; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.IntroduceInput textarea::-webkit-scrollbar-track {
  background-color: #ffffff10; /* 轨道颜色 */
  border-radius: 1vh; /* 轨道圆角 */
}

/* buttons */
.buttons {
  height: 6vh;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  /* background-color: #fff; */
  margin-top: 10vh;
}
.buttons .el-button {
  width: 43%;
  height: 100%;
  border-radius: 2vh;
  font-size: 2.3vh;
  border: 0;
  color: #ffffff96;
}
.buttons .el-button:first-child {
  background-color: #ffffff25;
}
.buttons .el-button:first-child:hover {
  color: #fff;
}
.buttons .el-button:last-child {
  background-color: rgb(111, 40, 62);
}
.buttons .activeButton {
  background-color: rgb(254, 44, 85) !important;
  color: #fff;
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
</style>
