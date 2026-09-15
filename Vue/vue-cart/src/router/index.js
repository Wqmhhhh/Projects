import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Cart from '@/views/layout/cart.vue'
import Home from '@/views/layout/home.vue'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'

import store from '@/store/index'

// 按需导入组件
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const Pay = () => import('@/views/pay')
const Prodetail = () => import('@/views/prodetail')
const MyOrder = () => import('@/views/myorder')
const SearchList = () => import('@/views/search/list.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/cart', component: Cart },
        { path: '/home', component: Home },
        { path: '/user', component: User },
        { path: '/category', component: Category }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder },
    { path: '/prodetail/:id', component: Prodetail }

  ]
})

// 定义一个数组，用于存放需要权限访问的数组
const authUrls = ['/pay', '/myorder']

// 全局导航前置守卫
router.beforeEach((to, from, next) => {
  // 看 to.path 是否在 authUrls 中出现
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 是权限页面，判断token
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
