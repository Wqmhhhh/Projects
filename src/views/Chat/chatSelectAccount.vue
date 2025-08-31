<script setup>
import { ref, onMounted } from 'vue'
import { getAllAccounts, accountCreate, getAccountToken } from '@/api/chat'
import { ElMessage } from 'element-plus'

import router from '@/router'

// 导入库
import { useChatUserInfo } from '@/stores'
import { storeToRefs } from 'pinia'
const userChat = useChatUserInfo()
const {
  accountList,
  ifHaveAccount,
  accountToken,
  id: storeId,
  name: storeName,
  gender: storeGender,
  avatar: storeAvatar,
} = storeToRefs(userChat)

// 显示创建账号
const createAccountShow = ref(false)

// 性别
const genders = ['女', '男', '武装直升机', '沃尔玛购物袋']

// 账号列表父元素
const listRef = ref()

// 切换 创建账号、账号列表
const handleChange = () => {
  createAccountShow.value = !createAccountShow.value
}

// 创建账号信息
const name = ref()
const gender = ref('女')
const signature = ref()

// 创建账号
const handleCreate = async () => {
  if (!name.value) {
    ElMessage('名称不能为空！')
    return
  } else if (!signature.value) {
    ElMessage('个性签名不能为空！')
    return
  }

  try {
    const res = await accountCreate(name.value, gender.value, signature.value)
    console.log('创建账号返回', res)

    ElMessage.success('创建账号成功！')

    // 获取账号列表、跳转回原账号列表
    getUserAccounts()
    createAccountShow.value = false
  } catch (e) {
    ElMessage.error('创建账号失败，请稍后再试')
    console.log('创建账号失败', e)
    return
  }
}

// 获取用户的所有账号
const getUserAccounts = async () => {
  try {
    const res = await getAllAccounts()
    console.log('获取用户所有账号返回值', res)

    accountList.value = [...res.data.data.list]
    if (accountList.value.length > 0) {
      ifHaveAccount.value = true
    }
  } catch (e) {
    console.log('获取用户所有账号失败', e)
  }
}

// 选择账号登录
const handleSelect = async (item) => {
  try {
    const res = await getAccountToken(item.id)
    console.log('获取账号token', res)

    accountToken.value = res.data.data.account_token.token
    storeName.value = item.name
    storeAvatar.value = item.avatar
    storeGender.value = item.gender
    storeId.value = item.id
    ElMessage.success('登录成功！')
  } catch (e) {
    ElMessage.error('登录失败，请稍后再试')
    console.log('获取账号token失败', e)
    return
  }

  router.push('/chat')
}

// 退出登录
const backLogin = () => {
  userChat.clearAll()
  router.push('chatLogin')
}

onMounted(() => {
  getUserAccounts()
})
</script>

<template>
  <div class="container">
    <form class="box">
      <div class="title">
        <div>选择账号</div>
      </div>

      <!-- 创建账号 -->
      <div v-if="createAccountShow" class="create">
        <div>
          <div>
            <input type="text" placeholder="账号名" v-model="name" />
          </div>
        </div>

        <div>
          <div class="time">
            性别：
            <select name="gender" id="" v-model="gender">
              <option :value="item" v-for="(item, index) in genders" :key="index">
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <div>
            <input type="text" placeholder="个性签名" v-model="signature" />
          </div>
        </div>

        <button class="button" @click.prevent="handleCreate">创建</button>
      </div>

      <!-- 账号列表 -->
      <div class="accountList" v-else ref="listRef">
        <div
          v-for="item in accountList"
          :key="item.id"
          class="accountEach"
          @click="handleSelect(item)"
        >
          <img :src="item.avatar" alt="" />
          <div>{{ item.name }}</div>
        </div>

        <div v-show="!ifHaveAccount" class="default">暂无账号</div>
      </div>

      <!-- 创建账号 -->
      <div @click="handleChange" class="bottomText">
        <div @click="backLogin">退出登录</div>
        <div v-if="createAccountShow">账号列表</div>
        <div v-else>创建账号</div>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* flex */
.container,
.create > div,
.bottomText {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box,
.box > div:nth-child(2) {
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
.box > div:nth-child(2) {
  justify-content: start;
}
.box > div:last-child {
  color: #333;
  font-size: 1.1vw;
}
.box > div:last-child:hover {
  color: #000000;
  cursor: pointer;
}

/* 创建账号 */
.create {
  width: 90%;
  height: 60%;
  justify-content: space-between !important;
}
.create > div {
  box-sizing: border-box;
  width: 100%;
  height: 8vh;
  padding: 0 1vw;
  border-radius: 100vh;
  background-color: rgb(230, 230, 230);
  justify-content: start;
}
.create > div div {
  width: 100%;
  height: 70%;
}
.create > div input {
  width: 100%;
  height: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 1.3vw;
}
/* 按钮 */
.button {
  width: 100%;
  height: 8vh;
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
/* 选择框 */
.time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3vw;
}
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

/* 单个账户样式 */
.accountList {
  width: 90%;
  height: 80% !important;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.accountEach {
  width: 90%;
  height: 10vh !important;
  background-color: rgba(230, 230, 230, 0.781);
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 3vh 0;
  padding: 0 1vw;

  border-radius: 2vh;
}
.accountEach img {
  height: 85%;
  aspect-ratio: 1;
  border-radius: 100%;
  margin-right: 1vw;
}
.accountEach div {
  width: 65%;
  height: 3vh;
  font-size: 3vh;
  line-height: 3vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}
.accountEach:hover {
  background-color: #fff;
  cursor: pointer;
}
.default {
  font-size: 3.5vh;
  color: #ffffff83;
  line-height: 20vh;
}

.bottomText {
  width: 60%;
  justify-content: space-between;
}
</style>
