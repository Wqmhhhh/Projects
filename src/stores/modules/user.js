import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  userLoginService,
  userLogOutService,
  getCodeService,
} from '@/api/login'
import {
  userInfoChangeService,
  userFaceChangeService,
  userInfoQueryService,
  getMsgService,
} from '@/api/userInfo'
import { useShowFlags } from './showFlags'

// 用户模块
export const useUserStore = defineStore(
  'User',
  () => {
    // 用户信息
    const user = ref({
      nickname: '',
      myFollowsCounts: 0,
      myFansCounts: 0,
      id: '',
      face: '',
      mobile: '',
      description: '',
      bgImg: '',
      updatedTime: '', // 创建时间
      totalLikeMeCounts: 0,
    })

    const token = ref('')

    // 设置用户信息
    const setUserInfo = (data) => {
      user.value.bgImg = data.bgImg
      user.value.description = data.description
      user.value.face = data.face
      user.value.mobile = data.mobile
      user.value.nickname = data.nickname
      user.value.myFollowsCounts = data.myFollowsCounts || 0
      user.value.myFansCounts = data.myFansCounts || 0
      user.value.id = data.id
      user.value.updatedTime = data.updatedTime
      user.value.totalLikeMeCounts = data.totalLikeMeCounts
      if (data.userToken) {
        token.value = data.userToken
      }
    }

    // 登录
    const userLogin = async (mobile, smsCode) => {
      try {
        const res = await userLoginService(mobile, smsCode)
        console.log('登录接口返回值', res)

        // 设置信息
        setUserInfo(res.data.data)

        return true
      } catch (e) {
        console.log('登录异步操作失败', e)

        return false
      }
    }

    // 退出登录
    const userLogout = async (userId) => {
      try {
        const res = await userLogOutService(userId)
        console.log('退出登录返回值', res)

        // 若没有自动登录则清空用户信息
        if (!useShowFlags().ifAutoLogin) {
          setUserInfo('')
        }

        return true
      } catch (e) {
        console.log('退出登录异步操作失败', e)
        return false
      }
    }

    // 发送验证码
    const getSmsCode = async (mobile) => {
      try {
        const res = await getCodeService(mobile)
        console.log('验证码返回值', res)

        if (res.status == 200) {
          ElMessage.success('发送验证码成功！')
        }

        // 返回验证码或报错信息
        if (res.data.data) {
          return res.data.data
        } else {
          console.log('过快：', res.data.msg)
          return res.data.msg
        }
      } catch (e) {
        console.log('发送验证码异步操作失败', e)

        return '发送验证码失败'
      }
    }

    // 查询用户信息
    const getUserInfo = async () => {
      const res = await userInfoQueryService(user.value.id)
      console.log('查询用户信息返回值', res)

      setUserInfo(res.data.data)
    }

    // 更改用户头像
    const faceChange = async (data) => {
      const res = await userFaceChangeService(user.value.id, data)
      console.log('更改用户头像返回值', res)

      // TODO:更改成功返回true
      if (res.data.status === 200) {
        return true
      } else {
        return false
      }
    }

    // 更改用户信息
    const changeInfo = async (changeNum, data) => {
      // 注意！需要请求头
      let UpdatedUserBO = {
        id: user.value.id,
      }

      if (changeNum === 1) {
        UpdatedUserBO['nickname'] = data
      } else if (changeNum === 6) {
        UpdatedUserBO['description'] = data
      }
      const res = await userInfoChangeService(UpdatedUserBO, changeNum)
      console.log('更改用户信息返回值', res)

      // 更改成功返回true
      if (res.data) {
        return true
      } else {
        return false
      }
    }

    // 获取通知信息
    const getMsg = async (page, pageSize) => {
      const res = await getMsgService(user.value.id, page, pageSize)
      console.log('通知列表：', res)

      // 将信息写入消息列表
    }

    return {
      user,
      token,

      userLogin,
      userLogout,
      setUserInfo,
      getSmsCode,

      getUserInfo,
      faceChange,
      changeInfo,

      getMsg,
    }
  },
  {
    persist: true,
  },
)
