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

// 添加食材 /api/foods/add
export interface AddFood {
  id: number
  name: string
  unit: string
  supplierId: number | undefined
}
// 添加食材价格 /api/foodprice/add
export interface AddFoodPrice {
  id: number
  foodId: number
  wholePrice: number | undefined
  sellPrice: number | undefined
  purchasePrice: number | undefined
  updateTime: string
}

// 选择供应商
export interface SelectSupplier {
  id: number
  name: string
}
