<template>
    <el-dialog v-model="dialogVisible" title="选择服务" width="700" @close="close">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="服务名称">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
        
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
            <template #operate>
                <el-button type="primary"> 选择</el-button>
            </template>
        </MayTable>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import IndustryView from '@/database/IndustryView.json'
const identifier = 'Workers'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))

const formInline = reactive({
    user: '',
    region: '',
    date: '',
})
const data = reactive({

    tableData: [] as any,
    tableItem: [
        {
            prop: 'serve',
            label: '服务名称'
        },
        
    ]
})

const getlist = () => {
    setTimeout(() => {
        data.tableData = IndustryView
    }, 1000)
}
onMounted(() => {
    getlist()
})
//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}
  

</script>

<style lang="less" scoped>
.demo-form-inline .el-input {
    --el-input-width: 200px;
}


</style>