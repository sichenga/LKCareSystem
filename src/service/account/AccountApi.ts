import { get, post, del } from '@/utils/request'
import type { AccountList, AddAccount } from './AccountType'
// 账号列表 /api/account/list
const accountlist = (data: AccountList) => get('/api/account/list', data)
// 添加账号 /api/account/add
const accountadd = (data: AddAccount) => post('/api/account/add', data)
// 根据账号ID获取账号信息 /api/account/list
// const accountinfo = (data: AccountList) => get('/api/account/list', data)
// 删除账号 /api/account/delete/28
const accountdel = (id: number) => del('/api/account/delete/' + id, {})
export { accountlist, accountadd, accountdel }
