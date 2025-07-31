<script setup>
import { ref } from 'vue'
// import router from '@/router'

// 登录1 注册2
const option = ref(1)
// 邮箱
const email = ref()
// 验证码
const smsCode = ref()
// 密码
const passWord = ref()
// 验证密码
const repeatPassWord = ref()
// 验证码按钮内容
const smsCodeButton = ref('获取验证码')
const ifSmsCodeDisabled = ref(false)

// 清空所有信息
const clearAll = () => {
  email.value = ''
  smsCode.value = ''
  passWord.value = ''
  repeatPassWord.value = ''
}

// 处理登录、注册切换
const handleChange = () => {
  option.value = option.value === 1 ? 2 : 1
  clearAll()
}

// 处理注册
const handleRegister = () => {
  console.log('注册')
}

// 处理登录
const handleLogin = () => {
  console.log('登录')
}

// 处理发送验证码
</script>

<template>
  <div class="container">
    <div class="box">
      <!-- 登录 or 注册 -->
      <div class="title">
        <div v-if="option === 1">登录</div>
        <div v-else-if="option === 2">注册</div>
      </div>

      <!-- 邮箱 -->
      <div>
        <div>
          <i class="iconfont icon-youxiang"></i>
          <input type="email" placeholder="邮箱" v-model="email" />
        </div>
      </div>

      <!-- 邮箱验证码 -->
      <div v-show="option === 2">
        <div class="smsCode">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" placeholder="验证码" v-model="smsCode" />
        </div>
        <button @click="handleSmsCode" :disabled="ifSmsCodeDisabled">{{ smsCodeButton }}</button>
      </div>

      <!-- 密码 -->
      <div>
        <div>
          <i class="iconfont icon-mima"></i>
          <input type="password" placeholder="密码" v-model="passWord" />
        </div>
      </div>

      <!-- 再次输入密码 -->
      <div v-show="option === 2">
        <div>
          <i class="iconfont icon-mima"></i>
          <input type="password" placeholder="再次输入密码" v-model="repeatPassWord" />
        </div>
      </div>

      <!-- 登录按钮 -->
      <div class="button">
        <div v-if="option === 1" @click="handleLogin">登录</div>
        <div v-else @click="handleRegister">注册</div>
      </div>

      <!-- 忘记密码 -->
      <div>
        <div v-show="option === 1" @click="handleChange">忘记密码</div>
      </div>

      <!-- 注册账号 -->
      <div>
        <div v-if="option === 1" @click="handleChange">注册</div>
        <div v-else @click="handleChange">登录</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* flex */
.container,
.box div:not(:first-child, :last-child) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

/* iconfont */
.iconfont {
  font-family: 'iconfont';
  font-size: 1.5vw;
  color: rgb(102, 102, 102);
  margin-right: 5%;
}

.container {
  width: 100%;
  overflow: hidden;
}
.box {
  margin-top: 5vh;
  width: 30%;
  height: 80vh;
  background-color: #f0eeee88;
  border-radius: 2vh;
  padding: 2vh 1vw;
}
.title div {
  font-size: 2vw;
  font-weight: normal;
}
.box > div:not(:first-child, :last-child, :nth-child(7)) {
  width: 80%;
  height: 13%;
  padding: 3% 5%;
  border-radius: 100vh;
  background-color: rgb(230, 230, 230);
  justify-content: start;
}
.box input {
  width: 80%;
  height: 90%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.3vw;
}
.box > div:last-child,
.box > div:nth-child(7) {
  color: #333;
  font-size: 1.1vw;
}
.box > div:last-child:hover,
.box > div:nth-child(7):hover {
  cursor: pointer;
}
.smsCode + button {
  width: 40%;
  height: 90%;
  font-size: 1vw;
}
.smsCode + button:hover {
  cursor: pointer;
}

/* 按钮 */
.button {
  font-size: 1.5vw;
  background-color: #333 !important;
  color: #fff;
  justify-content: center !important;
}
.button:hover {
  cursor: pointer;
}

@media (max-width: 768px) {
  .box {
    margin-top: 10vh;
    width: 80%;
    height: 70vh;
  }
  .iconfont {
    font-size: 2vh;
  }
  .title div {
    font-size: 3vh;
  }
  .box input {
    font-size: 2vh;
  }
  .box > div:last-child,
  .box > div:nth-child(7) {
    font-size: 1.5vh;
  }
  .button {
    font-size: 2vh;
  }
  .smsCode + button {
    font-size: 1.5vh;
    height: 80%;
  }
}
</style>
