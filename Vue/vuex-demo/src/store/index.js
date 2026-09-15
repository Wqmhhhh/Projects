import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import setting from './modules/setting'

// 插件安装
Vue.use(Vuex)

// 创建仓库
const store = new Vuex.Store({
  strict: true,
  // 过state可以提供数据（所有组件共享的数据）
  state: {
    title: '大标题',
    count: 100,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  mutations: {
    // 所有mutations函数第一个参数都是state
    addCount (state, n) {
      state.count += n
    },
    subCount (state, n) {
      state.count -= n
    },
    Input (state, n) {
      state.count = n
    }
  },
  actions: {
    // context上下文
    changeCountAction (context, num) {
      // setTioneOut 模拟异步操作，以后大部分场景是发请求
      setTimeout(() => {
        context.commit('Input', num)
      }, 1000)
    }
  },
  getters: {
    // 第一个形参必须为state，必须有返回值
    filterList (state) {
      return state.list.filter(item => item >= 5)
    }
  },
  modules: {
    user,
    setting
  }
})

// 导出给main.js使用
export default store
