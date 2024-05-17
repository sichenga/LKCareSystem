import { del, get, post } from '@/utils/request'
import type { HouseViewType, houseaddType, getHouseType } from './HouseViewType'
//房间列表
export const getHouseList = (data: HouseViewType) => get('/api/house/list', data)
//删除
export const deleteHouse = (id: number) => del(`/api/house/delete/${id}`)
//添加房间
export const addHouse = (params: houseaddType) => post('/api/house/add', params)
//获取房间类型列表
export const HouseTypeList = (data: getHouseType) => get('/api/housetype/list', data)
// 获取楼栋列表
export const buildingList = () => get( '/api/building/list')