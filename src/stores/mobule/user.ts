import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/service/admin/AdminApi'
import { TreeData } from '@/utils/utils'
import { getListForUser } from '@/service/account/AccountApi'
import type { Login as LoginType } from '@/service/admin/AdminType'
export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // 用户信息
    const model = ref({})
    // 用户权限
    const auth = ref([])
    // 登录
    const Login = async (data: LoginType) => {
      const res: any = await login(data).catch(() => {})
      console.log('登录', res)
      if (res.code === 10000) {
        token.value = res.data.token
        model.value = res.data.model
        ElMessage.success('登录成功')
        await getUserAuth()
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
      Login,
      getUserAuth
    }
  },
  {
    // 持久化
    persist: {
      storage: sessionStorage
    }
  }
)
