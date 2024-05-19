<template>
  <!--新增老人  -->
  <div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
      <el-card>
        <el-tab-pane label="基本信息" name="first">
          <OldMessage></OldMessage>
        </el-tab-pane>
        <el-tab-pane label="健康信息" name="second">
          <OldHealth></OldHealth>
        </el-tab-pane>
        <el-tab-pane label="家属信息" name="third">
          <OldRelation></OldRelation>
        </el-tab-pane>
        <div class="submit">
          <el-button size="large">取消</el-button>
          <el-button size="large" type="primary"> 保存 </el-button>
        </div>
      </el-card>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'
const OldMessage = defineAsyncComponent(() => import('@/components/addold/OldMessage.vue'))
const OldRelation = defineAsyncComponent(() => import('@/components/addold/OldRelation.vue'))
const OldHealth = defineAsyncComponent(() => import('@/components/addold/OldHealth.vue'))
const activeName = ref('first')
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
