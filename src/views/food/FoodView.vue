<template>
    <!-- 食材管理 -->
    <div class="box">
        <el-button type="primary">新增</el-button>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" size="small" link @click="handleEdit">编辑</el-button>
                <el-button type="primary" size="small" link @click="handleDelete">删除</el-button>
                <el-button type="primary" size="small" link @click="priceUpdate">价格更新</el-button>
                <el-button type="primary" size="small" link @click="priceAnalysis">价格分析</el-button>
            </template>
        </MayTable>
        <!-- 分页 -->
        <Pagination :total="50"></Pagination>
    </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import FoodView from '@/database/FoodView.json'
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'material',
            label: '物料名称'
        },
        {
            prop: 'unit',
            label: '单位'
        },
        {
            prop: 'supplier',
            label: '供应商'
        },
        {
            prop: 'trade',
            label: '批发价'
        },
        {
            prop: 'retail',
            label: '零售价'
        },
        {
            prop: 'purchase',
            label: '采购价'
        },
        {
            prop: 'price',
            label: '价格更新日期'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = FoodView
    }, 1000)
}
onMounted(() => {
    getlist()
})
// 编辑
const handleEdit = ((id: any) => {
    console.log('编辑', id);
})
// 删除
const handleDelete = ((id: any) => {
    console.log('删除', id);
})
// 价格更新
const priceUpdate = ((id: any) => {
    console.log('价格更新', id);
})
// 价格更新
const priceAnalysis = ((id: any) => {
    console.log('价格分析', id);
    router.push('/dashboard/Analysis')
})

</script>

<style scoped lang="less">
.box {
    padding: 20px;
    background-color: #fff;

    .el-table {
        margin-top: 40px;
    }

    .pages {
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        margin-bottom: 20px;
    }
}
</style>