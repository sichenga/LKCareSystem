//  体温记录列表

export interface MedicalcareParams {
  page: number
  pageSize: number
  name: string //老人姓名
  beginDate: string //开始时间yyyy-MM-dd
  endDate: string //结束时间
  begId: string | null //床位Id
}

export interface Temperature {
  elderlyId: number
  val: string
}

// 查房记录列表 /api/checkRoom/list
export interface CheckRoomParams {
  /**
   * 床位ID
   */
  begId?: string
  /**
   * 开始时间yyyy-MM-dd
   */
  beginDate?: string
  /**
   * 结束时间yyyy-MM-dd
   */
  endDate?: string
  /**
   * 老人姓名
   */
  name?: string
  /**
   * 当前页
   */
  page?: number
  /**
   * 每页显示多少条
   */
  pageSize?: number
}

// 查房记录信息添加  /api/checkRoom/add
export interface CheckRoomAddParams {
  id?: number
  elderlyId: number | null
  spirit: string
  diet: string
  sleep: string
  shit: string
  urinate: string
  communicate: string
  memory: string
  temperature: string
  pulse: string
  breathe: string
  blood: string
  suggest: string
}

// 血压记录列表 /api/bloodPressure/list
export interface BloodPressureParams {
  /**
   * 床位ID
   */
  begId?: number | null
  /**
   * 开始时间yyyy-MM-dd
   */
  beginDate?: string
  /**
   * 结束时间yyyy-MM-dd
   */
  endDate?: string
  /**
   * 老人姓名
   */
  name?: string
  /**
   * 当前页
   */
  page?: number
  /**
   * 每页显示多少条
   */
  pageSize?: number
}

// 血压记录添加 /api/bloodPressure/add
export interface BloodPressureAddParams {
  id?: number | null
  elderlyId: number | null
  bloodPressure: string
  pulse: string
}
