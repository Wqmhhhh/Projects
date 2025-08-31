<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { userRegister, userLogin, userUpdatePassword, emailSendCode } from '@/api/chat'
import router from '@/router'
// import router from '@/router'

// 导入库
import { useChatUserInfo } from '@/stores'
import { storeToRefs } from 'pinia'
const userChat = useChatUserInfo()
const { emailToken, email: storeEmail } = storeToRefs(userChat)

// 登录1 注册2 忘记密码3
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
const handleChange = (n) => {
  option.value = n
  clearAll()
}

// 检测邮箱格式
const checkEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // 使用正则表达式测试邮箱地址
  if (emailRegex.test(email)) {
    return true
  } else {
    return false
  }
}

// 检验密码位数
const checkPassWord = () => {
  if (passWord.value.length < 8) {
    ElMessage('密码最少为8位')
    passWord.value = ''
    return false
  } else if (passWord.value.length > 16) {
    ElMessage('密码最多为16位')
    passWord.value = ''
    return false
  } else {
    return true
  }
}

// 检验两次密码是否一致
const checkSame = () => {
  if (passWord.value !== repeatPassWord.value) {
    passWord.value = ''
    repeatPassWord.value = ''
    ElMessage('两次密码输入不一致')
  }
}

// TODO：检测所有:有问题
const checkAll = () => {
  if (!email.value) {
    ElMessage.error('邮箱不能为空')
    return false
  } else if (!smsCode.value) {
    ElMessage.error('验证码不能为空')
    return false
  } else if (!passWord.value || !repeatPassWord.value) {
    ElMessage.error('密码不能为空')
    return false
  }

  if (!checkPassWord() || !checkSame()) {
    return false
  }

  return true
}

// 处理注册
const handleRegister = async () => {
  // if (!checkAll()) {
  //   return
  // }

  try {
    const res = await userRegister(email.value, passWord.value, smsCode.value)
    console.log('注册返回', res)
    ElMessage.success('注册成功！')
  } catch (e) {
    console.log('注册错误', e)
    ElMessage.error('注册失败，请稍后再试')
    clearAll()
    return
  }

  // 注册成功跳转登录
  handleChange(1)
}

// 处理登录
const handleLogin = async () => {
  if (!email.value) {
    ElMessage.error('邮箱不能为空')
    return
  } else if (!passWord.value) {
    ElMessage.error('密码不能为空')
    return
  }

  if (!checkPassWord()) {
    return
  }

  // 发送请求
  try {
    const res = await userLogin(email.value, passWord.value)
    console.log('登录返回', res)
    ElMessage.success('登录成功！')

    emailToken.value = res.data.data.token.access_token
    storeEmail.value = res.data.data.param_user_info.email
  } catch (e) {
    console.log('登录错误', e)
    ElMessage.error('登录失败，请稍后再试')
    clearAll()
    return
  }

  // 登录成功跳转chat页面
  router.push('/chatSelect')
}

// 处理修改密码
const handleChangePassword = async () => {
  if (!checkAll()) {
    return
  }

  const res = await userUpdatePassword(smsCode.value, passWord.value)
  console.log(res)

  // 修改成功跳转登录
  handleChange(1)
}

// 处理发送验证码
let timer
let num = 60
const handleSendSmsCode = async () => {
  if (!email.value) {
    ElMessage.error('邮箱不能为空')
    return
  } else if (!checkEmail(email.value)) {
    return
  }

  // 验证码按钮设为禁用
  ifSmsCodeDisabled.value = true

  // 调用接口
  try {
    const res = await emailSendCode(email.value)
    console.log('验证码返回', res)
    ElMessage.success('验证码发送成功！')
  } catch (e) {
    console.log('验证码错误', e)
    ElMessage.error('验证码发送失败')
    ifSmsCodeDisabled.value = false
  }

  // 设置倒计时
  timer = setInterval(() => {
    if (num > 0) {
      num--
      smsCodeButton.value = `${num} 秒`
    } else {
      smsCodeButton.value = '获取验证码'
      clearInterval(timer)
      timer = null
      num = 60
      ifSmsCodeDisabled.value = false
    }
  }, 1000)
}
</script>

<template>
  <div class="container">
    <form class="box" @submit.prevent>
      <!-- 登录 or 注册 -->
      <div class="title">
        <div v-if="option === 1">登录</div>
        <div v-else-if="option === 2">注册</div>
        <div v-else-if="option === 3">忘记密码</div>
      </div>

      <!-- 邮箱 -->
      <div>
        <div>
          <input type="email" placeholder="邮箱" v-model="email" autocomplete="email" />
        </div>
      </div>

      <!-- 邮箱验证码 -->
      <div v-show="option === 2 || option === 3">
        <div class="smsCode">
          <input type="text" placeholder="验证码" v-model="smsCode" autocomplete="off" />
        </div>
        <button @click="handleSendSmsCode" :disabled="ifSmsCodeDisabled">
          {{ smsCodeButton }}
        </button>
      </div>

      <!-- 密码 -->
      <div>
        <div>
          <input
            type="password"
            placeholder="密码 (8-16位)"
            v-model="passWord"
            autocomplete="current-password"
          />
        </div>
      </div>

      <!-- 再次输入密码 -->
      <div v-show="option === 2 || option === 3">
        <div>
          <input
            type="password"
            placeholder="再次输入密码"
            v-model="repeatPassWord"
            autocomplete="new-password"
          />
        </div>
      </div>

      <!-- 登录按钮 -->
      <button class="button" type="submit">
        <div v-if="option === 1" @click="handleLogin">登录</div>
        <div v-else-if="option === 2" @click="handleRegister">注册</div>
        <div v-else-if="option === 3" @click="handleChangePassword">修改</div>
      </button>

      <!-- 忘记密码 -->
      <div>
        <div v-show="option === 1" @click="handleChange(3)">忘记密码</div>
      </div>

      <!-- 注册账号 -->
      <div>
        <div v-if="option === 1" @click="handleChange(2)">注册</div>
        <div v-else @click="handleChange(1)">登录</div>
      </div>
    </form>
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

.container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(22, 24, 35);
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
  width: 70%;
  height: 7%;
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
  width: 80%;
  height: 13%;
  border-radius: 100vh;
  display: block;
  font-size: 1.5vw;
  background-color: #333 !important;
  color: #fff;
  justify-content: center !important;
  border: 0;
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
