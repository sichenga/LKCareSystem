<template>
  <el-time-picker
    v-model="value"
    :is-range="props.isrange"
    :range-separator="props.rangeSeparator"
    :start-placeholder="props.startPlaceholder"
    :end-placeholder="props.endPlaceholder"
    :value-format="props.valueformat"
    :format="props.valueformat"
    placeholder="选择时间"
    @change="timeselect"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
const emit = defineEmits(['change'])
const props = defineProps({
  isrange: {
    type: Boolean,
    default: false
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  startPlaceholder: {
    type: String,
    default: '开始时间'
  },
  endPlaceholder: {
    type: String,
    default: '结束时间'
  },
  valueformat: {
    type: String,
    default: 'HH:mm'
  },
  startTime: {
    type: String,
    default: '00:00'
  },
  endTime: {
    type: String,
    default: '23:00'
  }
})
const value = ref<string | Array<string>>([props.startTime, props.endTime])
// 选择时间
const timeselect = (val: string) => {
  console.log(val)
  emit('change', val)
}
</script>
<style lang="less" scoped>
.demo-range .el-date-editor {
  margin: 8px;
}

.demo-range .el-range-separator {
  box-sizing: content-box;
}
</style>
