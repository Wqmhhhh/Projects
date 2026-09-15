import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    // 个人权证相关
    userInfo: getInfo()
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }

  },
  actions: {
    async logout (context) {
      // 重置个人信息
      context.commit('setUserInfo', {})
      // 重置购物车信息:跨模块调用模块
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {
  }
}
