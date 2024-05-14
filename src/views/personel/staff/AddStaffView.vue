<template>
    <!-- 新增员工 -->
    <div class="box">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="员工头像:" prop="name">
                <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="员工姓名:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入员工姓名" />
            </el-form-item>
            <el-form-item label="联系方式:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入联系方式" />
            </el-form-item>
            <el-form-item label="身份证号:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="所属部门:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属岗位:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="账号:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="是否护工:" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio value="1">是</el-radio>
                    <el-radio value="2">否</el-radio>
                </el-radio-group>
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
interface RuleForm {
    name: string
    region: string
    resource: number
}
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    region: '',
    resource: 1,
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
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    router.push("/dashboard/staff")
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
// 上传
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
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

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    text-align: center;
}
</style>