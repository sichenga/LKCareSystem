<template>
    <el-card>
        <!-- 潜在客户 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="老人姓名：">
                <el-input v-model="formInline.user" placeholder="请输入老人姓名" clearable />
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="formInline.user" placeholder="请输入身份证号" clearable />
            </el-form-item>
            <el-form-item label="创建日期:" style="width: 240px;">
                <el-select v-model="formInline.region" placeholder="请选择">
            
                </el-select>
            </el-form-item>
            <el-form-item label="状态:" style="width: 240px;">
                <el-select v-model="formInline.region" placeholder="请选择">
                    <el-option v-for="item in data.tables" :key="item.id" :label="item.lable" :value="item.id" />
 
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin-top: 15px">
        <div style="margin: 10px 0">
            <el-button type="primary" @click="isdialog = true">新增潜在客户</el-button>
            <el-button>EXCEL导入</el-button>
            <AffDialog @close="close" v-if="isdialog"></AffDialog>
        </div>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
            <template #operate>
                <el-button type="primary" text>编辑</el-button>
                <el-button type="primary" text @click="router.push('/dashboard/particulars')">详情</el-button>
                <el-button type="primary" text @click="router.push('/dashboard/consult')">咨询登记</el-button>
                <el-button type="primary" text @click="del">删除</el-button>
            </template>
        </MayTable>
        <Pagination :total="50"></Pagination>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import AffDialog from '@/components/dialog/care/AffDialog.vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import {useRouter} from  'vue-router'
const router = useRouter()
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const formInline = reactive({
    user: '',
    region: '',
    date: ''
})


const isdialog = ref(false)
const data = reactive({
    tables:[{lable:'未签约',id:'0'},{lable:'预定中',id:'1'},{lable:'已入院',id:'2'}] as any,
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
            prop: 'address',
            label: '性别'
        },
        {
            prop: 'manager',
            label: '身份证'
        },
        {
            prop: 'phone',
            label: '来源渠道'
        },
  
        {
            prop: 'addtime',
            label: '创建时间'
        },
        {
            prop: 'creator',
            label: '状态'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = AffiliatedView
    }, 1000)
}
// 关闭弹窗
const close = () => {
    isdialog.value = false
}
// 删除
const del = async () => {
    let res = await getMessageBox('是否删除潜在客户？', '删除后将不可恢复')
    console.log(11112, res)
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
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