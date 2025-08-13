import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

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

router.beforeEach((to) => {
  const { authorization } = storeToRefs(useUserStore())
  //   // 没有登录不能到报名页面
  if (!authorization.value && to.path !== '/login' && to.path !== '/') {
    return '/'
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
