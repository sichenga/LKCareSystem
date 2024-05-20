import { get, post, put, del } from '@/utils/request'
import type { CustomerParams } from './CustomerType'

// 潜在客户列表
export const CustomerList = (params?: CustomerParams) => {
  return get('/api/customer/list', params || {})
}

// 删除潜在客户
export const CustomerDelete = (id: number) => {
  return del(`/api/customer/delete/${id}`)
}

// 获取单条客户信息
export const Customerget = (id: number) => {
  return get(`/api/customer/get/${id}`)
}
