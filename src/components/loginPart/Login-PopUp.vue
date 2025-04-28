<script setup>
import { onMounted, ref, watch } from 'vue'
import { useShowFlags, useUserStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
// 接口方法
import { userLoginService, getCodeService } from '@/api/login'
import { ElMessage } from 'element-plus'

// store库
const FlagsStore = useShowFlags()
const UserStore = useUserStore()
const { ifLoginShow, ifAutoLogin, ifLogin } = storeToRefs(FlagsStore)

// 是否默认显示自动登录
const ifAutoLoginPage = ref(false)

// 自动登录时用户信息
const autoUserInfo = ref()

// 登录按钮是否激活
const loginButtonActive = ref(false)

// tab栏切换登录方式
const codeActive = ref(true)
const passwordActive = ref(false)
const CodeLogin = ref(true)

// 输入信息同步
const EmailNumber = ref()
const CodeNumber = ref()
const PasswordNumber = ref()

// 检测邮箱是否有效
const ifEmailNumberQualified = ref(false)

// 处理获取验证码
const getCodeMSG = ref('获取验证码')
let countdownTimer = null
let num = 60

// 若有自动登录则从本地读取信息
const autoInfo = () => {
  autoUserInfo.value = JSON.parse(localStorage.getItem('User')).user
}

// 点击其他方式登录
const handleOtherWays = () => {
  ifAutoLoginPage.value = !ifAutoLoginPage.value
}

// 登录方式切换
const handleCode = () => {
  codeActive.value = true
  passwordActive.value = false
  CodeLogin.value = true
}
const handlePassword = () => {
  codeActive.value = false
  passwordActive.value = true
  CodeLogin.value = false
}

const handleGetCode = async (e = null) => {
  // 倒计时效果
  if (countdownTimer) return

  // 验证码请求
  const res = await getCodeService(EmailNumber.value)
  if (res.status == 200 && e === null) {
    ElMessage.success('发送验证码成功！')
  }
  if (e === null) {
    ElMessage(res.data.data || res.data.msg)
  } else {
    return res.data.data
  }
  countdownTimer = setInterval(() => {
    if (num <= 0) {
      getCodeMSG.value = `获取验证码`
      clearInterval(countdownTimer)
      countdownTimer = null
      num = 60
    } else {
      num--
      getCodeMSG.value = `${num} 秒`
    }
  }, 1000)
}

// 登录按钮变色：两个输入框均有数据时变色
watch([EmailNumber, CodeNumber, PasswordNumber], (newValues) => {
  // 处理登录按钮有效
  const [NewEmailNumber, NewCodeNumber, NewPasswordNumberNew] = newValues
  if (NewEmailNumber) {
    if (CodeLogin.value && NewCodeNumber) {
      loginButtonActive.value = true
    } else if (!CodeLogin.value && NewPasswordNumberNew) {
      loginButtonActive.value = true
    }
  } else {
    loginButtonActive.value = false
  }

  // 处理获取验证码按钮有效
  if (NewEmailNumber) {
    ifEmailNumberQualified.value = true
  } else {
    ifEmailNumberQualified.value = false
  }
})

// 处理点击登录按钮
const handleLogin = async () => {
  // 登录请求
  try {
    const res = await userLoginService(EmailNumber.value, CodeNumber.value)
    const data = res.data.data
    UserStore.setUserInfo(data)
  } catch {
    console.log('登录异步操作失败')
  }

  ElMessage.success('登录成功！')

  // 登录成功修改 ifLogin、弹框消失、页面刷新
  ifLogin.value = true
  ifLoginShow.value = false
  location.reload()
}

// 一键登录按钮
const handleAutoLogin = async () => {
  const code = handleGetCode(1)
  // 登录请求
  try {
    const res = await userLoginService(autoInfo.value.mobile, code)
    const data = res.data.data
    UserStore.setUserInfo(data)
  } catch {
    console.log('登录异步操作失败')
  }

  ElMessage.success('登录成功！')

  // 登录成功修改 ifLogin、弹框消失、页面刷新
  ifLogin.value = true
  ifLoginShow.value = false
  // location.reload()
}

// 弹框消失清空输入
const handleClose = () => {
  EmailNumber.value = ''
  PasswordNumber.value = ''
  CodeNumber.value = ''
}

onMounted(() => {
  // 处理自动登录页面显示
  if (ifAutoLogin.value) {
    autoInfo()
    ifAutoLoginPage.value = true
  }
})
</script>
<template>
  <el-dialog
    v-model="ifLoginShow"
    class="el-dialog-login--container"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="header">
      <el-icon
        class="header-back"
        :class="{ headerBackVisible: ifAutoLogin && !ifAutoLoginPage }"
        @click="handleOtherWays"
        ><ArrowLeft
      /></el-icon>
      <div class="header-title" style="user-select: none">
        登录即可使用完整功能
      </div>
    </div>

    <template #footer>
      <!-- 自动登录页面 -->
      <div v-if="ifAutoLoginPage" class="AutoLoginPage">
        <div><img :src="autoUserInfo.face" alt="" /></div>
        <div>{{ autoUserInfo.nickname }}</div>
        <div>
          <el-button class="el-button" @click="handleAutoLogin">
            一键登录
          </el-button>
        </div>
        <div>登录即同意 用户协议 和 隐私政策</div>
        <div @click="handleOtherWays">登录其他账号 →</div>
      </div>

      <!-- 手动登录页面 -->
      <div v-else class="NormalLogin">
        <div class="login">
          <!-- 登录方式 -->
          <div class="login-header">
            <div :class="{ headerActive: codeActive }" @click="handleCode">
              验证码登录
            </div>
            <hr />
            <div
              :class="{ headerActive: passwordActive }"
              @click="handlePassword"
            >
              密码登录
            </div>
          </div>

          <!-- 登录输入框 -->
          <el-form>
            <div class="loginContainer">
              <!-- 邮箱 -->
              <el-input
                v-model="EmailNumber"
                placeholder="请输入邮箱号"
                class="loginInput"
              >
              </el-input>

              <!-- 验证码 -->
              <el-input
                placeholder="请输入验证码"
                v-model="CodeNumber"
                class="loginInput CodeInput"
                v-if="CodeLogin"
              >
                <template #append>
                  <el-button
                    class="el-button"
                    @click="handleGetCode"
                    :disabled="!ifEmailNumberQualified"
                    :class="{ ifEmailNumberQualified: ifEmailNumberQualified }"
                    >{{ getCodeMSG }}</el-button
                  >
                </template>
              </el-input>

              <!-- 密码 -->
              <el-input
                v-else
                v-model="PasswordNumber"
                placeholder="请输入密码"
                type="password"
                class="loginInput"
              >
              </el-input>
            </div>

            <div class="loginButton">
              <div>
                <el-button
                  :disabled="!loginButtonActive"
                  class="el-button"
                  :class="{ loginButtonActive: loginButtonActive }"
                  @click="handleLogin"
                  >登录/注册</el-button
                >
                <div>登录或注册即代表同意用户协议和隐私政策</div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 保存登录信息页面 */
.AutoLoginPage {
  width: 100%;
  height: 100%;
}
.AutoLoginPage > div:first-child {
  width: 20%;
  margin: 0 auto;
  margin-top: 5vh;
}
.AutoLoginPage img {
  width: 100%;
  border-radius: 100vh;
}
.AutoLoginPage > div:nth-child(2) {
  font-size: 2.5vh;
  text-align: center;
  margin: 2vh 0;
}
.AutoLoginPage > div:nth-child(3) {
  width: 50%;
  margin: 0 auto;
}
.AutoLoginPage .el-button {
  width: 100%;
  background-color: rgb(254, 44, 85);
  color: #fff;
  font-size: 2.3vh;
  height: 6vh;
  border: 0;
  border-radius: 2.5vh;
  margin: 0 auto;
}
.AutoLoginPage > div:nth-child(4) {
  font-size: 2vh;
  margin: 3vh 0;
  color: #b7b5b5;
  text-align: center;
}
.AutoLoginPage > div:nth-child(5) {
  font-size: 1.8vh;
  text-align: center;
}
.AutoLoginPage > div:nth-child(5):hover {
  cursor: pointer;
}

/* 未保存登录信息页面 */
/* 标题 */
.header {
  display: flex;
  align-items: center;
  font-size: 3.5vh;
  font-weight: bold;
}
.header-back {
  opacity: 0;
}
.header-back:hover {
  cursor: pointer;
  color: #000;
}
.headerBackVisible {
  opacity: 1 !important;
}
.header-title {
  width: 93%;
  text-align: center;
  color: #000;
}

/* login */
.NormalLogin {
  width: 100%;
  height: 100%;
}
.login-header {
  font-size: 2.8vh;
  color: #00000054;
  display: flex;
  width: 40%;
  height: 10vh;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
.login-header hr {
  height: 2vh;
  display: inline-block;
  border: 0.01vh solid #00000034;
}
.login-header div:hover {
  cursor: pointer;
}
.headerActive {
  color: #000;
}

/* loginInput */
.loginInput {
  width: 100%;
  height: 8vh;
  margin: 2vh 0;
  font-size: 2.5vh;
  background-color: #00000059 !important;
  border-radius: 3vh;
}
.loginContainer {
  width: 60%;
  margin: 0 auto;
}
.CodeInput .el-button {
  width: 6.3vw;
  height: 99%;
  border: 0;
  background-color: rgb(245, 247, 250);
  color: rgb(152, 155, 161);
  border: 0;
}
.CodeInput .ifEmailNumberQualified {
  background-color: #f5f3f3e6;
}
.CodeInput .ifEmailNumberQualified:hover {
  background-color: #eeecec;
}

/* 登录按钮 */
.loginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13vh;
  margin: 2vh 0;
}
.loginButton div {
  font-size: 2vh;
  line-height: 6vh;
  text-align: center;
  color: #00000054;
}
.loginButton .el-button {
  width: 20vw;
  height: 8vh;
  font-size: 3vh;
  border-radius: 2.5vh;
  color: #fff;
  background-color: rgb(255, 183, 197);
}
.loginButton .loginButtonActive {
  background-color: rgb(254, 44, 85);
}
</style>

<style>
.el-dialog-login--container {
  width: 47vw;
  height: 70vh;
  background: linear-gradient(
    to bottom right,
    rgb(194, 235, 225) 10%,
    rgb(238, 238, 240) 25%,
    rgb(238, 238, 240) 70%,
    rgb(227, 194, 222) 85%
  ) !important;
  border-radius: 4vh;
}
</style>
