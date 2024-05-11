<template>
  <!-- 供应商管理 -->
  <div class="box">
    <el-button type="primary" @click="isdialog = true">新增</el-button>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" size="small" link @click="handleEdit">编辑</el-button>
        <el-button type="primary" size="small" link @click="handleDelete">删除</el-button>
      </template>
    </MayTable>
    <!-- 分页 -->
    <Pagination :total="data.total" :page="params.page" :psize="params.pageSize"></Pagination>
    <!-- 弹出框 -->
    <SupplierDialog @close="close" v-if="isdialog"></SupplierDialog>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import SupplierDialog from '@/components/dialog/SupplierDialog.vue'
import { SupplierList } from "@/service/food/food"
import type { Supplier } from "@/service/food/type"
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))

const data = reactive({
  total: undefined,
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '供应商名称'
    },
    {
      prop: 'foodCounts',
      label: '供给食材数'
    },
    {
      prop: 'linkMan',
      label: '联系人'
    },
    {
      prop: 'mobile',
      label: '联系电话'
    },
  ]
})
const params = reactive<Supplier>({
  pageSize: 5,
  page: 1,
});
const getlist = (async () => {
  const res: any = await SupplierList(params)
  console.log("供应商列表", res);
  if (res.code == 10000) {
    data.tableData = res.data.list
    data.total=res.data.counts
  }
})
// 关闭弹窗
const isdialog = ref(false)
const close = (val: boolean) => {
  isdialog.value = false
  if (val) {
    params.page = 1
    getlist()
  }
}
onMounted(() => {
  getlist()
})
// 编辑
const handleEdit = ((id: any) => {
  console.log('编辑', id);
  isdialog.value = true
})
// 删除
const handleDelete = (async (id: any) => {
  console.log('删除', id);
  let res = await getMessageBox('是否确认删除该供应商', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
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