<script setup>
import { ref, onMounted, computed, h, render } from 'vue'

import itemComponent from './itemComponent.vue'

// 绑定ref元素
const containerRef = ref()
const contentRef = ref()

// 列表数据数组
const storeData = ref(new Array(10).fill({}).map((item, index) => ({ id: index })))
const viewData = ref([])

// 开始结束下标
const localIndex = ref(0)

// 高度
const itemHeight = ref(300)
const viewHeight = ref(0)
const virtualHeight = computed(() => storeData.value.length * itemHeight.value)

// 可视区item个数
const viewCount = computed(() => 5)

// 可视区偏移量自动计算
const viewOffset = computed(() =>
  localIndex.value > 2 ? (localIndex.value - (viewCount.value - 1) / 2) * itemHeight.value : 0,
)

onMounted(() => {
  viewHeight.value = containerRef.value.clientHeight
  localIndex.value = 0

  // 初始化vnode数组
  if (storeData.value) {
    for (let i = 0; i < viewCount.value; i++) {
      const res = createDOM(i)
      viewData.value.push(res)
    }
    if (contentRef.value) {
      render(h('div', {}, [...viewData.value]), contentRef.value) // 用 h 包裹
    }
  }
})

// 滚动事件触发函数
const scrollEvent = (e) => {
  if (e.deltaY < 0) {
    showBefore()
  } else {
    if (localIndex.value > storeData.value.length - viewCount.value) {
      const arr = new Array(10).fill({}).map((_, index) => ({
        id: storeData.value.length + index,
      }))
      storeData.value.push(...arr)
    }
    showNext()
  }

  containerRef.value.scrollTo({ top: localIndex.value * itemHeight.value, behavior: 'smooth' })
}

const createDOM = (addIndex) => {
  const item = storeData.value[addIndex]
  return h(itemComponent, {
    content: item,
    itemHeight: itemHeight.value,
  })
}

// 展示下一项
const showNext = () => {
  let half = (viewCount.value - 1) / 2

  // 在最前面更新localIndex，保证addIndex的正确
  localIndex.value += 1

  // 确保localIndex前后留出half个元素作为缓冲区
  if (localIndex.value > half && localIndex.value < storeData.value.length - half) {
    const addIndex = localIndex.value + half
    const res = contentRef.value.querySelector(`.content-item[data-index='${addIndex}']`)
    if (!res) {
      viewData.value.push(createDOM(addIndex))
    }
    if (viewData.value.length > viewCount.value) {
      viewData.value.shift()
    }

    render(h('div', {}, [...viewData.value]), contentRef.value)
  }
}

const showBefore = () => {
  let half = (viewCount.value - 1) / 2

  localIndex.value -= 1

  if (localIndex.value > half && localIndex.value < storeData.value.length - half) {
    const addIndex = localIndex.value - half
    const res = contentRef.value.querySelector(`.content-item[data-index='${addIndex}']`)
    if (!res) {
      viewData.value.unshift(createDOM(addIndex))
    }
    if (viewData.value.length > viewCount.value) {
      viewData.value.pop()
    }

    render(h('div', {}, [...viewData.value]), contentRef.value)
  }
}
</script>

<template>
  <div>虚拟列表：无限滚动</div>
  <div class="container" ref="containerRef" @wheel.prevent="scrollEvent">
    <div class="virtual" :style="{ height: virtualHeight + 'px' }"></div>
    <div
      class="content"
      ref="contentRef"
      :style="{ transform: `translate3d(0,${viewOffset}px,0)` }"
    ></div>
  </div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 300px;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  position: relative;
  scrollbar-width: none;
}
.virtual {
  background-color: #be1a1a;
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: yellow;
}
</style>
