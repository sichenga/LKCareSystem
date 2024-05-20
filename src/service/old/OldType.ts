interface Health {
  oldillness: string | Array<string>
  nowillness: string | Array<string>
  otherillness: string | Array<string>
  otherCase: string | Array<string>
}

interface SelfCaresItem {
  name: string
  val: string
}

interface CheckupsItem {
  name: string
  picture: string
}
// 添加家属信息
export interface FamilyItem {
  id?: number
  name: string
  mobile: string
  idCard: string
  relation: string
  gender: number | undefined
  address: string
}

// 老人添加  /api/elderly/add
export interface AddElderlyRequest {
  name: string
  mobile: string
  photo: null
  gender: number
  birthday: string
  nativePlace: string
  nation: string
  idCard: string
  politics: string
  socialCard: string
  marriage: null
  eduLevel: null
  education: null
  resident: null
  address: null
  begId: number | undefined
  state: number | undefined
  health: Health
  selfCares: Array<SelfCaresItem>
  checkups: Array<CheckupsItem>
  family: Array<FamilyItem>
}

// 老人列表 /api/elderly/list
export interface ListElderlyRequest {
  page: number
  pageSize: number
  name: string
  idCard: number | undefined
  begId: number | undefined
  state: number | undefined
}
