<script setup>
import { ref, onMounted, computed } from 'vue'

// 绑定ref元素
const containerRef = ref()
const contentRef = ref()

// 列表数据数组
const storeData = new Array(1000).fill({}).map((item, index) => ({ id: index }))
const viewData = computed(() => {
  return storeData.slice(startIndex.value, Math.min(endIndex.value, storeData.length))
})

// 开始结束下标
const startIndex = ref(0)
const endIndex = ref(0)

// 高度
const itemHeight = ref(60)
const viewHeight = ref(0)
const virtualHeight = computed(() => storeData.length * itemHeight.value)

// 可视区item个数，向上取整避免留白,加2确保向下滚动时无明显加载痕迹
const viewCount = computed(() => Math.ceil(viewHeight.value / itemHeight.value) + 2)

// 可视区偏移量
const viewOffset = computed(() => {
  return startIndex.value * itemHeight.value
})

onMounted(() => {
  viewHeight.value = containerRef.value.clientHeight

  startIndex.value = 0
  endIndex.value = startIndex.value + viewCount.value
})

// 滚动事件触发函数
const scrollEvent = (e) => {
  const scrollTop = e.target.scrollTop
  startIndex.value = Math.floor(scrollTop / itemHeight.value)
  endIndex.value = startIndex.value + viewCount.value
}
</script>

<template>
  <div>虚拟列表：固定高度</div>
  <div class="container" ref="containerRef" @scroll="scrollEvent">
    <div class="virtual" :style="{ height: virtualHeight + 'px' }"></div>
    <div
      class="content"
      ref="contentRef"
      :style="{ transform: `translate3d(0,${viewOffset}px,0)` }"
    >
      <div
        class="content-item"
        v-for="item in viewData"
        :key="item.id"
        :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }"
      >
        {{ item.id }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 200px;
  height: 300px;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  position: relative;
  background-color: aqua;
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: yellow;
}
.content-item {
  box-sizing: border-box;
  border: 1px solid #ddd;
  text-align: center;
  color: #333;
}
</style>
