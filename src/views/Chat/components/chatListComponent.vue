<script setup>
import { onMounted, ref } from 'vue'
import { useChatRoomInfo } from '@/stores/modules/chatListInfo'
import { storeToRefs } from 'pinia'

const chatStore = useChatRoomInfo()
const { chatListActiveID, naviBarIndex, newFriActiveID } = storeToRefs(chatStore)

const props = defineProps({
  information: {
    type: Object,
  },
  message: {
    type: String,
  },
})

const msgShow = ref('')
const nameShow = ref('')

// 处理文字过长
const handleText = () => {
  // 名称
  nameShow.value =
    props.information.name.length > 10
      ? props.information.name.substring(0, 7) + '...'
      : props.information.name

  // 信息
  if (props.message) {
    msgShow.value =
      props.message.length > 10 ? props.message.substring(0, 10) + '...' : props.message
  }
}

onMounted(() => {
  handleText()
})
</script>

<template>
  <div
    class="box"
    :class="{
      BoxActive:
        (naviBarIndex === 'newFri' && newFriActiveID === props.information.account_id_1) ||
        (naviBarIndex === 'chat' && chatListActiveID === props.information.account_id),
    }"
  >
    <div class="img">
      <img :src="props.information.avatar" alt="" />
    </div>

    <div class="text">
      <div>{{ nameShow }}</div>
      <div class="grey" v-if="msgShow">{{ msgShow }}</div>
    </div>

    <div class="icon" v-if="props.information.time">
      <div class="grey">{{ props.information.time }}</div>
      <div v-show="props.information.ifMuted">
        <el-icon class="grey"><MuteNotification /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: all;
  transition-duration: 0.1s;
}
.box:hover {
  background-color: #ffffff1c;
  cursor: pointer;
}
.BoxActive {
  background-color: rgb(13, 110, 207) !important;
}

/* 头像 */
.img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
}
.img img {
  width: 40px;
}

/* 文字*/
.text {
  margin: 0 6px;
  width: 130px;
  height: 40px;
  color: #ffffffe6;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.grey {
  color: #ffffff64;
  font-size: 13px;
  margin-top: 5px;
}
.icon {
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;
  height: 40px;
}
</style>
