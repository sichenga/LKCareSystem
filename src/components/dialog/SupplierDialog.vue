<template>
    <el-dialog v-model="dialogVisible" title="编辑供应商" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="供应商名称:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入供应商名称" />
            </el-form-item>
            <el-form-item label="联系人:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入联系人" />
            </el-form-item>
            <el-form-item label="联系电话:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入联系电话" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)"> 确定 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits,onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

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
    ],
    region: [
        {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
        },
    ],
})

const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
    emit('close', close)
}

</script>
<style lang="less" scoped>
.el-input {
    width: 300px;
}
</style>