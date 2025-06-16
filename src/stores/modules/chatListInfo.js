import { defineStore } from 'pinia'
import { ref } from 'vue'

// 列表信息
export const useChatList = defineStore('useChatList', () => {
  // 导航栏激活图标
  const naviBarIndex = ref('chat')

  // 列表栏是否存在视图
  const ifHaveChatList = ref(false)
  const ifHaveFriendList = ref(false)
  const ifHaveFollowList = ref(false)

  // 视图栏是否存在视图
  const ifHaveView = ref(true)
  // 聊天列表激活选项
  const chatListActiveIndex = ref()

  // 聊天列表
  const chatList = ref([
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: false,
      id: 2,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '12:23',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: false,
      id: 1,
    },

    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 3,
    },

    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 4,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 5,
    },
  ])

  // 好友列表
  const friendsList = ref([
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      id: 1,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      id: 2,
    },
  ])

  // 关注列表
  const followList = ref([
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      id: 1,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      id: 2,
    },
  ])

  // 设置列表默认显示
  const changeFlag = (index) => {
    naviBarIndex.value = index
    if (naviBarIndex.value === 'chat' && chatList.value.length !== 0) {
      ifHaveChatList.value = true
    } else {
      ifHaveChatList.value = false
    }

    if (naviBarIndex.value === 'friend' && friendsList.value.length !== 0) {
      ifHaveFriendList.value = true
    } else {
      ifHaveFriendList.value = false
    }

    if (naviBarIndex.value === 'follow' && followList.value.length !== 0) {
      ifHaveFollowList.value = true
    } else {
      ifHaveFollowList.value = false
    }
  }

  // 设置聊天列表激活选项
  const setChatListActiveIndex = (id) => {
    chatListActiveIndex.value = id

    // 调用接口请求数据
  }

  return {
    chatList,
    friendsList,
    followList,
    chatListActiveIndex,
    ifHaveChatList,
    ifHaveFollowList,
    ifHaveFriendList,
    ifHaveView,
    naviBarIndex,

    changeFlag,
    setChatListActiveIndex,
  }
})
