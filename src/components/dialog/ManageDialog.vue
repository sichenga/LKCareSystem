<template>
    <el-dialog v-model="dialogVisible" title="新增/编辑房型" width="500" @close="close">
        <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="楼层号" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入房型名称"/>
            </el-form-item>
            <el-form-item label="床位数" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入床位数"/>
            </el-form-item>
            <el-form-item label="床位费" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入床位费"/>
            </el-form-item>
            <el-form-item label="定金" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入定金"/>
            </el-form-item>
            <el-form-item label="房型介绍">
                <el-input v-model="ruleForm.name" placeholder="请输入房型介绍" type="textarea" />
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
import { reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  desc: '',
})



const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
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


</style>