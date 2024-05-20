<template>
    <!-- 血压记录 -->
    <!-- dialog写在medicalcare文件夹下 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人:">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="床位:">
                <el-select v-model="formInline.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%" class="card">
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :isoperate="false">
            <template #operate="{ data }">
                <el-button type="primary" size="small" text @click="record(data.id)">查看记录</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
        <!-- 新增 -->
        <ReferrerDialog @close="close" v-if="isdialog"></ReferrerDialog>
        <!-- 积分奖励 -->
        <RewarDialog @close="close" v-if="isdshow"></RewarDialog>
    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import CheckRoomView from '@/database/CheckRoomView.json'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import ReferrerDialog from '@/components/dialog/market/ReferrerDialog.vue'
import RewarDialog from '@/components/dialog/market/Rewardialog.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { useRouter } from 'vue-router';
const router = useRouter()
const formInline = reactive({
    user: '',
    region: '',
    date: '',
})
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'title',
            label: '统计日期',
        },
        {
            prop: 'title',
            label: '记录人',
        },
        {
            prop: 'feedback',
            label: '老人姓名'
        },
        {
            prop: 'complaint',
            label: '床位',
        },
        {
            prop: 'addTime',
            label: '血压',
        },
        {
            prop: 'addTime',
            label: '脉搏',
        }
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = CheckRoomView
    }, 1000)
}
onMounted(() => {
    getlist()
})
//弹出框
const isdialog = ref(false)
const isdshow = ref(false)
const close = (val: any) => {
    if (val) {
        getlist()
    }
    isdialog.value = false
    isdshow.value = false
}
// 查看记录
const record = (id: any) => {
    console.log('查看记录', id);
    router.push("/medicalcare/check-room/details/id")
}

</script>

<style lang="less" scoped>
.card {
    margin-top: 20px;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>