<template>
  <div class="home">
    <div class="search-box">
      <input type="text" v-model="inputValue">
      <button @click="goSearch">搜索一下</button>
    </div>
    <div class="hot-link">
      热门搜索：
      <!-- 查询参数传参 -->
      <router-link to="/search?key=黑马程序员">黑马程序员</router-link>
      <router-link to="/search?key=前端培训">前端培训</router-link>
      <router-link to="/search?key=如何成为前端大牛">如何成为前端大牛</router-link>
      <!-- 动态路由传参 -->
      <router-link to="/search/黑马程序员">黑马程序员</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FindMusic',
  data(){
    return {
      inputValue:''
    }
  },
  methods:{
    goSearch(){
      // path路径跳转
      // 简单写法
      // this.$router.push('/search')
      // 完整写法
      // this.$router.push({
      //   path:'/search'
      // })

      // 查询参数传参:
      // 简单写法
      // this.$router.push(`/search?key=${this.inputValue}`)
      // 参数多时使用完整写法
      // this.$router.push({
      //   path:'/search',
      //   query:{
      //     key:this.inputValue,
      //   }
      // })

      // 动态路由传参
      // 简单写法
      // this.$router.push(`/search/${this.inputValue}`)
      // 完整写法
      // this.$router.push({
      //   path:`/search/${this.inputValue}`
      // })



      // name命名路由跳转
      // this.$router.push({
      //   name:'search'
      // })
      
      //查询参数传参
      // this.$router.push({
      //   name:'search',
      //   query:{
      //     key:this.inputValue
      //   }
      // })
      // 动态路由传参
      this.$router.push({
        name:'search',
        params:{
          words:this.inputValue
        }
      })
    }
  }
}
</script>

<style>
.search-box {
  display: flex;
  justify-content: center;
}
.search-box input {
  width: 400px;
  height: 30px;
  line-height: 30px;
  border: 2px solid #c4c7ce;
  border-radius: 4px 0 0 4px;
  outline: none;
}
.search-box input:focus {
  border: 2px solid #ad2a26;
}
.search-box button {
  width: 100px;
  height: 36px;
  border: none;
  background-color: #ad2a26;
  color: #fff;
  position: relative;
  left: -2px;
  border-radius: 0 4px 4px 0;
}
.hot-link {
  width: 508px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.hot-link a {
  margin: 0 5px;
}
</style>