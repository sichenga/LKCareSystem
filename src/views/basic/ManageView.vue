<template>
    <!-- 房型管理 -->
    <el-card style="max-width: 100%">
        <el-button type="primary" @click="isdialog = true">新增房间类型</el-button>
        <ManageDialog @close="close" v-if="isdialog"></ManageDialog>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text @click="del">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
    </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, defineAsyncComponent, onMounted } from 'vue'
import ManageView from '@/database/ManageView.json'
import ManageDialog from '@/components/dialog/ManageDialog.vue';
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))

const data = reactive({

    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号',
            width: '60'
        },

        {
            prop: 'roomname',
            label: '房间名称'
        },
        {
            prop: 'bed',
            label: '关联房间数'
        },
        {
            prop: 'fee',
            label: '床位费(元/天)'
        },
        {
            prop: 'earnest',
            label: '定金(元/天)'
        },
        {
            prop: 'rooms',
            label: '关联房间数'
        },
        {
            prop: 'Introduction',
            label: '房型简介'
        },
        {
            prop: 'founder',
            label: '创建人'
        },
        {
            prop: 'addtime',
            label: '创建时间'
        },
    ]
})

const getlist = () => {
    setTimeout(() => {
        data.tableData = ManageView
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
    let res = await getMessageBox('是否确认删除该房型', '删除后将不可恢复')
    console.log(1111, res)
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
}
</script>

<style lang="less" scoped>

.el-button {
    margin-bottom: 20px;
}
</style>