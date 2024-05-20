// 老人任务添加 /api/elderlyTask/add
export interface AddElderlyTaskDto {
  elderlyId: number
  serviceId: number
  startTime: string
  endTime: string
  week: string
  day: string
  type: string
}
