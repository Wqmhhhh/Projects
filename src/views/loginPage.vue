<script setup>
import { ElMessage } from 'element-plus'
import { onUnmounted, ref } from 'vue'
import {
  userRegister,
  userLogin,
  userChangePassword,
  userSendSmsCode,
  userSendRegisterSmsCode,
} from '@/api/user'
import router from '@/router'

import { storeToRefs } from 'pinia'

import { useFlagStore, useUserStore } from '@/stores'
const { ifLogin } = storeToRefs(useFlagStore())
const { authorization, refreshToken } = storeToRefs(useUserStore())

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

  // 重置验证码按钮
  smsCodeButton.value = '获取验证码'
  ifSmsCodeDisabled.value = false

  // 清除倒计时
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  num = 60
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
  // 检查密码长度是否在 8 到 20 位之间
  if (passWord.value.length < 8) {
    return false
  }

  // 检查密码是否包含至少一个字母和一个数字
  const hasLetter = /[a-zA-Z]/.test(passWord.value)
  const hasNumber = /[0-9]/.test(passWord.value)

  return hasLetter && hasNumber
}

// 检验两次密码是否一致
const checkSame = () => {
  if (passWord.value !== repeatPassWord.value) {
    passWord.value = ''
    repeatPassWord.value = ''
    ElMessage.error('两次密码输入不一致')
    return false
  }
  return true
}

// 验证邮箱合法
const validateEmail = () => {
  if (!email.value) {
    ElMessage.error('邮箱不能为空')
    return false
  }
  if (!checkEmail(email.value)) {
    ElMessage.error('邮箱格式错误')
    return false
  }
  return true
}

// 验证密码合法
const validatePassword = () => {
  if (!passWord.value) {
    ElMessage.error('密码不能为空')
    return false
  }

  if (!checkPassWord()) {
    ElMessage.error('密码需8-20位且包含字母和数字')
    passWord.value = ''
    repeatPassWord.value = ''
    return false
  }

  return true
}

// 检查所有输入
const checkAll = () => {
  if (!validateEmail()) return false

  if (option.value !== 1 && !smsCode.value) {
    ElMessage.error('验证码不能为空')
    return false
  }

  if (!validatePassword()) return false

  if (option.value !== 1 && !checkSame()) return false

  return true
}

// 处理注册
const handleRegister = async () => {
  if (!checkAll()) {
    return
  }

  try {
    const res = await userRegister(email.value, smsCode.value, passWord.value)
    console.log('注册返回', res)
    if (res.status !== 200) {
      ElMessage.error(res.data.message)
      clearAll()
      return
    }

    ElMessage.success('注册成功')
    handleChange(1)
  } catch (e) {
    console.log('注册失败返回值', e)
    ElMessage.error('注册失败！请稍后再试')
  }
}

// 处理登录
const handleLogin = async () => {
  if (!email.value) {
    ElMessage.error('邮箱不能为空')
    return
  } else if (!validatePassword()) {
    return
  }

  // 发送请求
  try {
    const res = await userLogin(email.value, passWord.value)
    console.log('登录返回值', res)

    if (res.data.code !== 200) {
      ElMessage.error(res.data.message)
      passWord.value = ''
      return
    } else {
      ElMessage.success('登录成功！')
    }

    ifLogin.value = true
    authorization.value = res.data.data.authorization
    refreshToken.value = res.data.data.refreshToken

    router.push('/')
  } catch (e) {
    console.log('登录失败返回值', e)
    ElMessage.error('登录失败！请再次尝试')
  }
}

// 处理修改密码
const handleChangePassword = async () => {
  if (!checkAll()) {
    return
  }

  try {
    const res = await userChangePassword(email.value, smsCode.value, passWord.value)
    console.log('修改密码返回', res)
    if (res.status !== 200) {
      ElMessage.error(res.data.message)
      clearAll()
      return
    }
    ElMessage.success('修改密码成功！')
    handleChange(1)
  } catch (e) {
    console.log('修改密码失败', e)
    ElMessage.error('修改密码失败，请稍后再试！')
    return
  }
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
    let res
    if (option.value === 3) {
      res = await userSendSmsCode(email.value)
    } else if (option.value === 2) {
      res = await userSendRegisterSmsCode(email.value)
    }
    console.log('发送验证码返回值', res)

    if (res.data.code === 200) {
      ElMessage.success('验证码发送成功')
      ElMessage.warning({
        message: '找不到邮件可以看下垃圾箱里~',
        duration: 5000,
      })
    } else {
      ElMessage.warning(res.data.message)
      ifSmsCodeDisabled.value = false
      return
    }
  } catch (e) {
    console.log('验证码发送失败返回值', e)
    ElMessage.error('验证码发送失败')
    ifSmsCodeDisabled.value = false
    return
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

// 处理点击提交按钮
const clickNum = ref(0)
let submitTimer = null
const handleButton = () => {
  // 一些没有意义的抖机灵
  clickNum.value++
  if (clickNum.value === 3) {
    ElMessage.success('三连决胜')
  } else if (clickNum.value === 5) {
    ElMessage.success('五连绝世')
    clickNum.value = 0
  }

  // 若存在定时器，则取消之前的定时器重新计时
  if (submitTimer) {
    clearTimeout(submitTimer)
    submitTimer = null
  }
  // 设置定时器
  submitTimer = setTimeout(() => {
    if (option.value === 1) {
      handleLogin()
    } else if (option.value === 2) {
      handleRegister()
    } else {
      handleChangePassword()
    }
  }, 200)
}

onUnmounted(() => {
  if (timer) clearInterval(timer)

  clickNum.value = 0
})
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
          <i class="iconfont icon-youxiang"></i>
          <input type="email" placeholder="邮箱" v-model="email" autocomplete="email" />
        </div>
      </div>

      <!-- 邮箱验证码 -->
      <div v-show="option === 2 || option === 3">
        <div class="smsCode">
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" placeholder="验证码" v-model="smsCode" autocomplete="off" />
        </div>
        <button @click="handleSendSmsCode" :disabled="ifSmsCodeDisabled" type="button">
          {{ smsCodeButton }}
        </button>
      </div>

      <!-- 密码 -->
      <div>
        <div>
          <i class="iconfont icon-mima"></i>
          <input
            type="password"
            placeholder="8-20位包含字母、数字"
            v-model="passWord"
            autocomplete="current-password"
            maxlength="20"
          />
        </div>
      </div>

      <!-- 再次输入密码 -->
      <div v-show="option === 2 || option === 3">
        <div>
          <i class="iconfont icon-mima"></i>
          <input
            type="password"
            placeholder="再次输入密码"
            v-model="repeatPassWord"
            autocomplete="new-password"
            maxlength="20"
          />
        </div>
      </div>

      <!-- 登录按钮 -->
      <div class="button" @click="handleButton">
        <span v-if="option === 1">登录</span>
        <span v-else-if="option === 2">注册</span>
        <span v-else-if="option === 3">修改</span>
      </div>

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
  border: 0;
  background-color: transparent;
}
.smsCode + button:hover {
  cursor: pointer;
}

/* 按钮 */
.button {
  width: 80%;
  height: 13%;
  border-radius: 100vh;
  /* display: block; */
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
