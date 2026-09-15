import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import Search from './views/Search.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false

const router=new VueRouter({
  // 数组包对象，一个对象一个规则
  routes:[
    {
      path:'/Home',
      component:Home
    },
    {
      path:'/Search',
      component:Search
    }
  ]
})

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
