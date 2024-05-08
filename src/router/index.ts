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
          path: 'purchase',
          name: 'Purchase',
          component: () => import('@/views/purchase/PurchaseViews.vue')
        },
        {
          path: 'teskboard',
          name: 'Teskboard',
          component: () => import('@/views/task/TeskboardView.vue')
        },
        {
          path: 'taskinfo',
          name: 'Taskinfo',
          component: () => import('@/views/task/TaskInfo.vue')
        },
        {
          path: 'apply',
          name: 'Apply',
          component: () => import('@/views/purchase/ApplyViews.vue')
        },
        {
          path: 'examine',
          name: 'Examine',
          component: () => import('@/views/purchase/ExamineViews.vue')
        },
        {
          path: 'particulars',
          name: 'Particulars',
          component: () => import('@/views/purchase/ParticularsViews.vue')
        },
        {
          path: 'teskonnect',
          name: 'Teskonnect',
          component: () => import('@/views/task/TeskconnectView.vue')
        },
        {
          path: 'connectInfo',
          name: 'ConnectInfo',
          component: () => import('@/views/task/ConnectInfo.vue')
        },
        {
          path: 'nightmanage',
          name: 'NightmanageView',
          component: () => import('@/views/elderlycare/nursemanage/NightmanageView.vue')
        },
        {
          path: 'locationManage',
          name: 'LocationManage',
          component: () => import('@/views/elderlycare/nursemanage/LocationManage.vue')
        },
        {
          path: 'bedreplace',
          name: 'Bedreplace',
          component: () => import('@/views/elderlycare/nursemanage/BedreplaceView.vue')
        },
        {
          path: 'examine',
          name: 'Examine',
          component: () => import('@/views/elderlycare/examine/ExamineView.vue')
        },
        {
          path: 'gooutapply',
          name: 'Gooutapply',
          component: () => import('@/views/elderlycare/gooutmanage/GooutapplyView.vue')
        }
      ]
    }
  ]
})

export default router
