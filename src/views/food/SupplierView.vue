<template>
  <!-- 供应商管理 -->
  <div class="box">
    <el-button type="primary" @click="isdialog = true" >新增</el-button>
    <SupplierDialog @close="close" v-if="isdialog"></SupplierDialog>
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
import { ref,reactive, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import SupplierDialog from '@/components/dialog/SupplierDialog.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import SupplierView from '@/database/SupplierView.json'
const isdialog = ref(false)
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
// 关闭弹窗
const close = () => {
  isdialog.value = false
}
onMounted(() => {
  getlist()
})
// 编辑
const handleEdit = ((id: any) => {
  console.log('编辑', id);
  isdialog.value=true
})
// 删除
const handleDelete = (async(id: any) => {
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