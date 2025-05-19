import { defineStore } from 'pinia'
import { ref } from 'vue'

// 列表信息
export const useChatList = defineStore('useChatList', () => {
  // 导航栏激活图标
  const naviBarIndex = ref('chat')

  // 列表栏是否存在视图
  const ifHaveList = ref(false)

  // 聊天列表
  const chatList = ref([
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
      id: 2,
    },
  ])

  // 聊天列表激活选项
  const chatListActiveIndex = ref()

  // 好友列表
  const friendsList = ref([
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 2,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 2,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 2,
    },
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '13:53',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: true,
      id: 2,
    },
  ])

  // 关注列表
  const followList = ref([
    {
      pic: '../../../assets/image.png',
      name: '这是一个标题1111111111111111111',
      time: '12:23',
      msg: '啊啊地哦啊囧1111111111111111111111111111',
      ifMuted: false,
      id: 1,
    },
  ])

  // 视图栏是否存在视图
  const ifHaveView = ref(false)

  // 若列表非空则ifHaveList为true
  const changeFlag = () => {
    if (naviBarIndex.value === 'chat' && chatList.value.length !== 0) {
      ifHaveList.value = true
    } else if (
      naviBarIndex.value === 'friend' &&
      friendsList.value.length !== 0
    ) {
      ifHaveList.value = true
    } else if (
      naviBarIndex.value === 'follow' &&
      followList.value.length !== 0
    ) {
      ifHaveList.value = true
    } else {
      ifHaveList.value = false
    }
  }

  return {
    chatList,
    friendsList,
    followList,
    chatListActiveIndex,
    ifHaveList,
    ifHaveView,
    naviBarIndex,
    changeFlag,
  }
})
