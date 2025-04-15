<script setup>
import { onMounted, ref } from 'vue'

// 初始化Box大小
const searchBox = ref()
const initialBoxWidth = () => {
  if (!searchBox.value) {
    return
  }
  if (window.innerWidth < 1545) {
    searchBox.value.style.width = '100%'
  } else {
    searchBox.value.style.width = '1545px'
  }
}

onMounted(
  initialBoxWidth(),

  // 动态调整Box宽度
  window.addEventListener('resize', initialBoxWidth)
)
</script>

<template>
  <div class="searchContainer">
    <div class="searchBox" ref="searchBox"></div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.searchContainer {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}
.searchBox {
  width: 100%;
  height: 100vh;
  background-color: #d30a0acc;
}

/* 滚动条样式 */
.searchContainer::-webkit-scrollbar {
  width: 7px; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
.searchContainer::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.searchContainer::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.searchContainer::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 4px; /* 轨道圆角 */
}
</style>
