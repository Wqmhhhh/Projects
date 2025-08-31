import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMessagesBefore } from '@/api/chat'
import { useChatUserInfo } from './chatUserInfo'

// 列表信息
export const useChatRoomInfo = defineStore('useChatList', () => {
  // 导航栏激活图标
  const naviBarIndex = ref('chat')

  // 列表栏是否存在视图
  const ifHaveChatList = ref(false)
  const ifHaveFriendList = ref(false)
  const ifHaveNewFriList = ref(false)

  // 视图栏显示 1：默认视图 2：聊天视图 3：申请好友（发送）视图 4：申请好友视图
  const viewIndex = ref(1)

  // 聊天列表激活选项
  const chatListActiveID = ref()

  // 新朋友列表激活
  const newFriActiveID = ref()

  // 聊天好友信息
  const chatFriendInfo = ref({})

  // 聊天列表
  const chatList = ref([
    // {
    //   pic: '../../../assets/image.png',
    //   name: '这是一个标题1111111111111111111',
    //   time: '13:53',
    //   msg: '啊啊地哦啊囧1111111111111111111111111111',
    //   ifMuted: false,
    //   id: 2,
    // },
  ])

  // 好友列表
  const friendsList = ref([])

  // 新朋友
  const newFriList = ref([])

  // 聊天记录列表
  const chatHisList = ref([])

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

    if (naviBarIndex.value === 'newFri' && newFriList.value.length !== 0) {
      ifHaveNewFriList.value = true
    } else {
      ifHaveNewFriList.value = false
    }
  }

  // 设置聊天列表激活选项
  const setChatListActive = async (accountid, id, page = 1) => {
    chatListActiveID.value = accountid

    const currentTime = Date.now()

    // 调用请求聊天接口请求数据
    try {
      const res = await getMessagesBefore(id, currentTime, page, 30)
      console.log('获取聊天记录返回值', res)

      let decodedList = res.data.data.list.map((item) => {
        const type = item.account_id === useChatUserInfo().id ? 1 : 2

        return {
          ...item, // 保留其他字段
          msg_content: decodeURIComponent(item.msg_content), // 解码消息内容
          type, // 聊天气泡归属：1自己2对方
        }
      })

      decodedList.reverse()

      chatHisList.value.unshift(...decodedList)
    } catch (e) {
      console.log('获取聊天记录失败', e)
    }
  }

  // 添加聊天记录
  const addChatHis = (e) => {
    e.msg_content = decodeURIComponent(e.msg_content)
    e['type'] = e.account_id === useChatUserInfo().id ? 1 : 2

    chatHisList.value.push(e)
  }

  // 撤回聊天记录

  // 删除聊天记录

  const clearAll = () => {
    chatFriendInfo.value = {}
    chatList.value = {}
    friendsList.value = {}
    newFriList.value = {}
    chatHisList.value = {}

    chatListActiveID.value = ''
    newFriActiveID.value = ''

    ifHaveChatList.value = false
    ifHaveNewFriList.value = false
    ifHaveFriendList.value = false
  }

  return {
    chatFriendInfo,

    chatList,
    friendsList,
    newFriList,
    chatHisList,

    chatListActiveID,
    newFriActiveID,

    ifHaveChatList,
    ifHaveNewFriList,
    ifHaveFriendList,

    viewIndex,

    naviBarIndex,

    changeFlag,
    setChatListActive,
    addChatHis,

    clearAll,
  }
})
