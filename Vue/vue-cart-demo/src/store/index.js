import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modeules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart
  }
})
