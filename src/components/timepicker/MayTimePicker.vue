<template>
  <el-date-picker
    v-model="time"
    type="datetime"
    placeholder="请选择"
    format="YYYY/MM/DD hh:mm"
    value-format="YYYY-MM-DD HH:mm"
    editable
    :size="props.size"
    @change="handleChange"
  />
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue'
const props = defineProps({
  size: {
    type: String,
    default: 'large'
  }
})
const emit = defineEmits(['change'])
const time = ref('')
const handleChange = (val: any) => {
  console.log('年月日', val)
  emit('change', val)
}
</script>
<style lang="less" scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-datetime-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-datetime-picker .block:last-child {
  border-right: none;
}
.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
