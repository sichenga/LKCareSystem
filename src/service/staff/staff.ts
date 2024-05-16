import {get,del} from '@/utils/request'

// 员工列表
export const staffList = () => {
  return get('/api/staff/list')
}
// 删除员工
export const delstaff = (id:any) => {
    return del('/api/staff/delete/'+id)
  }