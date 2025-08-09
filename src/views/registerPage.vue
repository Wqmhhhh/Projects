<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import router from '@/router'
import { applyGetInfo } from '@/api/apply'
import { useFlagStore } from '@/stores/modules/flagStore'
import { storeToRefs } from 'pinia'

const { ifRegister, progress, ifSeconRegister } = storeToRefs(useFlagStore())

// 处理截止时间
const day = ref(0)
const hour = ref(0)
const min = ref(0)
const finalTime = new Date(2025, 7, 25, 0, 0)
const ifTimeout = ref(false)
// 时间线结点类型
let timeSpots = [
  {
    content: '报名',
    status: 'wait',
  },
  {
    content: '一面',
    status: 'process',
  },
  {
    content: '二面',
    status: 'error',
  },
  {
    content: '通过',
    status: 'success',
  },
]

// 处理倒计时
const handleTime = () => {
  const date = new Date()
  const diff = finalTime - date
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    day.value = days
    hour.value = hours
    min.value = minutes
  } else {
    day.value = 0
    hour.value = 0
    min.value = 0
    clearInterval(timer)
    ifTimeout.value = true
  }
}
const timer = setInterval(() => {
  handleTime()
}, 60000)

// 报名
const handleRegister = () => {
  router.push('/registerTable')
}

// 修改报名信息
const handleChangeRegister = () => {}

// 二面报名
const handleSecond = () => {}

// 修改二面报名信息
const handleChangeSecond = () => {}

// 获取报名信息
const getApplyInfo = async () => {
  const res = await applyGetInfo()
  console.log(res)

  // TODO：修改按钮（根据是否有二面时间决定二面按钮的效果）、报名进度
}

onMounted(() => {
  handleTime()
  getApplyInfo()
})

onUnmounted(() => {
  clearInterval(timer)
})

// 暂时信息
const processStatus = ref('process') // TODO:二面失败显示 error
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
            <div v-show="progress <= 1">
              <button @click="handleChangeRegister" v-if="ifRegister">修改报名信息</button>
              <button @click="handleRegister" v-else>报名</button>
            </div>

            <div v-show="progress > 1">
              <button @click="handleSecond" v-if="!ifSeconRegister">选择二面时间</button>
              <button @click="handleChangeSecond" v-else>修改二面时间</button>
            </div>
          </div>

          <!-- 倒计时、报名 -->
          <div class="regLeftBottom" v-show="!ifTimeout">
            <div class="timer">
              <div>报名结束倒计时：</div>
              <div>{{ day }} 天 {{ hour }} 时 {{ min }} 分</div>
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
        <span>长安校区逸夫楼fz106</span>
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
          :active="progress"
          :process-status="processStatus"
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

.iconfont {
  font-family: 'iconfont';
}

hr {
  width: 70vw;
  border: 1px solid #dadada;
  margin: 2vw 0;
}

/* 左侧信息 */
.info {
  width: 60vw;
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
  /* 信息 */
  /* 报名 */
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

  /* 要求 */
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

  /* 联系我们 */
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
