<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

// 导入库
import {
  useShowFlags,
  useVideo,
  useUserStore,
  useCommentList,
  useFansStore,
} from '@/stores'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const FlagStore = useShowFlags()
const VideoStore = useVideo()
const CommentStore = useCommentList()
const fansStore = useFansStore()
const { commentList, commentNum, noMoreCom } = storeToRefs(CommentStore)
const { ifFullScreen } = storeToRefs(FlagStore)

// 父组件传入视频信息
const props = defineProps({
  videoInfo: Object,
  ifPlay: Boolean,
  ifChangeVideo: Boolean,
})

// 评论有关信息
let commentPageSize = 3

// 绑定视频
const VideoRef = ref()
// 绑定视频容器
const videoBox = ref()
const videoBoxWidth = ref(0)
// 视频总长:需手动设置
const totalLength = ref(0)
// 当前播放进度
const VideoCurrentLength = ref(0)
// 进度条
const processNumber = ref(0)
// 视频暂停
const VideoPause = ref(false)
// 音量调整是否显示
const VoiceVolumn = ref(true)
// 音量大小
const VoiceVolumnNumber = ref(50)
// 倍速
const SpeedNumber = ref('倍速')
// 视频上层图标是否显示
const tagShow = ref(false)
// 显示的标题内容
const VideoIntroShow = ref()
// 右侧图标
const FollowUper = ref()
const likeUper = ref()
const likeUperNum = ref()
const ifUserWork = ref()
const ifPrivate = ref()

// 介绍过长
const IntroduceToolong = ref(false)
// 介绍过长进行折叠
const ToolongWrap = ref(true)
// 右侧抽屉
const sideTab = [
  {
    name: 'TA 的作品',
  },
  {
    name: '评论',
  },
]
// 抽屉显示
const DrawerShow = ref(false)

// 绑定抽屉
const drawer = ref()
const commentContainer = ref()

const TabShow = ref('0')

// 评论内容
const sendBoxText = ref('')

// 父评论Id
const fatherCommentId = ref('0')

// 控制播放/暂停
const handlePlayPause = () => {
  if (VideoPause.value === true) {
    VideoRef.value.play()
  } else {
    VideoRef.value.pause()
  }
  VideoPause.value = !VideoPause.value
}
// 控制音量
const handleVoice = () => {
  if (VoiceVolumnNumber.value === 0) {
    VoiceVolumn.value = false
  } else {
    VoiceVolumn.value = true
  }
  VideoRef.value.volume = VoiceVolumnNumber.value / 100 // 将音量值转换为 0-1 范围
}
// 控制倍速
const handleSpeed = (value) => {
  SpeedNumber.value = value
  VideoRef.value.playbackRate = parseFloat(value) // 设置倍速
}

// 全屏控制
const handleFullScreen = () => {
  ifFullScreen.value = !ifFullScreen.value
  // // 保存当前视频进度
  // VideoStore.setCurrentVlog(
  //   totalLength.value,
  //   VideoCurrentLength.value,
  //   VideoPause.value
  // )
  console.log('视频全屏')
}

// 改变时间格式
const TransTime = (num) => {
  let min = String(Math.floor(num / 60))
  let sec = String(Math.floor(num % 60))
  min = min >= 10 ? min : '0' + min
  sec = sec >= 10 ? sec : '0' + sec
  return min + ':' + sec
}

// 视频大小适应屏幕
const resizeVideo = (n) => {
  // 原大小
  if (n === 1) {
    videoBoxWidth.value = 100
  }
  // 宽度变窄
  else {
    videoBoxWidth.value = 70
  }

  // 视频大小切换
  VideoRef.value.style.width = `100%`
  VideoRef.value.style.height = 'auto'
}
// 初始化视频
const initialVideo = () => {
  if (!VideoRef.value) {
    console.log('视频没绑定！')
  }

  resizeVideo(1)

  // 初始化时介绍过长进行剪切
  if (props.videoInfo.content.length > 80) {
    VideoIntroShow.value = props.videoInfo.content.substring(0, 80)
    console.log(VideoIntroShow.value)
    IntroduceToolong.value = true
  } else {
    VideoIntroShow.value = props.videoInfo.content.value
    IntroduceToolong.value = false
  }
  // 是否点赞视频
  likeUper.value = props.videoInfo.doILikeThisVlog
  // 是否关注
  FollowUper.value = props.videoInfo.doIFollowVloger
  // 点赞量
  likeUperNum.value = props.videoInfo.likeCounts
  // 是否为作者视频，设置是否为作者作品、是否私密
  if (props.videoInfo.vlogerId === useUserStore().user.id) {
    ifUserWork.value = true
    ifPrivate.value = props.videoInfo.isPrivate
  } else {
    ifUserWork.value = false
  }
}

// 处理标题的折叠、展开
const handleTooLong = () => {
  if (ToolongWrap.value) {
    VideoIntroShow.value = props.videoInfo.content
  } else {
    VideoIntroShow.value = props.videoInfo.content.substring(0, 80)
  }
  ToolongWrap.value = !ToolongWrap.value
}

// 处理喜欢操作
const handleLike = (n = 0) => {
  // 双击默认喜欢操作
  if (n === 1 && likeUper.value === true) {
    return
  }

  if (!likeUper.value) {
    console.log('发送喜欢视频请求')
    const res = VideoStore.likeVideo(
      props.videoInfo.vlogerId,
      props.videoInfo.vlogId
    )
    res.then((result) => {
      if (result === false) {
        ElMessage.error('点赞失败')
        return
      } else {
        likeUper.value = true
        likeUperNum.value++
      }
    })
  } else {
    console.log('发送取消喜欢视频请求')
    const res = VideoStore.cancelLikeVideo(
      props.videoInfo.vlogerId,
      props.videoInfo.vlogId
    )
    res.then((result) => {
      if (result === false) {
        ElMessage.error('点赞失败')
        return
      } else {
        likeUper.value = false
        likeUperNum.value--
      }
    })
  }
}

// 处理私密/公开视频操作
const handlePrivate = () => {
  if (!ifPrivate.value) {
    console.log('发送私密视频请求')
    VideoStore.privateVideo(props.videoInfo.vlogId)
    ifPrivate.value = true
  } else {
    console.log('发送公开视频请求')
    VideoStore.publicVideo(props.videoInfo.vlogId)
    ifPrivate.value = false
  }
}

// 处理关注作者
const handlleFollow = () => {
  if (!FollowUper.value) {
    console.log('发送关注作者请求')
    fansStore.followVloger(props.videoInfo.vlogerId)
    FollowUper.value = true
  } else {
    console.log('发送取消关注作者请求')
    fansStore.cancelfFollowVloger(props.videoInfo.vlogerId)
    FollowUper.value = false
  }
}

// 处理更多
const handleMore = () => {
  ElMessage('To be continue...')
}

// 点击定时器:区分单击双击
const clickTimer = ref(null)
const handleSingleClick = () => {
  // 清除定时器，防止重复触发
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
  }
  //设置新定时器延迟执行
  clickTimer.value = setTimeout(() => {
    handlePlayPause()
    clickTimer.value = null
  }, 300)
}
const handleDoubleClick = () => {
  // 立即清除单击定时器
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
  }
  // 直接执行喜欢操作
  handleLike(1)
}

// 点击头像显示抽屉的 作品
const handleClickPic = () => {
  // 发送请求
  handleTabClick(0)
  DrawerShow.value = true
}

// 点击评论显示抽屉的 评论
const handleClickComment = () => {
  if (TabShow.value === '0') {
    handleTabClick(1)
    DrawerShow.value = !DrawerShow.value
  } else {
    DrawerShow.value = !DrawerShow.value
  }
}

// 抽屉tab栏切换
const handleTabClick = (index) => {
  TabShow.value = index
  if (index === 1) {
    // 评论请求
    // 没有更多评论时不再触发请求
    if (noMoreCom.value === true) {
      return
    }

    console.log('发送评论请求')

    try {
      CommentStore.getCommentList(
        props.videoInfo.vlogId,
        useUserStore().user.id,
        commentPageSize
      )
      CommentStore.getCommentNum(props.videoInfo.vlogId)
    } catch (error) {
      console.error('评论请求失败:', error)
      ElMessage.error('获取评论失败')
    }

    // CommentStore.getCommentList(
    //   props.videoInfo.vlogId,
    //   useUserStore().user.id,
    //   commentPageSize
    // )
    // CommentStore.getCommentNum(props.videoInfo.vlogId)
  }
}

// 点击评论喜欢
const handleLikeComment = (e) => {
  if (e.isLike === 1) {
    CommentStore.cancelLike(e.commentId, props.videoInfo.vlogId)
  } else {
    CommentStore.likeComment(e.commentId, props.videoInfo.vlogId)
  }
}

// 评论长度验证
const handleInput = () => {
  if (sendBoxText.value.length === 50) {
    ElMessage.error('评论长度不能大于50字！')
    return
  }
  // // 评论框清空时回复标志清空
  // if (sendBoxText.value === '') {
  //   replyName.value = ''
  // }
}

// 点击评论发送
const handleCommentSend = () => {
  if (!FlagStore.ifLogin) {
    ElMessage('登录后才能评论哦！')
    return
  }

  console.log('发送评论请求')
  const res = CommentStore.addComment(
    props.videoInfo.vlogerId,
    fatherCommentId.value,
    props.videoInfo.vlogId,
    sendBoxText.value
  )
  res.then((result) => {
    if (result === true) {
      ElMessage.success('发送评论成功！')
    } else {
      ElMessage.error('发送评论失败')
    }
  })

  // fatherCommentId.value = '0'
  sendBoxText.value = ''
}

// 回复评论
// const replyName = ref('')
// const handleReply = (item) => {
//   if (replyName.value === item.commentUserNickname) {
//     ElMessage.error('已经 @ 过TA了')
//     return
//   }

//   replyName.value = item.commentUserNickname
//   sendBoxText.value = `@${item.commentUserNickname}：` + sendBoxText.value
//   document.querySelector('.sendBox input').focus()

//   fatherCommentId.value = item.commentUserId
// }

// 删除评论
const handleDeleteComment = (item) => {
  // console.log('com', item.commentUserId, 'user', useUserStore().user.id)

  if (item.commentUserId !== useUserStore().user.id) {
    ElMessage.error('不是自己的评论不能删除哦~')
    return
  }

  console.log('发送删除评论请求')
  CommentStore.delComment(item.commentId, props.videoInfo.vlogId)

  // fatherCommentId.value = '0'
}

// 处理视口大小变化
const handleResize = () => {
  if (DrawerShow.value === false) {
    resizeVideo(1)
  } else {
    resizeVideo(2)
  }
}

// 处理视频总时长加载
const handleUpdateVideoLen = () => {
  totalLength.value = VideoRef.value.duration
  VideoRef.value.play()
}

// 处理视频播放时长更新
const handleUpdatePlayLen = () => {
  VideoCurrentLength.value = VideoRef.value.currentTime
  processNumber.value = (VideoCurrentLength.value / totalLength.value) * 100
  if (VideoCurrentLength.value === totalLength.value) {
    VideoPause.value = true
  }
}

// 规范化评论时间
const formatTime = (e) => {
  const time = e.slice(0, 10)
  return time
}

// 处理评论区滚动
// const handleCommentScroll = (e) => {
//   const { scrollTop, scrollHeight, clientHeight } = e.target

//   // 滚动高度到达元素高度的90%时再次请求评论内容
//   // 判断是否滚动到底部（距离底部小于一定阈值，如 50px）
//   const isBottom = scrollHeight - (scrollTop + clientHeight) < 50

//   if (isBottom && !noMoreCom.value) {
//     handleTabClick(1)
//   }

//   // 阻止滚动事件冒泡到父元素
//   e.stopPropagation()
// }

// 获取视频详细信息
// const getDetailInfo = () => {
//   console.log('获取单个视频详细信息请求')
//   VideoStore.getVideoDetail(props.videoInfo.vlogId)
// }

// 查询是否关注作者
// const queryIfFollowVloger = () => {
//   console.log('查询是否关注作者')
//   fansStore.queryIfFollow(props.videoInfo.vlogerId)
// }

// 视频加载完成后执行操作
onMounted(() => {
  // getDetailInfo()
  // queryIfFollowVloger()

  // 初始化视频
  initialVideo()

  // 视口大小变化调整视频大小
  window.addEventListener('resize', handleResize)

  // 监听视频加载完成事件，更新总时长
  VideoRef.value.addEventListener('loadedmetadata', handleUpdateVideoLen)

  // 监听时间更新事件，动态更新当前播放时间
  VideoRef.value.addEventListener('timeupdate', handleUpdatePlayLen)

  // 抽屉鼠标可以滚动
  commentContainer.value.addEventListener(
    'wheel',
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target

      // 判断是否滚动到底部（距离底部小于一定阈值，如 50px）
      const isBottom = scrollHeight - (scrollTop + clientHeight) < 50

      if (isBottom && !noMoreCom.value) {
        handleTabClick(1)
      }

      // 阻止滚动事件冒泡到父元素
      e.stopPropagation()
    },
    {
      passive: false,
    }
  )
})

// 移除有关事件监听
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  VideoRef.value.removeEventListener('loadedmetadata', handleUpdateVideoLen)
  VideoRef.value.removeEventListener('timeupdate', handleUpdatePlayLen)
})

// 监听抽屉属性调整视频容器宽度
watch(DrawerShow, (newValue) => {
  if (newValue === true) {
    resizeVideo(2)
  } else {
    resizeVideo(1)
  }
})

// 视频切换走时操作
watch(
  // 注意这里监听父子通信的属性需要使用函数监听
  () => props.ifChangeVideo,
  (newValue) => {
    if (newValue === false) {
      // 视频暂停
      VideoPause.value = false
      handlePlayPause()

      // 抽屉收回
      if (DrawerShow.value === true) {
        DrawerShow.value = false
      }
    }
  }
)

// 切换视频控制播放暂停
watch(
  // 注意这里监听父子通信的属性需要使用函数监听
  () => props.ifPlay,
  (newValue) => {
    if (newValue === false) {
      // 视频暂停
      VideoPause.value = false
    } else {
      VideoPause.value = true
    }
    handlePlayPause()
  }
)
</script>

<template>
  <div class="video-container">
    <!-- 顶部视频 -->
    <div class="topContainer">
      <!-- 视频容器 -->
      <div
        class="videoBox"
        ref="videoBox"
        @dblclick="handleDoubleClick"
        @click="handleSingleClick"
        :style="{
          backgroundImage: props.videoInfo.cover
            ? `url('${props.videoInfo.cover}')`
            : 'none',
          width: `${videoBoxWidth + '%'}`,
        }"
      >
        <video
          ref="VideoRef"
          playsinline="true"
          x5-playsinline="true"
          webkit-playsinline="true"
          mediatype="video"
          data-index="-1"
          crossorigin="anonymous"
          :src="props.videoInfo.url"
        ></video>

        <!-- 视频上方遮罩层 -->
        <div class="videoHover">
          <!-- 底部文字 -->
          <div class="topContainerBottom" v-show="!tagShow">
            <div>@{{ props.videoInfo.vlogerName }}</div>
            <div>
              <span>{{ VideoIntroShow }}</span>

              <!-- 介绍过长时显示 -->
              <span v-if="!IntroduceToolong"></span>
              <span v-else @click="handleTooLong">
                <span class="TooLong" v-if="ToolongWrap"> ...显示全部 </span>
                <span class="TooLong" v-else> 折叠 </span>
              </span>
            </div>
          </div>

          <!-- 右侧图标 -->
          <div class="topContainerRight">
            <!-- 作者头像 -->
            <div class="UperPic" @click="handleClickPic">
              <img :src="props.videoInfo.vlogerFace" alt="" />
            </div>

            <!-- 是否关注 -->
            <div @click="handlleFollow" class="FollowUper" v-show="!ifUserWork">
              <i
                class="iconfont icon-31yiguanzhudianpu"
                v-if="FollowUper"
                style="color: rgb(254, 44, 85)"
              ></i>
              <i class="iconfont icon-31guanzhudianpu" v-else></i>
            </div>

            <!-- 喜欢 -->
            <div class="like" @click="handleLike">
              <i
                class="iconfont icon-aixin"
                :class="{ likeUper: likeUper }"
              ></i>
              <div>{{ likeUperNum }}</div>
            </div>

            <!-- 评论 -->
            <div class="commentIcon" @click="handleClickComment">
              <i class="iconfont icon-pinglun"></i>
              <div>{{ commentNum }}</div>
            </div>

            <!-- 收藏 -->
            <!-- <div class="collect" @click="handleCollect">
          <i
            class="iconfont icon-weishoucang"
            :class="{ CollectUper: CollectUper }"
          ></i>
          <div>{{ CollectUperNum }}</div>
          </div> -->

            <!-- 私密 -->
            <div v-show="ifUserWork" @click="handlePrivate">
              <i class="iconfont icon-guansuo" v-if="ifPrivate"></i>
              <i class="iconfont icon-kaisuo" v-else></i>
            </div>

            <!-- 更多 -->
            <div class="more">
              <i class="iconfont icon-gengduo1" @click="handleMore"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 视频右侧抽屉 -->
      <div class="drawer" :class="{ DrawerShow: DrawerShow }" ref="drawer">
        <!-- 抽屉Tab -->
        <div class="drawerTab">
          <el-menu
            mode="horizontal"
            class="Tab el-menu-demo"
            :default-active="String(TabShow)"
          >
            <el-menu-item
              v-for="(item, index) in sideTab"
              :key="index"
              :index="index.toString()"
              class="el-menu-item"
              @click="handleTabClick(index)"
              :class="{ activeTab: index === TabShow }"
            >
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
          <el-icon class="el-icon" @click="DrawerShow = !DrawerShow"
            ><Close
          /></el-icon>
        </div>

        <!-- TA的作品 -->
        <div class="UperWorks" v-if="TabShow === 0">
          <!-- 顶部作者信息 -->
          <div class="UperWorksTop">
            <!-- 作者昵称 -->
            <div>
              <!-- 作者头像 -->
              <div>@ {{ props.videoInfo.vlogerName }} ></div>
            </div>

            <!-- 关注按钮 -->
            <div
              class="UperWorksFollowButton"
              @click="FollowUper = !FollowUper"
              v-show="!ifUserWork"
            >
              <el-button class="el-button DrawerNotfollow" v-if="!FollowUper"
                >+ 关注</el-button
              >
              <el-button class="el-button Drawerfollow" v-else
                >已关注</el-button
              >
            </div>
          </div>

          <!-- 底部视频列表 -->
          <div class="UperWorksVideosContainer">
            没有视频
            <!-- <div class="UperWorksVideosBox"></div> -->
          </div>
        </div>

        <!-- 评论 -->
        <div class="comment" v-else>
          <div class="commentNum">全部评论（{{ commentNum }}）</div>

          <!-- 评论详情 -->
          <div class="commentContainer" ref="commentContainer">
            <div
              class="commentBox"
              v-for="(item, index) in commentList"
              :key="index"
            >
              <!-- 单个评论 -->
              <!-- 头像 -->
              <div class="commentFace">
                <img :src="item.commentUserFace" alt="" />
              </div>

              <!-- 右侧内容 -->
              <div>
                <div class="sendName">
                  <span>{{ item.commentUserNickname }}</span>
                  <el-button
                    class="el-button"
                    @click="handleDeleteComment(item)"
                    >删除</el-button
                  >
                </div>
                <div class="CommentMsg">{{ item.content }}</div>

                <!-- 固定内容 -->
                <div class="commentFix">
                  <!-- 事件 -->
                  <div>{{ formatTime(item.createTime) }}</div>

                  <!-- 回复按钮 -->
                  <!-- <div class="reply" @click="handleReply(item)">
                    <i class="iconfont icon-huifu"></i>
                    <span>回复</span>
                  </div> -->

                  <!-- 喜欢评论 -->
                  <div class="likeCommentBox">
                    <i
                      class="iconfont icon-aixin"
                      :class="{ likeComment: item.isLike === 1 }"
                      @click="handleLikeComment(item)"
                    ></i>
                    <span>{{ item.likecounts }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 底部提示信息 -->
            <div class="commentBottom" v-show="commentList.length > 0">
              评论到底啦~
            </div>
          </div>

          <!-- 发送评论对话框 -->
          <div class="sendContainer">
            <div class="sendBox">
              <input
                type="text"
                placeholder="讲两句再走~"
                v-model="sendBoxText"
                @input="handleInput"
                @keyup.enter="handleCommentSend"
                maxlength="50"
              />
              <el-button class="el-button" @click="handleCommentSend"
                >biu~发送</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 控制条 -->
    <div class="control">
      <!-- 进度条 -->
      <input type="range" class="progressBar" v-model="processNumber" />

      <!-- 进度条按钮 -->
      <div class="buttons">
        <div class="buttonsLeft">
          <div @click="handlePlayPause">
            <el-icon v-if="VideoPause">
              <i class="iconfont icon-bofang"></i>
            </el-icon>
            <el-icon v-else>
              <i class="iconfont icon-tingzhibofang"></i>
            </el-icon>
          </div>

          <!-- 视频时长 -->
          <div>
            {{ TransTime(VideoCurrentLength) }}/{{ TransTime(totalLength) }}
          </div>
        </div>

        <div class="buttonsRight">
          <!-- 清屏 -->
          <div class="clearScreen">
            <el-switch size="small" v-model="tagShow"></el-switch>
            <span>清屏</span>
          </div>

          <!-- 倍速 -->
          <div>
            <el-dropdown placement="top" @command="handleSpeed">
              <span class="el-dropdown-link"> {{ SpeedNumber }} </span>
              <template #dropdown>
                <el-dropdown-menu class="speedList">
                  <el-dropdown-item command="0.75x">0.75x</el-dropdown-item>
                  <el-dropdown-item command="1.0x">1.0x</el-dropdown-item>
                  <el-dropdown-item command="1.25x">1.25x</el-dropdown-item>
                  <el-dropdown-item command="1.5x">1.5x</el-dropdown-item>
                  <el-dropdown-item command="2.0x">2.0x</el-dropdown-item>
                  <el-dropdown-item command="2.5x">2.5x</el-dropdown-item>
                  <el-dropdown-item command="3.0x">3.0x</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- 音量 -->
          <div>
            <el-dropdown placement="top" class="el-dropdown-voice">
              <div class="el-dropdown-link">
                <el-icon>
                  <i
                    class="iconfont icon-laba"
                    v-if="VoiceVolumn"
                    @click=";(VoiceVolumn = false), (VoiceVolumnNumber = 0)"
                  ></i>
                  <i
                    class="iconfont icon-shengyinjingyin"
                    v-else
                    @click=";(VoiceVolumn = true), (VoiceVolumnNumber = 100)"
                  ></i>
                </el-icon>
              </div>
              <template #dropdown>
                <div class="VoiceRange">
                  <div>{{ VoiceVolumnNumber }}</div>
                  <input
                    type="range"
                    v-model="VoiceVolumnNumber"
                    step="2"
                    @change="handleVoice"
                  />
                </div>
              </template>
            </el-dropdown>
          </div>

          <!-- 全屏 -->
          <div @click="handleFullScreen" class="fullScreen">
            <el-icon><i class="iconfont icon-quanping1"></i></el-icon>
          </div>
        </div>
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
.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}

/* flex */
.buttons,
.buttonsLeft,
.buttonsRight,
.inlinePlay,
.topContainer,
.sendBox,
.commentFix,
.UperWorksTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 视频 */
.topContainer {
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
}
.videoBox {
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  object-fit: contain;
  z-index: 1;
  display: flex;
  flex-shrink: none;
  background-color: #ffffff18;
  position: relative;
  overflow: hidden;
}
.videoBox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 110%;
  height: 110%;
  background-size: cover;
  background-position: center;
  background-image: inherit;
  filter: blur(15px);
  z-index: -1;
}
.videoBox:hover {
  cursor: pointer;
}
video {
  z-index: 2;
  object-fit: contain;
  margin: 0 auto !important;
}

/* 视频上方遮罩层 */
.videoHover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
}

/* 底部文字 */
.topContainerBottom {
  position: relative;
  width: 60%;
  height: 15%;
  bottom: -80%;
  left: 5%;
  text-align: left;
  overflow-y: scroll;
  scrollbar-width: none;
  text-shadow: 2px 2px 3px #b5b4b4;
  color: #ffffffe0;
  z-index: 1;
}
.topContainerBottom > div:first-child {
  font-size: 25px;
  line-height: 35px;
  font-weight: bold;
  user-select: none;
}
.topContainerBottom > div:nth-child(2) > span:first-child {
  font-size: 18px;
  line-height: 25px;
  user-select: none;
}
.topContainerBottom .TooLong {
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  color: #bbbaba;
}
.topContainerBottom .TooLong:hover {
  color: #eaeaea;
  cursor: pointer;
}

/* 右侧图标 */
.topContainerRight {
  z-index: 1;
  position: relative;
  width: 50px;
  height: 370px;
  color: #ffffff;
  left: 93%;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 3px #b5b4b4;
}
.topContainerRight .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 30px;
}
.topContainerRight > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: unset;
  height: 70px;
  padding: 10px 0;
}
.topContainerRight > div:hover {
  cursor: pointer;
  color: #ffffffa2;
}
.UperPic {
  width: 50px;
  height: 50px !important;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 100vh;
  background-color: #fff;
}
.UperPic > img {
  width: 100%;
}
.likeUper,
.likeComment {
  color: rgb(254, 44, 85) !important;
}
.CollectUper {
  color: rgb(255, 184, 2) !important;
}

/* 抽屉 */
.drawer {
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  transition: all 0.5s;
  background-color: rgba(27, 26, 26, 0.331);
  /* backdrop-filter: blur(3vh); */
  transform: translateX(100%);
  visibility: hidden;
  position: absolute;
  /* border-top-right-radius: 4vh; */
  left: 70%;
  padding: 0 1vw;
  z-index: 1;
  overflow: hidden;
}

/* drawerTab */
.drawerTab {
  width: 100%;
  height: 13%;
  background-color: transparent;
}
.drawerTab > .el-icon {
  color: #ffffffa9;
  font-size: 4vh;
  position: absolute;
  top: 4%;
  left: 86%;
}
.drawerTab > .el-icon:hover {
  color: #fff;
  cursor: pointer;
}
.DrawerShow {
  visibility: visible;
  transform: translateX(0);
}
.Tab {
  width: 80%;
  height: 100%;
  background-color: #ffffff00;
  border: 0;
}
.Tab > .el-menu-item {
  padding: 0 1vw;
  font-size: 2.7vh;
  color: #ffffffa9;
  background-color: transparent;
  user-select: none;
}
.Tab > .el-menu-item::after {
  content: '';
  width: 70%;
  height: 100%;
  position: absolute;
  left: 15%;
  background-color: transparent;
}
.Tab > .el-menu-item:hover::after {
  border-bottom: 0.4vh solid #ffffff57;
}
.Tab > .el-menu-item:hover {
  background-color: transparent;
  color: #fff;
}
.Tab > .activeTab,
.Tab > .el-menu-item:focus {
  border-bottom: 0.5vh solid rgb(254, 44, 85);
  color: #fff !important;
  background-color: transparent;
}
.Tab > .activeTab::after {
  border-bottom: transparent !important;
}

/* TA的作品 */
.UperWorks {
  height: 87%;
  width: 100%;
  /* background-color: #fff; */
}

/* 顶部作者信息 */
.UperWorksTop {
  height: 20%;
  color: #ffffffde;
  text-align: left;
  user-select: none;
  /* background-color: #b41f1f20; */
}
.UperWorksTop > div:first-child > div:first-child:hover {
  cursor: pointer;
  color: #fff;
}
.UperWorksTop > div:first-child > div:last-child {
  font-size: 3vh;
}
.UperWorksFollowButton {
  width: 25%;
  height: 35%;
}
.UperWorksFollowButton > .el-button {
  width: 100%;
  height: 100%;
  font-size: 2.3vh;
  border: 0;
  color: #ffffffde;
}
.UperWorksFollowButton > .DrawerNotfollow {
  background-color: rgb(254, 44, 85);
}
.UperWorksFollowButton > .Drawerfollow {
  background-color: #ffffff3f;
}

/* 底部视频容器 */
.UperWorksVideosContainer {
  height: 77%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
}
.UperWorksVideosBox {
  width: 27%;
  height: 35%;
  background-color: #ffffff30;
  border-radius: 2.5vh;
  margin: 1vh 0.5vw;
}
.commentBottom {
  height: 10%;
  font-size: 2.3vh;
  text-align: center;
  color: #555;
}

/* commentContainer */
.comment {
  height: 87%;
  width: 100%;
}
.commentNum {
  color: #ffffffa9;
  padding: 2vh 1vw;
  font-size: 2.5vh;
  text-align: left;
  background-color: transparent;
}
.commentContainer {
  height: 77%;
  width: 100%;
  overflow-y: scroll;
  color: #eaeaea;
  background-color: transparent;
  overscroll-behavior: contain; /* 阻止滚动传播到父元素 */
  scroll-behavior: smooth;
}

/* 评论Box */
.commentBox {
  width: 100%;
  height: auto;
  text-align: left;
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  margin: 2vh 0;
  /* background-color: #ffffff82; */
}
.commentBox > div:nth-child(2) {
  width: 83%;
}
.commentFace {
  width: 13%;
  margin-right: 2%;
  aspect-ratio: 1/1;
  background-color: #fff;
  overflow: hidden;
  border-radius: 100vh;
}
.commentBox img {
  width: 100%;
}
.commentBox .sendName {
  font-size: 2.2vh;
  margin-bottom: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffffe4;
}
.commentBox .sendName .el-button {
  width: 20%;
  margin-right: 5%;
  font-size: 2vh;
  background-color: #ffffff54;
  color: #ffffffe2;
  border: 0;
}
.commentBox .sendName .el-button:hover {
  background-color: rgba(199, 197, 197, 0.719);
}
.CommentMsg {
  width: 80%;
  font-size: 2.4vh;
  line-height: 4vh;
  color: #fff;
  word-wrap: break-word; /* 确保长单词可以换行 */
  word-break: break-all; /* 确保内容可以在任意位置换行 */
}
.commentBox .commentFix {
  justify-content: start;
  margin-top: 1.5vh;
  font-size: 2vh;
  color: #ffffffe2;
}
.commentBox .reply {
  font-size: 2vh;
  margin: 0 2vw;
}
.commentBox .reply:hover {
  cursor: pointer;
  color: #fff;
}
.likeCommentBox:hover {
  cursor: pointer;
}

.reply .iconfont {
  font-size: 2vh;
}
.likeCommentBox .iconfont {
  font-size: 2vh;
  margin-left: 2vw;
}

/* 子评论框 */
.childComment {
  width: 90%;
  margin-left: 10%;
}

/* 评论对话框 */
.sendContainer {
  height: 23%;
  width: 100%;
  background-color: transparent;
}
.sendBox {
  margin: 0 auto;
  background-color: rgb(51, 51, 51);
  width: 90%;
  border-radius: 2.5vh;
  padding: 1vh 1vw;
}
.sendBox > input {
  background-color: transparent;
  font-size: 2.5vh;
  outline: none;
  border: 0;
  color: #ffffffb4;
}
.sendBox > .el-button {
  font-size: 2vh;
  width: 25%;
  border: 0;
  color: #fff;
  background-color: rgba(254, 44, 86, 0.616);
}
.sendBox > .el-button:hover {
  background-color: rgb(254, 44, 85);
}

/* 滚动条样式 */
.commentContainer::-webkit-scrollbar,
.UperWorksVideosContainer::-webkit-scrollbar {
  width: 1vh; /* 滚动条宽度 */
  background-color: transparent; /* 滚动条背景颜色 */
}

/* 滚动条滑块样式 */
.commentContainer::-webkit-scrollbar-thumb,
.UperWorksVideosContainer::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 4px; /* 滑块圆角 */
}

/* 滑块悬停时的样式 */
.commentContainer::-webkit-scrollbar-thumb:hover,
.UperWorksVideosContainer::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块颜色 */
}

/* 滚动条轨道样式 */
.commentContainer::-webkit-scrollbar-track,
.UperWorksVideosContainer::-webkit-scrollbar-track {
  background-color: #f5f5f537; /* 轨道颜色 */
  border-radius: 4px; /* 轨道圆角 */
}

/* 进度条 */
.control {
  width: 100%;
  height: 75px;
  position: relative;
  /* top: 20px; */
}
.control .iconfont {
  font-family: 'iconfont', sans-serif;
  font-size: 30px;
}
.progressBar {
  width: 100%;
  height: 5px;
  position: relative;
  top: -14px;
  /* 未填充部分颜色 */
  background-color: #ffffff3b;
  -webkit-appearance: none; /* 清除默认样式 */
}

.progressBar::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 10px;
  height: 5px;
  background: #ffffff90; /* 滑块颜色 */
  border-radius: 20%;
}

/* 悬停效果 */
.progressBar:hover::-webkit-slider-thumb {
  transform: scale(1.3);
  cursor: pointer;
}

/* 聚焦效果 */
.progressBar:focus {
  outline: none;
}

/* 控制条按钮 */
.buttons {
  color: #ffffffad;
  font-size: 20px;
  height: 73px;
  padding: 0 40px;
  position: relative;
  top: -18px;
  background: rgba(22, 24, 35, 0.715);
}
.buttonsLeft {
  width: 180px;
  height: 70px;
}
.buttonsRight {
  width: 300px;
}

.buttonsRight > div:first-child {
  width: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 播放 */
.buttons > div:first-child > div:first-child:hover {
  color: #fff;
  cursor: pointer;
}

/* 清屏 */
.clearScreen {
  padding-bottom: 2%;
}

/* 倍速 */
.el-dropdown-link {
  outline: none;
  font-size: 20px;
  color: #ffffffad;
}
.el-dropdown-link:hover {
  cursor: pointer;
}

/* 音量条框 */
.VoiceRange {
  height: 50px;
  width: 250px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  border-radius: 20px;
  color: #000000;
}
.VoiceRange > input {
  width: 200px;
  height: 20px;
}
.VoiceRange > div {
  width: 45px;
  text-align: center;
}

/* 全屏 */
.fullScreen:hover {
  cursor: pointer;
  color: #fff;
}
</style>
