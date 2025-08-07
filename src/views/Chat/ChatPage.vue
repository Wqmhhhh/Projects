<script setup>
import chatListComponent from './components/chatListComponent.vue'
import chatView from './components/chatView.vue'
import contextMenu from './components/contextMenu.vue'
import chatHisPopUp from './components/popUp/chatHis-PopUp.vue'
import settingBox from './components/popUp/settingBox.vue'

import { onMounted, ref } from 'vue'
// import { ElMessageBox } from 'element-plus'

import { Search, Close } from '@element-plus/icons-vue'
import { useChatRoomInfo } from '@/stores/modules/chatListInfo'
import { useShowFlags } from '@/stores'

import { storeToRefs } from 'pinia'
import router from '@/router'
import { ElMessage } from 'element-plus'

// flagStore
const flagStore = useShowFlags()
const { ifSettingShow } = storeToRefs(flagStore)

// 聊天store
const chatStore = useChatRoomInfo()
const {
  naviBarIndex,
  chatList,
  friendsList,
  followList,
  fansList,
  ifHaveChatList,
  ifHaveFriendList,
  ifHaveFollowList,
  ifHaveFansList,
  ifHaveView,
} = storeToRefs(chatStore)

// 搜索
const search = ref()
const searchInput = ref('')

// 搜索视图是否显示
const ifSearchViewShow = ref(false)

// 置顶聊天
const pinTop = () => {
  console.log('置顶聊天')
}

// 标记未读信息
const markAsNoRead = () => {
  console.log('标记未读聊天')
}

// 消息免打扰
const muted = () => {
  console.log('消息免打扰')
}

// 删除聊天
const deleteChat = () => {
  console.log('删除聊天')
}

// 右键操作
const menuItems = [
  {
    label: '置顶',
    action: pinTop,
  },
  {
    label: '标为未读',
    action: markAsNoRead,
  },
  {
    label: '消息免打扰',
    action: muted,
  },
  {
    label: '删除',
    action: deleteChat,
  },
]

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
const handleFansActive = () => {
  ifSearchViewShow.value = false
  chatStore.changeFlag('fans')
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
    search.value.blur()
  } else {
    search.value.focus()
  }
}

const handleSearchClose = () => {
  ifSearchViewShow.value = false
  search.value.blur()
}

// 点击设置显示编辑信息
const handleChangeUserInfor = () => {
  ifSettingShow.value = true
  // location.reload()
}

// 更多、问题显示
const handleMore = () => {
  ElMessage('什么都没有！惊不惊喜！刺不刺激')
}
const handleQues = () => {
  ElMessage('小孩子家家哪来那么多问题，出门左转找AI')
}

// 右键点击聊天列表显示下拉框进行操作
const onRightClick = () => {
  console.log('点击右键')
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

            <!-- 新的朋友 -->
            <div
              class="follow"
              :class="{ followActive: naviBarIndex === 'follow' }"
              @click="handleFollowActive"
            >
              <i class="iconfont icon-xindepengyou"></i>
            </div>
          </div>

          <div class="FixBottom">
            <!-- 设置 -->
            <div class="setting">
              <i
                class="iconfont icon-shezhi"
                @click="handleChangeUserInfor"
              ></i>
            </div>

            <!-- 更多 -->
            <div class="more">
              <i class="iconfont icon-gengduo" @click="handleMore"></i>
            </div>

            <!-- 问题 -->
            <div class="question" @click="handleQues">
              <i class="iconfont icon-changjianwentixiangguanwenti"></i>
            </div>
          </div>
        </el-col>

        <!-- 列表栏 -->
        <el-col :span="5" class="column columnList">
          <!-- 搜索框 -->
          <div class="search">
            <el-input
              ref="search"
              style="width: 210px"
              placeholder="搜索"
              :prefix-icon="Search"
              size="large"
              class="searchInput"
              @focus="handleSearch"
              @blur="handleBlur"
              v-model="searchInput"
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
                聊天记录为空
                <br />
                快去找人聊天吧！
              </div>

              <div v-for="item in chatList" :key="item.id" v-else>
                <contextMenu :items="menuItems">
                  <chatListComponent
                    :information="item"
                    @contextmenu.prevent="onRightClick"
                  ></chatListComponent
                ></contextMenu>
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

            <!-- 粉丝列表 -->
            <div v-if="naviBarIndex === 'fans'">
              <div v-if="!ifHaveFansList" class="listDefault">
                0个人是你的粉丝
              </div>
              <div v-for="item in fansList" :key="item.id" v-else>
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

      <!-- 聊天记录弹框 -->
      <chatHis-PopUp></chatHis-PopUp>

      <!-- 设置弹框 -->
      <settingBox></settingBox>
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
.followActive .iconfont,
.fansActive .iconfont {
  color: rgb(0, 102, 204);
  cursor: pointer;
}
.FixTop {
  height: 230px;
}
.chat,
.friend,
.follow,
.fans {
  width: 37px;
  height: 37px;
  text-align: center;
  line-height: 37px;
  border-radius: 10px;
}
.chatActive,
.friendActive,
.followActive,
.fansActive {
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
