import Home from '@/views/Home'
import Search from '@/views/Search'
import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound.vue'
Vue.use(VueRouter) // VueRouter插件初始化

// 创建了一个路由对象
const router = new VueRouter({
  // 查询参数传参
  // routes: [
  //   { path: '/home', component: Home },
  //   { path: '/search', component: Search }
  // ]
  // 动态参数传参
  routes: [
    {path:'/',redirect:'/home'},
    { path: '/home', component: Home },
    { name:'search',path: '/search/:words', component: Search },
    {path:'*',component:NotFound},
  ]

})

export default router