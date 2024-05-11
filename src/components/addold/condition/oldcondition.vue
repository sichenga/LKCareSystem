<template>
    <div>
        <div class="size">
            <span>▋</span> 老人自理情况
        </div>
        <MatTable :tableData="state.tableData" :tableItem="state.tableItem" style="width: 760px;">
            <template #operate="{data}">
                {{ data.checkid }}
                <el-checkbox-group v-model="data.checkid">
                    <el-checkbox v-for="item in state.LableData" :key="item.id" :value="item.id" :label="item.lable"  />
                </el-checkbox-group>
                
            </template>
        </MatTable>
        <div>
            <div class="titles">
                其他疾病
            </div>
            <el-input v-model="textarea2"   type="textarea" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'
import Condition from '@/database/ConditionView.json';
const textarea2 = ref('')
const MatTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const checkList = ref([])
console.log(checkList);

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
            label: '排序',
            prop: 'id',
        },
        {
            label: '维度',
            prop: 'dimensionality',

        }
    ]
})

const getlist = () => {
    state.tableData = Condition
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

.titles {
    margin-top: 20px;
}
:deep(.el-textarea__inner){
    margin-top: 10px;
    width: 750px;
    height: 160px;
}
</style>
