import { get, post } from '@/utils/request'
import type { Supplier, Supplieradd } from './type'

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
