<template>
    <el-dialog v-model="dialogVisible" title="新增机构" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="params" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="机构名称" prop="name">
                <el-input v-model="params.name" placeholder="请输入机构名称" />
            </el-form-item>
            <el-form-item label="所属区域" prop="address">
                <el-input v-model="params.address" placeholder="请输入所属区域" />
            </el-form-item>
            <el-form-item label="管理员名称" prop="adminName">
                <el-input v-model="params.adminName" placeholder="请输入管理员名称" />
            </el-form-item>
            <el-form-item label="联系电话" prop="adminMobile">
                <el-input v-model="params.adminMobile" placeholder="请输入联系电话" />
            </el-form-item>
            <el-form-item label="管理员账号" prop="adminUserName">
                <el-input v-model="params.adminUserName" placeholder="请输入管理员账号" />
            </el-form-item>
            <el-form-item label="管理员密码" prop="adminPwd">
                <el-input v-model="params.adminPwd" placeholder="请输入管理员密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit(ruleFormRef)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { companyadd } from '@/service/Organization/Organization'
import type { companyaddParams } from '@/service/Organization/type'
import router from '@/router';


const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const params = reactive<companyaddParams>({
    id: null,
    name: '',
    address: '',
    telephone: null,
    adminName: '',
    adminMobile: '',
    adminUserName: '',
    adminPwd: '',
    startTime: null,
    legalPerson: null,//法人
    mobile: null,//法人联系号码
    creditCode: null,//统一社会信用代码
    license: null,//卫生许可证
    medicalPoint: null, //医疗点
    house: null //房屋性质

})
const rules = reactive<FormRules<companyaddParams>>({
    name: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
    ],
    address: [
        { required: true, message: '请选择地址', trigger: 'blur' },
    ],
    adminName: [
        { required: true, message: '请输入管理员姓名', trigger: 'blur' },
    ],

    adminMobile: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
    ],
    adminUserName: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    adminPwd: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})
//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}
const submit = async (formEl: FormInstance | undefined) => {

    if (!formEl) return

    await formEl.validate(async (valid, fields) => {
        const res:any = await companyadd(params)
        console.log(res);
        if (valid) {
            if(res.code===10000){
                emit('close', true)
               
            }
           
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="less" scoped></style>