w
<template>
  <!-- 采购申请 -->
  <!-- 查询 -->
  <el-card>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="机构名称：">
        <el-select v-model="params.companyId" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in data.companyId" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="期望到货日期：">
        <!-- <el-select v-model="params.beginDate" placeholder="请选择" clearable>
                    <el-option label="2024-05 " value="2024-05" />
                </el-select> -->
        <!-- <el-date-picker v-model="params.beginDate" type="date" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择"
                   value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker> -->
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="params.state" placeholder="请选择" clearable>
          <el-option label="已经发货" value="已经发货" />
          <el-option label="未发货" value="未发货" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="table">
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" size="small" link @click="deliver">发货</el-button>
        <el-button type="primary" size="small" link @click="details">查看详情</el-button>
      </template>
    </MayTable>
    <!-- 分页 -->
    <Pagination @page="page" @psize="psize" :total="data.total" :page="params.page" :psize="params.pageSize">
    </Pagination>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { PurchaseList } from '@/service/food/FoodApi'
import type { Purchase } from '@/service/food/FoodType'
import { companylist } from '@/service/Organization/OrganizationApi'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const data = reactive({
  companyId: [] as any,
  total: undefined,
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'addTime',
      label: '创建时间'
    },
    {
      prop: 'addAccountName',
      label: '申请人'
    },
    {
      prop: 'companyName',
      label: '机构名称'
    },
    {
      prop: 'counts',
      label: '品种数'
    },
    {
      prop: 'receiveTime',
      label: '期望到货日期'
    },
    {
      prop: 'state',
      label: '状态'
    }
  ]
})
const params = reactive<Purchase>({
  pageSize: 5,
  page: 1,
  companyId: '',
  state: '',
  beginDate: '',
  endDate: ''
})
// 采购申请列表
const getlist = async () => {
  const res: any = await PurchaseList(params).catch(() => { })
  console.log('采购申请列表', res)
  if (res.code == 10000) {
    data.tableData = res.data.list
    data.total = res.data.counts
  }
}
// 机构名称
const getdata = async () => {
  const res: any = await companylist({ page: 1, pageSize: 5 })
  console.log('机构名称', res)
  if (res.code == 10000) {
    data.companyId = res.data.list
  }
}
onMounted(() => {
  getlist()
  getdata()
})
// 发货
const deliver = () => {
  console.log('发货')
}
// 查看详情
const details = () => {
  console.log('查看详情')
  router.push(`/diet/purchase/purchase-detail/1`)
}
//
const onReset = () => {
  // if (!formEl) return
  // formEl.resetFields()
}

const onSubmit = () => {
  getlist()
}
// 分页
const page = (val: number) => {
  params.page = val
  getlist()
}
const psize = (val: number) => {
  params.pageSize = val
  getlist()
}
</script>

<style scoped lang="less">
.el-form {
  margin-top: 15px;
}

.table {
  margin-top: 20px;
}
</style>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
