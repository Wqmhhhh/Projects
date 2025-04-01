<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import router from '@/router'

let isfocus = ref(false)
const handleFocus = () => {
  isfocus.value = true
}
const handleBlur = () => {
  isfocus.value = false
}

// const notice = []
const follow = ref(true)
const notfollow = ref(true)
const autoLogin = ref(false)

// 未登录时顶部相应卡片
const notLogin = ref(true)
// TODO:点击登录按钮弹出登录框
</script>
<template>
  <div id="app" class="tab">
    <div class="logo">
      <img src="../assets/image.png" alt="" />
      <span class="tab-title">抖音</span>
    </div>

    <div class="search" ref="search" :class="{ focus: isfocus }">
      <input
        type="text"
        name=""
        id=""
        placeholder="搜索你感兴趣的内容"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <hr />
      <span>
        <i class="iconfont icon-sousuo"></i>
        搜索
      </span>
    </div>

    <div class="down-box">
      <div class="down">
        <i class="iconfont icon-biaoqianlan_jingxuan"></i>
        <div class="icon-text">充钻石</div>
      </div>

      <el-popover
        :popper-class="notLogin ? 'kehuduanContainer' : 'TabNotLogin'"
        effect="dark"
        :hide-after="200"
      >
        <template #reference>
          <div class="down">
            <i class="iconfont icon-xiazai"></i>
            <div class="icon-text">客户端</div>
          </div>
        </template>
        <template #default>
          <div class="kehuduan-box" v-if="notLogin">
            <div class="kehuduan-box-top">
              <ul>
                <li>桌面便捷访问</li>
                <li>实时消息通知</li>
                <li>小窗播放视频</li>
                <li>极速下载视频</li>
              </ul>
              <img src="../assets/image.png" alt="" />
            </div>
            <el-button class="kehuduan-box-bottom">
              <i class="iconfont icon-xiazai"></i>下载电脑客户端
            </el-button>
          </div>
          <notLoginTab v-else></notLoginTab>
        </template>
      </el-popover>

      <el-popover
        :popper-class="notLogin ? 'noticeContainer' : 'TabNotLogin'"
        effect="dark"
        trigger="hover"
        :hide-after="200"
      >
        <template #reference>
          <div class="down">
            <i class="iconfont icon-tongzhizhongxin"></i>
            <div class="icon-text">通知</div>
          </div>
        </template>
        <template #default>
          <div class="notice-box" v-if="notLogin">
            <div class="notice-header">
              <span>互动消息</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  全部消息
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <!-- TODO：改下拉框的样式 -->
                <!-- TODO：鼠标悬浮在下拉框时下拉卡片显示 -->
                <template #dropdown>
                  <el-dropdown-menu
                    class="notice-dropdown"
                    trigger="click"
                    teleported="true"
                  >
                    <el-dropdown-item class="el-dropdown-item"
                      >全部消息</el-dropdown-item
                    >
                    <el-dropdown-item class="el-dropdown-item"
                      >粉丝</el-dropdown-item
                    >
                    <el-dropdown-item class="el-dropdown-item"
                      >@我的</el-dropdown-item
                    >
                    <el-dropdown-item class="el-dropdown-item"
                      >评论</el-dropdown-item
                    >
                    <el-dropdown-item class="el-dropdown-item"
                      >赞</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="notice-list">
              <div class="notice-each">
                <div class="notice-img">
                  <img src="../assets/image.ico" alt="" />
                </div>
                <div class="notice-text">
                  <h3>乌漆抹黑嘿嘿嘿</h3>
                  <!-- TODO：长评论仅显示一行字，剩余的省略号代替 -->
                  <p class="notice-comment">好饿好饿好饿</p>
                  <p class="notice-comment-time">回复了你的评论2024-10-02</p>
                </div>
                <div v-show="follow" class="notice-button">
                  <el-button class="el-button notFollow" v-if="notfollow"
                    >回关</el-button
                  >
                  <el-button class="el-button eachFollow" v-else
                    >互相关注</el-button
                  >
                </div>
              </div>

              <div class="list-end">到底啦~</div>
            </div>
          </div>
          <notLoginTab v-else></notLoginTab>
        </template>
      </el-popover>

      <el-popover
        :popper-class="notLogin ? 'messageContainer' : 'TabNotLogin'"
        effect="dark"
        :hide-after="200"
      >
        <template #reference>
          <div class="down">
            <i class="iconfont icon-sixin"></i>
            <div class="icon-text">私信</div>
          </div>
        </template>
        <template #default>
          <div class="message-box" v-if="notLogin">
            <div class="message-header">
              <span>私信</span>
            </div>
            <div class="message-list">
              <div class="message-each">
                <div class="message-img">
                  <img src="../assets/image.ico" alt="" />
                </div>
                <div class="message-text">
                  <h3>乌漆抹黑嘿嘿嘿</h3>
                  <p class="message-comment-time">2024-10-02</p>
                </div>
              </div>

              <div class="list-end">到底啦~</div>
            </div>
          </div>
          <notLoginTab v-else></notLoginTab>
        </template>
      </el-popover>

      <div class="down">
        <i class="iconfont icon-tianjia"></i>
        <div class="icon-text">投稿</div>
      </div>
    </div>

    <el-popover
      popper-class="user-container"
      effect="dark"
      :hide-after="200"
      placement="bottom-start"
      v-if="notLogin"
    >
      <template #reference>
        <div class="pic-box" @click="router.push('/main/my')">
          <img src="../assets/image.ico" alt="" class="pic" />
        </div>
      </template>
      <template #default>
        <div class="user-box">
          <div class="user-header">
            <div class="user-header-pic">
              <img src="../assets/image.ico" alt="" />
            </div>
            <!-- TODO：名字越界了省略号代替 -->
            <div class="user-header-name">
              <h3>乌漆抹黑嘿嘿</h3>
              <p>关注 10 | 粉丝 6</p>
            </div>
          </div>
          <div class="user-list">
            <el-divider class="divider" />
            <div class="user-logout">
              <div class="user-logout-text">
                <i class="iconfont icon-tuichudenglu"></i>
                退出登录
              </div>
              <div class="user-logout-button">
                <span>保存登录信息</span>
                <el-switch v-model="autoLogin"></el-switch>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-popover>
    <el-button v-else class="TabLoginButton">登录</el-button>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.tab {
  z-index: 999;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 10vh;
  display: flex;
  background-color: rgb(25, 27, 38);
  /* background-color: transparent; */
  padding: 1vh 2vw;
  justify-content: space-between;
  text-align: center;
  flex-wrap: nowrap;
  align-items: center;
}

.logo,
.search,
.pic-box,
.down-box,
.down {
  /* flex布局使元素垂直居中 */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* logo */
.logo {
  width: 6vw;
}
.tab-title {
  font-size: 3vh;
  font-weight: bold;
  color: #fff;
}
.logo img {
  width: 5vh;
}

/* search */
.search {
  height: 8vh;
  width: 35vw;
  margin: 0 12vw;
  background-color: #ffffff28;
  border-radius: 3vh;
  padding: 0 2vw;
}
.focus {
  border: #fff 0.3vh solid;
}
input {
  width: 20vw;
  margin: 0 1vw;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 3vh;
  color: #fff;
}
hr {
  width: 0;
  height: 4vh;
  margin: 0 1vw;
  border: 0.1vw solid #ffffff3a;
}
.search span {
  font-size: 3vh;
  color: #fff;
}
.search span:hover {
  cursor: pointer;
}

/* down */
.down-box {
  width: 20vw;
  height: 10vh;
}
.down {
  height: 100%;
  justify-content: center;
  width: 3vw;
  flex-wrap: wrap;
  color: #ffffff93;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 4vh;
}
.icon-text {
  font-size: 2vh;
}
.down:hover {
  cursor: pointer;
  color: #fff;
}
/* 客户端 */
.kehuduan-box {
  width: 22vw;
}
.kehuduan-box-top {
  padding: 5% 10%;
  display: flex;
  justify-content: space-around;
  font-size: 2.4vh;
  line-height: 5vh;
  font-weight: 500;
  color: #ffffffab;
}
.kehuduan-box-top img {
  width: 8vw;
}
.kehuduan-box-bottom {
  display: block;
  width: 20vw !important;
  height: 7vh !important;
  text-align: center;
  font-size: 2.6vh;
  background-color: rgb(255, 44, 85);
  color: #fff;
  border: 0;
  border-radius: 2vh;
  margin: 5% auto;
}
.kehuduan-box-bottom:hover {
  background-color: rgba(255, 44, 86, 0.712);
}
/* 通知、私信 */
.notice-box,
.message-box {
  width: 25vw;
  height: 70vh;
  padding: 2% 0;
}
.notice-header,
.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;
  margin-bottom: 3vh;
}
.notice-header > span,
.message-header > span {
  font-size: 3vh;
  font-weight: bold;
}
.el-dropdown-link {
  font-size: 2.5vh;
  font-weight: bold;
}
.el-dropdown-link:hover {
  cursor: pointer;
}

.notice-list,
.message-list {
  height: 57vh;
  overflow: auto;
}

.notice-list::-webkit-scrollbar,
.message-list::-webkit-scrollbar {
  width: 1vh; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
.notice-list::-webkit-scrollbar-thumb,
.message-list::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.notice-list::-webkit-scrollbar-thumb:hover,
.message-list::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.notice-list::-webkit-scrollbar-track,
.message-list::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 4px; /* 轨道圆角 */
}

.notice-each,
.message-each {
  border-radius: 2vh;
  height: 30%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vw;
}
.notice-each:hover,
.message-each:hover,
.user-work:hover {
  background-color: #ffffff1b;
  cursor: pointer;
}
.notice-img,
.message-img {
  width: 15%;
}
.notice-img img,
.message-img img {
  width: 100%;
  border-radius: 5vh;
}
.notice-text,
.message-text {
  width: 65%;
  height: 65%;
  padding: 0 3%;
  text-align: left;
}
.notice-text h3,
.notice-text .notice-comment,
.message-text h3 {
  font-size: 2.5vh;
}
.notice-comment {
  line-height: 5vh;
}
.notice-comment-time,
.message-comment-time {
  font-size: 2vh;
  color: #888888b0;
}
.notice-button {
  width: 23%;
  height: 30%;
  border-radius: 15%;
  background-color: #fff;
  font-size: 2.5vh;
}
.el-button {
  width: 100%;
  height: 100%;
}
.message-box {
  width: 23vw;
}
.message-each {
  height: 23%;
}
.message-text {
  width: 80%;
  height: 8vh;
  text-align: left;
  line-height: 4vh;
}

.list-end {
  font-size: 2.5vh;
  line-height: 6vh;
  text-align: center;
  color: #ffffffad;
}

/* pic */
.pic {
  width: 8vh;
  border-radius: 8vh;
}
.pic-box:hover {
  cursor: pointer;
}
.user-logout-text,
.user-logout,
.user-work,
.user-header,
.user-logout-button {
  display: flex;
  align-items: center;
}
.user-box {
  width: 90%;
  height: 30vh;
}
.user-header {
  height: 50%;
  justify-content: space-around;
}
.user-header-pic img {
  width: 100%;
  border-radius: 100vh;
}
.user-header-pic {
  width: 27%;
}
.user-header-name {
  width: 60%;
  height: 80%;
}
.user-header-name h3 {
  font-size: 3vh;
  line-height: 6vh;
}
.user-header-name p {
  font-size: 2.5vh;
  color: #ffffffa1;
}
.divider {
  border-color: #fffcfc15;
  border-width: 0.3vh;
  margin: 1vh 0;
}
.user-list {
  height: 70%;
}
.user-logout {
  height: 50%;
  justify-content: space-between;
  font-size: 2.5vh;
  color: #ffffffa1;
}
.user-logout-text {
  width: 35%;
  justify-content: space-between;
}
.user-logout-button {
  font-size: 2vh;
  width: 50%;
  justify-content: space-between;
}

/* 未登录时用户头像 */
.TabLoginButton {
  width: 7%;
  height: 90%;
  border-radius: 3vh;
  font-size: 3vh;
  border: 0;
  color: #fff;
  background-color: rgb(255, 44, 85);
}
.TabLoginButton:hover {
  cursor: pointer;
  background-color: rgba(255, 44, 86, 0.747);
}
</style>
<style>
.kehuduanContainer,
.noticeContainer,
.messageContainer,
.user-container,
.TabNotLogin {
  display: flex;
  justify-content: center;
  align-items: center;
}
.TabNotLogin {
  width: 17vw !important;
  background-color: rgb(37, 38, 50) !important;
  border-radius: 2vh !important;
}
.kehuduanContainer {
  width: 22vw !important;
  background: linear-gradient(
    to right,
    rgb(48, 64, 71),
    rgb(41, 42, 54),
    rgb(63, 40, 59)
  ) !important;
  border: 0 !important;
  border-radius: 3vh !important;
}
.noticeContainer,
.messageContainer {
  background-color: rgb(37, 38, 50) !important;
  border-radius: 3vh !important;
  width: 27vw !important;
}
.messageContainer {
  width: 25vw !important;
}
.user-container {
  width: 22vw !important;
  background-color: rgb(37, 38, 50) !important;
  border: 0 !important;
  border-radius: 3vh !important;
}
</style>
