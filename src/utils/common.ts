import { useUserStore } from '@/stores'
const model = import.meta.glob('../views/**/*.vue')
console.log(model['../views/login/LoginViews.vue'])
// 动态路由
export const AddMenu = () => {
  const userStore = useUserStore()

  // 添加菜单
  console.log(userStore.auth)
  return getRouter(userStore.auth)
}

// 文字处理
export const firstUpperCase = (str: string) => {
  let text = str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
  if (text.includes('/:id')) {
    // console.log('找到了', text.replace('/:id', ''))
    text = text.replace('/:id', '')
  }
  return text
}

// console.log('测试', handleText('Details/:id'))

// 递归
const getRouter = (data?: any, url?: any) => {
  // console.log(1111, data)
  const tree: any = []
  data.forEach((item: any) => {
    if (item.children && item.url) {
      // console.log(item.url)

      item.children.forEach((child: any) => {
        if (child.url) {
          console.log(child.name, `${item.url}/${child.url}`)
          console.log('com', `../views/${item.url}/${firstUpperCase(child.url)}View.vue`)
          // console.log('com', model[`../views/${item.url}/${firstUpperCase(child.url)}View.vue`])

          const menu = {
            path: `${item.url}/${child.url}`,
            name: item.pathName,
            component: model[`../views/${item.url}/${firstUpperCase(child.url)}View.vue`]
          }
          console.log(menu)
          tree.push(menu)
        }
      })

      getRouter(item.children)
    }
  })
  // console.log(tree)
  return tree
}
