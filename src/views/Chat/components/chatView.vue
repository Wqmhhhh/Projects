<script setup>
import { ref } from 'vue'
import youBubble from './youBubble.vue'
import myBubble from './myBubble.vue'
import { Picker } from 'emoji-mart-vue3'
import data from '@emoji-mart/data'

const textButtonActive = ref(false)
const textInput = ref('')
const ifWords = ref(true)

// emoji
const showPicker = ref(false)
// 处理表情选择
const onEmojiSelect = (emoji) => {
  textInput.value += emoji.native
  showPicker.value = false
}

const handleInput = () => {
  if (textInput.value.length > 0) {
    textButtonActive.value = true
  } else {
    textButtonActive.value = false
  }
}

const handleEmoji = () => {
  showPicker.value = !showPicker.value
  console.log('点击emoji')
}

const handleSend = () => {
  console.log('发送')
  textInput.value = ''
  textButtonActive.value = false
}
const name = ref('乌漆抹黑嘿嘿嘿')
const words = ref(
  '这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用这是一句话，没有什么用'
)
</script>

<template>
  <div class="chatContainer">
    <!-- 顶部名称 -->
    <div class="fixTop">
      {{ name }}
    </div>

    <!-- 聊天内容 -->
    <div class="chatList">
      <youBubble>
        <template #text v-if="ifWords">
          {{ words }}
        </template>
        <template #image v-else>
          <img src="../../../assets/pic2.png" alt="" />
        </template>
      </youBubble>

      <myBubble>
        <template #text v-if="ifWords">
          {{ words }}
        </template>
        <template #image v-else>
          <img src="../../../assets/pic2.png" alt="" />
        </template>
      </myBubble>
    </div>

    <!-- 输入框 -->
    <div class="inputBox">
      <div class="menu">
        <span>
          <i class="iconfont icon-biaoqing" @click="handleEmoji"></i>
          <Picker
            v-if="showPicker"
            @select="onEmojiSelect"
            :data="data"
            :native="true"
            :disable-search="true"
            :disable-skin-tones="true"
          ></Picker>
        </span>
        <i class="iconfont icon-tupian"></i>
        <i class="iconfont icon-wenjian"></i>
      </div>

      <div class="text">
        <!-- TODO：有输入后可发送 -->
        <textarea
          name=""
          id=""
          cols="50"
          rows="6"
          @input="handleInput"
          v-model="textInput"
        ></textarea>
        <button
          class="textButton"
          :class="{ textButtonActive: textButtonActive }"
          @click="handleSend"
        >
          发送
        </button>
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

.chatContainer {
  width: 842px;
}

/* 顶部名称 */
.fixTop {
  height: 10%;
  font-size: 19px;
  font-weight: normal;
  display: flex;
  align-items: end;
  color: #ffffffc0;
  border-bottom: 1px solid #ffffff1c;
  padding: 10px 20px;
}

/* 文字条 */
.chatList {
  height: 55%;
  overflow-y: scroll;
  scrollbar-width: none;
}

/* 输入框 */
.inputBox {
  width: 842px;
  height: 35%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ffffff1c;
  /* background-color: #fff; */
}
/* 菜单栏 */
.menu {
  height: 30px;
  line-height: 30px;
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 23px;
  margin: 0 10px;
  color: #ffffff80;
  font-weight: 100;
}
.iconfont:hover {
  color: #ffffffc4;
  cursor: pointer;
}
/* 文本域 */
textarea {
  border: 0;
  font-size: 17px;
  width: 100%;
  background-color: transparent;
  resize: none;
  outline: none;
  padding: 10px;
  color: #ffffff96;
  font-family: 'SimHei', '黑体', sans-serif;
}
.textButton {
  position: relative;
  width: 90px;
  height: 30px;
  line-height: 30px;
  border: 0;
  border-radius: 5px;
  top: -20px;
  left: 87%;
  background-color: rgba(0, 102, 204);
  color: #ffffff96;
  font-size: 16px;
}
.textButtonActive {
  color: #fff;
}
/* 滚动条样式 */
textarea::-webkit-scrollbar {
  width: 12px; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
textarea::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 12px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
textarea::-webkit-scrollbar-thumb:hover {
  background-color: #a1a0a0; /* 悬停时滑块颜色 */
  cursor: pointer;
}

/* 滚动条轨道样式 */
textarea::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 12px; /* 轨道圆角 */
}
</style>
