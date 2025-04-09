import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/main/MainContainer.vue'),
      redirect: '/main/recommend',
      children: [
        {
          path: '/main/follow',
          component: () => import('@/views/follow/FollowPage.vue'),
        },
        {
          path: '/main/friends',
          component: () => import('@/views/friends/FriendsPage.vue'),
        },
        {
          path: '/main/recommend',
          component: () => import('@/views/recommend/RecommendPage.vue'),
        },
        {
          path: '/main/my',
          component: () => import('@/views/my/MyPage.vue'),
          redirect: '/main/my/works',
          children: [
            {
              path: '/main/my/works',
              component: () => import('@/views/my/components/worksPage.vue'),
            },
            {
              path: '/main/my/like',
              component: () => import('@/views/my/components/likePage.vue'),
            },
            {
              path: '/main/my/private',
              component: () => import('@/views/my/components/privatePage.vue'),
            },
          ],
        },
      ],
    },
  ],
})

export default router
