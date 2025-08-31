import { createRouter, createWebHistory } from 'vue-router'
import { ElLoading } from 'element-plus'

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
                  component: () => import('@/views/my/components/worksPage.vue'),
                },
                {
                  path: 'like',
                  component: () => import('@/views/my/components/likePage.vue'),
                },
                {
                  path: 'private',
                  component: () => import('@/views/my/components/privatePage.vue'),
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
      component: () => import('@/views/Chat/ChatPage.vue'),
    },
    {
      path: '/chatLogin',
      component: () => import('@/views/Chat/chatLoginPage.vue'),
    },
    {
      path: '/chatSelect',
      component: () => import('@/views/Chat/chatSelectAccount.vue'),
    },
  ],
})

let loading
let loadingStart

router.beforeEach(() => {
  loadingStart = Date.now()
  loading = ElLoading.service({
    lock: true,
    text: '',
    background: 'rgba(0, 0, 0, 0.7)',
  })
})

router.afterEach(() => {
  const delay = 1000 - (Date.now() - loadingStart) // 至少显示 300ms
  setTimeout(() => loading?.close(), delay > 0 ? delay : 0)
})

export default router
