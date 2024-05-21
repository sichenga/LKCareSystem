<template>
    <el-card>
        <!-- 潜在客户 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人姓名：">
                <el-input v-model="formInline.name" placeholder="请输入老人姓名" clearable />
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="formInline.idCard" placeholder="请输入身份证号" clearable />
            </el-form-item>
            <el-form-item label="创建日期:" style="width: 240px;">
                <MayTimePicker v-model="formInline.beginDate"></MayTimePicker>
            </el-form-item>
            <el-form-item label="状态:" style="width: 240px;">
                <el-select v-model="formInline.state" placeholder="请选择">
                    <el-option v-for="item in data.tables" :key="item.id" :label="item.lable" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin-top: 15px">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="add">新增潜在客户</el-button>
            <el-button>EXCEL导入</el-button>
            <AffDialog @close="close" v-if="isdialog"></AffDialog>
        </div>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate="scope">
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text @click="details(scope.data.id)">详情</el-button>
                <el-button type="primary" text @click="register(scope.data.id)">咨询登记</el-button>
                <el-button type="primary" text @click="handleDelete(scope.data.id)">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="data.token" @page="page" @psize="psize" :page="formInline.page" :pszie="formInline.page">
        </Pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffDialog from '@/components/dialog/care/AffDialog.vue'
import MayTimePicker from '@/components/timepicker/MayTimePicker.vue'
import { getMessageBox } from '@/utils/utils'
import { CustomerList, CustomerDelete } from "@/service/market/CustomerApi"
import type { CustomerParams } from "@/service/market/CustomerType"
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const formInline = reactive<CustomerParams>({
    page: 1,
    pageSize: 5,
    name: '',
    idCard: '',
    beginDate: '',
    state: null,
    endDate: '',
})
// 查询
const search = (() => {
    formInline.page = 1
    getlist()
})
// 详情
const details = (id: any) => {
    router.push(`/market/customer/details/${id}`)
}
const isdialog = ref(false)
const data = reactive({
    token: undefined,
    tables: [{ lable: '预定中', id: '2' }, { lable: '未签约', id: '1' }, { lable: '已入院', id: '3' }] as any,
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'name',
            label: '老人姓名'
        },
        {
            prop: 'gender',
            label: '性别'
        },
        {
            prop: 'idCard',
            label: '身份证'
        },
        {
            prop: 'source',
            label: '来源渠道'
        },
        {
            prop: 'addTime',
            label: '创建时间'
        },
        {
            prop: 'stateName',
            label: '状态'
        },
    ]
})
const getlist = async () => {
    const res: any = await CustomerList(formInline)
    console.log('潜在客户列表', res);
    if (res.code == 10000) {
        data.tableData = res.data.list
        data.token = res.data.counts
    }
}
// 关闭弹窗
const close = () => {
    isdialog.value = false
}
// 新增
const add = () => {
    router.push('/market/customer/add')
}
// 删除
const handleDelete = async (id: any) => {
    let res = await getMessageBox('是否删除潜在客户？', '删除后将不可恢复')
    if (res) {
        const res: any = await CustomerDelete(id)
        console.log('删除', res);
        if (res.code == 10000) {
            getlist()
            ElMessage.success('删除成功')
        } else {
            ElMessage.error(res.msg)
        }

    } else {
        ElMessage.info('取消删除')
    }
}

// 咨询登记
const register =(id:number)=>{
    router.push({
        path:'/market/question',
        query:{
            id:id
        }
    })
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
onMounted(() => {
    getlist()
})
</script>
<style lang="less" scoped>
.el-input {
    height: 40px;
}

.el-button {
    height: 40px;
    line-height: 40px;
}
</style>