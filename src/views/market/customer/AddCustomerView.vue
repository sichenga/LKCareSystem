<template>
    <!-- 新增潜在客户 -->
    <el-card style="margin-top: 15px" class="section">
        <div class="title">
            <div class="title-text">
                <span>▋</span>
                老人信息
            </div>

        </div>
        <div class="form-size">
            <el-form :rules="rules" label-position="right" :model="formInline" class="demo-form-inline">
                <el-form-item label="老人姓名:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入老人姓名" />
                </el-form-item>
                <el-form-item label="老人性别:" prop="region">
                    <el-select v-model="formInline.region" placeholder="请选择">
                        <el-option label="男" value="1" />
                        <el-option label="女" value="2" />
                    </el-select>
                </el-form-item>
                <el-form-item label="身份证:" prop="user">
                    <el-input v-model="formInline.user" placeholder="请输入老人身份证" />
                </el-form-item>
                <el-form-item label="老人状况:">
                    <el-input v-model="formInline.user"  type="textarea" placeholder="请输入老人状况" />
                </el-form-item>
            </el-form>
        </div>
        <div class="title-text">
            <span>▋</span>
            家属信息
        </div>
        <div class="form-size">
                <div style="margin: 10px 0">
                    <el-button type="primary" @click='addRelation'>新增家属</el-button>
                </div>
                <!-- 表格 -->
                <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
                    <template #operate>
                        <el-button type="primary" text>编辑</el-button>
                        <el-button type="primary" text @click="del">删除</el-button>
                    </template>
                </MayTable>
                <Pagination :total="50"></Pagination>
        </div>
        <div class="title-text">
            <span>▋</span>
            需求总结
        </div>
        <div class="form-size">
            <el-form-item label="房间需求:" class="form-size-box">
                    <el-input v-model="formInline.user"  type="textarea" placeholder="请输入房间需求" />
            </el-form-item>
            <el-form-item label="意向描述:">
                    <el-input v-model="formInline.user"  type="textarea" placeholder="请输入意向描述" />
            </el-form-item>
        </div>

    </el-card>
    <div class="title-btn">
            <el-button>取消</el-button>
            <el-button type="primary">保存</el-button>
    </div>
    <AddRelation v-if="dialogVisible" @close="Holedclose"></AddRelation>
</template>
<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import {getMessageBox} from '@/utils/utils'
import { ElMessage } from 'element-plus'

const AddRelation = defineAsyncComponent(() => import('@/components/dialog/AddRelation.vue'))
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
const data = reactive({
    tableData: [] as any,
    tableItem: [
        {
            prop: 'id',
            label: '序号'
        },
        {
            prop: 'name',
            label: '姓名'
        },
        {
            prop: 'address',
            label: '性别'
        },
        {
            prop: 'manager',
            label: '身份证号'
        },
        {
            prop: 'phone',
            label: '联系电话'
        },
        {
            prop: 'username',
            label: '联系地址'
        },
        {
            prop: 'userpass',
            label: '与老人关系'
        },
    ]
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = AffiliatedView
    }, 1000)
}
const dialogVisible = ref(false)
const addRelation=()=>{
    dialogVisible.value=true
}

const Holedclose =(val:any)=>{
    dialogVisible.value=val
}
const del = async()=>{
    let res = await getMessageBox('是否确认删除该家属','删除后将不可恢复')
    if(res){
        ElMessage.success('删除成功')
    }else{
        ElMessage.info('取消删除')
    }
}
onMounted(() => {
    getlist()
})
const formInline = reactive({
    user: '',
    region: '',
    date: '',
    resource: ''
})

const rules = reactive<FormRules<any>>({
    user: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
    ],
    region: [
        { required: true, message: 'Please select Activity zone', trigger: 'change' },
    ],
})
</script>
<style lang="less" scoped>
.section {
    width: 100%;
    background-color: #fff;
}

.title-text {
    margin: 40px;

    span {
        color: #409EFF;
    }
}
.form-size{
    margin: 40px;
}
.title {
    display: flex;
    justify-content: space-between;
    height: 57px;
}
.form-size-box{
    margin-bottom: 120px;
}
.title-btn {
    margin: 40px 690px;

    .el-button {
        width: 100px;
        height: 40px;
    }
}

.el-form-item {
    width: 429px;
    margin-top: 40px;
    margin-left: 40px;

}



.button {
    width: 92px;
    height: 40px;
}
</style>