<template>
  <el-dialog v-model="dialogVisible" title="新增/编辑地址" width="500" @close="close">
    <el-form :model="form" label-width="100px" label-position="left" style="max-width: 600px">
      <el-form-item label="地址名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="地址二维码：">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="close(true)"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
const emit = defineEmits(['close'])
const dialogVisible = ref(true)
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})
// 关闭弹窗
const close = (close: boolean = false) => {
  emit('close', close)
}
</script>
<style lang="less" scoped></style>
