import { useUserStore } from '@/stores'
const model = import.meta.glob('../views/**/*.vue')
console.log(6666, model['../views/login/LoginViews.vue'])


// 动态路由
export const AddMenu = () => {
  const userStore = useUserStore()
  // 添加菜单
  // console.log(userStore.auth)
  return getRouter(userStore.auth)
}

// 文字处理
export const firstUpperCase = (str: string) => {
  let text = str
  if (text.includes('Beg-details')) {
    text = text.replace('Beg-details', 'Details')
  }
  if (text.includes('/:id')) {
    // console.log('找到了', text.replace('/:id', ''))
    text = text.replace('/:id', '')
  }
  return text
}

// 生成路由
// const getRouter = (data?: any) => {
//   // console.log(1111, data)
//   const tree: any = []
//   let menu: any = {}
//   data.forEach((item: any) => {
//     if (item.children && item.url) {
//       // console.log(item.url)

//       item.children.forEach((child: any) => {
//         if (child.url) {
//           console.log(
//             child.name,
//             model[`../views/${item.url}/${firstUpperCase(child.url)}View.vue`]
//           )
//           console.log(child.name, `../views/${item.url}/${firstUpperCase(child.url)}View.vue`)
//           menu = {
//             path: `${item.url}/${child.url}`,
//             name: child.pathName + child.id,
//             component: model[`../views/${item.url}/${firstUpperCase(child.url)}View.vue`],
//             meta: {
//               title: child.name
//             }
//           }
//           tree.push(menu)
//           console.log('menu', menu)

//           if (child.children) {
//             child.children.forEach((child2: any) => {
//               if (child2.url) {
//                 console.log(
//                   child2.name,
//                   `../views/${item.url}/${firstUpperCase(child2.url)}View.vue`
//                 )
//                 menu = {
//                   path: `${item.url}/${child2.url}`,
//                   name: child2.pathName + child2.id,
//                   component: model[`../views/${item.url}/${firstUpperCase(child2.url)}View.vue`],
//                   meta: {
//                     title: child2.name
//                   }
//                 }
//                 tree.push(menu)
//               }
//             })
//           }
//         }
//       })
//     }
//   })

//   return tree
// }
// const tree: any = []
const getRouter = (data?: any, tree: any = [], url: string = '') => {
  // console.log(1111, data)
  data.forEach((item: any) => {
    if (item.url && item.children) {
      item.children.forEach((child: any) => {
        if (child.url) {
          // console.log(
          //   child.name,
          //   child.url,
          //   `../views/${url ? url + '/' : ''}${item.url}/${firstUpperCase(child.pathName)}View.vue`
          // )
          // console.log(
          //   child.name,
          //   model[
          //   `../views/${url ? url + '/' : ''}${item.url}/${firstUpperCase(child.pathName)}View.vue`
          //   ]
          // )
          const menu = {
            path: `${url ? url : item.url}/${child.url}`,
            name: child.pathName + child.id,
            component:
              model[
              `../views/${url ? url + '/' : ''}${item.url.includes('branch') ? 'company' : item.url}/${firstUpperCase(child.pathName)}View.vue`
              ],
            meat: {
              title: child.name
            }
          }
          tree.push(menu)
          // console.log(item.name, menu)
        }
      })
      // console.log(item.name, item.url)
      if (item.children) {
        getRouter(item.children, tree, item.url)
      }
    }
  })
  return tree
}
