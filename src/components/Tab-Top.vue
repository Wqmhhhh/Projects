<script setup>
import { ref } from 'vue'
import router from '@/router'

// 导入库
import { useShowFlags, useUserStore, useNoticeList } from '@/stores/index'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const UserStore = useUserStore()
const NoticeStore = useNoticeList()
const {
  ifLoginShow,
  ifLogin: notLogin,
  ifAutoLogin,
  ifUpLoadWorks,
  ifSearch,
} = storeToRefs(FlagsStore)
const { user, token } = storeToRefs(UserStore)
const { NoticeList } = storeToRefs(NoticeStore)

// 导入接口
import { userLogOutService } from '@/api/login'

// 点击显示登录弹框
const PopLogin = () => {
  ifLoginShow.value = true
}

// 搜索框聚焦、失焦对应效果
const isfocus = ref(false)
const handleFocus = () => {
  isfocus.value = true
}
const handleBlur = () => {
  isfocus.value = false
}

// 点击客户端
const handleKehudaun = () => {
  ElMessage('没有客户端可以下载~')
}
// const notice = []
const FollowUper = ref(false)

// 退出登录
const handleLogOut = async () => {
  // 退出登录
  const res = userLogOutService(user.id)
  console.log('退出登录：', res)

  // TODO：检查是否有自动登录，没有清除本地信息
  if (!ifAutoLogin.value) {
    user.value = {}
    token.value = ''
  }
  notLogin.value = false
  location.reload()
}

// 处理用户搜索
const searchInput = ref('')
const handleSearch = () => {
  // TODO:将搜索内容传给后端

  // 顶部Tab栏显示返回按钮、跳转页面
  ifSearch.value = true
  router.push('/search')
}

// 点击返回按钮返回主页面
const handleBack = async () => {
  // 返回主页面、输入框清空
  searchInput.value = ''
  ifSearch.value = false
  await router.push('/')
  // 顶部Tab不显示返回按钮

  router.go(0)
}
</script>
<template>
  <div id="app" class="tab">
    <div class="logo">
      <div class="back" @click="handleBack" v-if="ifSearch">
        <el-icon><ArrowLeftBold /></el-icon>
      </div>
      <img src="../assets/tabLogo.png" alt="" v-else />
    </div>

    <div class="search" ref="search" :class="{ focus: isfocus }">
      <input
        v-model="searchInput"
        type="text"
        name=""
        id=""
        placeholder="搜索你感兴趣的内容"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
      />
      <hr />
      <span @click="handleSearch">
        <i class="iconfont icon-sousuo"></i>
        搜索
      </span>
    </div>

    <div class="down-box">
      <!-- 充钻石 -->
      <div class="down">
        <i class="iconfont icon-biaoqianlan_jingxuan"></i>
        <div class="icon-text">充钻石</div>
      </div>

      <!-- 客户端 -->
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
            <el-button class="kehuduan-box-bottom" @click="handleKehudaun">
              <i class="iconfont icon-xiazai"></i>下载电脑客户端
            </el-button>
          </div>
          <notLoginTab v-else></notLoginTab>
        </template>
      </el-popover>

      <!-- 通知 -->
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
            </div>
            <div class="notice-list">
              <!-- TODO：填入对应内容 -->
              <div
                class="notice-each"
                v-for="(item, index) in NoticeList"
                :key="index"
              >
                <div class="notice-img">
                  <img src="../assets/image.ico" alt="" />
                </div>
                <div class="notice-text">
                  <h3>乌漆抹黑嘿嘿嘿</h3>
                  <!-- TODO：长评论仅显示一行字，剩余的省略号代替 -->
                  <p class="notice-comment">好饿好饿好饿</p>
                  <p class="notice-comment-time">回复了你的评论2024-10-02</p>
                </div>
                <div
                  class="UperWorksFollowButton notice-button"
                  @click="FollowUper = !FollowUper"
                >
                  <el-button
                    class="el-button DrawerNotfollow"
                    v-if="!FollowUper"
                    >回关</el-button
                  >
                  <el-button class="el-button Drawerfollow" v-else
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

      <!-- 私信 -->
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

      <!-- 投稿 -->
      <div class="down" @click="ifUpLoadWorks = true">
        <i class="iconfont icon-tianjia"></i>
        <div class="icon-text">投稿</div>
      </div>

      <!-- 头像· -->
      <el-popover
        popper-class="user-container"
        effect="dark"
        :hide-after="200"
        placement="bottom-start"
        v-if="notLogin"
      >
        <template #reference>
          <div class="pic-box" @click="router.push('/main/my')">
            <img src="../assets/image.ico" class="pic" alt="" />
            <!-- <img :src="user.ProFileSrc" alt="" class="pic" /> -->
          </div>
        </template>
        <template #default>
          <div class="user-box">
            <div class="user-header">
              <div class="user-header-pic">
                <!-- <img :src="user.ProFileSrc" alt="" /> -->
                <img src="../assets/image.ico" class="pic" alt="" />
              </div>
              <!-- TODO：名字越界了省略号代替 -->
              <div class="user-header-name">
                <h3>{{ user.name }}</h3>
                <p>关注 {{ user.followNum }} | 粉丝 {{ user.fansNum }}</p>
              </div>
            </div>
            <div class="user-list">
              <el-divider class="divider" />
              <div class="user-logout">
                <div class="user-logout-text" @click="handleLogOut">
                  <i class="iconfont icon-tuichudenglu"></i>
                  退出登录
                </div>
                <div class="user-logout-button">
                  <span>保存登录信息</span>
                  <el-switch v-model="ifAutoLogin"></el-switch>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-popover>

      <!-- 未登录时显示按钮 -->
      <el-button v-else class="TabLoginButton" @click="PopLogin"
        >登录</el-button
      >
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* flex */
.tab,
.search span,
.logo,
.search,
.pic-box,
.down-box,
.down,
.kehuduan-box-top,
.notice-each,
.message-each,
.message-text,
.user-logout-text,
.user-logout,
.user-header,
.user-logout-button,
.user-header-pic {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* curser */
.search span:hover,
.down:hover,
.pic-box:hover {
  cursor: pointer;
  color: #fff;
}

.tab {
  z-index: 1000;
  width: 100%;
  height: 56px;
  padding: 10% 0;
  background-color: rgb(22, 24, 35);
  /* background-color: #ffffff77; */
  padding: 0 2%;
}

/* logo */
.logo {
  height: 100%;
}
.logo img {
  height: 100%;
}
/*跳转登录页显示的返回按钮 */
.back {
  left: 30px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-color: #ffffff2a;
  border-radius: 10px;
}
.back:hover {
  cursor: pointer;
  background-color: #ffffff67;
}

/* search */
.search {
  height: 80%;
  width: 450px;
  background-color: #ffffff28;
  border-radius: 20px;
}
.focus {
  border: #fff 2px solid;
}
input {
  width: 70%;
  margin: 0 3%;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 17px;
  color: #fff;
}
hr {
  width: 0;
  height: 70%;
  border: 1px solid #ffffff3a;
}
.search span {
  width: 15%;
  margin-right: 3%;
  font-size: 17px;
  color: #fff;
}

/* down */
.down-box {
  font-size: 12px;
  width: 35%;
  height: 100%;
  justify-content: end;
}
.down {
  width: 36px;
  margin-right: 2%;
  justify-content: center;
  flex-wrap: wrap;
  color: #ffffff93;
  white-space: nowrap;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 20px;
}

/* 客户端 */
.kehuduan-box {
  width: 300px;
  height: 200px;
}
.kehuduan-box-top {
  padding: 3% 5%;
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  line-height: 30px;
  color: #ffffffab;
}
.kehuduan-box-top img {
  width: 40%;
  height: 40%;
}
.kehuduan-box-bottom {
  display: block;
  width: 90% !important;
  height: 20% !important;
  text-align: center;
  font-size: 17px;
  background-color: rgb(255, 44, 85);
  color: #fff;
  border: 0;
  border-radius: 10px;
  margin: 3% auto;
}
.kehuduan-box-bottom:hover {
  background-color: rgba(255, 44, 86, 0.712);
}

/* 通知、私信 */
.notice-box,
.message-box {
  width: 350px;
  height: 500px;
  padding: 2% 0;
}
.notice-header,
.message-header {
  padding-left: 5%;
  height: 10%;
  font-size: 20px;
  font-weight: bold;
}
.notice-list,
.message-list {
  height: 90%;
  overflow-y: scroll;
}

/* 滚动条样式 */
.notice-list::-webkit-scrollbar,
.message-list::-webkit-scrollbar {
  width: 7px; /* 滚动条宽度 */
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
  border-radius: 10px;
  height: 20%;
  padding: 0 5%;
  margin-right: 3%;
}
.notice-each:hover,
.message-each:hover,
.user-work:hover {
  background-color: #ffffff1b;
  cursor: pointer;
}
.notice-img,
.message-img {
  width: 17%;
}
.notice-img img,
.message-img img {
  width: 100%;
  border-radius: 5vh;
}
.notice-text,
.message-text {
  width: 75%;
  height: 65%;
  padding: 0 3%;
  text-align: left;
}
.notice-text h3,
.notice-text .notice-comment,
.message-text h3 {
  font-size: 15px;
  line-height: 25px;
}
.notice-comment-time,
.message-comment-time {
  font-size: 12px;
  color: #888888b0;
}

.UperWorksFollowButton {
  width: 25%;
  height: 40%;
}
.UperWorksFollowButton > .el-button {
  width: 100%;
  height: 100%;
  font-size: 13px;
  border: 0;
  color: #ffffffde;
}
.UperWorksFollowButton > .DrawerNotfollow {
  background-color: rgb(254, 44, 85);
}
.UperWorksFollowButton > .Drawerfollow {
  background-color: #ffffff3f;
}

/* 私信 */
.message-each {
  height: 20%;
}
.message-text {
  width: 80%;
  height: 60%;
  text-align: left;
  flex-wrap: wrap;
  line-height: 4vh;
}
.message-text h3 {
  width: 200px;
}

.list-end {
  font-size: 15px;
  line-height: 6vh;
  text-align: center;
  color: #ffffffad;
}

/* 头像 */
/* tab栏头像 */
.pic {
  width: 40px;
  border-radius: 8vh;
}
/* 下拉框 */
.user-box {
  width: 250px;
  height: 150px;
}
.user-header {
  height: 50%;
}
.user-header-pic {
  height: 100%;
  width: 25%;
}
.user-header-pic img {
  width: 100%;
  border-radius: 100vh;
}
.user-header-name {
  width: 70%;
}
.user-header-name h3 {
  font-size: 20px;
  line-height: 30px;
}
.user-header-name p {
  font-size: 15px;
  color: #ffffffa1;
}
.divider {
  border-color: #fffcfc15;
  border-width: 0.3vh;
  margin: 5% 0;
}
.user-logout {
  height: 50%;
  display: flex;
  justify-content: space-between;
  font-size: 17px;
  color: #ffffffa1;
}
.user-logout-text:hover {
  cursor: pointer;
  color: #fff;
}
.user-logout-button {
  font-size: 11px;
  width: 50%;
  justify-content: space-between;
}

/* 未登录时用户头像 */
.TabLoginButton {
  width: 13%;
  height: 50%;
  border-radius: 3vh;
  font-size: 13px;
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
  width: 250px !important;
  background-color: rgb(37, 38, 50) !important;
  border-radius: 20px !important;
}
.kehuduanContainer {
  width: 300px !important;
  background: linear-gradient(
    to right,
    rgb(48, 64, 71),
    rgb(41, 42, 54),
    rgb(63, 40, 59)
  ) !important;
  border: 0 !important;
  border-radius: 20px !important;
}
.noticeContainer,
.messageContainer {
  background-color: rgb(37, 38, 50) !important;
  border-radius: 3vh !important;
  width: 350px !important;
}
.user-container {
  width: 250px !important;
  background-color: rgb(37, 38, 50) !important;
  border: 0 !important;
  border-radius: 20px !important;
}
</style>
