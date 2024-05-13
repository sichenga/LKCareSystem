import {get} from '@/utils/request'
import type {IUser} from './type'

// 采购申请列表
export const getPurchaseList = (params: IUser) => {
  return get('/api/purchase/list', params)
}
// 根据id获取单条采购申请信息
export const getPurchase = (id: number) => {
    return get('/api/purchase/get/'+id)
  }
  // 根据id获取单条采购申请信息
export const getpurchaseFoods = (id: number) => {
    return get('/api/purchaseFoods/list/'+id)
  }