<template>
    <!-- 食材管理 -->
    <div class="box">
        <el-button type="primary">新增</el-button>
        <!-- 表格 -->
        <el-table :data="tableData" :header-cell-style="{ backgroundColor: '#f9f9f9', color: '#333' }" border
            style="width: 100%">
            <el-table-column prop="id" label="序号" />
            <el-table-column prop="material" label="物料名称" />
            <el-table-column prop="unit" label="单位" />
            <el-table-column prop="supplier" label="供应商" />
            <el-table-column prop="trade" label="批发价" />
            <el-table-column prop="retail" label="零售价" />
            <el-table-column prop="purchase" label="采购价" />
            <el-table-column prop="price" label="价格更新日期" />
            <el-table-column label="操作" width="240">
                <template #default="scope">
                    <el-button type="primary" size="small" link @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button type="primary" size="small" link @click="handleDelete(scope.row.id)">删除</el-button>
                    <el-button type="primary" size="small" link @click="priceUpdate(scope.row.id)">价格更新</el-button>
                    <el-button type="primary" size="small" link @click="priceAnalysis(scope.row.id)">价格分析</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pages">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const tableData = [
    {
        id: 1,
        material: '猪肉',
        unit: '斤',
        supplier: '新民桥菜场',
        trade: 100.00,
        retail: 110.00,
        purchase: 105.00,
        price: '2020-02-02',
    },
    {
        id: 2,
        material: '鸡肉',
        unit: '斤',
        supplier: '国泰民安菜场',
        trade: 100.00,
        retail: 110.00,
        purchase: 105.00,
        price: '2020-02-02',
    },
    {
        id: 3,
        material: '鱼',
        unit: '斤',
        supplier: '幸福大菜场',
        trade: 100.00,
        retail: 110.00,
        purchase: 105.00,
        price: '2020-02-02',
    },
    {
        id: 4,
        material: '茄子',
        unit: '斤',
        supplier: '新民桥菜场',
        trade: 100.00,
        retail: 110.00,
        purchase: 105.00,
        price: '2020-02-02',
    },
    {
        id: 5,
        material: '大白菜',
        unit: '斤',
        supplier: '国泰民安菜场',
        trade: 100.00,
        retail: 110.00,
        purchase: 105.00,
        price: '2020-02-02',
    },
]

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

// 分页
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
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