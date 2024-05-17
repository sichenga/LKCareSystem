import { get, post ,del,put} from '@/utils/request'
import type{RuleForm,HouseViewType,houseaddType,getHouseType} from '@/service/config/ConfigType'
// 楼栋管理 /api/building/list
export const ConfigBuildingList = () => get('/api/building/list')
//添加楼栋
export const BuildingAdd=(data:RuleForm)=>post('/api/building/add',data)
//修改楼栋
export const Buildingupdate=(data:RuleForm)=>put('/api/building/update',data)

//删除楼栋
export const delBuilding=(id:number)=>del('/api/building/delete/'+id)

//房间列表
export const getHouseList = (data: HouseViewType) => get('/api/house/list', data)
//删除
export const deleteHouse = (id: number) => del(`/api/house/delete/${id}`)
//添加房间
export const addHouse = (params: houseaddType) => post('/api/house/add', params)
//获取房间类型列表
export const getHouseTypeList = (data:getHouseType) => get('/api/housetype/list',data)