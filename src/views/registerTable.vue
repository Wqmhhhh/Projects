<script setup>
import { ref, onMounted } from 'vue'
import { applyAdd, applyGetInfo, applySecond } from '@/api/apply'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { useFlagStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { ifRegister, progress } = storeToRefs(useFlagStore())

// 面试时间
const Times = ['9月12日 9:00', '9月13日 9:00', '9月14日 9:00']

// 意向
const intentions = ['前端', 'GO', 'Java']

// 信息
const number = ref()
const name = ref()
const majorClass = ref()
const telephone = ref()
const intention = ref(intentions[0])
const comTime = ref(Times[0])

// 检验信息
const check = () => {
  if (!telephone.value) {
    return false
  }

  // 检查手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(telephone.value)) {
    ElMessage.error('手机号格式不正确')
    return false
  }

  return true
}

// 处理提交
const handleSubmit = async () => {
  if (!check()) {
    return
  }

  try {
    const res = await applyAdd(
      number.value,
      name.value,
      majorClass.value,
      telephone.value,
      comTime.value,
      intention.value
    )
    console.log(res)
    ElMessage.success('报名成功！')
  } catch (e) {
    console.log(e)
    ElMessage.error('提交失败，请再次尝试')
    return
  }

  ifRegister.value = true

  // 成功后返回报名页面
  router.push('./register')
  location.reload()
}

// 初始化信息
const initialInfo = async () => {
  try {
    const res = await applyGetInfo()
    console.log(res)
  } catch {
    ElMessage.error('获取报名信息失败')
  }

  // TODO:获取报名信息后决定获取第几次的面试时间
  getTimes(1)

  // TODO：给信息赋值
}

// 获取面试时间
const getTimes = async (n) => {
  try {
    const res = await applySecond(n)
    console.log(res)
  } catch (e) {
    console.log(e)
    ElMessage.error('获取面试时间失败')
    router.push('./register')
    return
  }
}

onMounted(() => {
  if (progress.value < 1) {
    initialInfo()
  }
})
</script>

<template>
  <div class="container">
    <div class="title">
      <div>报名</div>
    </div>

    <!-- 报名信息 -->
    <form class="box" @submit.prevent>
      <div>
        <div>
          <input
            type="text"
            placeholder="学号"
            v-model="number"
            required
            :disabled="progress > 1"
          />
        </div>
      </div>

      <div>
        <div>
          <input type="text" placeholder="姓名" v-model="name" required :disabled="progress > 1" />
        </div>
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="专业班级"
            v-model="majorClass"
            required
            :disabled="progress > 1"
          />
        </div>
      </div>

      <div>
        <div>
          <input
            type="tel"
            placeholder="手机号"
            v-model="telephone"
            required
            :disabled="progress > 1"
          />
        </div>
      </div>

      <div>
        <div class="time">
          面试时间：
          <select name="time" id="" v-model="comTime">
            <option :value="item" v-for="(item, index) in Times" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <div v-show="progress <= 1">
        <div class="intention">
          意向方向：
          <select name="intention" id="" v-model="intention">
            <option :value="item" v-for="(item, index) in intentions" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <button class="button" type="submit" @click="handleSubmit">
        <div>提交</div>
      </button>
    </form>
  </div>
</template>

<style scoped>
.box > div,
.button {
  display: flex;
  align-items: center;
  justify-content: start;
}

.container {
  width: 80%;
  margin: 0 auto;
  background-color: #f0eeee88;
  border-radius: 2vh;
  padding: 2%;
}
.title {
  font-size: 3vw;
  font-weight: normal;
  text-align: center;
}
.box {
  width: 100%;
  height: 70vh;
  padding: 10vh 0;
  display: grid;
  grid-template-columns: repeat(2, 40%);
  grid-template-rows: repeat(3, 10vh) 20vh;
  grid-gap: 5vh 20%;
}
.box > div {
  width: 100%;
  height: 100%;
  border-radius: 100vh;
  padding: 2% 5%;
  background-color: rgb(230, 230, 230);
  font-size: 1.5vw;
}
.box > div > div {
  width: 100%;
}
.box input {
  width: 95%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.5vw;
}

/* 选择框 */
.time,
.intention {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.intention,
.time {
  width: 90% !important;
  justify-content: start;
}
select {
  width: 50%;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 1.3vw;
}

/* 按钮 */
.button {
  font-size: 1.5vw;
  width: 40%;
  height: 10vh;
  margin-top: 5vh;
  background-color: #333 !important;
  color: #fff;
  justify-content: center;
  border-radius: 100vh;
  grid-column: 1 / -1; /* 按钮占据整行 */
  justify-self: center; /* 按钮水平居中 */
}
.button:hover {
  cursor: pointer;
}

@media (max-width: 768px) {
  .title {
    font-size: 3vh;
  }
  .container {
    width: 90%;
    padding-top: 5vh;
    padding-bottom: 10vh;
  }
  .box {
    height: 55vh;
    padding: 4vh 5%;
    grid-template-columns: 100%;
    grid-template-rows: repeat(6, 5vh);
    grid-gap: 3vh 0;
  }
  .box > div {
    font-size: 2vh;
  }
  select {
    width: 50%;
    font-size: 1.8vh;
  }
  .box input {
    font-size: 2vh;
  }
  .button {
    width: 100%;
    margin-top: 2vh;
    height: 5vh;
    font-size: 2vh;
  }
}
</style>
