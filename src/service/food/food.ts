import { get, post, put, del } from '@/utils/request'
import type { Supplier, Supplieradd, Purchase } from './type'

// 供应商列表
export const SupplierList = (params: Supplier) => {
  return get('/api/supplier/list', params)
}
// 添加供应商
export const SupplierAdd = (data: Supplieradd) => {
  return post('/api/supplier/add', data)
}
// 根据id获取供应商信息
export const Supplierget = (id: number) => {
  return get(`/api/supplier/get/${id}`)
}

// 修改供应商
export const SupplierUpdate = (data: Supplieradd) => {
  return put('/api/supplier/update', data)
}

// 删除供应商
export const Supplierdelete = (id: number) => {
  return del(`/api/supplier/delete/${id}`)
}

// 采购申请列表
export const PurchaseList = (params: Purchase) => {
  return get('/api/purchase/list', params)
}

// 单条采购申请信息
export const Purchaseget = (id: number) => {
  return get(`/api/purchase/get/${id}`)
}

// 获取采购物品列表
export const purchaseFoodslist = (id: number) => {
  return get(`/api/purchaseFoods/list/${id}`)
}
// 收货验收
export const purchase = () => {
  return put('/api/purchase/check')
}
