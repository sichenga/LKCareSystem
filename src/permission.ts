import router from '@/router'
import {useUserStore  } from '@/stores'
// 路由守卫
router.beforeEach((to) => {
  console.log(1111);
  
    const userStore = useUserStore()
    if(userStore.token){
      
      return true
    }else{
      console.log(1);
        if(to.path == '/login'){
            return true
        }else{
            return '/login'
        }
    }
})