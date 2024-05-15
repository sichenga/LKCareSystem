// 添加部门  /api/department/add
export interface AddDepartmentParams {
  id: number
  name: string
  pid: number
}

// 修改部门  /api/department/update
export interface UpdateDepartmentParams {
  id: number
  name: string
  pid: number
}

// 部门列表
export interface DepartmentListParams {
  id: number
  companyId: number
  name: string
  pid: number
  children?: Array<DepartmentListParams>
}
