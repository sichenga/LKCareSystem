import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/LoginViews.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      meta: {
        isHide: true
      },
      component: () => import('@/views/error/Error-404.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashBoard.vue'),
      children:[
        {
          path: 'home',
          name: 'HomeView',
          component: () => import('@/views/home/HomeView.vue')
        },
      ]
    }
  ]
})

export default router
