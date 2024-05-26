import { get, post, put, del } from '@/utils/request'
import type {
  MedicalcareParams,
  Temperature,
  bloodSugarlistParams
} from '@/service/medicalcare/MedicalcareType'

// 体温记录列表
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
// 血糖记录添加
export const BloodSugarAdd = (data: Temperature) => {
  return post('/api/bloodSugar/add', data)
}

// 删除血糖记录信息
export const BloodSugarDelete = (id: number) => {
  return del(`/api/bloodSugar/delete/${id}`)
}
// 获取单条血糖记录信息
export const BloodSugarGet = (id: number) => {
  return get(`/api/bloodSugar/get/${id}`)
}

// 血糖记录修改
export const BloodSugarUpdate = (data: Temperature) => {
  return put('/api/bloodSugar/update', data)
}