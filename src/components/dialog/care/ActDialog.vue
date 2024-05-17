<template>
  
  <el-dialog v-model="dialogVisible" title="查看编辑" width="500" @close="close">
    <el-form :model="form" label-width="130px" label-position="left" style="max-width: 600px">
      <el-form-item label="老人："> 张国粉 </el-form-item>
      <el-form-item label="精神慰籍内容：" class="formitem">
        <div class="content">
          大苏打倒萨大大大大大大大大大大大大大大大大萨达萨达2顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">关闭</el-button>
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
<style lang="less" scoped>
.content {
  width: 80%;
  white-space: normal;
}
.formitem {
  align-items: flex-start;
}
</style>
