<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="data.page"
      v-model:page-size="data.psize"
      :page-sizes="[5, 10, 15, 20]"
      :small="false"
      :background="true"
      :layout="'total,  prev, pager, next,jumper,sizes'"
      :total="data.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { reactive, defineProps, watch, ref, defineEmits } from 'vue'
import type { PaginationConfig } from '@/Type/pagination'
// const locale = zhCn
const emit = defineEmits(['page', 'psize'])
// let layout = 'total,  prev, pager, next,sizes'
let data = reactive<PaginationConfig>({
  page: 1,
  psize: 5,
  total: 0
})
const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  psize: {
    type: Number,
    default: 5
  },
  total: {
    type: Number,
    default: 0
  }
})

watch(
  props,
  (newval) => {
    console.log('watch', newval)
    if (newval) {
      data.page = newval.page
      data.psize = newval.psize
      data.total = newval.total
    }
  },
  { immediate: true }
)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  emit('psize', val)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  emit('page', val)
}
</script>
<style lang="less" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.el-pagination {
  margin-top: 20px;
  // justify-content: center;
  align-items: center;
}
.pagination {
  display: flex;
  flex-direction: row-reverse;
}
</style>
