import { defineStore } from 'pinia'
import { ref } from 'vue'

// Tab栏通知信息列表
export const useNoticeList = defineStore('NoticeList', () => {
  // 通知信息
  const NoticeList = ref()

  // 私信列表：数据暂无
  // const MessageList = ref()

  return {
    NoticeList,
    // MessageList,
  }
})
