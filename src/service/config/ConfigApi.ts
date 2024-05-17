import { get, post, del, put } from '@/utils/request'
import type {
  Housetypeparams,
  Housetypeadd,
  RuleForm,
  HouseViewType,
  houseaddType,
  getHouseType
} from './ConfigType'

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

// 楼栋管理 
export const ConfigBuildingList = () => get('/api/building/list')
//添加楼栋
export const BuildingAdd = (data: RuleForm) => post('/api/building/add', data)
//修改楼栋
export const Buildingupdate = (data: RuleForm) => put('/api/building/update', data)

//删除楼栋
export const delBuilding = (id: number) => del('/api/building/delete/' + id)

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