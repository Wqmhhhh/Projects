import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块
export const useUserStore = defineStore(
  'douyinUser',
  () => {
    // 获取用户信息
    const user = ref({})

    // 是否开启自动登录自动登录
    const autoLogin = ref(false)

    // 登录弹框是否显示
    const LogindialogVisible = ref(true)

    // 编辑资料弹框是否显示
    const ChangeInforDialogVisible = ref(false)

    return {
      user,
      autoLogin,
      ChangeInforDialogVisible,
      LogindialogVisible,
    }
  },
  {
    persist: true,
  },
)
