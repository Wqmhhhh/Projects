<script setup>
import { onMounted, ref } from 'vue'
import VideoBoxBig from '@/components/video/VideoBox-big.vue'
import SideChangeButton from '@/components/video/SideChangeButton.vue'
import { useVideo } from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
const VideoStore = useVideo()
const { followVideo } = storeToRefs(VideoStore)

// 当前滚动量大小
const currentVideoOffset = ref(0)

// 当前视频下标
const videoIndex = ref(0)

const boxRef = ref()

// 定时器
const timer = ref(null)

const haveVideo = ref()

// 处理视频切换逻辑
const handleChangeVideo = (e) => {
  // 防抖
  if (
    videoIndex.value === 0 ||
    videoIndex.value === followVideo.value.length - 1
  ) {
    if (timer.value) {
      return
    }

    timer.value = setTimeout(() => {
      timer.value = null
    }, 2000)
  }

  // 上一个视频
  if (e < 0) {
    if (videoIndex.value === 0) {
      ElMessage('已经是第一个视频啦！')
    } else {
      currentVideoOffset.value -= boxRef.value.clientHeight
      boxRef.value.scrollTo({
        top: currentVideoOffset.value,
        behavior: 'smooth',
      })
      videoIndex.value--
    }
  }
  // 下一个视频
  else if (e > 0) {
    if (videoIndex.value === followVideo.value.length - 1) {
      ElMessage('已经是最后一个视频啦！')
    } else {
      currentVideoOffset.value += boxRef.value.clientHeight
      boxRef.value.scrollTo({
        top: currentVideoOffset.value,
        behavior: 'smooth',
      })
      videoIndex.value++
    }

    // TODO：滚动到后面的视频时自动再次请求新的视频
  }
}

const timer1 = ref(null)

// 鼠标滚动切换视频
onMounted(() => {
  window.addEventListener('wheel', (e) => {
    // 禁止默认事件
    e.preventDefault()
    if (timer1.value) {
      return
    }
    timer1.value = setTimeout(() => {
      timer1.value = null
    }, 1000)
    handleChangeVideo(e.deltaY)
  })

  // 是否有视频
  if (followVideo.value.length > 0) {
    haveVideo.value = true
  } else {
    haveVideo.value = false
  }
})
</script>
<template>
  <div class="view">
    <!-- 视频图像 -->
    <div class="container" v-if="haveVideo">
      <div class="box" ref="boxRef">
        <div
          v-for="(item, index) in followVideo"
          :key="item.vlogId"
          class="boxRef"
        >
          <VideoBoxBig
            :videoInfo="item"
            :ifPlay="index === videoIndex"
            :ifChangeVideo="index === videoIndex"
          ></VideoBoxBig>
        </div>
      </div>

      <!-- 切换视频按钮 -->
      <SideChangeButton @changeVideo="handleChangeVideo"></SideChangeButton>
    </div>

    <!-- 没有视频列表显示 -->
    <div v-else class="noVideo">
      <i class="iconfont icon-yinfu2"></i>
      <div>
        很遗憾地通知您
        <br />
        您没有关注的博主
      </div>
    </div>
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
}

.view,
.noVideo {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noVideo {
  width: 300px;
  color: #ffffff86;
  font-size: 30px;
  line-height: 50px;
  margin: 0 auto;
  justify-content: space-between;
}
.iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 45px;
  color: #ffffff86;
}
</style>
