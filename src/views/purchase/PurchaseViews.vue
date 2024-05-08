<template>

    <el-card style="margin-top: 15px">
      <div style="margin: 10px 0">
        <el-button type="primary">选择食材</el-button>
        <div class="quantity">
            1
        </div>
      </div>
      <!-- 表格 -->
      <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
        <template #operate>
          <el-button type="primary" text>删除</el-button>
        </template>
      </MayTable>
      <Pagination :total="50"></Pagination>
    </el-card>
  </template>
  <script lang="ts" setup>
  import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
  import AffiliatedView from '@/database/AffiliatedView.json'
  const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
  const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
  
  const data = reactive({
    tableData: [] as any,
    tableItem: [
      {
        prop: 'id',
        label: '序号'
      },
      {
        prop: 'name',
        label: '物料名称'
      },
      {
        prop: 'address',
        label: '单位'
      },
      {
        prop: 'manager',
        label: '供应商'
      },
      {
        prop: 'phone',
        label: '批发价'
      },
      {
        prop: 'creator',
        label: '零售价'
      },
      {
        prop: 'addtime',
        label: '采购价'
      },
      {
        prop: 'creator',
        label: '采购数量'
      },
    ]
  })
  const getlist = () => {
    setTimeout(() => {
      data.tableData = AffiliatedView
    }, 1000)
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
  .quantity{
    position: relative;
    font-family:Helvetica,Arial;
    width: 14px;
    height: 14px;
    top:-50px;
    left:65px;
    line-height: 14px;
    text-align: center;
    font-size: 10px;
    background-color: #fff849

  }
  </style>
  