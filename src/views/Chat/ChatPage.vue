<script setup>
import chatListComponent from './components/chatListComponent.vue'
import chatView from './components/chatView.vue'
import { onMounted, ref } from 'vue'
import { Search, Close } from '@element-plus/icons-vue'
import { useChatList } from '@/stores/modules/chatListInfo'
import { storeToRefs } from 'pinia'
import router from '@/router'

const chatStore = useChatList()
const {
  naviBarIndex,
  chatList,
  friendsList,
  followList,
  ifHaveChatList,
  ifHaveFriendList,
  ifHaveFollowList,
  ifHaveView,
} = storeToRefs(chatStore)

// 搜索内容
const searchInput = ref()
// 搜索视图是否显示
const ifSearchViewShow = ref(false)

// 处理导航栏图标切换对应视图
const handleChatActive = () => {
  ifSearchViewShow.value = false
  chatStore.changeFlag('chat')
}
const handleFriendActive = () => {
  ifSearchViewShow.value = false
  chatStore.changeFlag('friend')
}
const handleFollowActive = () => {
  ifSearchViewShow.value = false
  chatStore.changeFlag('follow')
}

// 返回视频页面
const handleBack = () => {
  router.push('/main/recommend')
}

// 点击搜索显示对应效果
const handleSearch = () => {
  ifSearchViewShow.value = true
}

const handleBlur = () => {
  if (!ifSearchViewShow.value) {
    searchInput.value.blur()
  } else {
    searchInput.value.focus()
  }
}

const handleSearchClose = () => {
  ifSearchViewShow.value = false
  searchInput.value.blur()
}

onMounted(() => {
  chatStore.changeFlag(naviBarIndex.value)
})
</script>

<template>
  <div class="outSpace">
    <div class="chatContainer">
      <el-row>
        <!-- 导航栏 -->
        <el-col :span="1" class="column columnFix">
          <div class="FixTop">
            <!-- 返回按钮 -->
            <div class="back" @click="handleBack">
              <el-icon><ArrowLeftBold /></el-icon>
            </div>

            <!-- 聊天 -->
            <div
              class="chat"
              :class="{ chatActive: naviBarIndex === 'chat' }"
              @click="handleChatActive"
            >
              <i class="iconfont icon-pinglun"></i>
            </div>

            <!-- 朋友 -->
            <div
              class="friend"
              :class="{ friendActive: naviBarIndex === 'friend' }"
              @click="handleFriendActive"
            >
              <i class="iconfont icon-friend"></i>
            </div>

            <!-- 关注 -->
            <div
              class="follow"
              :class="{ followActive: naviBarIndex === 'follow' }"
              @click="handleFollowActive"
            >
              <i class="iconfont icon-wodeguanzhu"></i>
            </div>
          </div>

          <div class="FixBottom">
            <!-- 设置 -->
            <div class="setting">
              <i class="iconfont icon-shezhi"></i>
            </div>

            <!-- 更多 -->
            <div class="more">
              <i class="iconfont icon-gengduo"></i>
            </div>

            <!-- 问题 -->
            <div class="question">
              <i class="iconfont icon-changjianwentixiangguanwenti"></i>
            </div>
          </div>
        </el-col>

        <!-- 列表栏 -->
        <el-col :span="5" class="column columnList">
          <!-- 搜索框 -->
          <div class="search">
            <el-input
              ref="searchInput"
              style="width: 210px"
              placeholder="搜索"
              :prefix-icon="Search"
              size="large"
              class="searchInput"
              @focus="handleSearch"
              @blur="handleBlur"
            >
              <template #suffix>
                <el-icon @click.stop="handleSearchClose" class="searchClose"
                  ><Close
                /></el-icon>
              </template>
            </el-input>
          </div>

          <!-- 列表视图 -->
          <div class="List">
            <!-- 聊天列表 -->
            <div v-if="naviBarIndex === 'chat'">
              <div v-if="!ifHaveChatList" class="listDefault">
                竟然没有一个人找你聊天吗
                <br />
                快去找人聊天吧！
              </div>

              <div v-for="item in chatList" :key="item.id" v-else>
                <chatListComponent :information="item"></chatListComponent>
              </div>
            </div>

            <!-- 朋友列表 -->
            <div v-if="naviBarIndex === 'friend'">
              <div v-if="!ifHaveFriendList" class="listDefault">
                帅到没朋友吗 有点意思
              </div>
              <div v-for="item in friendsList" :key="item.id" v-else>
                <chatListComponent :information="item"></chatListComponent>
              </div>
            </div>

            <!-- 关注列表 -->
            <div v-if="naviBarIndex === 'follow'">
              <div v-if="!ifHaveFollowList" class="listDefault">
                竟然一个关注的人都没有吗!
              </div>
              <div v-for="item in followList" :key="item.id" v-else>
                <chatListComponent :information="item"></chatListComponent>
              </div>
            </div>

            <!-- 搜索视图 -->
            <div class="searchView" v-if="ifSearchViewShow"></div>
          </div>
        </el-col>

        <!-- 视图栏 -->
        <el-col :span="18" class="column columnView">
          <div v-if="!ifHaveView" class="ViewDefault">
            <i class="iconfont icon-yinfu2"></i>
            <span>抖音·记录美好生活</span>
          </div>
          <div v-else>
            <chatView></chatView>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.outSpace {
  width: 100vw;
  height: 100vh;
  background-color: rgb(31, 32, 32);
}

/* flex */
.columnFix,
.FixTop,
.FixBottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

/* iconfint */
.iconfont {
  font-family: 'iconfont', sans-serif;
}

/* chatContainer */
.chatContainer {
  width: 1123px;
  height: 612px;
  overflow: hidden;
  background-color: rgb(22, 24, 35);
  border-radius: 10px;
  margin: 0 auto;
}
.column {
  height: 612px;
}

/* 导航栏 */
.columnFix {
  background: linear-gradient(
    to bottom,
    rgba(194, 235, 225, 0.5) 10%,
    rgb(238, 238, 240, 0.5) 25%,
    rgb(238, 238, 240, 0.5) 70%,
    rgb(227, 194, 222, 0.5) 85%
  ) !important;
  padding: 10px 0;
}

/* 返回按钮 */
.back {
  width: 36px;
  height: 36px;
  line-height: 36px;
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

/* 导航栏图标 */
.columnFix .iconfont {
  font-size: 25px;
  color: #ffffffd0;
}
.columnFix .iconfont:hover,
.chatActive .iconfont,
.friendActive .iconfont,
.followActive .iconfont {
  color: rgb(0, 102, 204);
  cursor: pointer;
}
.FixTop {
  height: 230px;
}
.chat,
.friend,
.follow {
  width: 37px;
  height: 37px;
  text-align: center;
  line-height: 37px;
  border-radius: 10px;
}
.chatActive,
.friendActive,
.followActive {
  background-color: #ffffff2a;
}

.FixBottom {
  height: 110px;
}

/* 列表栏 */
.columnList {
  background-color: #68666622;
}
/* 搜索框 */
.search {
  padding: 10px 10px;
}
:deep(.el-input__wrapper) {
  background-color: #ffffff1f;
  box-shadow: 0 0 0 0px;
}
:deep(.el-input__inner) {
  color: #fff;
  font-size: 15px;
}
:deep(.el-input__wrapper.is-focus) {
  outline: 1px solid rgb(0, 102, 204);
}
.searchView {
  height: 552px;
  overflow-y: scroll;
  scrollbar-width: none;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: rgb(33, 35, 44);
}
.searchClose:hover {
  cursor: pointer;
  color: #fff;
}
.listDefault {
  font-size: 17px;
  margin: 80% 0;
  color: #ffffff39;
  text-align: center;
  line-height: 40px;
}
.List {
  overflow-y: scroll;
  scrollbar-width: none;
  width: 100%;
  height: 552px;
  position: relative;
}

/* 视图栏 */
.columnView {
  font-size: 30px;
  font-weight: bold;
  color: #ffffff39;
}

.columnView .iconfont {
  font-size: 100px;
  color: #ffffff39;
}
.ViewDefault {
  margin: 25% auto;
  text-align: center;
  user-select: none;
}
</style>
