import { get,post,put,del } from "@/utils/request"
import type {Goout,AddGoout} from '@/service/care/gooutType'
// 外出登记 列表
export const getList =(data:Goout)=>{
    return get('/api/goOut/list',data)
}

// 删除外出登记 列表
export const DelgetList =(id:number)=>{
    return del('/api/goOut/delete/'+id)
}
// 外出登记单挑 列表
export const goOutList =(id:number)=>{
    return get('/api/goOut/get/'+id)
}

// 添加外出登记 列表
export const AddGooutList =(params:AddGoout)=>{
    return post('/api/goOut/add',params)
}

// 修改外出登记 列表
export const UpdateGoout =(params:AddGoout)=>{
    return put('/api/goOut/update',params)
}