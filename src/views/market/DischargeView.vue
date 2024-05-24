<template>
   <!-- <div>出院管理</div> -->
   <el-card style="max-width: 100%">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
         <el-form-item label="老人姓名">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
         </el-form-item>
         <el-form-item label="身份证号码">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
         </el-form-item>
         <el-form-item label="性别">
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
               <el-option label="Zone one" value="shanghai" />
               <el-option label="Zone two" value="beijing" />
            </el-select>
         </el-form-item>
         <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="请选择" clearable>
               <el-option label="Zone one" value="shanghai" />
               <el-option label="Zone two" value="beijing" />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary">查询</el-button>
            <el-button>重置</el-button>
         </el-form-item>
      </el-form>
   </el-card>
   <el-card style="max-width: 100%" class="card">
      <el-button type="primary" @click="isdialog = true" style="margin-bottom: 20px;">新增出院申请</el-button>
      <ToHospitalDialog v-if="isdialog" @close="close"></ToHospitalDialog>
      <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
         <template #operate>
            <el-button type="primary" text>编辑</el-button>
            <el-button type="primary" text @click="del">删除</el-button>
            <el-button type="primary" text>确认出院</el-button>
         </template>
      </MayTable>
      <Pagination :total="50"></Pagination>
   </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { ElMessage } from 'element-plus'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const ToHospitalDialog = defineAsyncComponent(() => import('@/components/dialog/market/ToHospitalDialog.vue'))
import AffiliatedView from '@/database/AffiliatedView.json'
import { getMessageBox } from '@/utils/utils'
const formInline = reactive({
   user: '',
   region: '',
   date: '',
})
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
      label: '老人姓名'
    },
    {
      prop: 'address',
      label: '性别'
    },
    {
      prop: 'manager',
      label: '身份证号'
    },
    {
      prop: 'phone',
      label: '原床位'
    },
    {
      prop: 'username',
      label: '变更后床位'
    },
    {
      prop: 'userpass',
      label: '申请人'
    },
    {
      prop: 'creator',
      label: '申请日期'
    },
    {
      prop: 'addtime',
      label: '状态'
    }
  ],
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
   let res = await getMessageBox('是否确认删除出院', '删除后将不可恢复')
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
.card {
   margin-top: 20px;
}

.demo-form-inline .el-input {
   --el-input-width: 200px;
}

.demo-form-inline .el-select {
   --el-select-width: 200px;
}
</style>