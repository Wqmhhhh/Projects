<script setup>
import chatListComponent from './components/chatListComponent.vue'
import chatView from './components/chatViews/chatView.vue'
import applyView from './components/chatViews/applyView.vue'
import readApply from './components/chatViews/readApply.vue'

import contextMenu from './components/contextMenu.vue'

import chatHisPopUp from './components/popUp/chatHis-PopUp.vue'
import settingBox from './components/popUp/settingBox.vue'

import { onMounted, onUnmounted, ref } from 'vue'

import { Search } from '@element-plus/icons-vue'
import { useShowFlags, useChatRoomInfo, useChatUserInfo, useSocketStore } from '@/stores'

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

  newFriActiveID,

  chatList,
  friendsList,
  newFriList,

  ifHaveChatList,
  ifHaveNewFriList,
  ifHaveFriendList,

  viewIndex,

  chatFriendInfo,
} = storeToRefs(chatStore)

// socketIO
const sockIO = useSocketStore()

// 导入接口
import { getAllApplications, getAllFriends, getHomeRelations } from '@/api/chat'

// 搜索
const search = ref()
const searchInput = ref('')

// 搜索视图是否显示
const ifSearchViewShow = ref(false)

// 聊天列表下拉框
const menuPosition = ref({ x: 0, y: 0 })
const activeMenuId = ref(null)

// 置顶聊天
const pinTop = () => {
  console.log('置顶聊天')

  activeMenuId.value = null
}

// 标记未读信息
const markAsNoRead = () => {
  console.log('标记未读聊天')

  activeMenuId.value = null
}

// 消息免打扰
const muted = () => {
  console.log('消息免打扰')

  activeMenuId.value = null
}

// 删除聊天
const deleteChat = () => {
  console.log('删除聊天')

  activeMenuId.value = null
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
  handleBlur()
  chatStore.changeFlag('chat')
}

// 获取好友列表
const handleFriendActive = async () => {
  ifSearchViewShow.value = false
  handleBlur()
  chatStore.changeFlag('friend')

  try {
    const res = await getAllFriends()
    console.log('获取好友列表', res)
    if (res.data.data.list) friendsList.value = [...res.data.data.list]
    if (friendsList.value.length > 0) {
      ifHaveFriendList.value = true
    }
  } catch (e) {
    console.log('获取好友列表失败', e)
  }
}

// 获取好友申请列表
const handleNewFriActive = async () => {
  const res = await getAllApplications()
  console.log('好友申请列表', res)
  if (res.data.data.list) newFriList.value = [...res.data.data.list]

  ifSearchViewShow.value = false
  handleBlur()
  chatStore.changeFlag('newFri')

  newFriActiveID.value = null
}

// 返回选择账号页面
const handleBack = () => {
  useChatUserInfo().clearSome()
  router.push('/chatSelect')
  useChatRoomInfo().clearAll()
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
  handleBlur()
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
const onRightClick = (e) => {
  // 判断是否为子元素
  let chatItem = null
  let target = e.target
  for (let i = 0; i < 5; i++) {
    if (target.hasAttribute('data-id') && target.hasAttribute) {
      chatItem = target
    }
    target = target.parentNode
  }

  if (!chatItem) {
    return
  }

  // 根据子元素状态修改menuItems的值

  // 传入position
  menuPosition.value = {
    x: e.clientX,
    y: e.clientY,
  }

  // 子元素的Id赋值
  activeMenuId.value = chatItem.getAttribute('data-id')
}

// 聊天记录列表左键显示对应聊天记录
const handleGetChatView = (e) => {
  // 判断是否为子元素
  let chatItem = null
  let target = e.target
  for (let i = 0; i < 5; i++) {
    if (target.hasAttribute('data-id') && target.hasAttribute) {
      chatItem = target
    }
    target = target.parentNode
  }

  if (!chatItem) {
    return
  }

  // TODO:获取消息
}

// 处理申请好友视图
const handleSendApply = () => {
  viewIndex.value = 3
  newFriActiveID.value = null
}

// 处理好友申请视图
const emitItem = ref()
const handleReadApply = (item) => {
  emitItem.value = item
  viewIndex.value = 4

  newFriActiveID.value = item.account_id_1
}

// 处理选择好友聊天
const handleChatWithFriend = (e) => {
  // 查找聊天列表中是否有该元素
  const index = chatList.value.findIndex((item) => item.relation_id === e.relation_id)
  if (index !== -1) {
    chatList.value.splice(index, 1)
  }
  chatList.value.unshift(e)

  // 跳转聊天视口
  viewIndex.value = 2
  handleChatActive()

  // 添加好友信息到当前正在聊天
  chatFriendInfo.value = e

  chatStore.chatHisList = []
  // 获取聊天记录
  chatStore.setChatListActive(e.friend_info.account_id, e.relation_id)
}

// 初始化
const initial = async () => {
  // 建立WebSocket
  sockIO.connect()

  // 获取首页聊天列表
  try {
    const res = await getHomeRelations()
    console.log('获取首页聊天列表', res)
    chatList.value = [...res.data.data.list]
    ifHaveChatList.value = true
  } catch (e) {
    console.log('获取首页聊天列表失败', e)
  }
}

onMounted(() => {
  initial()

  window.addEventListener('click', () => {
    // 聊天记录列表左键失焦下拉框消失
    activeMenuId.value = null
  })
})

onUnmounted(() => {
  sockIO.disconnect()
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
              :class="{ followActive: naviBarIndex === 'newFri' }"
              @click="handleNewFriActive"
            >
              <i class="iconfont icon-xindepengyou"></i>
            </div>
          </div>

          <div class="FixBottom">
            <!-- 设置 -->
            <div class="setting">
              <i class="iconfont icon-shezhi" @click="handleChangeUserInfor"></i>
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
                <el-icon @click.stop="handleSearchClose" class="searchClose"><Close /></el-icon>
              </template>
            </el-input>
          </div>

          <!-- 列表视图 -->
          <div class="List">
            <!-- 聊天列表 -->
            <div
              v-if="naviBarIndex === 'chat'"
              @contextmenu.prevent="onRightClick"
              @click="handleGetChatView"
            >
              <div v-if="!ifHaveChatList" class="listDefault">聊天记录为空</div>

              <div
                v-for="item in chatList"
                :key="item.friend_info.account_id"
                :data-id="item.friend_info.account_id"
                v-else
                @click="handleChatWithFriend(item)"
              >
                <chatListComponent :information="item.friend_info"></chatListComponent>
              </div>

              <!-- 下拉选项框 -->
              <contextMenu
                v-if="activeMenuId"
                :visible="Boolean(activeMenuId)"
                :items="menuItems"
                :position="menuPosition"
                @close="activeMenuId === null"
              ></contextMenu>
            </div>

            <!-- 朋友列表 -->
            <div v-if="naviBarIndex === 'friend'">
              <div v-if="!ifHaveFriendList" class="listDefault">没朋友吗？ 找呀找呀找朋友</div>

              <div
                v-for="item in friendsList"
                :key="item.friend_info.account_id"
                v-else
                @click="handleChatWithFriend(item)"
              >
                <chatListComponent :information="item.friend_info"></chatListComponent>
              </div>
            </div>

            <!-- 新朋友列表 -->
            <div v-if="naviBarIndex === 'newFri'">
              <!-- 顶部搜索好友 -->
              <div class="sendApply" @click="handleSendApply">
                <i class="iconfont icon-xindepengyou"></i>
                添加新朋友
              </div>

              <div v-if="!ifHaveNewFriList" class="listDefault">0个人找你交朋友</div>

              <div
                v-for="item in newFriList"
                :key="item.account_id_1"
                v-else
                @click="handleReadApply(item)"
              >
                <chatListComponent :information="item"></chatListComponent>
              </div>
            </div>

            <!-- 搜索视图 -->
            <div class="searchView" v-if="ifSearchViewShow"></div>
          </div>
        </el-col>

        <!-- 视图栏 -->
        <el-col :span="18" class="column columnView">
          <div v-if="viewIndex === 1" class="ViewDefault">
            <i class="iconfont icon-yinfu2"></i>
            <span>抖音·记录美好生活</span>
          </div>

          <div v-else-if="viewIndex === 2">
            <chatView></chatView>
          </div>

          <div v-else-if="viewIndex === 3">
            <applyView></applyView>
          </div>

          <div v-else-if="viewIndex === 4">
            <readApply :item="emitItem"></readApply>
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

/* 添加朋友 */
.sendApply {
  width: 100%;
  height: 70px;
  padding: 10px 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  user-select: none;
  font-size: 17px;
  background-color: rgba(22, 24, 35, 0.583);
  color: #ffffffda;
}
.sendApply .iconfont {
  font-size: 30px;
  margin-right: 5px;
}
.sendApply:hover {
  background-color: rgb(22, 24, 35);
  cursor: pointer;
}
</style>
