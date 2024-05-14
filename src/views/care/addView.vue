<template>
  <!-- 新增外出 -->
  <el-card>
    <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" :rules="rules" label-width="auto"
      class="demo-ruleForm" :size="formSize" status-icon>
      <el-form-item label="老人姓名" prop="name">
        <el-select v-model="ruleForm.name" clearable placeholder="请选择" style="width: 300px">
          <el-option v-for="item in data.oldlist" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="外出时间" prop="name">
        <DateTimePicke style="width: 300px"></DateTimePicke>
      </el-form-item>
      <el-form-item label="陪同人员类型" prop="name">
        <el-select v-model="ruleForm.name" clearable placeholder="请选择" style="width: 300px">
          <el-option v-for="item in data.typelist" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="陪同人员姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="陪同人员电话" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="陪同人员地址" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="外出原因" prop="name">
        <el-input v-model="ruleForm.name" :rows="2" placeholder="请输入原因" type="textarea" style="width: 300px" />
      </el-form-item>
    </el-form>
  </el-card>
  <div class="submit">
    <el-button @click="cancel">取消</el-button>
    <el-button type="primary" @click="add">保存</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const DateTimePicke = defineAsyncComponent(
  () => import('@/components/timepicker/MayDateTimePicker.vue')
)
const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<any>({
  name: '',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: ''
})
const data = reactive({
  oldlist: [] as any,
  typelist: [] as any
})
// 取消提交
const cancel = () => {
  router.push('/Goout')
}
// 提交表单
const add = () => {
  cancel()
}

const rules = reactive<FormRules<any>>({})
</script>
<style lang="less" scoped>
.el-input {
  width: 300px;
}

.submit {
  width: 100%;
  display: flex;
  // justify-content: center;
  margin-top: 20px;
}
</style>
