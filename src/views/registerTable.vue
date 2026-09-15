<script setup>
import { ref, onMounted } from 'vue'
import { applyAdd, applySecond, applyGetTime, applyUpdate } from '@/api/apply'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { useFlagStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { registerInfo } = storeToRefs(useFlagStore())

// 面试时间
const Times = ref([])

// 意向
const intentions = ['前端', 'GO', 'Java']

// 信息
const number = ref()
const name = ref()
const majorClass = ref()
const telephone = ref()
const intention = ref()
const comTime = ref()

// 检验信息
const check = () => {
  if (!telephone.value) {
    ElMessage.error('手机号不能为空！')
    return false
  }

  // 检查手机号格式
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!phoneRegex.test(telephone.value)) {
    ElMessage.error('手机号格式不正确')
    telephone.value = ''
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
    let res

    if (registerInfo.value.status === 2) {
      res = await applySecond(comTime.value)
      console.log('选择二面时间', res)
      ElMessage.success('选择二面时间成功')
    } else if (registerInfo.value.status === 1) {
      res = await applyUpdate(
        number.value,
        name.value,
        majorClass.value,
        telephone.value,
        comTime.value,
        intention.value,
      )
      console.log('修改报名信息返回值', res)
      if (res.data.code !== 200) {
        ElMessage.warning(res.data.message)
        return
      }
      ElMessage.success('修改报名信息成功！')
    } else {
      res = await applyAdd(
        number.value,
        name.value,
        majorClass.value,
        telephone.value,
        comTime.value,
        intention.value,
      )
      console.log('报名返回值', res)
      if (res.data.code !== 200) {
        ElMessage.warning(res.data.message)
        return
      }
      ElMessage.success('报名成功')
    }

    router.push('./register')
  } catch (e) {
    console.log(e)
    ElMessage.error('提交失败，请再次尝试')
    return
  }
}

// 获取面试时间
const getTimes = async (n) => {
  try {
    const res = await applyGetTime(n)
    console.log('获取面试时间', res)
    Times.value = [...res.data.data]
  } catch (e) {
    console.log('获取面试时间失败', e)
    router.push('/register')
    return
  }

  initialInfo()
}

// 初始化信息
const initialInfo = () => {
  if (registerInfo.value.status > 0) {
    name.value = registerInfo.value.name
    number.value = registerInfo.value.number
    majorClass.value = registerInfo.value.majorClass
    telephone.value = registerInfo.value.telephone
    intention.value = registerInfo.value.intention

    // 时间赋值
    if (registerInfo.value.status === 1) {
      comTime.value = registerInfo.value.firstTime
    } else if (registerInfo.value.status === 2) {
      comTime.value = registerInfo.value.secondTime
    }
  } else {
    // 默认值
    console.log('时间id', typeof Times.value[0].id, Times.value[0].id)
    comTime.value = Times.value.length > 0 ? Times.value[0].id : null
    intention.value = intentions[0]
  }
}

onMounted(() => {
  if (registerInfo.value.status === 0 || registerInfo.value.status === 1) {
    getTimes(1)
  } else if (registerInfo.value.status === 2) {
    getTimes(2)
  }
})
</script>

<template>
  <div class="container">
    <div class="title">
      <div>报名</div>
    </div>

    <!-- 报名信息 -->
    <form class="box" @submit.prevent="handleSubmit">
      <div>
        <div>
          <input
            type="text"
            placeholder="学号"
            v-model="number"
            required
            :disabled="registerInfo.status > 1"
          />
        </div>
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="姓名"
            v-model="name"
            required
            :disabled="registerInfo.status > 1"
          />
        </div>
      </div>

      <div>
        <div>
          <input
            type="text"
            placeholder="专业班级"
            v-model="majorClass"
            required
            :disabled="registerInfo.status > 1"
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
            :disabled="registerInfo.status > 1"
          />
        </div>
      </div>

      <div>
        <div class="time">
          面试时间：
          <select name="time" id="" v-model="comTime">
            <option :value="item.id" v-for="item in Times" :key="item.id">
              {{ item.time }}
            </option>
          </select>
        </div>
      </div>

      <div v-show="registerInfo.status <= 1">
        <div class="intention">
          意向方向：
          <select name="intention" id="" v-model="intention">
            <option :value="item" v-for="(item, index) in intentions" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <button class="button" type="submit">
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
  width: 100% !important;
  justify-content: start;
}
select {
  width: 70%;
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
    width: 70%;
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
