import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { login } from '@/service/admin/AdminApi'
import type { Model } from '@/Type/pinia/user'
import type { Login as LoginType } from '@/service/admin/AdminType'
export const useUserStore = defineStore(
  'user',
  () => {
    // token
    const token = ref('')
    // 用户信息
    const model = ref<Model>({
      "id": 0,
      "companyId": 0,
      "level": 0,
      "staffId": 0,
      "name": "",
      "pwd": null,
      "type": 0,
      "enable": 0,
      "mobile": "",
      "username": "",
      "roleIds": null
  })
    // 登录
    const Login = async (data: LoginType) => {
      const res: any = await login(data).catch(()=>{})
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
