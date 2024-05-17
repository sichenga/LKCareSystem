import { get, post, del, put } from '@/utils/request'
import type { RuleForm, NursingServiceList, NursingServiceAdd } from '@/service/config/ConfigType'

// 楼栋管理 /api/building/list
export const ConfigBuildingList = () => get('/api/building/list')
//添加楼栋
export const BuildingAdd = (data: RuleForm) => post('/api/building/add', data)
//修改楼栋
export const Buildingupdate = (data: RuleForm) => put('/api/building/update', data)

//删除楼栋
export const delBuilding = (id: number) => del('/api/building/delete/' + id)

//护理服务列表 /api/nursingService/list
export const ConfigNursingServiceList = (params: NursingServiceList) =>
  get('/api/nursingService/list', params)
//删除护理服务  /api/nursingService/delete/5
export const delNursingService = (id: number) => del('/api/nursingService/delete/' + id)
//添加护理服务 /api/nursingService/add
export const addNursingService = (data: NursingServiceAdd) => post('/api/nursingService/add', data)
// 护理服务修改 /api/nursingService/update
export const updateNursingService = (data: NursingServiceAdd) =>
  put('/api/nursingService/update', data)
