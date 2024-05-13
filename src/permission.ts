import router from '@/router'
import { useUserStore } from '@/stores'
import { AddMenu } from '@/utils/common'
// 路由守卫
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (userStore.token) {
    AddMenu()
    return true
  } else {
    console.log(1)
    if (to.path == '/login') {
      return true
    } else {
      return '/login'
    }
  }
})
