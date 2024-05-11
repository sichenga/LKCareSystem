import { get, post } from '@/utils/request'
import type { companyaddParams,companylistParams } from './type'
export const companylist = (params: companylistParams) => get('/api/company/list',params)
export const companyadd = (data: companyaddParams) => post('/api/company/add', data)