<template>
    <!-- 采购申请 -->
    <!-- 查询 -->
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="机构名称：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="期望到货日期：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="table">
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" size="small" link @click="deliver">发货</el-button>
                <el-button type="primary" size="small" link @click="details">查看详情</el-button>
            </template>
        </MayTable>
        <!-- 分页 -->
        <Pagination :total="50"></Pagination>
    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import PurchasingView from '@/database/PurchasingView.json'
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'creation',
            label: '创建时间'
        },
        {
            prop: 'applicant',
            label: '申请人'
        },
        {
            prop: 'organization',
            label: '机构名称'
        },
        {
            prop: 'species',
            label: '品种数'
        },
        {
            prop: 'arrival',
            label: '期望到货日期'
        },
        {
            prop: 'state',
            label: '状态'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = PurchasingView
    }, 1000)
}
onMounted(() => {
    getlist()
})
// 发货
const deliver = (() => {
    console.log('发货');
})
// 查看详情
const details = (() => {
    console.log('查看详情');
    router.push("/dashboard/receiving")
})
const formInline = reactive({
    user: '',
    region: '',
    date: '',
})

const onSubmit = () => {
    console.log('submit!')
}
</script>


<style scoped lang="less">
.el-form {
    margin-top: 15px;
}

.table {
    margin-top: 20px;
}
</style>
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>