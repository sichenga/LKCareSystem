import {get,del} from '@/utils/request'
import type  {StaffType} from  './type'
// 员工列表
export const staffList = (params:StaffType) => {
  return get('/api/staff/list',params)
}
// 删除员工
export const delstaff = (id:any) => {
    return del('/api/staff/delete/'+id)
  }