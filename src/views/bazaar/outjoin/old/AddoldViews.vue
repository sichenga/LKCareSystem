<template>
    <div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
            <el-tab-pane label="基本信息" name="first">
                <el-card>
                    <el-form ref="ruleFormRef" style="max-width: 500px" :model="ruleForm" :rules="rules"
                        label-width="auto" class="demo-ruleForm" status-icon>
                        <div>
                            <el-form-item label="老人姓名：" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入" />
                            </el-form-item>
                            <el-form-item label="性别：" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio value="1">男</el-radio>
                                    <el-radio value="2">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出生日期：" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="籍贯：" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="民族：" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="身份证号码：" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入" />
                            </el-form-item>
                            <el-form-item label="政治面貌：" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="社保卡号：" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入" />
                            </el-form-item>
                            <el-form-item label="婚姻状况：" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio value="0">已婚</el-radio>
                                    <el-radio value="1">离婚</el-radio>
                                    <el-radio value="2">丧偶</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="受教育程度：" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio value="0">文盲</el-radio>
                                    <el-radio value="1">略识文字</el-radio>
                                    <el-radio value="2">能读写</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="最高学历：" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择">
                                    <el-option label="Zone one" value="shanghai" />
                                    <el-option label="Zone two" value="beijing" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="户口所在地：" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="区/路（存）/弄/号/室" />
                            </el-form-item>
                            <el-form-item label="现在居住地址：" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="区/路（存）/弄/号/室" />
                            </el-form-item>
                            <el-form-item class="demo-ruleForm-but">
                            <el-button>取消</el-button>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">
                                保存
                            </el-button>
                        </el-form-item>
                        </div>
                        <div class="images">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </div>

         
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="健康信息" name="second">
                <el-card>
                    健康信息
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="家属信息" name="third">
                <el-card>
                    家属信息
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue'
import type { FormInstance, FormRules, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const activeName = ref('first')



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
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({
    name: '',
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

const rules = reactive<FormRules<any>>({
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




</script>
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
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
<style lang="less" scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}


.el-form{
    display: flex;
}
:deep(.el-tabs__header) {

    margin: 0 0 0.3px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: none;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {

    border-top-right-radius: 18px;
    background-color: #fff;
}

.el-form-item {
    width: 400px;
}

.demo-ruleForm-but {
    margin-left: 460px;
    .el-button {
        width: 100px;
        height: 40px;
    }
}
</style>
