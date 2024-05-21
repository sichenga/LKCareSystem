//咨询列表
export interface market {
  page: number
  pageSize: number
  name?: string
  customerName?: string
  mobile?: string
  state?: number | null //0:待回访,1:已回访
  customerId?: number | null
}
// 添加咨询
export interface Addmarket {
  customerId: number|null,
  type: string,
  source: string,
  name: string,
  mobile:string,
  relation: string,
  visitTime:string,
  content: string,
}
//咨询登记列表
export interface followup {
  page: number
  pageSize: number
  questionId?:number|null
}
//添加咨询登记
export interface AddFollowup{
  questionId?:number|null,
  callbackTime:string,
  content: string
}

