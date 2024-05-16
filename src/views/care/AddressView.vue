<template>
  <!-- 地址管理 -->
  <LocationDialog v-if="isdialog" @close="close"></LocationDialog>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="isdialog = true">新增地址</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text>编辑</el-button>
        <el-button type="primary" text @click="del">删除</el-button>
      </template>
    </MayTable>
    <Pagination
      :total="total"
      :page="params.page"
      :psize="params.pageSize"
      @page="getpage"
      @psize="getpsize"
    ></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { addresslist } from '@/service/address/AddressApi'
import type { AddressList } from '@/service/address/AddressType'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import LocationDialog from '@/components/dialog/LocationDialog.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
// const LocationDialog = defineAsyncComponent(() => import('@/components/dialog/LocationDialog.vue'))
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
      prop: 'qrcode',
      label: '二维码'
    }
  ]
})
const total = ref(0)
const params = reactive<AddressList>({
  page: 1,
  pageSize: 5
})
// 地址管理
const getlist = async () => {
  let res: any = await addresslist(params).catch(() => {})
  console.log('地址列表', res)
  if (res?.code === 10000) {
    total.value = res.data.counts
    data.tableData = res.data.list
  }
}
// 关闭弹窗
const close = () => {
  isdialog.value = false
}
// 删除
const del = async () => {
  let res = await getMessageBox('是否确认删除该地址', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
// 分页
const getpage = (page: number) => {
  params.page = page
  getlist()
}
const getpsize = (pageSize: number) => {
  params.pageSize = pageSize
  getlist()
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
