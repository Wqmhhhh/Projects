<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const autoLogin = ref(false)
const user = {
  name: '乌漆抹黑嘿嘿嘿',
  follow: 10,
  fans: 6,
  douyinId: '11111111111111111',
}
// TODO:编辑资料弹框
const handleChangeUserInfor = () => {
  console.log(1)
}

// Tab栏
const myTab = [
  {
    path: '/main/my/works',
    name: '作品',
    num: 0,
    private: false,
  },
  {
    path: '/main/my/like',
    name: '喜欢',
    num: 166,
    private: false,
  },
  {
    path: '/main/my/collect',
    name: '收藏',
    num: 0,
    private: true,
  },
  {
    path: '/main/my/history',
    name: '观看历史',
    num: 0,
    private: true,
  },
]

const router = useRouter()
let activeIndex = ref('/main/my/works')
router.push('/main/my/works')
const handleTabClick = (path) => {
  activeIndex.value = path
  router.push(path)
}
</script>

<template>
  <div class="my-container">
    <div class="header">
      <div class="header-left">
        <div class="header-pic">
          <img src="../../assets/image.ico" alt="" />
        </div>
        <div class="header-infor">
          <div>{{ user.name }}</div>
          <div class="header-infor-inline">
            <div>关注 {{ user.follow }}</div>
            <hr />
            <div>粉丝 {{ user.fans }}</div>
          </div>
          <div>抖音号： {{ user.douyinId }}</div>
        </div>
      </div>
      <div class="header-right">
        <div>
          <span>保存登录信息</span>
          <el-switch v-model="autoLogin"></el-switch>
        </div>
        <el-button class="el-button" @click="handleChangeUserInfor"
          >编辑资料</el-button
        >
      </div>
    </div>

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
          :index="item.path"
          class="el-menu-item"
          @click="handleTabClick(item.path)"
          :class="{ activeTab: item.path === activeIndex }"
        >
          <span>{{ item.name }}</span>

          <span v-if="item.private"
            ><el-icon><Lock /></el-icon> </span
          ><span v-else>{{ item.num }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="routerView">
      <router-view></router-view>
    </div>
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
  display: inline-block;
}
.header-pic img {
  width: 100%;
  border-radius: 100vh;
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
