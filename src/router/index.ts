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
          path: 'food',
          name: 'food',
          component: () => import('@/views/food/FoodView.vue')
        },
        {
          path: 'Analysis',
          name: 'Analysis',
          component: () => import('@/views/food/AnalysisView.vue')
        },
        {
          path: 'supplier',
          name: 'Supplier',
          component: () => import('@/views/food/SupplierView.vue')
        },
        {
          path: 'purchasing',
          name: 'Purchasing',
          component: () => import('@/views/food/PurchasingView.vue')
        },
        {
          path: 'receiving',
          name: 'receiving',
          component: () => import('@/views/food/ReceivingView.vue')
        },
        {
          path: 'received',
          name: 'received',
          component: () => import('@/views/food/ReceivedView.vue')
        },
        {
          path: 'affiliated',
          name: 'affiliated',
          component: () => import('@/views/affiliated/AffiliatedView.vue')
        }
      ]
    }
  ]
})

export default router
