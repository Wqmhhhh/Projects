<script setup>
import { ref } from 'vue'

// 一面时间
const firstTimes = ['9月12日', '9月13日', '9月14日']

const timeArr = ['下午7:00', '下午9:00']

// 意向
const intentions = ['前端', 'GO', 'Java']
// 学号
const number = ref()
const name = ref()
const majorClass = ref()
const telephone = ref()
// const intention = ref()
// const firstTime = ref()
</script>

<template>
  <div class="container">
    <div class="title">
      <div>报名</div>
    </div>

    <!-- 报名信息 -->
    <div class="box">
      <div>
        <div>
          <input type="text" placeholder="学号" v-model="number" />
        </div>
      </div>

      <div>
        <div>
          <input type="text" placeholder="姓名" v-model="name" />
        </div>
      </div>

      <div>
        <div>
          <input type="text" placeholder="专业班级" v-model="majorClass" />
        </div>
      </div>

      <div>
        <div>
          <input type="tel" placeholder="手机号" v-model="telephone" />
        </div>
      </div>

      <div>
        <div class="time">
          面试时间：
          <select name="day" id="">
            <option :value="item" v-for="(item, index) in firstTimes" :key="index">
              {{ item }}
            </option>
          </select>
          <select name="time" id="">
            <option :value="item" v-for="(item, index) in timeArr" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <div class="intention">
          意向方向：
          <select name="intention" id="">
            <option :value="item" v-for="(item, index) in intentions" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="button">
      <div @click="handleSubmit">提交</div>
    </div>
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
  height: 60vh;
  padding: 10vh 0;
  display: grid;
  grid-template-columns: repeat(2, 40%);
  grid-template-rows: repeat(3, 10vh);
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
.intention {
  width: 80% !important;
  justify-content: start;
}
select {
  width: 30%;
  background-color: transparent;
  border: 0;
  outline: none;
  font-size: 1.3vw;
}
.intention select {
  width: 50%;
}

/* 按钮 */
.button {
  font-size: 1.5vw;
  width: 40%;
  height: 10vh;
  margin: 0 auto;
  background-color: #333 !important;
  color: #fff;
  justify-content: center;
  border-radius: 100vh;
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
    width: 34%;
    font-size: 1.8vh;
  }
  .box input {
    font-size: 2vh;
  }
  .button {
    width: 90%;
    height: 5vh;
    font-size: 2vh;
  }
}
</style>
