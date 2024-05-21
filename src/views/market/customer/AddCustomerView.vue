<template>
    <!-- 新增潜在客户 -->
    <el-card style="max-width: 100%">
        <div class="header">
            <span>▋</span> 老人信息
        </div>
        <el-form ref="ruleFormRef" style="margin-top: 20px; " :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="老人姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入老人姓名" />
            </el-form-item>
            <el-form-item label="老人性别" prop="gender">
                <el-select v-model="ruleForm.gender" placeholder="请选择">
                    <el-option label="男" :value="1" />
                    <el-option label="女" :value="0" />
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
                <el-input v-model="ruleForm.idCard" placeholder="请输入老人身份证号" />
            </el-form-item>
            <el-form-item label="老人状况" prop="status">
                <el-input v-model="ruleForm.status" type="textarea" placeholder="请输入老人状况" />
            </el-form-item>

            <div class="family">
                <span>▋</span> 家属信息
            </div>
            <el-button type="primary" @click='addRelation' style="margin-bottom: 20px;">新增家属</el-button>
            <AddRelation v-if="dialogVisible" @close="Holedclose"></AddRelation>
            <!-- 表格 -->
            <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
                <template #operate>
                    <el-button type="primary" text>编辑</el-button>
                    <el-button type="primary" text @click="del">删除</el-button>
                </template>
            </MayTable>
            <Pagination :total="50"></Pagination>

            <div class="family">
                <span>▋</span>需求总结
            </div>
            <el-form-item label="房间需求" prop="roomRequire">
                <el-input v-model="ruleForm.roomRequire" type="textarea" placeholder="请输入房间需求" />
            </el-form-item>
            <el-form-item label="意向描述" prop="content">
                <el-input v-model="ruleForm.content" type="textarea" placeholder="请输入意向描述" />
            </el-form-item>
            <div class="btn">
                <el-button>取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
        </el-form>
    </el-card>

</template>
<script lang="ts" setup>

import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const AddRelation = defineAsyncComponent(() => import('@/components/dialog/market/AddRelation.vue'))
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const Pagination = defineAsyncComponent(() => import('@/components/pagination/MayPagination.vue'))
//表单
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
//潜在客户添加
import { CustomerAdd } from '@/service/market/CustomerApi'
import type { CustomerAddType } from '@/service/market/CustomerType'
import { useRouter } from 'vue-router';
const router = useRouter()
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<CustomerAddType>({
    name: '',
    mobile: '',
    gender: null,
    idCard: '',
    status: '',
    roomRequire: '',
    content: '',
    state: 1,
    source: '在线咨询',
    family: [{
        name: '',
        mobile: '',
        gender: null,
        idCard: '',
        relation: '',
        address: ''
    }]
})
const rules = reactive<FormRules<CustomerAddType>>({

    name: [
        { required: true, message: '请输入老人姓名', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择老人性别', trigger: 'blur' },
    ],
    idCard: [
        { required: true, message: '请输入老人身份证号', trigger: 'blur' },
    ],
    status: [
        { required: true, message: '请输入老人身体状况', trigger: 'blur' },
    ],
    roomRequire: [
        { required: true, message: '请输入房间需求', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '请输入意向描述', trigger: 'blur' },
    ],
})


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
            prop: 'gender',
            label: '性别'
        },
        {
            prop: 'idCard',
            label: '身份证号'
        },
        {
            prop: 'mobile',
            label: '联系电话'
        },
        {
            prop: 'address',
            label: '联系地址'
        },
        {
            prop: 'relation',
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
const addRelation = () => {
    dialogVisible.value = true
}

const Holedclose = (val: any) => {
    dialogVisible.value = val
}
const del = async () => {
    let res = await getMessageBox('是否确认删除该家属', '删除后将不可恢复')
    if (res) {
        ElMessage.success('删除成功')
    } else {
        ElMessage.info('取消删除')
    }
}
//添加潜在客户
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res: any = await CustomerAdd(ruleForm)
            console.log('添加潜在客户', res);
            if (res.code === 10000) {
                ElMessage.success('添加成功')
                router.push('/market/customer')
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}

onMounted(() => {
    getlist()
})

</script>
<style lang="less" scoped>
.header {
    height: 50px;
    font-weight: bold;

    span {
        line-height: 50px;
        color: #529bfd;
    }
}

.family {
    height: 50px;
    font-weight: bold;

    span {
        line-height: 50px;
        color: #529bfd;
    }
}

.el-input {
    width: 400px;
}

.el-select {
    width: 400px;
}

.el-textarea {
    width: 400px;
}

.btn {
    width: 200px;
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
}
</style>