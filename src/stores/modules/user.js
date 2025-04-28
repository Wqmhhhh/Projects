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
      updatedTime: '',
      totalLikeMeCounts: 0,
    })

    const token = ref('')

    const setUserInfo = (data) => {
      user.value.bgImg = data.bgImg
      user.value.description = data.description
      user.value.face = data.face
      user.value.mobile = data.mobile
      user.value.nickname = data.nickname
      user.value.myFollowsCounts = data.myFollowsCounts || 0
      user.value.myFansCounts = data.myFansCounts || 0
      user.value.id = data.id
      user.value.updatedTime = data.updatedTime
      user.value.totalLikeMeCounts = data.totalLikeMeCounts
      token.value = data.token
    }

    return {
      user,
      token,
      setUserInfo,
    }
  },
  {
    persist: true,
  },
)
