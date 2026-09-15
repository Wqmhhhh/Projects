export default {
  // 示例
  // data () {
  //   title:'测试标题'
  // },
  methods: {
    // sayHi () {
    //   console.log('hello')
    // },
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(() => {
          // 若希望登录后跳转回来，需要在跳转时携带参数(当前路径地址)
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {})
        return true
      }
      return false
    }
  }
}
