import { get, post } from '@/utils/request'
import type {HouseViewType} from './HouseViewType'
//房间列表
export const getHouseList = (data: HouseViewType) => get('/api/house/list', data)
//删除
export const deleteHouse = (id: number) => post('/api/house/delete', { id })
