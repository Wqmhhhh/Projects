import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoServive } from '@/api/user'

// 用户模块
export const useUserStore = defineStore('big-user', () => {
  const token = ref('')
  const setToken = (newToken) => {
    token.value = newToken
  }
  const removeToken = () => {
    token.value = ''
  }
  const user=ref({})
  const getUser=async()=>{
    const res=await userGetInfoServive()
    user.value=res.data.data
  }

  const setUser=(obj)=>{
    user.value=obj
  }

  return {
    token,
    setToken,
    removeToken,
    user,
    getUser,
    setUser
  }
},{
  persist:true
})
