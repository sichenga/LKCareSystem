<template>
  <!-- dialog写在market文件夹下 -->
  <!-- 老人管理 -->
  <el-card>
    <el-form ref="RefElderly" :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="老人姓名:" prop="name">
        <el-input v-model="formInline.name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="身份证号码:" prop="idCard">
        <el-input v-model="formInline.idCard" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="床位:" prop="begId">
        <el-select v-model="formInline.begId">
          <el-option v-for="item in data.bedData" :key="item.id" :label="item.name" :value="item.name" />

        </el-select>
      </el-form-item>
      <el-form-item label="入住状况:" prop="state">
        <el-select v-model="formInline.state">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getQuery">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin-top: 15px">
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增老人</el-button>
    </div>
    <!-- 表格 -->
    <MayTable :identifier="identifier" :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate="{ data }">
        <el-button text type="primary" @click="edit(data.id)">编辑</el-button>
        <el-button text type="primary" @click="getarchives(data.id)">档案管理</el-button>
        <el-button text type="primary" @click="getwork(data.id)">排班管理</el-button>
        <el-button text type="primary" @click="del(data.id)">删除</el-button>
        <el-button text type="primary" @click="getschedule(data.id)">计划任务</el-button>
      </template>
    </MayTable>
    <Pagination
      :page="formInline.page"
      :pageSize="formInline.pageSize"
      :total="total"
      @page="getPage"
      @pize="getSize"
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
import { getBedsList } from '@/service/config/ConfigApi'

const total = ref(0)
const RefElderly = ref()
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
  ],
  bedData: [] as any
})
// 老人列表
const getList = async () => {
  let res: any = await getElderlyList(formInline)
  console.log('老人列表', res)
  if (res?.code === 10000) {
    total.value = res.data.counts
    data.tableData = res.data.list
  }
}
// 查询
const getQuery = () => {
  formInline.page = 1
  getList()
}
// 重置
const reset = () => {
  formInline.page = 1
  RefElderly.value?.resetFields()
  getList()
}
// 删除
const del = async (id: number) => {
  let res = await getMessageBox('是否删除老人？', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    let del: any = await deleteElderly(id)
    if (del?.code === 10000) {
      ElMessage.success('删除成功')
      await getList()
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
const getPage = (page: number) => {
  formInline.page = page
  getList()
}
const getSize = (size: number) => {
  formInline.pageSize = size
  getList()
}
// 床位列表
const bedList = async () => {
  let res: any = await getBedsList()
  console.log('床位列表', res)
  if (res?.code === 10000) {
    data.bedData = res.data.list.map((item:any)=>({
      id:item.id,
      name:item.name
    }))
  }
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
// 档案管理
const getarchives = (id: number) => {
  router.push({
    path: `/market/elderly/records`,
    query: { id }
  })
}
onMounted(() => {
  getList()
  bedList()
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
