import router from '@/router'
import { useUserStore } from '@/stores'
import { AddMenu } from '@/utils/common'
// 路由守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (userStore.token) {
    // console.log('token', userStore.token)
    // console.log(router.getRoutes())

    if (router.getRoutes().length <= 3) {
      const menu = AddMenu()
      // console.log('菜单', menu)
      const rou = {
        path: '/',
        name: 'dashboard',
        component: () => import('./views/dashboard/DashBoard.vue'),
        children: [
          {
            path: 'home',
            name: 'HomeView',
            component: () => import('./views/home/HomeView.vue')
          },
          ...menu
        ]
      }
      router.addRoute(rou)
      return to.fullPath
    }

    // return true
  } else {
    // 移除动态路由
    // console.log(111111)
    if (to.path == '/login') {
      console.log(111111)
      if (router.getRoutes().length > 3) {
        router.removeRoute('dashboard')
      }
      return true
    } else {
      return '/login'
    }
  }
})
