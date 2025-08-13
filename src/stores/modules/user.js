import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userRefreshToken } from '@/api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const authorization = ref('')
    const refreshToken = ref('')

    const refresh = async () => {
      try {
        const res = await userRefreshToken()
        console.log('刷新token', res)
        authorization.value = res.data.data.authorization
        refreshToken.value = res.data.data.refreshToken
      } catch (e) {
        console.log('刷新token失败', e)
        ElMessage.error('系统错误')
      }
    }

    return {
      authorization,
      refreshToken,

      refresh,
    }
  },
  {
    persist: true,
  },
)
