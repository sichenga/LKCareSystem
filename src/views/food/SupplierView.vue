<template>
  <!-- 食材管理 -->
  <div class="box">
    <el-button type="primary">新增</el-button>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" size="small" link @click="handleEdit">编辑</el-button>
        <el-button type="primary" size="small" link @click="handleDelete">删除</el-button>
      </template>
    </MayTable>
    <!-- 分页 -->
    <Pagination :total="50"></Pagination>
  </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, defineAsyncComponent } from 'vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import SupplierView from '@/database/SupplierView.json'
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'supplier',
      label: '供应商名称'
    },
    {
      prop: 'supplied',
      label: '供给食材数'
    },
    {
      prop: 'linkman',
      label: '联系人'
    },
    {
      prop: 'phone',
      label: '联系电话'
    },
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = SupplierView
  }, 1000)
}
onMounted(() => {
  getlist()
})
// 编辑
const handleEdit = ((id: any) => {
  console.log('编辑', id);
})
// 删除
const handleDelete = ((id: any) => {
  console.log('删除', id);
})
</script>

<style scoped lang="less">
.box {
  padding: 20px;
  background-color: #fff;

  .el-table {
    margin-top: 40px;
  }

  .pages {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    margin-bottom: 20px;
  }
}
</style>