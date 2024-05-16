<template>
  <!-- 采购申请 -->
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="sond">创建采购申请</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate="{ data }">
        <el-button type="primary" text @click="del">删除</el-button>
        <el-button type="primary" text @click="edit">编辑</el-button>
        <el-button type="primary" text @click="delivery(data.id)">收货验货</el-button>
        <el-button type="primary" text @click="getifno(data.id)">查看详情</el-button>
      </template>
    </MayTable>
    <Pagination @page="pageChenge" @psize="pageSizeChenge" :total="states.total"></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { getPurchaseList } from '@/service/purchase/PurchaseApi'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const reteor = useRouter()
const data = reactive({
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
      prop: 'counts',
      label: '品种'
    },
    {
      prop: 'addAccountId',
      label: '实际采购成本'
    },
    {
      prop: 'state',
      label: '状态'
    }
  ]
})
const states = ref({
  page: 1,
  pageSize: 5,
  total: 0
})
// 列表
const getlist = async () => {
  let res: any = await getPurchaseList(states.value)
  if (res.code == 10000) {
    states.value.total = res.data.counts
    data.tableData = res.data.list
  }
}
// 分页
const pageChenge = (val: any) => {
  states.value.page = val
  getlist()
}
const pageSizeChenge = (val: any) => {
  states.value.pageSize = val
  getlist()
}

const del = async () => {
  let res = await getMessageBox('是否确认删除该采购申请', '删除后将不可恢复')

  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
// 创建采购申请
const sond = () => {
  reteor.push('/logistics/purchase/add')
}
// 编辑采购申请
const edit = () => {
  sond()
}
//收货验货
const delivery = (id: number) => {
  reteor.push('/logistics/purchase/details/' + id)
}
// 查看详情
const getifno = (id: any) => {
  reteor.push({
    path: '/logistics/purchase/check',
    query: {
      id: id
    }
  })
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
