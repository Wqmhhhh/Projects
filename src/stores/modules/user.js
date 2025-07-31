import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const token = ref('')
  const userName = ref('')

  return {
    token,
    userName,
  }
})
