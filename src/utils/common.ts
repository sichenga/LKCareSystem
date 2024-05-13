import router from '@/router'
import { useUserStore } from '@/stores'
const model = import.meta.glob('../views/**/*.vue')
console.log(model['../views/login/LoginViews.vue'])
export const AddMenu = () => {
  const userStore = useUserStore()
  // 添加菜单
  const menuList = []
  userStore.auth.forEach((item: any) => {
    item.children.forEach((child: any) => {
      if (child.url) {
        // console.log(22222, child)
        const menu = {
          path: item.url,
          name: item.pathName,
          component: model[`@/views/**/${item.url}.vue`]
        }
        // console.log(111, menu)
      }
    })
  })
}
