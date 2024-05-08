<template>
    <el-dialog v-model="dialogVisible" title="价格更新" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="更新日期:">
                2020-03-03
            </el-form-item>
            <el-form-item label="批发价:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入批发价" />
            </el-form-item>
            <el-form-item label="零售价:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入物料名称" />
            </el-form-item>
            <el-form-item label="采购价:" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入物料名称" />
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
import { ref, reactive, defineEmits, onMounted } from 'vue'
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