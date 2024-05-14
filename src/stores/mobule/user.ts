import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/service/admin/AdminApi'
import { TreeData } from '@/utils/utils'
import { getListForUser } from '@/service/account/AccountApi'
import type { Model } from '@/Type/pinia/user'
import type { Login as LoginType } from '@/service/admin/AdminType'
import router from '@/router'
import { getMessageBox } from '@/utils/utils'
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
    // 退出登录
    const logout = async () => {
      const res = await getMessageBox('确定要退出登录吗？', 'warning', '提示')
      if (res) {
        ElMessage.success('退出登录成功')
        token.value = ''
        model.value = {
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
        }
        sessionStorage.clear()

        router.push('/login')
      } else {
        ElMessage.success('取消退出登录')
      }
      // sessionStorage.clear()
    }
    return {
      token,
      model,
      auth,
      Login,
      getUserAuth,
      logout
    }
  },
  {
    // 持久化
    persist: {
      storage: sessionStorage
    }
  }
)
