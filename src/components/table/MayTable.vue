<template>
  <el-table
    :data="props.tableData"
    border
    style="width: 100%"
    :header-cell-style="{
      background: '#f9f9f9',
      color: '#000000',
      height: '50px'
    }"
  >
    <el-table-column type="selection" width="55" v-if="isMultiple" />
    <el-table-column
      v-for="(item, index) in props.tableItem"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <template v-if="item.prop == 'photo' || item.prop == 'qrcode'" v-slot="{ row }">
        <el-image
          style="width: 50px; height: 50px"
          v-if="row.photo || row.qrcode"
          :src="upload + (row.photo || row.qrcode)"
        />
      </template>

      <!-- 所属岗位      角色数据 -->
      <template v-else-if="item.prop == 'roles'" v-slot="{ row }">
        <span>{{ rolename(row.roles) }}</span>
      </template>

      <template
        v-else-if="props.identifier == 'administration' && item.prop == 'image'"
        v-slot="{ row }"
      >
        <el-image style="width: 50px; height: 50px" :src="row.image" fit="cover" />
      </template>

      <!-- 出入院管理>老人管理>新增>健康信息 -->
      <template
        v-else-if="props.identifier == 'oldphysical' && item.prop == 'image'"
        v-slot="{ row }"
      >
        <el-image
          v-for="item in row.image"
          :key="item"
          style="width: 40px; height: 40px"
          :src="item"
          fit="cover"
        />
      </template>
      <!-- 日期格式 -->
      <template
        v-else-if="item.prop === 'updateTime' || item.prop === 'visitTime'"
        v-slot="{ row }"
      >
        <span>{{ mons(row.updateTime || row.visitTime).format('YYYY-MM-DD') }}</span>
      </template>

      <!-- 奖励积分 -->
      <template v-else-if="item.prop === 'input'" v-slot="{}">
        <input type="text" />
      </template>
      <!-- 男女 -->
      <template v-else-if="item.prop === 'gender'" v-slot="{ row }">
        {{ row.gender == '1' ? '男' : '女' }}
      </template>
      <template v-else-if="item.prop == 'picture'" v-slot="{ row }">
        <el-image
          class="picture"
          v-for="(pic, index) in row?.picture"
          :key="index"
          :src="upload + pic"
        />
      </template>
    </el-table-column>

    <!-- 是否有input框 -->
    <el-table-column :label="props.label" v-if="props.label">
      <template v-slot="scope">
        <slot name="custom" :data="scope.row"></slot>
      </template>
    </el-table-column>

    <el-table-column label="操作" v-if="props.isoperate" width="330">
      <template v-slot="scope">
        <slot name="operate" :data="scope.row" :index="scope.$index"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { TableItem } from '@/Type/table'
import moment from 'moment'
const upload = import.meta.env.VITE_BASE_URL + '/'
const mons = moment
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
  }
})
const rolename = (data: any) => {
  return data.map((item: any) => item?.name).toString()
}
</script>
<style lang="less" scoped>
.picture {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>
