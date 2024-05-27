<template>
  <el-dialog
    v-model="dialogVisible"
    :title="!props.roomid ? '增加查房记录' : '编辑查房记录'"
    width="500"
    @close="close"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      label-position="left"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="选择老人：" prop="elderlyId">
        <el-select
          v-model="ruleForm.elderlyId"
          clearable
          placeholder="请选择老人"
          style="width: 300px"
        >
          <el-option v-for="item in olddata" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="精神：" prop="spirit">
        <el-input v-model="ruleForm.spirit" placeholder="请输入精神" />
      </el-form-item>
      <el-form-item label="饮食：" prop="diet">
        <el-input v-model="ruleForm.diet" placeholder="请输入饮食" />
      </el-form-item>
      <el-form-item label="睡眠：" prop="sleep">
        <el-input v-model="ruleForm.sleep" placeholder="请输入睡眠" />
      </el-form-item>
      <el-form-item label="大便：" prop="shit">
        <el-input v-model="ruleForm.shit" placeholder="请输入大便" />
      </el-form-item>
      <el-form-item label="小便：" prop="urinate">
        <el-input v-model="ruleForm.urinate" placeholder="请输入小便" />
      </el-form-item>
      <el-form-item label="交流：" prop="communicate">
        <el-input v-model="ruleForm.communicate" placeholder="请输入交流" />
      </el-form-item>
      <el-form-item label="记忆：" prop="memory">
        <el-input v-model="ruleForm.memory" placeholder="请输入记忆" />
      </el-form-item>
      <el-form-item label="体温：" prop="temperature">
        <el-input v-model="ruleForm.temperature" placeholder="请输入体温" />
      </el-form-item>
      <el-form-item label="脉搏：" prop="pulse">
        <el-input v-model="ruleForm.pulse" placeholder="请输入脉搏" />
      </el-form-item>
      <el-form-item label="呼吸：" prop="breathe">
        <el-input v-model="ruleForm.breathe" placeholder="请输入呼吸" />
      </el-form-item>
      <el-form-item label="血压：" prop="blood">
        <el-input v-model="ruleForm.blood" placeholder="请输入血压" />
      </el-form-item>
      <el-form-item label="医生建议：" prop="suggest">
        <el-input v-model="ruleForm.suggest" placeholder="医生建议" />
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
import { ref, reactive, defineEmits, defineProps, onMounted } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { getElderlyList } from '@/service/old/OldApi'
import { ElMessage } from 'element-plus'
import { CheckRoomAdd, CheckRoomGet, CheckRoomUpdate } from '@/service/medicalcare/MedicalcareApi'
import type { CheckRoomAddParams } from '@/service/medicalcare/MedicalcareType'
const olddata = ref<any>([])
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<CheckRoomAddParams>({
  elderlyId: null,
  spirit: '',
  diet: '',
  sleep: '',
  shit: '',
  urinate: '',
  communicate: '',
  memory: '',
  temperature: '',
  pulse: '',
  breathe: '',
  blood: '',
  suggest: ''
})
const rules = reactive<FormRules<CheckRoomAddParams>>({
  elderlyId: [
    {
      required: true,
      message: '请选择老人',
      trigger: 'change'
    }
  ],
  spirit: [
    {
      required: true,
      message: '请输入精神',
      trigger: 'blur'
    }
  ],
  diet: [
    {
      required: true,
      message: '请输入饮食',
      trigger: 'blur'
    }
  ],
  sleep: [
    {
      required: true,
      message: '请输入睡眠',
      trigger: 'blur'
    }
  ],
  shit: [
    {
      required: true,
      message: '请输入大便',
      trigger: 'blur'
    }
  ],
  urinate: [
    {
      required: true,
      message: '请输入小便',
      trigger: 'blur'
    }
  ],
  communicate: [
    {
      required: true,
      message: '请输入交流',
      trigger: 'blur'
    }
  ],
  memory: [
    {
      required: true,
      message: '请输入记忆',
      trigger: 'blur'
    }
  ],
  temperature: [
    {
      required: true,
      message: '请输入体温',
      trigger: 'blur'
    }
  ],
  pulse: [
    {
      required: true,
      message: '请输入脉搏',
      trigger: 'blur'
    }
  ],
  breathe: [
    {
      required: true,
      message: '请输入呼吸',
      trigger: 'blur'
    }
  ],
  blood: [
    {
      required: true,
      message: '请输入血压',
      trigger: 'blur'
    }
  ],
  suggest: [
    {
      required: true,
      message: '请输入医生建议',
      trigger: 'blur'
    }
  ]
})
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const props = defineProps({
  roomid: {
    type: Number,
    default: 0
  }
})
// 关闭弹窗
const close = (close: boolean = false) => {
  emit('close', close)
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const valid = await formEl.validate().catch(() => {})
  if (valid) {
    let res: any
    if (!ruleForm.id) {
      res = await CheckRoomAdd(ruleForm)
    } else {
      res = await CheckRoomUpdate(ruleForm)
    }
    if (res?.code === 10000) {
      ElMessage.success(ruleForm.id ? '修改成功' : '添加成功')
      close(true)
    }
  }
}
// 老人列表
const getelderlylist = async () => {
  const res: any = await getElderlyList()
  console.log(res)
  if (res?.code === 10000) {
    olddata.value = res?.data.list.map((item: any) => ({
      id: item.id,
      name: item.name
    }))
  }
}

// 数据回显
const Editold = async () => {
  if (props.roomid) {
    let res: any = await CheckRoomGet(props.roomid)
    if (res?.code === 10000) {
      Object.assign(ruleForm, res?.data)
    }
  }
}
// 生命周期
onMounted(() => {
  getelderlylist()
  Editold()
})
// onMounted
</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
