import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/service/admin/AdminApi'
import type { Login as LoginType } from '@/service/admin/AdminType'
export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // 用户信息
    const model = ref({})
    // 登录
    const Login = async (data: LoginType) => {
      const res: any = await login(data)
      console.log('登录', res)
      if (res.code === 10000) {
        token.value = res.data.token
        model.value = res.data.model
        ElMessage.success('登录成功')
      } else {
        ElMessage.error(res.msg)
      }
    }
    return {
      token,
      model,
      Login
    }
  },
  {
    // 持久化
    persist: {
      storage: sessionStorage
    }
  }
)
