import router from '@/router'
import { useUserStore } from '@/stores'
import { AddMenu } from '@/utils/common'
// 路由守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (userStore.token) {
    console.log(router.getRoutes())
    const menu = AddMenu()
    console.log('菜单', menu)
    if (router.getRoutes().length <= 3) {
      console.log(222222221)
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
    if (to.path == '/login') {
      return true
    } else {
      return '/login'
    }
  }
})
