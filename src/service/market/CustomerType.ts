// 潜在客户列表
export interface CustomerParams {
  page: number
  pageSize: number
  name: string
  idCard: string
  beginDate: string
  state: number | null
  endDate: string
}


//新增家属
export interface CustomerAddType {
    name:string,
    mobile:string,
    gender:number,
    idCard:string,
    status:string,
    roomRequire:string,
    content:string,
    state:number,
    source:string,
}

