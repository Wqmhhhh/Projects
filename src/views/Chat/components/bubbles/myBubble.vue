<script setup>
import { ref } from 'vue'

defineProps({
  type: String,
  imgSrc: String,
  file: Array,
  text: String,
  avatar: String,
})

const ifshowOverlay = ref(false)
</script>

<template>
  <div class="container">
    <div class="text" v-if="type === 'text'">{{ text }}</div>

    <div class="image" v-else-if="type === 'image'" @click="ifshowOverlay = true">
      <img :src="imgSrc" alt="" />
    </div>

    <div class="file" v-else-if="type === 'file'">
      <div>
        <div>
          <div>
            <span>{{ file[0] }}</span> <span>{{ file[1] }}</span>
          </div>
          <div>{{ file[2] }}</div>
        </div>
        <i class="iconfont icon-wenjian1"></i>
      </div>

      <div>
        <hr />

        <div>抖音网页版</div>
      </div>
    </div>

    <div class="pic" :style="`background-image: url('${avatar}')`"></div>
  </div>

  <div v-if="ifshowOverlay" @click="ifshowOverlay = false" class="showOverlay">
    <img :src="imgSrc" alt="" />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.container {
  width: 830px;
  padding: 5px 15px;
  display: flex;
  justify-content: end;
  align-content: start;
}
.pic {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  overflow: hidden;
  margin-left: 10px;
  background-image: url(@/assets/pic2.png);
  background-size: cover;
  background-position: center;
}
/* 文字 */
.text {
  background-color: rgb(49, 49, 49);
  border-radius: 13px;
  font-size: 16px;
  min-height: 30px;
  min-width: 40px;
  max-width: 500px;
  line-height: 25px;
  font-weight: normal;
  color: #ffffffb2;
  padding: 5px 10px;
  word-wrap: break-word; /* 允许长单词或无法使用断点的URL强制换行 */
  word-break: break-all; /* 强制换行，即使单词太长也会换行 */
  white-space: pre-wrap;
}

/* 图片 */
.image {
  max-width: 300px;
  max-height: 300px;
  min-width: 100px;
  min-height: 50px;
  overflow: hidden;
  border-radius: 5px;
  object-position: center;
}
.image img {
  display: block;
  width: 100%;
}
.showOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000081;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.showOverlay img {
  display: block;
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

/* 文件 */
.file {
  width: 240px;
  height: 110px;
  border-radius: 2px;
  color: #000;
  background-color: rgb(255, 255, 255);
  padding: 1vh 1vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.file > div:first-child {
  font-size: 15px;
  height: 80%;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconfont {
  font-family: 'iconfont';
  font-size: 40px;
  color: #00000090;
}
hr {
  border-color: rgba(0, 0, 0, 0.149);
}
.file > div:last-child,
.file > div:first-child > div > div:last-child {
  font-size: 13px;
  font-weight: normal;
  color: rgb(168, 168, 168);
}
.file:hover {
  cursor: pointer;
}
</style>
