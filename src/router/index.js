import { createRouter, createWebHistory } from 'vue-router'
// import { useShowFlags } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Video/VideoPage.vue'),
      redirect: '/main/recommend',
      children: [
        {
          path: 'main',
          component: () => import('@/views/main/MainContainer.vue'),
          redirect: '/main/recommend',
          children: [
            {
              path: 'follow',
              component: () => import('@/views/follow/FollowPage.vue'),
            },
            {
              path: 'friends',
              component: () => import('@/views/friends/FriendsPage.vue'),
            },
            {
              path: 'recommend',
              component: () => import('@/views/recommend/RecommendPage.vue'),
            },
            {
              path: 'my',
              component: () => import('@/views/my/MyPage.vue'),
              redirect: '/main/my/works',
              children: [
                {
                  path: 'works',
                  component: () =>
                    import('@/views/my/components/worksPage.vue'),
                },
                {
                  path: 'like',
                  component: () => import('@/views/my/components/likePage.vue'),
                },
                {
                  path: 'private',
                  component: () =>
                    import('@/views/my/components/privatePage.vue'),
                },
              ],
            },
          ],
        },
        {
          path: 'search',
          component: () => import('@/views/search/SearchPage.vue'),
        },
      ],
    },
    {
      path: '/chat',
      component: () => import('@/views/ChatRoom/ChatRoomPage.vue'),
    },
  ],
})

// 添加全局守卫：对路由进行操作
// router.beforeEach((to) => {
//   const FlagStore = useShowFlags()
//   FlagStore.ifSearch = to.path === 'search'
// })

export default router
