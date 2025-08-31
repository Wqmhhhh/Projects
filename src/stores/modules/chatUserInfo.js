import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatUserInfo = defineStore(
  'ChatUser',
  () => {
    const emailToken = ref()

    const accountToken = ref()

    const accountList = ref([])
    const ifHaveAccount = ref(false)

    const id = ref()
    const email = ref()
    const name = ref()
    const gender = ref()
    const signature = ref()
    const avatar = ref()

    const clearAll = () => {
      accountList.value = []

      emailToken.value = ''
      accountToken.value = ''
      id.value = ''
      email.value = ''
      name.value = ''
      gender.value = ''
      avatar.value = ''

      ifHaveAccount.value = false
    }

    const clearSome = () => {
      accountToken.value = ''
      id.value = ''
      name.value = ''
      gender.value = ''
      avatar.value = ''
    }

    return {
      accountList,

      emailToken,
      accountToken,
      id,
      email,
      name,
      gender,
      signature,
      avatar,

      ifHaveAccount,

      clearAll,
      clearSome,
    }
  },
  { persist: true },
)
