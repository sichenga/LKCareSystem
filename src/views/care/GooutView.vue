<template>
  <!-- 外出申请 -->
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="老人姓名：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="审批状态：">
        <el-select
          v-model="formInline.region"
          placeholder="请选择"
          size="large"
          style="width: 240px"
        >
          <el-option
            v-for="item in data.statelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间：">
        <TimePicker></TimePicker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增外出</el-button>
      <AffDialog @close="close" v-if="isdialog"></AffDialog>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text>编辑</el-button>
        <el-button type="primary" text @click="btn">查看详情</el-button>
      </template>
    </MayTable>
    <Pagination :total="50"></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import AffDialog from '@/components/dialog/AffDialog.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const TimePicker = defineAsyncComponent(() => import('@/components/timepicker/MayTimePicker.vue'))
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
      label: '老人姓名'
    },
    {
      prop: 'address',
      label: '床位号'
    },
    {
      prop: 'manager',
      label: '陪同人员姓名'
    },
    {
      prop: 'phone',
      label: '陪同人员手机号'
    },
    {
      prop: 'username',
      label: '外出时间'
    },
    {
      prop: 'userpass',
      label: '审批状态'
    }
  ],
  statelist: [] as any
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

// 新增外出
const add = () => {
  router.push('/add')
}
// 详情
const btn = () => {
  router.push('/nurexamine')
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
