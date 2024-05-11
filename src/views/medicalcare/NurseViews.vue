<template>
    <el-tabs
   type="card"
   class="demo-tabs"
 >
       <el-tab-pane label="血压记录" name="first">
            血压记录
       </el-tab-pane>
       <el-tab-pane label="血糖记录" name="second">
        血糖记录
       </el-tab-pane>
       <el-tab-pane label="体温记录" name="third">
        体温记录
       </el-tab-pane>
 
    </el-tabs>

</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted,defineAsyncComponent } from 'vue'


</script>
<style lang="less" scoped>
.demo-tabs>.el-tabs__content {
   padding: 32px;
   color: #6b778c;
   font-size: 32px;
   font-weight: 600;
}
</style>