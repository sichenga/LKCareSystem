<template>
  <!-- 采购申请 -->
    <el-card style="margin-top: 15px">
      <div style="margin: 10px 0">
        <el-button type="primary" @click="sond">创建采购申请</el-button>
      </div>
      <!-- 表格 -->
      <MayTable :tableData="data.tableData" :tableItem="data.tableItem" >
        <template #operate="{data}">
          <el-button type="primary" text @click="del">删除</el-button>
            <el-button type="primary" text @click="reteor.push('/dashboard/purchase')">编辑</el-button>
          <el-button type="primary" text @click="inspection(data)">收获验货</el-button>
          <el-button type="primary" text @click="examine(data.id)">查看详情</el-button>
        </template>
      </MayTable>
      <Pagination :total="50"></Pagination>
    </el-card>
  </template>
  <script lang="ts" setup>
  import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
  import { useRouter}from 'vue-router'
  import { getMessageBox } from '@/utils/utils'
  import { ElMessage } from 'element-plus'  
  import {getPurchaseList} from '@/service/purchase/purchase'
  import type {IUser} from '@/service/purchase/type'
  const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
  const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
  const reteor = useRouter()
  const data = reactive({
    tableData: [] as any,
    tableItem: [
      {
        prop: 'id',
        label: '序号'
      },
      {
        prop: 'receiveTime',
        label: '创建时间'
      },
      {
        prop: 'addAccountName',
        label: '申请人'
      },
   
      {
        prop: 'foods',
        label: '品种'
      },
      {
        prop: 'addAccountId',
        label: '实际采购成本'
      },
      {
        prop: 'state',
        label: '状态'
      },

    ]
  })
  const params = ref<IUser>({
    page: 1,
    pageSize: 10,
    total:0,
  })
  const getlist = async() => {
    let res:any = await getPurchaseList(params.value)
    if(res.code==10000){
      data.tableData = res.data.list
    }

  }
  const del =async () => {
  let res =await getMessageBox('是否确认删除该采购申请', '删除后将不可恢复')
  if(res){
    ElMessage.success('删除成功')
  }else{
    ElMessage.info('取消删除')
  }
  
}
  const sond = () => {
    reteor.push("/AddPurchase")
  }

  const examine = (id:any) => {
    reteor.push({
      path:'/particulars1',
      query:{
        id:id
      }
    })
  }

  const inspection =async (params:any)=>{
    reteor.push({
          path:'/Examines',
          query:{
            id:params.id,
          }
        })
     
  }

  onMounted(() => {
    getlist()
  })
  </script>
  <style lang="less" scoped>
  .el-input {
    height: 40px;
  }
  .el-button {
    height: 40px;
    line-height: 40px;
  }

  </style>
  