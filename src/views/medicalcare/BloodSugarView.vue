<template>
    <!-- 血糖记录 -->
    <!-- dialog写在medicalcare文件夹下 -->
    <el-card style="max-width: 100%">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人:">
                <el-input v-model="formInline.name" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="预定床位">
                <MayCascader :options="BuildRoom" @change="RommId"> </MayCascader>
            </el-form-item>
            <el-form-item label="日期:">
                <MayDateTimePicker @change="handleChange"> </MayDateTimePicker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="max-width: 100%" class="card">
        <el-button type="primary" @click="add" style="margin-bottom: 30px;">添加血糖记录</el-button>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate="{ data }">
                <el-button type="primary" text @click="edit(data.id)">编辑</el-button>
                <el-button type="primary" text @click="handleDelete(data.id)">删除</el-button>
            </template>
        </MayTable>
        <!-- 分页 -->
        <Pagination :total="data.total" @page="page" @psize="psize" :page="formInline.page" :pszie="formInline.page">
        </Pagination>
        <!-- 新增 -->
        <BloodSugarDialog v-if="dialogVisible" @close="close" :id="editid"></BloodSugarDialog>
    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { BloodSugarList, BloodSugarDelete } from "@/service/medicalcare/MedicalcareApi"
import type { bloodSugarlistParams } from "@/service/medicalcare/MedicalcareType"
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import MayCascader from '@/components/cascader/MayCascader.vue'
import BloodSugarDialog from '@/components/dialog/medicalcare/BloodSugarDialog.vue'
import MayDateTimePicker from '@/components/timepicker/MayDateTimePicker.vue'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
import { useRouter } from 'vue-router';
const router = useRouter()
import { useBuildStroe } from '@/stores/mobule/build'
const useBuild = useBuildStroe()
const formInline = reactive<bloodSugarlistParams>({
    page: 1,
    pageSize: 5,
    name: '',
    beginDate: '', //开始时间yyyy-MM-dd
    endDate: '', //结束时间
    begId: null
})
const data = reactive({
    total: undefined as any,
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
            prop: 'title',
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
            label: '血糖',
        }
    ]
})
// 血糖记录列表
const getlist = async () => {
    const res: any = await BloodSugarList(formInline)
    console.log('血糖记录列表', res);
    if (res.code == 10000) {
        data.tableData = res.data.list
        data.total = res.data.counts
    }
}
onMounted(() => {
    getlist()
    BuildList()// 床位
})
//弹出框
const dialogVisible = ref(false)
const close = (val: any) => {
    if (val) {
        getlist()
    }
    dialogVisible.value = false
}
// 查询
const search = () => {
    formInline.page = 1
    getlist()
}

// 添加
const add = () => {
    dialogVisible.value = true
    editid.value = 0
}

// 编辑
const editid = ref(0)
const edit = (id: any) => {
    console.log('编辑', id);
    editid.value = id
    dialogVisible.value = true
}
//删除 
const handleDelete = async (id: any) => {
    let res = await getMessageBox('是否确认删除该血糖记录', '删除后将不可恢复')
    if (res) {
        const del: any = await BloodSugarDelete(id)
        console.log('删除', del)
        if (del?.code === 10000) {
            ElMessage.success('删除成功')
            getlist()
        } else {
            ElMessage.error('删除失败')
        }
    } else {
        ElMessage.info('取消删除')
    }
}
//分页
const page = (val: number) => {
    formInline.page = val
    getlist()
}
const psize = (val: number) => {
    formInline.pageSize = val
    getlist()
}

// 日期
const handleChange = (val: any) => {
    formInline.beginDate = val[0]
    formInline.endDate = val[1]
    console.log(123, val);
}

// 床位
const BuildRoom = ref([])
const BuildList = async () => {
    let res: any = await useBuild.getBuildListData()
    BuildRoom.value = res
}
//选择的房间
const RommId = (val: any) => {
    formInline.begId = val
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