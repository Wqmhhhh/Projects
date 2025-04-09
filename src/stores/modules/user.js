import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'User',
  () => {
    // 获取用户信息
    const user = ref({
      name: '乌漆抹黑嘿嘿嘿',
      followNum: 10,
      fansNum: 6,
      douyinId: '11111111111111111',
      ProFileSrc: '@/assets/image.ico',
    })

    const token = ref()

    return {
      user,
      token,
    }
  },
  {
    persist: true,
  },
)
