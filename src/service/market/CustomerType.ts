// 潜在客户列表
export interface CustomerParams {
  page: number
  pageSize: number
  name: string
  idCard: string
  beginDate: string
  state: number | null
  endDate: string
}
