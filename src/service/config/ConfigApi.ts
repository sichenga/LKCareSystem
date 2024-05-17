import { get, post ,del,put} from '@/utils/request'
import type{RuleForm} from '@/service/config/ConfigType'

// 楼栋管理 /api/building/list
export const ConfigBuildingList = () => get('/api/building/list')
//添加楼栋
export const BuildingAdd=(data:RuleForm)=>post('/api/building/add',data)
//修改楼栋
export const Buildingupdate=(data:RuleForm)=>put('/api/building/update',data)

//删除楼栋
export const delBuilding=(id:number)=>del('/api/building/delete/'+id)