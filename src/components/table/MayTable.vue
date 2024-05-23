<template>
  <AddWork v-if="iswodk" :worddata="worddata" @close="close"></AddWork>
  <el-table
    :data="props.tableData"
    border
    :header-cell-style="{
      background: '#f9f9f9',
      color: '#000000',
      height: '50px'
    }"
    :span-method="objectSpanMethod"
    :show-header="props.isShowHeader"
  >
    <el-table-column type="selection" width="55" v-if="isMultiple" />
    <el-table-column v-for="(item, index) in props.tableItem" :key="index" :prop="item.prop" :label="item.label"
      :width="item.width">
      <template v-if="item.prop == 'photo' || item.prop == 'qrcode' || item.prop == 'elderlyPhoto'" v-slot="{ row }">
        <el-image style="width: 50px; height: 50px" v-if="row.photo || row.qrcode || row.elderlyPhoto"
          :src="upload + (row.photo || row.qrcode || row.elderlyPhoto)" />
      </template>

      <!-- 所属岗位      角色数据 -->
      <template v-else-if="item.prop == 'roles'" v-slot="{ row }">
        <span v-if="row.roles.length > 0">
          {{ row.roles.map((item: any) => item?.name).toString() }}</span
        >
      </template>

      <template v-else-if="props.identifier == 'administration' && item.prop == 'image'" v-slot="{ row }">
        <el-image style="width: 50px; height: 50px" :src="row.image" fit="cover" />
      </template>

      <!-- 出入院管理>老人管理>新增>健康信息 -->
      <template v-else-if="props.identifier == 'oldphysical' && item.prop == 'image'" v-slot="{ row }">
        <el-image v-for="item in row.image" :key="item" style="width: 40px; height: 40px" :src="item" fit="cover" />
      </template>
      <!-- 日期格式 -->
      <template v-else-if="item.prop === 'updateTime' || item.prop === 'visitTime'" v-slot="{ row }">
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
        <el-image class="picture" v-for="(pic, index) in row?.picture" :key="index" :src="upload + pic" />
      </template>
      <!-- 排班管理 -->
      <template
        v-else-if="weekdata.includes(item.prop) && props.identifier == 'word'"
        v-slot="{ row }"
      >
        <div v-if="row[item.prop]" @click="changetab(row, item.prop)" class="week">
          <div class="item" v-for="item in row[item.prop]" :key="item.id">
            <el-avatar :size="30" :src="upload + item.staffPhoto" />
            <span>{{ item.staffName }}</span>
            <el-icon class="close" @click.stop="del(item.id)"><CloseBold /></el-icon>
          </div>
        </div>
        <div v-else>
          <span @click.stop="changetab(row, item.prop)">+请选择</span>
        </div>
      </template>
      <template
        v-else-if="
          (monthdata.includes(item.prop) || weekdata.includes(item.prop) || item.prop == 'task') &&
          props.identifier == 'schedule'
        "
        v-slot="{ row }"
      >
        <div v-if="row[item.prop]" class="schitem">
          {{ row[item.prop].serviceName }}
        </div>
      </template>
    </el-table-column>

    <!-- 是否有input框 -->
    <el-table-column :label="props.label" v-if="props.label">
      <template v-slot="scope">
        <slot name="custom" :data="scope.row"></slot>
      </template>
    </el-table-column>

    <el-table-column label="操作" v-if="props.isoperate" :width="props.autoWidth">
      <template v-slot="scope">
        <slot name="operate" :data="scope.row" :index="scope.$index"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue'
import type { PropType } from 'vue'
import type { TableItem } from '@/Type/table'
import moment from 'moment'
import month from '@/database/date/month.json'
import week from '@/database/date/week.json'
const upload = import.meta.env.VITE_BASE_URL + '/'
const mons = moment
// 周
const weekdata = week
const monthdata = month
import { CloseBold } from '@element-plus/icons-vue'
import AddWork from '@/components/dialog/old/elderly/AddWork.vue'
import { deleteSchedule } from '@/service/old/schedule/ScheduleApi'
import { ElMessage } from 'element-plus'

const iswodk = ref(false)

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
  // 操作栏是否隐藏
  isoperate: {
    type: Boolean,
    default: true
  },
  autoWidth: {
    type: String,
    default: '300px'
  },
  isShowHeader: {
    type: Boolean,
    default: true
  }
})

// 点击单元格
const clicktab = (row: any, column: any) => {
  console.log(row, column)
}
// 选择排班
const worddata = ref({})
const changetab = (row: any, com: any) => {
  console.log(row, com)
  worddata.value = { type: row.type, com }
  console.log(111, worddata.value)

  iswodk.value = true
}
// 关闭弹窗
const close = (isclose: boolean) => {
  if (isclose === true) {
    // getwork()
  }
  iswodk.value = false
}
// 删除排班管理
const emits = defineEmits(['close'])
const del = async (id: number) => {
  console.log(id)
  let res: any = await deleteSchedule(id)
  console.log('删除', res)
  if (res?.code === 10000) {
    ElMessage.success('删除成功')
    emits('close', true)
    // userType()
  }
}

// 在函数中使用inject
// const userType: any = app.runWithContext(() => {
//   // 拿到app中注入的userType字段
//   // console.log(props.identifier == 'word' ? inject('getwork') : null)
//   return props.identifier === 'word' ? inject('getwork') : null
// })
const objectSpanMethod = (row: any) => {
  // console.log(row)
  // if (row.row.gender == 1 && row.columnIndex == 2) {
  //   console.log(1111)
  //   return {
  //     rowspan: 2,
  //     colspan: 1
  //   }
  //   // return [2, 7]
  // }
}
</script>
<style lang="less" scoped>
.picture {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.week {
  cursor: pointer;
  position: relative;
}
// 变小手
.item {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 5px;
  span {
    margin-left: 5px;
  }
}

.close {
  position: absolute;
  top: -2px;
  left: 25px;

  color: black;
}
:deep(.el-table__cell) {
  position: relative;
}
.schitem {
  width: 100%;
  height: 100%;
  background-color: red;
  position: absolute;
}
</style>
