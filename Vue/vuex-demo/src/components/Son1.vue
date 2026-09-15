<template>
  <div class="box">
    <h2>Son1 子组件</h2>
    从vuex中获取的值:<label>{{ $store.state.count }}{{ filterList }}</label>
    <br>
    <button @click="add(1)">值 + 1</button>
    <button @click="add(5)">值 + 5</button>
    <button @click="change">一秒后改成66</button>
    <div>{{ user }}{{ setting }}{{ this.$store.state.setting }}{{ userInfo }}</div>
    <div>{{ $store.getters['user/userInfo'] }}</div>
    <div>{{ UpperCaseName }}</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Son1Com',
  methods: {
    add (n) {
      this.$store.commit('addCount', n)
    },
    change () {
      this.$store.dispatch('changeCountAction', 666)
    }
  },
  computed: {
    ...mapState(['list', 'setting', 'user']),
    ...mapGetters(['filterList']),
    ...mapGetters('user', ['UpperCaseName']),
    // 子模块的映射
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style lang="css" scoped>
.box {
  border: 3px solid #ccc;
  width: 400px;
  padding: 10px;
  margin: 20px;
}
h2 {
  margin-top: 10px;
}
</style>
