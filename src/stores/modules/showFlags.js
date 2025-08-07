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
    const ifUpLoadWorks = ref(false)

    // 顶部Tab栏是否显示返回按钮：跳转搜索页后显示
    const ifSearch = ref(false)

    // 聊天界面登录弹框是否显示
    const ifChatLoginShow = ref(true)

    // 聊天历史弹框是否显示
    const ifChatHisShow = ref(false)

    // 聊天界面设置弹框是否打开
    const ifSettingShow = ref(false)

    return {
      ifEditShow,
      ifLoginShow,
      ifLogin,
      ifAutoLogin,
      ifFullScreen,
      ifUpLoadWorks,
      ifSearch,

      ifChatLoginShow,
      ifChatHisShow,
      ifSettingShow,
    }
  },
  {
    persist: true,
  },
)
