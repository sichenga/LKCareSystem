import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/service/admin/AdminApi'
import { TreeData } from '@/utils/utils'
import { getListForUser } from '@/service/account/AccountApi'
import type { Model } from '@/Type/pinia/user'
import type { Login as LoginType } from '@/service/admin/AdminType'
import { useRouter } from 'vue-router'
export const useUserStore = defineStore(
  'user',
  () => {
    const router = useRouter()
    // token
    const token = ref('')
    // 用户信息
    const model = ref<Model>({
      id: 0,
      companyId: 0,
      level: 0,
      staffId: 0,
      name: '',
      pwd: null,
      type: 0,
      enable: 0,
      mobile: '',
      username: '',
      roleIds: null
    })
    // 用户权限
    const auth = ref([])
    //选择食材数据
    const ingredient = ref([])

    const ingredients = (val:any)=>{
      ingredient.value=val
    } 

    // 登录
    const Login = async (data: LoginType) => {
      const res: any = await login(data).catch(() => {})
      console.log('登录', res)
      if (res.code === 10000) {
        token.value = res.data.token
        model.value = res.data.model
        ElMessage.success('登录成功')
        await getUserAuth()
        router.push('/')
      } else {
        ElMessage.error(res.msg)
      }
    }
    // 获取用户权限
    const getUserAuth = async () => {
      const menu: any = await getListForUser()
      console.log('权限列表', menu)
      if (menu?.code === 10000) {
        auth.value = TreeData(menu.data.list)
        console.log('权限', auth.value)
      }
    }

    return {
      token,
      model,
      auth,
      ingredient,
      Login,
      getUserAuth,
      ingredients
    }
  },
  {
    // 持久化
    persist: {
      storage: sessionStorage
    }
  }
)
