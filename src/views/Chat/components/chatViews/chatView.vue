<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import youBubble from '../bubbles/youBubble.vue'
import myBubble from '../bubbles/myBubble.vue'

import { useChatRoomInfo } from '@/stores'
import { storeToRefs } from 'pinia'
import { useShowFlags, useSocketStore } from '@/stores'

const flagStore = useShowFlags()
const { ifChatHisShow } = storeToRefs(flagStore)

const socketIO = useSocketStore()

// 导入接口
import { updateMuteStatus, updateTopStatus, updateRemarkName } from '@/api/chat'

// emoji库
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'
import { ElMessage } from 'element-plus'

const chatRoom = useChatRoomInfo()
const { chatHisList, chatFriendInfo } = storeToRefs(chatRoom)

const textButtonActive = ref(false)
const textInput = ref('')
const textContainer = ref()

const chatList = ref()
const emojiPicker = ref()

const ifDrawerShow = ref(false)
const drawerRef = ref()
const moreRef = ref()

const ifMuted = ref(false)
const ifPinTop = ref(false)

// 是否编辑昵称
const ifEditRemarkName = ref(false)
const editRemarkName = ref('')

// emoji
const emojiOpen = ref(false)
const emojiIndex = computed(() => {
  return new EmojiIndex(data)
})

// 国际化配置
const emojiI18n = {
  search: 'Search',
  notfound: 'No Emoji Found',
  categories: {
    search: '',
    recent: '',
    smileys: '',
    people: '',
    nature: '',
    foods: '',
    activity: '',
    places: '',
    objects: '',
    symbols: '',
    flags: '',
    custom: '',
    joy: '',
  },
}

// 处理表情选中事件
const handleEmojiSelect = (emoji) => {
  textInput.value += emoji.native // 将表情插入到编辑器内容中
  emojiOpen.value = false
  handleInput()
}

// 点击显示emoji选择框
const handleEmoji = () => {
  emojiOpen.value = true
  emojiPicker.value.focus()
}

// 文字输入
const handleInput = () => {
  if (textInput.value.length > 0) {
    textButtonActive.value = true
    textContainer.value.focus()
  } else {
    textButtonActive.value = false
  }
}

// 发送信息
const handleSend = () => {
  // 去除首尾换行符
  textInput.value = textInput.value.trim()
  if (textInput.value.length === 0) {
    return
  }

  // 调用接口发消息
  socketIO.sendMsg(chatFriendInfo.value.relation_id, btoa(encodeURIComponent(textInput.value)))

  // 发送后清空对话框
  textInput.value = ''
  textButtonActive.value = false
}

// 处理换行符
const handleEnter = (e) => {
  // 单独按下 Enter 键 : 发送消息
  if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
    e.preventDefault() // 阻止默认的换行行为
    handleSend()
  }
  // Ctrl+Enter 或 Command+Enter (Mac) - 换行
  else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    // 允许默认的换行行为
    textInput.value += '\n'
  }
  // Shift+Enter - 换行
  else if (e.shiftKey && e.key === 'Enter') {
    // 允许默认的换行行为
    textInput.value += '\n'
  }
}

// 发送图片
const onUploadImage = () => {}

// 发送文件
const onUploadFile = () => {}

// 处理聊天界面抽屉开闭
const handleChatViewDrawer = () => {
  ifDrawerShow.value = !ifDrawerShow.value
}

// 处理修改备注
const handleEditBegin = () => {
  ifEditRemarkName.value = true
  editRemarkName.value = chatFriendInfo.value.nick_name || chatFriendInfo.value.friend_info.name
}

const handleEditFinish = async () => {
  if (editRemarkName.value.length === 0) {
    ElMessage.error('备注不能为空！')
    ifEditRemarkName.value = false
    return
  }

  try {
    const res = await updateRemarkName(chatFriendInfo.value.relation_id, editRemarkName.value)
    console.log('修改备注返回值', res)

    chatFriendInfo.value.nick_name = editRemarkName.value
    ifEditRemarkName.value = false

    ElMessage.success('修改备注成功！')
  } catch (e) {
    console.log('修改备注错误', e)
  }
}

// 判断鼠标点击是否处在抽屉区域内
const onClickOutside = (e) => {
  // 点击的是 更多，不处理直接返回
  if (moreRef.value && moreRef.value.contains(e.target)) {
    return
  }
  // 点击非抽屉区域抽屉收回
  if (ifDrawerShow.value && drawerRef.value && !drawerRef.value.contains(e.target)) {
    ifDrawerShow.value = false
  }
}

// 抽屉是否显示
watch(ifDrawerShow, () => {
  if (ifDrawerShow.value) {
    document.addEventListener('mousedown', onClickOutside)
  } else {
    document.removeEventListener('mousedown', onClickOutside)
  }
})

// 免打扰
watch(ifMuted, async () => {
  try {
    const res = await updateMuteStatus(chatFriendInfo.value.relation_id, ifMuted.value)
    console.log('设置免打扰返回值', res)
  } catch (e) {
    console.log('设置免打扰失败', e)
  }
})

// 置顶
watch(ifPinTop, async () => {
  try {
    const res = await updateTopStatus(chatFriendInfo.value.relation_id, ifPinTop.value)
    console.log('设置置顶返回值', res)
  } catch (e) {
    console.log('设置置顶失败', e)
  }
})

// 监听消息列表更新
watch(
  [chatHisList],
  () => {
    nextTick(() => {
      console.log('触发watch,滚动', chatList.value)
      if (chatList.value) {
        chatList.value.scrollTop = chatList.value.scrollHeight
      } else {
        console.log('chatList容器未正确绑定')
      }
    })
  },
  { immediate: true, deep: true }
)

onMounted(() => {
  nextTick(() => {
    if (chatList.value) {
      chatList.value.scrollTop = chatList.value.scrollHeight
    } else {
      console.log('聊天记录容器绑定错误')
    }
  })
  textContainer.value.focus()
})
</script>

<template>
  <div class="chatContainer">
    <!-- 顶部名称 -->
    <div class="fixTop">
      <!-- 名称 -->
      <div>
        {{ chatFriendInfo.nick_name || chatFriendInfo.friend_info.name }}
      </div>

      <!-- 更多 -->
      <div @click="handleChatViewDrawer" ref="moreRef">
        <i class="iconfont icon-gengduo1"></i>
      </div>
    </div>

    <!-- 聊天内容 -->
    <div class="chatList" ref="chatList">
      <div v-for="item in chatHisList" :key="item.id">
        <!-- 对方气泡 -->
        <youBubble
          v-if="item.type == 2"
          :type="item.msg_type"
          :imgSrc="item.image"
          :text="item.msg_content"
          :file="[item.fileName, item.fileType, item.fileSize]"
          :avatar="item.account_avatar"
        >
        </youBubble>

        <!-- 己方气泡 -->
        <myBubble
          v-else-if="item.type == 1"
          :type="item.msg_type"
          :imgSrc="item.image"
          :text="item.msg_content"
          :file="[item.fileName, item.fileType, item.fileSize]"
          :avatar="item.account_avatar"
        >
        </myBubble>

        <!-- TODO：区分一下自己和对方撤回的消息 -->
        <!-- <recallMsg></recallMsg> -->
      </div>
    </div>

    <!-- 输入框 -->
    <div class="inputBox">
      <div class="menu">
        <span>
          <i class="iconfont icon-biaoqing" @click="handleEmoji"></i>
          <Picker
            ref="emojiPicker"
            class="emojiPicker"
            :data="emojiIndex"
            :emojiSize="23"
            :showPreview="false"
            :infiniteScroll="false"
            :i18n="emojiI18n"
            set="google"
            @select="handleEmojiSelect"
            :style="{ width: '350px', height: '300px' }"
            v-show="emojiOpen"
            @blur="emojiOpen = false"
          />
        </span>

        <el-upload
          class=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadImage"
          name="image"
        >
          <i class="iconfont icon-tupian" @click="handleImg"></i>
        </el-upload>

        <el-upload
          class=""
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
          name="file"
        >
          <i class="iconfont icon-wenjian" @click="handleFile"></i>
        </el-upload>
      </div>

      <div class="text">
        <!-- 有输入后可发送 -->
        <textarea
          ref="textContainer"
          name=""
          id=""
          cols="50"
          rows="6"
          @input="handleInput"
          v-model="textInput"
          @keydown="handleEnter"
        ></textarea>
        <button
          class="textButton"
          :class="{ textButtonActive: textButtonActive }"
          @click="handleSend"
        >
          发送
        </button>
      </div>
    </div>

    <!-- 抽屉 -->
    <div class="drawer" :class="{ drawerShow: ifDrawerShow }" ref="drawerRef">
      <!-- 头像及名称 -->
      <div class="drawerTop">
        <div class="drawerFace">
          <img :src="chatFriendInfo.friend_info.avatar" alt="" />
        </div>

        <div class="drawerName">
          <!-- 备注名称 -->
          <div v-if="ifEditRemarkName">
            <input type="text" v-model="editRemarkName" @keyup.enter="handleEditFinish" />
          </div>
          <div class="remarkName" v-else @click="handleEditBegin">
            {{ chatFriendInfo.nick_name || chatFriendInfo.friend_info.name }}
          </div>

          <!-- 昵称 -->
          <div class="nickname">昵称：{{ chatFriendInfo.friend_info.name }}</div>
          <!-- 抖音号 -->
          <div class="douyinId">抖音号：{{ chatFriendInfo.friend_info.account_id }}</div>
        </div>
      </div>

      <!-- 查找聊天记录 -->
      <div class="drawerFindChatHis" @click="ifChatHisShow = true">
        <div>查找聊天记录</div>
        <div>
          <i class="iconfont icon-jinrujiantou"></i>
        </div>
      </div>

      <!-- 消息免打扰 -->
      <div class="chatMuted">
        <div>消息免打扰</div>
        <el-switch v-model="ifMuted"></el-switch>
      </div>

      <!-- 置顶聊天 -->
      <div>
        <div>置顶聊天</div>
        <el-switch v-model="ifPinTop"></el-switch>
      </div>

      <!-- 清空聊天记录 -->
      <div>清空聊天记录</div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.chatContainer {
  width: 842px;
  position: relative;
}

/* 顶部名称 */
.fixTop {
  width: 842px;
  height: 10%;
  font-size: 19px;
  font-weight: normal;
  display: flex;
  align-items: end;
  justify-content: space-between;
  color: #ffffffc0;
  border-bottom: 1px solid #ffffff1c;
  padding: 10px 20px;
}

/* 文字条 */
.chatList {
  width: 842px;
  height: 337px;
  overflow-y: scroll;
}

/* 输入框 */
.inputBox {
  width: 842px;
  height: 35%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ffffff1c;
}
/* 菜单栏 */
.menu {
  height: 35px;
  line-height: 35px;
  position: relative;
  display: flex;
  justify-content: start;
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 23px;
  margin: 0 10px;
  color: #ffffff80;
  font-weight: 100;
}
.iconfont:hover {
  color: #ffffffc4;
  cursor: pointer;
}
/* 文本域 */
textarea {
  border: 0;
  font-size: 16px;
  width: 99%;
  margin: 0 auto;
  background-color: transparent;
  resize: none;
  outline: none;
  padding: 10px;
  color: #ffffffde;
  font-family: 'SimHei', '黑体', sans-serif;
}
.textButton {
  position: relative;
  width: 90px;
  height: 30px;
  line-height: 30px;
  border: 0;
  border-radius: 5px;
  top: -20px;
  left: 87%;
  background-color: rgba(0, 102, 204);
  color: #ffffff96;
  font-size: 16px;
}
.textButtonActive {
  color: #fff;
}

/* 滚动条样式 */
textarea::-webkit-scrollbar,
.chatList::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
textarea::-webkit-scrollbar-thumb,
.chatList::-webkit-scrollbar-thumb {
  background-color: #8888885e; /* 滑块颜色 */
  border-radius: 12px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
textarea::-webkit-scrollbar-thumb:hover,
.chatList::-webkit-scrollbar-thumb:hover {
  background-color: #a1a0a0bd; /* 悬停时滑块颜色 */
  cursor: pointer;
}

/* 滚动条轨道样式 */
textarea::-webkit-scrollbar-track,
.chatList::-webkit-scrollbar-track {
  background-color: #f5f5f50b; /* 轨道颜色 */
  border-radius: 12px; /* 轨道圆角 */
}

/* emoji */
.emojiPicker {
  position: absolute;
  top: -300px;
  left: 10px;
}

/* 抽屉 */
.drawer {
  background-color: rgba(33, 35, 44);
  border-left: 1px solid rgba(78, 77, 77, 0.59);
  position: absolute;
  width: 25%;
  height: 90%;
  right: 0;
  top: 10%;
  transition: all;
  transition-duration: 0.3s;
}
.drawerShow {
  right: 25%;
}
/* 抽屉顶部头像名称 */
.drawerTop {
  height: 20%;
  padding: 15px;
  display: flex;
  user-select: none;
  /* background-color: #fff; */
}
.drawerTop .drawerFace {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 10px;
  background-color: #ffffff30;
  margin-right: 10px;
}
.drawerFace img {
  width: 100%;
  height: 100%;
}
.drawerName {
  width: 170px;
}
.drawerName > div:first-child,
.drawerName > div:nth-child(2) {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.drawerName .remarkName {
  font-size: 17px;
  color: #d6d3d3;
  margin-bottom: 5px;
}
.drawerName input {
  font-size: 17px;
  margin-bottom: 5px;
}
.drawerName div:not(:first-child) {
  font-size: 13px;
  font-weight: 400;
  color: #d6d3d3b7;
}
.drawer > div:not(:first-child) {
  height: 10%;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  font-weight: 400;
  color: #c6c3c3;
}
.drawer > div:nth-child(2):hover {
  background-color: #ffffff2d;
  cursor: pointer;
}
.drawer > div:last-child {
  justify-content: center;
  color: rgb(238, 75, 75);
}
.drawer > div:last-child:hover {
  cursor: pointer;
  color: rgba(238, 75, 75, 0.746);
}
</style>
