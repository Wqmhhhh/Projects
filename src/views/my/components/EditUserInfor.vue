<script setup>
import { onMounted, ref } from 'vue'
const ChangeInforDialogVisible = ref(false)

const UserIntroduce = ref()
const UserName = ref('乌漆抹黑嘿嘿嘿')
const imgUrl = ref()
let NameWordNum = ref(0)

const handleNameInput = () => {
  NameWordNum.value = UserName.value.length
}
onMounted(() => {
  handleNameInput()
})

// 取消按钮退出
const handleExit = () => {
  ChangeInforDialogVisible.value = false
}

// TODO:有数据更新activeButton才更新为true
const activeButton = ref(false)
// TODO:提交按钮更新数据
const handleSubmit = () => {
  console.log(1)
}
</script>
<template>
  <el-dialog v-model="ChangeInforDialogVisible" class="ChangeInforDialog">
    <template #header>
      <div class="header">编辑资料</div>
    </template>
    <template #footer>
      <div class="footer-box">
        <div class="userPicBox">
          <div class="userPic">
            <!-- TODO:上传头像要进行base64编码啥的略略略 -->
            <el-upload
              class=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <img v-else src="@/assets/image.ico" />
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
              placeholder="oi，就是你！小鬼，介绍一下你自己"
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
  width: 9vw;
}
.userPic img {
  width: 100%;
  border-radius: 100vh;
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
