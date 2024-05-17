<template>
  <el-card class="box-card">
    <el-button type="primary" @click="add">添加部门</el-button>
    <DepartmentTree v-if="isdialog" @close="close" :deppid="deppid" :depid="depid"></DepartmentTree>
    <el-tree
      class="tree"
      style="max-width: 400px"
      :data="dataSource"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
      :props="{ children: 'children', label: 'name' }"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="success" @click="add(data)" :icon="Plus" circle />
            <el-button type="primary" @click="emit(data)" :icon="Edit" circle />
            <el-button type="danger" @click="remove(data)" :icon="Delete" circle />
          </span>
        </span>
      </template>
    </el-tree>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { Delete, Edit, Plus } from '@element-plus/icons-vue'
import { TreeData } from '@/utils/utils'
import { getMessageBox } from '@/utils/utils'
import { departmentList } from '@/service/staff/StaffApi'
import type { DepartmentListParams } from '@/service/staff/StaffType'
const DepartmentTree = defineAsyncComponent(
  () => import('@/components/dialog/AddDepartmentDialog.vue')
)
const depid = ref<number>(0)
const deppid = ref<number>(0)
const isdialog = ref(false)
// 部门列表
const dataSource = ref<DepartmentListParams[]>([])
const getlist = async () => {
  let res: any = await departmentList().catch(() => {})
  console.log('部门列表', res)
  if (res?.code === 10000) {
    dataSource.value = TreeData(res.data.list)
  }
}
onMounted(() => {
  getlist()
})
// 增加部门
const add = (data: DepartmentListParams) => {
  // console.log(1111, data)
  if (data?.id) {
    deppid.value = data.id
  }
  isdialog.value = true
}
// 修改部门
const emit = (data: DepartmentListParams) => {
  console.log(data)
  depid.value = data.id
  isdialog.value = true
}
// 删除部门
const remove = (data: DepartmentListParams) => {
  console.log(data)
  let obj = {
    text1: '',
    text2: ''
  }
  if (!data.children) {
    obj.text1 = '是否确认删除该部门'
    obj.text2 = '删除后将不可恢复'
  } else {
    obj.text1 = '该部门关联了若干员工'
    obj.text2 = '不支持删除操作'
  }
  let res: any = getMessageBox(obj.text1, obj.text2, '删除确认')
  if (res) {
  }
}

// 关闭弹窗
const close = (isrefresh: boolean) => {
  if (isrefresh === true) {
    getlist()
  }
  isdialog.value = false
}
</script>

<style scoped lang="less">
.box-card {
  width: 100%;
  height: 100%;
  :deep(.el-card__body) {
    height: 100%;
  }
}
.tree {
  margin-top: 50px;
}
.custom-tree-node {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span:last-child {
    margin-left: 15px;
  }
}
:deep(.el-tree-node__content) {
  margin-bottom: 15px;
  height: 35px;
}
</style>
