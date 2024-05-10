<template>
  <el-dialog v-model="dialogVisible" title="新增/编辑药品" width="500" @close="close">
    <el-form
      ref="ruleFormRef"
      style="max-width: 368px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="药品名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="数量" prop="name" class="Special_line">
        <el-input v-model="ruleForm.name" />
        <el-select v-model="ruleForm.name" placeholder="请选择" size="large">
          <el-option
            v-for="item in dosage"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="有效期" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="剂量" prop="name" class="Special_line">
        <el-input v-model="ruleForm.name" />
        <el-select v-model="ruleForm.name" placeholder="请选择" size="large">
          <el-option
            v-for="item in nums"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="服法" prop="name">
        <el-input
          v-model="ruleForm.name"
          style="width: 300px"
          :rows="2"
          type="textarea"
          placeholder="Please input"
        />
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
import { ref, reactive, onMounted, defineEmits } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const nums = [{ value: '盒', label: '盒' }]
const dosage = [{ value: '粒', label: '粒' }]
const ruleForm = reactive<any>({})
const rules = reactive<FormRules<any>>({})
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
.Special_line {
  :deep(.el-form-item__content) {
    justify-content: space-between;
    .el-input {
      width: 140px;
    }
    .el-select {
      width: 140px;
    }
  }
}
</style>
