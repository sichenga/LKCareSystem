<template>
     <el-tabs
    type="card"
    class="demo-tabs"
  >
        <el-tab-pane label="健康档案" name="first">
                <RecordAdmin></RecordAdmin>
        </el-tab-pane>
        <el-tab-pane label="入院记录" name="second">
            <OutRecord></OutRecord>
        </el-tab-pane>
        <el-tab-pane label="出院记录" name="third">
            <OutRecord></OutRecord>
        </el-tab-pane>
        <el-tab-pane label="体检报告" name="fourth">
                <MedicalInfo></MedicalInfo>
        </el-tab-pane>
     </el-tabs>

</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted,defineAsyncComponent } from 'vue'
const RecordAdmin = defineAsyncComponent(()=>import('@/components/Record/RecordAdmin.vue'))
const OutRecord = defineAsyncComponent(()=>import('@/components/Record/OutRecord.vue'))
const MedicalInfo = defineAsyncComponent(()=>import('./MedicalViews.vue'))
</script>
<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>