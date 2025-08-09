import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFlagStore = defineStore('flagStore', () => {
  const ifLogin = ref(false)

  // 一面是否报名
  const ifRegister = ref(false)

  // 二面是否报名
  const ifSeconRegister = ref(false)

  // 当前进度：报名1 一面过2 二面3 二面过4
  const progress = ref(1)

  return {
    ifLogin,
    ifRegister,
    ifSeconRegister,
    progress,
  }
})
