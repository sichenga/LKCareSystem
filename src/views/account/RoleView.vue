<template>
    <el-card style="max-width: 100%">
      <el-button type="primary">新增</el-button>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
        <template #operate>
          <el-button type="primary" text>修改</el-button>
          <el-button type="primary" text>删除</el-button>
        </template>
      </MayTable>
      <Pagination :total="50"></Pagination>
    </el-card>
  
  </template>
  
  <script lang="ts" setup>
  import {reactive,onMounted,defineAsyncComponent } from 'vue'
  import RoleView from '@/database/RoleView.json'
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
        prop: 'role',
        label: '角色名称'
      },
      {
        prop: 'accounts',
        label: '账号'
      },
      {
        prop: 'founder',
        label: '创建人'
      },
      {
        prop: 'addtime',
        label: '创建时间'
      }
    ]
  })
  const getlist = () => {
    setTimeout(() => {
      data.tableData = RoleView
    }, 1000)
  }
  onMounted(() => {
    getlist()
  })
  
  </script>
  
  <style lang="less" scoped>
  .el-button {
    margin-bottom: 20px;
  }
  
  
  </style>