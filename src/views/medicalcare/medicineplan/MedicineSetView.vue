<template>
  <!-- 用药计划设置 -->
  <el-card>
    <ProjectInfoDialog v-if="isdialog" :isinfo="isinfo" @close="close"></ProjectInfoDialog>
    <el-form label-width="auto">
      <el-form-item label="老人"> 张三分 </el-form-item>
      <el-form-item label="床位"> 501-2 </el-form-item>
      <el-form-item>
        <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
          <template #operate>
            <el-button type="primary" text @click="getinfo">设置</el-button>
            <el-button type="primary" text @click="stop">停止用药</el-button>
          </template>
        </MayTable>
      </el-form-item>
    </el-form>
    <div class="button">
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
const ProjectInfoDialog = defineAsyncComponent(
  () => import('@/components/dialog/medicalcare/ProjectInfoDialog.vue')
)
const isdialog = ref(false)
const isinfo = ref(true)
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '提交时间'
    },
    {
      prop: 'address',
      label: '提交人'
    },
    {
      prop: 'manager',
      label: '接收人'
    },
    {
      prop: 'phone',
      label: '接收人联系方式'
    },
    {
      prop: 'username',
      label: '任务数量'
    }
  ],
  statelist: [
    {
      id: 1,
      name: '待接收'
    },
    {
      id: 2,
      name: '拒绝'
    },
    {
      id: 3,
      name: '已接收'
    }
  ]
})
const getlist = () => {
  setTimeout(() => {
    data.tableData = AffiliatedView
  }, 1000)
}
// 关闭弹窗
const close = () => {
  isdialog.value = false
}
// 设置服药计划
const getinfo = () => {
  isdialog.value = true
  isinfo.value = true
}
// 停止用药
const stop = () => {
  isdialog.value = true
  isinfo.value = false
}
onMounted(() => {
  getlist()
})
</script>
<style lang="less" scoped>
.button {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
