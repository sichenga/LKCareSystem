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
          path: 'home',
          name: 'HomeView',
          component: () => import('@/views/home/HomeView.vue')
        },
        {
          path: 'affiliated',
          name: 'affiliated',
          component: () => import('@/views/affiliated/AffiliatedView.vue')
        },
        {
          path: 'account',
          name: 'Account',
          component: () => import('@/views/account/AccountViews.vue')
        },
        {
          path: 'role',
          name: 'Role',
          component: () => import('@/views/role/RoleViews.vue')
        },
        {
          path: 'organization',
          name: 'Organization',
          component: () => import('@/views/organization/OrganizationViews.vue')
        },
        {
          path: 'organizationAdd',
          name: 'OrganizationAdd',
          component: () => import('@/views/organization/OrganizationAdd.vue')
        },
        {
          path: 'teskboard',
          name: 'Teskboard',
          component: () => import('@/views/task/TeskboardView.vue')
        }
      ]
    }
  ]
})

export default router
