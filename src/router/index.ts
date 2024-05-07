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
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue')
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashBoard.vue'),
      children: [
        {
          path: 'ManagementView',
          name: 'ManagementView',
          component: () => import('@/views/account/ManagementView.vue')
        },
        {
          path: 'RoleView',
          name: 'RoleView',
          component: () => import('@/views/account/RoleView.vue')
        },
        {
          path: 'SettingsView',
          name: 'SettingsView',
          component: () => import('@/views/account/SettingsView.vue')
        },
        
      ]
    }

  ]
})

export default router
