<template>
    <el-dialog v-model="dialogVisible" title="新增/编辑家属" width="500" @close="close">
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入管理员名称" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="身份证号:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入管理员账号" />
        </el-form-item>
        <el-form-item label="与老人关系:" prop="name">
          <el-select v-model="ruleForm.address" placeholder="请选择" style="width: 300px">
            <el-option v-for="item in addresslist" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别:">
      <el-radio-group v-model="ruleForm.name">
        <el-radio value="1">男</el-radio>
        <el-radio value="2">女</el-radio>
      </el-radio-group>
    </el-form-item>
        <el-form-item label="联系地址" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入管理员密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="close(false)">取消</el-button>
          <el-button type="primary" @click="close"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script lang="ts" setup>
  import { ref, reactive, onMounted, defineEmits } from 'vue'
  import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
  const formSize = ref<ComponentSize>('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive<any>({})
  const rules = reactive<FormRules<any>>({})
  const dialogVisible = ref(true)
  const addresslist = ref([])
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
  