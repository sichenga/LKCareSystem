import router from '@/router'
import { useUserStore } from '@/stores'
import { AddMenu } from '@/utils/common'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.configure({
  // 是否显示右上角螺旋加载提示
  showSpinner: false
})
// 全局前置路由守卫
router.beforeEach((to) => {
  NProgress.start()
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
    console.log(router.getRoutes())

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

// 全局后置路由守卫
router.afterEach(() => {
  NProgress.done()
})
