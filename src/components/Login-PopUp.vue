<script setup>
import { ref } from 'vue'

const autoLoginOn = ref(false)
const LogindialogVisible = ref(true)
const CodeLogin = ref(true)
const inputPhoneNumber = ref()
const AreaSelect = ref('+86')
let codeActive = ref(true)
let passwordActive = ref(false)

// 处理登录方式切换
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

// 手机号前缀列表
const areaPhoneList = [
  {
    label: '+86',
    value: '中国',
  },
  {
    label: '+852',
    value: '中国香港',
  },
  {
    label: '+853',
    value: '中国澳门',
  },
  {
    label: '+886',
    value: '中国台湾',
  },
  {
    label: '+355',
    value: '阿尔巴尼亚',
  },
]

// 登录按钮
const loginButtonActive = ref(false)
// TODO:输入框均有输入后才变色
</script>
<template>
  <!-- 未保存登录信息打开的弹框 -->
  <el-dialog v-model="LogindialogVisible" class="el-dialog-login--container">
    <div class="header">
      <el-icon class="header-back" :class="{ headerBackVisible: autoLoginOn }"
        ><ArrowLeft
      /></el-icon>
      <div class="header-title">登录即可使用完整功能</div>
    </div>

    <template #footer>
      <div class="haveCookie"></div>
      <div class="notCookie">
        <div class="login">
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
          <div class="loginContainer">
            <el-input
              v-model="inputPhoneNumber"
              placeholder="请输入手机号"
              class="phoneNumber loginInput"
            >
              <template #prepend>
                <el-select
                  v-model="AreaSelect"
                  style="width: 7vw"
                  popper-class="el-select-phone"
                >
                  <el-option
                    :label="item.label"
                    :value="item.value"
                    v-for="item in areaPhoneList"
                    :key="item.value"
                    class="phoneList"
                  >
                    <span>{{ item.value }}</span>
                    <span>{{ item.label }}</span>
                  </el-option>
                </el-select>
              </template>
            </el-input>
            <el-input
              placeholder="请输入验证码"
              class="loginInput"
              v-if="CodeLogin"
            >
              <template #append> <el-button>获取验证码</el-button> </template>
            </el-input>
            <el-input
              v-else
              placeholder="请输入密码"
              type="password"
              class="loginInput"
            >
            </el-input>
          </div>
          <div class="loginButton">
            <div>
              <el-button
                class="el-button"
                :class="{ loginButtonActive: loginButtonActive }"
                >登录/注册</el-button
              >
              <div>登录或注册即代表同意用户协议和隐私政策</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
/* 未保存登录信息的弹框 */

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
  opacity: 1;
}
.header-title {
  width: 93%;
  text-align: center;
  color: #000;
}

/* login */
.login-header {
  font-size: 2.8vh;
  color: #00000054;
  display: flex;
  width: 40%;
  height: 7vh;
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
  background-color: #00000059 !important;
  border-radius: 3vh;
}
.phoneListSelect {
  background-color: transparent !important;
  font-size: 2.5vh !important;
}
.phoneList {
  font-size: 2.5vh;
  width: 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.phoneNumber {
  height: 8vh;
  font-size: 2.5vh;
  border-radius: 8vh !important;
}
.loginContainer {
  width: 60%;
  margin: 0 auto;
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
  border-radius: 2.5vh;
  color: #fff;
  background-color: rgb(255, 183, 197);
}
.loginButton .el-button:hover {
  cursor: pointer;
}
.loginButton .loginButtonActive {
  background-color: rgb(254, 44, 85);
}
</style>
<style>
.el-dialog-login--container {
  width: 40%;
  height: 65%;
  background: linear-gradient(
    to bottom right,
    rgb(194, 235, 225) 10%,
    rgb(238, 238, 240) 25%,
    rgb(238, 238, 240) 70%,
    rgb(227, 194, 222) 85%
  ) !important;
  border-radius: 5vh;
  position: fixed;
  left: 30%;
}
</style>
