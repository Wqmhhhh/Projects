<script setup>
import { ref, onMounted } from 'vue'

// store库
import { useShowFlags, useVideo } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const FlagsStore = useShowFlags()
const videoStore = useVideo()
const { ifUpLoadWorks } = storeToRefs(FlagsStore)

// 视频地址
const VideoUrl = ref()

// 封面地址
const CoverUrl = ref()

// 视频宽高
const VideoWidth = ref()
const VideoHeight = ref()

// 投稿介绍
const WorkIntroduce = ref('')

// // 更新视频
// const onUploadFile = (file) => {
//   // TODO：视频地址、视频封面转换格式、视频宽高
//   VideoUrl.value = URL.createObjectURL(file.raw)
// }

// // TODO:上传视频按钮
// const handleSubmit = () => {
//   const vlogBO = {
//     vlogerId: useUserStore().user.id,
//     url: VideoUrl.value,
//     cover: CoverUrl.value,
//     title: WorkIntroduce.value,
//     width: VideoWidth.value,
//     height: VideoHeight.value,
//   }
//   if (videoStore.uploadVideo(vlogBO)) {
//     ElMessage.success('上传视频成功！')
//   }
// }

const videoElement = ref(null)
const canvasElement = ref(null)

const onUploadFile = (uploadFile) => {
  const file = uploadFile.raw
  VideoUrl.value = URL.createObjectURL(file)

  // 创建一个视频元素来加载视频
  const video = document.createElement('video')
  video.src = VideoUrl.value
  video.addEventListener('loadedmetadata', () => {
    // 获取视频的宽高
    VideoWidth.value = video.videoWidth
    VideoHeight.value = video.videoHeight

    // 创建一个Canvas元素来绘制视频的第一帧
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // 将Canvas内容转换为图片URL
    CoverUrl.value = canvas.toDataURL('image/png')
  })
}

const handleSubmit = () => {
  const videoFormData = new FormData()
  const imageFormData = new FormData()

  videoFormData.append('video', VideoUrl.value)
  imageFormData.append('image', CoverUrl.value)

  // 调用上传视频的API
  if (
    videoStore.uploadVideo(
      WorkIntroduce.value,
      VideoWidth.value,
      VideoHeight.value,
      videoFormData,
      imageFormData
    )
  ) {
    ElMessage.success('上传视频成功！')
  } else {
    ElMessage.error('上传视频失败！')
  }
}

onMounted(() => {
  videoElement.value = document.createElement('video')
  canvasElement.value = document.createElement('canvas')
})

// 取消按钮退出
const handleExit = () => {
  VideoUrl.value = ''
  WorkIntroduce.value = ''
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
              :file-list="fileList"
              name="video"
              accept="video/*"
            >
              <video v-if="VideoUrl" :src="VideoUrl" class="avatar"></video>
              <div v-else><i class="iconfont icon-24px"></i></div>
            </el-upload>
          </div>
          <div>点击投稿视频</div>
        </div>

        <!-- 简介 -->
        <div class="introduceBox">
          <div>简介</div>
          <div class="IntroduceInput">
            <textarea
              v-model="WorkIntroduce"
              placeholder="点击输入视频简介"
            ></textarea>
          </div>
        </div>

        <div class="buttons">
          <el-button class="el-button no" @click="handleExit">取消</el-button>
          <el-button
            class="el-button submit"
            :class="{ activeButton: WorkIntroduce && VideoUrl }"
            @click="handleSubmit"
          >
            上传
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

/* introduce */
.introduceBox {
  margin-top: 0;
  height: 40vh;
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
  margin-top: 5vh;
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
