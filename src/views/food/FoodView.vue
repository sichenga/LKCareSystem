<template>
    <!-- 食材管理 -->
    <div class="box">
        <el-button type="primary" @click="isdialog = true" >新增</el-button>
        <FoodDialog @close="close" v-if="isdialog"></FoodDialog>
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
        <!-- 价格更新 -->
        <PriceDialog @close="close" v-if="isprice"></PriceDialog>
    </div>
</template>

<script lang='ts' setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import FoodDialog from '@/components/dialog/FoodDialog.vue'
import PriceDialog from '@/components/dialog/PriceDialog.vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import FoodView from '@/database/FoodView.json'
const isdialog = ref(false)
const isprice=ref(false)
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
// 关闭弹窗
const close = () => {
  isdialog.value = false
  isprice.value=false
}
onMounted(() => {
    getlist()
})
// 编辑
const handleEdit = ((id: any) => {
    console.log('编辑', id);
    isdialog.value=true
})
// 删除
const handleDelete = (async (id: any) => {
    console.log('删除', id);
    let res = await getMessageBox('是否确认删除该角色', '删除后将不可恢复')
    console.log(11112, res)
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
})
// 价格更新
const priceUpdate = ((id: any) => {
    console.log('价格更新', id);
    isprice.value=true
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