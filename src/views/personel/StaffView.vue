<template>
    <!-- 员工管理 -->
    <!-- 查询 -->
    <el-card>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="员工姓名：">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="联系方式:">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="身份证号：">
                <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="所属部门：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属岗位：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model="formInline.region" placeholder="请选择" clearable>
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="table">
        <el-button style="margin-bottom: 20px;" type="primary" @click="add">新增</el-button>
        <!-- 表格 -->
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem" :identifier="identifier">
            <template #operate="{data}">
                <el-button type="primary" size="small" link @click="handleEdit">编辑</el-button>
                <el-button type="primary" size="small" link @click="enable">禁用</el-button>
                <el-button type="primary" size="small" link @click="handleDelete(data.id)">删除</el-button>
            </template>
        </MayTable>
        <!-- 分页 -->
        <Pagination :total="50"></Pagination>
    </el-card>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import {staffList,delstaff} from '@/service/staff/staff'
const router = useRouter();
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))

const identifier = 'StaffView'
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'photo',
            label: '头像'
        },
        {
            prop: 'name',
            label: '姓名'
        },
        {
            prop:'mobile',
            label: '联系方式'
        },
        {
            prop: 'idCard',
            label: '身份证号'
        },
        {
            prop: 'departmentId',
            label: '所属部门'
        },
        {
            prop: 'companyId',
            label: '所属岗位'
        },
        {
            prop: 'account',
            label: '账号'
        },
        {
            prop: 'password',
            label: '密码'
        },
        {
            prop: 'isCarer',
            label: '创建人',
        },
        {
            prop: 'creation',
            label: '创建日期',
        },
        {
            prop: 'state',
            label: '状态'
        }
    ]
})
const getlist =async () => {
    let res:any =await staffList()
    console.log(res);
    
    if(res.code==10000){
      data.tableData =  res.data.list
    }
}

// 添加
const add=(()=>{
    router.push("/dashboard/compilestaff")
})
// 编辑
const handleEdit = ((id: any) => {
    console.log('编辑', id);
    router.push("/dashboard/compilestaff")
})
//  禁用
const enable=(async()=>{
    console.log('禁用');
    let res = await getMessageBox('是否确认禁用该员工', '禁用后该员工将不可正常使用系统功能')
    console.log(11112, res)
    if (res) {
         ElMessage.success('删除成功')

    } else {
        ElMessage.info('取消删除')
    }
})

// 删除
const handleDelete = (async (id: any) => {
    console.log('删除', id);
    let res = await getMessageBox('是否确认删除该员工', '删除后将不可恢复')
    console.log(11112, res)
    if (res) {
        let res:any=delstaff(id)
        if(res.code==10000){
            getlist()
            ElMessage.success('删除成功')
        }
        
    } else {
        ElMessage.info('取消删除')
    }
})
const formInline = reactive({
    user: '',
    region: '',
    date: '',
})

const onSubmit = () => {
    console.log('submit!')
}
onMounted(() => {
    getlist()
})
</script>


<style scoped lang="less">
.el-form {
    margin-top: 15px;
}

.table {
    margin-top: 20px;
}
</style>
<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>