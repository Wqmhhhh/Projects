<script setup>
import { ref } from 'vue'

// store库
import { useShowFlags } from '@/stores'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const { ifUpLoadWorks } = storeToRefs(FlagsStore)

// 封面地址
const VideoUrl = ref()

// 投稿标题
const WorkTitle = ref('')

// 标题字数
const TitleWordNum = ref(0)

// 投稿介绍
const WorkIntroduce = ref('')

// 更新封面
const onUploadFile = (file) => {
  // 上传视频地址
  VideoUrl.value = URL.createObjectURL(file.raw)
}

// 处理标题字数更新
const handleTitleInput = () => {
  TitleWordNum.value = WorkTitle.value.length
}

// TODO:提交按钮更新数据
const handleSubmit = () => {
  console.log(1)
}

// 取消按钮退出
const handleExit = () => {
  VideoUrl.value = ''
  WorkIntroduce.value = ''
  WorkTitle.value = ''
  ifUpLoadWorks.value = false
}
</script>
<template>
  <el-dialog
    v-model="ifUpLoadWorks"
    class="UpLoadWorkDialog"
    :close-on-click-modal="false"
  >
    <template #header>
      <div class="header">投稿</div>
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
              <video v-if="VideoUrl" :src="VideoUrl" class="avatar"></video>
              <div v-else><i class="iconfont icon-24px"></i></div>
            </el-upload>
          </div>
          <div>点击投稿视频</div>
        </div>

        <!-- 标题 -->
        <div class="nameBox">
          <div>标题</div>
          <div class="nameInput">
            <input
              v-model="WorkTitle"
              type="text"
              placeholder="天赋型选手灵机一动"
              maxlength="30"
              @input="handleTitleInput"
            />
            <span>{{ TitleWordNum }}/30</span>
          </div>
        </div>

        <!-- 简介 -->
        <div class="introduceBox">
          <div>简介</div>
          <div class="IntroduceInput">
            <textarea
              v-model="WorkIntroduce"
              placeholder="点击输入文字，为你的视频省流"
            ></textarea>
          </div>
        </div>

        <div class="buttons">
          <el-button class="el-button no" @click="handleExit">取消</el-button>
          <el-button
            class="el-button submit"
            :class="{ activeButton: WorkIntroduce && WorkTitle && VideoUrl }"
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
  width: 15vw;
  height: 23vh;
  margin-bottom: 2vh;
  background-color: #ffffff94;
  border-radius: 2vh;
  border: 3px dashed #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.userPic .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 10vh;
}
.userPic video,
.userPic div {
  width: 100%;
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
  height: 20vh;
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
.UpLoadWorkDialog {
  margin: 0 auto;
  height: 100%;
  background-color: rgb(37, 38, 50);
  width: 37vw;
  color: rgba(220, 220, 222, 0.726);
}
</style>
