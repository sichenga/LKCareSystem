<template>
   <!-- <div>入院管理</div> -->
   <el-card style="max-width: 100%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <el-form-item label="老人姓名">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
         </el-form-item>
         <el-form-item label="身份证号码">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
         </el-form-item>
         <el-form-item label="床位">
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
               <el-option label="Zone one" value="shanghai" />
               <el-option label="Zone two" value="beijing" />
            </el-select>
         </el-form-item>
         <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
               <el-option label="Zone one" value="shanghai" />
               <el-option label="Zone two" value="beijing" />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
         </el-form-item>
      </el-form>
   </el-card>
   <el-card style="max-width: 100%" class="card">
      <el-button type="primary" @click="isdialog = true" style="margin-bottom: 20px;">新增入院申请</el-button>
      <ToHospitalDialog v-if="isdialog" @close="close"></ToHospitalDialog>
      <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
         <template #operate="{data}">
            <el-button type="primary" text>编辑</el-button>
            <el-button type="primary" text @click="del(data.id)">删除</el-button>
            <el-button type="primary" text>提交入院</el-button>
            <el-button type="primary" text>详情</el-button>
            <el-button type="primary" text @click="cancel">取消入院</el-button>
         </template>
      </MayTable>
      <Pagination @page="handPage" @psize="handPsize" :total="counts"></Pagination>
   </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'
import { orderList,orderDelete} from '@/service/market/marketApi'
import type { order } from '@/service/market/marketType'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const ToHospitalDialog = defineAsyncComponent(() => import('@/components/dialog/market/ToHospitalDialog.vue'))
import { getMessageBox } from '@/utils/utils'

const identifier='Hospitalized'

const formInline = reactive({
   user: '',
   region: '',
   date: '',
})
const isdialog = ref(false)
const data = reactive({
   tableData: [] as any,
   tableItem: [
      {
         prop: 'id',
         label: '序号'
      },
      {
         prop: 'elderlyPhoto',
         label: '头像'
      },
      {
         prop: 'sex',
         label: '性别'
      },
      {
         prop: 'elderlyName',
         label: '老人姓名'
      },
  
      {
         prop: 'elderlyIdCard',
         label: '身份证号'
      },
      {
         prop: 'begName',
         label: '床位'
      },
      {
         prop: 'addTime',
         label: '申请时间'
      },
      {
         prop: 'startDate',
         label: '入住开始时间'
      },
      {
         prop: 'payDays',
         label: '入住时长（月）'
      },
      {
         prop: 'state',
         label: '状态'
      }
   ],
})
const states = reactive<order>({
   page: 1,
  pageSize: 10,
  name: '' ,//老人姓名
  mobile: '', //手机号
  idCard:'', //身份证号
  begId: null ,//床位号
  state:  null //状态
})
const counts = ref(0)
const getlist = async () => {
   let res: any = await orderList(states)
   console.log(res)
   if (res?.code == 10000) {
      data.tableData = res.data.list
      counts.value=res.data.counts
   }

}
// 关闭弹窗
const close = () => {
   isdialog.value = false
}
//取消入院
const cancel = async()=>{
   let res = await getMessageBox('是否确认取消此入住申请？', '删除后将不可恢复')
   console.log(11112, res)
   if (res) {
      ElMessage.success('取消入院成功')
   }
}
// 删除
const del = async (id:number) => {
   let res = await getMessageBox('是否确认删除此入住', '删除后将不可恢复')
   console.log(11112, res)
   if (res) {
      let _res:any = await orderDelete(id)
      if(_res.code==10000){
         getlist()
         ElMessage.success('删除成功')
      }
      
   } else {
      ElMessage.info('取消删除')
   }
}
// 分页
const handPage=(val:any)=>{
   states.page=val
   getlist()
}
const handPsize=(val:any)=>{
   states.pageSize=val
   getlist()
}
onMounted(() => {
   getlist()
})
</script>

<style lang="less" scoped>
.card {
   margin-top: 20px;
}

.demo-form-inline .el-input {
   --el-input-width: 200px;
}

.demo-form-inline .el-select {
   --el-select-width: 200px;
}
</style>