<script setup>
import { onMounted, ref, createApp, h } from 'vue'
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
import SideChangeButton from '@/components/video/SideChangeButton.vue'
import { useVideo, useCommentList } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const VideoStore = useVideo()
const { recommendVideo } = storeToRefs(VideoStore)

// 当前滚动量大小
const currentVideoOffset = ref(0)

// 当前视频列表
const curVideoList = ref([])

// 视频容器
const boxRef = ref()

// 当前视频下标
const videoIndex = ref()

// 视频列表中固定的视频数
const MaxNum = 5

// 添加结点
const addVideo = (index) => {
  const newNode = document.createElement('div')
  newNode.className = 'video-mount'

  // 创建新的Vue应用
  const app = createApp({
    render: () =>
      h(VideoBoxBig, {
        videoInfo: recommendVideo.value[index],
      }),
  })

  // 添加到视频容器中
  boxRef.value.appendChild(newNode)

  // 挂载到结点上
  app.mount(newNode)

  // 添加到数组中
  curVideoList.value.push({
    index,
    app,
  })

  console.log('添加新元素')
}

// 删除结点
const delVideo = () => {
  const firstNode = document.querySelector(`.box>div:first-child`)

  if (!firstNode) {
    console.log('没有视频列表首元素')
    return
  }

  const app = curVideoList.value[0].app
  app.unmount()
  firstNode.remove()

  curVideoList.value = curVideoList.value.filter((v) => v.index !== 0)

  console.log('删除头部元素')
}

// 处理视频切换逻辑
const handleChangeVideo = (e) => {
  // 上一个视频
  if (e < 0) {
    if (videoIndex.value === 0) {
      ElMessage('已经是第一个视频啦！')
    } else {
      currentVideoOffset.value -= boxRef.value.offsetHeight
      boxRef.value.scrollTo({
        top: currentVideoOffset.value,
        behavior: 'smooth',
      })
      videoIndex.value--
    }
  }
  // 下一个视频
  else if (e > 0) {
    if (videoIndex.value === recommendVideo.value.length - 1) {
      ElMessage('已经是最后一个视频啦！')
    } else {
      currentVideoOffset.value += boxRef.value.offsetHeight
      boxRef.value.scrollTo({
        top: currentVideoOffset.value,
        behavior: 'smooth',
      })
      videoIndex.value++
    }

    // 滚动到后面的视频时自动再次请求新的视频
    if (videoIndex.value === recommendVideo.value.length - 2) {
      console.log('发送推荐视频列表请求')
      VideoStore.getRecList(5)
    }
  }

  // 清空评论
  useCommentList().clearComment()

  //获取下一个视频的评论数量
  useCommentList().getCommentNum(recommendVideo.value[videoIndex.value].vlogId)
}

// 处理视口大小变化
const handleResize = () => {
  // 区分scroll和resize事件
  ifResize.value = true
  timer2.value = setTimeout(() => {
    ifResize.value = false
    timer2.value = null
  }, 500)

  // 同步修正视频滚动距离
  currentVideoOffset.value = videoIndex.value * boxRef.value.clientHeight
  boxRef.value.scrollTo({
    top: currentVideoOffset.value,
    behavior: 'smooth',
  })
}

const timer1 = ref(null)
const timer2 = ref(null)
const ifResize = ref(false)

onMounted(() => {
  // 鼠标滚动切换视频
  boxRef.value.addEventListener(
    'wheel',
    (e) => {
      // 禁止默认事件
      e.preventDefault()

      if (ifResize.value) {
        return
      }

      // 若在评论抽屉中不滚动
      // if()

      // 鼠标滚动切换视频
      if (timer1.value) {
        return
      }
      timer1.value = setTimeout(() => {
        timer1.value = null
      }, 1000)
      handleChangeVideo(e.deltaY)
    },
    {
      passive: false,
    }
  )

  // 视口大小变化修改滚动值大小
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <div class="container">
    <div class="box" ref="boxRef"></div>

    <!-- 切换视频按钮 -->
    <SideChangeButton @changeVideo="handleChangeVideo"></SideChangeButton>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 视频容器 */
.box {
  width: 96%;
  height: 98%;
  border-radius: 15px;
  overflow-y: scroll;
  scrollbar-width: none;
}
.box > div {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
