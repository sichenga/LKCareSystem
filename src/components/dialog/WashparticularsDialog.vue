<template>
  <el-dialog v-model="dialogVisible" title="查看详情" width="500" @close="close">
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item class="top_text">
        <div>一个内衣没了</div>
        <div>麻烦看到的朋友</div>
      </el-form-item>
      <el-form-item>
        <el-image :src="url" />
        <el-image :src="url" />
      </el-form-item>
      <el-form-item> 张三 2020.02.02 15.00发布 </el-form-item>
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
import { ref, reactive, defineEmits } from 'vue'
const url = ref('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
// 关闭弹窗
const dialogVisible = ref(true)
const emit = defineEmits(['close'])
const close = (close: boolean = false) => {
  emit('close', close)
}
</script>
<style lang="less" scoped>
.top_text {
  :deep(.el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
  }
}
.el-image {
  margin-right: 10px;
  width: 150px;
  height: 100px;
}
</style>
