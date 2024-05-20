<template>
  <!--新增老人  -->
  <div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-card>
        {{ ruleForm }}
        <el-tab-pane label="基本信息" name="first">
          <OldMessage ref="RefOldMessage"></OldMessage>
        </el-tab-pane>
        <el-tab-pane label="健康信息" name="second">
          <OldHealth></OldHealth>
        </el-tab-pane>
        <el-tab-pane label="家属信息" name="third">
          <OldRelation></OldRelation>
        </el-tab-pane>
        <div class="submit">
          <el-button size="large">取消</el-button>
          <el-button size="large" type="primary" @click="add"> 保存 </el-button>
        </div>
      </el-card>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent, provide } from 'vue'
const OldMessage = defineAsyncComponent(() => import('@/components/addold/OldMessage.vue'))
const OldRelation = defineAsyncComponent(() => import('@/components/addold/OldRelation.vue'))
const OldHealth = defineAsyncComponent(() => import('@/components/addold/OldHealth.vue'))
import { addElderly } from '@/service/old/OldApi'
import type { AddElderlyRequest } from '@/service/old/OldType'
const activeName = ref('first')
const RefOldMessage = ref()
const ruleForm = reactive<AddElderlyRequest>({
  name: '',
  mobile: '',
  photo: null,
  gender: 1,
  birthday: '',
  nativePlace: '',
  nation: '',
  idCard: '',
  politics: '',
  socialCard: '',
  marriage: null,
  eduLevel: null,
  education: null,
  resident: null,
  address: null,
  begId: undefined,
  state: undefined,
  health: {
    oldillness: [],
    nowillness: [],
    otherillness: [],
    otherCase: []
  },
  selfCares: [],
  checkups: [],
  family: []
})
// 隔代传值
provide('ruleForm', ruleForm)
// 增加
const add = async () => {
  // 验证老人信息数据
  let valid = await RefOldMessage.value?.submitForm()
  console.log(valid)
  if (valid) {
    // addElderly()
  }
}
</script>
<style lang="less" scoped>
:deep(.el-tabs__header) {
  margin: 0 0 0.3px;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: none;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border-top-right-radius: 18px;
  background-color: #fff;
}

.submit {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
