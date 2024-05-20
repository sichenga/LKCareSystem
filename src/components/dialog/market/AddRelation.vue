<template>
  <el-dialog v-model="dialogVisible" title="新增/编辑家属" width="500" @close="close">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="ruleForm.idCard" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item label="与老人关系" prop="relation">
        <el-select v-model="ruleForm.family.relation" placeholder="请选择与老人关系">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio :value="0">男</el-radio>
          <el-radio :value="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="ruleForm.address" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close(false)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

//潜在客户添加
import { CustomerAdd } from '@/service/market/CustomerApi'
import type { CustomerAddType } from '@/service/market/CustomerType'

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<CustomerAddType>({
  name: '',
  mobile: '',
  gender: null,
  idCard: '',
  status: '',
  roomRequire: '',
  content: '',
  state: 1,
  source: '在线咨询',
  family: [{
    name: '5456',
    mobile: '546546',
    gender: null,
    idCard: '54654',
    relation: '5654', // 现在可以安全地使用 relation，因为它在 FamilyMember 接口中定义了
    address: '5454'
  }]
})



const rules = reactive<FormRules<CustomerAddType>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  mobile: [
    { required: true, message: '请输入联系电话', trigger: 'blur' },
  ],
  idCard: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
  ],
  relation: [
    { required: true, message: '请选择与老人关系', trigger: 'blur' },
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '请输入联系地址', trigger: 'blur' },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async(valid, fields) => {
    if (valid) {
      const res = await CustomerAdd(ruleForm)
      console.log();
      
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
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

.el-select {
  width: 300px;
}
</style>