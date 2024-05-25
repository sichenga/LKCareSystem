import { get, post, put, del } from '@/utils/request'
import type { bloodSugarlistParams } from './BloodSugarType'

// 血糖记录列表
export const BloodSugarList = (params: bloodSugarlistParams) => {
  return get('/api/bloodSugar/list', params)
}
