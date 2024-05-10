<template>
  <el-table :data="props.tableData" border style="width: 100%" :header-cell-style="{
    background: '#f9f9f9',
    color: '#000000',
    height: '50px'
  }">
    <el-table-column type="selection" width="55" v-if="isMultiple" />
    <el-table-column v-for="(item, index) in props.tableItem" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width">
      <template v-if="item.prop == 'image' && props.identifier === 'Workers'" v-slot="{ row }">
<<<<<<< HEAD
        <el-image style="width: 50px; height: 50px" :src="row.image" /> <span></span>
=======
        <el-image style="width: 50px; height: 50px" :src="row.image" />
      </template>
      <template v-else-if="props.identifier=='administration'&&item.prop=='image'" v-slot="{row}">
        <el-image style="width: 50px; height: 50px" :src=row.image fit="cover" />
>>>>>>> 065bab607188fec05391e9a3f915e75d1843887d
      </template>

    </el-table-column>

    <!-- 是否有input框 -->
    <el-table-column :label="props.label" v-if="props.label">
      <template v-slot="scope">
        <slot name="custom" :data="scope.row"></slot>
      </template>
    </el-table-column>

<<<<<<< HEAD
    <el-table-column label="操作" v-if="props.isoperate" width="330">
=======
    <el-table-column label="操作" width="330" v-if="props.isoperate">
>>>>>>> 065bab607188fec05391e9a3f915e75d1843887d
      <template v-slot="scope">
        <slot name="operate" :data="scope.row"></slot>
      </template>
    </el-table-column>

    <!-- input -->
    <el-table-column label="奖励积分" v-if="props.input">
      <template v-slot="scope">
        <slot name="custom" :data="scope.row"></slot>
        <input type="text">
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { TableItem } from '@/Type/table'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableItem: {
    type: Array as PropType<TableItem[]>,
    default: () => []
  },
  // 是否多选
  isMultiple: {
    type: Boolean,
    default: false
  },
  // 标识
  identifier: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  isoperate: {
    type: Boolean,
    default: true
  },
  // 是否有input
  input: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="less" scoped></style>
