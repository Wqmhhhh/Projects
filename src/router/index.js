import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/main/MainContainer.vue'),
      redirect: '/main/select',
      children: [
        {
          path: '/main/select',
          component: () => import('@/views/select/SelectPage.vue'),
        },
        {
          path: '/main/follow',
          component: () => import('@/views/follow/FollowPage.vue'),
        },
        {
          path: '/main/friends',
          component: () => import('@/views/friends/FriendsPage.vue'),
        },
        {
          path: '/live',
          component: () => import('@/views/my/MyPage.vue'),
        },
        {
          path: '/main/recommend',
          component: () => import('@/views/recommend/RecommendPage.vue'),
        },
      ],
    },
  ],
})

export default router
