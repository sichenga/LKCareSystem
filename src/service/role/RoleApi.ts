import { get, post,del } from '@/utils/request'
import type {Roletype} from './Roletype'
// 获取角色列表 /api/role/list
export const RoleList = (params: Roletype) => get('/api/role/list', params)

// 删除角色列表 /api/role/list
export const DelList = (id:number) => del('/api/role/delete/' +id)