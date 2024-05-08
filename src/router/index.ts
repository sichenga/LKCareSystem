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
          path: 'home',
          name: 'HomeView',
          component: () => import('@/views/home/HomeView.vue')
        },
        {

          path: 'Management',
          name: 'Management',
          component: () => import('@/views/account/ManagementView.vue')
        },
        {
          path: 'RoleView',
          name: 'RoleView',
          component: () => import('@/views/account/RoleView.vue')
        },
        {
          path: 'Settings',
          name: 'Settings',
          component: () => import('@/views/account/SettingsView.vue')
        },
        {
          path: 'Bed',
          name: 'Bed',
          component: () => import('@/views/examine/BedView.vue')
        },
        {
          path: 'Details',
          name: 'Details',
          component: () => import('@/views/examine/DetailsView.vue')
        },
        {
          path:'affiliated',
          name:'affiliated',
          component:()=>import('@/views/affiliated/AffiliatedView.vue')
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
          path:'organizationAdd',
          name:'OrganizationAdd',
          component:()=>import('@/views/organization/OrganizationAdd.vue')
        },
        {
          path:'purchase',
          name:'Purchase',
          component:()=>import('@/views/purchase/PurchaseViews.vue')
        },
        {
          path: 'teskboard',
          name: 'Teskboard',
          component: () => import('@/views/task/TeskboardView.vue')
        },
        {
          path:'apply',
          name:'Apply',
          component:()=>import('@/views/purchase/ApplyViews.vue')
        },
        {
          path:'examine',
          name:'Examine',
          component:()=>import('@/views/purchase/ExamineViews.vue')
        },
        {
          path:'particulars',
          name:'Particulars',
          component:()=>import('@/views/purchase/ParticularsViews.vue')
        },
      ]
    }
  ]
})

export default router
