<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import router from '@/router'
import { applyGetInfo } from '@/api/apply'
import { useFlagStore } from '@/stores/modules/flagStore'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const { progress, registerInfo } = storeToRefs(useFlagStore())

// 处理截止时间
const day = ref(0)
const hour = ref(0)
const min = ref(0)
const sec = ref(0)

// ✅ 报名开始 & 截止时间（注意月份 0 = 一月）
const startTime = new Date(2025, 9, 13, 0, 0) // 9月20日
const finalTime = new Date(2025, 9, 17, 0, 0) // 10月9日
const ifTimeout = ref(false)
const ifNotStarted = ref(false)

// 报名按钮文字 & 是否显示
const buttonText = ref('')
const ifButtonShow = ref(false)

// 时间线结点
const timeSpots = [
  { content: '报名' },
  { content: '一面' },
  { content: '二面' },
  { content: '通过' },
]

// 步骤条状态
const processStatus = ref('process')

// 倒计时
const handleTime = () => {
  const now = new Date()

  if (now < startTime) {
    ifNotStarted.value = true
    ifTimeout.value = false
    ifButtonShow.value = false
    return
  }

  const diff = finalTime - now
  if (diff <= 0) {
    ifButtonShow.value = false
    ifTimeout.value = true
    ifNotStarted.value = false

    if (timer) {
      clearInterval(timer)
      timer = null
    }
    return
  }

  ifNotStarted.value = false
  ifTimeout.value = false
  ifButtonShow.value = true

  day.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hour.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  min.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  sec.value = Math.floor((diff % (1000 * 60)) / 1000)
}

let timer = null

// 跳转表格页
const handleRegisterTable = () => {
  router.push('/registerTable')
}

// 处理按钮文字、进度、状态
const handleButtonText = () => {
  const map = {
    0: {
      progress: 0,
      status: 'wait',
      buttonText: '报名',
      show: true,
    },
    1: {
      已报名: {
        progress: 1,
        status: 'process',
        buttonText: '修改报名信息',
        show: true,
      },
      default: {
        progress: 1,
        status: 'error',
        buttonText: '',
        show: false,
      },
    },
    2: {
      一面通过: {
        progress: 2,
        status: 'process',
        buttonText: '选择二面时间',
        show: true,
      },
      default: {
        progress: 2,
        status: 'error',
        buttonText: '',
        show: false,
      },
    },
    3: {
      progress: 3,
      status: 'success',
      buttonText: '',
      show: false,
    },
  }

  const status = registerInfo.value.status
  const message = registerInfo.value.message

  let config = map[status]
  if (!config) return

  if (typeof config[message] !== 'undefined') {
    config = config[message]
  } else if (config.default) {
    config = config.default
  }

  progress.value = config.progress
  processStatus.value = config.status
  buttonText.value = config.buttonText
  ifButtonShow.value = config.show
}

// 获取报名信息
const getApplyInfo = async () => {
  try {
    const res = await applyGetInfo()
    console.log('报名信息', res)
    if (res.data.data) {
      registerInfo.value = res.data.data
    } else {
      registerInfo.value = {
        status: 0,
        message: '未报名',
      }
    }
    handleButtonText()
  } catch (e) {
    ElMessage.error('获取报名信息失败，请稍后再试！')
    console.log('获取报名信息失败', e)
    router.push('/')
  }
}

watch(progress, () => {
  handleButtonText()
})

onMounted(() => {
  handleTime()
  getApplyInfo()
  if (registerInfo.value) {
    timer = setInterval(handleTime, 1000)
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div class="container">
    <!-- 信息 -->
    <div class="info">
      <div class="register">
        <!-- 左侧文字 -->
        <div class="regLeft">
          <!-- 顶部加粗 -->
          <div class="bold">
            <div>欢迎加入软件科技协会！</div>
            <button v-if="ifButtonShow" @click="handleRegisterTable">
              {{ buttonText }}
            </button>
          </div>

          <!-- 倒计时、报名 -->
          <div class="regLeftBottom">
            <div class="timer">
              <div v-if="ifNotStarted">二面报名尚未开始</div>
              <div v-else-if="ifTimeout">二面已结束</div>
              <div v-else>
                <div>二面结束倒计时：</div>
                <div>{{ day }} 天 {{ hour }} 时 {{ min }} 分 {{ sec }} 秒</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <!-- 要求 -->
      <div class="reqirement">
        <h1>面试要求</h1>

        <div class="C">
          <h2>C 语言</h2>
          <span>掌握到链表之前</span>
        </div>

        <div class="suanFa">
          <h2>算法</h2>
          <span>会基本的排序算法,例如冒泡排序</span>
        </div>

        <div class="jiShi">
          <h2>机试</h2>
          <span>能在电脑上做出常规题目</span>
        </div>
      </div>

      <hr />

      <!-- 面试地点 -->
      <div class="place">
        <h1>面试地点</h1>
        <span>长安校区逸夫楼ff106</span>
      </div>
    </div>

    <!-- 联系我们 -->
    <div class="official">
      <h1>联系我们</h1>

      <div>
        <div>
          <h2>地理位置</h2>
          <span>长安校区逸夫楼fz129</span>
        </div>

        <div>
          <h2>微信公众号</h2>
          <img src="../assets/weixin.jpg" alt="" />
        </div>

        <div>
          <h2>QQ群</h2>
          <img src="../assets/QQ.png" alt="" />
        </div>
      </div>
    </div>

    <!-- 报名进度 -->
    <div class="progress">
      <div style="height: 50vh; max-width: 30vw">
        <el-steps
          direction="vertical"
          finish-status="success"
          :process-status="processStatus"
          :active="progress"
          align-center
        >
          <el-step :title="item.content" v-for="(item, index) in timeSpots" :key="index" />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bold,
.C,
.suanFa,
.jiShi,
.official > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

hr {
  width: 70vw;
  border: 1px solid #dadada;
  margin: 2vw 0;
}

/* 左侧信息 */
.info {
  width: 80vw;
  padding: 0 5%;
}

/* 报名 */
.register {
  width: 100%;
  height: 45vh;
  padding: 5vh 0;
  overflow: hidden;
}
.regLeft {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.regLeft > .bold {
  width: 100%;
  font-size: 3vw;
  font-weight: bold;
  line-height: 5vw;
}
.regLeftBottom {
  width: 100%;
}
.timer > div:first-child {
  font-size: 1.3vw;
}
.timer > div:last-child {
  font-size: 2vw;
  font-weight: bold;
}
.bold button {
  width: 13vw;
  height: 3vw;
  border-radius: 1.5vw;
  border: 0;
  font-size: 1.5vw;
  background-color: rgb(219, 219, 219);
}
.bold button:hover {
  cursor: pointer;
  background-color: rgb(195, 195, 195);
}

/* 要求 */
.reqirement,
.place {
  width: 100%;
  padding: 5vh 0;
}
.reqirement h1,
.place h1,
.official h1 {
  font-size: 2.5vw;
  margin-bottom: 2vw;
}
.reqirement span,
.place span {
  font-size: 1.5vw;
}
.C,
.suanFa,
.jiShi {
  width: 100%;
  height: 20vh;
  justify-content: start;
}
.C h2,
.suanFa h2,
.jiShi h2 {
  font-size: 2vw;
  margin-right: 2vw;
  height: 80%;
  aspect-ratio: 1;
  text-align: left;
  position: relative;
  align-content: center;
}
.place {
  margin-bottom: 2vw;
}

/* 联系我们 */
.official {
  width: 100%;
  padding: 3vw 5%;
  padding-right: 25%;
  height: 50vh;
  background-color: rgb(245, 245, 247);
}
.official h2 {
  font-size: 1.5vw;
  margin-bottom: 2vw;
}
.official span {
  font-size: 1.3vw;
}
.official > div {
  width: 100%;
  height: 80%;
  align-items: start;
}
.official > div > div {
  text-align: center;
  height: 100%;
}
.official > div > div img {
  height: 8vw;
}

/* 进度 */
.progress {
  position: fixed;
  top: 20%;
  right: 7%;
}

@media (max-width: 768px) {
  .progress {
    top: 15%;
  }

  hr {
    width: 60vw;
  }

  .register {
    height: 20vh;
    padding: 2vh 0;
  }
  .regLeft > .bold {
    font-size: 2.5vh;
    flex-direction: column;
    height: 8vh;
    align-items: start;
  }
  .timer > div:first-child {
    font-size: 1.5vh;
  }
  .timer > div:last-child {
    font-size: 2vh;
  }
  .bold button {
    width: 25vw;
    height: 7vw;
    border-radius: 4vw;
    font-size: 1.5vh;
  }

  .reqirement,
  .place {
    padding: 2vh 0;
  }
  .reqirement h1,
  .place h1,
  .official h1 {
    font-size: 2.5vh;
    margin-bottom: 2vh;
  }
  .reqirement span,
  .place span {
    font-size: 1.5vh;
  }
  .C,
  .suanFa,
  .jiShi {
    height: 10vh;
  }
  .C h2,
  .suanFa h2,
  .jiShi h2 {
    font-size: 2vh;
  }

  .official {
    height: 25vh;
    padding: 3vh 5%;
    padding-right: 20%;
  }
  .official h2 {
    font-size: 1.5vh;
  }
  .official span {
    font-size: 1.3vh;
  }
  .official > div > div img {
    height: 8vh;
  }
}
</style>
