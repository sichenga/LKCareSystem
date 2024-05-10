<template>
    <div>
        <el-tabs v-model="activeName" type="card" class="demo-tabs">
            <el-tab-pane label="基本信息" name="first">
                <el-card>
                    <OldMessage></OldMessage>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="健康信息" name="second">
                <el-card>
                    <OldHealth></OldHealth>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="家属信息" name="third">
                <el-card>
                    <OldRelation></OldRelation>
                </el-card>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted,defineAsyncComponent } from 'vue'
const OldMessage = defineAsyncComponent(() => import('@/components/addold/oldmessage.vue'))
const OldRelation = defineAsyncComponent(() => import('@/components/addold/oldrelation.vue'))
const OldHealth = defineAsyncComponent(() => import('@/components/addold/oldhealth.vue'))
const activeName = ref('first')

</script>

<style lang="less" scoped>
:deep(.el-tabs__header) {

margin: 0 0 0.3px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
border: none;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__item) {

border-top-right-radius: 18px;
background-color: #fff;
}
</style>
