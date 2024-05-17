import { get, del, post, put } from '@/utils/request'
import type { AddDepartmentParams, UpdateDepartmentParams, StaffListParams,RuleForm } from './StaffType'
// 员工列表
export const staffList = (params: StaffListParams) => get('/api/staff/list', params)

// 删除员工
export const delstaff = (id: number) => del('/api/staff/delete/' + id)
//添加员工
export const staffAdd =(data:RuleForm)=>post('/api/staff/add',data)
//获取单挑员工
export const staffId =(id:number)=>get('/api/staff/get/'+id)
// 修改员工
export const updateList = (params: RuleForm) => put('/api/staff/update', params)


// 部门列表 /api/department/list
export const departmentList = () => get('/api/department/list')

// 添加部门 /api/department/add
export const addDepartment = (data: AddDepartmentParams) => post('/api/department/add', data)

// 修改部门  /api/department/update
export const updateDepartment = (data: UpdateDepartmentParams) =>
  put('/api/department/update', data)

//删除部门 /api/department/delete/3
export const delDepartment = (id: number) => del('/api/department/delete/' + id)
