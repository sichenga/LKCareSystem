<template>
  <!-- 院内活动 -->
  <el-card>
    <ActDialog v-if="isdialog" @close="close"></ActDialog>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="老人姓名：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="上报时间：">
        <TimePicker></TimePicker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 15px">
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text @click="getinfo">查看详情</el-button>
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
const TimePicker = defineAsyncComponent(() => import('@/components/timepicker/MayTimePicker.vue'))
const ActDialog = defineAsyncComponent(() => import('@/components/dialog/ActDialog.vue'))
const formInline = reactive({
  user: '',
  region: '',
  date: ''
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
      label: '上报时间'
    },
    {
      prop: 'address',
      label: '上报人'
    },
    {
      prop: 'manager',
      label: '老人姓名'
    },
    {
      prop: 'phone',
      label: '床位号'
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

// 查看详情
const getinfo = () => {
  isdialog.value = true
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
