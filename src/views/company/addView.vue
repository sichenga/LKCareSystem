<template>
    <!-- 新增分机构 -->
    <el-card style="max-width: 100%">
        <div class="title">
            <div class="title-text">
                <span>▋</span>
                基础信息
            </div>
            <div class="title-btn">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save(ruleFormRef)">保存</el-button>
            </div>
        </div>
        <div class="form-size">
            <el-form ref="ruleFormRef" :inline="true" :rules="rules" label-position="top" :model="params"
                class="demo-form-inline">
                <el-form-item label="机构名称:" prop="name">
                    <el-input v-model="params.name" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="地址:" prop="address">
                    <el-input v-model="params.address" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="对外服务电话:" prop="telephone">
                    <el-input v-model="params.telephone" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="管理员姓名：" prop="adminName">
                    <el-input v-model="params.adminName" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="联系方式：" prop="adminMobile">
                    <el-input v-model="params.adminMobile" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="账号:" prop="adminUserName">
                    <el-input v-model="params.adminUserName" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="密码:" prop="adminPwd">
                    <el-input v-model="params.adminPwd" placeholder="请输入" clearable />
                </el-form-item>
                <el-form-item label="开业时间:" prop="startTime">
                    <!-- <el-select v-model="params.startTime" placeholder="请选择" clearable>
                        <el-option label="0" value="8点" />
                    </el-select> -->
                    <MayTimePicker v-model="params.startTime"></MayTimePicker>
                </el-form-item>
            </el-form>
        </div>
        <div class="title-text">
            <span>▋</span>
            经营信息
        </div>
        <div class="form-size">
            <el-form :inline="true" :rules="rules" label-position="top" :model="params" class="demo-form-inline">
                <el-form-item label="法人代表：">
                    <el-input v-model="params.legalPerson" placeholder="请输入法人" clearable />
                </el-form-item>
                <el-form-item label="法人代表联系号码:">
                    <el-input v-model="params.mobile" placeholder="请输入法人联系号码" clearable />
                </el-form-item>
                <el-form-item label="统一社会信用代码">
                    <el-input v-model="params.creditCode" placeholder="请输入统一社会信用码" clearable />
                </el-form-item>
            </el-form>
            <el-form :inline="true" :rules="rules" label-position="right" :model="params" class="demo-form-inline">
                <el-form-item label="卫生许可证：">
                    <el-radio-group v-model="params.license">
                        <el-radio v-model="params.license" :label="0">是</el-radio>
                        <el-radio v-model="params.license" :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否具备医疗定点资格：">
                    <el-radio-group v-model="params.medicalPoint">
                        <el-radio v-model="params.medicalPoint" :label="0">是</el-radio>
                        <el-radio v-model="params.medicalPoint" :label="1">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="房屋性质：">
                    <el-radio-group v-model="params.house">
                        <el-radio v-model="params.house" label="0">自有产权</el-radio>
                        <el-radio v-model="params.house" label="1">租赁</el-radio>
                        <el-radio v-model="params.house" label="2">合作使用</el-radio>
                        <el-radio v-model="params.house" label="3">其他</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <el-form :inline="true" :rules="rules" label-position="top" :model="params" class="demo-form-inline">
                <el-form-item label="营业执照：" v-model="params.certificate">
                        <UploadPictures></UploadPictures>
                </el-form-item>
                <el-form-item label="机构图片:" v-model="params.picture">
                    <el-button type="primary" class='button'>
                        添加图片
                    </el-button>
                   
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { companyadd, companyget } from '@/service/Organization/Organization'
import type { companyaddParams } from '@/service/Organization/type'
import MayTimePicker from '@/components/timepicker/MayTimePicker.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'

const MassUpload = defineAsyncComponent(() => import('@/components/upload/MassUpload.vue'))
const UploadPictures = defineAsyncComponent(() => import('@/components/upload/UploadPictures.vue'))
const route = useRoute()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()


const data = reactive({
    id: " " as any
})
const params = reactive<companyaddParams>({
    id: data.id,
    name: '',
    address: '',
    telephone: '',
    adminName: '',
    adminMobile: '',
    adminUserName: '',
    adminPwd: '',
    startTime: '',
    legalPerson: '',//法人
    mobile: '',//法人联系号码
    creditCode: '',//统一社会信用代码
    license: null,//卫生许可证
    medicalPoint: null, //医疗点
    house: null, //房屋性质
    certificate: null,//营业执照
    picture: null,//机构图片
})
const rules = reactive<FormRules<companyaddParams>>({
    name: [
        { required: true, message: '请输入机构名称', trigger: 'blur' },
    ],
    address: [
        { required: true, message: '请选择地址', trigger: 'blur' },
    ],
    telephone: [
        { required: true, message: '请输入对外服务电话', trigger: 'blur' },
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
    ],
    startTime: [
        { required: true, message: '请选择开业时间', trigger: 'change' },
    ],
})
//保存
const save = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (params.id == 0) {
                const res: any = await companyadd(params).catch(() => { })
                console.log(res);
                if (res.code === 10000) {
                    ruleFormRef.value && ruleFormRef.value.resetFields();
                    params.legalPerson = '',
                        params.mobile = '',
                        params.creditCode = '',
                        params.license = null,
                        params.medicalPoint = null,
                        params.house = null,
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })

                } else {
                    ElMessage({
                        message: '添加失败',
                        type: 'error',
                    })
                }
            } else {
                const res: any = await companyadd(params).catch(() => { })
                console.log("修改", res);
                if (res.code === 10000) {
                    ruleFormRef.value && ruleFormRef.value.resetFields();
                    params.legalPerson = '',
                        params.mobile = '',
                        params.creditCode = '',
                        params.license = null,
                        params.medicalPoint = null,
                        params.house = null,
                        ElMessage({
                            message: '修改成功',
                            type: 'success',
                        })

                } else {
                    ElMessage({
                        message: '添加失败',
                        type: 'error',
                    })
                }
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
//取消
const cancel = () => {
    router.push({
        path: 'Company'
    })
}
//单条数据

const getcompanyget = (async () => {
    data.id = route.query.id
    if (data.id) {
        const res: any = await companyget(data.id)
        console.log("单条数据", res);
        Object.assign(params, res.data)
    }

})
//上传图片
const uploadImg =()=>{
    
}
const uploadrem = ()=>{

}
onMounted(() => {
    getcompanyget()
})
</script>
<style lang="less" scoped>
.section {
    width: 100%;
    height: 819px;
    background-color: #fff;
}

.title-text {
    margin: 40px;

    span {
        color: #409EFF;
    }
}

.title {
    display: flex;
    justify-content: space-between;
    height: 57px;



    .title-btn {
        margin: 40px;

        .el-button {
            width: 100px;
            height: 40px;
        }
    }

}

.el-form-item {
    width: 479px;
    margin-top: 40px;
    margin-left: 40px;

}

.el-form-item:nth-child(n+4) {
    margin-top: 20px;
}

.button {
    width: 92px;
    height: 40px;
}
</style>