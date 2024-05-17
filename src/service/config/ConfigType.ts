// 房间类型列表
export interface Housetypeparams {
  page: number
  pageSize: number
}
// 房间类型添加
export interface Housetypeadd {
  id: number
  name: string
}

//楼栋添加
export interface RuleForm {
  id: number
  name: string
  pid: number
}
//房间列表
export interface HouseViewType {
  page: number
  pageSize: number
  name: string
}
//添加房间
export interface houseaddType {
  id: number
  buildingId: number | null
  type: number | null
  name: string
  beds: number | string
  picture: string
}
//获取房间类型
export interface getHouseType {
  page: number
  pageSize: number
}
