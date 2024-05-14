<template>
    <!-- 新增岗位 -->
    <div class="box">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="岗位名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="权限配置:" prop="name">
                <el-tree style="max-width: 600px " :data="data.tableData" show-checkbox node-key="id" :expand-on-click-node="false"
               :props="{ label: 'name' }" ref="treeRef" />
            </el-form-item>
        </el-form>
    </div>
    <div class="button">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
            确定
        </el-button>
    </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter();
import AddPostVive from '@/database/AddPostVive.json'
const data = reactive({
    tableData: [] as any,
})
const getlist = () => {
    setTimeout(() => {
        data.tableData = AddPostVive
    }, 1000)
}
onMounted(() => {
    getlist()
})
interface RuleForm {
    name: string
    region: string
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    region: '',
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
})
const submitForm = async (formEl: FormInstance | undefined) => {
    router.push("/dashboard/post")
    // if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //     if (valid) {
    //         console.log('submit!')
    //     } else {
    //         console.log('error submit!', fields)
    //     }
    // })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="less">
.box {
    background-color: #fff;
    padding: 20px;
}

.el-form-item {
    width: 400px;
}

.button {
    text-align: center;
    margin-top: 40px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>