<script setup>
import { ref, onMounted, computed, onUpdated } from 'vue'
// mock数据的js库
import { faker } from 'https://esm.sh/@faker-js/faker'

// 绑定ref
const containerRef = ref()
const contentRef = ref()
const itemRefs = ref([])

// 子项位置集合
const itemPositions = ref([])

// 列表数据
const storeData = new Array(500).fill({}).map((item, index) => ({
  index,
  text: faker.lorem.sentence(),
}))
const viewData = computed(() => {
  return storeData.slice(startIndex.value, Math.min(endIndex.value, storeData.length))
})

// 开始、结束下标
const startIndex = ref(0)
const endIndex = ref(0)
const viewCount = computed(() => Math.ceil(viewHeight.value / estimateHeight.value) + 2)

// 预估子项高度
const estimateHeight = ref(60)
const virtualHeight = ref(0)
const viewHeight = ref(0)

// 偏移量
const viewOffset = computed(() =>
  startIndex.value >= 1 ? itemPositions.value[startIndex.value].top : 0
)

// 初始化
onMounted(() => {
  // 计算可视区域高度、占位元素高度
  viewHeight.value = containerRef.value.clientHeight
  virtualHeight.value = estimateHeight.value * storeData.length

  // 根据预估子项高度计算开始、结束下标
  startIndex.value = 0
  endIndex.value = startIndex.value + viewCount.value

  // 初始化子项位置集合，包含：子项高度、起止距离
  itemPositions.value = storeData.map((item, index) => ({
    index,
    top: index * estimateHeight.value,
    bottom: (index + 1) * estimateHeight.value,
    height: estimateHeight.value,
  }))
})

// 监听子项高度变化
onUpdated(() => {
  if (!itemRefs.value || !itemRefs.value.length) return

  // 更新可视区子项位置
  computeViewItemHeight()

  // 更新占位元素高度
  virtualHeight.value = itemPositions.value[itemPositions.value.length - 1].bottom
})

// 更新子项高度
const computeViewItemHeight = () => {
  itemRefs.value.map((item) => {
    const id = +item.id
    const changeHeight = item.clientHeight - itemPositions.value[id].height
    if (changeHeight) {
      // 更新该子项位置，注意下标是在总数组中的下标
      itemPositions.value[id].height = item.clientHeight
      itemPositions.value[id].bottom += changeHeight

      // 循环更新该子项之后的元素位置
      for (let i = id + 1; i < itemPositions.value.length; i++) {
        itemPositions.value[i].top += changeHeight
        itemPositions.value[i].bottom += changeHeight
      }
    }
  })
}

// 二分法计算startIndex
const getStartIndex = (scrollTop) => {
  let start = 0
  let end = storeData.length - 1
  // 目的是记录候选的startIndex，保证返回最小的符合条件的下标
  let tempIndex = null

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)
    if (itemPositions.value[mid].bottom === scrollTop) {
      tempIndex = mid + 1
      return tempIndex
    } else if (itemPositions.value[mid].bottom < scrollTop) {
      start = mid + 1
    } else {
      if (tempIndex === null || tempIndex > mid) {
        tempIndex = mid
      }
      end = mid - 1
    }
  }

  return tempIndex
}

// 监听滚动事件
const scrollEvent = (e) => {
  startIndex.value = getStartIndex(e.target.scrollTop)
  endIndex.value = startIndex.value + viewCount.value
}
</script>

<template>
  <div>虚拟列表：动态高度</div>
  <div class="container" ref="containerRef" @scroll="scrollEvent">
    <div class="virtual" :style="{ height: virtualHeight + 'px' }"></div>
    <div
      class="content"
      ref="contentRef"
      :style="{ transform: `translate3d(0,${viewOffset}px,0)` }"
    >
      <div
        class="content-item"
        ref="itemRefs"
        v-for="item in viewData"
        :key="item.index"
        :id="item.index"
      >
        {{ item.text }}
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
