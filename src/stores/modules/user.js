import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'User',
  () => {
    // 用户信息
    const user = ref({
      nickname: '',
      myFollowsCounts: 0,
      myFansCounts: 0,
      id: '',
      face: '',
      mobile: '',
      description: '',
      bgImg: '',
    })

    const token = ref('')

    return {
      user,
      token,
    }
  },
  {
    persist: true,
  },
)
