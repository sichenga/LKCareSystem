<template>

    <el-card style="margin-top: 15px">
      <div style="margin: 10px 0">
        <el-button type="primary" @click="sond">创建采购申请</el-button>
  
      </div>
      <!-- 表格 -->
      <MayTable :tableData="data.tableData" :tableItem="data.tableItem" >
        <template #operate>
            <el-button type="primary" text>编辑</el-button>
          <el-button type="primary" text @click="reteor.push('/dashboard/examine')">收获验货</el-button>
          <el-button type="primary" text>查看详情</el-button>
        </template>
      </MayTable>
      <Pagination :total="50"></Pagination>
    </el-card>
  </template>
  <script lang="ts" setup>
  import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
  import { useRouter}from 'vue-router'
  import AffiliatedView from '@/database/AffiliatedView.json'
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
        prop: 'addtime',
        label: '创建时间'
      },
      {
        prop: 'name',
        label: '机构名称'
      },
   
      {
        prop: 'manager',
        label: '品种'
      },
      {
        prop: 'phone',
        label: '实际采购成本'
      },
      {
        prop: 'username',
        label: '状态'
      },

    ]
  })
  const getlist = () => {
    setTimeout(() => {
      data.tableData = AffiliatedView
    }, 1000)
  }
  const sond = () => {
    reteor.push("/dashboard/purchase")
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
  