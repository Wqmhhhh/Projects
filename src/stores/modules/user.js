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
        if (res.data.code !== 200) {
          return false
        }
        authorization.value = res.data.data.authorization
        refreshToken.value = res.data.data.refreshToken
        return true
      } catch (e) {
        console.log('刷新token失败', e)
        ElMessage.error('系统错误')
        return false
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
