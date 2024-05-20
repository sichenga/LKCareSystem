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
            <el-form-item label="老人性别" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="身份证号" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入老人身份证号" />
            </el-form-item>
            <el-form-item label="老人状况" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入老人状况" />
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
            <el-form-item label="房间需求" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入老人状况" />
            </el-form-item>
            <el-form-item label="意向描述" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" placeholder="请输入老人状况" />
            </el-form-item>
            <div class="btn">
                <el-button >取消</el-button>
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

interface RuleForm {
    name: string
    region: string
    count: string
    date1: string
    date2: string
    delivery: boolean
    location: string
    type: string[]
    resource: string
    desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: 'Hello',
    region: '',
    count: '',
    date1: '',
    date2: '',
    delivery: false,
    location: '',
    type: [],
    resource: '',
    desc: '',
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'change',
        },
    ],
    date1: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],
    location: [
        {
            required: true,
            message: 'Please select a location',
            trigger: 'change',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        { required: true, message: 'Please input activity form', trigger: 'blur' },
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
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
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
    margin:  0 auto;
    margin-top: 30px;
}
</style>