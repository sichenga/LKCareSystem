<template>
  <div>
    <div class="size"><span>▋</span> 老人自理情况</div>
    {{ state.tableData }}
    <MatTable
      :tableData="state.tableData"
      :tableItem="state.tableItem"
      style="width: 1160px"
      :identifier="'oldphysical'"
    >
      <template #operate="{ data, index }">
        <UploadImg
          :title="'上传资料'"
          :showlist="false"
          @upload="(file: any) => OldPhysical(file, data, index)"
        ></UploadImg>
      </template>
    </MatTable>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted, defineAsyncComponent } from 'vue'

import { getCheckupItemsList } from '@/service/old/OldApi'
import type {} from '@/service/old/OldType'
const MatTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
import type { UploadProps, UploadUserFile } from 'element-plus'

import UploadImg from '@/components/upload/UploadImg.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const uploadadd = import.meta.env.VITE_BASE_UPLOAD_ADD
const fileList = ref<UploadUserFile[]>([])
const header = {
  Authorization: userStore.token
}
const state: any = reactive({
  tableData: [],
  tableItem: [
    {
      label: '体检项目',
      prop: 'name'
    },
    {
      label: '资料',
      prop: 'picture'
    }
  ]
})
// 体检项目列表
const getlist = async () => {
  let res: any = await getCheckupItemsList()
  if (res?.code === 10000) {
    state.tableData = res.data.list
  }
}
// 处理老人自理情况数据
const OldPhysical = (val: any, data: any, index: number) => {
  console.log(val, data, index)
  data.picture = val
  
}
onMounted(() => {
  getlist()
})
</script>
<style lang="less" scoped>
.size {
  color: #666666;
  font-size: 14px;
  margin-top: 50px;

  span {
    color: #409eff;
  }
}

:deep(.el-table--border .el-table__inner-wrapper) {
  margin-top: 30px;
}
:deep(.el-checkbox__input) {
  border-radius: 50%;
  .el-checkbox__inner {
    border-radius: 50%;
  }
}
</style>
