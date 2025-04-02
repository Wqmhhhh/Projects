<script setup>
import { ref, onMounted } from 'vue'

// const currentVideo = ref({
//   src: '../assets/98433cc4904e30ec520e03aa62a268b1.mp4',
//   cover: '../assets/image.ico',
// })
const VideoRef = ref(true)
let totalLength = ref(0)
let VideoCurrentLength = ref(0)

// 改变时间格式
const TransTime = (num) => {
  let min = String(Math.floor(num / 60))
  let sec = String(Math.floor(num % 60))
  min = min >= 10 ? min : '0' + min
  sec = sec >= 10 ? sec : '0' + sec
  return min + ':' + sec
}

// 视频时长
onMounted(() => {
  // 监听视频加载完成事件，更新总时长
  VideoRef.value.addEventListener('loadedmetadata', () => {
    totalLength.value = VideoRef.value.duration
    VideoRef.value.play()
  })

  // 监听时间更新事件，动态更新当前播放时间
  VideoRef.value.addEventListener('timeupdate', () => {
    VideoCurrentLength.value = VideoRef.value.currentTime
    processNumber.value = (VideoCurrentLength.value / totalLength.value) * 100
    if (VideoCurrentLength.value === totalLength.value) {
      VideoPause.value = true
    }
  })
})

// 进度条
let processNumber = ref(0)
// 视频暂停
let VideoPause = ref(false)
// 音量
let VoiceVolumn = ref(true)
const VoiceVolumnNumber = ref(50)
// 倍速
const SpeedNumber = ref('倍速')

// 控制播放/暂停
const handlePlayPause = () => {
  if (VideoPause.value === true) {
    VideoRef.value.play()
  } else {
    VideoRef.value.pause()
  }
  VideoPause.value = !VideoPause.value
}

// 控制音量
const handleVoice = () => {
  if (VoiceVolumnNumber.value === 0) {
    VoiceVolumn.value = false
  } else {
    VoiceVolumn.value = true
  }
  VideoRef.value.volume = VoiceVolumnNumber.value / 100 // 将音量值转换为 0-1 范围
}

// 控制倍速
const handleSpeed = (value) => {
  SpeedNumber.value = value
  VideoRef.value.playbackRate = parseFloat(value) // 设置倍速
}

// 全屏控制
const handleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen() // 退出全屏
  } else {
    VideoRef.value.requestFullscreen() // 进入全屏
  }
}

// 视频上层图标
const tagShow = ref(false)
const UperName = ref('@乌漆抹黑嘿嘿嘿')
const VideoIntro = ref(
  `一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的符号一串没有用的`
)
let VideoIntroShow = ref()

// 介绍过长
const IntroduceToolong = ref(true)
// 介绍过长进行折叠
const ToolongWrap = ref(true)
const handleTooLong = () => {
  if (ToolongWrap.value) {
    VideoIntroShow.value = VideoIntro.value
  } else {
    VideoIntroShow.value = VideoIntro.value.substring(0, 80)
  }
  ToolongWrap.value = !ToolongWrap.value
}

// 初始化底部文本
onMounted(() => {
  if (VideoIntro.value.length > 80) {
    VideoIntroShow.value = VideoIntro.value.substring(0, 80)
    IntroduceToolong.value = true
  } else {
    VideoIntroShow.value = VideoIntro.value
  }
})

// 右侧图标
const FollowUper = ref(false)
const likeUper = ref(false)
const likeUperNum = ref(9999)
const CollectUper = ref(false)
const CollectUperNum = ref(9999)
const commentNum = ref(9999)

const handleLike = () => {
  likeUper.value = !likeUper.value
  if (likeUper.value) {
    likeUperNum.value++
  } else {
    likeUperNum.value--
  }
}
const handleCollect = () => {
  CollectUper.value = !CollectUper.value
  if (CollectUper.value) {
    CollectUperNum.value++
  } else {
    CollectUperNum.value--
  }
}

// 点击定时器
const clickTimer = ref(null)
const handleSingleClick = () => {
  // 清除定时器，防止重复触发
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
  }
  //设置新定时器延迟执行
  clickTimer.value = setTimeout(() => {
    handlePlayPause()
    clickTimer.value = null
  }, 200)
}
const handleDoubleClick = () => {
  // 立即清除单击定时器
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
  }
  // 直接执行
  handleLike()
}
// 右侧抽屉
const sideTab = [
  {
    name: 'TA 的作品',
  },
  {
    name: '评论',
  },
]
// 抽屉显示
const DrawerShow = ref(false)
const TabShow = ref(0)
const handleTabClick = (index) => {
  TabShow.value = index
}
// 评论数组
const CommentArr = ref([
  {
    picSrc: '../assets/image.ico',
    SendName: '乌漆抹黑嘿嘿嘿',
    msg: '建议加入淡斑精华',
    likeNum: 0,
    ifLike: false,
    time: '一天前',
    reply: [
      {
        picSrc: '../assets/image.ico',
        SendName: '乌漆抹黑嘿嘿嘿',
        msg: '建议加入淡斑精华',
        likeNum: 0,
        ifLike: false,
        time: '一天前',
      },
      {
        picSrc: '../assets/image.ico',
        SendName: '乌漆抹黑嘿嘿嘿',
        msg: '建议加入淡斑精华',
        likeNum: 0,
        ifLike: false,
        time: '一天前',
      },
      {
        picSrc: '../assets/image.ico',
        SendName: '乌漆抹黑嘿嘿嘿',
        msg: '建议加入淡斑精华',
        likeNum: 0,
        ifLike: false,
        time: '一天前',
      },
    ],
  },
])
// 评论数量
const CommentNum = ref(CommentArr.value.length)
// 点击头像显示抽屉的 作品
const handleClickPic = () => {
  handleTabClick(0)
  DrawerShow.value = true
}
// 点击评论显示抽屉的 评论
const handleClickComment = () => {
  if (TabShow.value === 0) {
    handleTabClick(1)
    DrawerShow.value = true
  } else {
    DrawerShow.value = !DrawerShow.value
  }
}
// 点击评论喜欢
const handleLikeComment = (e) => {
  if (e.ifLike) {
    e.ifLike = false
    e.likeNum--
  } else {
    e.ifLike = true
    e.likeNum++
  }
}

// TODO:将store中的user信息同步进来
const User = {
  name: 'whhhh',
  src: '../assets/image.ico',
}
const sendBoxText = ref('')
// 点击评论发送
const handleCommentSend = () => {
  const newComment = {
    picSrc: '../assets/image.ico',
    SendName: User.name,
    msg: sendBoxText.value,
    likeNum: 0,
    ifLike: false,
    time: '刚刚',
    reply: [],
  }
  if (curretReply.value) {
    curretReply.value.reply.unshift(newComment)
    curretReply.value = null
  } else {
    CommentArr.value.unshift(newComment)
  }
  sendBoxText.value = ''
  CommentNum.value = ref(CommentArr.value.length)
}
// 回复评论
const curretReply = ref(null)
const handleReply = (item) => {
  curretReply.value = item
  sendBoxText.value = `@${item.SendName}：` + sendBoxText.value
  document.querySelector('.sendBox input').focus()
}

// 删除评论
const handleDeleteComment = (index, arr) => {
  if (arr && arr.value) {
    arr.value.splice(index, 1)
  } else if (Array.isArray(arr)) {
    arr.splice(index, 1)
  }
  CommentNum.value = ref(CommentArr.value.length)
}
</script>
<template>
  <div class="video-container">
    <!-- 顶部视频 -->
    <div class="topContainer">
      <!-- TODO:把视频第一帧作为背景，加模糊 -->
      <div
        class="videoBox"
        :class="{ VideoShrink: DrawerShow }"
        @dblclick="handleDoubleClick"
        @click="handleSingleClick"
      >
        <video
          ref="VideoRef"
          playsinline="true"
          x5-playsinline="true"
          webkit-playsinline="true"
          mediatype="video"
          data-index="-1"
          crossorigin="anonymous"
          src="../assets/98433cc4904e30ec520e03aa62a268b1.mp4"
          autoplay=""
        ></video>
      </div>

      <!-- 视频右侧抽屉 -->
      <!-- TODO:抽屉背景和视频背景保持一致 -->
      <div class="drawer" :class="{ DrawerShow: DrawerShow }">
        <!-- drawerTab -->
        <div class="drawerTab">
          <el-menu
            mode="horizontal"
            class="Tab el-menu-demo"
            :default-active="TabShow"
          >
            <el-menu-item
              v-for="(item, index) in sideTab"
              :key="index"
              :index="index"
              class="el-menu-item"
              @click="handleTabClick(index)"
              :class="{ activeTab: index === TabShow }"
            >
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
          <el-icon class="el-icon" @click="DrawerShow = !DrawerShow"
            ><Close
          /></el-icon>
        </div>

        <!-- TA的作品 -->
        <div class="UperWorks" v-if="TabShow === 0"></div>

        <!-- 评论 -->
        <div class="comment" v-else>
          <div class="commentNum">全部评论（{{ CommentNum }}）</div>

          <!-- 评论详情 -->
          <div class="commentContainer">
            <div
              class="commentBox"
              v-for="(item, index) in CommentArr"
              :key="index"
            >
              <div>
                <img src="../assets/image.ico" alt="" />
              </div>
              <div>
                <div class="sendName">
                  <span>{{ item.SendName }}</span>
                  <el-button
                    class="el-button"
                    @click="handleDeleteComment(item, CommentArr)"
                    >删除</el-button
                  >
                </div>
                <div class="CommentMsg">{{ item.msg }}</div>

                <!-- 固定内容 -->
                <div class="commentFix">
                  <div>{{ item.time }}</div>
                  <div class="reply" @click="handleReply(item)">
                    <i class="iconfont icon-huifu"></i>
                    <span>回复</span>
                  </div>
                  <div class="likeCommentBox">
                    <i
                      class="iconfont icon-aixin"
                      :class="{ likeComment: item.ifLike }"
                      @click="handleLikeComment(item)"
                    ></i>
                    <span>{{ item.likeNum }}</span>
                  </div>
                </div>
              </div>

              <!-- 子评论 -->
              <div
                class="commentBox childComment"
                v-for="(citem, cindex) in item.reply"
                :key="cindex"
              >
                <div>
                  <img src="../assets/image.ico" alt="" />
                </div>
                <div>
                  <div class="sendName">
                    <span>{{ citem.SendName }}</span>
                    <el-button
                      class="el-button"
                      @click="handleDeleteComment(cindex, item.reply)"
                      >删除</el-button
                    >
                  </div>
                  <div class="CommentMsg">{{ citem.msg }}</div>

                  <!-- 固定内容 -->
                  <div class="commentFix">
                    <div style="margin-right: 4vh">{{ citem.time }}</div>
                    <div class="likeCommentBox">
                      <i
                        class="iconfont icon-aixin"
                        :class="{ likeComment: citem.ifLike }"
                        @click="handleLikeComment(citem)"
                      ></i>
                      <span>{{ citem.likeNum }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 发送评论对话框 -->
          <div class="sendContainer">
            <div class="sendBox">
              <input
                type="text"
                placeholder="讲两句再走~"
                v-model="sendBoxText"
                @keyup.enter="handleCommentSend"
              />
              <el-button class="el-button" @click="handleCommentSend"
                >biu~发送</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部文字 -->
    <div class="topContainerBottom" v-show="!tagShow">
      <div>{{ UperName }}</div>
      <div>
        <span>{{ VideoIntroShow }}</span>

        <!-- 介绍过长时显示 -->
        <span v-if="!IntroduceToolong"></span>
        <span v-else @click="handleTooLong">
          <span class="TooLong" v-if="ToolongWrap"> ...显示全部 </span>
          <span class="TooLong" v-else> 折叠 </span>
        </span>
      </div>
    </div>

    <!-- 右侧图标 -->
    <div
      class="topContainerRight"
      :class="{ topContainerRightMove: DrawerShow }"
    >
      <div class="UperPic" @click="handleClickPic">
        <img src="../assets/image.ico" alt="" />
      </div>
      <div @click="FollowUper = !FollowUper" class="FollowUper">
        <i
          class="iconfont icon-31yiguanzhudianpu"
          v-if="FollowUper"
          style="color: rgb(254, 44, 85)"
        ></i>
        <i class="iconfont icon-31guanzhudianpu" v-else></i>
      </div>
      <div class="like" @click="handleLike">
        <i class="iconfont icon-aixin" :class="{ likeUper: likeUper }"></i>
        <div>{{ likeUperNum }}</div>
      </div>
      <div class="commentIcon" @click="handleClickComment">
        <i class="iconfont icon-pinglun"></i>
        <div>{{ commentNum }}</div>
      </div>
      <div class="collect" @click="handleCollect">
        <i
          class="iconfont icon-weishoucang"
          :class="{ CollectUper: CollectUper }"
        ></i>
        <div>{{ CollectUperNum }}</div>
      </div>
      <div class="more"><i class="iconfont icon-gengduo1"></i></div>
    </div>

    <!-- 控制条 -->
    <div class="control">
      <!-- 进度条 -->
      <input type="range" class="progressBar" v-model="processNumber" />

      <!-- 进度条按钮 -->
      <div class="buttons">
        <div class="buttonsLeft">
          <div @click="handlePlayPause">
            <el-icon v-if="VideoPause">
              <i class="iconfont icon-bofang"></i>
            </el-icon>
            <el-icon v-else>
              <i class="iconfont icon-tingzhibofang"></i>
            </el-icon>
          </div>

          <!-- 视频时长 -->
          <div>
            {{ TransTime(VideoCurrentLength) }}/{{ TransTime(totalLength) }}
          </div>
        </div>

        <div class="buttonsRight">
          <div>
            <el-switch size="small" v-model="tagShow"></el-switch>
            <span>清屏</span>
          </div>
          <div>
            <el-dropdown placement="top" @command="handleSpeed">
              <span class="el-dropdown-link"> {{ SpeedNumber }} </span>
              <template #dropdown>
                <el-dropdown-menu class="speedList">
                  <el-dropdown-item command="0.75x">0.75x</el-dropdown-item>
                  <el-dropdown-item command="1.0x">1.0x</el-dropdown-item>
                  <el-dropdown-item command="1.25x">1.25x</el-dropdown-item>
                  <el-dropdown-item command="1.5x">1.5x</el-dropdown-item>
                  <el-dropdown-item command="2.0x">2.0x</el-dropdown-item>
                  <el-dropdown-item command="2.5x">2.5x</el-dropdown-item>
                  <el-dropdown-item command="3.0x">3.0x</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <div>
            <el-dropdown placement="top" class="el-dropdown-voice">
              <div class="el-dropdown-link">
                <el-icon>
                  <i
                    class="iconfont icon-laba"
                    v-if="VoiceVolumn"
                    @click=";(VoiceVolumn = false), (VoiceVolumnNumber = 0)"
                  ></i>
                  <i
                    class="iconfont icon-shengyinjingyin"
                    v-else
                    @click=";(VoiceVolumn = true), (VoiceVolumnNumber = 100)"
                  ></i>
                </el-icon>
              </div>
              <template #dropdown>
                <div class="VoiceRange">
                  <div>{{ VoiceVolumnNumber }}</div>
                  <input
                    type="range"
                    v-model="VoiceVolumnNumber"
                    step="2"
                    @change="handleVoice"
                  />
                </div>
              </template>
            </el-dropdown>
          </div>

          <div @click="handleFullScreen" class="fullScreen">
            <el-icon><i class="iconfont icon-quanping1"></i></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* flex */
.buttons,
.buttonsLeft,
.buttonsRight,
.inlinePlay,
.topContainer,
.sendBox,
.commentFix {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 视频 */
.topContainer {
  width: 100%;
  height: 90%;
  position: relative;
  overflow: hidden;
}
.videoBox {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  object-fit: contain;
  position: relative;
}
.videoBox:hover {
  cursor: pointer;
}
video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  width: auto;
  height: auto;
}
.VideoShrink {
  width: 70%;
}

/* 底部文字 */
.topContainerBottom {
  position: absolute;
  width: 60%;
  height: 17%;
  top: 70%;
  left: 3%;
  text-align: left;
  overflow-y: scroll;
  scrollbar-width: none;
  color: #ffffffe0;
}
.topContainerBottom > div:first-child {
  font-size: 3.5vh;
  line-height: 6vh;
  font-weight: bold;
  user-select: none;
}
.topContainerBottom > div:nth-child(2) > span:first-child {
  font-size: 2.5vh;
  line-height: 3.5vh;
  user-select: none;
}
.topContainerBottom .TooLong {
  display: inline-block;
  margin-left: 0.5vw;
  font-size: 2vh;
  color: #bbbaba;
}
.topContainerBottom .TooLong:hover {
  color: #eaeaea;
  cursor: pointer;
}

/* 右侧图标 */
.topContainerRight {
  position: absolute;
  width: 4%;
  height: 57%;
  color: #fff;
  top: 15%;
  left: 93%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;
  transition: all 0.5s;
  font-size: 2vh;
}
.topContainerRight .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 3.5vh;
  line-height: 5vh;
}
.topContainerRight > div:hover {
  cursor: pointer;
  color: #ffffffa2;
}
.UperPic {
  width: 100%;
  margin-bottom: 10%;
  height: auto;
}
.UperPic > img {
  width: 80%;
  border-radius: 100vh;
}
.likeUper,
.likeComment {
  color: rgb(254, 44, 85) !important;
}
.CollectUper {
  color: rgb(255, 184, 2) !important;
}
.topContainerRightMove {
  left: 63%;
}

/* 抽屉 */
.drawer {
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  transition: all 0.5s;
  background-color: rgba(27, 26, 26, 0.331);
  /* backdrop-filter: blur(3vh); */
  transform: translateX(100%);
  visibility: hidden;
  position: absolute;
  border-top-right-radius: 4vh;
  left: 70%;
  padding: 0 1vw;
}

/* drawerTab */
.drawerTab {
  width: 100%;
  height: 13%;
  background-color: transparent;
}
.drawerTab > .el-icon {
  color: #ffffffa9;
  font-size: 4vh;
  position: absolute;
  top: 4%;
  left: 86%;
}
.drawerTab > .el-icon:hover {
  color: #fff;
  cursor: pointer;
}
.DrawerShow {
  visibility: visible;
  transform: translateX(0);
}
.Tab {
  width: 80%;
  height: 100%;
  background-color: #ffffff00;
  border: 0;
}
.Tab > .el-menu-item {
  padding: 0 1vw;
  font-size: 2.7vh;
  color: #ffffffa9;
  background-color: transparent;
  user-select: none;
}
.Tab > .el-menu-item::after {
  content: '';
  width: 70%;
  height: 100%;
  position: absolute;
  left: 15%;
  background-color: transparent;
}
.Tab > .el-menu-item:hover::after {
  border-bottom: 0.4vh solid #ffffff57;
}
.Tab > .el-menu-item:hover {
  background-color: transparent;
  color: #fff;
}
.Tab > .activeTab,
.Tab > .el-menu-item:focus {
  border-bottom: 0.5vh solid rgb(254, 44, 85);
  color: #fff !important;
  background-color: transparent;
}
.Tab > .activeTab::after {
  border-bottom: transparent !important;
}

/* commentContainer */
.comment {
  height: 87%;
  width: 100%;
}
.commentNum {
  color: #ffffffa9;
  padding: 2vh 1vw;
  font-size: 2.5vh;
  text-align: left;
  background-color: transparent;
}
.commentContainer {
  height: 77%;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  color: #eaeaea;
  background-color: transparent;
}
.commentContainer::-webkit-scrollbar {
  width: 1vh; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
.commentContainer::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.commentContainer::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.commentContainer::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 4px; /* 轨道圆角 */
}

/* 评论Box */
.commentBox {
  width: 100%;
  height: auto;
  text-align: left;
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  margin: 2vh 0;
  /* background-color: #ffffff82; */
}
.commentBox > div:first-child {
  width: 13%;
  margin-right: 2%;
}
.commentBox > div:nth-child(2) {
  width: 83%;
}
.commentBox img {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 100vh;
}
.commentBox .sendName {
  font-size: 2.2vh;
  margin-bottom: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffffe4;
}
.commentBox .sendName .el-button {
  width: 20%;
  margin-right: 5%;
  font-size: 2vh;
  background-color: #ffffff54;
  color: #ffffffe2;
  border: 0;
}
.commentBox .sendName .el-button:hover {
  background-color: rgba(199, 197, 197, 0.719);
}
.CommentMsg {
  width: 80%;
  font-size: 2.4vh;
  line-height: 4vh;
  color: #fff;
  word-wrap: break-word; /* 确保长单词可以换行 */
  word-break: break-all; /* 确保内容可以在任意位置换行 */
}
.commentBox .commentFix {
  justify-content: start;
  margin-top: 1.5vh;
  font-size: 2vh;
  color: #ffffffe2;
}
.commentBox .reply {
  font-size: 2vh;
  margin: 0 2vw;
}
.commentBox .reply:hover {
  cursor: pointer;
  color: #fff;
}
.likeCommentBox:hover {
  cursor: pointer;
}

/* 子评论框 */
.childComment {
  width: 90%;
  margin-left: 10%;
}

/* 评论对话框 */
.sendContainer {
  height: 23%;
  width: 100%;
  background-color: transparent;
}
.sendBox {
  margin: 0 auto;
  background-color: rgb(51, 51, 51);
  width: 90%;
  border-radius: 2.5vh;
  padding: 1vh 1vw;
}
.sendBox > input {
  background-color: transparent;
  font-size: 2.5vh;
  outline: none;
  border: 0;
  color: #ffffffb4;
}
.sendBox > .el-button {
  font-size: 2vh;
  width: 25%;
  border: 0;
  color: #fff;
  background-color: rgba(254, 44, 86, 0.616);
}
.sendBox > .el-button:hover {
  background-color: rgb(254, 44, 85);
}

/* 进度条 */
.control .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 4vh;
  line-height: 5vh;
}
.control {
  width: 100%;
  height: 10%;
  bottom: 0;
  position: relative;
}
.progressBar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5%;
  /* 未填充部分颜色 */
  background-color: #ffffff3b;
  /* background-color: #fff; */
  -webkit-appearance: none; /* 清除默认样式 */
}

.progressBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1.5vh;
  height: 0.5vh;
  background: #ffffff90; /* 滑块颜色 */
  border-radius: 30%;
}

.progressBar::-moz-range-progress {
  background-color: #ffffff76; /* 已填充部分颜色 */
  height: 2vh;
  border-radius: 0.5vh;
}

.progressBar::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: none;
  border-radius: 50%;
}

/* 悬停效果 */
.progressBar:hover::-webkit-slider-thumb {
  transform: scale(2);
  cursor: pointer;
}
.progressBar:hover::-moz-range-thumb {
  transform: scale(2);
}

/* 聚焦效果 */
.progressBar:focus {
  outline: none;
}

/* 按钮 */
.buttons {
  color: #ffffffad;
  font-size: 2.5vh;
  position: relative;
  top: 8%;
  height: 95%;
  padding: 0 3%;
  position: relative;
  background: linear-gradient(
    to bottom,
    rgba(35, 35, 35, 0.753),
    5%,
    rgb(35, 35, 35)
  );
  border-bottom-right-radius: 4vh;
  border-bottom-left-radius: 4vh;
}
.buttonsLeft {
  width: 13%;
}
.buttonsRight {
  width: 20%;
  font-size: 2.5vh;
  line-height: 3vh;
}

.buttonsRight > div:first-child {
  line-height: 3vh;
}
.buttonsRight > div:first-child > span {
  margin-left: 0.5vw;
}
/* 播放 */
.buttons > div:first-child > div:first-child:hover {
  color: #fff;
  cursor: pointer;
}

/* 倍速 */
.el-dropdown-link {
  font-size: 2.5vh;
  color: #ffffffad;
}
.el-dropdown-link:hover {
  cursor: pointer;
}

/* 音量 */
.VoiceRange {
  height: 10vh;
  width: 17vw;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2.5vh;
  border-radius: 2vh;
  color: #000000;
}
.VoiceRange > input {
  width: 13vw;
  height: 1vh;
}
.VoiceRange > div {
  width: 2vw;
}

/* 全屏 */
.fullScreen:hover {
  cursor: pointer;
  color: #fff;
}
</style>
