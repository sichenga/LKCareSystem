import { get, post, put, del } from '@/utils/request'
import type{MedicalcareParams} from '@/service/medicalcare/MedicalcareType'

// 体温记录
export const TemperatureList = (params?: MedicalcareParams) => {
  return get('/api/temperature/list', params || {})
}

