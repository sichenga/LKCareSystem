import {get,post,del,put} from '@/utils/request'
import type {market,Addmarket,followup,AddFollowup} from '@/service/market/marketType'
//资讯列表
export const getMarketList = (params: market) => {
  return get('/api/question/list', params)
}
//删除资讯
export const deleteMarket = (id: number) => {
  return del('/api/question/delete/'+id)
}
//添加咨询
export const questionAdd = (data: Addmarket) => {
  return post('/api/question/add',data)
}

//获取单挑咨询
export const getquestionlist = (id: number) => {
  return get('/api/question/get/'+id)
}

//获取单挑咨询
export const questionUpdate = (data: Addmarket) => {
  return put('/api/question/update',data)
}




//咨询登记列表
export const followupList = (data: followup) => {
  return get('/api/followup/list',data)
}
//删除回访信息
export const followupdelete = (id: number) => {
  return del('/api/followup/delete/'+id)
}

//回访记录添加
export const followupAdd = (data: AddFollowup) => {
  return post('/api/followup/add',data)
}
//修改信息回访
export const followupupdate = (data: AddFollowup) => {
  return put('/api/followup/update',data)
}