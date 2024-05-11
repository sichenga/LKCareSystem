// 账号列表
export interface AccountList {
  pageSize: number
  page: number
}
// 增加账号
export interface AddAccount {
  username: string
  pwd: string
  name: string
  enable: number
  mobile: string
  roleIds: Array<number>
}
