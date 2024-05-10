<template>
  <!-- 新增用药登记 -->

  <el-card style="margin-top: 15px">
    <el-form :model="formInline" class="demo-form-inline">
      <el-form-item label="登记日期："> <TimePicker></TimePicker> </el-form-item>
      <el-form-item label="家属姓名：">
        <el-input v-model="formInline.user" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
    <div style="margin: 20px 0">
      <div>药品：</div>
      <el-button type="primary" @click="isdialog = true">新增</el-button>
      <AffDialog @close="close" v-if="isdialog"></AffDialog>
    </div>
    <!-- 表格 -->
    <MayTable :tableData="data.tableData" :tableItem="data.tableItem">
      <template #operate>
        <el-button type="primary" text>编辑</el-button>
        <el-button type="primary" text @click="del">删除</el-button>
      </template>
    </MayTable>
    <div class="button">
      <el-button type="primary">保存</el-button>
      <el-button>取消</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, defineAsyncComponent } from 'vue'
import AffiliatedView from '@/database/AffiliatedView.json'
import AffDialog from '@/components/dialog/AffDialog.vue'
import { getMessageBox } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const MayTable = defineAsyncComponent(() => import('@/components/table/MayTable.vue'))
const TimePicker = defineAsyncComponent(() => import('@/components/timepicker/MayTimePicker.vue'))
const formInline = reactive({
  user: '',
  region: '',
  date: ''
})
const isdialog = ref(false)
const data = reactive({
  tableData: [] as any,
  tableItem: [
    {
      prop: 'id',
      label: '序号'
    },
    {
      prop: 'name',
      label: '药品名称'
    },
    {
      prop: 'address',
      label: '数量'
    },
    {
      prop: 'manager',
      label: '有效期'
    },
    {
      prop: 'phone',
      label: '剂量'
    },
    {
      prop: 'username',
      label: '服法'
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
// 删除
const del = async () => {
  let res = await getMessageBox('是否确认删除该角色', '删除后将不可恢复')
  console.log(11112, res)
  if (res) {
    ElMessage.success('删除成功')
  } else {
    ElMessage.info('取消删除')
  }
}
onMounted(() => {
  getlist()
})
</script>
<style lang="less" scoped>
.el-input {
  width: 220px;
  height: 40px;
}
.el-button {
  height: 40px;
  line-height: 40px;
}
.button {
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
</style>
