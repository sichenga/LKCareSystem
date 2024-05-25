<template>
    <!-- 血糖记录 -->
    <!-- dialog写在medicalcare文件夹下 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人:">
                <el-input v-model="formInline.name" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="床位:">
                <el-select v-model="formInline.begId" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%" class="card">
        <el-button type="primary" @click="add" style="margin-bottom: 30px;">添加血糖记录</el-button>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate="{ data }">
                <el-button type="primary" text @click="edit(data.id)">编辑</el-button>
                <el-button type="primary" text @click="del(data.id)">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
        <!-- 新增 -->
        <BloodSugarDialog v-if="dialogVisible" @close="close"></BloodSugarDialog>
    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { BloodSugarList } from "@/service/medicalcare/MedicalcareApi"
import type { bloodSugarlistParams } from "@/service/medicalcare/MedicalcareType"
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import BloodSugarDialog from '@/components/dialog/medicalcare/BloodSugarDialog.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { useRouter } from 'vue-router';
const router = useRouter()
const formInline = reactive({
    page: 1,
    pageSize: 5,
    name: '',
    begId: null
})
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'addTime',
            label: '统计日期',
        },
        {
            prop: 'title',
            label: '记录人',
        },
        {
            prop: 'elderlyName',
            label: '老人姓名'
        },
        {
            prop: 'begName',
            label: '床位',
        },
        {
            prop: 'val',
            label: '血糖',
        }
    ]
})
// 血糖记录列表
const getlist = async () => {
    const res: any = await BloodSugarList(formInline)
    console.log('血糖记录列表', res);
    if (res.code == 10000) {
        data.tableData = res.data.list
    }

}
onMounted(() => {
    getlist()
})
//弹出框
const dialogVisible = ref(false)
const close = (val: any) => {
    if (val) {
        getlist()
    }
    dialogVisible.value = false
}
// 查询
const search = () => {
    formInline.page = 1
    getlist()
}

// 添加
const add = () => {
    dialogVisible.value = true
}

// 编辑
const edit = (id: any) => {
    console.log('编辑', id);
}
// 删除
const del = (id: any) => {
    console.log('删除', id);
}
</script>

<style lang="less" scoped>
.card {
    margin-top: 20px;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>