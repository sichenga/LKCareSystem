<template>
    <div>
        <div class="size">
            <span>▋</span> 老人自理情况
        </div>
        <MatTable :tableData="state.tableData" :tableItem="state.tableItem" style="width: 1160px;" :identifier="'oldphysical'">
            <template #operate>
                <el-button type="primary" text>上传资料</el-button>
            </template>
        </MatTable>

    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'
import Physical from '@/database/PhysicalView.json';

const MatTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))

const state: any = reactive({
    LableData: [
        {
            id:1,
            lable:'正常'
        },
        {
            id:2,
            lable:'轻度依赖'
        },
        {
            id:3,
            lable:'重度依赖'
        },
    ],
    tableData: [],
    tableItem: [
        {
            label: '体检项目',
            prop: 'physica',
        },
        {
            label: '资料',
            prop: 'image',

        }
    ]
})

const getlist = () => {
    state.tableData = Physical
}

onMounted(() => {


    getlist()
})

</script>
<style lang="less" scoped>
.size {
    color: #666666;
    font-size: 14px;
    margin-top: 50px;

    span {
        color: #409EFF;
    }

}

:deep(.el-table--border .el-table__inner-wrapper) {
    margin-top: 30px;
}
:deep(.el-checkbox__input){
    border-radius: 50%;
    .el-checkbox__inner{
        border-radius: 50%;
    }
}

</style>
