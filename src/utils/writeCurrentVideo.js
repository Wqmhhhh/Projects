import { useCurrentVideo } from '@/stores'
import { storeToRefs } from 'pinia'
const CurrentVideo = useCurrentVideo()
// TODO:解构赋值
const { video } = storeToRefs(CurrentVideo)

// 将视频信息写入 currentVideo 中
const writeCurrentVideo = () => {
  console.log(video)
}

export { writeCurrentVideo }
