<script setup>
import { createApplication, getAllApplications } from '@/api/chat'

// 导入库
import { useChatRoomInfo } from '@/stores'
const useChatRoom = useChatRoomInfo()
const { newFriList } = storeToRefs(useChatRoom)

import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const msg = ref('')
const ID = ref('')

const handleSendApply = async () => {
  if (!msg.value || !ID.value) {
    ElMessage.warning('填写完整内容')
  }

  try {
    const res1 = await createApplication(Number(ID.value), msg.value)
    console.log('发送好友申请', res1)

    ElMessage.success('好友申请发送成功！')

    ID.value = ''
    msg.value = ''

    // 再次获取申请消息列表
    const res = await getAllApplications()
    console.log('好友申请列表', res)
    newFriList.value = [...res.data.data.list]
  } catch (e) {
    console.log('好友申请发送失败', e)
    ElMessage.error('好友申请发送失败，请稍后再试')
  }
}
</script>

<template>
  <div class="container">
    <div class="top">
      <span>申请内容：</span>
      <div>
        <input type="text" name="" id="" v-model="msg" />
        <span></span>
      </div>

      <span>ID：</span>
      <div>
        <input type="text" name="" id="" v-model="ID" />
        <span></span>
      </div>

      <div class="send" @click="handleSendApply">发送</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 612px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.top {
  width: 70%;
  height: 70%;
  font-size: 20px;
  font-weight: normal;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: repeat(2, 70px) 100px;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 30%;
  color: #ffffffb1;
}
input {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  box-sizing: border-box;
  background-color: #ffffff6c;
  color: #ffffffd9;
  border: 0;
  outline: none;
  padding: 0 5px;
}
.send {
  background-color: rgb(0, 102, 204);
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  color: #fff;
  border-radius: 5px;
  grid-column: 1/-1;
}
.send:hover {
  background-color: rgba(0, 102, 204, 0.576);
  cursor: pointer;
}
</style>
