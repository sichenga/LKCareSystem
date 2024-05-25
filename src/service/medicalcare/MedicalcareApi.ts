import { get, post, put, del } from '@/utils/request'
import type {
  MedicalcareParams,
  Temperature,
  bloodSugarlistParams
} from '@/service/medicalcare/MedicalcareType'

// 体温记录
export const TemperatureList = (params?: MedicalcareParams) => {
  return get('/api/temperature/list', params || {})
}

// 添加体温记录
export const TemperatureAdd = (data?: Temperature) => {
  return post('/api/temperature/add', data || {})
}

// 血糖记录列表
export const BloodSugarList = (params: bloodSugarlistParams) => {
  return get('/api/bloodSugar/list', params)
}
