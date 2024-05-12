// 供应商管理列表
export interface Supplier {
  pageSize: number
  page: number
}
// 添加供应商
export interface Supplieradd {
  id: number
  name: string
  linkMan: string
  mobile: string
}

// 采购申请列表
export interface Purchase {
  pageSize: number
  page: number
  companyId: string
  state: string
  beginDate: string
  endDate: string
}
