<!-- daw2 -->
<template>
  <el-form
    ref="ruleFormRef"
    style="max-width: 500px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    status-icon
  >
    <div>
      <el-form-item label="老人姓名：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="性别：" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio value="1">男</el-radio>
          <el-radio value="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="籍贯：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="民族：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号码：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="政治面貌：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="社保卡号：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="婚姻状况：" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio value="0">已婚</el-radio>
          <el-radio value="1">离婚</el-radio>
          <el-radio value="2">丧偶</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="受教育程度：" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio value="0">文盲</el-radio>
          <el-radio value="1">略识文字</el-radio>
          <el-radio value="2">能读写</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="最高学历：" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="户口所在地：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="区/路（存）/弄/号/室" />
      </el-form-item>
      <el-form-item label="现在居住地址：" prop="name">
        <el-input v-model="ruleForm.name" placeholder="区/路（存）/弄/号/室" />
      </el-form-item>
      <el-form-item class="demo-ruleForm-but">
        <!-- <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 保存 </el-button> -->
      </el-form-item>
    </div>
    <div class="images">
      <UploadPictures></UploadPictures>
    </div>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const UploadPictures = defineAsyncComponent(() => import('@/components/upload/MassUpload.vue'))
const activeName = ref('first')
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

const rules = reactive<FormRules<any>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change'
    }
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change'
    }
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change'
    }
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change'
    }
  ],
  desc: [{ required: true, message: 'Please input activity form', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-form {
  display: flex;
}

.el-form-item {
  width: 400px;
}

.demo-ruleForm-but {
  margin-left: 460px;
  .el-button {
    width: 100px;
    height: 40px;
  }
}
</style>
