<template>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <AddAccountDialog v-if="isdialog" @close="close" :editid="editid"></AddAccountDialog>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate="{ data }">
        <el-button type="primary" text @click="edit(data.id)">编辑</el-button>
        <el-button type="primary" text @click="del(data.id)">删除</el-button>
      </template>
    </MayTable>
    <Pagination
      :total="total"
      :page="form.page"
      :psize="form.pageSize"
      @page="getpage"
      @psize="getpsize"
    ></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { accountlist, accountdel } from '@/service/account/AccountApi'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import type { AccountList } from '@/service/account/AccountType'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const AddAccountDialog = defineAsyncComponent(
  () => import('@/components/dialog/AddAccountDialog.vue')
)
const total = ref(0)
const editid = ref(0)
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
      prop: 'mobile',
      label: '手机号'
    },
    {
      prop: 'username',
      label: '账号'
    },
    {
      prop: 'pwd',
      label: '密码'
    },
    {
      prop: 'roleIds',
      label: '所属角色'
    }
  ]
})
const form = reactive<AccountList>({
  page: 1,
  pageSize: 5
})
const isdialog = ref(false)
// 获取列表
const getlist = async () => {
  let res: any = await accountlist(form).catch(() => {})
  console.log('账号管理', res)
  if (res?.code == 10000) {
    total.value = res.data.counts
    data.tableData = res.data.list
  }
}

// 新增
const add = () => {
  isdialog.value = true
}
// 编辑
const edit = (id: number) => {
  console.log(id)
  editid.value = id
  isdialog.value = true
}
// 关闭弹框
const close = (val: boolean) => {
  if (val) {
    getlist()
  }
  isdialog.value = false
}
// 删除
const del = async (id: number) => {
  let res = await getMessageBox('是否确认删除该角色', '删除后将不可恢复')
  console.log(11112, id)
  if (res) {
    let res: any = await accountdel(id).catch(() => {})
    if (res?.code == 10000) {
      ElMessage.success('删除成功')
      getlist()
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    ElMessage.info('取消删除')
  }
}
// 分页
const getpage = (val: number) => {
  form.page = val
  getlist()
}
const getpsize = (val: number) => {
  form.pageSize = val
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
