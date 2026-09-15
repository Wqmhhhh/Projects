import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, check) {
      state.cartList.forEach(item => {
        item.isChecked = check
      })
    },
    changeCount (state, obj) {
      const { goodsId, goodsNum } = obj
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data: { list } } = await getCartList()

      // 后台返回的数据不包括复选框转态，需手动维护数据，添加一个isChecked状态
      list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', list)
    },
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      // 重新渲染数据
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // 所有商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked === true)
    },
    // 选中总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}
