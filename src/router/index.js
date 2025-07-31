import { createRouter, createWebHashHistory } from 'vue-router'
// import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/loginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/mainPage.vue'),
    },
    {
      path: '/register',
      component: () => import('@/views/registerPage.vue'),
    },
    {
      path: '/registerTable',
      component: () => import('@/views/registerTable.vue'),
    },
  ],
})

// 登录访问拦截：默认直接放行。根据返回值决定访问或拦截
// 返回值：undefined、true 直接放行，返回false拦回from地址页面，返回路径拦截到对应地址
// router.beforeEach((to) => {
//   const useStore = useUserStore()
//   if (!useStore.token && to.path !== '/login') {
//     return '/login'
//   }
// })

export default router
