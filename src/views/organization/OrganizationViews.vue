<template>
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="机构名称：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="管理姓名">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="SondAdd">新增</el-button>
      <organizationDialog @close="close" v-if="isdialog"></organizationDialog>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text>进入系统</el-button>
        <el-button type="primary" text>修改</el-button>

        <el-button type="primary" text @click="del">删除</el-button>

        <el-button type="primary" text>删除</el-button>
        <el-button type="primary" text @click="SondAdd">修改</el-button>

      </template>
    </MayTable>
    <Pagination :total="data.total" @page="page" @psize="psize" :page="params.page" :pszie="params.page"></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'

import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import type { companylistParams } from '@/service/Organization/type'
import { companylist } from '@/service/Organization/Organization'
import { useUserStore } from '@/stores'
import organizationDialog from '@/components/dialog/organizationDialog.vue';
const userStore = useUserStore()
const isdialog = ref(false)

import AffiliatedView from '@/database/AffiliatedView.json'

const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})
const data = reactive({
  total: undefined,
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '机构名称'
    },
    {
      prop: 'address',
      label: '区域'
    },
    {
      prop: 'adminName',
      label: '管理员姓名'
    },
    {
      prop: 'adminMobile',
      label: '联系电话'
    },
    {
      prop: 'adminUserName',
      label: '管理员账号'
    },
    {
      prop: 'adminPwd',
      label: '管理员密码'
    },
  ]
})
//弹出框
const close = (val: boolean) => {
  isdialog.value = val
  if (val) {
    isdialog.value = false
    getcompanylist()
  }
}

const SondAdd = () => {

  switch (userStore.model.type) {
    case 1:
      router.push('/dashboard/organizationadd')
      break;
    case 2:
      console.log(11111);
      isdialog.value = true
      break;
    default:
      break;
  }

}
const del = async () => {
  let res = await getMessageBox('是否确认删除该机构', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    ElMessage.success('删除成功')
  }
  else {
    ElMessage.info('取消删除')
  }

}
//定义页数
const params = reactive<companylistParams>({
  page: 1,
  pageSize: 10
})
//分页
const page = ((val: number) => {
  params.page = val
  getcompanylist()
})
const psize = ((val: number) => {
  params.pageSize = val
  getcompanylist()
})
//请求列表
const getcompanylist = async () => {
  const res: any = await companylist(params)
  console.log('列表', res);
  if (res.code === 10000) {
    data.tableData = res.data.list
    data.total = res.data.counts
  }


}


onMounted(() => {

  getcompanylist()
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