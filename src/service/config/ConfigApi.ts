import { get, post ,del} from '@/utils/request'

// 楼栋管理 /api/building/list
export const ConfigBuildingList = () => get('/api/building/list')
//添加楼栋
export const BuildingAdd=(data:any)=>post('/api/building/add',data)

//删除楼栋
export const delBuilding=(id:number)=>del('/api/building/delete/'+id)