<script setup>
import { onMounted, ref } from 'vue'
import { useChatList } from '@/stores/modules/chatListInfo'
import { storeToRefs } from 'pinia'

const chatStore = useChatList()
const { chatListActiveIndex } = storeToRefs(chatStore)

const props = defineProps({
  information: Object,
})
const info = ref(props.information)

// 处理文字过长
const handleText = () => {
  info.value.name =
    info.value.name.length > 10
      ? info.value.name.substring(0, 7) + '...'
      : info.value.name
  if (info.value.msg) {
    info.value.msg =
      info.value.msg.length > 10
        ? info.value.msg.substring(0, 10) + '...'
        : info.value.msg
  }
}

// 处理点击列表元素
const handleListActive = () => {
  chatStore.setChatListActiveIndex(info.value.id)
}

onMounted(() => {
  handleText()
})
</script>

<template>
  <div
    class="box"
    :class="{ BoxActive: chatListActiveIndex === info.id }"
    @click="handleListActive"
  >
    <div class="img">
      <img src="../../../assets/image.ico" alt="" />
    </div>

    <div class="text">
      <div>{{ info.name }}</div>
      <div class="grey" v-if="info.msg">{{ info.msg }}</div>
    </div>

    <div class="icon" v-if="info.time">
      <div class="grey">{{ info.time }}</div>
      <div v-show="info.ifMuted">
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
