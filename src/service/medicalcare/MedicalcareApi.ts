import { get, post, put, del } from '@/utils/request'
import type{MedicalcareParams,Temperature} from '@/service/medicalcare/MedicalcareType'

// 体温记录
export const TemperatureList = (params?: MedicalcareParams) => {
  return get('/api/temperature/list', params || {})
}

// 添加体温记录
export const TemperatureAdd = (data?: Temperature) => {
  return post('/api/temperature/add', data || {})
}
// 添加体温记录
export const TemperatureDelete = (id?: number) => {
  return del('/api/temperature/delete/'+id)
}
// 单挑体温 
export const GetTemperature = (id?: number) => {
  return get('/api/temperature/get/'+id)
}
// 修改体温记录
export const TemperatureUpdate = (data?: Temperature) => {
  return put('/api/temperature/update', data || {})
}

