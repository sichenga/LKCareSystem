<template>
    <!-- 体温记录 -->
    <!-- dialog写在medicalcare文件夹下 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="params" class="demo-form-inline">
            <el-form-item label="老人:">
                <el-input v-model="params.name" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="床位:">
                <el-select v-model="params.begId" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="inquire">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-button type="primary" style="margin-top: 20px;" @click='add'>新增体温</el-button>

    <TemperatureDialog v-if="dialogVisible" @close="close"></TemperatureDialog>

    <el-card style="max-width: 100%" class="card">
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate="{ data }">
                <el-button type="primary" size="small" text @click="del(data.id)">删除</el-button>
                <el-button type="primary" size="small" text @click="record(data.id)">编辑</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>

    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { TemperatureList } from '@/service/medicalcare/MedicalcareApi'
import type {MedicalcareParams} from '@/service/medicalcare/MedicalcareType'
import TemperatureDialog from '@/components/dialog/medicalcare/TemperatureDialog.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { useRouter } from 'vue-router';
const router = useRouter()

const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'addTime',
            label: '统计日期',
        },
        {
            prop: 'houseName',
            label: '记录人',
        },
        {
            prop: 'elderlyName',
            label: '老人姓名'
        },
        {
            prop: 'begName',
            label: '床位',
        },
        {
            prop: 'val',
            label: '体温',
        }
    ]
})
const params = reactive<MedicalcareParams>({
    page: 1,
    pageSize: 10,
    name: '', //老人姓名
    beginDate: '', //开始时间yyyy-MM-dd
    endDate: '', //结束时间
    begId: null //床位Id
})
//体温列表
const getlist = async () => {
    let res: any = await TemperatureList(params)
    console.log(res);
    
    if (res?.code === 10000) {
        data.tableData = res.data.list
    }
}

//弹出框
const dialogVisible = ref(false)

const close = (val: any) => {
    dialogVisible.value = val
}

// 添加
const add=()=>{
    dialogVisible.value=true
}
// 查看记录
const record = (id: any) => {
    console.log('查看记录', id);
    router.push("/medicalcare/check-room/details/id")
}
// 删除
const del = async (id: number) => {

    let res = await getMessageBox('是否确认删除此体温记录', '删除后将不可恢复')
    if (res) {
        console.log(id);

        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
}
// 搜索
const inquire=()=>{
    params.page=1
    getlist()
}
onMounted(() => {
    getlist()
})
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