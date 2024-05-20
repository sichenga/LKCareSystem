<template>
  <div style="margin: 10px 0">
    <el-button type="primary" @click="isdialog = true">新增家属</el-button>
    <RelationDialog @close="close" v-if="isdialog"></RelationDialog>
  </div>
  <!-- 表格 -->
  <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
    <template #operate>
      <el-button type="primary" text>编辑</el-button>
      <el-button type="primary" text @click="del">删除</el-button>
    </template>
  </MayTable>
  <Pagination :total="50"></Pagination>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import RelationDialog from '@/components/dialog/RelationDialog.vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))

const isdialog = ref(false)
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
      prop: 'address',
      label: '性别'
    },
    {
      prop: 'manager',
      label: '身份证号码'
    },
    {
      prop: 'phone',
      label: '联系电话'
    },
    {
      prop: 'username',
      label: '联系地址'
    },
    {
      prop: 'userpass',
      label: '与老人关系'
    }
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}
// 关闭弹窗
const close = () => {
  isdialog.value = false
}
// 删除
const del = async () => {
  let res = await getMessageBox('是否确认删除该家属', '删除后将不可恢复')
  console.log(11112, res)
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
.el-input {
  height: 40px;
}
.el-button {
  height: 40px;
  line-height: 40px;
}
.demo-ruleForm-but {
  margin-left: 660px;
  margin-top: 60px;
  .el-button {
    width: 100px;
    height: 40px;
  }
}
</style>
