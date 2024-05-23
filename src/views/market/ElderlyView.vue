<template>
  <!-- dialog写在market文件夹下 -->
  <!-- 老人管理 -->
  <el-card>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="老人姓名:">
        <el-input v-model="formInline.name" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="身份证号码:">
        <el-input v-model="formInline.idCard" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="床位:">
        <el-select v-model="formInline.begId">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="入住状况:">
        <el-select v-model="formInline.state">
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
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增老人</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
      <template #operate="{ data }">
        <el-button type="primary" text @click="edit(data.id)">编辑</el-button>
        <el-button type="primary" text>档案管理</el-button>
        <el-button type="primary" text @click="getwork(data.id)">排班管理</el-button>
        <el-button type="primary" text @click="del(data.id)">删除</el-button>
        <el-button type="primary" text @click="getschedule(data.id)">计划任务</el-button>
      </template>
    </MayTable>
    <Pagination
      :total="total"
      :page="formInline.page"
      :pageSize="formInline.pageSize"
      @page="getpage"
      @pize="getpize"
    ></Pagination>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { getElderlyList, deleteElderly } from '@/service/old/OldApi'
import type { ListElderlyRequest } from '@/service/old/OldType'
const total = ref(0)
const formInline = reactive<ListElderlyRequest>({
  page: 1,
  pageSize: 5,
  name: '',
  idCard: undefined,
  begId: undefined,
  state: undefined
})
const identifier = 'administration'
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'photo',
      label: '头像'
    },
    {
      prop: 'name',
      label: '老人姓名'
    },
    {
      prop: 'gender',
      label: '性别'
    },
    {
      prop: 'idCard',
      label: '身份证号'
    },
    {
      prop: 'begName',
      label: '床位'
    },
    {
      prop: 'stateName',
      label: '状态'
    }
  ]
})
const getlist = async () => {
  let res: any = await getElderlyList(formInline)
  console.log('老人列表', res)
  if (res?.code === 10000) {
    total.value = res.data.counts
    data.tableData = res.data.list
  }
}

// 删除
const del = async (id: number) => {
  let res = await getMessageBox('是否删除老人？', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    let del: any = await deleteElderly(id)
    if (del?.code === 10000) {
      ElMessage.success('删除成功')
      getlist()
    }
  } else {
    ElMessage.info('取消删除')
  }
}
// 新增老人
const add = () => {
  router.push('/market/elderly/add')
}
// 编辑
const edit = (id: number) => {
  router.push({
    path: `/market/elderly/edit/${id}`
  })
}
// 分页
const getpage = (page: number) => {
  formInline.page = page
  getlist()
}
const getpize = (pize: number) => {
  formInline.pageSize = pize
  getlist()
}

// 排班管理
const getwork = (id: number) => {
  router.push({
    path: `/market/elderly/work`,
    query: { id }
  })
}
// 任务计划
const getschedule = (id: number) => {
  router.push({
    path: `/market/elderly/schedule`,
    query: { id }
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
.el-form--inline .el-form-item {
  width: 270px;
}
</style>
