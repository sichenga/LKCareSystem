
<template>
  <!-- 详情资讯 -->
  <el-dialog v-model="dialogVisibles" title="详情" width="500" @close="close">
    <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="咨询类型:" prop="name">
            <div>
              线下咨询
            </div>
      </el-form-item>
      <el-form-item label="咨询渠道:" prop="name">
        <div>
          来访登记
        </div>
      </el-form-item>
      <el-form-item label="咨询人:" prop="name">
        <div>
          张三丰
        </div>
      </el-form-item>
      <el-form-item label="联系电话：" prop="name">
        <div>
          17768089870
        </div>
      </el-form-item>
      <el-form-item label="与老人关系:" prop="name">
        <div>
          父子
        </div>
      </el-form-item>
      <el-form-item label="策划回访日期:" prop="name">
        <div>
          2020-03-03
        </div>
      </el-form-item>
      <el-form-item label="咨询内容:">
        <div>
          需要特定的床位，前来看一下环境条件！
        </div>
      </el-form-item>
      <el-form-item label="登记人:">
        <div>
          徐三
        </div>
      </el-form-item>
      <el-form-item label="登记时间:">
        <div>
          2020-09-09  18：00
        </div>
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
const dialogVisibles = ref(true)

const emit = defineEmits(['close'])

const close = (close: boolean = false) => {

  emit('close', close)

}
</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}
.el-form-item{
  div{
    margin-left: 58px;
  }
}
</style>