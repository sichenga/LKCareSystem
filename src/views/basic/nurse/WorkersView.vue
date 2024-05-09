<template>
    <!-- 护工管理 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="护工姓名:">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="联系方式:">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="所属岗位:">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>

                </el-select>
            </el-form-item>
            <el-form-item label="老人姓名:">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%" class="card">
        <el-button type="primary"  @click="isdialog = true">新增</el-button>
        <WorkersDialog @close="close" v-if="isdialog"></WorkersDialog>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
            <template #operate>
                <el-button type="primary" text @click="del">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
    </el-card>
</template>

<script lang="ts" setup>
import { ref,reactive,defineAsyncComponent,onMounted } from 'vue'
import WorkersView from '@/database/WorkersView.json'
import WorkersDialog from '@/components/dialog/WorkersDialog.vue';
const identifier='Workers'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const formInline = reactive({
    user: '',
    region: '',
    date: '',
})
const data = reactive({

    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop:'image',
            label: '头像'
        },
        {
            prop: 'name',
            label: '姓名'
        },
        {
            prop: 'tel',
            label: '联系方式'
        },
        {
            prop: 'station',
            label: '所属岗位'
        },
        {
            prop: 'service',
            label: '服务老人'
        },
    ]
})

const getlist = () => {
    setTimeout(() => {
        data.tableData = WorkersView
    }, 1000)
}
onMounted(() => {
    getlist()
})
//弹出框
const isdialog = ref(false)
const close = () => {
  isdialog.value = false
}
//删除
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const del = async () => {
  let res = await getMessageBox('是否确认删除该护工', '删除后将不可恢复')
  console.log(1111, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
</script>

<style lang="less" scoped>
.card {
    margin-top: 20px;
}
.el-button {
    margin-bottom: 20px;
}
.demo-form-inline .el-input {
    --el-input-width: 200px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}
</style>