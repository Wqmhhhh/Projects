<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

// store库
// import { useFansStore } from '@/stores/index'
import { useShowFlags, useUserStore, useVideo } from '@/stores/index'
import { storeToRefs } from 'pinia'

const FlagsStore = useShowFlags()
const UserStore = useUserStore()

const { ifLogin, ifAutoLogin, ifEditShow } = storeToRefs(FlagsStore)
const { user } = UserStore

// 编辑资料弹框
const handleChangeUserInfor = () => {
  ifEditShow.value = true
}

// Tab栏信息
const myTab = [
  {
    path: '/main/my/works',
    name: '作品',
    private: false,
  },
  {
    path: '/main/my/like',
    name: '喜欢',
    private: false,
  },
  {
    path: '/main/my/private',
    name: '私密',
    private: true,
  },
]

// 初始默认激活 “作品”
const router = useRouter()
const activeIndex = ref('/main/my/works')

// 点击tab栏进行切换
const handleTabClick = (path) => {
  activeIndex.value = path

  if (path === '/main/my/works') {
    console.log('发送我的公开视频列表请求')
    useVideo().getMyPubList(10)
  } else if (path === '/main/my/like') {
    console.log('发送我的喜欢视频列表请求')
    useVideo().getMyLikeList(10)
  } else if (path === '/main/my/private') {
    console.log('发送我的私密视频列表请求')
    useVideo().getMyPriList(10)
  }

  router.push(path)
}

// 每次进入页面进行数据请求、渲染页面
const refresh = () => {
  console.log('发送查询用户信息请求')
  UserStore.getUserInfo()
}

// 查询我的关注列表
// const queryFollowList = () => {
//   console.log('查询我的关注列表')
//   useFansStore().queryFollowList(1, 3)
// }

// const queryFansList = () => {
//   console.log('查询我的粉丝列表')
//   useFansStore().queryFansList(1, 3)
// }

// 页面加载完成的操作
onMounted(() => {
  // 初始化
  refresh()

  // queryFollowList()
  // queryFansList()

  nextTick(() => {
    handleTabClick('/main/my/works')
    activeIndex.value = '/main/my/works'
  })
})
</script>

<template>
  <div class="my-container" v-if="ifLogin">
    <!-- 顶部个人信息 -->
    <div class="header">
      <div class="header-left">
        <!-- 头像 -->
        <div class="header-pic">
          <img :src="user.face" alt="" />
        </div>
        <!-- 信息 -->
        <div class="header-infor">
          <div>{{ user.nickname }}</div>
          <div class="header-infor-inline">
            <div>关注 {{ user.myFollowsCounts }}</div>
            <hr />
            <div>粉丝 {{ user.myFansCounts }}</div>
          </div>
          <div>抖音号： {{ user.id }}</div>
        </div>
      </div>

      <div class="header-right">
        <!-- 保存登录信息 -->
        <div>
          <span>保存登录信息</span>
          <el-switch v-model="ifAutoLogin"></el-switch>
        </div>

        <!-- 编辑资料 -->
        <el-button class="el-button" @click="handleChangeUserInfor">
          编辑资料
        </el-button>
      </div>
    </div>

    <!-- Tab栏切换‘我的’视频列表 -->
    <div class="Tab-container">
      <el-menu
        mode="horizontal"
        class="Tab el-menu-demo"
        :default-active="activeIndex.toString()"
        router
      >
        <el-menu-item
          v-for="(item, index) in myTab"
          :key="index"
          :index="item.path.toString()"
          class="el-menu-item"
          @click="handleTabClick(item.path)"
          :class="{ activeTab: item.path === activeIndex }"
        >
          <span>{{ item.name }}</span>

          <span v-if="item.private">
            <el-icon><Lock /></el-icon>
          </span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="routerView">
      <router-view></router-view>
    </div>
  </div>

  <div v-else class="notLoginShow">
    <NotLoginRouterView></NotLoginRouterView>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.my-container {
  overflow: auto;
  scrollbar-width: none;
  height: 90vh;
}

/* flex */
.header,
.header-left,
.header-infor-inline,
.header-right > div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 头部 */
.header {
  background-color: #ffffff08;
  border-radius: 3vh;
  width: 100%;
  height: 37vh;
  padding: 2% 3%;
  color: #ffffffc1;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.header-left {
  width: 50%;
  height: 75%;
}
.header-pic {
  width: 25%;
  /* 定义宽高比为1:1 */
  aspect-ratio: 1 / 1;
  border-radius: 100vh;
  overflow: hidden;
  display: inline-block;
  background-color: #fff;
}
.header-pic img {
  width: 100%;
}
.header-infor {
  width: 70%;
  height: 70%;
  text-align: left;
}
.header-infor > div:first-child {
  font-size: 3.5vh;
  color: #fff;
  margin-bottom: 1vh;
  font-weight: 600;
}
.header-infor > div:last-child {
  font-size: 2.3vh;
  color: #ffffff7e;
}
.header-infor-inline {
  width: 35%;
  font-size: 2.8vh;
  margin-bottom: 2vh;
}
.header-infor-inline hr {
  height: 2vh;
  border-color: #ffffff78;
}
.header-right {
  width: 12%;
}
.header-right > div:first-child {
  font-size: 2vh;
  width: 100%;
  height: 10vh;
}
.header-right > .el-button {
  width: 70%;
  height: 6vh;
  border-radius: 2vh;
  border: 0;
  color: #fff;
  font-size: 2.5vh;
  background-color: #ffffff29;
}

/* Tab 栏 */
.Tab-container {
  width: 100%;
  position: sticky;
  top: 0;
}
.Tab {
  width: 100%;
  height: 10vh;
  /* background-color: rgb(25, 27, 38); */
  background-color: #ffffff00;
  border: 0;
}
.Tab > .el-menu-item {
  width: 20%;
  color: #ffffffa9;
  font-size: 3vh;
  background-color: transparent;
}
.Tab > .el-menu-item::after {
  content: '';
  width: 70%;
  height: 100%;
  position: absolute;
  left: 15%;
  background-color: transparent;
  /* border-bottom: 0.4vh solid #ffffff57; */
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

/* 视频显示 */
.routerView {
  width: 100%;
  height: 80vh;
  overflow: auto;
  scrollbar-width: none;
}
</style>
