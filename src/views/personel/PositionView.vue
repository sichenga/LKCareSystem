<template>
  <!-- 岗位管理 -->
  <div class="box">
    <el-button style="margin-bottom: 30px" type="primary" @click="add">新增岗位</el-button>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" size="small" link @click="handleEdit">编辑</el-button>
        <el-button type="primary" size="small" link @click="handleDelete">删除</el-button>
      </template>
    </MayTable>
    <!-- 分页 -->
    <Pagination :total="50"></Pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import PostVive from '@/database/PostVive.json'
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'station',
      label: '岗位名称'
    },
    {
      prop: 'bank',
      label: '关联账号数'
    },
    {
      prop: 'creator',
      label: '创建人'
    },
    {
      prop: 'created',
      label: '创建日期'
    }
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = PostVive
  }, 1000)
}
// 新增
const add = () => {
  console.log('新增')
  router.push('/personel/position/add')
}
// 编辑
const handleEdit = (id: any) => {
  console.log('编辑', id)
  router.push('/personel/position/add')
}
// 删除
const handleDelete = async (id: any) => {
  console.log('删除', id)
  let res = await getMessageBox('是否确认删除该岗位', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
onMounted(() => {
  getlist()
})
</script>

<style scoped lang="less">
.box {
  background-color: #fff;
  padding: 20px;
}
</style>
