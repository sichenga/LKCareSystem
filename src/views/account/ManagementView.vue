<template>
    <el-card style="max-width: 100%">
        <el-button type="primary">新增</el-button>

        <el-table :data="tableData" style="width: 100%;margin-top:20px"  border class="custom-table-header">
            <el-table-column fixed prop="date" label="Date" />
            <el-table-column prop="name" label="Name"  />
            <el-table-column prop="state" label="State"  />
            <el-table-column prop="city" label="City"  />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip"  />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">
                        编辑
                    </el-button>
                    <el-button link type="primary" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'

const handleClick = () => {
  console.log('click')
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
    tag: 'Office',
  },
]
</script>

<style lang="less" scoped >

/deep/.el-table__header-wrapper .el-table__header {
  background-color: black !important; /* 你想要的背景颜色 */
}


</style>