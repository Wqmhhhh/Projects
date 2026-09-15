<template>
  <div class="box">
    <h2>Son2 子组件</h2>
    从vuex中获取的值:<label>{{ $store.state.count }}</label>
    <br>
    <button @click="sub(1)">值 - 1</button>
    <button @click="sub(5)">值 - 5</button>
    <button @click="changeCountAction(888)">一秒后改成888</button>
    <button @click="updateUser">修改个人信息:{{ $store.state.user }}</button>
    <button @click="updateUser2">一秒后修改个人信息</button>
    <button @click="setUserSecond({name: 'yangyang',age: 11})">一秒后修改个人信息2</button>
    <button @click="setTheme('pink')">修改主题色：{{ $store.state.setting.theme }}</button>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'Son2Com',
  methods: {
    updateUser () {
      this.$store.commit('user/setUser', {
        name: 'yangyang',
        age: 11
      })
    },
    updateUser2 () {
      this.$store.dispatch('user/setUserSecond', {
        name: 'yangyang',
        age: 11
      })
    },
    sub (n) {
      this.subCount(n)
    },
    // 全局级别的映射
    ...mapMutations(['subCount']),
    ...mapActions(['changeCountAction']),
    // 分模块的映射
    ...mapMutations('setting', ['setTheme']),
    ...mapActions('user', ['setUserSecond'])
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
