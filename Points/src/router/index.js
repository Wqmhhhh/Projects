import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/virtualList',
      component: () => import('@/views/virtualList/mainPage.vue'),
    },
    {
      path: '/nestScroll',
      component: () => import('@/views/nestScroll/main.vue'),
    },
  ],
})

export default router
