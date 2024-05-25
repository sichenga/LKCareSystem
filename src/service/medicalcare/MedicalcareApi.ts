import { get, post, put, del } from '@/utils/request'
import type{MedicalcareParams,Temperature} from '@/service/medicalcare/MedicalcareType'

// 体温记录
export const TemperatureList = (params?: MedicalcareParams) => {
  return get('/api/temperature/list', params || {})
}

// 添加体温记录
export const TemperatureAdd = (params?: Temperature) => {
  return post('/api/temperature/add', params || {})
}
