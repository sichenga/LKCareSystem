import { get, post } from '@/utils/request'
import type { companyaddParams } from './type'
export const companyadd = (data: companyaddParams) => post('/api/company/add', data)