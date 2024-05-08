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
import ManagementView from '@/database/ManagementView.json'
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
      label: '姓名'
    },
    {
      prop: 'tel',
      label: '手机号'
    },
    {
      prop: 'account',
      label: '账号'
    },
    {
      prop: 'pass',
      label: '密码'
    },
    {
      prop: 'role',
      label: '所属角色'
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
    data.tableData = ManagementView
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