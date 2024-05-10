<template>
    <!-- 待收货 -->
    <el-card>
        <!-- 详情 -->
        <div class="details">
            <div class="left">
                <div class="l">
                    <div>创建时间：</div>
                    <div>申请人：</div>
                    <div>品种数：</div>
                    <div>实际采购成本：</div>
                </div>
                <div class="r">
                    <div>2020-02-02 15：00</div>
                    <div>张三</div>
                    <div>10</div>
                    <div>10000.00</div>
                </div>
            </div>
            <div class="right">
                <h2>待收货</h2>
            </div>
        </div>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :isoperate="false"></MayTable>
    </el-card>
    <!-- 返回 -->'
    <div class="back">
        <el-button @click="back">返回</el-button>
    </div>

</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
import ReceivingView from '@/database/ReceivingView.json'
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
            prop: 'amount',
            label: '采购数量'
        },
        {
            prop: 'arrived',
            label: '实际到货数量'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = ReceivingView
    }, 1000)
}
onMounted(() => {
    getlist()
})

// 返回
const back=(()=>{
    router.go(-1)
})
</script>

<style scoped lang="less">
.details {
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    .left {
        display: flex;

        .l {
            margin-right: 30px;
        }
    }

    .right {
        line-height: 100px;
    }
}

.back {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
</style>