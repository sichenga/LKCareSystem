import { get, put, post } from '@/utils/request'
import type { CustomerlistType, } from './CustomerType'
//潜在客户列表
export const CustomerList = (params: CustomerlistType) => {
    return get('/api/customer/list', params)
}