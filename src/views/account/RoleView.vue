<template>
  <!-- 角色管理 -->
  <el-card style="max-width: 100%">
    <el-button type="primary" @click="isdialog = true">新增</el-button>
    <RoleDialog @close="close" v-if="isdialog"></RoleDialog>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text>编辑</el-button>
        <el-button type="primary" text @click="del">删除</el-button>
      </template>
    </MayTable>
    <Pagination :total="50"></Pagination>
  </el-card>

</template>

<script lang="ts" setup>
import { ref,reactive, onMounted, defineAsyncComponent } from 'vue'
import RoleView from '@/database/RoleView.json'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import RoleDialog from '@/components/dialog/RoleDialog.vue';
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
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

//弹出框
const isdialog = ref(false)
const close = () => {
  isdialog.value = false
}
// 删除
const del = async () => {
  let res = await getMessageBox('是否确认删除该角色', '删除后将不可恢复')
  console.log(1111, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
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