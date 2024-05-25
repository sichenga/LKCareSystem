<template>
    <el-dialog v-model="dialogVisible" title="添加血糖记录" width="500" @close="close">

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="close(true)"> 确定 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, onMounted } from 'vue'








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