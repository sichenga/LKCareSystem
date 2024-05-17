import { get, del, post, put } from '@/utils/request'
import type { AddDepartmentParams, UpdateDepartmentParams, StaffListParams } from './StaffType'
// 员工列表
export const staffList = (params: StaffListParams) => get('/api/staff/list', params)

// 删除员工
export const delstaff = (id: number) => del('/api/staff/delete/' + id)

// 部门列表 /api/department/list
export const departmentList = () => get('/api/department/list')

// 添加部门 /api/department/add
export const addDepartment = (data: AddDepartmentParams) => post('/api/department/add', data)

// 修改部门  /api/department/update
export const updateDepartment = (data: UpdateDepartmentParams) =>
  put('/api/department/update', data)

//删除部门 /api/department/delete/3
export const delDepartment = (id: number) => del('/api/department/delete/' + id)
