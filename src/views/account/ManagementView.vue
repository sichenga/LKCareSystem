<template>
  <el-card style="max-width: 100%">
    <el-button type="primary">新增</el-button>

    <el-table :data="tableData" style="width: 100%;margin-top:20px" border
      :header-cell-style="{ backgroundColor: '#f9f9f9' }" :header-style="{ color: 'red' }">
      <el-table-column fixed prop="id" label="序号" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="tell" label="手机号" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="pass" label="密码" />
      <el-table-column prop="role" label="所属角色" />
      <el-table-column prop="founder" label="创建人" />
      <el-table-column prop="creationtime" label="创建时间" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            编辑
          </el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" background
        layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </el-card>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const handleClick = () => {
  console.log('click')
}
const tableData = [
  {
    id: '1',
    username: '张三',
    tell: '17768089879',
    account: 'zhangsan',
    pass: '123445',
    role: '机构管理员',
    founder: '张海迪',
    creationtime:'2020-02-02 16:00'
  },
  {
    id: '2',
    username: '李四',
    tell: '17768089879',
    account: 'lisi',
    pass: '123445',
    role: '机构管理员',
    founder: '李三丰',
    creationtime:'2020-02-02 16:00'
  },
  {
    id: '3',
    username: '王五',
    tell: '17768089879',
    account: '王五',
    pass: '123445',
    role: '机构管理员',
    founder: '张国立',
    creationtime:'2020-02-02 16:00'
  },
  
]

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="less" scoped>
.el-table_1_column_1 .cell {
  color: red !important;
}

.demo-pagination-block {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>