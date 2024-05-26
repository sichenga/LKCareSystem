<template>
    <!-- 添加血糖记录-->
    <el-dialog v-model="dialogVisible" title="添加血糖记录" width="500" @close="close">
        <el-button type="primary" style="margin-bottom: 30px;" @click="select">选择老人</el-button>
        <BloodOldDialog v-if="idOld" @closes="closes" @id="oldid"></BloodOldDialog>
        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
            class="demo-ruleForm" :size="formSize" status-icon>
            <el-form-item label="血糖" prop="val">
                <el-input v-model="ruleForm.val" placeholder="请输入血糖" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted, defineProps } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { BloodSugarAdd, BloodSugarGet, BloodSugarUpdate } from "@/service/medicalcare/MedicalcareApi"
import { ElMessage } from 'element-plus'
import type { Temperature } from "@/service/medicalcare/MedicalcareType"
import BloodOldDialog from "./BloodOldDialog.vue"
const props = defineProps(['id'])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Temperature>({
    id: 0,
    elderlyId: null,
    val: '',
})

const rules = reactive<FormRules<Temperature>>({
    val: [
        { required: true, message: '请输入血糖', trigger: 'blur' },
    ],
})

// 添加
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            if (ruleForm.elderlyId == null) {
                ElMessage.error('请选择老人')
            } else {
                let res: any
                if (ruleForm.id==0) {
                    res = await BloodSugarAdd(ruleForm).catch(() => { })
                } else {
                    res = await BloodSugarUpdate(ruleForm).catch(() => { })
                }
                if (res.code == 10000) {
                    close(true)
                    ElMessage.success(ruleForm.id==0 ? '添加成功' : '修改成功')
                } else {
                    ElMessage.error(res.msg)
                }
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
// 回显数据
const getData = async () => {
    if (props.id) {
        const res: any = await BloodSugarGet(props.id)
        console.log('单挑数据', res);
        if (res.code == 10000) {
            Object.assign(ruleForm, res.data)
        }
    }
}


onMounted(() => {
    getData()
})

// 选择老人
const idOld = ref(false)
const select = () => {
    idOld.value = true
}
// 老人id
const oldid = (id: number) => {
    console.log(id);
    if (id) {
        ruleForm.elderlyId = id
        ElMessage.success('选择老人成功')
    }
}


// 关闭弹窗
const closes = (val: boolean) => {
    idOld.value = val
}

// 弹出框
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