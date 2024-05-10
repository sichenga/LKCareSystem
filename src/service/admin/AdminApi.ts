import { get, post } from '@/utils/request'
import type { Login } from './AdminType'
// 用户登录 /api/auth/login
const login = (data: Login) => post('/api/auth/login', data)

export { login }
