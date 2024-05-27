<template>
  <el-date-picker v-model="time" type="datetimerange" range-separator="-" start-placeholder="开始时间"
    end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss" date-format="YYYY/MM/DD" time-format="HH:mm:ss"
    value-format="YYYY-MM-DD HH:mm" @change="handleChange" />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineEmits,defineProps,watch } from 'vue'
const params = defineProps({
  times:{
    type:Array,
    default:()=>[]
  }
})
const emits = defineEmits(['change'])
const time = ref<any>([])
console.log(1231,params.times);
watch(params.times,(val)=>{
  console.log('回显日期',val);
  if(val){
    time.value=val
  }
},{immediate:true})
// 选择日期时间
const handleChange = (value: string) => {
  console.log(value)
  emits('change', value)
}
</script>
<style lang="less" scoped>
.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
