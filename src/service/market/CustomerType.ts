//潜在客户列表
export interface CustomerlistType {
    page:number,
    pageSize:number
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