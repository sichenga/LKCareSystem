<template>
  <el-dialog
    v-model="dialogVisible"
    :title="isinfo ? '设置服药时间' : '停止用药'"
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
      <template v-if="props.isinfo">
        <el-form-item label="8点：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="12点：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="16点：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="20点：" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
      </template>
      <el-form-item :label="isinfo ? '开始时间' : '停止服药时间'" prop="name">
        <TimePicker style="width: 300px"></TimePicker>
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
import { ref, reactive, defineEmits, defineAsyncComponent, defineProps } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const TimePicker = defineAsyncComponent(() => import('@/components/timepicker/MayTimePicker.vue'))
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({})
const rules = reactive<FormRules<any>>({})
const dialogVisible = ref(true)
const addresslist = ref([])
const emit = defineEmits(['close'])
const props = defineProps({
  isinfo: {
    type: Boolean,
    default: true
  }
})
const close = (close: boolean = false) => {
  emit('close', close)
}
</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}
</style>
