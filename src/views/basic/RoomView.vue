<template>
    <!-- 房间管理 -->
    <el-card style="max-width: 100%">
        <el-button type="primary" @click="isdialog = true">新增房间</el-button>
        <RoomDialog @close="close" v-if="isdialog"></RoomDialog>
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
import RoomView from '@/database/RoomView.json'
import RoomDialog from '@/components/dialog/RoomDialog.vue';
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
            prop: 'rooms',
            label: '房间号'
        },
        {
            prop: 'floor',
            label: '楼层'
        },
        {
            prop: 'bed',
            label: '床位数'
        },
        {
            prop: 'checkin',
            label: '入住老人'
        },

        {
            prop: 'addtime',
            label: '创建人'
        },
        {
            prop: 'founder',
            label: '创建人'
        }
    ]
})

const getlist = () => {
    setTimeout(() => {
        data.tableData = RoomView
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
    let res = await getMessageBox('是否确认删除该房间', '删除后将不可恢复')
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