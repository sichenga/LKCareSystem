<template>
    <!-- 新增员工 -->
    <div class="box">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="员工头像:" prop="name">
                <AvatarUpload></AvatarUpload>
            </el-form-item>
            <el-form-item label="员工姓名:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入员工姓名" />
            </el-form-item>
            <el-form-item label="联系方式:" prop="mobile">
                <el-input v-model="ruleForm.mobile" placeholder="请输入联系方式" />
            </el-form-item>
            <el-form-item label="身份证号:" prop="idCard">
                <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号" />
            </el-form-item>
            <el-form-item label="所属部门:" prop="departmentId">
                <el-select v-model="ruleForm.departmentId" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="所属岗位:" prop="isCarer">
                <el-select v-model="ruleForm.isCarer" placeholder="请选择">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="账号:" prop="adminUserName">
                <el-input v-model="ruleForm.adminUserName" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码:" prop="adminPwd">
                <el-input v-model="ruleForm.adminPwd" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="是否护工:" prop="enable">
                <el-radio-group v-model="ruleForm.enable">
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
import { reactive, toRefs, ref, onMounted,defineAsyncComponent } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import type {RuleForm} from '@/service/staff/type'

import  {staffAdd} from '@/service/staff/staff'
const router = useRouter();
const AvatarUpload = defineAsyncComponent(() => import('@/components/upload/AvatarUpload.vue'))

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    photo: "1.jpg",
    name: "", //姓名
    mobile: "", //手机号
    isCarer: null, //所属岗位
    departmentId: null, //部门id
    adminUserName: "", //用户名
    adminPwd: "", //密码
    enable: null, //是否
    idCard: "", //身份证
    roles: [] //角色
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入员工名', trigger: 'blur' },
    ],
    idCard: [
        { required: true, message: '请输入身份证', trigger: 'blur' },
    ],
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
    ],
    adminUserName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    adminPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    departmentId: [
        {
            required: true,
            message: '请选择所属部门',
            trigger: 'change',
        },
    ],
    enable: [
        {
            required: true,
            message: '是否护工',
            trigger: 'change',
        },
    ],
    isCarer: [
        {
            required: true,
            message: '请选择所属岗位',
            trigger: 'change',
        },
    ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            let res:any=await staffAdd(ruleForm)
            console.log(res);
            
        } else {
            console.log('error submit!', fields)
        }
    })
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