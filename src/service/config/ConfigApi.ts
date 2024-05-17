import { get, post, del, put } from '@/utils/request'
import type { Housetypeparams, Housetypeadd } from './ConfigType'

// 房间类型列表
export const HousetypeList = (params: Housetypeparams) => {
  return get('/api/housetype/list', params)
}

// 房间类型添加
export const HousetypeAdd = (params: Housetypeadd) => {
  return post('/api/housetype/add', params)
}

// 删除房间类型
export const HousetypeDelete = (id: number) => {
  return del(`/api/housetype/delete/${id}`)
}

// 房间类型修改
export const Housetypeupdate = (data: Housetypeadd) => {
  return put(`/api/housetype/update`, data)
}
