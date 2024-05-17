//楼栋添加
export interface RuleForm {
  id: number
  name: string
  pid: number
}

//护理服务列表 /api/nursingService/list
export interface NursingServiceList {
  page: number
  pageSize: number
}
//添加护理服务 /api/nursingService/add
export interface NursingServiceAdd {
  id: number
  name: string
  content: string
}
