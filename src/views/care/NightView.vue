<template>
  <!-- 夜巡管理 -->
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="上报人：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="巡检地址：">
        <el-select
          v-model="formInline.region"
          clearable
          placeholder="请选择"
          style="width: 240px"
          size="large"
        >
          <el-option
            v-for="item in data.sitelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="巡检上报时间：">
        <TimePicker></TimePicker>
      </el-form-item>
      <el-form-item label="巡检状态：">
        <el-select
          v-model="formInline.region"
          clearable
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
    <div style="margin: 10px 0">
      <el-button type="primary">EXCEL导出</el-button>
      <el-button @click="location">地址管理</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :isoperate="false">
    </MayTable>
    <Pagination :total="50"></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'

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
      label: '巡检地点'
    },
    {
      prop: 'address',
      label: '巡检上报时间'
    },
    {
      prop: 'manager',
      label: '上报人'
    },
    {
      prop: 'phone',
      label: '巡检状态'
    },
    {
      prop: 'username',
      label: '巡检记录'
    }
  ],
  sitelist: [] as any,
  statelist: [] as any
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}

// 跳转地址管理
const location = () => {
  router.push('/care/Address')
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
