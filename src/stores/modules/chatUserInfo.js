import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatUserInfo = defineStore('ChatUser', () => {
  const emailToken = ref()

  const accountToken = ref()

  const id = ref('111111111111')
  const email = ref('3105324129@qq.com')
  const name = ref('乌漆抹黑嘿嘿嘿')
  const gender = ref('沃尔玛购物袋')
  const signature = ref('地球online的一名NPC')
  const avatar = ref()

  return {
    emailToken,
    accountToken,
    id,
    email,
    name,
    gender,
    signature,
    avatar,
  }
})
