import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getNoticeListService } from '@/api/comment'
import { useUserStore } from './user'

// Tab栏通知信息列表
export const useNoticeList = defineStore('NoticeList', () => {
  // 通知信息
  const NoticeList = ref([])
  const noticePage = ref(0)

  // 私信列表：数据暂无
  // const MessageList = ref()

  const getNoticeList = async (pageSize) => {
    const res = await getNoticeListService(
      useUserStore().user.id,
      noticePage.value,
      pageSize,
    )
    console.log('获取通知列表返回值：', res)

    if (res.data.data) {
      NoticeList.value.push(...res.data.data)
      noticePage.value++
    }
  }

  return {
    NoticeList,
    // MessageList,

    noticePage,

    getNoticeList,
  }
})
