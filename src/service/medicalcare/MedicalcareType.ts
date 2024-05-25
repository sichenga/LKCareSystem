//  体温记录列表

export interface MedicalcareParams {
  page: number
  pageSize: number
  name: string //老人姓名
  beginDate: string //开始时间yyyy-MM-dd
  endDate: string //结束时间
  begId: string | null //床位Id
}

