<template>
  <!-- 洗衣错衣 -->
  <el-card>
    <WashparticularsDialog v-if="isdialog" @close="close"></WashparticularsDialog>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="发布人：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="发布时间：">
        <TimePicker></TimePicker>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select
          v-model="formInline.region"
          placeholder="请选择"
          style="width: 240px"
          size="large"
        >
          <el-option
            v-for="item in data.typelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="formInline.region"
          placeholder="请选择"
          style="width: 240px"
          size="large"
        >
          <el-option
            v-for="item in data.statelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        <el-button type="primary" text @click="particulars">详情</el-button>
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
const WashparticularsDialog = defineAsyncComponent(
  () => import('@/components/dialog/WashparticularsDialog.vue')
)
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
      label: '发布人'
    },
    {
      prop: 'address',
      label: '发布时间'
    },
    {
      prop: 'manager',
      label: '类型'
    },
    {
      prop: 'phone',
      label: '标题'
    },
    {
      prop: 'username',
      label: '状态'
    }
  ],
  statelist: [] as any,
  typelist: [] as any
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}

// 详情
const particulars = () => {
  isdialog.value = true
}

// 关闭弹窗
const close = () => {
  isdialog.value = false
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
