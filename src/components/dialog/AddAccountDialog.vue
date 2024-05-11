<template>
  <el-dialog v-model="dialogVisible" title="新增账号" width="500" @close="close">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="ruleForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码：" prop="pwd">
        <el-input v-model="ruleForm.pwd" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="所属角色" prop="roleIds">
        <el-select v-model="ruleForm.roleIds" placeholder="请选择" style="width: 300px" multiple>
          <el-option v-for="item in addresslist" :key="item" :label="item" :value="item" />
        </el-select>
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
import { ref, reactive, defineEmits } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const formSize = ref<ComponentSize>('default')
import { accountadd } from '@/service/account/AccountApi'
import type { AddAccount } from '@/service/account/AccountType'
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<AddAccount>({
  username: '',
  pwd: '',
  name: '',
  enable: 0,
  mobile: '',
  roleIds: []
})
const rules = reactive<FormRules<AddAccount>>({
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    }
  ],
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    }
  ],
  pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
  // roleIds: [
  //   {
  //     required: true,
  //     message: '请输入所属角色',
  //     trigger: 'change'
  //   }
  // ]
})
const dialogVisible = ref(true)
const addresslist = ref([])
const emit = defineEmits(['close'])
// 关闭弹框
const close = (close: boolean = false) => {
  emit('close', close)
}
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const valid = await formEl.validate()
  if (valid) {
    let res: any = await accountadd(ruleForm).catch(() => {})
    console.log('增加账号', res)
    if (res?.code === 10000) {
      close(true)
    }
  }
}

</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
