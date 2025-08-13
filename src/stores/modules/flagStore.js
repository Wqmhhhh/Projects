import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlagStore = defineStore(
  'flagStore',
  () => {
    const ifLogin = ref(false)

    // 当前进度：未报名0 已报名1 一面没过1 一面过2 二面没过2 二面过3
    // 未报名0 报名1 一面2 二面3 通过4
    const progress = ref(0)

    const registerInfo = ref({})

    return {
      ifLogin,
      progress,
      registerInfo,
    }
  },
  {
    persist: true,
  },
)
