<template>
    <el-dialog v-model="dialogVisible" title="新增房间" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="房间号" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入房间号" />
            </el-form-item>
            <el-form-item label="房间类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">

                </el-select>
            </el-form-item>
            <el-form-item label="所属楼层" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择">

                </el-select>
            </el-form-item>
            <el-form-item label="床位数" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入床位数" />
            </el-form-item>
            <el-form-item label="房间图片" prop="desc">
                <MassUpload  v-model="ruleForm.desc"></MassUpload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref,defineAsyncComponent } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const MassUpload = defineAsyncComponent(() => import('@/components/upload/MassUpload.vue'))
interface RuleForm {
    name: string
    region: string
    desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    region: '',
    desc: '',
})



const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],

})





//弹框
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}
</script>

<style lang="less" scoped>
:deep.el-upload {
    width: 50px;
    height: 50px;
}
:deep .el-upload--picture-card {
    width: 100px ;
    height: 100px;
}
</style>