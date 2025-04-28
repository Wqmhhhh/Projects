import { defineStore } from 'pinia'
import { ref } from 'vue'

// 控制是否显示的flags
export const useShowFlags = defineStore(
  'showFlags',
  () => {
    // 登录弹框
    const ifLoginShow = ref(true)

    // 编辑弹框
    const ifEditShow = ref(false)

    // 登录标志
    const ifLogin = ref(false)

    // 是否自动登录
    const ifAutoLogin = ref(false)

    // 是否全屏
    const ifFullScreen = ref(false)

    // 是否展示投稿页面
    const ifUpLoadWorks = ref(true)

    // 顶部Tab栏是否显示返回按钮：跳转搜索页后显示
    const ifSearch = ref(false)

    return {
      ifEditShow,
      ifLoginShow,
      ifLogin,
      ifAutoLogin,
      ifFullScreen,
      ifUpLoadWorks,
      ifSearch,
    }
  },
  {
    persist: true,
  },
)
